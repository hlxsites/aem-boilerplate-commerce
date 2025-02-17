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
    // @TODO: optimize (now it is going ot be O(n^2) :/)
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

export {
  parseHashTag,
};
