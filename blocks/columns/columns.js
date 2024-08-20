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

  const bannerImageUrl =
    '/media/18aba752689a24ec295872285c1e651c43fd8a443.png?width=2000&format=webply&optimize=medium';

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = bannerImageUrl;
  document.head.appendChild(link);
}
