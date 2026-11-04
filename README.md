<div align="center">

# PasteTok

**Download any public TikTok video as MP4 without watermark, with watermark, or as MP3.**
Free · No sign-up · No ads · No cookies · English & French

### [▶ Try it: trk78.github.io/pastetok](https://trk78.github.io/pastetok/)

[![Deploy](https://github.com/trk78/pastetok/actions/workflows/deploy.yml/badge.svg)](https://github.com/trk78/pastetok/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-ff2d6f.svg)](LICENSE)
![Next.js](https://img.shields.io/badge/Next.js_14-black?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?logo=github&logoColor=white)

</div>

---

## ✨ Features

| | |
|---|---|
| 🎬 **3 formats** | MP4 without watermark (recommended), MP4 with watermark, MP3 (audio only) |
| 👀 **Preview** | Thumbnail, title, author, duration, likes and views before downloading |
| 🔒 **Anonymous counter** | Only a total submission count; no personal data, links, cookies or trackers |
| 📱 **Mobile-first** | Built for phones, where TikTok links get copied |
| ⚡ **Fast** | Static site served by GitHub's CDN, ~90 kB of JS on first load |
| 🔗 **Every link format** | `tiktok.com`, `www.`, `m.`, short links `vm.` / `vt.tiktok.com` |
| 🌍 **Bilingual** | French at `/pastetok/`, English at `/pastetok/en/`, each pre-rendered with its own `hreflang` alternates |

## ⚙️ How it works

PasteTok is a static Next.js export: video retrieval and downloading run in the visitor's browser. When a valid link is submitted, an anonymous Cloudflare Worker counter receives only `{nom: 'pastetok-videos'}`, with no personal data or link in the payload. Only the cumulative total is stored; nothing else is collected by the application. Cloudflare sees the visitor's IP address to deliver the request and limit repeated calls; the application does not store it. The request does not wait for retrieval to succeed and never blocks it; offline submissions are not queued or retried.

```mermaid
sequenceDiagram
    actor U as Visitor
    participant P as PasteTok<br/>(browser)
    participant W as tikwm.com
    participant C as TikTok CDN
    participant S as Counter<br/>(Cloudflare Worker)

    U->>P: Pastes the TikTok link
    P->>P: Validates the domain
    P-)S: POST /hit (counter name)
    P->>W: POST /api/ (url)
    W-->>P: Metadata + MP4/MP3 links
    U->>P: Picks a format
    P->>C: Fetches the file
    C-->>P: MP4 / MP3
    P-->>U: Saves the file (blob)
```

1. The pasted URL is validated client-side (TikTok domains only): [`lib/security.ts`](lib/security.ts).
2. The browser queries the public, keyless [tikwm.com](https://www.tikwm.com) API, which returns direct links: [`lib/tiktok.ts`](lib/tiktok.ts).
3. The file is fetched **directly** from the TikTok CDN, then saved under a clean name (`tiktok_<id>_nowm.mp4`).

No proxy is needed because both tikwm **and** the TikTok CDN return `Access-Control-Allow-Origin: *`. If a download still fails, the file opens in a new tab so it can be saved manually.

## 🚀 Run locally

Requirements: Node.js 20+.

```bash
git clone https://github.com/trk78/pastetok.git
cd pastetok
npm install
npm run dev
```

Open **[localhost:3000/pastetok](http://localhost:3000/pastetok)**: the site is served under the `/pastetok` `basePath`, just like on GitHub Pages.

| Command | Effect |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` |
| `npm run lint` | ESLint |

### Environment variables (optional)

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://trk78.github.io/pastetok` | Canonical URL, Open Graph, sitemap |
| `NEXT_PUBLIC_SITE_NAME` | `PasteTok` | Name used in metadata |

## 🌍 Host your own copy

1. **Fork** the repository.
2. If the repository is no longer named `pastetok`, update `basePath` in [`next.config.mjs`](next.config.mjs) (and `NEXT_PUBLIC_SITE_URL`). With a custom domain at the root, remove `basePath`.
3. **Settings → Pages → Source: GitHub Actions**.
4. Push to `main`: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes automatically.

Since `out/` is fully static, it can also be deployed as-is to Cloudflare Pages, Netlify, Vercel or any file server.

## 🗂️ Project structure

```
├── app/
│   ├── (fr)/                    — French routes (root layout + thin pages)
│   ├── (en)/en/                 — English routes (root layout + thin pages)
│   └── sitemap.ts               — Both languages, with hreflang alternates
├── components/
│   ├── views/                   — Page content shared by both languages
│   ├── legal/                   — Legal notice, terms, privacy (FR + EN text)
│   ├── home/                    — HeroSection, HowItWorks, FAQ
│   ├── download/                — VideoPreview, DownloadOptions
│   └── layout/                  — RootShell, Header, Footer, LangSwitch
├── lib/
│   ├── i18n.ts                  — UI strings + localized routes (add a language here)
│   ├── seo.ts                   — Per-page metadata, canonical + hreflang
│   ├── tiktok.ts                — tikwm client + download (swap the provider here)
│   └── security.ts              — URL validation, input sanitizing
├── next.config.mjs              — output: 'export', basePath
└── .github/workflows/deploy.yml — GitHub Pages build + deploy
```

## ⚠️ Known limitations

- **Depends on tikwm.com**: if the API goes down, closes its CORS or becomes paid, extraction stops working. The entry point to replace is `fetchTikTokVideo()` in [`lib/tiktok.ts`](lib/tiktok.ts).
- **Private or deleted videos** can't be retrieved.

## 🤝 Contributing

Issues and pull requests are welcome: [open an issue](https://github.com/trk78/pastetok/issues).

Open ideas:
- fallback provider when tikwm is unavailable;
- mobile navigation menu (header links are hidden below `md`);
- Open Graph image;
- more languages (strings and routes live in [`lib/i18n.ts`](lib/i18n.ts)).

## ⚖️ Disclaimer

PasteTok is a technical tool meant for **personal use**. It does not host, store or redistribute any video. Content remains the property of its creators: respect copyright and [TikTok's Terms of Service](https://www.tiktok.com/legal/terms-of-service). Independent project, not affiliated with TikTok or ByteDance.

## 📄 License

[MIT](LICENSE) © Timéo Jeannin
