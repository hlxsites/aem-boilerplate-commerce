import {
  parseUrlHashTags,
  parseDomTreeForUrlHashTags,
  hideLink,
  showLink,
  removeLink,
} from './parser.js';
import { getActiveRules } from '../personalization/api.js';

const isDesktop = window.matchMedia('(min-width: 900px)');
const INTERVAL = 250;

/**
 * This method contains default logic for built-in namespace/tag combination(s).
 *
 * @param el
 * @param namespace
 * @param value
 * @returns {Promise<void>}
 */
const defaultCallbackFn = async function (el, namespace, value) {
  const activeRules = await getActiveRules();

  if (namespace === 'display_for_') {
    if (value === 'desktop_only' && !isDesktop.matches) {
      removeLink(el);
    }

    if (value === 'mobile_only' && isDesktop.matches) {
      removeLink(el);
    }

    if (value.startsWith('segment')) {
      const segments = activeRules.customerSegments.map((s) => s.name.toLowerCase());
      const [_prefix, segment] = [...value.split('_')];
      if (!segments.includes(segment.toLowerCase())) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }

    if (value.startsWith('group')) {
      const [_prefix, group] = [...value.split('_')];
      if (group === activeRules.customerGroup) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }

    if (value.startsWith('cartrule')) {
      const rules = activeRules.cart.map((s) => s.name.toLowerCase());
      const [_prefix, rule] = [...value.split('_')];
      if (!rules.includes(rule.toLowerCase())) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }

    if (value.startsWith('catalogrule')) {
      const rules = activeRules.catalogPriceRules.map((s) => s.name.toLowerCase());
      const [_prefix, rule] = [...value.split('_')];
      if (!rules.includes(rule.toLowerCase())) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }
  }
};

/**
 * Executes links personalization for domElement
 * It can be called for any DOM element
 *
 * If DOM element can not be found, to avoid an infinite call to apply() we cancel
 * an entire execution after 3 seconds
 *
 * @param domElement - root DOM element for parser
 * @param {function} callbackFn - an optional callback with conditions to execute
 */
function applyHashTagsForDomElement(domElement, callbackFn = null) {
  let retry = 3000 / INTERVAL;
  const apply = () => {
    // make sure domEl is present in DOM tree before hash tags can be applied
    if (!document.querySelector(domElement)) {
      retry -= 1;
      if (retry === 0) {
        // eslint-disable-next-line no-use-before-define
        window.clearInterval(c);
      }
      return;
    }
    // eslint-disable-next-line no-use-before-define
    window.clearInterval(c);
    parseUrlHashTags(domElement, defaultCallbackFn);
    if (callbackFn && typeof callbackFn === 'function') {
      parseUrlHashTags(domElement, callbackFn);
    }
  };
  const c = window.setInterval(apply, INTERVAL);

  // parseUrlHashTags(domElement, callbackFn);
}

/**
 * Executes links personalisation against DOM tree fragment.
 * As is does not have to find DOM element with querySelector, we can pass
 * it directly to Hash Tag parser
 *
 * @param domTree DOM node tree to parse
 * @param {function} callbackFn - an optional callback with conditions to execute
 */
function applyHashTagsForNodeTree(domTree, callbackFn = null) {
  parseDomTreeForUrlHashTags(domTree, defaultCallbackFn);
  if (callbackFn && typeof callbackFn === 'function') {
    parseDomTreeForUrlHashTags(domTree, callbackFn);
  }
}

export {
  applyHashTagsForDomElement,
  applyHashTagsForNodeTree,
};
