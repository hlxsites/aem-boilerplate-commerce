const productUrl = '/products/adobe-pattern-hoodie/adb102';
const region = '.product-reviews';
const review = {
  nickname: 'Test shopper',
  summary: 'Good product',
  text: 'Works as described.',
  average_rating: 80,
  created_at: '2026-10-13 17:27:36',
  ratings_breakdown: [{ name: 'Quality', value: '4' }],
};

function visitProduct({
  enabled = true,
  guestWriting = true,
  items = [review, { ...review, nickname: 'Another shopper' }],
  reviewError = false,
  configError = false,
  unavailable = false,
  responseGate,
  requestedSku = 'adb102',
  authored = false,
  scope,
  pagination = false,
  paginationScope = scope,
  paginationFirst = false,
  standalone = false,
  metadataSku,
  isolatedRetry = false,
} = {}) {
  const requests = { catalog: 0, reviews: 0 };
  cy.intercept('**/graphql*', (req) => {
    const url = new URL(req.url);
    const query = req.body?.query ?? url.searchParams.get('query') ?? '';
    const variables = req.body?.variables ?? JSON.parse(url.searchParams.get('variables') ?? '{}');
    if (query.includes('STORE_CONFIG_QUERY')) {
      const isReviewsConfig = query.includes('allow_guests_to_write_product_reviews');
      if (isReviewsConfig) req.alias = 'reviewsConfig';
      req.reply(configError && isReviewsConfig ? { errors: [{ message: 'Configuration unavailable' }] } : {
        data: {
          storeConfig: {
            product_reviews_enabled: enabled ? '1' : '0',
            allow_guests_to_write_product_reviews: guestWriting ? '1' : '0',
          },
        },
      });
    } else if (query.includes('PRODUCT_RATING_QUERY') || query.includes('PRODUCT_REVIEWS_SKU_QUERY')) {
      requests.catalog += 1;
      throw new Error('The review integration must not request Catalog Service operations.');
    } else if (query.includes('REVIEWS_QUERY')) {
      requests.reviews += 1;
      expect(variables).to.deep.equal({ sku: requestedSku, pageSize: 20, currentPage: 1 });
      if (isolatedRetry && requests.reviews > 1) {
        expect(url.pathname).to.equal('/reviews-core-test/graphql');
        expect(req.headers['x-reviews-core-test']).to.equal('core');
        expect(req.headers).not.to.have.property('x-reviews-catalog-test');
      }
      req.alias = 'productReviews';
      const body = reviewError && requests.reviews === 1
        ? { errors: [{ message: 'Review service unavailable' }] }
        : {
          data: {
            reviews: unavailable ? null : {
              items,
              page_info: { current_page: 1, page_size: 20, total_pages: items.length ? 2 : 0 },
            },
          },
        };
      return responseGate ? responseGate.then(() => req.reply(body)) : req.reply(body);
    }
    return undefined;
  });
  if (authored || standalone || metadataSku || pagination) {
    cy.request(productUrl).then(({ body }) => {
      let html = body;
      if (metadataSku) {
        html = html.replace(/<meta[^>]+name=["']sku["'][^>]*>/gi, '');
        html = html.replace('</head>', `<meta name="sku" content="${metadataSku}"></head>`);
      }
      if (authored || standalone || pagination) {
        const scopeRow = scope ? `<div><div>scope</div><div>${scope}</div></div>` : '';
        const block = `<div class="product-reviews"><div><div>sku</div><div>${requestedSku}</div></div>${scopeRow}</div>`;
        const pagerScope = paginationScope ? `<div><div>scope</div><div>${paginationScope}</div></div>` : '';
        const pager = pagination ? `<div class="product-reviews-pagination">${pagerScope}</div>` : '';
        const blocks = paginationFirst ? `${pager}${block}` : `${block}${pager}`;
        html = standalone
          ? html.replace(/<main>[\s\S]*?<\/main>/, `<main><div>${blocks}</div></main>`)
          : html.replace('</main>', `<div>${blocks}</div></main>`);
      }
      const path = standalone ? '/reviews-test' : productUrl;
      cy.intercept('GET', path, { body: html, headers: { 'content-type': 'text/html' } });
      cy.visit(path);
    });
  } else {
    cy.visit(productUrl);
  }
  cy.wait('@reviewsConfig');
  return requests;
}

function runModule(source) {
  cy.window().then((win) => new Cypress.Promise((resolve, reject) => {
    const script = win.document.createElement('script');
    script.type = 'module';
    script.nonce = 'aem';
    const url = win.URL.createObjectURL(new win.Blob([source], { type: 'text/javascript' }));
    script.src = url;
    script.onload = () => {
      script.remove();
      win.URL.revokeObjectURL(url);
      resolve();
    };
    script.onerror = () => {
      script.remove();
      win.URL.revokeObjectURL(url);
      reject(new Error('Unable to execute the test module.'));
    };
    win.document.head.appendChild(script);
  }));
}

function emitEvent(name, payload, scope) {
  cy.location('origin').then((origin) => runModule(`
    import { events } from '${origin}/scripts/__dropins__/tools/event-bus.js';
    events.emit(${JSON.stringify(name)}, ${JSON.stringify(payload)}, ${JSON.stringify({ scope })});
  `));
}

describe('Product reviews block', () => {
  it('renders the first review page without duplicating the PDP header rating', () => {
    const requests = visitProduct();
    cy.wait('@productReviews');
    cy.get(`${region} h2`).should('have.text', 'Reviews');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
    cy.get('.product-details__rating').should('not.be.empty');
    cy.get(`${region} .ratingsreviews-rating`).should('not.exist');
    cy.get(`${region} .ratingsreviews-pagination`).should('not.exist');
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.get(region).should('have.length', 1);
    cy.get('.product-details .product-reviews').should('not.exist');
    cy.get('.product-details').parent().next().should('have.class', 'product-reviews-wrapper')
      .then(() => expect(requests).to.deep.equal({ catalog: 0, reviews: 1 }));
  });

  it('respects authored placement without injecting another block', () => {
    visitProduct({ authored: true, requestedSku: 'ADB102' });
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
    cy.get(region).should('have.length', 1);
    cy.get(region).closest('.section').find('.product-details').should('not.exist');
  });

  it('renders an authored SKU without a Product Details block', () => {
    visitProduct({ standalone: true, requestedSku: 'OTHER-SKU' });
    cy.wait('@productReviews');
    cy.get('.product-details').should('not.exist');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('prefers page SKU metadata to the product URL', () => {
    visitProduct({ metadataSku: 'ADB102', requestedSku: 'ADB102' });
    cy.wait('@productReviews');
    cy.get(`${region} h2`).should('have.text', 'Reviews');
  });

  it('uses the configured scope for review events and retry', () => {
    const requests = visitProduct({
      standalone: true, requestedSku: 'ADB102', scope: ' main-reviews ',
    });
    cy.wait('@productReviews');
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
    emitEvent('reviews/error', 'Scoped request failed', 'main-reviews');
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Unable to load reviews.');
    cy.contains(`${region} button`, 'Try again').click();
    cy.wait('@productReviews');
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible').then(() => {
      expect(requests).to.deep.equal({ catalog: 0, reviews: 2 });
    });
  });

  it('requires an authored SKU when standalone page context has none', () => {
    const requests = visitProduct({ standalone: true, requestedSku: '' });
    cy.get(region).should('have.attr', 'data-block-status', 'loaded')
      .and('not.be.visible').then(() => {
        expect(requests).to.deep.equal({ catalog: 0, reviews: 0 });
      });
  });

  it('renders a separate pager without PDP, Catalog queries, or duplicate requests', () => {
    const requests = visitProduct({
      standalone: true, requestedSku: 'ADB102', scope: 'main-reviews', pagination: true,
    });
    cy.get('.product-details').should('not.exist');
    cy.get('.product-reviews-pagination nav').should('be.visible');
    cy.contains('.product-reviews-pagination button', /^2$/).should('be.visible');
    cy.get(`${region} .ratingsreviews-pagination`).should('not.exist').then(() => {
      expect(requests).to.deep.equal({ catalog: 0, reviews: 1 });
    });
  });

  it('keeps a pager without a matching review scope hidden', () => {
    visitProduct({
      standalone: true,
      requestedSku: 'ADB102',
      scope: 'main-reviews',
      pagination: true,
      paginationScope: 'another-list',
    });
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
    cy.get('.product-reviews-pagination').should('not.be.visible');
    cy.get('.product-reviews-pagination .ratingsreviews-pagination').should('have.attr', 'hidden');
  });

  it('rejects a blank pager scope instead of consuming unscoped events', () => {
    visitProduct({
      standalone: true, requestedSku: 'ADB102', scope: 'main-reviews', pagination: true, paginationScope: ' ',
    });
    cy.get('.product-reviews-pagination').should('have.attr', 'data-block-status', 'loaded')
      .and('not.be.visible').and('be.empty');
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
  });

  it('uses the drop-in loading skeleton without blocking purchase controls', () => {
    let release;
    const responseGate = new Cypress.Promise((resolve) => { release = resolve; });
    visitProduct({ responseGate });
    cy.get(`${region} .ratingsreviews-review`).should('have.attr', 'aria-busy', 'true');
    cy.get(`${region} .ratingsreviews-review__skeleton`).should('be.visible')
      .and('have.attr', 'aria-hidden', 'true');
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.then(() => release());
    cy.wait('@productReviews');
    cy.get(`${region} .ratingsreviews-review`).should('have.attr', 'aria-busy', 'false');
    cy.get(`${region} .ratingsreviews-review__skeleton`).should('not.exist');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('does not request review data when store reviews are disabled', () => {
    const requests = visitProduct({ enabled: false });
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.get(region).should('not.be.visible').and('be.empty').then(() => {
      expect(requests).to.deep.equal({ catalog: 0, reviews: 0 });
    });
  });

  it('fails closed when the Core store configuration request fails', () => {
    const requests = visitProduct({ configError: true, standalone: true, requestedSku: 'ADB102' });
    cy.get(region).should('have.attr', 'data-block-status', 'loaded')
      .and('not.be.visible').and('be.empty').then(() => {
        expect(requests).to.deep.equal({ catalog: 0, reviews: 0 });
      });
  });

  it('allows guests to read reviews when guest writing is disabled', () => {
    visitProduct({ guestWriting: false });
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Test shopper');
  });

  it('renders an empty page without inventing an aggregate or total', () => {
    visitProduct({ items: [] });
    cy.get(`${region} h2`).should('have.text', 'Reviews');
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'No reviews on this page.');
    cy.get(`${region} .ratingsreviews-review__list`).should('not.exist');
  });

  it('keeps purchasing available and retries a failed review request', () => {
    visitProduct({ reviewError: true });
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Unable to load reviews.');
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.contains(`${region} button`, 'Try again').click();
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('keeps retry requests on Core when Catalog endpoint and headers change', () => {
    visitProduct({ reviewError: true, standalone: true, requestedSku: 'ADB102', isolatedRetry: true });
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Unable to load reviews.');
    cy.location('origin').then((origin) => runModule(`
      import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL } from '${origin}/scripts/commerce.js';
      CORE_FETCH_GRAPHQL.setEndpoint('${origin}/reviews-core-test/graphql');
      CORE_FETCH_GRAPHQL.setFetchGraphQlHeader('x-reviews-core-test', 'core');
      CS_FETCH_GRAPHQL.setEndpoint('${origin}/reviews-catalog-test/graphql');
      CS_FETCH_GRAPHQL.setFetchGraphQlHeader('x-reviews-catalog-test', 'catalog');
    `));
    cy.contains(`${region} button`, 'Try again').click();
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('distinguishes unavailable data from an empty review page', () => {
    visitProduct({ unavailable: true });
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Reviews are unavailable.');
    cy.get(`${region} .ratingsreviews-review__list`).should('not.exist');
  });

  it('renders shopper-provided HTML as text', () => {
    const payload = '<img src=x onerror="window.reviewPayloadExecuted=true">';
    visitProduct({ items: [{ ...review, nickname: payload, summary: payload, text: payload }] });
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', payload);
    cy.get(`${region} .ratingsreviews-review__list img`).should('not.exist');
    cy.window().its('reviewPayloadExecuted').should('not.exist');
  });

  it('does not refetch reviews when quantity changes', () => {
    const requests = visitProduct();
    cy.wait('@productReviews');
    cy.get('.product-details__quantity input').clear().type('2').blur();
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2).then(() => {
      expect(requests).to.deep.equal({ catalog: 0, reviews: 1 });
    });
  });

  it('preserves the page review SKU when PDP publishes a variant', () => {
    const requests = visitProduct();
    cy.wait('@productReviews');
    emitEvent('pdp/data', { sku: 'OTHER-VARIANT', inStock: true });
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2).then(() => {
      expect(requests).to.deep.equal({ catalog: 0, reviews: 1 });
    });
  });

  it('ignores review errors from unrelated scopes', () => {
    visitProduct();
    cy.wait('@productReviews');
    emitEvent('reviews/error', 'Unrelated review failure', 'another-product');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
    cy.get(`${region} .ratingsreviews-review__status`).should('be.empty');
  });

  it('fits the mobile viewport and RTL layout', () => {
    cy.viewport(390, 844);
    visitProduct();
    cy.document().then((doc) => doc.documentElement.setAttribute('dir', 'rtl'));
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
    cy.get(region).then(($region) => {
      expect($region[0].scrollWidth).to.be.at.most($region[0].clientWidth);
    });
  });
});
