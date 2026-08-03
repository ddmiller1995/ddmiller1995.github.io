export function layout({ title, description, bodyHtml, activeHref, config }) {
  const navLinks = config.nav
    .map((item) => `<a href="${item.href}"${item.href === activeHref ? ' class="active"' : ''}>${item.label}</a>`)
    .join('\n      ');

  const socialLinks = config.social
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.platform}</a>`)
    .join('\n      ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} · ${config.title}</title>
  <meta name="description" content="${description}">
  <link rel="icon" href="/favicon.ico">
  <link rel="alternate" type="application/rss+xml" title="${config.title}" href="/feed.xml">
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <header class="site-header">
    <a class="site-title" href="/">${config.title}</a>
    <nav>
      ${navLinks}
    </nav>
  </header>
  <main>
    ${bodyHtml}
  </main>
  <footer class="site-footer">
    <p>© ${new Date().getFullYear()} ${config.author.name} · <a href="/feed.xml">RSS</a></p>
    <p class="social-links">
      ${socialLinks}
    </p>
  </footer>
</body>
</html>
`;
}
