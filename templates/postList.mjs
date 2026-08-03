import { layout } from './layout.mjs';
import { formatDate } from './post.mjs';

export function postListView(posts, config) {
  const items = posts
    .map(
      (post) => `
      <li class="post-list-item">
        <a class="post-link" href="/posts/${post.slug}/">${post.title}</a>
        <p class="post-date">${formatDate(post.date)}</p>
        <p class="post-excerpt">${post.excerpt}</p>
      </li>`
    )
    .join('');

  const bodyHtml = `
    <h1>Posts</h1>
    <ul class="post-list">${items}
    </ul>
  `;
  return layout({ title: 'Home', description: config.description, bodyHtml, activeHref: '/', config });
}
