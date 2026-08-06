// Temporary: font-pairing experiment. Remove this file, the switcher
// markup/script in base.njk, and the combo blocks in css/site.css once a
// combo wins, then prune the Google Fonts link down to just the winner.
const combos = [
  { id: 'original', label: 'Original (Source Serif)' },
  { id: 'redhat', label: 'Red Hat Mono / Text' },
  { id: 'redhat-source', label: 'Red Hat Mono / Source Serif' },
  { id: 'space-jakarta', label: 'Space Mono / Jakarta' },
  { id: 'ubuntu-rokkitt', label: 'Ubuntu / Rokkitt' },
  { id: 'oswald-source', label: 'Oswald / Source Serif' },
];

const href =
  'https://fonts.googleapis.com/css2?' +
  [
    'family=Red+Hat+Mono:wght@500;600;700',
    'family=Red+Hat+Text:ital,wght@0,400;0,500;0,600;1,400',
    'family=Space+Mono:ital,wght@0,400;0,700;1,400',
    'family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;1,400',
    'family=Ubuntu:ital,wght@0,400;0,500;0,700;1,400',
    'family=Rokkitt:wght@400;500;600;700',
    'family=Oswald:wght@400;500;600;700',
    'family=Source+Serif+4:ital,wght@0,400;0,600;1,400',
  ].join('&') +
  '&display=swap';

export default { combos, href };
