const namespaces = [
  'display_for_',
];

/**
 * Change link's parent DOM element visibility to hidden
 *
 * @param el
 */
function hideLink(el) {
  if (el.nodeType === 1) {
    el.parentNode.hidden = true;
  }
}

/**
 * Change link's parent DOM element visibility to visible
 *
 * @param el
 */
function showLink(el) {
  if (el.nodeType === 1) {
    el.parentNode.hidden = false;
  }
}

/**
 * Removes link from DEM tree
 *
 * @param el
 */
function removeLink(el) {
  if (el.nodeType === 1 && el.parentNode !== null) {
    el.parentNode.removeChild(el);
  }
}

/**
 * Extracts hash tags namespaces and values
 *
 * @param href
 * @returns {*[]}
 */
function parseHashTag(href) {
  if (!href.indexOf('#') > 0) {
    return [];
  }

  const parsed = [];
  const hashTags = href.split('#').slice(1);

  if (hashTags) {
    namespaces.forEach((ns) => {
      hashTags.forEach((tag) => {
        const value = tag.split(ns);
        if (value && value.length === 2) {
          parsed.push({
            namespace: ns,
            value: value[1],
          });
        }
      });
    });
  }
  return parsed;
}

/**
 * Applies parsed hash tags based on conditions
 *
 * @param aElement DOM element
 * @param {object} hashTags parsed hash tags
 * @param {function} callbackFn function executing logic based on parsed hash tags
 */
function applyConditions(aElement, hashTags, callbackFn) {
  hashTags.forEach((hashTag) => {
    const { namespace, value } = { ...hashTag };
    callbackFn(aElement, namespace, value);
  });
}

/**
 * Parses DOM fragment identified by domEl
 * change visibility or remove elements based on hash tags conditions
 *
 * @param domEl DOM element
 * @param {function} callbackFn function executing logic based on parsed hash tags
 * @returns {*}
 */
function parseUrlHashTags(domEl, callbackFn) {
  const domElement = document.querySelector(domEl);
  const aElements = domElement.querySelectorAll('a');

  aElements.forEach((aElement) => {
    const link = aElement.href;
    if (link) {
      const hashTags = parseHashTag(link);
      applyConditions(aElement, hashTags, callbackFn);
    }
  });
}

export {
  parseUrlHashTags,
  hideLink,
  showLink,
  removeLink,
};
