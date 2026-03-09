/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */

import * as actions from '../../actions';
import * as fields from '../../fields';

/**
 * @fileoverview B2B Quick Order Variants Grid E2E Tests
 *
 * Tests the Quick Order Variants Grid functionality on product detail pages,
 * covering variant selection, quantity management, and add to cart workflows.
 *
 * ==========================================================================
 * COVERAGE:
 * ==========================================================================
 * - Variants grid rendering and data display
 * - Quantity updates using incrementer and +/- buttons
 * - ARIA labels and accessibility
 * - Clear all quantities functionality
 * - Action buttons state management
 * - Complete workflow (set → clear → set again)
 * - Subtotal calculations
 * - Add to cart workflow with quantity reset
 * - Images, attributes, and prices display
 *
 * ==========================================================================
 * TEST CONFIGURATION:
 * ==========================================================================
 * See constants below for all hardcoded test dependencies:
 * - Product URL, SKUs, expected values, etc.
 * - All configuration is centralized for easy maintenance
 *
 * ==========================================================================
 */

// ==========================================================================
// TEST CONFIGURATION CONSTANTS
// ==========================================================================
const TEST_PRODUCT_URL = '/products/cypress-configurable-product-latest/cypress456';
const VARIANT_SKUS = [
  'CYPRESS456-1-2-3-red',  // Row 0 in HTML
  'CYPRESS456-blue',       // Row 1 in HTML
  'CYPRESS456-green',      // Row 2 in HTML
];
const EXPECTED_STOCK_STATUS = 'In Stock';
const EXPECTED_CURRENCY_SYMBOL = '$';
const EXPECTED_ZERO_SUBTOTAL = '$0.00';
const ARIA_LABEL_PREFIX = 'Quantity for';

describe(
  'B2B Quick Order Variants Grid - E2E Tests',
  { tags: '@B2BSaas' },
  () => {
    before(() => {
      cy.logToTerminal(
        '🛒 B2B Quick Order Variants Grid test suite started'
      );
    });

    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();

      cy.logToTerminal(
        '📦 Navigating to product page with variants grid...'
      );
      cy.visit(TEST_PRODUCT_URL, {
        failOnStatusCode: false,
        timeout: 30000,
      });

      cy.wait(3000);
    });

    after(() => {
      cy.logToTerminal(
        '🏁 B2B Quick Order Variants Grid test suite completed'
      );
    });

    it('Should render grid and display variant data correctly', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 1: Grid Rendering and Data Display ========='
      );

      actions.initializeVariantsGrid();
      cy.logToTerminal('✅ Variants grid loaded');

      cy.get(fields.variantsGridMainContainer).should('be.visible');
      cy.get(fields.variantsGridContainer).should('exist');

      cy.get(fields.variantsGridTable).should('exist').and('be.visible');
      cy.get(fields.variantsGridTableRow).should(
        'have.length.greaterThan',
        0
      );

      cy.logToTerminal('✅ Verifying variant rows...');
      
      cy.get(fields.variantsGridTableRow)
        .eq(0)
        .should('contain.text', EXPECTED_STOCK_STATUS)
        .and('contain.text', VARIANT_SKUS[0]);

      cy.get(fields.variantsGridTableRow)
        .eq(1)
        .should('contain.text', EXPECTED_STOCK_STATUS)
        .and('contain.text', VARIANT_SKUS[1]);

      cy.get(fields.variantsGridTableRow)
        .eq(2)
        .should('contain.text', EXPECTED_STOCK_STATUS)
        .and('contain.text', VARIANT_SKUS[2]);

      cy.logToTerminal('✅ TEST 1 PASSED: Grid rendered correctly');
    });

    it('Should update quantity using incrementer and +/- buttons', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 2: Quantity Update Functionality ========='
      );

      actions.initializeVariantsGrid();
      cy.logToTerminal('✅ Variants grid loaded');

      cy.logToTerminal('📝 Setting quantity to 5 for first variant...');
      actions.updateVariantQuantity(0, 5);
      cy.wait(500);
      actions.verifyVariantRow(0, { quantity: 5 });

      cy.logToTerminal('📝 Setting quantity to 3 for second variant...');
      actions.updateVariantQuantity(1, 3);
      cy.wait(500);
      actions.verifyVariantRow(1, { quantity: 3 });

      cy.logToTerminal('📝 Setting quantity to 2 for third variant...');
      actions.updateVariantQuantity(2, 2);
      cy.wait(500);
      actions.verifyVariantRow(2, { quantity: 2 });

      cy.logToTerminal('➕ Incrementing first variant quantity...');
      actions.incrementVariantQuantity(0);
      cy.wait(500);
      actions.verifyVariantRow(0, { quantity: 6 });

      cy.logToTerminal('➖ Decrementing second variant quantity...');
      actions.decrementVariantQuantity(1);
      cy.wait(500);
      actions.verifyVariantRow(1, { quantity: 2 });

      cy.logToTerminal('✅ TEST 2 PASSED: Quantity updates work for all variants');
    });

    it('Should have proper ARIA labels for accessibility', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 3: ARIA Labels and Accessibility ========='
      );

      actions.initializeVariantsGrid();
      cy.logToTerminal('✅ Variants grid loaded');

      cy.logToTerminal('♿ Verifying ARIA labels...');
      cy.get(fields.variantsGridQuantityInput(0))
        .should('have.attr', 'aria-label')
        .and('include', ARIA_LABEL_PREFIX)
        .and('include', VARIANT_SKUS[0]);

      cy.get(fields.variantsGridQuantityInput(1))
        .should('have.attr', 'aria-label')
        .and('include', ARIA_LABEL_PREFIX)
        .and('include', VARIANT_SKUS[1]);

      cy.get(fields.variantsGridQuantityInput(2))
        .should('have.attr', 'aria-label')
        .and('include', ARIA_LABEL_PREFIX)
        .and('include', VARIANT_SKUS[2]);

      cy.logToTerminal(
        '✅ TEST 3 PASSED: ARIA labels are correct'
      );
    });

    it('Should clear all quantities when Clear button is clicked', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 4: Clear All Functionality ========='
      );
      actions.initializeVariantsGrid();
      cy.logToTerminal('✅ Variants grid loaded');
      cy.logToTerminal('📝 Setting quantities for all variants...');
      actions.updateVariantQuantity(0, 5);
      actions.updateVariantQuantity(1, 3);
      actions.updateVariantQuantity(2, 7);
      cy.wait(1500);

      cy.get(fields.variantsGridQuantityInput(0)).should('have.value', '5');
      cy.get(fields.variantsGridQuantityInput(1)).should('have.value', '3');
      cy.get(fields.variantsGridQuantityInput(2)).should('have.value', '7');

      cy.logToTerminal('✅ Verifying Add to Cart button displays total quantity (5+3+7=15)...');
      cy.get(fields.productDetailsAddToCartButton, { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .and('contain.text', 'Add to Cart (15)');

      cy.logToTerminal('🗑️ Clicking Clear button...');
      actions.clickClearAllButton();

      cy.logToTerminal('✅ Verifying all quantities are cleared...');
      cy.get(fields.variantsGridQuantityInput(0), { timeout: 5000 }).should(
        ($input) => {
          const value = $input.val();
          const isCleared =
            value === '0' || value === '' || value === 0 || !value;
          expect(
            isCleared,
            `First variant (${VARIANT_SKUS[0]}) should be cleared but got: "${value}"`
          ).to.be.true;
        }
      );

      cy.get(fields.variantsGridQuantityInput(1)).should(($input) => {
        const value = $input.val();
        const isCleared =
          value === '0' || value === '' || value === 0 || !value;
        expect(isCleared, `Second variant (${VARIANT_SKUS[1]}) should be cleared but got: "${value}"`)
          .to.be.true;
      });

      cy.get(fields.variantsGridQuantityInput(2)).should(($input) => {
        const value = $input.val();
        const isCleared =
          value === '0' || value === '' || value === 0 || !value;
        expect(isCleared, `Third variant (${VARIANT_SKUS[2]}) should be cleared but got: "${value}"`)
          .to.be.true;
      });

      cy.logToTerminal('✅ TEST 4 PASSED: Clear all works for all variants');
    });

    it('Should toggle action buttons state based on quantities', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 5: Action Buttons State Management ========='
      );

      actions.initializeVariantsGrid();
      cy.logToTerminal('✅ Variants grid loaded');

      cy.logToTerminal('🔒 Verifying buttons are disabled initially...');
      cy.get(fields.variantsGridActionsButtons)
        .contains('button', 'Clear')
        .should('be.disabled');
      cy.get(fields.variantsGridActionsButtons)
        .contains('button', 'Save to CSV')
        .should('be.disabled');

      cy.logToTerminal('📝 Setting quantity...');
      actions.updateVariantQuantity(0, 2);
      cy.wait(1500);

      cy.logToTerminal('🔓 Verifying buttons are enabled...');
      cy.get(fields.variantsGridActionsButtons)
        .contains('button', 'Clear')
        .should('not.be.disabled');
      cy.get(fields.variantsGridActionsButtons)
        .contains('button', 'Save to CSV')
        .should('not.be.disabled');

      cy.logToTerminal(
        '✅ TEST 5 PASSED: Action buttons state management works'
      );
    });

    it('Complete workflow: Set quantities → Clear → Set again', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 6: Complete Workflow ========='
      );

      actions.initializeVariantsGrid();
      cy.logToTerminal('✅ Variants grid loaded');

      cy.logToTerminal('📝 Setting initial quantities for all variants...');
      actions.updateVariantQuantity(0, 5);
      actions.updateVariantQuantity(1, 3);
      actions.updateVariantQuantity(2, 4);
      cy.wait(1500);

      actions.verifyVariantRow(0, { quantity: 5 });
      actions.verifyVariantRow(1, { quantity: 3 });
      actions.verifyVariantRow(2, { quantity: 4 });

      cy.logToTerminal('✅ Verifying Add to Cart button displays total quantity (5+3+4=12)...');
      cy.get(fields.productDetailsAddToCartButton, { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .and('contain.text', 'Add to Cart (12)');

      cy.logToTerminal('🗑️ Clearing all quantities...');
      actions.clickClearAllButton();

      actions.verifyVariantRow(0, { quantity: 0 });
      actions.verifyVariantRow(1, { quantity: 0 });
      actions.verifyVariantRow(2, { quantity: 0 });

      cy.logToTerminal('📝 Setting new quantities for all variants...');
      actions.updateVariantQuantity(0, 10);
      actions.updateVariantQuantity(1, 8);
      actions.updateVariantQuantity(2, 6);
      cy.wait(500);

      actions.verifyVariantRow(0, { quantity: 10 });
      actions.verifyVariantRow(1, { quantity: 8 });
      actions.verifyVariantRow(2, { quantity: 6 });

      cy.logToTerminal('✅ Verifying Add to Cart button displays updated total quantity (10+8+6=24)...');
      cy.get(fields.productDetailsAddToCartButton, { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .and('contain.text', 'Add to Cart (24)');

      cy.logToTerminal('✅ TEST 6 PASSED: Complete workflow works for all variants');
    });

    it('Should display variant images, attributes, and prices', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 7: Images, Attributes, and Prices Display ========='
      );
      actions.initializeVariantsGrid();
      cy.logToTerminal('✅ Variants grid loaded');
      cy.logToTerminal('🖼️ Verifying all variant images are displayed...');
      cy.get(fields.variantsGridImage).should('have.length.greaterThan', 0);
      cy.get(fields.variantsGridImage).eq(0).should('have.attr', 'src').and('not.be.empty');

      cy.logToTerminal('🏷️ Verifying variant attributes and SKUs...');
      cy.get(fields.variantsGridTableRow)
        .eq(0)
        .should('contain.text', VARIANT_SKUS[0]);

      cy.get(fields.variantsGridTableRow)
        .eq(1)
        .should('contain.text', VARIANT_SKUS[1]);

      cy.get(fields.variantsGridTableRow)
        .eq(2)
        .should('contain.text', VARIANT_SKUS[2]);

      cy.logToTerminal('💰 Verifying all variant prices are displayed...');
      cy.get(fields.variantsGridTableRow).eq(0).should('contain.text', EXPECTED_CURRENCY_SYMBOL);
      cy.get(fields.variantsGridTableRow).eq(1).should('contain.text', EXPECTED_CURRENCY_SYMBOL);
      cy.get(fields.variantsGridTableRow).eq(2).should('contain.text', EXPECTED_CURRENCY_SYMBOL);

      cy.logToTerminal(
        '✅ TEST 7 PASSED: All variants display images, attributes, and prices correctly'
      );
    });

    it('Should calculate and display subtotals correctly', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 8: Subtotal Calculations ========='
      );

      actions.initializeVariantsGrid();
      cy.logToTerminal('✅ Variants grid loaded');

      cy.logToTerminal('📝 Setting quantity to 2 for first variant...');
      actions.updateVariantQuantity(0, 2);
      cy.wait(500);

      cy.logToTerminal('💵 Verifying subtotal is calculated for first variant...');
      cy.get(fields.variantsGridTableRow).eq(0).should('contain.text', EXPECTED_CURRENCY_SYMBOL).and('not.contain.text', EXPECTED_ZERO_SUBTOTAL);

      cy.logToTerminal('📝 Setting quantity to 3 for second variant...');
      actions.updateVariantQuantity(1, 3);
      cy.wait(500);

      cy.logToTerminal('💵 Verifying subtotal is calculated for second variant...');
      cy.get(fields.variantsGridTableRow).eq(1).should('contain.text', EXPECTED_CURRENCY_SYMBOL).and('not.contain.text', EXPECTED_ZERO_SUBTOTAL);

      cy.logToTerminal('📝 Setting quantity to 4 for third variant...');
      actions.updateVariantQuantity(2, 4);
      cy.wait(500);

      cy.logToTerminal('💵 Verifying subtotal is calculated for third variant...');
      cy.get(fields.variantsGridTableRow).eq(2).should('contain.text', EXPECTED_CURRENCY_SYMBOL).and('not.contain.text', EXPECTED_ZERO_SUBTOTAL);

      cy.logToTerminal('✅ Verifying Add to Cart button displays total quantity (2+3+4=9)...');
      cy.get(fields.productDetailsAddToCartButton, { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .and('contain.text', 'Add to Cart (9)');

      cy.logToTerminal('✅ TEST 8 PASSED: Subtotals calculated correctly for all variants');
    });

    it('Should reset quantities after adding to cart', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 9: Add to Cart Workflow with Reset ========='
      );
      actions.initializeVariantsGrid();
      cy.logToTerminal('✅ Variants grid loaded');

      // Set up GraphQL intercept for Add to Cart mutation
      const apiMethod = 'ADD_PRODUCTS_TO_CART_MUTATION';
      const graphqlEndPoint = Cypress.env('graphqlEndPoint');
      
      cy.intercept('POST', graphqlEndPoint, (req) => {
        const query = req.body.query;
        if (query && typeof query === 'string' && query.includes(apiMethod)) {
          req.alias = 'addProductToCart';
        }
      });

      cy.logToTerminal('📝 Setting quantities for all variants...');
      actions.updateVariantQuantity(0, 2);
      actions.updateVariantQuantity(1, 3);
      actions.updateVariantQuantity(2, 1);
      cy.wait(2000);

      cy.logToTerminal('✅ Verifying all quantities are set...');
      cy.get(fields.variantsGridQuantityInput(0)).should('have.value', '2');
      cy.get(fields.variantsGridQuantityInput(1)).should('have.value', '3');
      cy.get(fields.variantsGridQuantityInput(2)).should('have.value', '1');

      cy.logToTerminal('✅ Verifying Add to Cart button displays total quantity (2+3+1=6)...');
      cy.get(fields.productDetailsAddToCartButton, { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .and('contain.text', 'Add to Cart (6)');

      cy.logToTerminal('🛒 Clicking Add to Cart button...');
      
      cy.get(fields.productDetailsAddToCartButton)
        .should('not.be.disabled')
        .click({ force: true });

      cy.logToTerminal('⏳ Waiting for Add to Cart API call to complete...');
      cy.wait('@addProductToCart', { timeout: 15000 }).then((interception) => {
        cy.logToTerminal('✅ Add to Cart API call completed successfully');
        expect(interception.response.statusCode).to.equal(200);
      });

      cy.logToTerminal('🛒 Verifying cart button shows added items (2+3+1=6)...');
      cy.get(fields.miniCartButton, { timeout: 10000 })
        .should('be.visible')
        .and('have.attr', 'data-count')
        .then((count) => {
          const itemCount = parseInt(count, 10);
          expect(itemCount).to.be.at.least(6);
          cy.logToTerminal(`✅ Cart contains ${itemCount} total items (expected at least 6)`);
        });

      cy.logToTerminal('🛒 Opening mini cart...');
      cy.get(fields.miniCartButton).click({ force: true });

      cy.logToTerminal('✅ Verifying mini cart is open and displays items...');
      cy.get(fields.miniCartContainer, { timeout: 10000 }).should('be.visible');
      cy.get(fields.miniCartHeading)
        .should('be.visible')
        .and('contain.text', 'Shopping Cart');

      cy.logToTerminal('✅ Verifying CYPRESS456 variants were added with correct quantities...');
      cy.get(fields.miniCartItems).should('have.length.greaterThan', 0);

      // Verify we have CYPRESS456 products with quantities 2, 3, and 1
      let cypress456Items = [];
      cy.get(fields.miniCartItems).each(($item) => {
        cy.wrap($item).find(fields.miniCartItemSku).invoke('text').then((sku) => {
          if (sku.includes('CYPRESS456')) {
            cy.wrap($item).find(fields.miniCartQuantity).invoke('text').then((qtyText) => {
              const qty = parseInt(qtyText.trim(), 10);
              cypress456Items.push({ sku: sku.trim(), quantity: qty });
            });
          }
        });
      }).then(() => {
        cy.logToTerminal(`✅ Found CYPRESS456 items: ${cypress456Items.map(i => `${i.sku}(${i.quantity})`).join(', ')}`);
        
        const quantities = cypress456Items.map(i => i.quantity).sort();
        expect(quantities, 'Should have 3 CYPRESS456 variants').to.have.lengthOf(3);
        expect(quantities, 'Quantities should be [1, 2, 3]').to.deep.equal([1, 2, 3]);
        
        const totalQty = quantities.reduce((sum, q) => sum + q, 0);
        expect(totalQty, 'Total CYPRESS456 items should be 6').to.equal(6);
      });

      cy.logToTerminal('✅ Clicking Checkout button to close mini cart...');
      cy.get(fields.miniCartCheckoutButton, { timeout: 5000 })
        .should('be.visible')
        .click({ force: true });
      
      cy.logToTerminal('⬅️ Navigating back to product page...');
      cy.visit(TEST_PRODUCT_URL);
      cy.wait(2000);

      cy.logToTerminal('✅ Verifying all quantities are reset to 0...');
      cy.get(fields.variantsGridQuantityInput(0), { timeout: 5000 }).should(
        ($input) => {
          const value = $input.val();
          const isCleared =
            value === '0' || value === '' || value === 0 || !value;
          expect(
            isCleared,
            `First variant (${VARIANT_SKUS[0]}) should be reset but got: "${value}"`
          ).to.be.true;
        }
      );

      cy.get(fields.variantsGridQuantityInput(1)).should(($input) => {
        const value = $input.val();
        const isCleared =
          value === '0' || value === '' || value === 0 || !value;
        expect(isCleared, `Second variant (${VARIANT_SKUS[1]}) should be reset but got: "${value}"`)
          .to.be.true;
      });

      cy.get(fields.variantsGridQuantityInput(2)).should(($input) => {
        const value = $input.val();
        const isCleared =
          value === '0' || value === '' || value === 0 || !value;
        expect(isCleared, `Third variant (${VARIANT_SKUS[2]}) should be reset but got: "${value}"`)
          .to.be.true;
      });

      cy.logToTerminal(
        '✅ TEST 9 PASSED: Add to cart workflow resets all variants'
      );
    });
  }
);
