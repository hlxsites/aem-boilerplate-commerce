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
    `.columns-container:nth-child(1):not(.footer-one,.heading,.section-two-col,:has(.article-section,.section-two-col,.affiliate-section,.section-desc)),
     .columns-container:nth-child(6):not(.heading,.section-two-col)`
  );

  bannerSection.forEach((element) => {
    if (element) {
      element.classList.add("banner-footer-section");
    }
  });

  //Christopher - Shipping
  changeShippingColor();
}


// replacing string to add a span to be able to style the dates in color green 
function changeShippingColor()
{
    const getShippingString = document.querySelectorAll(`.section-desc ul li:has(br)`);
    
    for(var i = 0;i < 3;++i)
    {
      getShippingString[0].innerHTML = getShippingString[0].innerHTML.replace("Fri 2 Aug - Mon 5 Aug",`<span class="green-text">Fri 2 Aug - Mon 5 Aug</span>`);
      getShippingString[1].innerHTML = getShippingString[1].innerHTML.replace("Fri 2 Aug - Mon 5 Aug",`<span class="green-text">Fri 2 Aug - Mon 5 Aug</span>`);
      getShippingString[2].innerHTML = getShippingString[2].innerHTML.replace("Fri 2 Aug - Mon 5 Aug",`<span class="green-text">Fri 2 Aug - Mon 5 Aug</span>`); 
    }
}