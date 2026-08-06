import { layout } from './layout.mjs';

export function pageView(page, config) {
  const isBio = page.slug === 'bio';

  const linksHtml = isBio
    ? `
      <p class="bio-links">
        ${config.social.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.platform}</a>`).join('\n        ')}
        <a href="/feed.xml">RSS</a>
      </p>`
    : '';

  const bodyHtml = `
    <article class="page">
      <h1>${page.title}</h1>
      ${page.bodyHtml}
      ${linksHtml}
    </article>
  `;

  return layout({
    title: page.title,
    description: config.description,
    bodyHtml,
    config,
    nav: { back: '/', bio: !isBio },
  });
}
