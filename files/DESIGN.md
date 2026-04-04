# Actionable. — Brand Design System

## Logo

The wordmark "Actionable." in TeX Gyre Adventor Bold (Avant Garde Gothic Bold) with an orange circle replacing the period. The period-as-dot is the brand's signature element — it appears in the logo, echoes the constellation nodes in the background visual, and signals finality: intelligence that's complete, validated, ready to deploy.

**Logo files included:**
- `actionable-logo.svg` — scalable vector, uses Advent Pro (Google Fonts equivalent)
- `actionable-logo-1000.png` — 1000×1000 master raster
- `actionable-logo-512.png` — GitHub / social
- `actionable-logo-256.png` — Discord bot avatar
- `actionable-logo-128.png` — favicon source
- `actionable-logo-64.png` — small icon

**Logo rules:**
- Minimum clear space: 20% of logo width on all sides
- Never stretch, rotate, or recolor the wordmark
- The orange dot is always `#D4760A` — never swap it to white or any other color
- On light backgrounds, invert the wordmark to `#0A0A0A` (keep the orange dot)
- The constellation node background is optional decoration, not part of the core mark

---

## Typography

### Font System

| Role | Font | Weight | Google Fonts | Fallback Stack |
|------|------|--------|-------------|----------------|
| Display / Logo | Advent Pro | 700 (Bold) | `Advent+Pro:wght@700` | Century Gothic, URW Gothic, ITC Avant Garde Gothic, sans-serif |
| Headings (H1–H3) | Advent Pro | 600 (SemiBold) | `Advent+Pro:wght@600` | Century Gothic, sans-serif |
| Body / Docs | Inter | 400 / 500 | `Inter:wght@400;500` | -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif |
| Code / CLI | JetBrains Mono | 400 | `JetBrains+Mono:wght@400` | Consolas, Monaco, Courier New, monospace |

### Why This Pairing

Advent Pro is the Google Fonts equivalent of ITC Avant Garde Gothic — the same geometric DNA as TeX Gyre Adventor with its wide circular "a" and "e" shapes and tight spacing. It serves as the display and heading font, carrying the brand's distinctive character.

Inter is the companion body font. Where Advent Pro is geometric and stylized, Inter is designed specifically for screen readability at small sizes. The contrast creates hierarchy: Advent Pro demands attention for headings, Inter recedes for long-form reading in docs and feature descriptions. Inter's x-height and letter-spacing are tuned for UI text, making it the right choice for the VitePress documentation site.

JetBrains Mono handles all code blocks, CLI examples, and inline code. It has clear disambiguation between similar characters (0/O, 1/l/I) which matters for security tooling where IOCs and rule syntax need to be read precisely.

### Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| Hero title | Advent Pro | 72px / 4.5rem | 700 | 1.0 | -0.02em |
| Page heading (H1) | Advent Pro | 36px / 2.25rem | 600 | 1.2 | -0.01em |
| Section heading (H2) | Advent Pro | 24px / 1.5rem | 600 | 1.3 | 0 |
| Subsection (H3) | Advent Pro | 20px / 1.25rem | 600 | 1.4 | 0 |
| Body large | Inter | 18px / 1.125rem | 400 | 1.6 | 0 |
| Body default | Inter | 16px / 1rem | 400 | 1.6 | 0 |
| Body small / captions | Inter | 14px / 0.875rem | 400 | 1.5 | 0.01em |
| Code blocks | JetBrains Mono | 14px / 0.875rem | 400 | 1.6 | 0 |
| Inline code | JetBrains Mono | 0.9em | 400 | inherit | 0 |
| Nav / sidebar | Inter | 14px / 0.875rem | 500 | 1.5 | 0.01em |

---

## Color Palette

### Core Colors

| Name | Hex | Usage |
|------|-----|-------|
| Void | `#0A0A0A` | Primary background, logo background |
| White | `#FFFFFF` | Primary text on dark, logo wordmark |
| Ember | `#D4760A` | Brand accent — period dot, node dots, links, active states |
| Ember Light | `#E8943A` | Hover states, secondary accent |
| Ember Dim | `#8B4D06` | Pressed states, muted accent |

### Neutral Scale (Dark Theme)

| Name | Hex | Usage |
|------|-----|-------|
| Surface | `#141414` | Card backgrounds, elevated surfaces |
| Surface Raised | `#1E1E1E` | Code blocks, sidebar, hover backgrounds |
| Border | `#2A2A2A` | Dividers, table borders, card outlines |
| Muted | `#6B6B6B` | Secondary text, timestamps, labels |
| Secondary | `#A0A0A0` | Body text on dark |
| Primary | `#E8E8E8` | Headings, primary text on dark |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Critical | `#E84040` | Critical alerts, failed validation |
| Warning | `#D4760A` | Warning states (shares Ember) |
| Success | `#3AAE5C` | Validated rules, successful operations |
| Info | `#4A90D9` | Informational states, links in docs |

### Node Network

The constellation visual uses Ember (`#D4760A`) at varying opacities:
- Node dots: 25%–50% opacity, radius 1.8–3.5px
- Connection lines: 8%–18% opacity, stroke 0.5–0.8px

This creates a subtle, ambient background that never competes with content.

---

## VitePress Implementation

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Advent+Pro:wght@600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap');
```

### CSS Custom Properties

```css
/* .vitepress/theme/custom.css */

:root {
  /* Typography */
  --vp-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --vp-font-family-mono: 'JetBrains Mono', Consolas, Monaco, 'Courier New', monospace;
  
  /* Brand colors */
  --actionable-ember: #D4760A;
  --actionable-ember-light: #E8943A;
  --actionable-ember-dim: #8B4D06;
  --actionable-void: #0A0A0A;
}

/* Dark theme (default) */
.dark {
  --vp-c-brand-1: #D4760A;
  --vp-c-brand-2: #E8943A;
  --vp-c-brand-3: #8B4D06;
  --vp-c-brand-soft: rgba(212, 118, 10, 0.14);
  
  --vp-c-bg: #0A0A0A;
  --vp-c-bg-alt: #141414;
  --vp-c-bg-elv: #1E1E1E;
  --vp-c-bg-soft: #1E1E1E;
  
  --vp-c-text-1: #E8E8E8;
  --vp-c-text-2: #A0A0A0;
  --vp-c-text-3: #6B6B6B;
  
  --vp-c-divider: #2A2A2A;
  --vp-c-border: #2A2A2A;
  --vp-c-gutter: #141414;
  
  --vp-code-bg: #1E1E1E;
  --vp-code-color: #E8E8E8;
  
  --vp-button-brand-bg: #D4760A;
  --vp-button-brand-hover-bg: #E8943A;
  --vp-button-brand-active-bg: #8B4D06;
  --vp-button-brand-text: #FFFFFF;
}

/* Light theme */
:root {
  --vp-c-brand-1: #D4760A;
  --vp-c-brand-2: #8B4D06;
  --vp-c-brand-3: #E8943A;
  --vp-c-brand-soft: rgba(212, 118, 10, 0.08);
}

/* Heading font override */
.vp-doc h1,
.vp-doc h2,
.vp-doc h3 {
  font-family: 'Advent Pro', 'Century Gothic', sans-serif;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.vp-doc h1 {
  font-size: 2.25rem;
  letter-spacing: -0.02em;
}

/* Hero section on landing page */
.VPHero .name {
  font-family: 'Advent Pro', 'Century Gothic', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
}

.VPHero .tagline {
  font-family: 'Advent Pro', 'Century Gothic', sans-serif;
  font-weight: 600;
}

/* Sidebar nav */
.VPSidebar .text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
}

/* Code blocks */
.vp-doc [class*='language-'] code {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 0.875rem;
}
```

### VitePress Config (head)

```js
// .vitepress/config.ts
export default defineConfig({
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://fonts.googleapis.com/css2?family=Advent+Pro:wght@600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap' 
    }],
  ],
})
```

---

## Component Patterns

### Buttons

- **Primary (Brand):** Ember background, white text, 8px radius
- **Secondary (Alt):** Transparent with white border, white text, 8px radius  
- **Hover:** Ember Light background on primary, Ember at 10% on secondary
- **Font:** Inter 500, 14px, 0.01em letter-spacing

### Cards / Feature Blocks

- Background: Surface (`#141414`)
- Border: 1px Border (`#2A2A2A`)
- Border radius: 12px
- Heading: Advent Pro 600
- Body: Inter 400
- Accent elements: Ember for icons, indicators, hover borders

### The Period Dot

The orange dot can be used as a standalone brand element:
- As a list marker replacing standard bullets
- As a status indicator (active/online)
- As a section separator
- As a cursor/caret in animations
- Never below 8px diameter — it needs to read as intentional, not a rendering artifact

---

## File Summary

| File | Purpose |
|------|---------|
| `actionable-logo.svg` | Vector logo — scalable, uses Google Fonts |
| `actionable-logo-1000.png` | Master raster at 1000×1000 |
| `actionable-logo-512.png` | GitHub / social media avatar |
| `actionable-logo-256.png` | Discord bot avatar |
| `actionable-logo-128.png` | Favicon source |
| `actionable-logo-64.png` | Small icon contexts |
| `DESIGN.md` | This document |
