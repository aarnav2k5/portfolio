# Aarnav Jaiswal — Portfolio

Personal portfolio for Aarnav Jaiswal, a final-year Computer Science and Information Technology student building full-stack web products with React, Next.js, Node.js, Express, PostgreSQL, MongoDB, and Supabase.

The current site is an original “build lab” interface: editorial typography, forest-green surfaces, acid-lime accents, project showcase cards, and a compact navigation bar. It is intentionally separate from the original cloned README/terminal design.

## Features

- Split hero with availability status, résumé download, and direct contact CTA.
- Portfolio snapshot covering shipped projects, algorithm practice, and graduation target.
- Education, skills, achievements, and selected project sections populated from Aarnav’s résumé.
- Project cards with live-site and GitHub links.
- Dedicated `/projects` page with project filtering.
- Responsive dark/light theme with a command palette and keyboard shortcut support.
- 8-bit profile image served from `/public/8bit-photo.png`.
- Optional Upstash Redis visitor counter and Vercel Analytics.
- Defensive site URL handling so an empty `NEXT_PUBLIC_SITE_URL` cannot break a Vercel build.

## Stack

- Next.js 16 App Router and Turbopack
- React 19 and TypeScript
- Tailwind CSS v4
- Framer Motion
- Upstash Redis (optional visitor counter)
- Vercel Analytics

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```text
app/
  layout.tsx                 root metadata, JSON-LD, theme provider
  (root)/layout.tsx          studio navbar, content shell, studio footer
  (root)/page.tsx            home page composition
  (root)/projects/page.tsx   full project list and filters
  (root)/resources/page.tsx  optional resources page
  api/visits/route.ts        optional Redis visitor counter
  globals.css                design tokens and visual utilities

components/
  Header.tsx                 split editorial hero
  Snapshot.tsx               portfolio proof strip
  Education.tsx              education timeline
  Achievements.tsx           activities and achievements
  Projects.tsx               selected work section
  StudioNavbar.tsx           primary navigation and availability status
  StudioFooter.tsx           contact-oriented footer
  cards/ProjectCard.tsx      project showcase card

constants/index.ts           personal content, links, skills, projects, metadata
public/8bit-photo.png        profile image
public/aarnav-jaiswal-resume.pdf
```

## Editing content

Most personal content lives in [constants/index.ts](constants/index.ts):

- `Site` — name, role, tagline, location, résumé path, avatar, and site URL fallback.
- `Socials` — GitHub, LinkedIn, email, and phone links.
- `SkillGroups` — grouped technical skills.
- `Education` — academic history.
- `Achievements` — activities and accomplishments.
- `Projects` — live links, GitHub links, descriptions, tags, and categories.

Replace `/public/8bit-photo.png` when you want to use a different profile image. Keep the same filename or update `Site.avatar`.

## Environment variables

Copy `.env.example` to `.env.local` when needed:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph metadata, and JSON-LD. Use a complete URL including `https://`. |
| `UPSTASH_REDIS_REST_URL` | Optional Redis endpoint for the visitor counter. |
| `UPSTASH_REDIS_REST_TOKEN` | Optional Redis token for the visitor counter. |

An unset or empty `NEXT_PUBLIC_SITE_URL` falls back safely during local builds. Set the real production URL in Vercel for correct SEO metadata.

## Deploying to Vercel

1. Push this repository to your own GitHub account.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Keep the framework as Next.js and the build command as `npm run build`.
4. Add `NEXT_PUBLIC_SITE_URL` for Production, Preview, and Development. For example:

   ```text
   NEXT_PUBLIC_SITE_URL=https://aarnav2k5.vercel.app
   ```

5. Deploy and confirm the domain under Vercel → Project Settings → Domains.

If the generated domain is not available, rename the Vercel project to an available name. The `.vercel.app` hostname is based on the project name and is first-come, first-served.

## License

Personal portfolio source. Content, résumé, profile image, and project descriptions belong to Aarnav Jaiswal.
