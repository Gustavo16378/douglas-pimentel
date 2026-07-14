# Douglas Pimentel — Advogado Trabalhista (Palmas-TO)

Landing page one-page, **React + Vite + TypeScript + Tailwind CSS**, pronta para deploy no
**Cloudflare Pages**. Reconstrução fiel do design (dark `#14120f` / off-white `#f5f1ea` /
dourado `#c9a86a`, títulos em *Newsreader* serifada + corpo em *Public Sans*).

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:5173
```

Build de produção e preview:

```bash
npm run build      # typecheck (tsc) + build Vite -> dist/
npm run preview    # serve o dist/ em http://localhost:4173
```

## Deploy no Cloudflare Pages

**Opção A — Wrangler (linha de comando)**

```bash
npm run build
npx wrangler pages deploy dist --project-name=douglas-pimentel-advogado
# ou simplesmente: npm run deploy
```

O `wrangler.toml` já define `pages_build_output_dir = "dist"`.

**Opção B — Repositório conectado (CI do Cloudflare)**

No painel do Cloudflare Pages, conecte o repositório e use:

| Configuração            | Valor           |
| ----------------------- | --------------- |
| Framework preset        | `Vite`          |
| Build command           | `npm run build` |
| Build output directory  | `dist`          |

> **Antes de ir ao ar:** troque o domínio placeholder `https://douglas-pimentel-advogado.pages.dev`
> em [`index.html`](index.html) (tags `canonical`, `og:url` e `og:image`) pelo domínio final.
> O Open Graph exige **URL absoluta** para o card de preview renderizar no WhatsApp/Facebook.

## Estrutura

```
public/
  fonts/            Newsreader + Public Sans (woff2, self-hosted)
  favicon.ico, favicon-32.png, apple-touch-icon.png
  og-image.png      1200x630 brandado (dark + monograma dP + nome)
  _headers          cache + headers de segurança (Cloudflare Pages)
src/
  assets/           hero / sobre / palestra / contato (.webp) + kit de marca
                    (logo-white/dark, monogram-white/dark, logo-icon-512, favicons)
  components/        uma seção por componente + Navbar, FloatingWhatsApp, ui, icons
  hooks/            useScrollDirection, useBodyScrollLock (scroll lock iOS-safe)
  lib/              whatsapp.ts (CTAs contextuais) · site.ts (endereço, mapa, contato)
  App.tsx           composição da página (sheet 1280px centralizado)
```

### Seções (ordem)

Hero → Barra de credibilidade → Atuação (6 cards) → Calculadora (teaser) →
Seus Direitos (3 cards) → Mitos e Verdades (4 pares) → Palestras → Sobre →
Depoimentos → Onde encontrar (mapa) → CTA final → Footer.

## Trocar os assets finais

As imagens atuais em `src/assets/` são as do próprio design (já otimizadas). Para substituir
pelas versões finais, basta sobrescrever mantendo os **mesmos nomes**:

| Arquivo                     | Onde aparece                        | Observação de corte                    |
| --------------------------- | ----------------------------------- | -------------------------------------- |
| `src/assets/hero.webp`      | Hero                                | retrato; `object-position` bottom/top  |
| `src/assets/sobre.webp`     | Sobre                               | retrato; `object-position` top center  |
| `src/assets/palestra.webp`  | Palestras                           | paisagem; `object-position` center 15% |
| `src/assets/contato.webp`   | CTA final (fundo)                   | retrato; em grayscale                  |
| `src/assets/logo-white.png` | Footer                              | lockup creme, fundo transparente       |
| `src/assets/monogram-white.png` | Navbar + menu mobile            | círculo dP, fundo transparente         |
| `public/favicon.ico` + `favicon-16/32.png` + `apple-touch-icon.png` | aba / atalho | kit de marca oficial |
| `public/og-image.png`       | preview de compartilhamento (DM)    | 1200×630 (monograma real + nome)       |

> O favicon em `public/` é uma cópia do kit em `src/assets/`. Ao atualizar o kit,
> copie novamente para `public/` (o `index.html` referencia `/favicon*.png` e `/favicon.ico`).

As imagens em `src/assets/` são processadas e versionadas (hash) pelo Vite; as de `public/`
são servidas como estão. Regenerar favicons/OG a partir da identidade: veja o kit em
`../scripts` do design original (ou substitua diretamente os PNGs em `public/`).

## Requisitos técnicos atendidos

- **Navbar padrão:** `useScrollDirection` (esconde ao rolar pra baixo), menu mobile via
  `ReactDOM.createPortal`, scroll lock iOS com `position:fixed` + `top:-scrollY` (nunca
  `overflow:hidden`), estilos inline no overlay/painel, `z-index` 9998/9999,
  `transition-[transform,background-color,backdrop-filter,border-color]`, `border-b` sempre no DOM.
- **CTAs WhatsApp** para `wa.me/5563992024803` com `?text=` contextual por seção.
- **Botão WhatsApp flutuante** discreto (canto inferior direito).
- **Onde encontrar:** mapa Google embutido com filtro dark
  `invert(90%) hue-rotate(180deg) contrast(0.9) brightness(0.9)`, moldura dourada/grafite,
  botão "Como chegar →" (direções). Mobile: mapa abaixo do endereço (~300px).
- **Open Graph** completo + `og:image` 1200×630 brandada.
- **Mobile-first**, fontes self-hosted, sem formulários funcionais, sem analytics.
```
