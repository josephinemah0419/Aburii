# ABURII

Production-ready Next.js App Router website for ABURII Japanese Yakiniku in TTDI.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

The project uses the standard Next.js `.next` build directory.

## Vercel deployment

Import this repository into Vercel and keep the detected defaults:

- Framework Preset: **Next.js**
- Build Command: `npm run build`
- Output Directory: leave blank
- Install Command: `npm install`

No Cloudflare, Wrangler, Vite, Vinext, static export, or custom output directory is required.
