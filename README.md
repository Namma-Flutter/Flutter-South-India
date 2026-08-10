# Flutter South India 2026

The event website for Flutter South India 2026, a community-led Flutter and Dart conference in Chennai organised by Namma Flutter.

## Tech stack

- Next.js 16 with the App Router
- React 19
- TypeScript 5
- CSS Modules and a shared CSS design system
- Lucide React icons
- Static export hosted on GitHub Pages
- GitHub Actions for build and deployment

## Architecture

```text
app/                Routes, metadata, and global styles
components/event/   Event page sections and interactive components
components/ui/      Shared presentation components
data/event/         Typed event content and configuration
styles/             Shared design-system styles
public/             Static assets
```

`app/page.tsx` renders the main event experience through `EventPage`. Content is kept separate in `data/event`, while each event section owns its component and scoped styles. `next.config.ts` produces a static export and applies the GitHub Pages base path during deployment builds.
