# 03 - PWA

## Configuração atual

O projeto inclui:

- `public/manifest.json`
- ícones em `public/icons`
- service worker em `public/sw.js`
- registro do service worker no cliente
- layout responsivo, mobile-first

## Manifest

Configurações principais:

- `name`: `Condomínio`
- `short_name`: `Condomínio`
- `display`: `standalone`
- `start_url`: `/`
- `theme_color`: `#0F2742`
- `background_color`: `#F7F8FA`

## Como validar

1. Rode o app localmente.
2. Abra o DevTools do navegador.
3. Em `Application > Manifest`, confira nome, ícones e cores.
4. Verifique se o app pode ser instalado.

## Instalação

### iPhone

1. Abra o app no Safari.
2. Toque em **Compartilhar**.
3. Escolha **Adicionar à Tela de Início**.

### Desktop

1. Abra o app no Chrome ou Edge.
2. Use o ícone de instalação na barra do navegador.
3. Confirme a instalação.

## Observações

Os ícones atuais são provisórios. Eles podem ser substituídos depois por ativos finais da marca sem alterar a arquitetura do PWA.
