async function decorateAllFeaturedArticles(block) {
  const config = readBlockConfig(block); // Assuming you have `readBlockConfig` defined elsewhere

  // Fetch product data (replace with your actual data fetching logic)
  const productData = await fetchProductData(config.skus);

  // Fetch index sheet data (replace with your actual logic)
  const indexSheetData = await fetchIndexSheetData();

  block.innerHTML = ''; // Clear existing content

  productData.forEach((product) => {
    // Find image path from index sheet
    const imagePath =
      indexSheetData.find((row) => row.path === product.urlKey)?.image || '';

    // Create article element
    const article = document.createElement('article');
    article.classList.add('featured-article');

    // Create image element
    const image = document.createElement('img');
    image.src = imagePath;
    image.alt = product.name;

    // Create details section
    const details = document.createElement('div');
    details.classList.add('details');

    // Add index label (if available)
    const indexLabel = getIndexLabelFromPath(product.urlKey); // Assuming you have `getIndexLabelFromPath` defined
    if (indexLabel) {
      const indexLabelElement = document.createElement('p');
      indexLabelElement.classList.add('index-label');
      indexLabelElement.textContent = indexLabel;
      details.appendChild(indexLabelElement);
    }

    // Add title
    const title = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = `/products/${product.urlKey}/${product.sku}`;
    titleLink.textContent = product.name;
    title.appendChild(titleLink);
    details.appendChild(title);

    // Add other details or actions as needed

    // Append image and details to article
    article.appendChild(image);
    article.appendChild(details);

    // Append article to the block
    block.appendChild(article);
  });
}

// Call the function to decorate the block
const allFeaturedArticlesBlock = document.querySelector(
  '.latest-featured-articles'
);
decorateAllFeaturedArticles(allFeaturedArticlesBlock);
