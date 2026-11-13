import { assertImageListDisplay } from '../../assertions';
import { getPrexPage, visitPrexPage, waitForRecsCarousel } from '../../support/recsGraphql';

describe('Verify Product Recommendation dropin display', () => {
  it('loads rec carousel on PLP draft', () => {
    visitPrexPage('displayPlp');

    waitForRecsCarousel(3);
    assertImageListDisplay('.recommendations-product-list__content', 3);
    cy.get('.recommendations-carousel__content').scrollTo('right');
    cy.get('[aria-label="Product 4 of 5"]').should('be.visible');
    cy.get('[aria-label="Product 5 of 5"]').should('be.visible');
    cy.get('[aria-label="Product 4 of 5"]').click();

    cy.url().should('include', '/products/');
    cy.get('.product-details').should('be.visible');
  });

  it('loads rec carousel on PDP draft', () => {
    visitPrexPage('displayPdp');

    waitForRecsCarousel(3);
    assertImageListDisplay('.recommendations-product-list__content', 3);
  });
});

describe('Recommendation ratings without a Product Reviews block', () => {
  [
    { title: 'shows ratings when reviews are enabled', enabled: true },
    { title: 'keeps recommendations visible when reviews are disabled', enabled: false },
    { title: 'keeps recommendations visible when review configuration fails', enabled: true, configError: true },
  ].forEach(({ title, enabled, configError = false }) => {
    it(title, () => {
      cy.intercept('**/graphql*', (req) => {
        const url = new URL(req.url);
        const query = req.body?.query ?? url.searchParams.get('query') ?? '';
        if (query.includes('STORE_CONFIG_QUERY') && query.includes('allow_guests_to_write_product_reviews')) {
          req.alias = 'recommendationsReviewConfig';
          req.reply(configError ? { errors: [{ message: 'Configuration unavailable' }] } : {
            data: {
              storeConfig: {
                product_reviews_enabled: enabled ? '1' : '0',
                allow_guests_to_write_product_reviews: '1',
              },
            },
          });
        } else if (query.includes('recommendationsByUnitIds')) {
          const variables = req.body?.variables ?? JSON.parse(url.searchParams.get('variables') ?? '{}');
          req.reply({
            data: {
              recommendationsByUnitIds: {
                results: [{
                  unitId: variables.unitIds[0],
                  storefrontLabel: 'Recommended products',
                  totalProducts: 1,
                  productsView: [{
                    __typename: 'SimpleProductView',
                    sku: 'ADB102',
                    name: 'Rated recommendation',
                    urlKey: 'adobe-pattern-hoodie',
                    images: [],
                    price: { final: { amount: { value: 20, currency: 'USD' } } },
                    attributes: [
                      { name: 'ac_rating_summary', value: '90' },
                      { name: 'ac_review_count', value: '7' },
                    ],
                  }],
                }],
                totalResults: 1,
              },
            },
          });
        } else {
          req.continue();
        }
      });

      const page = getPrexPage('displayPlp');
      cy.request(page).then(({ body }) => {
        const doc = new DOMParser().parseFromString(body, 'text/html');
        doc.querySelector('main').innerHTML = `
          <div>
            <div class="product-recommendations">
              <div><div>recId</div><div>ratings-test</div></div>
              <div><div>currentSku</div><div>ADB102</div></div>
            </div>
          </div>
        `;
        cy.intercept('GET', page, {
          body: `<!DOCTYPE html>${doc.documentElement.outerHTML}`,
          headers: { 'content-type': 'text/html' },
        });
        cy.visit(page);
      });

      cy.wait('@recommendationsReviewConfig');
      cy.get('.product-reviews').should('not.exist');
      cy.contains('.product-recommendations', 'Rated recommendation').should('be.visible');
      cy.get('.product-recommendations .dropin-star-rating')
        .should(enabled && !configError ? 'be.visible' : 'not.exist');
    });
  });
});
