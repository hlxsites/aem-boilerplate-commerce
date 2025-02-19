import {
  parseUrlHashTags,
  hideLink,
  showLink,
  removeLink,
} from './api/hash-tags/hashTagParser.js';
import { getActiveRules } from './api/targeted-block/api.js';

const isDesktop = window.matchMedia('(min-width: 900px)');
const INTERVAL = 10;

/**
 * This method contains logic for every namespace/tag combination
 *
 * @param el
 * @param namespace
 * @param value
 * @returns {Promise<void>}
 */
const callbackFn = async function (el, namespace, value) {
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
 * Executes links personalization for domElement and namespace
 * It can be called for any DOM element
 *
 * If DOM element can not be found, to avoid an infinite call to apply() we cancel
 * execution after 3 seconds
 *
 * @param domElement
 * @param namespace
 */
function applyHashTags(domElement) {
  let retry = 3000 / INTERVAL;
  const apply = () => {
    if (!document.querySelector(domElement)) {
      retry -= 1;
      if (retry === 0) {
        window.clearInterval(c);
      }
      return;
    }
    window.clearInterval(c);
    parseUrlHashTags(domElement, callbackFn);
  };
  // make sure domEl is present in DOM tree before hash tags can be applied
  const c = window.setInterval(apply, INTERVAL);
}

export default applyHashTags;
