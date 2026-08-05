export default async function editorial(context) {
  const { elements } = context;

  elements.header.after(elements.attributes);
  elements.header.after(elements.description);

  const headerRow = document.createElement('div');
  headerRow.className = 'pdp-editorial-header-row';
  elements.header.before(headerRow);
  headerRow.append(elements.wishlistToggle, elements.header);
}
