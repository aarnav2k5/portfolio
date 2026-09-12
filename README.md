# Aarnav Jaiswal — Portfolio

Aarnav Jaiswal's personal portfolio — a full-stack student portfolio focused on shipped projects, education, and open-source learning.

## Features

- **Command palette** (`⌘K` / `Ctrl-K`) — jump to any page, open any social link, or toggle the theme without touching the mouse ([components/shell/CommandBar.tsx](components/shell/CommandBar.tsx))
- **Light/dark theme**, system-aware, with a clip-path curtain transition instead of a cross-fade ([context/Theme.tsx](context/Theme.tsx))
- **Experience timeline**, **filterable project list** (category tabs derived from the data itself, not hardcoded), and grouped skill chips
- **Real visitor counter** in the footer, backed by Redis, with a static fallback when it isn't configured
- A static typing-test widget and a section-index rail — see [DESIGN.md](DESIGN.md) for the full design spec and the reasoning behind each piece

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack dev), React 19, TypeScript
- Tailwind CSS v4
- [Upstash Redis](https://upstash.com) — visitor counter (optional)
- Vercel Analytics + Vercel deployment

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | Does                       |
| --------------- | -------------------------- |
| `npm run dev`   | Dev server with Turbopack  |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
| `npm run lint`  | ESLint                     |

## Project structure

```
app/
  layout.tsx              root layout — fonts, metadata, JSON-LD, ThemeProvider
  (root)/
    layout.tsx             page shell — notch navbar, sidebar, footer
    page.tsx                home: hero, projects, experience, skills, typing test
    projects/page.tsx       full project list with category filter tabs
    resources/page.tsx      curated links (Notion docs, learning tracks, etc.)
    etc/page.tsx            unlisted placeholder (noindex)
  api/visits/route.ts       visitor-counter endpoint (Redis incr)
  sitemap.ts, robots.ts, opengraph-image.tsx, twitter-image.tsx

components/
  Header.tsx, About.tsx, Experience.tsx, Projects.tsx, Skill.tsx, Contact.tsx
  cards/                   ExperienceRow, ProjectCard, ResourcesCard
  shell/                   NotchNavbar, CommandBar, Sidebar, StatusCard,
                            SectionIndex, Breadcrumb, Footer, ThemeToggle, Hatch
  navbar/, ui/              nav primitives, shadcn-derived UI primitives

constants/index.ts          all site content — see below
context/Theme.tsx           next-themes provider wrapper
lib/utils.ts                 cn() helper
```

## Editing content

Everything you'd normally go hunting across pages for — name, bio, socials, nav links, skills, experience, projects, resources — lives in **[constants/index.ts](constants/index.ts)**. The components just map over it:

- `Site` — identity, tagline, location, résumé path, footer visitor-count fallback
- `Socials` / `Links` — social icons+URLs, nav entries
- `Experience: ExperienceEntry[]` — one entry per role (`company`, `title`, `start`/`end`, `description`, `bullets`, `tags`)
- `SkillGroups: SkillGroup[]` — labeled skill clusters (`Skills` is the flattened list, used for SEO keywords/JSON-LD)
- `Projects: ProjectEntry[]` — `tagline`, `description`, `tags`, `category` (drives the filter tabs on `/projects`), optional `liveHref`/`codeHref`
- `Resources` — curated external links shown on `/resources`

Drop a résumé PDF in `/public` and set `Site.resume` to its path to light up the Résumé buttons in the hero and sidebar.

## Environment variables

Copy `.env.example` to `.env.local`. Everything is optional — the site runs fine with none of it set:

| Variable                                              | Required for                     | Fallback if unset                                                 |
| ----------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                | canonical URLs, OG tags, sitemap | Set this to your Vercel URL in deployment settings |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | real visitor counter             | static `Site.visitorCount` number in the footer                   |

### Wiring up the visitor counter

1. Vercel dashboard → **Storage → Marketplace → connect a Redis integration (Upstash)** to the project. This injects `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` automatically.
2. Locally: `vercel env pull .env.local` to pull the same vars down.
3. Done — `app/api/visits/route.ts` increments and returns the count on each request; the footer fetches it client-side on mount.

It's a raw hit counter (every page load bumps it), not de-duped per unique visitor — intentional, in keeping with the "you are the Nth visitor" webring-counter joke in the footer copy.

## Deployment

Deploys on [Vercel](https://vercel.com/new). Connect the Upstash integration there too if you want the real counter in production; without it, the footer just shows the static fallback.
