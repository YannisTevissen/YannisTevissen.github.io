# Site design — research lab style

## Intent

Understated, technical, scannable. Reads like a PI / research-lead page, not a marketing site. Use a quiet ivory background, cool slate text, muted blue links, and desaturated pastel surfaces. Motion should support orientation only: no flashy transitions or scroll-jacking.

## Typography

- **Sans:** IBM Plex Sans — UI, body, navigation.
- **Serif:** IBM Plex Serif — page titles and hero headline only.
- Load from Google Fonts (single request with italics).

## Colors

Pastels: `--pastel-lilac`, `--pastel-sage`, `--pastel-dusty-rose`, `--pastel-sky` mixed into pillars, header tint, footer, chips, and secondary blocks. Keep them low saturation so the page reads as academic rather than promotional. **Portrait:** round image in hero — `public/assets/img/profile.png`.

| Token             | Role                 |
| ----------------- | -------------------- |
| `--color-bg`      | Base + page gradient |
| `--color-surface` | Cards / hero panel   |
| `--pastel-*`      | Section tints        |
| `--color-accent`  | Links                |

## Layout

- **Navigation:** primary links are About, Research, Work, Press, Advocacy, CV, and Contact. Blog stays secondary in the footer.
- **Homepage:** spacious card sections with proximity scroll snapping on desktop and no snap on small screens. Section reveal animations are CSS-only and disabled for reduced-motion users.
- Single centered column: `--layout-max` + `--layout-gutter` for horizontal inset; `.site-shell` and `.site-shell--wide` share the same width and `margin-inline: auto`.
- Body copy capped around 68ch for readability; hero and cards span the full column width.
- Sections separated by spacing and rules, not heavy boxes.
- Homepage: hero → research focus → selected work → bio → de-emphasized press/talks → contact.

## Components

- **Hero:** Optional round portrait; kicker (role + org); one-line H1; supporting paragraph; text actions (pastel-bordered).
- **Pillars:** Three equal columns on desktop; stacked on small screens.
- **Work cards:** Type badge (paper / patent / …) + title + one sentence.
- **Muted sections:** Smaller type, top border — for talks/media not central to the thesis.

## Do / don’t

- Do use precise technical nouns; avoid hype adjectives.
- Don’t put blog or personal narrative in the primary nav; link from footer.
- Don’t use scroll effects that prevent normal reading, keyboard navigation, or reduced-motion preferences.
