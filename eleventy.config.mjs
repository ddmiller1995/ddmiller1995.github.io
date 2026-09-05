import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import Shiki from '@shikijs/markdown-it';

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

md.use(anchor, {
  permalink: anchor.permalink.linkInsideHeader({
    symbol: '#',
    placement: 'before',
    class: 'heading-anchor',
  }),
});

md.use(
  await Shiki({
    themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
    // Emits `light-dark(<light>, <dark>)` directly onto the tokens so code
    // blocks track the page's color-scheme with no extra CSS or `.dark` class.
    defaultColor: 'light-dark()',
  })
);

// Open external (absolute http/https) links in a new tab; internal links unchanged.
const defaultLinkOpen =
  md.renderer.rules.link_open ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet('href') || '';
  if (/^https?:\/\//.test(href)) {
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener');
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

export default function (eleventyConfig) {
  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/CNAME');

  eleventyConfig.addFilter('postDate', (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  );

  eleventyConfig.addFilter('rfc822Date', (date) => new Date(date).toUTCString());

  const firstParagraphText = (html) => {
    const match = /<p>([\s\S]*?)<\/p>/.exec(html || '');
    return match ? match[1].replace(/<[^>]+>/g, '').trim() : '';
  };

  // Truncated — for meta descriptions where length matters.
  eleventyConfig.addFilter('excerpt', (html, maxLength = 200) => {
    const text = firstParagraphText(html);
    return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text;
  });

  // Full first paragraph — for the post-list snapshot and the RSS feed.
  eleventyConfig.addFilter('firstParagraph', firstParagraphText);

  // True when the post has content beyond its first paragraph.
  eleventyConfig.addFilter('hasMore', (html) => {
    const rest = (html || '').replace(/<p>[\s\S]*?<\/p>/, '');
    return rest.replace(/<[^>]+>/g, '').trim().length > 0;
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'dist',
    },
  };
}
