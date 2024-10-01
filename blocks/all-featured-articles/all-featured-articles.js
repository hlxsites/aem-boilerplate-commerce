export default async function decorate(block) {
  // Gets all p tags in the block
  const pathElements = block.querySelectorAll('p');

  try {
    // Fetch data
    const response = await fetch('/query-index.json');
    const indexData = await response.json();

    block.querySelectorAll('p, div').forEach((element) => element.remove());
    // Process each p tag
    pathElements.forEach((pathElement) => {
      const path = pathElement.textContent.trim();

      // Finds matching item
      const matchingItem = indexData.data.find((item) => item.path === path);

      if (matchingItem) {
        const imagePath = matchingItem.image || '';
        const title = matchingItem.title || '';
        const category = matchingItem.category || '';
        const date = matchingItem.date || '';

        // Creates div for content
        const contentDiv = document.createElement('div');

        // Image
        if (imagePath) {
          const imgLink = document.createElement('a');
          const img = document.createElement('img');
          imgLink.href = path;
          img.src = imagePath;
          img.alt = title;
          imgLink.appendChild(img);
          contentDiv.appendChild(imgLink);
        }

        // Category, Title, and Date
        const articleCategory = document.createElement('p');
        articleCategory.classList.add('category');
        const articleCategoryLink = document.createElement('a');
        articleCategoryLink.href = `/${category
          .toLowerCase()
          .replace(/\s+/g, '-')}`;
        articleCategoryLink.textContent = category;
        articleCategory.appendChild(articleCategoryLink);
        contentDiv.appendChild(articleCategory);

        const titleLink = document.createElement('a');
        const articleTitle = document.createElement('h3');
        titleLink.href = path;
        titleLink.textContent = title;
        articleTitle.appendChild(titleLink);
        contentDiv.appendChild(articleTitle);

        const dateLink = document.createElement('a');
        const articleDate = document.createElement('p');
        articleDate.classList.add('date');
        dateLink.href = path;
        dateLink.textContent = date;
        articleDate.appendChild(dateLink);
        contentDiv.appendChild(articleDate);

        block.appendChild(contentDiv);
      } else {
        console.error('No matching data found for path:', path);
      }
    });

    // Clears p tags
    pathElements.forEach((pathElement) => pathElement.remove());
  } catch (error) {
    console.error('Error fetching or processing index data:', error);
  }
}
