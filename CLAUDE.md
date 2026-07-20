# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server with Turbopack (http://localhost:3000)
npm run build    # production build with Turbopack
npm run start    # run the production build
npm run lint     # eslint (flat config: next/core-web-vitals + next/typescript)
```

There is no test runner configured in this project (no test script, no test files). Don't assume Jest/Vitest exist — check with the user before adding one.

Type-checking is **not** enforced by `next build` — `next.config.ts` sets `typescript.ignoreBuildErrors: true` to work around a Turbopack bug on this Next.js canary version (`routes.js` is generated after `validator.ts` tries to import it). Run `npx tsc --noEmit` manually if you need to check types; expect pre-existing errors unrelated to your change (e.g. in `CurveTransition.tsx`, `TiptapEditor.tsx`) — don't try to fix those incidentally.

## Architecture

Next.js App Router (`src/app`), Next 16 canary + React 19, Tailwind v4, TypeScript with `@/*` → `src/*`. Route groups: `src/app/(routes)/*` holds the public marketing site; `src/app/admin/*` is a separate authenticated CMS section; `src/app/api/*` has three route handlers (`contact`, `consult`, `upload`).

Source layout:
- `src/app` — routes, layouts, and Next.js metadata files (`sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`).
- `src/components` — feature/page components (PascalCase folders, `index.jsx`/`.tsx` entry per component).
- `src/common` — small shared UI primitives (Magnetic, RoundedButton).
- `src/data` — static content driving most marketing pages (see Programmatic SEO below).
- `src/lib` — content/schema generation helpers, Cloudinary upload helpers, `cn()` util.
- `src/utils/supabase` — the three Supabase client factories (see Data layer below).

The codebase mixes `.jsx` and `.tsx` throughout — new files don't need to strictly be TypeScript to match existing convention, but prefer `.tsx` for new work. Note `tsconfig.json` only explicitly type-checks three `.jsx` files by name (`projects/page.jsx`, `services/page.jsx`, `app/page.jsx`) in addition to all `.ts`/`.tsx` — plain `.jsx` files elsewhere aren't type-checked at all.

### Programmatic SEO (the trickiest part of this codebase)

There are **two parallel, overlapping systems** generating location/service landing pages, both served through the single catch-all route `src/app/(routes)/[slug]/page.jsx`:

1. **Legacy system** — `src/data/seo-locations.js` (`targetLocations`, ~9 cities) + `getSeoTarget(slug)`, which regex-parses slugs like `best-{service}-in-{location}` or `{service}-in-{location}`. Renders via `SeoLandingHero` / `SeoContent` / `Faq`.
2. **Newer system** — `src/data/locations-data.json` (larger location list + `brand` + `services` metadata) + `src/lib/seoTemplates.js` (deterministic-but-varied copy generation via `pickVariant`, hashed off the slug so output is stable across builds) + `src/lib/schema.js` (JSON-LD builders). Handles two slug formats: `web-development-company-{location}` (back-compat) and `{service}-agency-in-{location}` (current). Renders via `LocationPageTemplate`.

`page.jsx`'s `parseSlug()` tries the newer format first, then falls back to `getSeoTarget`. `generateStaticParams()` pre-renders all combinations from both systems at build time (SSG) — hundreds of static pages. `src/app/sitemap.ts` independently re-encodes both slug formats, so if you add a location/service you must update it in `locations-data.json` / `seo-locations.js` **and** confirm `sitemap.ts` still reflects the right URL shape.

Other data-driven sections following a simpler single-source pattern: `src/data/services.js` (services + service-detail pages), `src/data/solutions.js` (solutions + `solutions/[slug]`), `src/data/projects.js` (projects + `projects/[id]`). These don't have the dual-system complexity above.

### Data layer — Supabase

Only blogs (`blogs` table), authors (`authors` table), and contact form submissions (`contacts` table) are backed by Supabase Postgres. Everything else (services, solutions, projects, locations) is static data in `src/data`.

Three separate Supabase client factories exist for different runtimes — use the right one, don't cross-wire them:
- `src/utils/supabase/client.ts` — browser client, memoized as a module-level singleton (`_client`) specifically to avoid re-registering `onAuthStateChange` listeners on every render, which was previously causing render storms.
- `src/utils/supabase/server.ts` — server client for Server Components/Route Handlers, wired to Next's `cookies()`.
- `src/utils/supabase/middleware.ts` — exports `updateSession()` for session refresh, but there is **no `src/middleware.ts`** invoking it — auth redirect-on-`/admin` is currently disabled inline (see the comment in that file about Supabase rate limits). Don't assume `/admin` routes are actually gated at the middleware level.

Admin CRUD (`src/app/admin/**`, `src/components/Admin/*`) talks to Supabase directly from Server/Client Components via the client factories above — there's no REST API layer in front of it for blogs/authors.

### Uploads & email

- `src/app/api/upload/route.ts` — signed direct-to-Cloudinary upload (server generates the SHA1 signature, client/browser uploads the file). `src/lib/cloudinary-upload.ts` / `cloudinary-client-upload.ts` are helper wrappers around this flow.
- `src/app/api/contact/route.ts` — writes to the `contacts` Supabase table and sends a notification email via Nodemailer (Gmail SMTP, app password in `GMAIL_APP_PASSWORD`).

### SEO/metadata conventions

Root metadata, JSON-LD (`organizationSchema`, `websiteSchema`, `siteNavigationSchema`), and favicon/icons config all live in `src/app/layout.tsx`. `BASE_URL` (`https://www.twofloww.in`) is hardcoded per-file rather than centralized — when changing the domain or brand schema, grep for `BASE_URL` and `twofloww.in` across `src/app` rather than editing one file.

Icon/favicon setup: `src/app/favicon.ico` is the real logo, referenced via `metadata.icons` in `layout.tsx`, `public/apple-touch-icon.png`, and `manifest.ts` — keep these three in sync if the logo changes. `public/logo.png` (used in several JSON-LD `logo` fields for schema.org Organization/Article markup) is a separate, unrelated placeholder image, not the brand logo — treat as a known issue rather than the source of truth for the brand mark.

### Environment variables

`.env.local` (not committed) defines: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLOUDINARY_CLOUD_NAME`/`CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`/`NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`, `GMAIL_APP_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`/`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
