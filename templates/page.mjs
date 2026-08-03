import { layout } from './layout.mjs';

export function pageView(page, config) {
  const bodyHtml = `
    <article class="page">
      <h1>${page.title}</h1>
      ${page.bodyHtml}
    </article>
  `;
  return layout({ title: page.title, description: config.description, bodyHtml, activeHref: page.path, config });
}
