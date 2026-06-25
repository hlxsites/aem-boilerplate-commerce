import './hideFetchAndXhrLogs';
import './deleteCustomer';
import './getUserTokenCookie';
import './waitForResource';
import './sessionStorage';
import './getIFrameField';
import './waitForImages';
import './interceptConfig';
import './waitForWishlistPage';
import '@percy/cypress';
import './percyTakeSnapshot';
import './waitForLoadingSkeletonToDisappear';
import './deleteNegotiableQuotes';
import './logToTerminal';
import './waitForUserInGrid';
import './b2bSetupCompany';
import './b2bLoginHelpers';

import registerCypressGrep from '@cypress/grep'
registerCypressGrep();

/**
 * Selects a product option value supporting both <select> dropdowns (PaaS)
 * and text swatch buttons (ACO). Works as a standalone or chained command.
 *
 * @example
 * cy.selectProductOption('color', 'red')
 * cy.get('form[data-sku="SKU"]').selectProductOption('color', 'red')
 */
Cypress.Commands.add('selectProductOption', { prevSubject: 'optional' }, (subject, name, value) => {
  const ctx = subject ? cy.wrap(subject) : cy.get('body');
  ctx.then(($el) => {
    if ($el.find(`select[name="${name}"]`).length) {
      cy.wrap($el).find(`select[name="${name}"]`).select(value);
    } else {
      cy.wrap($el).find(`#swatch-item-${name} .pdp-swatches__options`).contains(value).click();
    }
  });
});

/**
 * Asserts the currently selected product option value supporting both
 * <select> dropdowns (PaaS) and text swatch labels (ACO).
 *
 * @example
 * cy.assertSelectedProductOption('color', 'green')
 * cy.get('.modal-content').assertSelectedProductOption('color', 'green')
 */
Cypress.Commands.add('assertSelectedProductOption', { prevSubject: 'optional' }, (subject, name, value) => {
  const ctx = subject ? cy.wrap(subject) : cy.get('body');
  ctx.then(($el) => {
    if ($el.find(`select[name="${name}"]`).length) {
      cy.wrap($el).find(`select[name="${name}"] option:selected`).should('have.text', value);
    } else {
      cy.wrap($el).find(`#swatch-item-${name} .pdp-swatches__field__label`).should('contain', value);
    }
  });
});
