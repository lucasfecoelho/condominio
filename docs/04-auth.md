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
2. O e-mail é normalizado com `trim()` e `lowercase()`.
3. O frontend exige senha mínima de 12 caracteres.
4. Antes do signup, o app consulta `app_profiles` para evitar cadastro duplicado.
5. Se o e-mail já estiver em `app_profiles`, o app mostra:
   - `Este e-mail já possui cadastro. Faça login ou entre em contato com a administração.`
6. O Supabase Auth cria o usuário.
7. Um trigger em `auth.users` cria automaticamente um perfil em `public.app_profiles`.
8. Depois do signup, o app confirma que o perfil pendente realmente existe antes de exibir sucesso.
9. O perfil nasce com:
   - `role = 'user'`
   - `status = 'pending'`
   - `approved_at = null`
10. O usuário recebe a mensagem:
   - `Cadastro realizado. Seu acesso será analisado antes da liberação.`

Esse cuidado evita sucesso falso quando o Supabase devolve uma resposta mascarada para um e-mail já existente ou quando a criação do perfil não se conclui corretamente.

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

Se um usuário autenticar, mas não tiver perfil, o acesso é bloqueado com a mensagem:

- `Seu cadastro ainda não foi concluído corretamente. Entre em contato com a administração.`

## Confirmação de e-mail

O Supabase pode exigir confirmação de e-mail antes do primeiro login.

- Para conferir um usuário específico: **Authentication > Users** e verificar se o e-mail está confirmado.
- Para ambiente de teste, a confirmação pode ser desativada em:
  - **Authentication > Sign In / Providers > Email > Confirm email**

Enquanto não houver um callback próprio de confirmação no app, o login mostra mensagem genérica quando a autenticação falha:

- `E-mail ou senha inválidos, ou o e-mail ainda não foi confirmado.`

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
