import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';
import {
  loadCommerceEager,
  loadCommerceLazy,
  initializeCommerce,
  applyTemplates,
  decorateLinks,
  loadErrorPage,
  decorateSections,
  IS_UE,
  IS_DA,
} from './commerce.js';

// Reused regexes for rich-text decorator (reset lastIndex before each use)
const RICH_TEXT_PATTERN = /\{\{(.*?)\}\}(.*?)\{\{\/\}\}/gs;
const ATTR_PATTERN = /\s*(\w+):\s*["']([^"']*)["']\s*/g;

/**
 * Parses a DA-style attribute string (e.g. style: "color: red;", class: "foo") into an object.
 * @param {string} attrStr - String like 'style: "color: red;"' or 'class: "x", style: "..."'
 * @returns {Record<string, string>} Key-value attributes
 */
function parseRichTextAttributes(attrStr) {
  const attrs = {};
  ATTR_PATTERN.lastIndex = 0;
  let m = ATTR_PATTERN.exec(attrStr);
  while (m !== null) {
    const [, key, val] = m;
    attrs[key] = val;
    m = ATTR_PATTERN.exec(attrStr);
  }
  return attrs;
}

/**
 * Rich-text decorator: replaces {{attr: "value";}}content{{/}} with
 * <span attr="value">content</span>. Only walks candidate nodes.
 * @param {Element} container - Element to process (e.g. main)
 */
function decorateRichText(container) {
  const skipTags = new Set(['SCRIPT', 'STYLE', 'TEMPLATE', 'NOSCRIPT']);
  const filter = (node) => {
    const parent = node.parentElement;
    if (parent && skipTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
    const text = node.textContent;
    if (text.indexOf('{{') === -1 || text.indexOf('{{/}}') === -1) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  };

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    { acceptNode: filter },
    false,
  );

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  for (let i = 0; i < textNodes.length; i += 1) {
    const textNode = textNodes[i];
    const text = textNode.textContent;
    const parts = [];
    let lastIndex = 0;

    RICH_TEXT_PATTERN.lastIndex = 0;
    let match = RICH_TEXT_PATTERN.exec(text);
    while (match !== null) {
      const [, attrSpec, content] = match;
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
      parts.push({ type: 'span', attrs: parseRichTextAttributes(attrSpec), content });
      lastIndex = RICH_TEXT_PATTERN.lastIndex;
      match = RICH_TEXT_PATTERN.exec(text);
    }
    parts.push({ type: 'text', value: text.slice(lastIndex) });

    const hasSpans = parts.length > 1;
    if (hasSpans) {
      const fragment = document.createDocumentFragment();
      for (let j = 0; j < parts.length; j += 1) {
        const part = parts[j];
        if (part.type === 'text') {
          fragment.appendChild(document.createTextNode(part.value));
        } else {
          const span = document.createElement('span');
          Object.entries(part.attrs).forEach(([k, v]) => span.setAttribute(k, v));
          span.textContent = part.content;
          fragment.appendChild(span);
        }
      }

      textNode.parentNode.insertBefore(fragment, textNode);
      textNode.remove();
    }
  }
}

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    // Check if h1 or picture is already inside a hero block
    if (h1.closest('.hero') || picture.closest('.hero')) {
      return; // Don't create a duplicate hero block
    }
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    // auto load `*/fragments/*` references
    const fragments = [...main.querySelectorAll('a[href*="/fragments/"]')].filter((f) => !f.closest('.fragment'));
    if (fragments.length > 0) {
      // eslint-disable-next-line import/no-cycle
      import('../blocks/fragment/fragment.js').then(({ loadFragment }) => {
        fragments.forEach(async (fragment) => {
          try {
            const { pathname } = new URL(fragment.href);
            const frag = await loadFragment(pathname);
            fragment.parentElement.replaceWith(...frag.children);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Fragment loading failed', error);
          }
        });
      });
    }

    if (!main.querySelector('.hero')) buildHeroBlock(main);
  } catch (error) {
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
export function decorateMain(main) {
  decorateLinks(main);
  decorateButtons(main);
  decorateIcons(main);
  decorateRichText(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();

  const main = doc.querySelector('main');
  if (main) {
    try {
      await initializeCommerce();
      decorateMain(main);
      applyTemplates(doc);
      await loadCommerceEager();
    } catch (e) {
      console.error('Error initializing commerce configuration:', e);
      loadErrorPage(418);
    }
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  loadHeader(doc.querySelector('header'));

  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadFooter(doc.querySelector('footer'));

  loadCommerceLazy();

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

// UE Editor support before page load
if (IS_UE) {
  // eslint-disable-next-line import/no-unresolved
  await import(`${window.hlx.codeBasePath}/scripts/ue.js`).then(({ default: ue }) => ue());
}

loadPage();

(async function loadDa() {
  if (!IS_DA) return;
  // eslint-disable-next-line import/no-unresolved
  import('https://da.live/scripts/dapreview.js').then(({ default: daPreview }) => daPreview(loadPage));
}());
