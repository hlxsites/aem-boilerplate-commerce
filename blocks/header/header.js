/* eslint-disable import/no-unresolved */

// Drop-in Tools
import { events } from '@dropins/tools/event-bus.js';

// Cart dropin
import { publishShoppingCartViewEvent } from '@dropins/storefront-cart/api.js';

import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

import renderAuthCombine from './renderAuthCombine.js';
import { renderAuthDropdown } from './renderAuthDropdown.js';

import {
  isDesktop,
  toggleAllNavSections,
  toggleMenu,
} from './menu/menu.js';

import parseUrlHashTags from './menu/hashTagParser.js';

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
        if (navSection.querySelector('ul')) {
          navSection.classList.add('nav-drop');
        }

        navSection.addEventListener('click', () => {
          if (isDesktop.matches) {
            const expanded = navSection.getAttribute('aria-expanded') === 'true';
            toggleAllNavSections(navSections);
            navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          }
        });
      });
    parseUrlHashTags(navSections);
  }

  const navTools = nav.querySelector('.nav-tools');

  /** Mini Cart */
  const excludeMiniCartFromPaths = ['/checkout'];

  const minicart = document.createRange().createContextualFragment(`
     <div class="minicart-wrapper nav-tools-wrapper">
       <button type="button" class="nav-cart-button" aria-label="Cart"></button>
       <div class="minicart-panel nav-tools-panel"></div>
     </div>
   `);

  navTools.append(minicart);

  const minicartPanel = navTools.querySelector('.minicart-panel');

  const cartButton = navTools.querySelector('.nav-cart-button');

  if (excludeMiniCartFromPaths.includes(window.location.pathname)) {
    cartButton.style.display = 'none';
  }

  // load nav as fragment
  const miniCartMeta = getMetadata('mini-cart');
  const miniCartPath = miniCartMeta ? new URL(miniCartMeta, window.location).pathname : '/mini-cart';
  loadFragment(miniCartPath).then((miniCartFragment) => {
    minicartPanel.append(miniCartFragment.firstElementChild);
  });

  async function toggleMiniCart(state) {
    const show = state ?? !minicartPanel.classList.contains('nav-tools-panel--show');
    const stateChanged = show !== minicartPanel.classList.contains('nav-tools-panel--show');
    minicartPanel.classList.toggle('nav-tools-panel--show', show);

    if (stateChanged && show) {
      publishShoppingCartViewEvent();
    }
  }

  cartButton.addEventListener('click', () => toggleMiniCart());

  // Cart Item Counter
  events.on(
    'cart/data',
    (data) => {
      if (data?.totalQuantity) {
        cartButton.setAttribute('data-count', data.totalQuantity);
      } else {
        cartButton.removeAttribute('data-count');
      }
    },
    { eager: true },
  );

  /** Search */

  // TODO
  const search = document.createRange().createContextualFragment(`
  <div class="search-wrapper nav-tools-wrapper">
    <button type="button" class="nav-search-button">Search</button>
    <div class="nav-search-input nav-search-panel nav-tools-panel">
      <form action="/search" method="GET">
        <input id="search" type="search" name="q" placeholder="Search" />
        <div id="search_autocomplete" class="search-autocomplete"></div>
      </form>
    </div>
  </div>
  `);

  navTools.append(search);

  const searchPanel = navTools.querySelector('.nav-search-panel');

  const searchButton = navTools.querySelector('.nav-search-button');

  const searchInput = searchPanel.querySelector('input');

  async function toggleSearch(state) {
    const show = state ?? !searchPanel.classList.contains('nav-tools-panel--show');

    searchPanel.classList.toggle('nav-tools-panel--show', show);

    if (show) {
      await import('./searchbar.js');
      searchInput.focus();
    }
  }

  navTools.querySelector('.nav-search-button').addEventListener('click', () => toggleSearch());

  // Close panels when clicking outside
  document.addEventListener('click', (e) => {
    if (!minicartPanel.contains(e.target) && !cartButton.contains(e.target)) {
      toggleMiniCart(false);
    }

    if (!searchPanel.contains(e.target) && !searchButton.contains(e.target)) {
      toggleSearch(false);
    }
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
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  renderAuthCombine(
    navSections,
    () => !isDesktop.matches && toggleMenu(nav, navSections, false),
  );
  renderAuthDropdown(navTools);
}
