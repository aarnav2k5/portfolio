# Design Spec — Aarnav Jaiswal Build Lab

This portfolio uses a distinct “build lab” identity instead of the cloned README/terminal layout. It presents Aarnav as a student developer who is actively building, learning, and shipping useful products.

## 1. Concept

The site should feel like a small independent studio: confident, direct, technical, and warm. The visual language combines:

- Editorial, oversized typography for the hero and contact moments.
- Dark forest-green surfaces that feel more intentional than generic black.
- Acid-lime accents for actions, availability, active states, and project signals.
- Grid lines, grain, and soft orbital shapes as quiet “workbench” details.
- Project cards that read like artifacts from an active build log.

The design does not use the source portfolio’s notch shell, sticky profile rail, README breadcrumbs, warm-gray blueprint canvas, or typing-test widget.

## 2. Layout shell

```text
┌──────────────────────────────────────────────────────────────┐
│ AJ   build / learn / ship       Home Projects   AVAILABLE  ◐ │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  AARNAV JAISWAL / PORTFOLIO 2026                            │
│  Building                                                     │
│  useful                                                       │
│  things.                         short intro + CTAs           │
│                                  résumé / let's talk           │
│  01 full-stack   02 product-minded       scroll to work      │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  02 projects     100+ problems       2027 graduation          │
├──────────────────────────────────────────────────────────────┤
│  // Skills                                                     │
│  grouped technical chips                                      │
│                                                              │
│  // Education                                                  │
│  academic entries                                             │
│                                                              │
│  // Projects                                                   │
│  lime project visual | large project information              │
│                                                              │
│  // Achievements & Activities                                 │
│  proof points                                                  │
│                                                              │
│  // Open channel                                               │
│  high-contrast contact block                                  │
├──────────────────────────────────────────────────────────────┤
│ Have a good idea? Let's make it real.       links / copyright │
└──────────────────────────────────────────────────────────────┘
```

The shell is full-width, uses a centered `max-w-7xl` content frame, and avoids a desktop-only sidebar so the primary story remains readable on every viewport.

## 3. Design tokens

### Light theme

| Token | Value | Use |
| --- | --- | --- |
| Background | `hsl(48 33% 96%)` | Warm parchment canvas |
| Foreground | `hsl(160 22% 12%)` | Deep green-black text |
| Card | `hsl(45 33% 99%)` | Project and hero surfaces |
| Muted | `hsl(160 8% 43%)` | Supporting copy and metadata |
| Border | `hsl(40 13% 82%)` | Rules and card edges |
| Accent | `hsl(73 100% 48%)` | Lime actions and signals |

### Dark theme

| Token | Value | Use |
| --- | --- | --- |
| Background | `hsl(160 22% 7%)` | Forest-green-black canvas |
| Foreground | `hsl(48 33% 96%)` | Warm white text |
| Card | `hsl(160 18% 10%)` | Elevated surfaces |
| Muted | `hsl(155 8% 64%)` | Supporting copy |
| Border | `hsl(160 12% 20%)` | Low-contrast rules |
| Accent | `hsl(73 100% 57%)` | Lime actions and signals |

### Type

- Open Sans variable font remains the primary UI font.
- `display-type` uses tighter tracking and heavy weights for the editorial hero.
- Mono text is reserved for labels, numbers, availability, stack tags, and small metadata.
- Headlines use short phrases and intentional line breaks rather than long résumé-style sentences.

## 4. Components

| Component | Role |
| --- | --- |
| `StudioNavbar` | Minimal sticky navigation, availability indicator, command bar, and theme toggle. |
| `Header` | Split hero with a large statement, personal intro, résumé CTA, and project anchor. |
| `Snapshot` | Three quick proof points: shipped projects, algorithm practice, and graduation target. |
| `Title` | Editorial section rule with a compact `//` marker. |
| `ProjectCard` | Two-column project artifact with lime visual panel, metadata, description, and links. |
| `Education` | Academic background presented as a clean timeline-like list. |
| `Achievements` | Compact proof points for problem-solving, hackathon work, and workshops. |
| `Contact` | Dark high-contrast open-channel block with social links. |
| `StudioFooter` | Lightweight closing CTA and social links. |

## 5. Interaction principles

- Actions move slightly on hover to make the interface feel physical without being noisy.
- Project cards use a lime offset shadow on hover to reinforce the build-artifact metaphor.
- Navigation is intentionally small; the page itself carries the visual weight.
- Theme switching remains available, but both themes use the same forest/lime identity.
- Keyboard access remains supported through the command palette and semantic links/buttons.

## 6. Content architecture

The visual system is data-driven from `constants/index.ts`:

- `Site` controls identity, role, location, avatar, résumé, and canonical URL.
- `Socials` controls contact destinations.
- `SkillGroups` controls the skill clusters.
- `Education` controls academic entries.
- `Achievements` controls proof points.
- `Projects` controls selected work and the full project explorer.

The experience array is intentionally empty until professional experience exists. The page emphasizes real projects and learning rather than placeholder employment history.

## 7. SEO and deployment

`app/layout.tsx` generates metadata and JSON-LD from the same site constants used by the UI. Set `NEXT_PUBLIC_SITE_URL` to the deployed origin, for example `https://aarnav2k5.vercel.app`.

The URL parser treats empty or malformed environment values as unset and falls back to a valid placeholder, preventing `new URL("")` from breaking Vercel’s build-time page collection.

## 8. Non-goals

- No CMS or database-backed content editor.
- No invented employment history.
- No copied layout shell from the original repository.
- No large animation system that delays first contentful paint.
