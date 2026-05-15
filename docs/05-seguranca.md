# 05 - Segurança

## Princípios

- nunca usar `SUPABASE_SERVICE_ROLE_KEY` no frontend
- nunca salvar senha manualmente fora do Supabase Auth
- nunca colocar segredos no código-fonte
- manter variáveis de ambiente fora do repositório
- não enviar dados sensíveis para `localStorage` ou `sessionStorage`

## Autenticação e autorização

- login apenas por e-mail e senha nesta fase
- senha mínima de 12 caracteres
- cadastro não libera acesso automaticamente
- novos usuários começam como `pending`
- usuários comuns não podem alterar `role` nem `status`
- a área interna só aceita usuários `active`

## Sessão máxima de 48 horas

- após login bem-sucedido, o app registra o horário em cookie `httpOnly`
- ao carregar área autenticada, o servidor valida o tempo decorrido
- se passar de 48 horas, a sessão é encerrada e o usuário precisa entrar novamente
- em produção, a política nativa equivalente do Supabase também deve ser configurada, se disponível

## Banco de dados

- RLS é obrigatória em todas as tabelas expostas
- `app_profiles` já nasce com RLS habilitada
- cada usuário lê apenas o próprio perfil
- o insert permitido é apenas do próprio perfil pendente
- não existe política permissiva de update para usuários comuns

## Checklist antes de produção

- [ ] revisar variáveis de ambiente por ambiente
- [ ] confirmar ausência de `service_role` no frontend
- [ ] manter segredo fora do código e do histórico Git
- [ ] aplicar e revisar migrations
- [ ] validar RLS em todas as tabelas de negócio
- [ ] revisar políticas de Storage antes de qualquer upload
- [ ] testar login, logout, expiração e redirecionamentos
- [ ] configurar sessão máxima no Supabase, se disponível
- [ ] revisar HTTPS, cookies e headers
- [ ] revisar mensagens de erro para evitar vazamento de informação
- [ ] planejar recuperação de senha antes de uso amplo
- [ ] avaliar MFA quando o produto amadurecer
