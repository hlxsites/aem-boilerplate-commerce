/**
 * Parses href hash
 *
 * @param urlHash
 * @returns {*[]}
 */
const namespaces = [
  'display_for_',
];

function hideLink(el) {
  if (el.nodeType === 1) {
    el.parentNode.hidden = true;
  }
}

function showLink(el) {
  if (el.nodeType === 1) {
    el.parentNode.hidden = false;
  }
}

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
    // @TODO: optimize ( now it is going to be O(n^2) :/ )
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
 * @param aElement
 * @param hashTags
 */
function applyConditions(aElement, hashTags, callbackFn) {
  hashTags.forEach((hashTag) => {
    const { namespace, value } = { ...hashTag };
    callbackFn(aElement, namespace, value);
  });
}

/**
 * Parses nav fragment; disable visible elements based on hash tags
 *
 * @param navSections
 * @returns {*}
 */
function parseUrlHashTags(domEl = 'header', callbackFn = null) {
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
