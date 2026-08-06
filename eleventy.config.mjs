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

md.use(await Shiki({ theme: 'vitesse-dark' }));

export default function (eleventyConfig) {
  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addPassthroughCopy('src/css');
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

  eleventyConfig.addFilter('excerpt', (html, maxLength = 200) => {
    const match = /<p>([\s\S]*?)<\/p>/.exec(html || '');
    if (!match) return '';
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text;
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
