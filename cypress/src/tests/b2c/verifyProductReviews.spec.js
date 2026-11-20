const productUrl = '/products/adobe-pattern-hoodie/adb102';
const region = '.product-reviews';
const pagination = `${region} .ratingsreviews-pagination`;
const review = {
  nickname: 'Test shopper',
  summary: 'Good product',
  text: 'Works as described.',
  average_rating: 80,
  created_at: '2026-10-13 17:27:36',
  ratings_breakdown: [{ name: 'Quality', value: '4' }],
};

const ratingValues = [1, 2, 3, 4, 5].map((value) => ({ value_id: `MQ==-${value}`, value: String(value) }));
const ratingsMetadata = [{ id: 'MQ==', name: 'Quality', values: ratingValues }];
const createdReview = {
  summary: 'Great set',
  text: 'Fits well and washes easily.',
  nickname: 'Mandy',
  average_rating: 80,
  ratings_breakdown: [{ name: 'Quality', value: '4' }],
};

function visitProduct({
  enabled = true,
  guestWriting = true,
  items = [review, { ...review, nickname: 'Another shopper' }],
  totalPages = items.length ? 2 : 0,
  reviewError = false,
  pageError = false,
  shrinking = false,
  configError = false,
  unavailable = false,
  stats,
  labels,
  responseGate,
  pageResponseGate,
  metadataGate,
  requestedSku = 'adb102',
  authored = false,
  secondInstance = false,
  authoredPdp = false,
  standalone = false,
  metadataSku,
  isolatedCore = false,
} = {}) {
  const requests = { catalog: 0, reviews: 0 };
  const failedPages = new Set();
  const blockLabels = labels ?? {
    'Global.ReviewsTitle': 'Reviews',
    'Global.WriteReview': 'Write review',
    'Global.WriteReviewLoading': 'Loading review form',
  };
  cy.intercept('GET', '**/placeholders/ratings-reviews.json*', {
    headers: { 'cache-control': 'no-store' },
    body: {
      total: Object.keys(blockLabels).length,
      offset: 0,
      limit: Object.keys(blockLabels).length,
      data: Object.entries(blockLabels).map(([Key, Value]) => ({ Key, Value })),
      ':type': 'sheet',
    },
  }).as('reviewLabels');
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
    } else if (query.includes('RATINGS_METADATA_QUERY')) {
      req.alias = 'ratingsMetadata';
      const body = { data: { productReviewRatingsMetadata: { items: ratingsMetadata } } };
      return metadataGate ? metadataGate.then(() => req.reply(body)) : req.reply(body);
    } else if (query.includes('CREATE_PRODUCT_REVIEW')) {
      req.alias = 'createReview';
      req.reply({ data: { createProductReview: { review: createdReview } } });
    } else if (query.includes('PRODUCT_RATING_QUERY') || query.includes('PRODUCT_REVIEWS_SKU_QUERY')) {
      requests.catalog += 1;
      throw new Error('The review integration must not request Catalog Service operations.');
    } else if (query.includes('REVIEWS_QUERY')) {
      requests.reviews += 1;
      const { currentPage } = variables;
      const withStats = requests.reviews <= (secondInstance ? 2 : 1)
        || (reviewError && currentPage === 1);
      expect(currentPage).to.be.oneOf([1, 2]);
      expect(variables).to.deep.equal({
        sku: requestedSku, pageSize: 20, currentPage, withStats,
      });
      if (isolatedCore && requests.reviews > 1) {
        expect(url.pathname).to.equal('/reviews-core-test/graphql');
        expect(req.headers['x-reviews-core-test']).to.equal('core');
        expect(req.headers).not.to.have.property('x-reviews-catalog-test');
      }
      req.alias = 'productReviews';
      const fail = ((reviewError && currentPage === 1) || (pageError && currentPage === 2))
        && !failedPages.has(currentPage);
      if (fail) failedPages.add(currentPage);
      const body = fail
        ? { errors: [{ message: 'Review service unavailable' }] }
        : {
          data: {
            reviews: unavailable ? null : {
              ...(withStats && stats ? { stats } : {}),
              items: currentPage === 1 ? items
                : shrinking ? [] : [{ ...review, nickname: 'Page 2 shopper' }],
              page_info: {
                current_page: currentPage,
                page_size: 20,
                total_pages: shrinking && currentPage === 2 ? 1 : totalPages,
              },
            },
          },
        };
      const gate = currentPage > 1 ? pageResponseGate : responseGate;
      return gate ? gate.then(() => req.reply(body)) : req.reply(body);
    }
    return undefined;
  });
  cy.request(productUrl).then(({ body }) => {
    let html = body;
    if (!authoredPdp && !standalone) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      doc.querySelectorAll('.product-details').forEach((block) => block.remove());
      html = `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
    }
    if (metadataSku) {
      html = html.replace(/<meta[^>]+name=["']sku["'][^>]*>/gi, '');
      html = html.replace('</head>', `<meta name="sku" content="${metadataSku}"></head>`);
    }
    if (authored || standalone) {
      const block = `<div class="product-reviews"><div><div>sku</div><div>${requestedSku}</div></div></div>`;
      const blocks = secondInstance ? `${block}${block}` : block;
      html = standalone
        ? html.replace(/<main>[\s\S]*?<\/main>/, `<main><div>${blocks}</div></main>`)
        : html.replace('</main>', `<div>${blocks}</div></main>`);
    }
    const path = standalone ? '/reviews-test' : productUrl;
    cy.intercept('GET', path, { body: html, headers: { 'content-type': 'text/html' } });
    cy.visit(path);
  });
  if (!authoredPdp || authored || standalone) cy.wait('@reviewsConfig');
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

function isolateCoreClient() {
  cy.location('origin').then((origin) => runModule(`
    import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL } from '${origin}/scripts/commerce.js';
    CORE_FETCH_GRAPHQL.setEndpoint('${origin}/reviews-core-test/graphql');
    CORE_FETCH_GRAPHQL.setFetchGraphQlHeader('x-reviews-core-test', 'core');
    CS_FETCH_GRAPHQL.setEndpoint('${origin}/reviews-catalog-test/graphql');
    CS_FETCH_GRAPHQL.setFetchGraphQlHeader('x-reviews-catalog-test', 'catalog');
  `));
}

describe('SPEC-ratings-reviews-storefront', () => {
  it('T-001 [FR-003, FR-008] renders the first review page without duplicating the PDP header rating', () => {
    const requests = visitProduct();
    cy.wait('@productReviews');
    cy.get(`${region} .ratingsreviews-review h2`).should('have.text', 'Reviews');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
    cy.get('.product-details__rating').should('not.be.empty');
    cy.get(`${region} .ratingsreviews-rating`).should('not.exist');
    cy.get(`${pagination} nav`).should('be.visible');
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.get(region).should('have.length', 1);
    cy.get('.product-details .product-reviews').should('not.exist');
    cy.get('.product-details').closest('.section').find(region).should('not.exist');
    cy.get('main > .section').last().find(region).should('have.length', 1)
      .then(() => expect(requests).to.deep.equal({ catalog: 0, reviews: 1 }));
    cy.get('.product-reviews-pagination').should('not.exist');
  });

  it('T-002 [FR-007] does not inject reviews into an explicitly authored Product Details template', () => {
    const requests = visitProduct({ authoredPdp: true });
    cy.get('.product-details').should('have.attr', 'data-block-status', 'loaded');
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.get(region).should('not.exist').then(() => {
      expect(requests).to.deep.equal({ catalog: 0, reviews: 0 });
    });
  });

  it('T-003 [FR-007] renders explicitly authored reviews alongside an authored Product Details block', () => {
    visitProduct({ authoredPdp: true, authored: true, requestedSku: 'ADB102' });
    cy.get('.product-details').should('have.attr', 'data-block-status', 'loaded');
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
    cy.get(region).should('have.length', 1);
    cy.get(region).closest('.section').find('.product-details').should('not.exist');
  });

  it('T-004 [FR-007] respects authored placement without injecting another block', () => {
    visitProduct({ authored: true, requestedSku: 'ADB102' });
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
    cy.get(region).should('have.length', 1);
    cy.get(region).closest('.section').find('.product-details').should('not.exist');
    cy.get(`${pagination} nav`).should('be.visible');
    cy.get('.product-reviews-pagination').should('not.exist');
  });

  it('T-005 [FR-003] renders an authored SKU without a Product Details block', () => {
    visitProduct({ standalone: true, requestedSku: 'OTHER-SKU' });
    cy.wait('@productReviews');
    cy.get('.product-details').should('not.exist');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('T-006 [FR-003] prefers page SKU metadata to the product URL', () => {
    visitProduct({ metadataSku: 'ADB102', requestedSku: 'ADB102' });
    cy.wait('@productReviews');
    cy.get(`${region} .ratingsreviews-review h2`).should('have.text', 'Reviews');
  });

  it('T-007 [FR-003] requires an authored SKU when standalone page context has none', () => {
    const requests = visitProduct({ standalone: true, requestedSku: '' });
    cy.get(region).should('have.attr', 'data-block-status', 'loaded')
      .and('not.be.visible').then(() => {
        expect(requests).to.deep.equal({ catalog: 0, reviews: 0 });
      });
  });

  it('T-008 [FR-003, FR-005] renders pagination inside reviews without PDP, Catalog queries, or duplicate requests', () => {
    const requests = visitProduct({
      standalone: true, requestedSku: 'ADB102',
    });
    cy.get('.product-details').should('not.exist');
    cy.get(`${pagination} nav`).should('be.visible');
    cy.contains(`${pagination} button`, /^2$/).should('be.visible');
    cy.get(pagination).should('have.length', 1).then(() => {
      expect(requests).to.deep.equal({ catalog: 0, reviews: 1 });
    });
  });

  it('T-009 [FR-006] uses the drop-in loading skeleton without blocking purchase controls', () => {
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

  it('T-010 [FR-004] does not request review data when store reviews are disabled', () => {
    const requests = visitProduct({ enabled: false });
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.get(region).should('not.be.visible').and('be.empty').then(() => {
      expect(requests).to.deep.equal({ catalog: 0, reviews: 0 });
    });
    cy.get(pagination).should('not.exist');
  });

  it('T-011 [FR-004] fails closed when the Core store configuration request fails', () => {
    const requests = visitProduct({
      configError: true, standalone: true, requestedSku: 'ADB102',
    });
    cy.get(region).should('have.attr', 'data-block-status', 'loaded')
      .and('not.be.visible').and('be.empty').then(() => {
        expect(requests).to.deep.equal({ catalog: 0, reviews: 0 });
      });
    cy.get(pagination).should('not.exist');
  });

  it('T-012 [FR-004] allows guests to read reviews when guest writing is disabled', () => {
    visitProduct({ guestWriting: false });
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Test shopper');
  });

  it('T-013 [FR-006] renders an empty page without inventing an aggregate or total', () => {
    visitProduct({ items: [] });
    cy.get(`${region} .ratingsreviews-review h2`).should('have.text', 'Reviews');
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'No reviews on this page.');
    cy.get(`${region} .ratingsreviews-review__list`).should('not.exist');
    cy.get(pagination).should('have.attr', 'hidden');
    cy.get(`${region} .product-reviews__pagination`).should('not.be.visible');
  });

  it('T-014 [FR-006] keeps purchasing available and retries a failed review request', () => {
    visitProduct({ reviewError: true });
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Unable to load reviews.');
    cy.get('.product-details__buttons__add-to-cart button').should('be.visible');
    cy.contains(`${region} button`, 'Try again').click();
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('T-015 [FR-002, FR-006] keeps retry requests on Core when Catalog endpoint and headers change', () => {
    visitProduct({ reviewError: true, standalone: true, requestedSku: 'ADB102', isolatedCore: true });
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Unable to load reviews.');
    isolateCoreClient();
    cy.contains(`${region} button`, 'Try again').click();
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
  });

  it('T-016 [FR-006] distinguishes unavailable data from an empty review page', () => {
    visitProduct({ unavailable: true });
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Reviews are unavailable.');
    cy.get(`${region} .ratingsreviews-review__list`).should('not.exist');
  });

  it('T-017 [FR-016] renders shopper-provided HTML as text', () => {
    const payload = '<img src=x onerror="window.reviewPayloadExecuted=true">';
    visitProduct({ items: [{ ...review, nickname: payload, summary: payload, text: payload }] });
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', payload);
    cy.get(`${region} .ratingsreviews-review__list img`).should('not.exist');
    cy.window().its('reviewPayloadExecuted').should('not.exist');
  });

  it('T-018 [FR-005] does not refetch reviews when quantity changes', () => {
    const requests = visitProduct();
    cy.wait('@productReviews');
    cy.get('.product-details__quantity input').clear().type('2').blur();
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2).then(() => {
      expect(requests).to.deep.equal({ catalog: 0, reviews: 1 });
    });
  });

  it('T-019 [FR-005] preserves the page review SKU when PDP publishes a variant', () => {
    const requests = visitProduct();
    cy.wait('@productReviews');
    emitEvent('pdp/data', { sku: 'OTHER-VARIANT', inStock: true });
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2).then(() => {
      expect(requests).to.deep.equal({ catalog: 0, reviews: 1 });
    });
  });

  it('T-020 [FR-005] ignores review errors from unrelated scopes', () => {
    visitProduct();
    cy.wait('@productReviews');
    emitEvent('reviews/error', 'Unrelated review failure', 'another-product');
    cy.get(`${region} .ratingsreviews-review__list > li`).should('have.length', 2);
    cy.get(`${region} .ratingsreviews-review__status`).should('be.empty');
  });

  it('T-021 [FR-009] renders the title and Write review button above the review list', () => {
    visitProduct();
    cy.wait('@productReviews');
    cy.get(`${region} .product-reviews__title`).should('have.text', 'Reviews');
    cy.get(`${region} .product-reviews__write-review button`).should('contain.text', 'Write review');
    cy.get(`${region} .product-reviews__header`).nextAll('.product-reviews__list').should('have.length', 1);
  });

  it('T-022 [FR-009] submits the authored review SKU on a standalone Reviews page without PDP data', () => {
    visitProduct({ standalone: true, requestedSku: 'OTHER-SKU' });
    cy.wait('@productReviews');
    cy.get('.product-details').should('not.exist');
    cy.get(`${region} .product-reviews__write-review button`).click();
    cy.get('dialog[open] .ratingsreviews-write-review').within(() => {
      cy.get('.ratingsreviews-write-review__product').should('not.exist');
      cy.get('input[type="radio"]').eq(3).check({ force: true });
      cy.get('[name="title"]').type('Great set');
      cy.get('[name="description"]').type('Fits well and washes easily.');
      cy.get('[name="nickname"]').type('Mandy');
      cy.contains('button', 'Submit').click();
      cy.contains('pending moderation').should('be.visible');
    });
    cy.wait('@createReview').its('request.body.variables.input.sku').should('equal', 'OTHER-SKU');
    cy.get('dialog[open] .close-button').click();
    cy.get('dialog').should('not.exist');
    cy.get(`${region} .product-reviews__write-review button`).click();
    cy.get('dialog[open]').should('have.length', 1).within(() => {
      cy.get('[name="title"]').should('have.value', '');
    });
  });

  it('T-023 [FR-009, FR-010] opens the review form and submits a review', () => {
    visitProduct();
    cy.wait('@productReviews');
    cy.get(`${region} .product-reviews__write-review button`).click();
    cy.get('dialog[open] .ratingsreviews-write-review').within(() => {
      cy.get('input[type="radio"]').should('have.length', 5);
      cy.get('input[type="radio"]').eq(3).check({ force: true });
      cy.get('[name="title"]').type('Great set');
      cy.get('[name="description"]').type('Fits well and washes easily.');
      cy.get('[name="nickname"]').type('Mandy');
      cy.contains('button', 'Submit').click();
      cy.contains('Thanks for your review!').should('be.visible');
      cy.contains('pending moderation').should('be.visible');
    });
    cy.wait('@createReview').its('request.body.variables.input').should('deep.equal', {
      sku: 'adb102',
      nickname: 'Mandy',
      summary: 'Great set',
      text: 'Fits well and washes easily.',
      ratings: [{ id: 'MQ==', value_id: 'MQ==-4' }],
    });
  });

  it('T-024 [FR-009] shows a loading button until the review form is ready and reuses its ratings', () => {
    let release;
    const metadataGate = new Cypress.Promise((resolve) => { release = resolve; });
    visitProduct({ metadataGate });
    const button = `${region} .product-reviews__write-review button`;
    cy.wait('@productReviews');
    cy.get(button).click();
    cy.get(button).should('be.disabled').and('have.attr', 'aria-busy', 'true');
    cy.get(`${button} .dropin-progress-spinner`).should('be.visible');
    cy.get('dialog[open]').should('not.exist');
    cy.then(() => release());
    cy.get('dialog[open] .ratingsreviews-write-review input[type="radio"]').first().should('have.focus');
    cy.get(button).should('not.be.disabled').and('not.have.attr', 'aria-busy');
    cy.get(`${button} .dropin-progress-spinner`).should('not.exist');
    cy.get('dialog[open] .close-button').click();
    cy.get('dialog').should('not.exist');
    cy.get(button).click();
    cy.get('dialog[open] .ratingsreviews-write-review input[type="radio"]').should('have.length', 5);
    cy.get('@ratingsMetadata.all').should('have.length', 1);
  });

  it('T-025 [FR-010] asks signed-out shoppers to sign in when guests cannot write reviews', () => {
    visitProduct({ guestWriting: false });
    cy.wait('@productReviews');
    cy.get(`${region} .product-reviews__write-review button`).click();
    cy.get('dialog[open]').within(() => {
      cy.contains('Sign in to write a review').should('be.visible');
      cy.get('[name="title"]').should('not.exist');
    });
  });

  it('T-026 [FR-005] navigates integrated page controls and restores the first review page', () => {
    visitProduct();
    cy.wait('@productReviews');
    cy.contains(`${pagination} button`, /^2$/).click();
    cy.wait('@productReviews').its('request.url').then((url) => {
      expect(JSON.parse(new URL(url).searchParams.get('variables')).currentPage).to.equal(2);
    });
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Page 2 shopper');
    cy.get(`${region} .ratingsreviews-review h2`).should('have.text', 'Reviews');
    cy.contains(`${pagination} button`, /^1$/).click();
    cy.wait('@productReviews');
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Test shopper');
  });

  it('T-027 [FR-002, FR-005] keeps navigation requests on Core when Catalog endpoint and headers change', () => {
    const requests = visitProduct({
      standalone: true, requestedSku: 'ADB102', isolatedCore: true,
    });
    cy.wait('@productReviews');
    isolateCoreClient();
    cy.contains(`${pagination} button`, /^2$/).click();
    cy.wait('@productReviews').its('request.url').then((url) => {
      expect(new URL(url).pathname).to.equal('/reviews-core-test/graphql');
      expect(JSON.parse(new URL(url).searchParams.get('variables')).currentPage).to.equal(2);
    });
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Page 2 shopper')
      .then(() => expect(requests).to.deep.equal({ catalog: 0, reviews: 2 }));
  });

  it('T-028 [FR-005, FR-006] disables page controls while the next review page is loading', () => {
    let release;
    const pageResponseGate = new Cypress.Promise((resolve) => { release = resolve; });
    visitProduct({ pageResponseGate });
    cy.contains(`${pagination} button`, /^2$/).click();
    cy.get(`${pagination} fieldset`).should('be.disabled');
    cy.get(`${region} .ratingsreviews-review__skeleton`).should('be.visible');
    cy.then(() => release());
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Page 2 shopper');
    cy.get(`${pagination} fieldset`).should('not.be.disabled');
  });

  it('T-029 [FR-005, FR-006] retains the pager and retries a failed review page', () => {
    visitProduct({ pageError: true });
    cy.contains(`${pagination} button`, /^2$/).click();
    cy.get(`${region} .ratingsreviews-review__status`).should('contain.text', 'Unable to load reviews.');
    cy.get(`${pagination} nav`).should('be.visible');
    cy.contains(`${region} button`, 'Try again').click();
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Page 2 shopper');
  });

  it('T-030 [FR-005] recovers to the first page when the collection shrinks', () => {
    visitProduct({ shrinking: true });
    cy.contains(`${pagination} button`, /^2$/).click();
    cy.contains(`${pagination} button`, 'Return to the first page').click();
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Test shopper');
  });

  it('T-031 [FR-005] keeps independently scoped review lists and pagers isolated', () => {
    visitProduct({
      standalone: true, requestedSku: 'ADB102', secondInstance: true,
    });
    cy.get(`${region} .ratingsreviews-review__list`).should('have.length', 2);
    cy.get(region).eq(0).find('.ratingsreviews-pagination').contains('button', /^2$/).click();
    cy.get(region).eq(0).find('.ratingsreviews-review__list').should('contain.text', 'Page 2 shopper');
    cy.get(region).eq(1).find('.ratingsreviews-review__list')
      .should('contain.text', 'Test shopper').and('not.contain.text', 'Page 2 shopper');
    cy.get(region).eq(1).find('.ratingsreviews-pagination').contains('button', /^2$/).click();
    cy.get(region).eq(1).find('.ratingsreviews-review__list').should('contain.text', 'Page 2 shopper');
  });

  it('T-032 [FR-005] hides the pager for a single review page', () => {
    visitProduct({ totalPages: 1 });
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
    cy.get(pagination).should('have.attr', 'hidden');
    cy.get(`${region} .product-reviews__pagination`).should('not.be.visible');
  });

  it('T-034 [FR-003, FR-008] renders backend review statistics and preserves them during pagination', () => {
    visitProduct({
      stats: {
        review_count: 15,
        rating_votes_count: 15,
        rating_summary: 80,
        ratings_distribution: [
          { value: 5, count: 6 },
          { value: 4, count: 5 },
          { value: 3, count: 3 },
          { value: 1, count: 1 },
        ],
      },
    });
    const summary = `${region} .ratingsreviews-review-summary`;
    cy.get(summary).should('be.visible');
    cy.get(`${summary} .ratingsreviews-review-summary__row`).should('have.length', 5)
      .first().should('contain.text', '40%');
    cy.contains(`${pagination} button`, /^2$/).click();
    cy.get(`${region} .ratingsreviews-review__list`).should('contain.text', 'Page 2 shopper');
    cy.get(summary).should('be.visible');
    cy.get(`${summary} .ratingsreviews-review-summary__row`).first().should('contain.text', '40%');
  });

  it('T-035 [FR-002, FR-016] loads localized block labels from the placeholder sheet', () => {
    visitProduct({
      labels: {
        'Global.ReviewsTitle': 'Bewertungen',
        'Global.WriteReview': 'Bewertung schreiben',
        'Global.WriteReviewLoading': 'Bewertungsformular wird geladen',
      },
    });
    cy.wait('@reviewLabels');
    cy.get(`${region} .product-reviews__title`).should('have.text', 'Bewertungen');
    cy.get(`${region} .product-reviews__write-review button`).should('contain.text', 'Bewertung schreiben');
  });

  it('T-033 [FR-016] fits the mobile viewport and RTL layout', () => {
    cy.viewport(390, 844);
    visitProduct();
    cy.document().then((doc) => doc.documentElement.setAttribute('dir', 'rtl'));
    cy.get(`${region} .ratingsreviews-review__list`).should('be.visible');
    cy.get(region).then(($region) => {
      expect($region[0].scrollWidth).to.be.at.most($region[0].clientWidth);
    });
    cy.get(`${pagination} nav`).should('be.visible');
    cy.get(pagination).then(($pager) => {
      expect($pager[0].scrollWidth).to.be.at.most($pager[0].clientWidth);
    });
  });
});
