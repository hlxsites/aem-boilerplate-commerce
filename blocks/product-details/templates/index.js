import mirrored from './mirrored/mirrored-template.js';
import editorial from './editorial/editorial-template.js';

const basePath = new URL('.', import.meta.url).pathname;

export const TEMPLATES = {
  mirrored: {
    apply: mirrored,
    styles: `${basePath}mirrored/mirrored-template.css`,
  },
  editorial: {
    apply: editorial,
    styles: `${basePath}editorial/editorial-template.css`,
  },
};
