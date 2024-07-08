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

  // SHOP NOW > onhover animation
  const button = document.querySelector(
    "  .columns-container:nth-child(4)> .columns-wrapper> .columns-2-cols div:nth-child(2) div:nth-child(1) p:nth-child(2)"
  );

  button.addEventListener("mouseover", () => {
    button.style.opacity = 0.5;
  });

  button.addEventListener("mouseout", () => {
    button.style.opacity = 1;
  });
}
