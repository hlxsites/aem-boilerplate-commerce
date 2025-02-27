const namespaces = [
  'display_for_',
];

/**
 * Change link's parent DOM element visibility to hidden
 *
 * @param {HTMLAnchorElement} aElement
 */
function hideLink(aElement) {
  if (aElement.nodeType === Node.ELEMENT_NODE) {
    aElement.parentNode.hidden = true;
  }
}

/**
 * Change link's parent DOM element visibility to visible
 *
 * @param {HTMLAnchorElement} aElement
 */
function showLink(aElement) {
  if (aElement.nodeType === Node.ELEMENT_NODE) {
    aElement.parentNode.hidden = false;
  }
}

/**
 * Removes link from DOM tree
 *
 * @param {HTMLAnchorElement} aElement
 */
function removeLink(aElement) {
  if (aElement.nodeType === Node.ELEMENT_NODE && aElement.parentNode !== null) {
    aElement.parentNode.removeChild(aElement);
  }
}

/**
 * Returns an array of extracted hash tags
 *
 * @param {HTMLAnchorElement} aElement
 * @returns []
 */
function extractHashTagsFromLink(aElement) {
  return aElement?.hash?.split('#').slice(1) || [];
}

/**
 * Removes personalization hash tags from the link hash string.
 * Preserves any hash tags not belonging to personalization.
 *
 * @param {HTMLAnchorElement} aElement
 */
function removeHashTags(aElement) {
  const preserved = extractHashTagsFromLink(aElement).map((hashtag) => {
    let preserve = true;
    namespaces.forEach((ns) => {
      if (hashtag.startsWith(ns)) {
        preserve = false;
      }
    });
    return (preserve) ? hashtag : null;
  }).filter((ht) => ht);
  aElement.hash = preserved.join('#');
  return aElement;
}

/**
 * Extracts hash tags namespaces and values from hash string
 *
 * @param {HTMLAnchorElement} aElement
 * @returns {*[]}
 */
function parseHashTag(aElement) {
  const parsed = [];
  const hashTags = extractHashTagsFromLink(aElement);

  if (hashTags.length === 0) {
    return parsed;
  }
  namespaces.forEach((ns) => {
    hashTags.forEach((tag) => {
      const value = tag.split(ns);
      if (!value || value.length !== 2) {
        return;
      }
      parsed.push({
        namespace: ns,
        value: decodeURIComponent(value[1].trim()).toLowerCase(),
      });
    });
  });
  return parsed;
}

/**
 * Parses hash tags and applies condition callback against each namespace/hash combination
 *
 * @param {NodeList} aElements - a NodeList containing all DOM element(s) with hash tags
 * @param {function} callbackFn - optional; allows to pass a callback to apply custom conditions
 */
function apply(aElements, callbackFn, activeRules) {
  aElements.forEach((aElement) => {
    if (!aElement || !aElement.hash) {
      return;
    }
    const hashTags = parseHashTag(aElement);
    if (hashTags.length === 0) {
      return;
    }
    hashTags.forEach((hashTag) => {
      const { namespace, value } = { ...hashTag };
      callbackFn(aElement, namespace, value, activeRules);
    });
  });
}

/**
 * Parses DOM fragment identified by domEl
 * change visibility or remove elements based on hash tags conditions
 *
 * @param {HTMLElement} domEl DOM element
 * @param {function} callbackFn - optional; allows to pass a callback to apply custom conditions
 */
function parseUrlHashTags(domEl, callbackFn, activeRules) {
  const domElement = document.querySelector(domEl);
  const aElements = domElement.querySelectorAll('a');
  if (aElements.length === 0) {
    return;
  }
  apply(aElements, callbackFn, activeRules);
}

export {
  parseUrlHashTags,
  hideLink,
  showLink,
  removeLink,
  removeHashTags,
};
