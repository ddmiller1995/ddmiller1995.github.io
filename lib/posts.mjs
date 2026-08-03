import fs from 'node:fs';
import md from './markdown.mjs';

const POSTS_DIR = new URL('../content/posts/', import.meta.url);

function extractExcerpt(html, maxLength = 200) {
  const match = html.match(/<p>([\s\S]*?)<\/p>/);
  if (!match) return '';
  const text = match[1].replace(/<[^>]+>/g, '').trim();
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text;
}

function parsePost(filename) {
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  if (!dateMatch) {
    throw new Error(`Post filename must be YYYY-MM-DD-slug.md: ${filename}`);
  }
  const [, date, slug] = dateMatch;

  const raw = fs.readFileSync(new URL(filename, POSTS_DIR), 'utf8');
  const lines = raw.split('\n');
  const titleLine = lines.findIndex((line) => line.startsWith('# '));
  if (titleLine === -1) {
    throw new Error(`Post is missing a top-level "# " title: ${filename}`);
  }
  const title = lines[titleLine].slice(2).trim();
  const body = [...lines.slice(0, titleLine), ...lines.slice(titleLine + 1)].join('\n').trim();

  const html = md.render(body);
  const excerpt = extractExcerpt(html);

  return { slug, date, title, html, excerpt };
}

export function getPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  return files.map(parsePost).sort((a, b) => (a.date < b.date ? 1 : -1));
}
