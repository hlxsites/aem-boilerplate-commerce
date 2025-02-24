const namespaces = [
  'display_for_',
];

/**
 * Change link's parent DOM element visibility to hidden
 *
 * @param {HTMLAnchorElement} el
 */
function hideLink(el) {
  if (el.nodeType === 1) {
    el.parentNode.hidden = true;
  }
}

/**
 * Change link's parent DOM element visibility to visible
 *
 * @param {HTMLAnchorElement} el
 */
function showLink(el) {
  if (el.nodeType === 1) {
    el.parentNode.hidden = false;
  }
}

/**
 * Removes link from DOM tree
 *
 * @param {HTMLAnchorElement} el
 */
function removeLink(el) {
  if (el.nodeType === 1 && el.parentNode !== null) {
    el.parentNode.removeChild(el);
  }
}

/**
 * Returns an array of extracted hash tags
 *
 * @param @param {HTMLAnchorElement} el
 * @returns []
 */
function extractHashTags(el) {
  return el?.hash?.split('#').slice(1) || [];
}

/**
 * Removes personalization hash tags from the link hash string.
 * Preserves any hash tags not belonging to personalization.
 *
 * @param {HTMLAnchorElement} el
 */
function removeHashTags(el) {
  const preserved = [];

  extractHashTags(el).forEach((ht) => {
    namespaces.forEach((ns) => {
      if (!ht.startsWith(ns)) {
        preserved.push(ht);
      }
    });
  });
  el.hash = preserved.join('#');
  return el;
}

/**
 * Extracts hash tags namespaces and values from hash string
 *
 * @param {HTMLAnchorElement} el
 * @returns {*[]}
 */
function parseHashTag(el) {
  const parsed = [];
  const hashTags = extractHashTags(el);

  if (hashTags.length > 0) {
    namespaces.forEach((ns) => {
      hashTags.forEach((tag) => {
        const value = tag.split(ns);
        if (value && value.length === 2) {
          parsed.push({
            namespace: ns,
            value: encodeURIComponent(value[1].trim().toLowerCase()),
          });
        }
      });
    });
  }

  return parsed;
}

/**
 * Parses hash tags and applies condition callback against each namespace/hash combination
 *
 * @param aElements - a NodeList containing all DOM element(s) with hash tags
 * @param {function} callbackFn - optional; allows to pass a callback to apply custom conditions
 */
function apply(aElements, callbackFn = null) {
  aElements.forEach((aElement) => {
    const link = aElement.href;
    if (link && link.indexOf('#') > 0) {
      const hashTags = parseHashTag(link);
      if (hashTags.length > 0) {
        hashTags.forEach((hashTag) => {
          const { namespace, value } = { ...hashTag };
          callbackFn(aElement, namespace, value);
        });
      }
    }
  });
}

/**
 * Gets elements directly from passed DOM tree fragment.
 *
 * @param domTree
 * @param {function} callbackFn - optional; allows to pass a callback to apply custom conditions
 */
function parseDomTreeForUrlHashTags(domTree, callbackFn = null) {
  const aElements = domTree.querySelectorAll('a');
  if (aElements.length === 0) {
    return;
  }
  apply(aElements, callbackFn);
}

/**
 * Parses DOM fragment identified by domEl
 * change visibility or remove elements based on hash tags conditions
 *
 * @param domEl DOM element
 * @param {function} callbackFn - optional; allows to pass a callback to apply custom conditions
 */
function parseUrlHashTags(domEl, callbackFn = null) {
  console.warn('CALLED!');
  const domElement = document.querySelector(domEl);
  const aElements = domElement.querySelectorAll('a');
  if (aElements.length === 0) {
    return;
  }
  apply(aElements, callbackFn);
}

export {
  parseUrlHashTags,
  parseDomTreeForUrlHashTags,
  hideLink,
  showLink,
  removeLink,
  removeHashTags,
};
