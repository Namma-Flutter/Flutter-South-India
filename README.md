# Flutter South India 2026

The event website for Flutter South India 2026, a community-led Flutter and Dart conference in Chennai organised by Namma Flutter.

## Tech stack

- Next.js 16 with the App Router
- React 19
- TypeScript 5
- CSS Modules and a shared CSS design system
- Lucide React icons
- KonfHub for ticketing (redirect and embed widget)
- Static export hosted on GitHub Pages
- GitHub Actions for build and deployment

## Architecture

```text
app/                Routes, metadata, and global styles
components/event/   Event page sections (including Tickets + KonfHub widget)
components/ui/      Shared presentation components
data/event/         Typed event content and configuration
docs/               Operator guides (KonfHub setup)
styles/             Shared design-system styles
public/             Static assets
```

`app/page.tsx` renders the main event experience through `EventPage`. Content is kept separate in `data/event`, while each event section owns its component and scoped styles. `next.config.ts` produces a static export served from the root path required by `southindia.nammaflutter.com`.

## Local development

```bash
npm install
npm run dev
```

Create a `.env` in the project root (gitignored) with the variables below, then restart the dev server after any `NEXT_PUBLIC_*` change.

Open [http://localhost:3000](http://localhost:3000).

## Ticketing (KonfHub)

Checkout is handled by KonfHub. The site supports two build-time modes:

| Mode | Env value | Behaviour |
| --- | --- | --- |
| Redirect  | `NEXT_PUBLIC_TICKETING_MODE=redirect` | Site shows ticket tiers; CTAs open the KonfHub event page |
| Embed  | `NEXT_PUBLIC_TICKETING_MODE=embed` | KonfHub Ticket Widget iframe on `#tickets`; CTAs scroll there |

### Environment variables

Add a `.env` file:

```bash
# Ticketing mode: redirect
# or embed
NEXT_PUBLIC_TICKETING_MODE=redirect

NEXT_PUBLIC_KONFHUB_EVENT_URL=https://konfhub.com/flutter-south-india

# Full iframe src from KonfHub Developers → Ticket Widget (required for embed mode).
NEXT_PUBLIC_KONFHUB_WIDGET_SRC=https://konfhub.com/widget/flutter-south-india?desc=false&secondaryBg=fffdf8&ticketBg=fffdf8&borderCl=fffdf8&bg=f4f0e7&fontColor=10212b&ticketCl=10212b&btnColor=027dfd&fontFamily=Figtree&borderRadius=14&widget_type=standard&tickets=116713%2C116915%2C116917%2C116918%2C116919&ticketId=116713%7C0%3B116915%7C0%3B116917%7C0%3B116918%7C0%3B116919%7C0
```

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_TICKETING_MODE` | No | `redirect` (default) or `embed` |
| `NEXT_PUBLIC_KONFHUB_EVENT_URL` | For redirect | Public event page URL. Falls back to `#tickets` when unset |
| `NEXT_PUBLIC_KONFHUB_WIDGET_SRC` | For embed | Full iframe `src` from KonfHub Developers → Ticket Widget. If missing while mode is `embed`, the site falls back to the redirect tier list |