import { assertImageListDisplay } from '../../assertions';
import { visitPrexPage, waitForRecsCarousel } from '../../support/recsGraphql';

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
