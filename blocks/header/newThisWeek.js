export default function hidden(hidePar) {
  document.addEventListener('DOMContentLoaded', () => {
    // read more/show less
    const readMore = document.querySelectorAll(
      '.banner-section-latest:nth-child(1) .hero-latest div div table tbody tr:nth-child(4) td p:nth-child(1) u'
    );

    readMore.forEach((element) => {
      if (element) {
        element.classList.add('read-more');
      }
    });

    const headingWrappers = document.querySelectorAll(
      '.form-container .heading-wrapper'
    );

    headingWrappers.forEach((wrapper) => {
      wrapper.addEventListener('click', (event) => {
        const arrow = event.target.closest('.form-container .heading-wrapper');

        if (arrow) {
          event.preventDefault();

          const formContainer = wrapper.closest('.form-container');
          formContainer.classList.toggle('active');
        }
      });
    });

    // Hidden par
    const hidePar = document.querySelectorAll(
      '.banner-section-latest:nth-child(1) .hero-latest  div div table tbody tr:nth-child(3) td'
    );

    hidePar.forEach((element) => {
      if (element) {
        element.classList.add('hidden-content');
      }
    });

    const readMoreLink = document.querySelector('.read-more');
    const hiddenContent = document.querySelector('.hidden-content');
    const hideParenthesis = document.querySelector(
      '.hero-latest div p:nth-child(2) strong:nth-child(6)'
    );

    hiddenContent.style.display = 'none';

    readMoreLink.addEventListener('click', (event) => {
      event.preventDefault();

      if (hiddenContent.style.display === 'none') {
        hiddenContent.style.display = 'block';
        hideParenthesis.style.display = 'none';
        readMoreLink.textContent = 'Show Less';
      } else {
        hiddenContent.style.display = 'none';
        hideParenthesis.style.display = 'inline';
        readMoreLink.textContent = 'Read More';
      }
    });
    // End Hidden Par fn
  });
}
