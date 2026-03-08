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

import * as actions from '../../actions/index';
import * as fields from '../../fields/index';

/**
 * @fileoverview B2B Quick Order Variants Grid E2E Tests
 *
 * Tests the Quick Order Variants Grid functionality on product detail pages,
 * covering variant selection, quantity management, and add to cart workflows.
 *
 * ==========================================================================
 * COVERAGE:
 * ==========================================================================
 * - Variants grid rendering and data display for ALL 3 variants
 * - Quantity updates using incrementer and +/- buttons for ALL variants
 * - ARIA labels and accessibility for ALL variants
 * - Clear all quantities functionality for ALL variants
 * - Action buttons state management
 * - Complete workflow (set → clear → set again) for ALL variants
 * - Subtotal calculations with exact values for ALL variants
 * - Add to cart workflow with quantity reset for ALL variants
 * - Images, attributes, and prices display for ALL variants
 *
 * ==========================================================================
 * TEST PRODUCT:
 * ==========================================================================
 * URL: /products/ssg-configurable-product/ssgconfig123
 * Variants: 
 *   - Blue (SSGCONFIG123-blue) - $45.00 - In Stock
 *   - Green (SSGCONFIG123-green) - $60.00 - In Stock
 *   - Red (SSGCONFIG123-red) - $30.00 - In Stock
 *
 * ==========================================================================
 */

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
      cy.visit('/products/ssg-configurable-product/ssgconfig123', {
        failOnStatusCode: false,
        timeout: 30000,
      });

      cy.wait(3000);

      actions.initializeVariantsGrid();

      cy.logToTerminal('✅ Variants grid loaded');
    });

    after(() => {
      cy.logToTerminal(
        '🏁 B2B Quick Order Variants Grid test suite completed'
      );
    });

    it('Should load product page and verify environment', () => {
      cy.logToTerminal(
        '========= 🔍 TEST 0: Diagnostic - Page Load Verification ========='
      );

      cy.url().should('include', '/products/ssg-configurable-product/ssgconfig123');
      cy.logToTerminal(`✅ Current URL: ${cy.url()}`);

      cy.get('body').then(($body) => {
        if ($body.find('.product-details__wrapper').length > 0) {
          cy.logToTerminal('✅ Product details wrapper found');
        } else {
          cy.logToTerminal('❌ Product details wrapper NOT found');
        }

        if ($body.find('.product-details__header').length > 0) {
          cy.get('.product-details__header').invoke('text').then((text) => {
            cy.logToTerminal(`📦 Product name: ${text.trim()}`);
          });
        } else {
          cy.logToTerminal('❌ Product header NOT found');
        }

        if ($body.find('.product-details__grid-ordering').length > 0) {
          cy.get('.product-details__grid-ordering').then(($el) => {
            const width = $el.width();
            const height = $el.height();
            cy.logToTerminal(`📏 Grid container dimensions: ${width}x${height}px`);
            cy.logToTerminal(
              `🔍 Grid container visible: ${$el.is(':visible')}`
            );
            cy.logToTerminal(
              `🔍 Grid container HTML: ${$el.html().substring(0, 200)}`
            );
          });
        } else {
          cy.logToTerminal('❌ Grid ordering container NOT found');
        }

        if ($body.find('.product-details__options').length > 0) {
          cy.logToTerminal('ℹ️ Product has options (regular configurable view)');
        }
      });

      cy.document().then((doc) => {
        const errors = doc.querySelectorAll('[class*="error"], [class*="alert"]');
        if (errors.length > 0) {
          cy.logToTerminal(`⚠️ Found ${errors.length} error/alert elements`);
        }
      });

      cy.logToTerminal('✅ TEST 0 COMPLETED: Diagnostic info collected');
    });

    it('Should render grid and display variant data correctly', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 1: Grid Rendering and Data Display ========='
      );

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
        .should('contain.text', 'blue')
        .and('contain.text', 'In Stock')
        .and('contain.text', 'SSGCONFIG123-blue');

      cy.get(fields.variantsGridTableRow)
        .eq(1)
        .should('contain.text', 'green')
        .and('contain.text', 'In Stock')
        .and('contain.text', 'SSGCONFIG123-green');

      cy.get(fields.variantsGridTableRow)
        .eq(2)
        .should('contain.text', 'red')
        .and('contain.text', 'In Stock')
        .and('contain.text', 'SSGCONFIG123-red');

      cy.logToTerminal('✅ TEST 1 PASSED: Grid rendered correctly');
    });

    it('Should update quantity using incrementer and +/- buttons', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 2: Quantity Update Functionality ========='
      );

      cy.logToTerminal('📝 Setting quantity to 5 for blue variant...');
      actions.updateVariantQuantity(0, 5);
      cy.wait(500);
      actions.verifyVariantRow(0, { quantity: 5 });

      cy.logToTerminal('📝 Setting quantity to 3 for green variant...');
      actions.updateVariantQuantity(1, 3);
      cy.wait(500);
      actions.verifyVariantRow(1, { quantity: 3 });

      cy.logToTerminal('📝 Setting quantity to 2 for red variant...');
      actions.updateVariantQuantity(2, 2);
      cy.wait(500);
      actions.verifyVariantRow(2, { quantity: 2 });

      cy.logToTerminal('➕ Incrementing blue variant quantity...');
      actions.incrementVariantQuantity(0);
      cy.wait(500);
      actions.verifyVariantRow(0, { quantity: 6 });

      cy.logToTerminal('➖ Decrementing green variant quantity...');
      actions.decrementVariantQuantity(1);
      cy.wait(500);
      actions.verifyVariantRow(1, { quantity: 2 });

      cy.logToTerminal('✅ TEST 2 PASSED: Quantity updates work for all variants');
    });

    it('Should have proper ARIA labels for accessibility', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 3: ARIA Labels and Accessibility ========='
      );

      cy.logToTerminal('♿ Verifying ARIA labels...');
      cy.get(fields.variantsGridQuantityInput(0))
        .should('have.attr', 'aria-label')
        .and('include', 'Quantity for SSGCONFIG123-blue');

      cy.get(fields.variantsGridQuantityInput(1))
        .should('have.attr', 'aria-label')
        .and('include', 'Quantity for SSGCONFIG123-green');

      cy.get(fields.variantsGridQuantityInput(2))
        .should('have.attr', 'aria-label')
        .and('include', 'Quantity for SSGCONFIG123-red');

      cy.logToTerminal(
        '✅ TEST 3 PASSED: ARIA labels are correct'
      );
    });

    it('Should clear all quantities when Clear button is clicked', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 4: Clear All Functionality ========='
      );

      cy.logToTerminal('📝 Setting quantities for all variants...');
      actions.updateVariantQuantity(0, 5);
      actions.updateVariantQuantity(1, 3);
      actions.updateVariantQuantity(2, 7);
      cy.wait(1500);

      cy.get(fields.variantsGridQuantityInput(0)).should('have.value', '5');
      cy.get(fields.variantsGridQuantityInput(1)).should('have.value', '3');
      cy.get(fields.variantsGridQuantityInput(2)).should('have.value', '7');

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
            `Blue variant should be cleared but got: "${value}"`
          ).to.be.true;
        }
      );

      cy.get(fields.variantsGridQuantityInput(1)).should(($input) => {
        const value = $input.val();
        const isCleared =
          value === '0' || value === '' || value === 0 || !value;
        expect(isCleared, `Green variant should be cleared but got: "${value}"`)
          .to.be.true;
      });

      cy.get(fields.variantsGridQuantityInput(2)).should(($input) => {
        const value = $input.val();
        const isCleared =
          value === '0' || value === '' || value === 0 || !value;
        expect(isCleared, `Red variant should be cleared but got: "${value}"`)
          .to.be.true;
      });

      cy.logToTerminal('✅ TEST 4 PASSED: Clear all works for all variants');
    });

    it('Should toggle action buttons state based on quantities', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 5: Action Buttons State Management ========='
      );

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

      cy.logToTerminal('📝 Setting initial quantities for all variants...');
      actions.updateVariantQuantity(0, 5);
      actions.updateVariantQuantity(1, 3);
      actions.updateVariantQuantity(2, 4);
      cy.wait(1500);

      actions.verifyVariantRow(0, { quantity: 5 });
      actions.verifyVariantRow(1, { quantity: 3 });
      actions.verifyVariantRow(2, { quantity: 4 });

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

      cy.logToTerminal('✅ TEST 6 PASSED: Complete workflow works for all variants');
    });

    it('Should display variant images, attributes, and prices', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 7: Images, Attributes, and Prices Display ========='
      );

      cy.logToTerminal('🖼️ Verifying all variant images are displayed...');
      cy.get(fields.variantsGridImage).should('have.length', 3);
      cy.get(fields.variantsGridImage).eq(0).should('have.attr', 'src').and('include', 'adb402');
      cy.get(fields.variantsGridImage).eq(1).should('have.attr', 'src').and('include', 'adb412');
      cy.get(fields.variantsGridImage).eq(2).should('have.attr', 'src').and('include', 'adb187');

      cy.logToTerminal('🏷️ Verifying blue variant attributes...');
      cy.get(fields.variantsGridTableRow)
        .eq(0)
        .should('contain.text', 'Color')
        .and('contain.text', 'blue')
        .and('contain.text', 'SSGCONFIG123-blue');

      cy.logToTerminal('🏷️ Verifying green variant attributes...');
      cy.get(fields.variantsGridTableRow)
        .eq(1)
        .should('contain.text', 'Color')
        .and('contain.text', 'green')
        .and('contain.text', 'SSGCONFIG123-green');

      cy.logToTerminal('🏷️ Verifying red variant attributes...');
      cy.get(fields.variantsGridTableRow)
        .eq(2)
        .should('contain.text', 'Color')
        .and('contain.text', 'red')
        .and('contain.text', 'SSGCONFIG123-red');

      cy.logToTerminal('💰 Verifying all variant prices are displayed...');
      cy.get(fields.variantsGridTableRow).eq(0).should('contain.text', '$45.00');
      cy.get(fields.variantsGridTableRow).eq(1).should('contain.text', '$60.00');
      cy.get(fields.variantsGridTableRow).eq(2).should('contain.text', '$30.00');

      cy.logToTerminal(
        '✅ TEST 7 PASSED: All variants display images, attributes, and prices correctly'
      );
    });

    it('Should calculate and display subtotals correctly', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 8: Subtotal Calculations ========='
      );

      cy.logToTerminal('📝 Setting quantity to 2 for blue variant ($45 × 2 = $90)...');
      actions.updateVariantQuantity(0, 2);
      cy.wait(500);

      cy.logToTerminal('💵 Verifying subtotal for blue variant...');
      cy.get(fields.variantsGridTableRow).eq(0).should('contain.text', '$90.00');

      cy.logToTerminal('📝 Setting quantity to 3 for green variant ($60 × 3 = $180)...');
      actions.updateVariantQuantity(1, 3);
      cy.wait(500);

      cy.logToTerminal('💵 Verifying subtotal for green variant...');
      cy.get(fields.variantsGridTableRow).eq(1).should('contain.text', '$180.00');

      cy.logToTerminal('📝 Setting quantity to 4 for red variant ($30 × 4 = $120)...');
      actions.updateVariantQuantity(2, 4);
      cy.wait(500);

      cy.logToTerminal('💵 Verifying subtotal for red variant...');
      cy.get(fields.variantsGridTableRow).eq(2).should('contain.text', '$120.00');

      cy.logToTerminal('✅ TEST 8 PASSED: Subtotals calculated correctly for all variants');
    });

    it('Should reset quantities after adding to cart', () => {
      cy.logToTerminal(
        '========= 🚀 TEST 9: Add to Cart Workflow with Reset ========='
      );

      cy.logToTerminal('📝 Setting quantities for all variants...');
      actions.updateVariantQuantity(0, 2);
      actions.updateVariantQuantity(1, 3);
      actions.updateVariantQuantity(2, 1);
      cy.wait(2000);

      cy.logToTerminal('✅ Verifying all quantities are set...');
      cy.get(fields.variantsGridQuantityInput(0)).should('have.value', '2');
      cy.get(fields.variantsGridQuantityInput(1)).should('have.value', '3');
      cy.get(fields.variantsGridQuantityInput(2)).should('have.value', '1');

      cy.logToTerminal('🛒 Clicking Add to Cart button...');
      
      cy.get(fields.productDetailsAddToCartButton, { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .and('not.be.disabled')
        .click({ force: true });

      cy.wait(3000);

      cy.logToTerminal('✅ Verifying all quantities are reset to 0...');
      cy.get(fields.variantsGridQuantityInput(0), { timeout: 5000 }).should(
        ($input) => {
          const value = $input.val();
          const isCleared =
            value === '0' || value === '' || value === 0 || !value;
          expect(
            isCleared,
            `Blue variant should be reset but got: "${value}"`
          ).to.be.true;
        }
      );

      cy.get(fields.variantsGridQuantityInput(1)).should(($input) => {
        const value = $input.val();
        const isCleared =
          value === '0' || value === '' || value === 0 || !value;
        expect(isCleared, `Green variant should be reset but got: "${value}"`)
          .to.be.true;
      });

      cy.get(fields.variantsGridQuantityInput(2)).should(($input) => {
        const value = $input.val();
        const isCleared =
          value === '0' || value === '' || value === 0 || !value;
        expect(isCleared, `Red variant should be reset but got: "${value}"`)
          .to.be.true;
      });

      cy.logToTerminal(
        '✅ TEST 9 PASSED: Add to cart workflow resets all variants'
      );
    });
  }
);
