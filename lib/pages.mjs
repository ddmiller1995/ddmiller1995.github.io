import fs from 'node:fs';
import md from './markdown.mjs';

const PAGES_DIR = new URL('../content/pages/', import.meta.url);

export function getPages() {
  const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.html'));
  return files.map((filename) => {
    const raw = fs.readFileSync(new URL(filename, PAGES_DIR), 'utf8');
    const slug = filename.replace(/\.(md|html)$/, '');
    const bodyHtml = filename.endsWith('.md') ? md.render(raw) : raw;
    return { slug, bodyHtml };
  });
}
