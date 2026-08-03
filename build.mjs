import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from './site.config.mjs';
import { getPosts } from './lib/posts.mjs';
import { getPages } from './lib/pages.mjs';
import { renderFeed } from './lib/feed.mjs';
import { postView } from './templates/post.mjs';
import { postListView } from './templates/postList.mjs';
import { pageView } from './templates/page.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

function write(relPath, content) {
  const filePath = path.join(distDir, relPath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

copyDir(path.join(__dirname, 'static'), distDir);

const posts = getPosts();
for (const post of posts) {
  write(`posts/${post.slug}/index.html`, postView(post, config));
}
write('index.html', postListView(posts, config));

const pages = getPages();
for (const pageMeta of config.pages) {
  const page = pages.find((p) => p.slug === pageMeta.slug);
  if (!page) {
    throw new Error(`site.config.mjs references page "${pageMeta.slug}" but content/pages/${pageMeta.slug}.md does not exist`);
  }
  write(`${pageMeta.slug}/index.html`, pageView({ ...page, ...pageMeta }, config));
}

write('feed.xml', renderFeed(posts, config));

write(
  '404.html',
  pageView(
    {
      slug: '404',
      title: 'Page Not Found',
      path: '/404.html',
      bodyHtml: '<p>The page you were looking for could not be found.</p>',
    },
    config
  )
);

console.log(`Built ${posts.length} post(s) and ${pages.length} page(s) to dist/`);
