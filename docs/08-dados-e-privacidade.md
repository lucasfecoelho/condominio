# 08 - Dados e privacidade

## Estado atual

O app ainda não manipula dados sensíveis de condomínio nem possui módulos reais de negócio.

Hoje, a aplicação trabalha apenas com:

- identidade no Supabase Auth
- perfil básico em `app_profiles`
- status de acesso

## Diretrizes para o futuro

- toda tabela nova deve nascer com RLS habilitada
- políticas devem ser específicas por papel e por recurso
- uploads futuros precisam de regras próprias de Storage
- dados sensíveis não devem ser persistidos no navegador sem necessidade
- cookies e tokens devem seguir o princípio do menor privilégio

## Uploads futuros

Quando houver arquivos:

- definir buckets por finalidade
- revisar políticas de leitura e escrita
- evitar exposição pública por padrão
- registrar limites, retenção e critérios de exclusão

## Backup e retenção

Quando surgirem dados reais de condomínio, será necessário:

- definir estratégia de backup
- definir retenção
- testar restauração
- registrar responsáveis operacionais

## Princípio orientador

Coletar apenas o que o produto realmente precisa, proteger por padrão e documentar toda ampliação relevante do tratamento de dados.
