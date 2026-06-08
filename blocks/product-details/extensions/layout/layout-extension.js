import mirrored from './templates/mirrored/mirrored-template.js';
import editorial from './templates/editorial/editorial-template.js';

const TEMPLATES = { mirrored, editorial };

const extensionBasePath = new URL('.', import.meta.url).pathname;

export default {
  id: 'pdp-layout',
  name: 'PDP Layout Extension',

  externalStyles: [
    `${extensionBasePath}templates/mirrored/mirrored-template.css`,
    `${extensionBasePath}templates/editorial/editorial-template.css`,
  ],

  hooks: {
    'pdp/layout': async ({ context }) => {
      const apply = TEMPLATES[context.template];
      if (apply) await apply(context);
    },
  },
};
