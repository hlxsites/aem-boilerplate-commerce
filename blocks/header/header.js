import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { cartApi } from '../../scripts/minicart/api.js';
import { getConfigValue } from '../../scripts/configs.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 992px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector(
      '[aria-expanded="true"]'
    );
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector(
      '[aria-expanded="true"]'
    );
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections
    .querySelectorAll('.nav-sections .default-content-wrapper > ul > li')
    .forEach((section) => {
      section.setAttribute('aria-expanded', expanded);
    });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded =
    forceExpanded !== null
      ? !forceExpanded
      : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = expanded || isDesktop.matches ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(
    navSections,
    expanded || isDesktop.matches ? 'false' : 'true'
  );
  button.setAttribute(
    'aria-label',
    expanded ? 'Open navigation' : 'Close navigation'
  );

  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

function getDirectTextContent(menuItem) {
  const menuLink = menuItem.querySelector(':scope > a');
  if (menuLink) {
    return menuLink.textContent.trim();
  }
  return Array.from(menuItem.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .map((n) => n.textContent)
    .join(' ');
}

async function buildBreadcrumbsFromNavTree(nav, currentUrl) {
  const crumbs = [];

  const homeUrl = document.querySelector(
    '.nav-brand .sub-nav-content a[href]'
  ).href;

  let menuItem = Array.from(nav.querySelectorAll('a')).find(
    (a) => a.href === currentUrl
  );
  if (menuItem) {
    do {
      const link = menuItem.querySelector(':scope > a');
      crumbs.unshift({
        title: getDirectTextContent(menuItem),
        url: link ? link.href : null,
      });
      menuItem = menuItem.closest('ul')?.closest('li');
    } while (menuItem);
  } else if (currentUrl !== homeUrl) {
    crumbs.unshift({ title: getMetadata('og:title'), url: currentUrl });
  }

  const placeholders = await fetchPlaceholders();
  const homePlaceholder = placeholders.breadcrumbsHomeLabel || 'Mens';

  crumbs.unshift({ title: homePlaceholder, url: homeUrl });

  // last link is current page and should not be linked
  if (crumbs.length > 1) {
    crumbs[crumbs.length - 1].url = null;
  }
  crumbs[crumbs.length - 1]['aria-current'] = 'page';
  return crumbs;
}

async function buildBreadcrumbs() {
  const breadcrumbs = document.createElement('nav');
  breadcrumbs.className = 'breadcrumbs';

  const crumbs = await buildBreadcrumbsFromNavTree(
    document.querySelector('.sub-nav-content'),
    document.location.href
  );

  const ol = document.createElement('ol');
  ol.append(
    ...crumbs.map((item) => {
      const li = document.createElement('li');
      if (item['aria-current'])
        li.setAttribute('aria-current', item['aria-current']);
      if (item.url) {
        const a = document.createElement('a');
        a.href = item.url;
        a.textContent = item.title;
        li.append(a);
      } else {
        li.textContent = item.title;
      }
      return li;
    })
  );

  breadcrumbs.append(ol);
  return breadcrumbs;
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections
      .querySelectorAll(':scope .default-content-wrapper > ul > li')
      .forEach((navSection) => {
        if (navSection.querySelector('ul'))
          navSection.classList.add('nav-drop');
        navSection.addEventListener('click', () => {
          if (isDesktop.matches) {
            const expanded =
              navSection.getAttribute('aria-expanded') === 'true';
            toggleAllNavSections(navSections);
            navSection.setAttribute(
              'aria-expanded',
              expanded ? 'false' : 'true'
            );
          }
        });
      });
  }

  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    const search = navTools.querySelector('a[href*="search"]');
    if (search && search.textContent === '') {
      search.setAttribute('aria-label', 'Search');
    }
  }
  // Minicart
  const minicartButton = document.createRange()
    .createContextualFragment(`<div class="minicart-wrapper">
    <button type="button" class="button nav-cart-button">0</button>
    <div></div>
  </div>`);
  navTools.append(minicartButton);
  navTools.querySelector('.nav-cart-button').addEventListener('click', () => {
    cartApi.toggleCart();
  });
  cartApi.cartItemsQuantity.watch((quantity) => {
    navTools.querySelector('.nav-cart-button').textContent = quantity;
  });

  // Search
  const searchInput = document.createRange().createContextualFragment(`
  <div class="nav-search-input hidden">
    <form id="search_mini_form" action="/search" method="GET">
      <input id="search" type="search" name="q" placeholder="Search" />
      <div id="search_autocomplete" class="search-autocomplete"></div>
      <button type="button" class="button close-search-button">
      <img src="../../icons/close.svg" alt="Close" /></button>
    </form>
  </div>
`);
  document.body.querySelector('header').append(searchInput);

  const searchButton = document.createRange().createContextualFragment(`
  <button type="button" class="button nav-search-button">Search</button>
`);
  navTools.append(searchButton);

  // Search button toggle logic
  navTools
    .querySelector('.nav-search-button')
    .addEventListener('click', async () => {
      await import('./searchbar.js');

      const searchInputElement = document.querySelector(
        'header .nav-search-input'
      );
      searchInputElement.classList.toggle('hidden');
    });

  // Close button logic
  document
    .querySelector('.close-search-button')
    .addEventListener('click', () => {
      const searchInputElement = document.querySelector(
        'header .nav-search-input'
      );
      searchInputElement.classList.add('hidden');
    });

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () =>
    toggleMenu(nav, navSections, isDesktop.matches)
  );

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  if (getMetadata('breadcrumbs').toLowerCase() === 'true') {
    navWrapper.append(await buildBreadcrumbs());
  }

  const navMen = document.querySelectorAll(
    '.nav-brand .columns-2-cols div div:nth-child(1) p a '
  );
  navMen.forEach((element) => {
    if (element) {
      element.classList.add('active');
    }
  });

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
}
