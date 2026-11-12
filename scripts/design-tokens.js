import { toClassName } from './aem.js';

export const DESIGN_TOKENS_URL = '/config/styles.json';

const STYLE_ID = 'design-tokens';

/**
 * Map of style class → CSS custom properties for that style.
 * @type {Map<string, Array<{ cssVar: string, value: string }>>}
 */
const designTokenStyles = new Map();

/** @type {WeakMap<Element, { className: string, attrs: string[] }>} */
const appliedStyles = new WeakMap();

let generation = 0;

/**
 * @param {string} value
 * @returns {string | null}
 */
function sanitizeCssColor(value) {
  if (typeof value !== 'string') return null;
  const color = value.trim();
  if (!color) return null;
  if (/^#[0-9a-f]{3,8}$/i.test(color)) return color;
  if (/^rgba?\([\d\s%,.]+\)$/i.test(color)) return color;
  if (/^var\(--[a-z0-9-]+\)$/i.test(color)) return color;
  return null;
}

/**
 * Allows colors and simple CSS keywords/identifiers (e.g. center, 60-40).
 * @param {string} value
 * @returns {string | null}
 */
function sanitizeCssTokenValue(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const color = sanitizeCssColor(trimmed);
  if (color) return color;
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(trimmed)) return trimmed.toLowerCase();
  return null;
}

/**
 * @param {unknown} payload
 * @returns {Array<Record<string, string>>}
 */
export function normalizeDesignTokens(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (typeof payload === 'object' && Array.isArray(payload.data)) return payload.data;
  return [];
}

/**
 * @param {Array<Record<string, string>>} rows
 * @returns {string[]}
 */
export function extractDesignTokenColumns(rows) {
  if (!rows.length) return [];

  const seen = new Set();
  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!key.startsWith(':')) seen.add(key);
    });
  });

  const ordered = Object.keys(rows[0]).filter((key) => seen.has(key));
  const remainder = [...seen].filter((key) => !ordered.includes(key));
  return [...ordered, ...remainder];
}

/**
 * @param {string} columnName
 * @returns {string | null}
 */
function columnToCssVar(columnName) {
  const slug = toClassName(columnName);
  if (!slug) return null;
  if (['background', 'foreground', 'accent'].includes(slug)) return `--${slug}-color`;
  return `--${slug}`;
}

/**
 * @param {string} color
 * @returns {'light' | 'dark' | null}
 */
function colorSchemeFor(color) {
  const match = /^#([0-9a-f]{6})$/i.exec(color);
  if (!match) return null;
  const value = Number.parseInt(match[1], 16);
  const r = Math.floor(value / 65536) % 256;
  const g = Math.floor(value / 256) % 256;
  const b = value % 256;
  const luminance = ((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;
  return luminance < 0.55 ? 'dark' : 'light';
}

/**
 * Page-level aliases so a style class on the body also drives the boilerplate tokens.
 * `--foreground-color` is applied to the body by the generated `body.<style>` rule.
 * The accent drives links and buttons (`--color-brand-*`) and the accent button (`--link-color`).
 * @param {string} cssVar
 * @param {string} value
 * @returns {Array<[string, string]>}
 */
function tokenAliases(cssVar, value) {
  if (cssVar === '--accent-color') {
    const hover = `color-mix(in srgb, ${value} 85%, black)`;
    const active = `color-mix(in srgb, ${value} 70%, black)`;
    return [
      ['--color-brand-500', value],
      ['--color-brand-600', hover],
      ['--color-brand-700', active],
      ['--link-color', value],
      ['--link-hover-color', hover],
    ];
  }
  return [];
}

/**
 * Drop-in roots (`.dropin-design`) re-declare the design tokens on themselves, which beats
 * a value inherited from a styled page, section or block. Tokens named after the drop-in
 * scales (`--color-brand-500`, `--shape-border-radius-2`, `--spacing-small`, ...) are
 * therefore also set on the drop-ins inside the styled element.
 * @param {string} cssVar
 */
function isDropinToken(cssVar) {
  return /^--(color|shape|spacing|type|grid|shadow)-/.test(cssVar);
}

/**
 * @param {Record<string, string>} token
 * @param {string[]} columns
 */
function tokenToCssRule(token, columns) {
  if (!columns.length) return null;

  const [nameColumn, ...valueColumns] = columns;
  const className = toClassName(token[nameColumn]);
  if (!className) return null;

  /** @type {Array<{ cssVar: string, value: string }>} */
  const vars = [];
  valueColumns.forEach((column) => {
    const cssVar = columnToCssVar(column);
    const raw = token[column];
    if (!cssVar || !raw) return;
    const value = sanitizeCssTokenValue(raw);
    if (!value) return;
    vars.push({ cssVar, value });
    tokenAliases(cssVar, value).forEach(([alias, aliasValue]) => {
      vars.push({ cssVar: alias, value: aliasValue });
    });
  });

  if (!vars.length) return null;

  const background = vars.find(({ cssVar }) => cssVar === '--background-color');
  const scheme = background ? colorSchemeFor(background.value) : null;
  const declarations = vars.map(({ cssVar, value }) => `${cssVar}: ${value}`);
  if (scheme) declarations.push(`color-scheme: ${scheme}`);

  // A style class on a section or block also paints that element with its own colors.
  const hasForeground = vars.some(({ cssVar }) => cssVar === '--foreground-color');
  const paint = [];
  if (background) paint.push('background-color: var(--background-color)');
  if (hasForeground) paint.push('color: var(--foreground-color)');
  const paintRule = paint.length
    ? `\n.block.${className}, .section.${className} { ${paint.join('; ')}; }`
    : '';
  // The body already paints `--background-color` (styles.css); the text color is set here so
  // styles.css needs no change.
  const bodyRule = hasForeground ? `\nbody.${className} { color: var(--foreground-color); }` : '';

  // Drop-in roots re-declare the tokens, so the nearest style must win whatever the row order:
  // specificity rises from page (0,2,1) to section (0,3,0) to block (0,4,0).
  const dropinVars = vars.filter(({ cssVar }) => isDropinToken(cssVar));
  const dropinDeclarations = dropinVars.map(({ cssVar, value }) => `${cssVar}: ${value}`);
  const scope = `.${className}`;
  const dropinSelectors = [
    `body${scope} .dropin-design`,
    `.section${scope} .dropin-design`,
    `.block${scope}${scope} .dropin-design`,
    `.block${scope}${scope}.dropin-design`,
  ];
  const dropinRule = dropinVars.length
    ? `\n${dropinSelectors.join(', ')} { ${dropinDeclarations.join('; ')}; }`
    : '';

  const rules = `${paintRule}${bodyRule}${dropinRule}`;
  return {
    className,
    rule: `.${className} { ${declarations.join('; ')}; }${rules}`,
    vars,
  };
}

/**
 * @param {Element} el
 * @param {Array<{ cssVar: string, value: string }>} vars
 * @returns {string[]}
 */
function applyTokenDataAttributes(el, vars) {
  const attrs = [];
  vars.forEach(({ cssVar, value }) => {
    const name = cssVar.replace(/^--/, '');
    if (!name || name.includes('color') || value == null || value === '') return;
    const attr = `data-${name}`;
    el.setAttribute(attr, value);
    attrs.push(attr);
  });
  return attrs;
}

/**
 * @param {unknown} payload
 */
export function applyTokenPayload(payload) {
  generation += 1;
  designTokenStyles.clear();

  const tokens = normalizeDesignTokens(payload);
  const columns = extractDesignTokenColumns(tokens);
  const parsed = tokens.map((token) => tokenToCssRule(token, columns)).filter(Boolean);

  parsed.forEach(({ className, vars }) => {
    designTokenStyles.set(className, vars);
  });

  const css = parsed.map(({ rule }) => rule).join('\n');
  let styleEl = document.getElementById(STYLE_ID);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    document.head.append(styleEl);
  }
  styleEl.textContent = css;
  return parsed;
}

/**
 * Fetches /config/styles.json and injects one class per style row.
 * First sheet column is the class name. Remaining columns become CSS variables.
 * @returns {Promise<void>}
 */
export async function loadDesignTokens() {
  const gen = generation;
  try {
    const response = await fetch(DESIGN_TOKENS_URL);
    if (!response.ok) return;
    const payload = await response.json();
    if (generation !== gen) return;
    applyTokenPayload(payload);
  } catch (error) {
    console.error('Failed to load design tokens', error);
  }
}

/**
 * Add data attributes from a style class already on a block or section.
 * e.g. class `cerise` with `--layout-split: 60-40` also gets `data-layout-split="60-40"`.
 * @param {Element} root
 */
export function applyDesignTokenDataAttributes(root) {
  if (!designTokenStyles.size || !root) return;

  designTokenStyles.forEach((vars, styleClass) => {
    const selector = `.block.${CSS.escape(styleClass)}, .section.${CSS.escape(styleClass)}`;
    root.querySelectorAll(selector).forEach((el) => {
      applyTokenDataAttributes(el, vars);
    });
  });
}

/**
 * @param {Element} el
 */
export function clearDesignTokenStyle(el) {
  if (!el) return;
  const previous = appliedStyles.get(el);
  if (previous) {
    el.classList.remove(previous.className);
    previous.attrs.forEach((attr) => el.removeAttribute(attr));
    appliedStyles.delete(el);
  }

  // Also drop a theme class that came from page metadata rather than this helper.
  designTokenStyles.forEach((vars, styleClass) => {
    el.classList.remove(styleClass);
    vars.forEach(({ cssVar }) => {
      const name = cssVar.replace(/^--/, '');
      if (!name || name.includes('color')) return;
      el.removeAttribute(`data-${name}`);
    });
  });
}

/**
 * Apply a design-token style name and its data attributes to an element.
 * @param {Element} el
 * @param {string} styleName Author-facing style name (e.g. "green-inv", "cerise")
 */
export function applyDesignTokenStyle(el, styleName) {
  if (!el) return;
  clearDesignTokenStyle(el);

  const className = toClassName(styleName);
  if (!className) return;

  el.classList.add(className);
  const vars = designTokenStyles.get(className) || [];
  const attrs = applyTokenDataAttributes(el, vars);
  appliedStyles.set(el, { className, attrs });
}
