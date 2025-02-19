import { getProperty } from '../../scripts/commerce.js';

export default async function decorate(block) {
  // a hack to determine if current page is a category page.
  const isCategory = !!document.querySelectorAll('.product-list-page-container').length;

  if (isCategory) {
    const categoryData = await window.categoryData;
    const category = getProperty(
      categoryData.data.categories.items,
      'name',
      { url: window.location.pathname.slice(1) },
    );

    // Update banner and page title.
    const bannerCopy = block.querySelector('h1');
    bannerCopy.textContent = category;
    window.document.title = category;
  }

  return block;
}
