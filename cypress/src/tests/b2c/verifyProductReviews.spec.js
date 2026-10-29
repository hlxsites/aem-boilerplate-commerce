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
  count = 31,
  items = [review, { ...review, nickname: 'Another shopper' }],
  ratingError = false,
  reviewError = false,
  unavailable = false,
  responseGate,
  skuResponseGate,
  sku = 'ADB102',
  requestedSku = 'adb102',
  authored = false,
  scope,
  pagination = false,
  paginationScope = scope,
  paginationFirst = false,
  standalone = false,
  metadataSku,
  skuError = false,
  missingProduct = false,
} = {}) {
  const requests = { sku: 0, rating: 0, reviews: 0 };
  const reply = (req, body) => (responseGate
    ? responseGate.then(() => req.reply(body))
    : req.reply(body));
  cy.intercept('**/graphql*', (req) => {
    const url = new URL(req.url);
    const query = req.body?.query ?? url.searchParams.get('query') ?? '';
    const variables = req.body?.variables ?? JSON.parse(url.searchParams.get('variables') ?? '{}');
    if (query.includes('STORE_CONFIG_QUERY')) {
      req.alias = 'reviewsConfig';
      req.reply({
        data: {
          storeConfig: {
            product_reviews_enabled: enabled ? '1' : '0',
            allow_guests_to_write_product_reviews: guestWriting ? '1' : '0',
          },
        },
      });
    } else if (query.includes('PRODUCT_REVIEWS_SKU_QUERY')) {
      requests.sku += 1;
      expect(variables.skus).to.deep.equal([requestedSku]);
      req.alias = 'reviewSku';
      const body = skuError ? { errors: [{ message: 'Catalog unavailable' }] } : {
        data: { products: missingProduct ? [] : [{ sku }] },
      };
      return skuResponseGate ? skuResponseGate.then(() => req.reply(body)) : req.reply(body);
    } else if (query.includes('PRODUCT_RATING_QUERY')) {
      requests.rating += 1;
      expect(variables.skus).to.deep.equal([sku]);
      expect(req.headers['magento-website-code']).to.equal('base');
      req.alias = 'productRating';
      return reply(req, ratingError ? { errors: [{ message: 'Rating service unavailable' }] } : {
        data: {
          products: unavailable ? [] : [{
            sku,
            attributes: [
              { name: 'ac_rating_summary', value: count ? '92' : '0' },
              { name: 'ac_review_count', value: String(count) },
            ],
          }],
        },
      });
    } else if (query.includes('REVIEWS_QUERY')) {
      requests.reviews += 1;
      expect(variables).to.deep.equal({ sku, pageSize: 20, currentPage: 1 });
      req.alias = 'productReviews';
      return reply(req, reviewError && requests.reviews === 1
        ? { errors: [{ message: 'Review service unavailable' }] }
        : {
          data: {
            reviews: unavailable ? null : {
              items,
              page_info: {
                current_page: 1,
                page_size: 20,
                total_pages: count ? 2 : 0,
              },
            },
          },
        });
    }
  });
  if (authored || standalone || metadataSku) {
    cy.request(productUrl).then(({ body }) => {
      let html = body;
      if (metadataSku) {
        html = html.replace(/<meta[^>]+name=["']sku["'][^>]*>/gi, '');
        html = html.replace('</head>', `<meta name="sku" content="${metadataSku}"></head>`);
      }
      if (authored || standalone) {
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

function emitEvent(name, payload, scope) {
  cy.window().then((win) => new Cypress.Promise((resolve, reject) => {
    const script = win.document.createElement('script');
    script.type = 'module';
    script.nonce = 'aem';
    const source = `
      import { events } from '${win.location.origin}/scripts/__dropins__/tools/event-bus.js';
      events.emit(${JSON.stringify(name)}, ${JSON.stringify(payload)}, ${JSON.stringify({ scope })});
    `;
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
      reject(new Error('Unable to publish the test event.'));
    };
    win.document.head.appendChild(script);
  }));
}

describe('Product reviews block', () => {
  it('composes the aggregate and first review page without replacing the header rating', () => {
    visitProduct();
    cy.wait(['@productRating', '@productReviews']);
    cy.get(`${region} .product-reviews__rating`).should('contain.text', '31 reviews');
    cy.get(`${region} h2`).should('contain.text', '31 reviews');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
    cy.get('.product-details__rating').should('not.be.empty');
    cy.get(`${region} .ratingsreviews-pagination`).should('not.exist');
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.get(region).should('have.length', 1);
    cy.get('.product-details .product-reviews').should('not.exist');
    cy.get('.product-details').parent().next().should('have.class', 'product-reviews-wrapper');
  });

  it('respects authored placement without injecting another block', () => {
    visitProduct({ authored: true, requestedSku: 'ADB102' });
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
    cy.get(region).should('have.length', 1);
    cy.get(region).closest('.section').find('.product-details').should('not.exist');
  });

  it('renders an authored SKU without a Product Details block', () => {
    visitProduct({ standalone: true, requestedSku: 'OTHER-SKU', sku: 'OTHER-SKU' });
    cy.wait(['@reviewSku', '@productRating', '@productReviews']);
    cy.get('.product-details').should('not.exist');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('uses the configured scope for review events', () => {
    visitProduct({ standalone: true, requestedSku: 'ADB102', scope: 'main-reviews' });
    cy.wait(['@productRating', '@productReviews']);
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
    emitEvent('reviews/error', 'Scoped request failed', 'main-reviews');
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Unable to load reviews.');
    cy.contains(`${region} button`, 'Try again').click();
    cy.wait('@productReviews');
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
  });

  it('renders a separate pager without Product Details or duplicate initial requests', () => {
    const requests = visitProduct({
      standalone: true, requestedSku: 'ADB102', scope: 'main-reviews', pagination: true,
    });
    cy.get('.product-details').should('not.exist');
    cy.get('.product-reviews-pagination nav').should('be.visible');
    cy.contains('.product-reviews-pagination button', /^2$/).should('be.visible');
    cy.get(`${region} .ratingsreviews-pagination`).should('not.exist').then(() => {
      expect(requests).to.deep.equal({ sku: 1, rating: 1, reviews: 1 });
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

  it('keeps pagination with a missing scope hidden instead of using unscoped events', () => {
    visitProduct({
      standalone: true, requestedSku: 'ADB102', scope: 'main-reviews', pagination: true, paginationScope: '',
    });
    cy.get('.product-reviews-pagination').should('have.attr', 'data-block-status', 'loaded')
      .and('not.be.visible').and('be.empty');
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
  });

  it('prefers page SKU metadata to the product URL', () => {
    visitProduct({ metadataSku: 'ADB102', requestedSku: 'ADB102' });
    cy.wait(['@reviewSku', '@productRating', '@productReviews']);
    cy.get(`${region} .product-reviews__rating`).should('contain.text', '31 reviews');
  });

  it('keeps reviews hidden and purchasing available when SKU resolution fails', () => {
    const requests = visitProduct({ skuError: true });
    cy.wait('@reviewSku');
    cy.get(region).should('not.be.visible');
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible').then(() => {
      expect(requests).to.deep.equal({ sku: 1, rating: 0, reviews: 0 });
    });
  });

  it('does not delay purchase controls while the canonical SKU is loading', () => {
    let release;
    const skuResponseGate = new Cypress.Promise((resolve) => { release = resolve; });
    visitProduct({ skuResponseGate });
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.get(`${region} .ratingsreviews-review__skeleton`).should('be.visible');
    cy.then(() => release());
    cy.wait(['@reviewSku', '@productRating', '@productReviews']);
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('does not request review data for an unresolved product', () => {
    const requests = visitProduct({ missingProduct: true });
    cy.wait('@reviewSku');
    cy.get(region).should('not.be.visible').then(() => {
      expect(requests).to.deep.equal({ sku: 1, rating: 0, reviews: 0 });
    });
  });

  it('requires an authored SKU when standalone page context has none', () => {
    const requests = visitProduct({ standalone: true, requestedSku: '' });
    cy.get(region).should('have.attr', 'data-block-status', 'loaded')
      .and('not.be.visible').then(() => {
        expect(requests).to.deep.equal({ sku: 0, rating: 0, reviews: 0 });
      });
  });

  it('shows loading skeletons without blocking purchase controls, then removes them', () => {
    let release;
    const responseGate = new Cypress.Promise((resolve) => { release = resolve; });
    visitProduct({ responseGate });
    cy.get(`${region} .ratingsreviews-rating`).should('have.attr', 'aria-busy', 'true');
    cy.get(`${region} .product-reviews__rating-skeleton`).should('be.visible')
      .and('have.attr', 'aria-hidden', 'true');
    cy.get(`${region} .ratingsreviews-review`).should('have.attr', 'aria-busy', 'true');
    cy.get(`${region} .ratingsreviews-review__skeleton`).should('be.visible');
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.then(() => release());
    cy.wait(['@productRating', '@productReviews']);
    cy.get(`${region} .ratingsreviews-rating`).should('have.attr', 'aria-busy', 'false');
    cy.get(`${region} .ratingsreviews-review`).should('have.attr', 'aria-busy', 'false');
    cy.get(`${region} .product-reviews__rating-skeleton`).should('not.exist');
    cy.get(`${region} .ratingsreviews-review__skeleton`).should('not.exist');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('does not mount or request review data when store reviews are disabled', () => {
    const requests = visitProduct({ enabled: false });
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.get(region).should('not.be.visible').and('be.empty').then(() => {
      expect(requests).to.deep.equal({ sku: 0, rating: 0, reviews: 0 });
    });
  });

  it('allows guests to read reviews when guest writing is disabled', () => {
    visitProduct({ guestWriting: false });
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Test shopper');
  });

  it('renders a confirmed zero-review state', () => {
    visitProduct({ count: 0, items: [] });
    cy.get(`${region} .product-reviews__rating`).should('contain.text', 'No reviews');
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'No reviews on this page.');
  });

  it('keeps the review list and purchasing available when the aggregate fails', () => {
    visitProduct({ ratingError: true });
    cy.get(`${region} .product-reviews__rating [role="status"]`)
      .should('contain.text', 'Unable to load rating.');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
  });

  it('keeps the aggregate available and retries a failed review request', () => {
    visitProduct({ reviewError: true });
    cy.get(`${region} .product-reviews__rating`).should('contain.text', '31 reviews');
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Unable to load reviews.');
    cy.contains(`${region} button`, 'Try again').click();
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('distinguishes unavailable data from an empty review collection', () => {
    visitProduct({ unavailable: true });
    cy.get(`${region} .product-reviews__rating`).should('contain.text', 'Rating is unavailable.');
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
    cy.wait(['@productRating', '@productReviews']);
    cy.get('.product-details__quantity input').clear().type('2').blur();
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2).then(() => {
      expect(requests).to.deep.equal({ sku: 1, rating: 1, reviews: 1 });
    });
  });

  it('preserves the page review SKU when PDP publishes a variant', () => {
    const requests = visitProduct();
    cy.wait(['@productRating', '@productReviews']);
    emitEvent('pdp/data', { sku: 'OTHER-VARIANT', inStock: true });
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2).then(() => {
      expect(requests).to.deep.equal({ sku: 1, rating: 1, reviews: 1 });
    });
  });

  it('ignores rating and review errors from unrelated scopes', () => {
    visitProduct();
    cy.wait(['@productRating', '@productReviews']);
    emitEvent('rating/error', 'Unrelated rating failure', 'another-product');
    emitEvent('reviews/error', 'Unrelated review failure', 'another-product');
    cy.get(`${region} .product-reviews__rating`).should('contain.text', '31 reviews');
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
