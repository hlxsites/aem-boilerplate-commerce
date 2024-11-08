import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const pathElements = block.querySelectorAll('p');

  try {
    // Fetch data from json folder
    const response = await fetch('/query-index.json');
    const indexData = await response.json();

    block.querySelectorAll('p, div').forEach((element) => element.remove());

    const pathsInBlock = Array.from(pathElements).map((pathElement) =>
      pathElement.textContent.trim()
    );

    const articlesWithDates = indexData.data
      .filter((item) => pathsInBlock.includes(item.path))
      .map((item) => {
        let dateObj;
        try {
          dateObj = item.date
            ? new Date(item.date.split(' ').slice(1).join(' '))
            : new Date(0);
        } catch (error) {
          console.warn(`Invalid date format for item: ${item.path}`, error);
          dateObj = new Date(0);
        }
        return { ...item, dateObj };
      });

    articlesWithDates.sort((a, b) => b.dateObj - a.dateObj);

    articlesWithDates.forEach((item) => {
      const { path, image: imagePath, title, category, date } = item;

      let formattedDate = '';
      if (date) {
        const dateParts = date.split(' ');
        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];
        formattedDate = `${day} ${month} ${year}`;
      }

      // Create article card elements
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('article-card');

      const imageWrapperDiv = document.createElement('div');
      imageWrapperDiv.classList.add('article-image');

      if (imagePath) {
        const imgLink = document.createElement('a');
        const img = document.createElement('img');
        imgLink.href = path;
        img.src = imagePath;
        img.alt = title;
        imgLink.appendChild(img);
        imageWrapperDiv.appendChild(imgLink);
      }

      contentDiv.appendChild(imageWrapperDiv);

      const textContentDiv = document.createElement('div');
      textContentDiv.classList.add('article-content');

      if (block.classList.contains('featured-date-title')) {
        if (date) {
          const dateLink = document.createElement('a');
          dateLink.href = path;
          dateLink.textContent = formattedDate;

          const articleDate = document.createElement('p');
          articleDate.classList.add('date');
          articleDate.appendChild(dateLink);
          textContentDiv.appendChild(articleDate);
        }

        const titleLink = document.createElement('a');
        titleLink.href = path;
        titleLink.textContent = title;

        const articleTitle = document.createElement('h3');
        articleTitle.appendChild(titleLink);
        textContentDiv.appendChild(articleTitle);

        contentDiv.appendChild(textContentDiv);
        block.appendChild(contentDiv);
      } else {
        const articleCategory = document.createElement('p');
        articleCategory.classList.add('category');

        const articleCategoryLink = document.createElement('a');
        articleCategoryLink.href = `/${category
          .toLowerCase()
          .replace(/\s+/g, '-')}`;
        articleCategoryLink.textContent = category;

        articleCategory.appendChild(articleCategoryLink);
        textContentDiv.appendChild(articleCategory);

        const titleLink = document.createElement('a');
        titleLink.href = path;
        titleLink.textContent = title;

        const articleTitle = document.createElement('h3');
        articleTitle.appendChild(titleLink);
        textContentDiv.appendChild(articleTitle);

        if (date) {
          const dateLink = document.createElement('a');
          dateLink.href = path;
          dateLink.textContent = formattedDate;

          const articleDate = document.createElement('p');
          articleDate.classList.add('date');
          articleDate.appendChild(dateLink);
          textContentDiv.appendChild(articleDate);
        }

        contentDiv.appendChild(textContentDiv);
        block.appendChild(contentDiv);
      }
    });

    pathElements.forEach((pathElement) => pathElement.remove());
  } catch (error) {
    console.error('Error fetching or processing index data: ', error);
  }
}
