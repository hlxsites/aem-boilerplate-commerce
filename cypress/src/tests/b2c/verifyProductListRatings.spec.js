const attribute = (name, value) => ({
  name, label: name, roles: ['visible_in_plp'], value,
});

const product = (sku, attributes) => ({
  productView: {
    __typename: 'SimpleProductView',
    sku,
    name: `Product ${sku}`,
    urlKey: sku.toLowerCase(),
    inStock: true,
    attributes,
    images: [],
    price: {
      final: { amount: { value: 10, currency: 'USD' } },
      regular: { amount: { value: 10, currency: 'USD' } },
    },
  },
});

function visitSearch({ reviewsEnabled }) {
  cy.intercept('**/graphql*', (req) => {
    const url = new URL(req.url);
    const query = req.body?.query ?? url.searchParams.get('query') ?? '';
    if (query.includes('allow_guests_to_write_product_reviews')) {
      req.alias = 'reviewsConfig';
      req.reply({
        data: {
          storeConfig: {
            product_reviews_enabled: reviewsEnabled ? '1' : '0',
            allow_guests_to_write_product_reviews: '1',
          },
        },
      });
    } else if (query.includes('productSearch')) {
      req.alias = 'productSearch';
      req.reply({
        data: {
          productSearch: {
            total_count: 2,
            facets: [],
            page_info: { current_page: 1, page_size: 9, total_pages: 1 },
            items: [
              product('RATED', [
                attribute('ac_rating_summary', '89'),
                attribute('ac_review_count', '7'),
              ]),
              product('UNRATED', []),
            ],
          },
        },
      });
    }
  });
  cy.visit('/search?q=ratings');
  cy.wait(['@reviewsConfig', '@productSearch']);
  cy.contains('.product-list-page', 'Product UNRATED').should('be.visible');
}

describe('Product list ratings', () => {
  it('shows drop-in ratings when product reviews are enabled', () => {
    visitSearch({ reviewsEnabled: true });
    cy.get('.product-list-page [data-slot="ProductRating"]').should('have.length', 1)
      .find('.dropin-star-rating')
      .should('be.visible')
      .and('contain.text', '4.5(7)');
  });

  it('hides ratings when product reviews are disabled', () => {
    visitSearch({ reviewsEnabled: false });
    cy.get('.product-list-page [data-slot="ProductRating"]').should('not.exist');
  });
});
