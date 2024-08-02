import { cartApi } from "../../scripts/minicart/api.js";
import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia("(min-width: 900px)");

function closeOnEscape(e) {
  if (e.code === "Escape") {
    const nav = document.getElementById("nav");
    const navSections = nav.querySelector(".nav-sections");
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
      nav.querySelector("button").focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === "nav-drop";
  if (isNavDrop && (e.code === "Enter" || e.code === "Space")) {
    const dropExpanded = focused.getAttribute("aria-expanded") === "true";
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest(".nav-sections"));
    focused.setAttribute("aria-expanded", dropExpanded ? "false" : "true");
  }
}

function focusNavSection() {
  document.activeElement.addEventListener("keydown", openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections
    .querySelectorAll(".nav-sections .default-content-wrapper > ul > li")
    .forEach((section) => {
      section.setAttribute("aria-expanded", expanded);
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
      : nav.getAttribute("aria-expanded") === "true";
  const button = nav.querySelector(".nav-hamburger button");
  document.body.style.overflowY = expanded || isDesktop.matches ? "" : "hidden";
  nav.setAttribute("aria-expanded", expanded ? "false" : "true");
  toggleAllNavSections(
    navSections,
    expanded || isDesktop.matches ? "false" : "true"
  );
  button.setAttribute(
    "aria-label",
    expanded ? "Open navigation" : "Close navigation"
  );

  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll(".nav-drop");
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute("tabindex")) {
        drop.setAttribute("role", "button");
        drop.setAttribute("tabindex", 0);
        drop.addEventListener("focus", focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute("role");
      drop.removeAttribute("tabindex");
      drop.removeEventListener("focus", focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener("keydown", closeOnEscape);
  } else {
    window.removeEventListener("keydown", closeOnEscape);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata("nav");
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : "/nav";
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = "";
  const nav = document.createElement("nav");
  nav.id = "nav";
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ["brand", "sections", "tools"];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector(".nav-brand");
  const brandLink = navBrand.querySelector(".button");
  if (brandLink) {
    brandLink.className = "";
    brandLink.closest(".button-container").className = "";
  }

  const navSections = nav.querySelector(".nav-sections");
  if (navSections) {
    navSections
      .querySelectorAll(":scope .default-content-wrapper > ul > li")
      .forEach((navSection) => {
        if (navSection.querySelector("ul"))
          navSection.classList.add("nav-drop");
        navSection.addEventListener("click", () => {
          if (isDesktop.matches) {
            const expanded =
              navSection.getAttribute("aria-expanded") === "true";
            toggleAllNavSections(navSections);
            navSection.setAttribute(
              "aria-expanded",
              expanded ? "false" : "true"
            );
          }
        });
      });
  }

  const navTools = nav.querySelector(".nav-tools");

  // Minicart
  const minicartButton = document.createRange()
    .createContextualFragment(`<div class="minicart-wrapper">
    <button type="button" class="button nav-cart-button">0</button>
    <div></div>
  </div>`);
  navTools.append(minicartButton);
  navTools.querySelector(".nav-cart-button").addEventListener("click", () => {
    cartApi.toggleCart();
  });
  cartApi.cartItemsQuantity.watch((quantity) => {
    navTools.querySelector(".nav-cart-button").textContent = quantity;
  });

  // Search
  const searchInput = document.createRange()
    .createContextualFragment(`<div class="nav-search-input hidden">
      <form id="search_mini_form" action="/search" method="GET">
        <input id="search" type="search" name="q" placeholder="Search" />
        <div id="search_autocomplete" class="search-autocomplete"></div>
      </form>
    </div>`);
  document.body.querySelector("header").append(searchInput);

  const searchButton = document
    .createRange()
    .createContextualFragment(
      '<button type="button" class="button nav-search-button">Search</button>'
    );
  navTools.append(searchButton);
  navTools
    .querySelector(".nav-search-button")
    .addEventListener("click", async () => {
      await import("./searchbar.js");
      document
        .querySelector("header .nav-search-input")
        .classList.toggle("hidden");
    });

  // hamburger for mobile
  const hamburger = document.createElement("div");
  hamburger.classList.add("nav-hamburger");
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener("click", () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute("aria-expanded", "false");
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener("change", () =>
    toggleMenu(nav, navSections, isDesktop.matches)
  );

  const navWrapper = document.createElement("div");
  navWrapper.className = "nav-wrapper";
  navWrapper.append(nav);
  block.append(navWrapper);

  const currentURL = window.location.href;
  const targetURL = "http://localhost:3000/main/features/";

  if (currentURL.startsWith(targetURL)) {
    const featuresTitle = document.querySelectorAll(
      "main .default-content-wrapper, \
      main .columns-wrapper .columns-2-cols, \
      main .columns-wrapper .columns-2-cols div"
    );

    const featuresCarousel = document.querySelectorAll(
      "main div:nth-child(11)  .columns-6-cols, \
      main div .columns-7-cols"
    );

    const featuresCarouselContent = document.querySelectorAll(
      "main div:nth-child(11) .columns-6-cols, \
    main div:nth-child(11)  .columns-6-cols div, \
    main div .columns-7-cols, \
    main div .columns-7-cols div"
    );

    const featuresTeam = document.querySelectorAll(
      "main div:nth-child(20) .columns-3-cols"
    );

    const featuredNextPost = document.querySelectorAll(
      "main div:nth-child(21) .columns-1-cols"
    );

    const viewAllArticles = document.querySelectorAll(
      "main div:nth-child(22) .features-text \
      .features-text:nth-child(1) div"
    );

    const latestArticles = document.querySelectorAll(
      "main div:nth-child(22) .columns-3-cols"
    );

    const removeBackgroundColor = document.querySelectorAll(
      "main .columns-container:nth-child(3), \
      .columns-container:nth-child(9)"
    );

    const modalWrapper = document.querySelectorAll("main .modal-wrapper");

    featuresTitle.forEach((element) => {
      if (element) {
        element.classList.add("features-text");
        element.classList.remove("featured-brand");
        element.classList.remove("featured-brand-mirror");
        element.classList.remove("nested-columns-mirror");
        element.classList.remove("trending-section");
      }
      if (element == modalWrapper) {
        element.classList.remove("features-text");
      }
      if (element == viewAllArticles) {
        element.classList.remove("features-text");
      }
    });

    featuresCarousel.forEach((element) => {
      if (element) {
        element.classList.add("features-carousel");
      }
    });

    featuresCarouselContent.forEach((element) => {
      if (element) {
        element.classList.add("features-carousel-content");
        element.classList.remove("features-section");
      }
    });

    featuresTeam.forEach((element) => {
      if (element) {
        element.classList.add("features-team");
      }
    });

    featuredNextPost.forEach((element) => {
      if (element) {
        element.classList.add("featured-next-post");
      }
    });

    latestArticles.forEach((element) => {
      if (element) {
        element.classList.add("featured-latest-articles");
      }
    });

    removeBackgroundColor.forEach((element) => {
      if (element) {
        element.classList.add("features-remove-background");
        element.classList.remove("trending-section");
      }
    });
  }

  const featuresBoldTitleText = document.querySelectorAll(
    "main div:nth-child(3) .features-text:nth-child(1) p:nth-child(1), \
     main div:nth-child(8) .features-text:nth-child(1) div:nth-child(2) p:nth-child(1), \
    main div:nth-child(14) .features-text:nth-child(1) div:nth-child(1) p:nth-child(1), \
    main div:nth-child(6) .features-text:nth-child(1) p:nth-child(1) strong"
  );

  featuresBoldTitleText.forEach((element) => {
    if (element) {
      element.classList.add("features-bold-title");
    }
  });

  const featuresBoldText = document.querySelectorAll(
    "div:nth-child(6) .features-text:nth-child(1) p:nth-child(1), \
     div:nth-child(7) .features-text:nth-child(1) p:nth-child(1), \
     div:nth-child(9) .features-text p:nth-child(1), \
     div:nth-child(10) .features-text p:nth-child(1), \
     div:nth-child(12) .features-text p:nth-child(1), \
     div:nth-child(13) .features-text p:nth-child(1), \
     div:nth-child(15) .features-text p:nth-child(1), \
     div:nth-child(16) .features-text p:nth-child(1), \
     div:nth-child(17) .features-text p:nth-child(1), \
     main div:nth-child(2) .columns-1-cols div div p, \
     .features-remove-background .features-text:nth-child(2) \
      p:nth-child(1), main div:nth-child(4) div:nth-child(2) p "
  );

  featuresBoldText.forEach((element) => {
    if (element) {
      element.classList.add("features-bold-text");
    }
  });

  const featuresText = document.querySelectorAll(
    "div:nth-child(3) .features-text:nth-child(1) p:nth-child(2), \
    div:nth-child(3) .features-text:nth-child(1) p:nth-child(3), \
    div:nth-child(3) .features-text:nth-child(1) p:nth-child(4), \
    div:nth-child(6) .features-text:nth-child(1) p:nth-child(2), \
    div:nth-child(6) .features-text:nth-child(1) p:nth-child(3), \
    div:nth-child(6) .features-text:nth-child(1) p:nth-child(4), \
    div:nth-child(7) .features-text:nth-child(1) p:nth-child(2), \
    div:nth-child(9) .features-text p:nth-child(2), div:nth-child(10) \
    .features-text p:nth-child(2), div:nth-child(12) .features-text \
    p:nth-child(2), div:nth-child(12) .features-text p:nth-child(3), \
    div:nth-child(13) .features-text p:nth-child(2), div:nth-child(15) \
    .features-text p:nth-child(2), div:nth-child(16) .features-text \
    p:nth-child(2), div:nth-child(17) .features-text p:nth-child(2)"
  );

  featuresText.forEach((element) => {
    if (element) {
      element.classList.add("featured-text");
    }
  });

  const threeImgCol = document.querySelectorAll(
    "main div:nth-child(10) .features-text:nth-child(1) img, \
    main div:nth-child(3) .features-text:nth-child(1) img "
  );

  threeImgCol.forEach((element) => {
    if (element) {
      element.classList.add("featured-3-img-cols");
    }
  });

  const navSubHeader = document.querySelectorAll(
    ".nav-sections .columns-1-cols div div p  "
  );
  navSubHeader.forEach((element) => {
    if (element) {
      element.classList.add("nav-button");
      element.classList.remove("view-all-button");
    }
  });

  const navMen = document.querySelectorAll(
    ".nav-brand .columns-2-cols div div:nth-child(1) p a "
  );
  navMen.forEach((element) => {
    if (element) {
      element.classList.add("active");
    }
  });

  const newThisWeek = document.querySelectorAll(
    ".banner-section:nth-child(1) .columns-2-cols"
  );

  newThisWeek.forEach((element) => {
    if (element) {
      element.classList.add("new-this-week");
    }
  });

  // view-all-latest banner
  const bannerSections = document.querySelectorAll(".banner-section");

  bannerSections.forEach((banner) => {
    const newThisWeekElement = banner.querySelector(".new-this-week");

    if (newThisWeekElement) {
      banner.classList.add("view-all-latest-banner");
    }
  });

  // read more/show less
  const readMore = document.querySelectorAll(
    ".new-this-week div div table tbody tr:nth-child(4) td p:nth-child(1) u"
  );

  readMore.forEach((element) => {
    if (element) {
      element.classList.add("read-more");
    }
  });

  // Hidden par
  const hidePar = document.querySelectorAll(
    ".new-this-week div div table tbody tr:nth-child(3) td"
  );

  hidePar.forEach((element) => {
    if (element) {
      element.classList.add("hidden-content");
    }
  });

  const readMoreLink = document.querySelector(".read-more");
  const hiddenContent = document.querySelector(".hidden-content");

  hiddenContent.style.display = "none";

  readMoreLink.addEventListener("click", (event) => {
    event.preventDefault();

    if (hiddenContent.style.display === "none") {
      hiddenContent.style.display = "block";
      readMoreLink.textContent = "Show Less";
    } else {
      hiddenContent.style.display = "none";
      readMoreLink.textContent = "Read More";
    }
  });
  // End Hidden Par fn

  const headingWrappers = document.querySelectorAll(
    ".form-container .heading-wrapper"
  );

  headingWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", (event) => {
      const arrow = event.target.closest(".form-container .heading-wrapper");

      if (arrow) {
        event.preventDefault();

        const formContainer = wrapper.closest(".form-container");
        formContainer.classList.toggle("active");
      }
    });
  });

  // const checkboxWrappers = document.querySelectorAll(
  //   ".form-container div div .checkbox-wrapper"
  // );

  // checkboxWrappers.forEach((checkboxWrapper) => {
  //   if (checkboxWrapper) {
  //     const newContainer = document.createElement("div");
  //     newContainer.classList.add("all-checkboxes-container");

  //     while (checkboxWrapper.firstChild) {
  //       newContainer.appendChild(checkboxWrapper.firstChild);
  //     }

  //     checkboxWrapper.parentNode.replaceChild(newContainer, checkboxWrapper);
  //   }
  // });

  const newProductsCol = document.querySelectorAll(
    "main .columns-container:nth-child(5) \
    >.columns-wrapper:nth-of-type(1) .columns-4-cols div"
  );
  newProductsCol.forEach((element) => {
    if (element) {
      element.classList.add("new-products");
    }
  });
  const productCount = document.querySelectorAll(
    "main .columns-container:nth-child(5) .default-content-wrapper \
     p strong:nth-child(1)"
  );
  productCount.forEach((element) => {
    if (element) {
      element.classList.add("product-count");
    }
  });

  // Function for dynamic ammount of products
  const productCountElements = document.querySelectorAll(
    "main .columns-container:nth-child(5) .default-content-wrapper p strong:nth-child(1)"
  );
  const newProductsContainers = document.querySelectorAll(".new-products");

  function updateProductCount() {
    let totalProductCount = 0;
    newProductsContainers.forEach((container) => {
      const productItems = container.querySelectorAll(".new-products > div");
      totalProductCount += productItems.length;
    });
    productCountElements.forEach((countElement) => {
      countElement.textContent = totalProductCount - 1;
    });
  }

  updateProductCount();

  newProductsContainers.forEach((container) => {
    const observer = new MutationObserver(updateProductCount);
    observer.observe(container, { childList: true });
  });
}
