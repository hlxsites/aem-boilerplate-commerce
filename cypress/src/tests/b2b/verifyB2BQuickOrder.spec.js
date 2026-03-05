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
import {
  quickOrderItemsContainer,
  quickOrderMultipleSkuContainer,
  quickOrderCsvUploadContainer,
  quickOrderMultipleSkuTextarea,
  quickOrderCsvFileInput,
  quickOrderCsvErrorMessage,
  quickOrderItemCard,
  quickOrderItemQuantityInput,
  quickOrderItemRemoveButton,
  quickOrderProductOptionsSlot,
  quickOrderSearchInput,
  quickOrderSearchResults,
  quickOrderSearchResultItem,
  quickOrderAddAllToCartButton,
} from "../../fields/index.js";
/**
 * @fileoverview B2B Quick Order E2E Journey Tests.
 *
 * Tests the Quick Order functionality through realistic user workflows,
 * covering the main features and use cases.
 *
 * ==========================================================================
 * COVERAGE APPROACH:
 * ==========================================================================
 * This test suite covers approximately 50-60% of the full Quick Order functionality,
 * focusing on the most critical user journeys:
 * - Component initialization and rendering
 * - Multiple SKU input workflow
 * - CSV upload workflow
 * - Product search and selection
 * - Configurable products with options
 * - Mixed input methods (comprehensive workflow)
 *
 * ==========================================================================
 * TEST JOURNEYS:
 * ==========================================================================
 * JOURNEY 1: Basic functionality and multiple SKU workflow
 * JOURNEY 2: CSV upload and validation
 * JOURNEY 3: Search and configurable products
 * JOURNEY 4: Complete mixed workflow
 *
 * ==========================================================================
 */

describe("B2B Quick Order - Core Functionality", { tags: "@B2BSaas" }, () => {
  const testProducts = {
    simple1: { sku: "ADB127", name: "Adobe pattern hoodie" },
    simple2: { sku: "ADB336", name: "Llama plush" },
    simple3: { sku: "ADB174", name: "Recycled performance hat" },
    configurable: { sku: "CYPRESS456", name: "Configurable product" },
  };

  before(() => {
    cy.logToTerminal("🛒 B2B Quick Order test suite started");
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("/quick-order", {
      failOnStatusCode: false,
      timeout: 30000,
    });

    cy.wait(2000);

    cy.get(quickOrderItemsContainer, { timeout: 10000 }).should("be.visible");
    cy.get(quickOrderMultipleSkuContainer, { timeout: 10000 }).should(
      "be.visible",
    );
    cy.get(quickOrderCsvUploadContainer, { timeout: 10000 }).should(
      "be.visible",
    );
  });

  after(() => {
    cy.logToTerminal("🏁 B2B Quick Order test suite completed");
  });

  it("JOURNEY 1: Component rendering and Multiple SKU workflow", () => {
    cy.logToTerminal(
      "========= 🚀 JOURNEY 1: Basic Multiple SKU Workflow =========",
    );

    // ========== STEP 1: Verify all components render ==========

    cy.get(quickOrderItemsContainer)
      .should("be.visible")
      .within(() => {
        cy.get('[data-testid="quick-order-items"]').should("exist");
      });

    cy.get(quickOrderMultipleSkuContainer)
      .should("be.visible")
      .within(() => {
        cy.get(".b2b-quick-order-quick-order-multiple-sku").should("exist");
        cy.get(quickOrderMultipleSkuTextarea).should("exist").and("be.visible");
      });

    cy.get(quickOrderCsvUploadContainer)
      .should("be.visible")
      .within(() => {
        cy.get(".b2b-quick-order-quick-order-upload-csv").should("exist");
        cy.get(quickOrderCsvFileInput).should("exist");
      });

    // ========== STEP 2: Add items via Multiple SKU ==========

    const skuText = `${testProducts.simple1.sku} ${testProducts.simple2.sku}`;

    cy.get(quickOrderMultipleSkuContainer).within(() => {
      cy.get(quickOrderMultipleSkuTextarea).clear().type(skuText);
      cy.contains("button", "Add to List").click();
    });

    cy.wait(2000);

    // ========== STEP 3: Verify items in list ==========

    cy.get(quickOrderItemsContainer).within(() => {
      cy.get(quickOrderItemCard).should("have.length", 2);
    });

    // ========== STEP 4: Update quantity ==========

    cy.get(quickOrderItemsContainer).within(() => {
      cy.get(quickOrderItemCard)
        .first()
        .find(quickOrderItemQuantityInput)
        .clear({ force: true })
        .type("5", { force: true });
    });
    cy.wait(500);

    // ========== STEP 5: Add to cart ==========

    cy.get(quickOrderItemsContainer).within(() => {
      cy.get(quickOrderAddAllToCartButton).should("not.be.disabled").click();
    });
    cy.wait(2000);

    // ========== STEP 6: Verify redirect to cart ==========

    cy.url().should("include", "/cart");

    // Return to quick order page for next test
    cy.visit("/quick-order");
    cy.wait(2000);

    cy.logToTerminal(
      "✅ JOURNEY 1: Complete - Items added to cart successfully",
    );
  });

  it("JOURNEY 2: CSV upload workflow and validation", () => {
    cy.logToTerminal("========= 🚀 JOURNEY 2: CSV Upload Workflow =========");

    // Check initial state - should be empty
    cy.get(quickOrderItemsContainer).within(() => {
      cy.get('[data-testid="empty-items"]').should("exist");
    });

    // ========== STEP 1: Test invalid file format ==========

    const txtFileName = "invalid-file-quickorder.txt";
    cy.writeFile(`cypress/src/fixtures/${txtFileName}`, "Some text content");

    cy.get(quickOrderCsvUploadContainer).within(() => {
      cy.get(quickOrderCsvFileInput).selectFile(
        `cypress/src/fixtures/${txtFileName}`,
        {
          force: true,
        },
      );
    });
    cy.wait(1000);

    cy.get(quickOrderCsvErrorMessage).should("exist");

    // ========== STEP 2: Upload valid CSV ==========

    const csvContent = `SKU,QTY\n${testProducts.simple1.sku},2\n${testProducts.simple2.sku},3\n${testProducts.simple3.sku},1`;
    cy.writeFile("cypress/src/fixtures/test-quick-order.csv", csvContent);

    cy.get(quickOrderCsvUploadContainer).within(() => {
      cy.get(quickOrderCsvFileInput).selectFile(
        "cypress/src/fixtures/test-quick-order.csv",
        {
          force: true,
        },
      );
    });

    cy.wait(5000);

    // ========== STEP 3: Verify CSV items added ==========

    cy.get(quickOrderItemsContainer, { timeout: 20000 }).within(() => {
      cy.get(quickOrderItemCard, { timeout: 20000 })
        .should("have.length.greaterThan", 0)
        .and("have.length", 3);
    });

    // ========== STEP 4: Remove one item and add to cart ==========

    cy.get(quickOrderItemsContainer).within(() => {
      cy.get(quickOrderItemCard)
        .last()
        .find(quickOrderItemRemoveButton)
        .click();
    });
    cy.wait(500);

    cy.get(quickOrderItemsContainer).within(() => {
      cy.get(quickOrderItemCard).should("have.length", 2);
      cy.get(quickOrderAddAllToCartButton).click();
    });
    cy.wait(2000);

    // ========== STEP 5: Verify redirect to cart ==========

    cy.url().should("include", "/cart");

    // Return to quick order page for next test
    cy.visit("/quick-order");
    cy.wait(2000);

    cy.logToTerminal("✅ JOURNEY 2: Complete - CSV workflow successful");
  });

  it("JOURNEY 3: Search functionality and configurable products", () => {
    cy.logToTerminal(
      "========= 🚀 JOURNEY 3: Search and Configurable Products =========",
    );

    // ========== STEP 1: Search for product ==========

    cy.get(quickOrderItemsContainer).within(() => {
      cy.get(quickOrderSearchInput).type(testProducts.simple1.sku);
    });
    cy.wait(1500);

    cy.get(quickOrderSearchResults).should("be.visible");
    cy.get(quickOrderSearchResultItem).should("have.length.greaterThan", 0);

    // ========== STEP 2: Select product from search ==========

    cy.get(quickOrderSearchResultItem).first().click();
    cy.wait(1500);

    cy.get(quickOrderItemsContainer).within(() => {
      cy.get(quickOrderItemCard).should("have.length", 1);
    });

    // ========== STEP 3: Add configurable product ==========

    cy.get(quickOrderMultipleSkuContainer).within(() => {
      cy.get(quickOrderMultipleSkuTextarea)
        .clear()
        .type(testProducts.configurable.sku);
      cy.contains("button", "Add to List").click();
    });

    cy.wait(2000);

    cy.get(quickOrderItemsContainer).within(() => {
      cy.get(quickOrderItemCard).should("have.length", 2);
    });

    // ========== STEP 4: Verify configurable product has options ==========

    cy.get(`form[data-sku="${testProducts.configurable.sku}"]`)
      .find(quickOrderProductOptionsSlot)
      .should("exist");

    // ========== STEP 5: Select option and update quantity ==========

    cy.get(`form[data-sku="${testProducts.configurable.sku}"]`)
      .find('select[name="color"]')
      .select("red");
    cy.wait(1000);

    cy.get(quickOrderItemCard)
      .first()
      .find(quickOrderItemQuantityInput)
      .clear({ force: true })
      .type("3", { force: true });
    cy.wait(500);

    // ========== STEP 6: Add to cart ==========

    cy.get(quickOrderAddAllToCartButton).click();
    cy.wait(2000);

    // ========== STEP 7: Verify redirect to cart ==========

    cy.url().should("include", "/cart");

    // Return to quick order page for next test
    cy.visit("/quick-order");
    cy.wait(2000);

    cy.logToTerminal(
      "✅ JOURNEY 3: Complete - Search and configurable products workflow successful",
    );
  });

  it("JOURNEY 4: Complete workflow with mixed input methods", () => {
    cy.logToTerminal(
      "========= 🚀 JOURNEY 4: Mixed Input Methods Workflow =========",
    );

    // ========== STEP 1: Add via Multiple SKU ==========

    cy.get(quickOrderMultipleSkuContainer).within(() => {
      cy.get(quickOrderMultipleSkuTextarea).type(testProducts.simple1.sku);
      cy.contains("button", "Add to List").click();
    });
    cy.wait(1500);

    cy.get(quickOrderItemCard).should("have.length", 1);

    // ========== STEP 2: Add via Search ==========

    cy.get(quickOrderItemsContainer).within(() => {
      cy.get(".b2b-quick-order-form-quick-order-items-list__global-search")
        .find(quickOrderSearchInput)
        .type(testProducts.simple2.sku);
    });
    cy.wait(1000);
    cy.get(quickOrderSearchResultItem).first().click();
    cy.wait(1500);

    cy.get(quickOrderItemCard).should("have.length", 2);

    // ========== STEP 3: Add configurable product ==========

    cy.get(quickOrderMultipleSkuContainer).within(() => {
      cy.get(quickOrderMultipleSkuTextarea)
        .clear()
        .type(testProducts.configurable.sku);
      cy.contains("button", "Add to List").click();
    });
    cy.wait(1500);

    cy.get(quickOrderItemCard).should("have.length", 3);

    // ========== STEP 4: Configure options ==========

    cy.get(`form[data-sku="${testProducts.configurable.sku}"]`)
      .find('select[name="color"]')
      .select("green");
    cy.wait(1000);

    // ========== STEP 5: Update quantities ==========

    cy.get(quickOrderItemCard)
      .eq(0)
      .find(quickOrderItemQuantityInput)
      .clear({ force: true })
      .type("3", { force: true });

    cy.get(quickOrderItemCard)
      .eq(1)
      .find(quickOrderItemQuantityInput)
      .clear({ force: true })
      .type("2", { force: true });
    cy.wait(500);

    // ========== STEP 6: Verify total items and add to cart ==========

    cy.get(quickOrderItemCard).should("have.length.greaterThan", 2);

    cy.get(quickOrderAddAllToCartButton).click();
    cy.wait(2000);

    // ========== STEP 7: Verify redirect to cart ==========

    cy.url().should("include", "/cart");

    cy.logToTerminal("✅ JOURNEY 4: Complete - Mixed workflow successful");
  });
});
