export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector("picture");
      if (pic) {
        const picWrapper = pic.closest("div");
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add("columns-img-col");
        }
      }
    });
  });

  //Column Headers
  const columnHeader = document.querySelectorAll(
    ".columns-container:nth-child(2) > .columns-wrapper:nth-of-type(1) div p strong, \
  .columns-container:nth-of-type(3) > .default-content-wrapper p, \
  .columns-container:nth-child(4) > .columns-wrapper:nth-of-type(1) div p strong, \
  .columns-container:nth-child(6) > .columns-wrapper:nth-of-type(1) div:nth-child(1), \
  .columns-container:nth-child(9) > div:nth-child(1) p strong, \
   .columns-container:nth-child(11) > div:nth-child(1) p  "
  );

  columnHeader.forEach((element) => {
    if (element) {
      element.classList.add("column-headers");
    }
  });

  //View all buttons
  const viewAllElements = document.querySelectorAll(
    "main .columns-container:nth-child(2) > .columns-wrapper:nth-of-type(1) div:nth-child(2) p, \
    main .columns-container:nth-child(4) > .columns-wrapper:nth-of-type(1) div:nth-child(2) p, \
    main .columns-container:nth-child(6) > .columns-wrapper:nth-of-type(1) div:nth-child(2) p, \
    main .columns-container:nth-child(11) > .columns-wrapper:nth-of-type(1) div:nth-child(2) p"
  );

  viewAllElements.forEach((element) => {
    if (element) {
      element.classList.add("view-all-button");
    }
  });

  //Latest Products
  const latestProduct = document.querySelectorAll(
    ".columns-container:nth-child(2) \
  > .columns-wrapper:nth-of-type(2) div,.columns-container:nth-child(6) \
  > .columns-wrapper:nth-of-type(2) div"
  );

  latestProduct.forEach((element) => {
    if (element) {
      element.classList.add("latest-products");
    }
  });

  //Latest Products carousel
  const latestProductCarousel = document.querySelectorAll(
    ".columns-container:nth-child(2) > .columns-wrapper:nth-of-type(2), \
    .columns-container:nth-child(6) > .columns-wrapper:nth-of-type(2) "
  );

  latestProductCarousel.forEach((element) => {
    if (element) {
      element.classList.add("latest-products-carousel");
    }
  });

  //Trending & for you
  const trending = document.querySelectorAll(
    "main .columns-container:nth-child(3), \
    main .columns-container:nth-child(9)"
  );

  trending.forEach((element) => {
    if (element) {
      element.classList.add("trending-section");
    }
  });

  //Launches
  const launches = document.querySelectorAll(
    ".columns-container:nth-child(4) .columns-wrapper:nth-child(2) .columns-3-cols"
  );

  launches.forEach((element) => {
    if (element) {
      element.classList.add("launches-section");
    }
  });

  //Launches Products carousel
  const launchesSectionCarousel = document.querySelectorAll(
    ".columns-container:nth-child(4) .columns-wrapper:nth-child(2) "
  );

  launchesSectionCarousel.forEach((element) => {
    if (element) {
      element.classList.add("launches-section-carousel");
    }
  });

  //Featured
  const featuredBrand = document.querySelectorAll(
    "main .columns-container:nth-child(5) > .columns-wrapper div:nth-child(1), \
    main .columns-container:nth-child(10) > .columns-wrapper div:nth-child(1)"
  );

  featuredBrand.forEach((element) => {
    if (element) {
      element.classList.add("featured-brand");
    }
  });

  //Nested Columns
  const nestedColumns = document.querySelectorAll(
    ".columns-container:nth-child(5) > .columns-wrapper > .columns-2-cols, \
    .columns-container:nth-child(10) > .columns-wrapper > .columns-2-cols"
  );

  nestedColumns.forEach((element) => {
    if (element) {
      element.classList.add("nested-columns");
    }
  });

  //Featured Mirror
  const featuredBrandMirror = document.querySelectorAll(
    ".columns-container:nth-child(8) > .columns-wrapper div:nth-child(1)"
  );

  featuredBrandMirror.forEach((element) => {
    if (element) {
      element.classList.add("featured-brand-mirror");
    }
  });

  //Nested Columns Mirror
  const nestedColumnsMirror = document.querySelectorAll(
    ".columns-container:nth-child(8) > .columns-wrapper > .columns-2-cols"
  );

  nestedColumnsMirror.forEach((element) => {
    if (element) {
      element.classList.add("nested-columns-mirror");
    }
  });

  //Latest Sneakers
  const latestSneakers = document.querySelectorAll(
    ".columns-container:nth-child(6) \
  > .columns-wrapper:nth-of-type(2) div"
  );

  latestSneakers.forEach((element) => {
    if (element) {
      element.classList.add("latest-sneakers");
    }
  });

  //Banner Section
  const bannerSection = document.querySelectorAll(
    ".columns-container:nth-child(7),.columns-container:nth-child(1)"
  );

  bannerSection.forEach((element) => {
    if (element) {
      element.classList.add("banner-section");
    }
  });

  //Features
  const featuresColumn = document.querySelectorAll(
    ".columns-container:nth-child(11)> .columns-wrapper:nth-of-type(2) div > div:nth-child(1) \
    > div p:nth-child(1), .columns-container:nth-child(11) > .columns-wrapper:nth-of-type(2) \
    div > div:nth-child(1) > div"
  );

  featuresColumn.forEach((element) => {
    if (element) {
      element.classList.add("features-section");
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const viewAllButtons = document.querySelectorAll(
      ".nav-sections .columns-1-cols div div a.button"
    );
    viewAllButtons.forEach((button) => {
      button.textContent = button.textContent.toLowerCase();
    });
  });
}
