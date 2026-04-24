# Design Brief

## Direction
Aura Sublime Perfume — Luxury e-commerce platform with cinematic product presentation and opulent aesthetic.

## Tone
Refined and unapproachable-yet-inviting; dark opulent warmth executed with precision to avoid gaudiness, embodying high-end boutique luxury.

## Differentiation
Cinematic hero sections with subtle gradient accents on serif headings, soft-glowing product cards, and intentional depth through color temperature shifts create an unforgettable premium brand experience.

## Color Palette

| Token       | OKLCH             | Role                          |
|-------------|-------------------|-------------------------------|
| background  | 0.14 0.015 50     | Deep charcoal canvas          |
| foreground  | 0.92 0.01 60      | Soft cream/ivory text         |
| card        | 0.18 0.018 50     | Elevated surface              |
| primary     | 0.48 0.16 8       | Rich burgundy/wine accents    |
| accent      | 0.72 0.17 70      | Warm gold/amber highlights    |
| muted       | 0.22 0.02 50      | Subtle secondary backgrounds  |
| destructive | 0.55 0.22 25      | Error red                     |

## Typography

- Display: **Fraunces** — Serif elegance for hero text, section headers, product names
- Body: **Satoshi** — Refined sans-serif for UI labels, descriptions, body copy
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Warm dark palette with progressive lightness shifts (0.18 → 0.22 → 0.28) creates surface hierarchy; soft elevated shadows (8–24px blur) and subtle gold glow effects on cards reinforce luxury without harsh contrast.

## Structural Zones

| Zone    | Background           | Border                          | Notes                                    |
|---------|----------------------|---------------------------------|------------------------------------------|
| Header  | card (0.18)          | border with subtle warm tint    | Sticky nav with logo, search, cart, account icons |
| Hero    | background (0.14)    | —                               | Full-width cinematic product image with overlay |
| Content | alternating bg/card  | —                               | Product grid: bg-background, card sections bg-card/muted |
| Footer  | card (0.18)          | border-t with subtle warmth     | Company info, links, contact in muted text |

## Spacing & Rhythm

Spacious section gaps (6–8 rem vertically), generous card padding (1.5–2 rem), micro-spacing (0.5–1 rem) within components; subtle warm color transitions between zones create visual breathing room and narrative flow.

## Component Patterns

- **Buttons**: Burgundy primary with gold hover state, rounded (0.5rem), soft elevated shadow, cream text
- **Cards**: Rounded (0.5rem), background `card`, border subtle warm, shadow elevated + glow effect on hover
- **Badges**: Gold accent background, burgundy text, rounded (0.25rem), uppercase label

## Motion

- **Entrance**: Fade-in + slide-up (0.4–0.5s ease-out) for hero and product cards on page load
- **Hover**: Card elevation + glow intensification on product cards; button color shift + subtle scale (1.02x) on CTAs
- **Decorative**: None; restraint preserves sophistication

## Constraints

- No gradients beyond hero cinematic effect; avoid glow on non-interactive elements
- Typography hierarchy strict: only one h1 per page, limit h2 to section headers
- Accent color reserved for CTAs, badges, and hover states; use sparingly
- Dark mode only; no light mode variant

## Signature Detail

Warm burgundy primary and gold accent pairing creates instantly recognizable luxury identity; combined with serif-driven typography and soft shadows, signals premium positioning without appearing trendy or generic.
