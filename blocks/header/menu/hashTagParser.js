import { isDesktop } from './menu.js';

/**
 * Parses href hash
 *
 * @param urlHash
 * @returns {*[]}
 */
const namespaces = [
  'display_for_',
  'apply_style_',
];

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
    // @TODO: optimize (now it is going to be O(n^2) :/)
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
function applyConditions(aElement, hashTags) {
  hashTags.forEach((hashTag) => {
    const { namespace, value } = { ...hashTag };

    if (namespace === 'display_for_') {
      if (value === 'desktop_only' && !isDesktop.matches) {
        aElement.parentNode.removeChild(aElement);
      }
      if (value === 'mobile_only' && isDesktop.matches) {
        aElement.parentNode.removeChild(aElement);
      }
    }
  });
}

/**
 * Parses nav fragment; disable visible elements based on hash tags
 *
 * @param navSections
 * @returns {*}
 */
function parseUrlHashTags(navSections) {
  const aElements = navSections.querySelectorAll('li > a');

  aElements.forEach((aElement) => {
    const link = aElement.href;
    if (link) {
      const hashTags = parseHashTag(link);
      console.table(`Hash tags for ${link}`, hashTags);

      applyConditions(aElement, hashTags);
    }
  });
}

export default parseUrlHashTags;
