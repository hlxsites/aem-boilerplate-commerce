/**
 * Shared contract between the style-switcher plugin (/tools/style-switcher)
 * and the page rendered in the Experience Workspace canvas (Layout mode).
 *
 * The chosen style is stored on the document, in the Metadata block as Theme.
 * da.live mounts both iframes in shadow DOM, so live updates use a
 * BroadcastChannel. sessionStorage only remembers the choice for this tab
 * until the preview HTML picks up the saved Theme.
 */
import {
  applyDesignTokenStyle,
  applyTokenPayload,
  clearDesignTokenStyle,
  loadDesignTokens,
} from './design-tokens.js';

const CHANNEL_NAME = 'da-style-switcher';
const STORAGE_KEY = 'da-style-switcher';

/**
 * @param {string} path
 */
function normalizeDocPath(path) {
  if (!path || path === '/') return '/';
  let value = String(path).split('?')[0].split('#')[0];
  if (!value.startsWith('/')) value = `/${value}`;
  value = value.replace(/\.html$/, '');
  if (value.length > 1 && value.endsWith('/')) value = value.slice(0, -1);
  if (value === '/index') return '/';
  return value || '/';
}

/**
 * @returns {Record<string, string>}
 */
function readStyleMap() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
  } catch { /* storage unavailable or a legacy string value */ }
  return {};
}

/**
 * @param {string} path
 * @param {string} style
 */
function writeStyle(path, style) {
  try {
    const map = readStyleMap();
    map[path] = style;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch { /* storage unavailable */ }
}

/**
 * @param {string} style
 * @param {string} [docPath] Document path being edited. Defaults to this frame's path.
 */
export function publishStyle(style, docPath) {
  const path = normalizeDocPath(docPath || window.location.pathname);
  writeStyle(path, style);
  const channel = new BroadcastChannel(CHANNEL_NAME);
  channel.postMessage({ style, path });
  channel.close();
}

/**
 * Live edits from manage mode. Rows match the /config/styles.json `data` array.
 * @param {Array<Record<string, string>>} rows
 */
export function publishTokenRows(rows) {
  const channel = new BroadcastChannel(CHANNEL_NAME);
  channel.postMessage({ tokens: rows });
  channel.close();
}

/**
 * Style remembered for this document in the current tab.
 * `null` means the author has not chosen one here yet.
 * @param {string} [docPath]
 * @returns {string | null}
 */
export function getSavedStyle(docPath) {
  try {
    const map = readStyleMap();
    const path = normalizeDocPath(docPath || window.location.pathname);
    if (!Object.hasOwn(map, path)) return null;
    return typeof map[path] === 'string' ? map[path] : null;
  } catch {
    return null;
  }
}

/**
 * Only the EW canvas (framed page with the quick-edit param) reacts to the plugin.
 */
export function isCanvas() {
  return window.self !== window.top
    && new URLSearchParams(window.location.search).has('quick-edit');
}

/**
 * @param {string} style
 */
function applyPageStyle(style) {
  if (style == null) return;
  if (!style) {
    clearDesignTokenStyle(document.body);
    return;
  }
  applyDesignTokenStyle(document.body, style);
}

/**
 * Applies the saved style and listens for changes coming from the plugin.
 * Quick-edit only swaps body.innerHTML on re-render, so the class sticks.
 */
export function initCanvasStyleSwitcher() {
  if (!isCanvas() || window.daStyleSwitcherReady) return;
  window.daStyleSwitcherReady = true;

  if (getSavedStyle() !== null) window.daStyleSwitcherLive = true;

  const channel = new BroadcastChannel(CHANNEL_NAME);
  channel.addEventListener('message', ({ data }) => {
    if (Array.isArray(data?.tokens)) applyTokenPayload({ data: data.tokens });
    if (typeof data?.style === 'string') {
      window.daStyleSwitcherLive = true;
      writeStyle(normalizeDocPath(window.location.pathname), data.style);
      applyPageStyle(data.style);
    }
  });

  loadDesignTokens().then(() => {
    const saved = getSavedStyle();
    if (saved !== null) applyPageStyle(saved);
  });
}
