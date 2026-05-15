create table if not exists public.app_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  role text not null default 'user',
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  approved_at timestamptz null,
  constraint app_profiles_email_unique unique (email),
  constraint app_profiles_role_check check (role in ('admin', 'user')),
  constraint app_profiles_status_check check (status in ('pending', 'active', 'blocked'))
);

alter table public.app_profiles enable row level security;

grant select, insert on public.app_profiles to authenticated;

drop policy if exists "Users can read their own app profile" on public.app_profiles;
create policy "Users can read their own app profile"
on public.app_profiles
for select
to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = id);

drop policy if exists "Users can insert their own pending app profile" on public.app_profiles;
create policy "Users can insert their own pending app profile"
on public.app_profiles
for insert
to authenticated
with check (
  (select auth.uid()) is not null
  and (select auth.uid()) = id
  and role = 'user'
  and status = 'pending'
  and approved_at is null
);

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

drop trigger if exists on_auth_user_created_app_profile on auth.users;
create trigger on_auth_user_created_app_profile
after insert on auth.users
for each row execute procedure public.handle_new_app_profile();
