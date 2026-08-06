const BACK_ICON = `<svg viewBox="0 0 24 24"><path d="M15 5 L7 12 L15 19"/></svg>`;
const BIO_ICON = `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>`;

export function layout({ title, description, bodyHtml, config, nav = {} }) {
  const { back = null, bio = false } = nav;

  const backIcon = back
    ? `<a class="corner-icon" href="${back}" aria-label="Back">${BACK_ICON}</a>`
    : '';

  const bioIcon = bio
    ? `<a class="corner-icon" href="/bio/" aria-label="Bio">${BIO_ICON}</a>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} · ${config.title}</title>
  <meta name="description" content="${description}">
  <link rel="icon" href="/favicon.ico">
  <link rel="alternate" type="application/rss+xml" title="${config.title}" href="/feed.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap">
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <div class="nav-bar">
    <div class="nav-slot">${backIcon}</div>
    <div class="nav-slot">${bioIcon}</div>
  </div>
  <main>
    ${bodyHtml}
  </main>
</body>
</html>
`;
}
