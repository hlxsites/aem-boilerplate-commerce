const productUrl = '/products/adobe-pattern-hoodie/adb102';
const region = '.product-details__reviews';
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
} = {}) {
  const requests = { rating: 0, reviews: 0 };
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
    } else if (query.includes('PRODUCT_RATING_QUERY')) {
      requests.rating += 1;
      expect(variables.skus).to.deep.equal(['ADB102']);
      expect(req.headers['magento-website-code']).to.equal('base');
      req.alias = 'productRating';
      req.reply(ratingError ? { errors: [{ message: 'Rating service unavailable' }] } : {
        data: {
          products: unavailable ? [] : [{
            sku: 'ADB102',
            attributes: [
              { name: 'ac_rating_summary', value: count ? '92' : '0' },
              { name: 'ac_review_count', value: String(count) },
            ],
          }],
        },
      });
    } else if (query.includes('REVIEWS_QUERY')) {
      requests.reviews += 1;
      expect(variables).to.deep.equal({ sku: 'ADB102', pageSize: 20, currentPage: 1 });
      req.alias = 'productReviews';
      req.reply(reviewError && requests.reviews === 1
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
  cy.visit(productUrl);
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

describe('PDP ratings and reviews', () => {
  it('composes the aggregate and first review page without replacing the header rating', () => {
    visitProduct();
    cy.wait(['@productRating', '@productReviews']);
    cy.get(`${region} .product-details__review-rating`).should('contain.text', '31 reviews');
    cy.get(`${region} h2`).should('contain.text', '31 reviews');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
    cy.get('.product-details__rating').should('not.be.empty');
    cy.get(`${region} .ratingsreviews-pagination`).should('not.exist');
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
  });

  it('does not mount or request review data when store reviews are disabled', () => {
    const requests = visitProduct({ enabled: false });
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.get(region).should('not.exist').then(() => {
      expect(requests).to.deep.equal({ rating: 0, reviews: 0 });
    });
  });

  it('allows guests to read reviews when guest writing is disabled', () => {
    visitProduct({ guestWriting: false });
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Test shopper');
  });

  it('renders a confirmed zero-review state', () => {
    visitProduct({ count: 0, items: [] });
    cy.get(`${region} .product-details__review-rating`).should('contain.text', 'No reviews');
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'No reviews on this page.');
  });

  it('keeps the review list and purchasing available when the aggregate fails', () => {
    visitProduct({ ratingError: true });
    cy.get(`${region} .product-details__review-rating [role="status"]`)
      .should('contain.text', 'Unable to load rating.');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
  });

  it('keeps the aggregate available and retries a failed review request', () => {
    visitProduct({ reviewError: true });
    cy.get(`${region} .product-details__review-rating`).should('contain.text', '31 reviews');
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Unable to load reviews.');
    cy.contains(`${region} button`, 'Try again').click();
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('distinguishes unavailable data from an empty review collection', () => {
    visitProduct({ unavailable: true });
    cy.get(`${region} .product-details__review-rating`).should('contain.text', 'Rating is unavailable.');
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
      expect(requests).to.deep.equal({ rating: 1, reviews: 1 });
    });
  });

  it('preserves the page review SKU when PDP publishes a variant', () => {
    const requests = visitProduct();
    cy.wait(['@productRating', '@productReviews']);
    emitEvent('pdp/data', { sku: 'OTHER-VARIANT', inStock: true });
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2).then(() => {
      expect(requests).to.deep.equal({ rating: 1, reviews: 1 });
    });
  });

  it('ignores rating and review errors from unrelated scopes', () => {
    visitProduct();
    cy.wait(['@productRating', '@productReviews']);
    emitEvent('rating/error', 'Unrelated rating failure', 'another-product');
    emitEvent('reviews/error', 'Unrelated review failure', 'another-product');
    cy.get(`${region} .product-details__review-rating`).should('contain.text', '31 reviews');
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
