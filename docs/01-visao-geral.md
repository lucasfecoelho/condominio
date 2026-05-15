# 01 - Visão geral

## Nome do projeto

**Condomínio**

## Propósito

O Condomínio é um PWA responsivo para gestão condominial. Nesta fase, o foco não é entregar módulos de negócio, e sim criar uma fundação técnica segura, instalável e pronta para crescer sem retrabalho.

## O que já existe

- home pública com login
- cadastro com aprovação pendente
- autenticação por e-mail e senha
- perfil de acesso em `app_profiles`
- sessão persistente com limite de 48 horas no app
- área interna protegida
- shell responsivo com sidebar no desktop e bottom bar no mobile
- manifest, service worker e suporte a instalação como PWA
- documentação técnica inicial

## Escopo atual

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase/Postgres
- PWA
- deploy previsto em Vercel

## Fora do escopo agora

- funcionalidades reais de condomínio
- dashboard real com indicadores
- banco de dados de negócio
- upload de arquivos
- notificações
- login com Google
- recuperação de senha
- painel administrativo de aprovação
- relatórios
