import { layout } from './layout.mjs';

export function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function postView(post, config) {
  const bodyHtml = `
    <article class="post">
      <header class="post-header">
        <h1>${post.title}</h1>
        <p class="post-date">${formatDate(post.date)}</p>
      </header>
      ${post.html}
    </article>
  `;
  return layout({ title: post.title, description: post.excerpt || config.description, bodyHtml, activeHref: '/', config });
}
