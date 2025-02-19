import {
  parseUrlHashTags,
  hideLink,
  showLink,
  removeLink,
} from './hashTagParser.js';
import { getActiveRules } from './api/targeted-block/api.js';

const isDesktop = window.matchMedia('(min-width: 900px)');
const INTERVAL = 100;

const displayForCallback = async function (el, namespace, value) {
  const activeRules = await getActiveRules();
  if (namespace === 'display_for_') {
    if (value === 'desktop_only' && isDesktop.matches) {
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
 * It can be called for any DOM element and namespace combination.
 *
 * If DOM element can not be found, to avoid an infinite call to apply() we cancel
 * execution after 3 seconds
 *
 * @param domElement
 * @param namespace
 */
function applyHashTagsForNamespace(domElement, namespace = 'display_for_') {
  let retry = 3000 / INTERVAL;
  const apply = () => {
    if (!document.querySelector(domElement)) {
      retry -= 1;
      // if element is not found in DOM after 3 seconds, we cancel execution
      if (retry === 0) {
        clearInterval(c);
      }
      return;
    }
    clearInterval(c);
    parseUrlHashTags(domElement, displayForCallback);
  };
  // make sure domEl is present in DOM tree before hash tags can be applied
  const c = setInterval(apply, INTERVAL);
}

export default applyHashTagsForNamespace;
