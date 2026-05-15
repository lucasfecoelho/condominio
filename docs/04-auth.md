# 04 - Autenticação

## Visão geral

O Condomínio usa **Supabase Auth** para identidade e `public.app_profiles` para autorização de acesso à aplicação.

## Método adotado

- login por e-mail e senha
- cadastro público com aprovação pendente
- sem Google Login nesta fase
- sem recuperação de senha por enquanto

## Rotas

### Públicas

- `/`
- `/login`
- `/cadastro`

### Condicionais

- `/aguardando-aprovacao`
- `/acesso-bloqueado`

### Privadas

- `/app`
- `/app/*`

## Fluxo de cadastro

1. O usuário informa nome completo, e-mail, senha e confirmação de senha.
2. O frontend exige senha mínima de 12 caracteres.
3. O Supabase Auth cria o usuário.
4. Um trigger em `auth.users` cria automaticamente um perfil em `public.app_profiles`.
5. O perfil nasce com:
   - `role = 'user'`
   - `status = 'pending'`
   - `approved_at = null`
6. O usuário recebe a mensagem:
   - `Cadastro realizado. Seu acesso será analisado antes da liberação.`

## Aprovação manual

Nesta fase, a aprovação é manual no Supabase:

1. abrir **Table Editor > app_profiles**
2. localizar o usuário
3. alterar `status` de `pending` para `active`
4. preencher `approved_at`

## Estados de acesso

- `active`: pode entrar em `/app`
- `pending`: vai para `/aguardando-aprovacao`
- `blocked`: vai para `/acesso-bloqueado`

Se um usuário autenticado não tiver perfil, o app o trata como `pending`, que é a alternativa mais conservadora.

## Gerenciadores de senha

Os formulários usam `autocomplete` compatível com gerenciadores de senha:

- e-mail de login: `username`
- senha de login: `current-password`
- nome completo: `name`
- senha de cadastro: `new-password`
- confirmação de senha: `new-password`

## Decisões de produto

### Por que não Google Login agora

O fluxo inicial precisa ser simples, controlável e fácil de auditar. Login social pode ser adicionado depois, quando houver uma decisão de produto clara e uma estratégia de operação correspondente.

### Por que não recuperação de senha agora

O recurso é importante, mas ainda não faz parte da primeira fundação do produto. Ele deve ser planejado antes de uso amplo, com templates, e-mails e experiência de recuperação revisados.

## Pontos futuros

- recuperação de senha
- painel administrativo de aprovação
- perfis editáveis pelo usuário
- permissões mais granulares
