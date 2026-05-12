# Anna Yarigina — Portfolio Design System

> Read this entire file before writing any UI code.

---

## Changelog

### 2026-04-19 — Articles / Publications section added

**Files created:**
- `src/app/articles/[slug]/page.tsx` — individual article page
- `src/lib/articles.ts` — article content data (3 articles)

**Changes:**
- `src/components/sections/Articles.tsx` — home page publications section updated
- `src/types/index.ts` — Article interface updated with `hasPage`, `language`
- 3 article routes: `/articles/doubling-task-completion`, `/articles/ai-fears-designers`, `/articles/junior-designer-guide`

### 2026-04-18 — Header component revised

**Changes:**
- `NavPill` renamed to `Header`
- Outer container updated: `surface-raised` white bg + `border-border` + custom `shadow-[0_1px_4px_0_rgba(0,0,0,0.06)]`
- Active item fill changed: `surface-overlay` (gray ellipse) instead of white
- Inactive text: `ink-secondary` (`#B3B3B3`)
- All items confirmed as siblings inside one `<nav>` — no separate wrappers

### 2026-04-18 — Color & font tokens updated

**Changes:**
- `ink-primary` — updated to `#0B0D11` (deep off-black, replaces `#111110`)
- `surface-raised` — updated to `#F9F7F5` (warm off-white, never pure white)
- `ink-secondary` — updated to `#B3B3B3` (neutral mid-gray)
- `font-display` — switched to **Geist** (accent display font for headings)
- `font-mono` — switched to **Geist Mono**

### 2026-04-18 — Extended component library + NavPill + Card revisions

**Changes:**
- `NavPill` — outer pill wrapper added; red dot moved inline (before label)
- `Card` — new `detailed` variant (title + year + description + external links)
- New components: Modal, Tabs, Accordion, Avatar, Breadcrumb, Pagination,
  Toggle/Switch, Checkbox, Radio, Skeleton, Toast, ProgressBar,
  Link, IconButton, EmptyState, CaseSideNav

### 2026-04-18 — Initial design system setup

**Files created:**
- `src/app/globals.css` — all CSS custom property tokens
- `src/components/ui/Button.tsx` — three variants, two sizes
- `src/components/ui/Input.tsx` — with label, helper, error states
- `src/components/ui/NavPill.tsx` — pill-shaped navigation tab
- `src/components/ui/Badge.tsx` — company label / tag chip
- `src/components/ui/Card.tsx` — project card with image slot
- `src/components/layout/Header.tsx` — pill nav header
- `src/components/sections/Hero.tsx` — name, headline, CTA row
- `src/components/sections/Cases.tsx` — featured + grid layout
- `src/components/sections/Articles.tsx` — publications list
- `src/components/sections/Mentorship.tsx` — mentoring block
- `src/components/sections/Footer.tsx` — contacts, nav links

**Design language: light, editorial, intentional**

The system is built around a warm off-white background, high-contrast
editorial typography with intentional bold/muted splits, and a single
warm yellow accent. Everything else is neutral.

**Corner radius — unified to 12px (`rounded-xl`) for cards, `rounded-full` for pills**

| Element              | Value               |
|----------------------|---------------------|
| Cards, modals        | `rounded-xl` (12px) |
| Inputs, buttons      | `rounded-xl` (12px) |
| Nav pills, badges    | `rounded-full`      |
| Full-bleed images    | `rounded-none`      |

**Accent color — warm yellow**

| Token               | Value     | Usage                      |
|---------------------|-----------|----------------------------|
| `--color-yellow`    | `#E8C840` | Primary CTA, active states |
| `--color-yellow-dim`| `#D4B232` | Hover, pressed state       |

---

## What this project is

A **personal portfolio website** for Anna Yarigina — UX/Product Designer
with 6+ years of experience in Ed-tech, Health & Fitness and AI.

The site showcases selected case studies, articles, and mentorship work.
It is the primary touchpoint for potential clients and employers.

Stack: **Next.js (App Router) + Tailwind CSS + TypeScript**.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              ← root layout, fonts, global providers
│   ├── page.tsx                ← home: Hero + Cases + Articles + Mentorship
│   ├── cases/
│   │   └── [slug]/page.tsx     ← individual case study pages
│   └── articles/
│       └── [slug]/page.tsx     ← individual article pages
├── components/
│   ├── ui/                     ← atomic components (Button, Badge, Card, Input…)
│   ├── layout/                 ← Header, Container, Footer, CaseSideNav
│   └── sections/               ← Hero, Cases, Articles, Mentorship, LogoStrip
├── hooks/                      ← custom React hooks
├── lib/
│   ├── utils.ts                ← cn() and general helpers
│   ├── constants.ts            ← nav links, social URLs, case slugs
│   └── articles.ts             ← article content data (title, meta, body)
├── styles/
│   └── globals.css             ← all CSS custom properties (tokens)
└── types/
    └── index.ts                ← shared TypeScript types (CaseStudy, Article)
```

---

## Page conventions

- Home page: single long-scroll — Hero → LogoStrip → Cases → Articles → Mentorship → Footer
- Each case study has its own route: `/cases/mate-academy`, `/cases/casavista`
- Each article has its own route: `/articles/doubling-task-completion`, `/articles/ai-fears-designers`
- Each case study page **must** include:
  - project title and company name (h1 + label)
  - short outcome summary (what was achieved, key metric)
  - problem / process / result structure
  - final mockup visuals full-width
  - next/prev case navigation at the bottom
- Each article page **must** include:
  - breadcrumb (Home › Publications › Title)
  - title (h1) + meta line (author, platform, language)
  - article body with prose styles
  - "Back to publications" link at the bottom
- All section previews rendered on `surface-base` backgrounds
- Group related content under clear section labels (monospace, uppercase, tracked)

---

## Non-negotiable rules

### Colors

- NEVER use `#000`, `#fff`, or hardcoded hex values
- ALL colors come from tokens defined in `globals.css`
- When you need a new shade, create a token — never inline a hex

#### Surface scale (backgrounds)

| Token              | Value     | Usage                                        |
|--------------------|-----------|----------------------------------------------|
| `surface-base`     | `#F8F8F5` | Page background                              |
| `surface-raised`   | `#F9F7F5` | Cards, inputs, elevated areas — warm off-white, never pure white |
| `surface-overlay`  | `#F2F2EE` | Nav wrapper, hover states, subtle sections   |
| `surface-subtle`   | `#EBEBЕ6` | Dividers, skeleton loaders                   |

#### Text scale (ink)

| Token           | Value     | Usage                                     |
|-----------------|-----------|-------------------------------------------|
| `ink-primary`   | `#0B0D11` | Headings, primary text — deep off-black   |
| `ink-secondary` | `#B3B3B3` | Body text, muted headline words, captions |
| `ink-muted`     | `#D0D0D0` | Placeholders, helper text, disabled labels|

#### Border

| Token    | Value     | Usage                  |
|----------|-----------|------------------------|
| `border` | `#E4E4E0` | All borders & dividers |

---

### Accent system

Primary accent — **warm yellow** (token name: `yellow`):

```css
/* Light theme */
--color-yellow:     #E8C840;
--color-yellow-dim: #D4B232;
```

Secondary accent — **neutral ink** (no second color family):

The design uses only one accent. All secondary emphasis is achieved
through typography weight and ink scale, not additional hue.

Use `yellow` for: primary CTA button fill, active nav state, focus rings.
Use `ink-primary` + `ink-secondary` contrast for all other hierarchy.

---

### Status colors

```css
--color-error:       #E83A3A;
--color-error-dim:   #CC2E2E;
--color-success:     #22C55E;
--color-success-dim: #16A34A;
--color-warning:     #F59E0B;
--color-warning-dim: #D97706;
```

---

## Typography

### Fonts

| Token          | Font       | Usage                                        |
|----------------|------------|----------------------------------------------|
| `font-display` | Geist      | Headings, hero text, section titles — accent |
| `font-body`    | DM Sans    | Body text, UI labels, nav items              |
| `font-mono`    | Geist Mono | Company labels, section tags, code           |

**Pairing rationale:** Geist (geometric, engineered) for display creates a sharp
contrast with DM Sans (humanist, warm) in body copy. This tension — precise headings
against readable body text — reinforces the editorial tone without leaning clinical.

### Font loading (layout.tsx)

```tsx
import { Geist, Geist_Mono } from 'next/font/google';
import { DM_Sans } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500'],
});
```

Apply all three variables on the `<html>` element:

```tsx
<html className={`${geist.variable} ${geistMono.variable} ${dmSans.variable}`}>
```

### globals.css token mapping

```css
:root {
  --font-display: var(--font-geist);
  --font-body:    var(--font-dm-sans);
  --font-mono:    var(--font-geist-mono);
}
```

### Scale

| Role             | Size / Weight | Token          |
|------------------|---------------|----------------|
| Hero heading     | 48px / 700    | `font-display` |
| Section heading  | 32px / 700    | `font-display` |
| Card title       | 18px / 600    | `font-display` |
| Body             | 16px / 400    | `font-body`    |
| Label / tag      | 11px / 500    | `font-mono`    |
| Helper / caption | 13px / 400    | `font-body`    |

### Hero headline pattern

```tsx
<h1 className="font-display font-bold text-5xl leading-tight tracking-tight">
  <span className="text-ink-primary">6+ years </span>
  <span className="text-ink-primary">designing </span>
  <span className="text-ink-primary">data-driven solutions</span>
  <br />
  <span className="text-ink-secondary">for desktop, mobile, and web products</span>
  <br />
  <span className="text-ink-secondary">across </span>
  <span className="text-ink-primary">Ed-tech, Health & Fitness and AI</span>
</h1>
```

Key rule: `ink-primary` (`#0B0D11`) for semantic/bold words,
`ink-secondary` (`#B3B3B3`) for connectors and structural words.

### Rules

- Headings → `font-display tracking-tight`
- Body / UI → `font-body`
- Company labels, section tags → `font-mono tracking-widest uppercase text-xs`
- Never mix display and mono in the same line unless one is a tag label

### Restrictions

- Never use display font in body paragraphs
- Never use bold in body paragraphs (use `font-medium` max)
- Never use italic — the system has no italic role

---

## Components — General rules

- Always use `cn()` from `lib/utils.ts` — never string concatenation
- No external UI libraries (no shadcn, no Radix, no Headless UI)
- Icons: **Lucide React** only
- All interactive components must support `disabled` state
- All form components must support `error` state
- Use `forwardRef` for components that need refs

---

## Component patterns

---

### Header

The site header is a single pill-shaped container that holds all nav items.

**Anatomy:**
- **Outer container** — white (`surface-raised`) background, 1px `border-border`,
  `rounded-full`, very subtle drop shadow. All items live inside this one element.
- **Active item** — filled gray ellipse (`surface-overlay`), bold `ink-primary` text.
- **Inactive items** — no background, `ink-secondary` (`#B3B3B3`) text.
- **Dot indicator** — red circle rendered **inline before the label**, never superscript.

```tsx
<header className="flex justify-center py-4">
  {/* Outer container — white bg, gray border, soft shadow */}
  <nav className={cn(
    "inline-flex items-center gap-1 p-1.5",
    "bg-surface-raised rounded-full",
    "border border-border",
    "shadow-[0_1px_4px_0_rgba(0,0,0,0.06)]",
  )}>

    {/* Active item — gray ellipse fill, bold dark text */}
    <button className={cn(
      "font-body font-bold text-sm rounded-full",
      "bg-surface-overlay text-ink-primary",
      "px-5 py-2 transition-colors",
    )}>
      Home
    </button>

    {/* Inactive item */}
    <button className={cn(
      "font-body font-medium text-sm rounded-full",
      "bg-transparent text-ink-secondary",
      "hover:text-ink-primary px-5 py-2 transition-colors",
    )}>
      About
    </button>

    {/* Item with inline dot indicator — dot BEFORE label */}
    <button className={cn(
      "inline-flex items-center gap-1.5",
      "font-body font-medium text-sm rounded-full",
      "bg-transparent text-ink-secondary",
      "hover:text-ink-primary px-5 py-2 transition-colors",
    )}>
      <span className="w-1.5 h-1.5 rounded-full bg-error flex-shrink-0" />
      Work
    </button>

    {/* Inactive item */}
    <button className={cn(
      "font-body font-medium text-sm rounded-full",
      "bg-transparent text-ink-secondary",
      "hover:text-ink-primary px-5 py-2 transition-colors",
    )}>
      Contact
    </button>

  </nav>
</header>
```

**Shadow token** — do not use Tailwind's `shadow-sm` (too strong).
Use the custom value `shadow-[0_1px_4px_0_rgba(0,0,0,0.06)]` — barely visible,
just enough to lift the header off the page background.

**Critical rules:**
- All items are siblings inside **one** `<nav>` — never separate wrappers per item
- Active item fill is `surface-overlay` (gray), NOT white — see screenshot
- Red dot goes **before** the label, never after, never superscript
- The outer container has both `border-border` AND the custom shadow

---

### Button

Two sizes: `sm` and `md`. Three variants: `primary`, `secondary`, `ghost`.

```tsx
// Primary — yellow fill, ink-primary text
<button className={cn(
  "inline-flex items-center justify-center gap-2",
  "font-body font-medium text-sm rounded-full",
  "bg-yellow text-ink-primary border border-yellow",
  "hover:bg-yellow-dim hover:border-yellow-dim",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base",
  "disabled:opacity-40 disabled:cursor-not-allowed",
  "transition-colors px-5 py-2",
)}>

// Secondary — neutral outline
<button className={cn(
  "inline-flex items-center justify-center gap-2",
  "font-body font-medium text-sm rounded-full",
  "bg-transparent text-ink-primary border border-border",
  "hover:bg-surface-overlay hover:border-ink-secondary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base",
  "disabled:opacity-40 disabled:cursor-not-allowed",
  "transition-colors px-5 py-2",
)}>

// Ghost — text only
<button className={cn(
  "inline-flex items-center justify-center gap-2",
  "font-body text-sm rounded-full",
  "bg-transparent text-ink-secondary border border-transparent",
  "hover:text-ink-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base",
  "disabled:opacity-40 disabled:cursor-not-allowed",
  "transition-colors px-5 py-2",
)}>
```

Size modifiers:

```tsx
"text-xs px-3 py-1.5"  // sm
"text-sm px-5 py-2"    // md (default)
```

**Critical**: only primary CTA uses yellow fill. All others neutral.

---

### IconButton

Square button containing a single icon. Use for toolbar actions, close buttons,
and compact controls.

```tsx
// Ghost (default)
<button className={cn(
  "inline-flex items-center justify-center",
  "w-9 h-9 rounded-xl",
  "bg-transparent text-ink-secondary border border-transparent",
  "hover:bg-surface-overlay hover:text-ink-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base",
  "disabled:opacity-40 disabled:cursor-not-allowed",
  "transition-colors",
)}>
  <ArrowLeft size={16} />
</button>

// Outlined variant
<button className={cn(
  "inline-flex items-center justify-center",
  "w-9 h-9 rounded-xl",
  "bg-surface-raised text-ink-primary border border-border",
  "hover:border-ink-secondary hover:bg-surface-overlay",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow",
  "disabled:opacity-40 disabled:cursor-not-allowed",
  "transition-colors",
)}>
  <ExternalLink size={16} />
</button>
```

---

### Link

Inline text link and external link variants.

```tsx
// Inline link — for body copy
<a href={href} className={cn(
  "font-body text-ink-primary underline underline-offset-2",
  "decoration-border hover:decoration-ink-secondary",
  "transition-colors",
)}>
  {children}
</a>

// External link with arrow — mono uppercase, for case cards and footers
<a
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  className={cn(
    "inline-flex items-center gap-1",
    "font-mono text-xs uppercase tracking-widest text-ink-primary",
    "hover:text-ink-secondary transition-colors",
  )}
>
  {label}
  <ArrowUpRight size={12} />
</a>
```

The external link style (mono, uppercase, tracked, arrow) is used in
`detailed` case cards for "PRODUCT PAGE ↗" and "APPSTORE ↗" links.

---

### Card (project / case study)

Three variants: `featured` (full-width), `grid` (half-width), `detailed`
(title + year + description + external links, no border).

```tsx
// Featured card — full width, 16:9 image
<article className={cn(
  "w-full bg-surface-raised rounded-xl overflow-hidden",
  "border border-border",
  "hover:border-ink-secondary transition-colors cursor-pointer",
)}>
  <div className="w-full aspect-[16/9] overflow-hidden bg-surface-overlay">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
  <div className="px-5 py-4">
    <p className="font-mono text-xs uppercase tracking-widest text-ink-secondary mb-1">
      {company}
    </p>
    <h3 className="font-display font-semibold text-base text-ink-primary leading-snug">
      {title}
    </h3>
  </div>
</article>

// Grid card — half width, 4:3 image
<article className={cn(
  "bg-surface-raised rounded-xl overflow-hidden",
  "border border-border",
  "hover:border-ink-secondary transition-colors cursor-pointer",
)}>
  <div className="w-full aspect-[4/3] overflow-hidden bg-surface-overlay">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
  <div className="px-4 py-3">
    <p className="font-mono text-xs uppercase tracking-widest text-ink-secondary mb-1">
      {company}
    </p>
    <h3 className="font-display font-semibold text-sm text-ink-primary leading-snug">
      {title}
    </h3>
  </div>
</article>

// Detailed card — title + year + description + external links
// No outer border. Use for case studies with live products / external links.
<article className="w-full cursor-pointer">
  <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-surface-overlay mb-4">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>

  {/* Title + year on same baseline */}
  <div className="flex items-baseline gap-3 mb-2">
    <h3 className="font-display font-semibold text-lg text-ink-primary leading-snug">
      {title}
    </h3>
    <span className="font-body text-sm text-ink-secondary flex-shrink-0">
      {year}
    </span>
  </div>

  {/* Description */}
  <p className="font-body text-sm text-ink-secondary leading-relaxed mb-4">
    {description}
  </p>

  {/* External links row — mono uppercase */}
  {links && (
    <div className="flex items-center gap-6">
      {links.map(link => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1",
            "font-mono text-xs uppercase tracking-widest text-ink-primary",
            "hover:text-ink-secondary transition-colors",
          )}
        >
          {link.label}
          <ArrowUpRight size={12} />
        </a>
      ))}
    </div>
  )}
</article>
```

**Which variant to use:**
- `featured` — primary case on home page
- `grid` — secondary cases in the 2-col grid
- `detailed` — case studies with live products / external links

---

### Badge / Company label

```tsx
// Company label — monospace, no background
<span className="font-mono text-xs uppercase tracking-widest text-ink-secondary">
  Mate academy
</span>

// Tag chip — with background
<span className={cn(
  "font-mono text-xs uppercase tracking-widest",
  "bg-surface-overlay text-ink-secondary rounded-full px-3 py-1",
)}>
  UX Research
</span>
```

---

### Avatar

```tsx
// Image avatar
<div className={cn(
  "overflow-hidden rounded-full flex-shrink-0",
  size === "sm" && "w-8 h-8",
  size === "md" && "w-10 h-10",
  size === "lg" && "w-14 h-14",
)}>
  <img src={src} alt={name} className="w-full h-full object-cover" />
</div>

// Initials fallback
<div className={cn(
  "rounded-full flex items-center justify-center flex-shrink-0",
  "bg-surface-overlay text-ink-secondary font-body font-medium",
  size === "sm" && "w-8 h-8 text-xs",
  size === "md" && "w-10 h-10 text-sm",
  size === "lg" && "w-14 h-14 text-base",
)}>
  {initials}
</div>

// Avatar + name row
<div className="flex items-center gap-3">
  <Avatar src={src} name={name} size="md" />
  <div>
    <p className="font-body font-medium text-sm text-ink-primary">{name}</p>
    <p className="font-body text-xs text-ink-secondary">{role}</p>
  </div>
</div>
```

---

### Input

```tsx
<input className={cn(
  "w-full bg-surface-raised border border-border rounded-xl",
  "text-ink-primary font-body text-sm px-3 py-2.5",
  "placeholder:text-ink-secondary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base",
  "disabled:opacity-40 disabled:cursor-not-allowed",
)} />
```

Full input with label, helper, error:

```tsx
<div className="w-full">
  <label className="block text-sm font-body font-medium text-ink-primary mb-1.5">
    Label
  </label>
  <input className={cn(
    "w-full bg-surface-raised border rounded-xl",
    "text-ink-primary font-body text-sm px-3 py-2.5",
    "placeholder:text-ink-secondary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    error ? "border-error" : "border-border",
  )} />
  {error && <p className="text-xs text-error mt-1.5">{errorMessage}</p>}
  {!error && helperText && <p className="text-xs text-ink-secondary mt-1.5">{helperText}</p>}
</div>
```

---

### Checkbox

```tsx
<label className="inline-flex items-start gap-3 cursor-pointer">
  <div className="relative mt-0.5">
    <input type="checkbox" className="sr-only peer" />
    <div className={cn(
      "w-4 h-4 rounded border border-border bg-surface-raised",
      "peer-checked:bg-ink-primary peer-checked:border-ink-primary",
      "peer-focus-visible:ring-2 peer-focus-visible:ring-yellow",
      "peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-base",
      "peer-disabled:opacity-40 peer-disabled:cursor-not-allowed",
      "transition-colors flex items-center justify-center",
    )}>
      <Check size={10} className="text-surface-raised opacity-0 peer-checked:opacity-100" />
    </div>
  </div>
  <span className="font-body text-sm text-ink-primary leading-snug">{label}</span>
</label>
```

---

### Radio Button

```tsx
<label className="inline-flex items-center gap-3 cursor-pointer">
  <div className="relative w-4 h-4">
    <input type="radio" name={name} className="sr-only peer" />
    <div className={cn(
      "w-4 h-4 rounded-full border border-border bg-surface-raised",
      "peer-checked:border-ink-primary",
      "peer-focus-visible:ring-2 peer-focus-visible:ring-yellow",
      "peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-base",
      "peer-disabled:opacity-40",
      "transition-colors flex items-center justify-center",
    )}>
      <div className="w-2 h-2 rounded-full bg-ink-primary scale-0 peer-checked:scale-100 transition-transform" />
    </div>
  </div>
  <span className="font-body text-sm text-ink-primary">{label}</span>
</label>
```

---

### Toggle / Switch

```tsx
<label className="inline-flex items-center gap-3 cursor-pointer">
  <div className="relative">
    <input type="checkbox" className="sr-only peer" />
    {/* Track */}
    <div className={cn(
      "w-9 h-5 rounded-full",
      "bg-surface-subtle border border-border",
      "peer-checked:bg-ink-primary peer-checked:border-ink-primary",
      "peer-focus-visible:ring-2 peer-focus-visible:ring-yellow",
      "peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-base",
      "peer-disabled:opacity-40",
      "transition-colors",
    )} />
    {/* Thumb */}
    <div className={cn(
      "absolute top-0.5 left-0.5 w-4 h-4",
      "rounded-full bg-surface-raised shadow-sm",
      "peer-checked:translate-x-4 transition-transform",
    )} />
  </div>
  {label && <span className="font-body text-sm text-ink-primary">{label}</span>}
</label>
```

---

### Tabs

Reuses the same track-and-pill pattern as NavPill. Used inside case study
pages to switch between sections (Overview, Process, Outcome).

```tsx
<div className={cn(
  "inline-flex items-center gap-1 p-1",
  "bg-surface-overlay rounded-full",
)}>
  {tabs.map(tab => (
    <button
      key={tab.id}
      onClick={() => setActive(tab.id)}
      className={cn(
        "font-body font-medium text-sm rounded-full",
        "px-4 py-1.5 transition-colors",
        active === tab.id
          ? "bg-surface-raised text-ink-primary shadow-sm"
          : "bg-transparent text-ink-secondary hover:text-ink-primary",
      )}
    >
      {tab.label}
    </button>
  ))}
</div>

<div role="tabpanel" className="mt-8">
  {activeContent}
</div>
```

---

### Accordion

```tsx
<div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
  {items.map(item => (
    <div key={item.id}>
      <button
        onClick={() => toggle(item.id)}
        className={cn(
          "w-full flex items-center justify-between",
          "px-5 py-4 text-left",
          "font-body font-medium text-sm text-ink-primary",
          "hover:bg-surface-overlay transition-colors",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-yellow focus-visible:ring-inset",
        )}
      >
        {item.question}
        <ChevronDown
          size={16}
          className={cn(
            "text-ink-secondary flex-shrink-0 transition-transform duration-200",
            open === item.id && "rotate-180",
          )}
        />
      </button>
      {open === item.id && (
        <div className="px-5 pb-4">
          <p className="font-body text-sm text-ink-secondary leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  ))}
</div>
```

---

### Modal

```tsx
<div
  className="fixed inset-0 bg-ink-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-6"
  onClick={onClose}
>
  <div
    className="bg-surface-raised rounded-xl w-full max-w-md border border-border p-6"
    onClick={e => e.stopPropagation()}
  >
    <div className="flex items-start justify-between mb-5">
      <h2 className="font-display font-semibold text-lg text-ink-primary">
        {title}
      </h2>
      <IconButton onClick={onClose} aria-label="Close">
        <X size={16} />
      </IconButton>
    </div>

    <div className="font-body text-sm text-ink-secondary leading-relaxed mb-6">
      {children}
    </div>

    <div className="flex items-center justify-end gap-3">
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={onConfirm}>{confirmLabel}</Button>
    </div>
  </div>
</div>
```

---

### Toast

Appears at bottom-center, auto-dismisses after 4s.

```tsx
<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
  <div
    role="status"
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-full",
      "font-body text-sm font-medium shadow-lg",
      "bg-ink-primary text-surface-raised",
      variant === "success" && "bg-success",
      variant === "error"   && "bg-error",
    )}
  >
    {icon && <span className="flex-shrink-0">{icon}</span>}
    {message}
    <button
      onClick={dismiss}
      className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
      aria-label="Dismiss"
    >
      <X size={14} />
    </button>
  </div>
</div>
```

Variants: `default` (ink-primary dark), `success`, `error`.
Text is always `surface-raised` (warm off-white) regardless of variant.

---

### Breadcrumb

```tsx
<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-2">
    {items.map((item, index) => (
      <li key={item.href} className="flex items-center gap-2">
        {index > 0 && (
          <ChevronRight size={12} className="text-ink-secondary flex-shrink-0" />
        )}
        {index === items.length - 1 ? (
          <span className="font-body text-sm text-ink-primary font-medium">
            {item.label}
          </span>
        ) : (
          <a
            href={item.href}
            className="font-body text-sm text-ink-secondary hover:text-ink-primary transition-colors"
          >
            {item.label}
          </a>
        )}
      </li>
    ))}
  </ol>
</nav>
```

---

### Pagination

Prev/next case navigation at the bottom of case study pages.

```tsx
<nav className="flex items-center justify-between pt-8 border-t border-border">

  {prev ? (
    <a href={prev.href} className="flex items-center gap-3 hover:opacity-70 transition-opacity">
      <IconButton as="span"><ArrowLeft size={16} /></IconButton>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-secondary mb-0.5">Previous</p>
        <p className="font-body font-medium text-sm text-ink-primary">{prev.title}</p>
      </div>
    </a>
  ) : <div />}

  {next && (
    <a href={next.href} className="flex items-center gap-3 text-right hover:opacity-70 transition-opacity">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-secondary mb-0.5">Next</p>
        <p className="font-body font-medium text-sm text-ink-primary">{next.title}</p>
      </div>
      <IconButton as="span"><ArrowRight size={16} /></IconButton>
    </a>
  )}

</nav>
```

---

### Progress Bar

```tsx
<div className="w-full">
  {label && (
    <div className="flex items-center justify-between mb-2">
      <span className="font-body text-sm text-ink-primary">{label}</span>
      <span className="font-mono text-xs text-ink-secondary">{value}%</span>
    </div>
  )}
  <div className="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden">
    {/* Default fill — ink-primary. For primary metric use bg-yellow. */}
    <div
      className="h-full bg-ink-primary rounded-full transition-all duration-500"
      style={{ width: `${value}%` }}
    />
  </div>
</div>
```

---

### Skeleton Loader

Add `skeleton` keyframes to `globals.css`:

```css
@keyframes skeleton {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.skeleton {
  animation: skeleton 1.5s ease-in-out infinite;
}
```

```tsx
<div className="skeleton h-4 bg-surface-subtle rounded-full w-3/4" />          // text line
<div className="skeleton w-10 h-10 bg-surface-subtle rounded-full" />           // avatar
<div className="skeleton w-full aspect-[4/3] bg-surface-subtle rounded-xl" />  // card image

// Full card skeleton
<div
  className="bg-surface-raised rounded-xl overflow-hidden border border-border"
  aria-busy="true"
  aria-label="Loading…"
>
  <div className="skeleton w-full aspect-[4/3] bg-surface-subtle" />
  <div className="space-y-2 px-4 py-3">
    <div className="skeleton h-3 bg-surface-subtle rounded-full w-1/4" />
    <div className="skeleton h-4 bg-surface-subtle rounded-full w-2/3" />
  </div>
</div>
```

---

### Empty State

```tsx
<div className="flex flex-col items-center justify-center py-20 text-center">
  {icon && (
    <div className="w-12 h-12 rounded-xl bg-surface-overlay flex items-center justify-center mb-4">
      <span className="text-ink-secondary">{icon}</span>
    </div>
  )}
  <h3 className="font-display font-semibold text-base text-ink-primary mb-2">
    {title}
  </h3>
  <p className="font-body text-sm text-ink-secondary max-w-xs leading-relaxed mb-6">
    {description}
  </p>
  {action && (
    <Button variant="secondary" onClick={action.onClick}>{action.label}</Button>
  )}
</div>
```

---

### CaseSideNav

Sticky sidebar tracking the reader's position through case study sections.
Only visible on `lg` screens — mobile uses section labels in the main content.

```tsx
<aside className="sticky top-8 w-48 flex-shrink-0 hidden lg:block">
  <nav>
    <ul className="space-y-1">
      {sections.map(section => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            aria-current={active === section.id ? "true" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2",
              "font-body text-sm transition-colors",
              active === section.id
                ? "bg-surface-overlay text-ink-primary font-medium"
                : "text-ink-secondary hover:text-ink-primary",
            )}
          >
            <span className={cn(
              "w-0.5 h-4 rounded-full flex-shrink-0",
              active === section.id ? "bg-ink-primary" : "bg-transparent",
            )} />
            {section.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</aside>

// Case study layout
<div className="max-w-5xl mx-auto px-6 flex gap-16">
  <CaseSideNav sections={sections} active={activeSection} />
  <main className="flex-1 min-w-0">{content}</main>
</div>
```

Use `useActiveSection` hook with `IntersectionObserver` to track the
current section and pass it as `active`.

---

## Forms

### Base input styles

```
bg-surface-raised border border-border rounded-xl text-ink-primary font-body text-sm
```

### Focus ring (all form elements)

```
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-yellow
focus-visible:ring-offset-2
focus-visible:ring-offset-surface-base
```

### Error state

- `border-error` instead of `border-border`
- `text-error` for error message
- Error message: `text-xs text-error mt-1.5`

### Disabled state

```
opacity-40 cursor-not-allowed
```

### Labels

```
text-sm font-body font-medium text-ink-primary mb-1.5
```

### Helper text

```
text-xs font-body text-ink-secondary mt-1.5
```

---

## Borders & Radius

| Element               | Radius                |
|-----------------------|-----------------------|
| Cards, modals         | `rounded-xl` (12px)   |
| Inputs, buttons (rect)| `rounded-xl` (12px)   |
| Nav pills, tab bars   | `rounded-full`        |
| CTA buttons, badges   | `rounded-full`        |
| Full-bleed images     | `rounded-none`        |

- Default border: `border-border` (1px)
- Card hover: border transitions to `ink-secondary`
- Detailed cards: no border — open, borderless layout
- Active nav/tab pill: `shadow-sm` to lift off track

---

## Section layout

```tsx
<section className="py-16 md:py-24">
  <div className="max-w-3xl mx-auto px-6">
    <p className="font-mono text-xs uppercase tracking-widest text-ink-secondary mb-8">
      Cases
    </p>
    {/* content */}
  </div>
</section>
```

### Cases layout

```tsx
<div className="mb-6">
  <CaseCard variant="featured" ... />
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <CaseCard variant="grid" ... />
  <CaseCard variant="grid" ... />
</div>
```

### Logo strip

```tsx
<div className="flex items-center justify-center gap-8 md:gap-12 opacity-40">
  {logos.map(logo => (
    <img key={logo.name} src={logo.src} alt={logo.name}
         className="h-5 object-contain grayscale" aria-hidden="true" />
  ))}
</div>
```

Logo strip is always `grayscale opacity-40` — decorative, never distracting.

---

## Spacing scale

| Token   | Size | Usage                          |
|---------|------|--------------------------------|
| `gap-1` | 4px  | Inline icon + text             |
| `gap-2` | 8px  | Tight groups (nav pills, tags) |
| `gap-4` | 16px | Card grid gap, button groups   |
| `gap-6` | 24px | Section elements, form fields  |
| `gap-8` | 32px | Major content blocks           |
| `py-16` | 64px | Section padding (mobile)       |
| `py-24` | 96px | Section padding (desktop)      |

---

## Accessibility

- All interactive elements must have visible focus rings (yellow ring)
- Use semantic HTML: `<button>` for actions, `<a>` for navigation, `<article>` for cards
- Images need descriptive `alt` text; decorative images use `alt=""`
- Minimum touch target: 36×36px for all interactive elements
- Logo strip images: `aria-hidden="true"` — decorative
- Modals must trap focus and restore it on close
- Toasts: `role="status"` for info/success, `role="alert"` for errors
- Skeleton loaders: `aria-busy="true"` on container, `aria-label="Loading…"`
- CaseSideNav: `aria-current="true"` on active link

---

## File naming conventions

- Components: `PascalCase.tsx` — `Button.tsx`, `NavPill.tsx`, `CaseCard.tsx`
- Section components: `PascalCase.tsx` — `Hero.tsx`, `Cases.tsx`
- Hooks: `camelCase.ts` with `use` prefix — `useScrollPosition.ts`, `useActiveSection.ts`
- Utils: `camelCase.ts` — `utils.ts`, `formatDate.ts`
- Types: `PascalCase` exports — `CaseStudy`, `Article`, `NavItem`
- Case routes: `kebab-case` slug — `/cases/mate-academy`, `/cases/casavista-app`
- Asset images: `kebab-case` — `mate-academy-hero.png`, `casavista-mockup.png`

---

## Content types

### CaseStudy

```ts
interface CaseStudy {
  slug: string;
  company: string;         // "Mate academy"
  title: string;           // "Boosting DAU/MAU by 36% with gamification"
  category: string;        // "Mobile app" | "Web" | "Design system"
  coverImage: string;      // path to preview image
  year: number;
  featured?: boolean;      // renders as full-width card
  description?: string;    // short summary for detailed card variant
  links?: {                // external links for detailed card variant
    label: string;         // "PRODUCT PAGE"
    url: string;
  }[];
}
```

### Article

```ts
interface Article {
  slug: string;
  title: string;
  platform: string;        // "DOU" | "vctr.media" | "dev.ua"
  language: string;         // "ua" | "en"
  hasPage: boolean;         // true = internal page, false = external link only
  externalUrl?: string;     // original article URL (if external)
}
```

### Articles data

```ts
const articles: Article[] = [
  {
    slug: "doubling-task-completion",
    title: "Doubling task completion: How an EdTech startup enhances students' motivation through effective UI/UX design",
    platform: "DOU",
    language: "ua",
    hasPage: true,
  },
  {
    slug: "interview-100-questions",
    title: "Interview with UI/UX Designer. 100 questions",
    platform: "DOU",
    language: "ua",
    hasPage: false,
    externalUrl: "https://dou.ua/...",
  },
  {
    slug: "ai-fears-designers",
    title: "We are dedicated to communication. How can product designers overcome fears about AI?",
    platform: "vctr.media",
    language: "ua",
    hasPage: true,
  },
  {
    slug: "junior-designer-guide",
    title: "A guide for junior designers",
    platform: "dev.ua",
    language: "ua",
    hasPage: true,
  },
];
```

---

## Articles — Home page section

Section label: `font-mono text-xs uppercase tracking-widest text-ink-secondary` → "Publications"

4 cards stacked vertically with `gap-4`. Each card is clickable and
links to `/articles/[slug]` (if `hasPage: true`) or external URL.

```tsx
// Article card on home page
<a
  href={article.hasPage ? `/articles/${article.slug}` : article.externalUrl}
  target={article.hasPage ? undefined : "_blank"}
  rel={article.hasPage ? undefined : "noopener noreferrer"}
  className={cn(
    "block bg-surface-raised rounded-xl border border-border",
    "px-5 py-4",
    "hover:border-ink-secondary transition-colors cursor-pointer",
  )}
>
  {/* Title */}
  <h3 className="font-body font-medium text-base text-ink-primary mb-1">
    {article.title}
  </h3>
  {/* Platform */}
  <p className="font-body text-sm text-ink-secondary">
    article for {article.platform} ({article.language})
  </p>
</a>
```

No images, no dates, no tags, no arrow icons inside the card.
Only the title link has visual weight — platform label is secondary.

---

## Article page — /articles/[slug]

Layout: `max-w-3xl mx-auto px-6 py-16 md:py-24`

### Top section

```tsx
{/* Breadcrumb */}
<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-2">
    <li><a href="/" className="font-body text-sm text-ink-secondary hover:text-ink-primary transition-colors">Home</a></li>
    <li><ChevronRight size={12} className="text-ink-secondary" /></li>
    <li><a href="/#publications" className="font-body text-sm text-ink-secondary hover:text-ink-primary transition-colors">Publications</a></li>
    <li><ChevronRight size={12} className="text-ink-secondary" /></li>
    <li><span className="font-body text-sm text-ink-primary font-medium">{title}</span></li>
  </ol>
</nav>

{/* Title */}
<h1 className="font-display font-bold text-3xl text-ink-primary mt-6 mb-3">
  {title}
</h1>

{/* Meta */}
<p className="font-body text-sm text-ink-secondary mb-2">
  Anna Yarigina · {platform} · Originally published in {language}
</p>

{/* Divider */}
<hr className="border-t border-border mt-6 mb-10" />
```

### Article body — prose styles

```
h2:  font-display font-bold text-xl text-ink-primary mt-12 mb-4
h3:  font-display font-semibold text-lg text-ink-primary mt-8 mb-3
p:   font-body text-base text-ink-secondary leading-relaxed mb-4
bold text inside p: text-ink-primary font-medium (never font-bold)
ul/ol: font-body text-base text-ink-secondary leading-relaxed mb-4, list-disc pl-6
blockquote: border-l-2 border-border pl-4 text-ink-secondary
hr:  border-t border-border my-10
links: text-ink-primary underline underline-offset-2 decoration-border hover:decoration-ink-secondary
```

### Bottom section

```tsx
<hr className="border-t border-border mt-12 pt-8" />
<a
  href="/#publications"
  className={cn(
    "inline-flex items-center gap-2",
    "font-mono text-xs uppercase tracking-widest",
    "text-ink-secondary hover:text-ink-primary transition-colors",
  )}
>
  <ArrowLeft size={12} />
  Back to publications
</a>
```

---

## Article content

### Article 1 — /articles/doubling-task-completion

**Title:** Doubling task completion: How an EdTech startup enhances students' motivation through effective UI/UX design
**Platform:** DOU
**Language:** Ukrainian (translated to English)

**Body sections:**
1. Intro — who I am, what Mate Academy is, what the retention team does
2. Three key outcomes: +30 min weekly time, 2x daily tasks, 43% adopted deadlines
3. **Achievements** — Goal (retention), 5-step process, result (46K monthly opens, +20% graded reviews)
4. **Streaks** — Goal (engagement), 3-step process including frozen streak concept, result (+30 min, 2x tasks)
5. **Soft deadlines** — Goal (retention), 3-step process with survey data (38.2%), result (43% adoption)
6. **Takeaways** — research foundation, dev collaboration, design consistency, feedback loops, market awareness

### Article 2 — /articles/ai-fears-designers

**Title:** We are dedicated to communication. How can product designers overcome fears about AI?
**Platform:** vctr.media
**Language:** Ukrainian (translated to English)

**Body sections:**
1. Intro — Mate Academy uses AI, but designers still worry
2. **AI can't communicate with people** — soft skills, interviews, team collaboration
3. **AI expands capabilities but can't think outside the box** — patterns vs creativity
4. **AI is an assistant, not a competitor** — more tools = bigger work, not less work
5. **AI tools lack empathy** — mentoring requires personalisation
6. **Nine tasks to delegate to AI** — numbered list (interview scripts, checklists, docs, palettes, UX writing, brainstorming, image prompts, tool discovery)
7. **Ignoring AI is not an option** — calculators didn't replace mathematicians

### Article 3 — /articles/junior-designer-guide

**Title:** A guide for junior designers
**Platform:** dev.ua
**Language:** Ukrainian (translated to English)

**Body sections:**
1. Intro — guide for aspiring UI/UX designers
2. **What employers look for** — soft skills, business understanding, growth roadmap, BLUF method
3. **Red flags in interviews** — money focus, dependency signaling, embellishment, no company research
4. **What to expect in an interview** — UX theory questions, UI theory questions, general questions, portfolio review, whiteboard interview
5. **How to prepare** — daily Figma practice, design thinking exercises, community engagement, salary expectations

### NavItem

```ts
interface NavItem {
  label: string;
  href: string;
  hasIndicator?: boolean;  // shows inline red dot before label (e.g. "Work")
}
```

### CaseSection (for CaseSideNav)

```ts
interface CaseSection {
  id: string;              // matches the section's HTML id attribute
  label: string;           // "Overview" | "Problem" | "Process" | "Outcome"
}
```

---

## Design philosophy

- Use **typography weight** for hierarchy — not color, not size alone
- Use **spacing** to separate sections — not decorative dividers
- Use **yellow sparingly** — one CTA per view maximum
- The logo strip and company labels are always muted — projects speak, not brands

The site must feel: **confident, editorial, understated, personal.**
