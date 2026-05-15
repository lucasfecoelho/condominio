# Condomínio

PWA responsivo para gestão condominial, atualmente em fase de fundação técnica.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase/Postgres
- PWA
- Vercel

## Estado atual

O projeto já possui:

- página pública com login
- cadastro com aprovação pendente
- autenticação por e-mail e senha
- sessão persistente com limite de 48 horas no app
- redirecionamento por status de perfil
- área interna protegida
- shell responsivo com sidebar no desktop e bottom bar no mobile
- documentação técnica inicial

Ainda não existem funcionalidades reais de condomínio, dashboard com dados, upload de arquivos, notificações, login com Google, painel administrativo de aprovação ou relatórios.

## Como rodar localmente

```bash
npm install
```

Crie um arquivo `.env.local` a partir de `.env.example` e preencha apenas as variáveis públicas necessárias:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Use **uma** chave pública do projeto Supabase: `NEXT_PUBLIC_SUPABASE_ANON_KEY` ou `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

Depois execute:

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Supabase

1. Crie um projeto no Supabase.
2. Mantenha autenticação por e-mail e senha habilitada.
3. Não habilite Google Login nesta fase.
4. Configure senha mínima de 12 caracteres.
5. Configure sessão máxima de 48 horas no painel do Supabase, se essa política estiver disponível para o projeto.
6. Rode a migration:

```text
supabase/migrations/20260515150000_create_app_profiles.sql
```

7. Para aprovar um usuário manualmente:
   - abra **Table Editor > app_profiles**
   - altere `status` de `pending` para `active`
   - preencha `approved_at`

## Fluxo de autenticação

1. O usuário cria conta em `/cadastro`.
2. O Supabase Auth cria a identidade.
3. O trigger de banco cria `app_profiles` com `role = 'user'` e `status = 'pending'`.
4. O usuário vê a mensagem de cadastro recebido.
5. Enquanto estiver `pending`, é enviado para `/aguardando-aprovacao`.
6. Quando um administrador altera o status para `active`, o usuário pode acessar `/app`.
7. Usuários `blocked` são enviados para `/acesso-bloqueado`.

Se um usuário autenticado não tiver perfil, o app o trata como `pending`, por segurança.

## Vercel

1. Suba o repositório para o GitHub.
2. Na Vercel, importe o projeto a partir do repositório.
3. Cadastre as mesmas variáveis de ambiente públicas usadas localmente.
4. Faça o primeiro deploy.
5. Depois disso:
   - push na branch de produção, normalmente `main`, gera deploy de produção
   - branches e pull requests geram preview deployments

Antes de publicar, valide localmente:

```bash
npm run build
```

## PWA

O app já possui `manifest.json`, service worker e ícones de referência.

### Como testar no navegador

1. Rode o projeto localmente.
2. Abra o DevTools.
3. Verifique `Application > Manifest`.
4. Confirme nome, ícones, cores e modo `standalone`.

### Como adicionar à tela inicial do iPhone

1. Abra o app no Safari.
2. Toque em **Compartilhar**.
3. Escolha **Adicionar à Tela de Início**.

### Como instalar no desktop

1. Abra o app no Chrome ou Edge.
2. Use o ícone de instalação exibido na barra do navegador.
3. Confirme a instalação.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## O que ainda não existe

- funcionalidades reais de condomínio
- dashboard real
- upload de arquivos
- notificações
- login com Google
- painel administrativo de aprovação
- relatórios

## Documentação

- `docs/01-visao-geral.md`
- `docs/02-roadmap.md`
- `docs/03-pwa.md`
- `docs/04-auth.md`
- `docs/05-seguranca.md`
- `docs/06-deploy.md`
- `docs/07-decisoes-tecnicas.md`
- `docs/08-dados-e-privacidade.md`

## Próximos passos sugeridos

- construir o fluxo administrativo de aprovação
- modelar entidades reais do condomínio
- definir permissões por perfil
- evoluir testes automatizados
- preparar observabilidade, backup e operação de produção
