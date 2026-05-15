# 05 - Segurança

## Decisões de autenticação

- Login apenas com e-mail e senha nesta fase.
- Cadastro público permitido, mas sem liberação automática da área interna.
- Login com Google fica fora desta etapa.
- Usuários novos começam como `pending` até aprovação.

## Por que o cadastro não libera acesso automaticamente

O produto ainda está consolidando sua fundação. Permitir solicitação de conta sem conceder acesso imediato reduz risco operacional e preserva controle sobre quem entra na área autenticada.

## Por que não há login com Google

Nesta fase, o objetivo é manter a autenticação simples e previsível. Adicionar provedores externos cedo demais aumenta configuração, suporte e caminhos de erro sem entregar valor proporcional ao estágio atual.

## Regra de sessão de 48 horas

- Após login bem-sucedido, o app registra o horário do login em cookie `httpOnly`.
- Ao carregar a área autenticada, o servidor verifica se o login tem mais de 48 horas.
- Se o limite tiver expirado, o app encerra a sessão e redireciona para `/login`.
- Quando a política final de produção for definida, o limite nativo de sessão do Supabase também deve ser configurado no painel.

## Status de acesso

- `app_metadata.status` é a fonte segura para `active`, `pending` e `blocked`.
- Usuários sem status explícito são tratados como `pending`.
- `user_metadata` não deve ser usado para autorização, porque pode ser alterado pelo próprio usuário.

## Chaves e segredos

- Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no frontend.
- Não colocar chaves secretas no código-fonte.
- Usar no cliente apenas chaves públicas apropriadas, como `NEXT_PUBLIC_SUPABASE_ANON_KEY` ou `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Não armazenar senha em `localStorage`, `sessionStorage` ou qualquer outro armazenamento local.
- Não armazenar dados sensíveis em armazenamento local.

## Banco de dados futuro

Todas as tabelas de negócio futuras devem nascer com **Row Level Security (RLS)** habilitado e políticas revisadas antes de produção.

## Checklist básico antes de produção

- [ ] Revisar variáveis de ambiente por ambiente
- [ ] Confirmar ausência de `service_role` no frontend
- [ ] Configurar duração máxima de sessão no Supabase
- [ ] Habilitar e revisar RLS em todas as tabelas de negócio
- [ ] Revisar políticas de cookies e HTTPS
- [ ] Testar login, logout, expiração e redirecionamentos
- [ ] Construir fluxo administrativo seguro para aprovação/bloqueio
- [ ] Revisar logs e mensagens de erro para não expor dados sensíveis
- [ ] Planejar recuperação de senha e MFA antes de ampliar o uso

