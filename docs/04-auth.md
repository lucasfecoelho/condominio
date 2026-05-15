# 04 - Autenticação

## Visão geral

O Condomínio usa **Supabase Auth** com sessão armazenada em cookies para manter o usuário autenticado entre atualizações de página.

## Rotas

### Públicas

- `/`
- `/login`
- `/cadastro`

### Condicional

- `/aguardando-aprovacao`

### Privadas

- `/app`

## Estados de acesso

- `active`: acesso liberado para `/app`
- `pending`: redirecionamento para `/aguardando-aprovacao`
- `blocked`: aviso amigável de acesso bloqueado

Para autorização, o app usa somente `app_metadata.status`. Usuários novos sem esse campo são tratados como `pending`, o que impede acesso indevido antes da aprovação. `user_metadata` não é usado para decisões de autorização.

## Fluxos atuais

- `/` mostra a home pública quando não há sessão.
- Usuários `active` são enviados para `/app`.
- Usuários `pending` são enviados para `/aguardando-aprovacao`.
- Usuários `blocked` são enviados para `/login` com aviso.
- O cadastro cria uma nova conta e apresenta a mensagem de análise antes da liberação.

## Como a proteção funciona

- `proxy.ts` atualiza a sessão e aplica redirecionamentos por status.
- As páginas protegidas também validam o usuário no servidor antes de renderizar.
- A regra de sessão de 48 horas fica centralizada em `lib/auth/session.ts`.
- O instante do login é salvo em cookie `httpOnly`; quando o limite expira, o app encerra a sessão e exige novo login.

## Próximos passos possíveis

- fluxo administrativo de aprovação
- recuperação de senha
- perfis de usuário
- permissões
- painel administrativo

