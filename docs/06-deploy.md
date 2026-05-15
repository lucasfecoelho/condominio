# 06 - Deploy

## Objetivo

Publicar o app com fluxo simples, reproduzível e seguro usando GitHub + Vercel.

## Passo a passo

1. Versione o projeto no GitHub.
2. Na Vercel, importe o repositório.
3. Confirme o framework detectado como Next.js.
4. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` **ou**
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. Execute o primeiro deploy.
6. Após publicar, valide:
   - home pública
   - login
   - cadastro
   - redirecionamentos por status
   - manifest do PWA

## Ambientes

- **Production**: branch de produção, normalmente `main`
- **Preview**: branches e pull requests
- **Development**: ambiente local

## Deploy automático

Quando o repositório está conectado à Vercel:

- cada push na branch de produção gera um deploy de produção
- branches e pull requests geram preview deployments

## Validação antes do deploy

Rode localmente:

```bash
npm run lint
npm run build
```

## Boas práticas

- não usar segredos em variáveis `NEXT_PUBLIC_*`
- manter os mesmos nomes de variáveis entre local, preview e produção
- revisar preview deployments antes de promover mudanças importantes
- testar fluxo de login com um usuário real de homologação após cada mudança relevante
