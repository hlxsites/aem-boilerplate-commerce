import {
  parseUrlHashTags,
  hideLink,
  showLink,
  removeLink,
  removeHashTags,
} from './parser.js';
import { getActiveRules } from '../personalization/api.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * This method contains default logic for built-in namespace/tag combination(s).
 *
 * @param el
 * @param namespace
 * @param value
 * @returns {Promise<void>}
 */
const defaultCallbackFn = (el, namespace, value, activeRules) => {
  if (namespace === 'display_for_') {
    if (value === 'desktop_only' && !isDesktop.matches) {
      removeLink(el);
    } else {
      removeHashTags(el);
    }

    if (value === 'mobile_only' && isDesktop.matches) {
      removeLink(el);
    } else {
      removeHashTags(el);
    }

    if (value.startsWith('segment')) {
      const segments = activeRules.customerSegments.map((s) => s.name.toLowerCase());
      const [_prefix, segment] = [...value.split('_')];
      if (!segments.includes(decodeURIComponent(segment.toLowerCase()))) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }

    if (value.startsWith('group')) {
      const [_prefix, group] = [...value.split('_')];
      if (decodeURIComponent(group.toLowerCase()) !== activeRules.customerGroup?.toLowerCase()) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }

    if (value.startsWith('cartrule')) {
      const rules = activeRules.cart.map((s) => s.name.toLowerCase());
      const [_prefix, rule] = [...value.split('_')];
      if (!rules.includes(decodeURIComponent(rule.toLowerCase()))) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }

    if (value.startsWith('catalogrule')) {
      const rules = activeRules.catalogPriceRules.map((s) => s.name.toLowerCase());
      const [_prefix, rule] = [...value.split('_')];
      if (!rules.includes(decodeURIComponent(rule.toLowerCase()))) {
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
 * @param domElement - root DOM element for parser
 * @param {function} callbackFn - an optional callback with conditions to execute
 */
async function applyHashTagsForDomElement(domElement, callbackFn = null) {
  const activeRules = await getActiveRules();
  parseUrlHashTags(domElement, callbackFn || defaultCallbackFn, activeRules);
}

export default applyHashTagsForDomElement;
