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

export default md;
