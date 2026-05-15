-- Antes de aplicar esta migration em bancos já usados, remova ou consolide
-- e-mails duplicados em public.app_profiles; a constraint unique falhará se
-- duplicidades antigas ainda existirem.

update public.app_profiles
set email = lower(trim(email));

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'app_profiles_email_unique'
      and conrelid = 'public.app_profiles'::regclass
  ) then
    alter table public.app_profiles
      add constraint app_profiles_email_unique unique (email);
  end if;
end;
$$;

create or replace function public.app_profile_email_exists(candidate_email text)
returns boolean
language sql
stable
security definer set search_path = ''
as $$
  select exists (
    select 1
    from public.app_profiles
    where email = lower(trim(candidate_email))
  );
$$;

revoke execute on function public.app_profile_email_exists(text) from public;
grant execute on function public.app_profile_email_exists(text) to anon, authenticated;

create or replace function public.ensure_pending_app_profile_for_signup(
  candidate_user_id uuid,
  candidate_full_name text,
  candidate_email text
)
returns boolean
language plpgsql
security definer set search_path = ''
as $$
declare
  normalized_email text := lower(trim(candidate_email));
begin
  if not exists (
    select 1
    from auth.users
    where id = candidate_user_id
      and email = normalized_email
  ) then
    return false;
  end if;

  insert into public.app_profiles (
    id,
    full_name,
    email,
    role,
    status,
    created_at,
    approved_at
  )
  values (
    candidate_user_id,
    coalesce(nullif(trim(candidate_full_name), ''), 'Usuário'),
    normalized_email,
    'user',
    'pending',
    now(),
    null
  )
  on conflict (id) do nothing;

  return exists (
    select 1
    from public.app_profiles
    where id = candidate_user_id
      and email = normalized_email
  );
end;
$$;

revoke execute on function public.ensure_pending_app_profile_for_signup(uuid, text, text) from public;
grant execute on function public.ensure_pending_app_profile_for_signup(uuid, text, text) to anon, authenticated;

create or replace function public.handle_new_app_profile()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.app_profiles (
    id,
    full_name,
    email,
    role,
    status,
    created_at,
    approved_at
  )
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'Usuário'),
    lower(trim(new.email)),
    'user',
    'pending',
    now(),
    null
  )
  on conflict (id) do nothing;

  return new;
end;
$$;
