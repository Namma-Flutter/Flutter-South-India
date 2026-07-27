# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

**Flutter South India 2026** is a premium conference website built with Next.js 16 (App Router). The site showcases the event, highlights speakers/sessions/sponsors, and redirects attendees to Luma for registration — no payment gateway is integrated.

## Commands

```bash
npm run dev      # local dev server (port 3000)
npm run build    # production build
npm run lint     # ESLint
npm start        # serve production build
```

No test framework is configured.

## Architecture

### Tech Stack

| Concern | Library |
|---|---|
| Framework | Next.js 16 App Router |
| Styling | Tailwind CSS v4 (CSS-first config — no `tailwind.config.js`) |
| Animations | Framer Motion 12, GSAP 3, Lenis (smooth scroll) |
| Icons | lucide-react |
| Class utils | clsx + tailwind-merge |

### Tailwind v4

Tailwind is configured **entirely in CSS**, not a JS config file. Theme tokens (colors, fonts, spacing) go in `app/globals.css` under the `@theme inline` block. Do not create a `tailwind.config.ts`.

### Directory Layout

```
app/              # Next.js App Router root (no src/ directory)
  layout.tsx      # Root layout — fonts, body wrapper
  page.tsx        # Home page (conference landing page)
  globals.css     # Tailwind import + @theme tokens
public/           # Static assets (images, logos, etc.)
```

Path alias `@/*` maps to the project root (e.g., `@/app/...`, `@/components/...`).

### Planned Page Structure (single-page sections)

The landing page is a single scroll experience with these sections in order:

1. Hero + Countdown + CTA (→ Luma registration link)
2. About Conference
3. Community Statistics
4. Event Journey / Timeline
5. 3 Technical Tracks (with Speaker Profile, Session Topic, Bio, Socials, Slides/Recording post-event)
6. Speakers
7. Sponsors
8. Hiring Stalls
9. Product & Startup Expo
10. Games & Activities
11. Volunteers
12. Venue (Loyola College, Chennai)
13. FAQ
14. Final Register CTA + Contact / Community links

### Design Principles

- Dark theme with Flutter branding colors
- Glassmorphism cards
- Smooth scroll via Lenis; page transitions via Framer Motion; complex timeline animations via GSAP
- Mobile-first, SEO optimized
- Registration buttons always redirect externally to Luma (no on-site checkout)
