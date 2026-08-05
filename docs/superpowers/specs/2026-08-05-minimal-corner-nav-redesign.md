# Minimal corner-nav redesign

## Goal

Drop the header nav bar and footer so the writing is front and center. Replace
them with two small, contextual icon buttons fixed to the top corners of the
viewport: a back arrow (top-left) and a bio/person icon (top-right).

## Scope

Three views only: home (post list), single post, bio (about). The existing
`/resources/` page is dropped entirely — its nav entry, config entry, and
content file are removed.

## Navigation logic

Icons are contextual per view, driven by a `nav: { back, bio }` object passed
into `layout()`:

| View | Back (top-left) | Bio icon (top-right) |
|------|------------------|------------------------|
| Home | hidden (nothing to go back to) | shown → `/about/` |
| Post | shown → `/` | shown → `/about/` |
| Bio (about) | shown → `/` | hidden (already here) |
| 404 | shown → `/` | shown → `/about/` |

No hover flyout, no hamburger, no full menu — this supersedes the earlier
collapsible-rail exploration. Icons are plain `<a>` tags (no JS) so they work
without client-side script.

## Icon style

Bare line-style inline SVG glyphs (24×24 viewbox, ~19px rendered, stroke-based,
no background/border/circle). Color is `--text-muted` at rest, shifts to
`--brand` on hover — the one existing interactive-accent pattern already used
elsewhere on the site. Fixed to the viewport corners (not the content column),
so they stay put on scroll.

- Back: simple left-pointing chevron/arrow path.
- Bio: minimal person glyph (circle head + arc body).

## Visual foundation (unchanged)

Keep the existing "Broadsheet" palette and type from `static/css/site.css` as-is:
paper background (`#f3f2f2`), near-black ink, Source Serif 4, cyan accent
(`#0088b0`), post/page typographic rules, code/table/blockquote styles. Only
the header/footer chrome and the outer `main` spacing change.

## Layout changes

- Remove `.site-header` and `.site-footer` entirely (markup, CSS, and the
  `nav`/`social` link-generation code in `layout.mjs` that served them).
- `main` becomes the sole body element: centered (`margin: 0 auto`) rather
  than the old header-aligned asymmetric left margin, with enough top padding
  to clear the fixed corner icons.
- Relocate the RSS link and social links (LinkedIn, GitHub) from the old
  footer onto the bio page, as a small link row under the bio text.

## Content/config changes

- `content/pages/resources.md` — delete.
- `site.config.mjs` — remove the `nav` array (no longer used) and the
  `resources` entry from `pages`; keep `social` (now consumed by the bio page
  instead of the footer).
- Untracked scratch file `v2/index.html` — delete, unrelated stray experiment.

## Implementation surface

- `templates/layout.mjs` — rewrite to accept `nav`, render the two corner
  `<a>` icons conditionally, drop header/footer/nav-link/social-link markup.
- `templates/postList.mjs` — pass `nav: { back: null, bio: true }`.
- `templates/post.mjs` — pass `nav: { back: '/', bio: true }`.
- `templates/page.mjs` — pass `nav: { back: '/', bio: page.slug !== 'about' }`;
  when `slug === 'about'`, append the relocated link row after the bio body.
- `build.mjs` — no signature changes needed (404 uses `pageView` already,
  gets `back`/`bio` via the same slug check — `slug !== 'about'` is true for
  `'404'` too, so it gets both icons, which is correct).
- `static/css/site.css` — remove header/footer/social-links rules; add
  `.corner-icon` (fixed positioning, hover color) and `.bio-links` (replaces
  `.social-links`) rules; adjust `main`/`body` spacing now that header/footer
  are gone.

## Verification

- `npm run build` succeeds and `dist/resources/` is no longer produced.
- `npm run serve` + manual check in a browser: icon visibility matches the
  table above on all three views, hover shifts icon color to `--brand`, back
  arrow goes to `/`, bio icon goes to `/about/`, and the bio page's
  LinkedIn/GitHub/RSS links work.
