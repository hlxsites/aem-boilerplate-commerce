export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  //Christopher - Banner
  //Banner Section
  const bannerSection = document.querySelectorAll(
    `.columns-container:nth-child(1):not(.footer-one),
     .columns-container:nth-child(6)`
  );

  bannerSection.forEach((element) => {
    if (element) {
      element.classList.add("banner-footer-section");
    }
  });
}
