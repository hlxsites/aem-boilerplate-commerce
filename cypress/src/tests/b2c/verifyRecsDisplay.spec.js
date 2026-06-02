import { assertImageListDisplay } from '../../assertions';
import { getPrexPage, visitPrexPage } from '../../support/recsGraphql';

describe('Verify Product Recommendation dropin display', () => {
  it('loads rec carousel on tenant-specific PLP draft', { tags: ['@skipSaas', '@skipAco'] }, () => {
    visitPrexPage('displayPlp');

    cy.get('.recommendations-product-list__content').scrollIntoView();
    assertImageListDisplay('.recommendations-product-list__content', 3);
    cy.get('.recommendations-carousel__content').scrollTo('right');
    cy.get('[aria-label="Product 4 of 5"]').should('be.visible');
    cy.get('[aria-label="Product 5 of 5"]').should('be.visible');
    cy.get('[aria-label="Product 4 of 5"]').click();

    cy.url().should('include', '/products/');
    cy.get('.product-details').should('be.visible');
  });

  it('loads rec carousel on tenant-specific PDP draft', { tags: ['@skipSaas', '@skipAco'] }, () => {
    visitPrexPage('displayPdp');

    cy.get('.recommendations-product-list__content').scrollIntoView();
    assertImageListDisplay('.recommendations-product-list__content', 3);
  });
});

describe('Verify Product Recommendation dropin display — ACCS PLP', () => {
  it('loads rec carousel on ACCS PLP draft', { tags: ['@skipPaas', '@skipAco'] }, () => {
    cy.visit(getPrexPage('displayPlp'));
    cy.get('.recommendations-product-list__content', { timeout: 60000 })
      .scrollIntoView()
      .should('be.visible');
    assertImageListDisplay('.recommendations-product-list__content', 1);
  });
});

describe('Verify Product Recommendation dropin display — ACO', () => {
  it('loads rec carousel on ACO PLP draft', { tags: ['@skipPaas', '@skipSaas', '@skipAco'] }, () => {
    visitPrexPage('displayPlp');
    assertImageListDisplay('.recommendations-product-list__content', 1);
  });

  it('loads rec carousel on ACO PDP draft', { tags: ['@skipPaas', '@skipSaas', '@skipAco'] }, () => {
    visitPrexPage('displayPdp');
    assertImageListDisplay('.recommendations-product-list__content', 1);
  });
});
