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
  const fields = {
    quickOrderItemsContainer: "#quick-order-items-container",
    quickOrderMultipleSkuContainer: "#quick-order-multiple-sku-container",
    quickOrderCsvUploadContainer: "#quick-order-csv-upload-container",
    multipleSkuTextarea: "#quick-order-sku-list-input",
    csvFileInput: "#quick-order-csv-file-input",
    csvErrorMessage: ".b2b-quick-order-csv-file-input__error",
    itemCard: ".dropin-cart-list__item",
    itemQuantityInput: ".dropin-incrementer__input",
    itemRemoveButton: 'button[data-testid="cart-item-remove-button"]',
    productOptionsSlot: '[data-slot="ProductOptions"]',
    searchInput: ".b2b-quick-order-search__input",
    searchResults: ".b2b-quick-order-search__results",
    searchResultItem: '[role="option"]',
    notificationBanner: ".b2b-quick-order-notification-banner",
    notificationMessage: ".dropin-alert-banner__message",
    notificationDismiss: ".dropin-alert-banner__dismiss-button",
    addAllToCartButton: 'button[data-testid="add-all-to-cart-button"]',
  };

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
    cy.logToTerminal("🧹 Test setup");
    cy.clearCookies();
    cy.clearLocalStorage();

    // Log configuration and environment
    cy.logToTerminal("=== CYPRESS CONFIG DEBUG ===");
    cy.logToTerminal(`baseUrl: ${Cypress.config("baseUrl")}`);
    cy.logToTerminal(`env: ${JSON.stringify(Cypress.env())}`);
    cy.logToTerminal(`browser: ${Cypress.browser.name}`);
    cy.logToTerminal(`viewportWidth: ${Cypress.config("viewportWidth")}`);
    cy.logToTerminal(`viewportHeight: ${Cypress.config("viewportHeight")}`);
    cy.logToTerminal("============================");

    cy.logToTerminal("🚀 Navigating to Quick Order page");
    const baseUrl = Cypress.config("baseUrl") || "";
    const fullUrl = baseUrl.replace(/\/$/, "") + "/quick-order";
    cy.logToTerminal(`📍 Full URL: ${fullUrl}`);

    cy.on("fail", (error) => {
      cy.logToTerminal(`❌ Test failed with error: ${error.message}`);
      cy.logToTerminal(`Error stack: ${error.stack}`);
      throw error;
    });

    cy.visit("/quick-order", {
      failOnStatusCode: false,
      timeout: 30000,
    }).then((resp) => {
      cy.logToTerminal(`Visit response: ${JSON.stringify(resp)}`);
    });

    cy.wait(2000);

    // Log page state
    cy.url().then((url) => {
      cy.logToTerminal(`Current URL after visit: ${url}`);
    });

    cy.document().then((doc) => {
      cy.logToTerminal(`Document readyState: ${doc.readyState}`);
      cy.logToTerminal(`Document title: ${doc.title}`);
    });

    cy.logToTerminal("🔍 Checking for Quick Order components...");
    cy.logToTerminal(`Looking for: ${fields.quickOrderItemsContainer}`);
    cy.logToTerminal(`Looking for: ${fields.quickOrderMultipleSkuContainer}`);
    cy.logToTerminal(`Looking for: ${fields.quickOrderCsvUploadContainer}`);

    cy.get(fields.quickOrderItemsContainer, { timeout: 10000 }).should(
      "be.visible",
    );
    cy.get(fields.quickOrderMultipleSkuContainer, { timeout: 10000 }).should(
      "be.visible",
    );
    cy.get(fields.quickOrderCsvUploadContainer, { timeout: 10000 }).should(
      "be.visible",
    );

    cy.logToTerminal("✅ Quick Order page loaded");
  });

  after(() => {
    cy.logToTerminal("🏁 B2B Quick Order test suite completed");
  });

  it("JOURNEY 1: Component rendering and Multiple SKU workflow", () => {
    cy.logToTerminal(
      "========= 🚀 JOURNEY 1: Basic Multiple SKU Workflow =========",
    );

    // ========== STEP 1: Verify all components render ==========
    cy.logToTerminal("--- STEP 1: Verify component rendering ---");

    cy.get(fields.quickOrderItemsContainer)
      .should("be.visible")
      .within(() => {
        cy.get('[data-testid="quick-order-items"]').should("exist");
      });

    cy.get(fields.quickOrderMultipleSkuContainer)
      .should("be.visible")
      .within(() => {
        cy.get(".b2b-quick-order-quick-order-multiple-sku").should("exist");
        cy.get(fields.multipleSkuTextarea).should("exist").and("be.visible");
      });

    cy.get(fields.quickOrderCsvUploadContainer)
      .should("be.visible")
      .within(() => {
        cy.get(".b2b-quick-order-quick-order-upload-csv").should("exist");
        cy.get(fields.csvFileInput).should("exist");
      });

    cy.logToTerminal("✅ All Quick Order components rendered successfully");

    // ========== STEP 2: Add items via Multiple SKU ==========
    cy.logToTerminal("--- STEP 2: Add items via Multiple SKU input ---");

    const skuText = `${testProducts.simple1.sku} ${testProducts.simple2.sku}`;

    cy.get(fields.quickOrderMultipleSkuContainer).within(() => {
      cy.get(fields.multipleSkuTextarea).clear().type(skuText);
      cy.contains("button", "Add to List").click();
    });

    cy.wait(2000);

    // ========== STEP 3: Verify items in list ==========
    cy.logToTerminal("--- STEP 3: Verify items appear in list ---");

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.itemCard).should("have.length", 2);
    });

    cy.logToTerminal("✅ Items successfully added to list");

    // ========== STEP 4: Update quantity ==========
    cy.logToTerminal("--- STEP 4: Update item quantity ---");

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.itemCard)
        .first()
        .find(fields.itemQuantityInput)
        .clear()
        .type("5");
    });
    cy.wait(500);

    cy.logToTerminal("✅ Quantity updated to 5");

    // ========== STEP 5: Add to cart ==========
    cy.logToTerminal("--- STEP 5: Add items to cart ---");

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.contains("button", "Add to Cart").should("not.be.disabled").click();
    });
    cy.wait(2000);

    // ========== STEP 6: Verify notification banner ==========
    cy.logToTerminal("--- STEP 6: Verify success notification banner ---");

    cy.get(fields.notificationBanner).should("exist").and("be.visible");

    cy.get(fields.notificationMessage)
      .should("exist")
      .invoke("text")
      .should("not.be.empty");

    cy.logToTerminal("✅ Notification banner displayed with message");

    cy.get("body").then(($body) => {
      if ($body.find(fields.notificationDismiss).length > 0) {
        cy.logToTerminal("🔘 Testing banner dismiss functionality");
        cy.get(fields.notificationDismiss).click();
        cy.wait(300);
        cy.get(fields.notificationBanner).should("not.exist");
        cy.logToTerminal("✅ Banner dismissed successfully");
      }
    });

    cy.logToTerminal(
      "✅ JOURNEY 1: Complete - Items added to cart successfully",
    );
  });

  it("JOURNEY 2: CSV upload workflow and validation", () => {
    cy.logToTerminal("========= 🚀 JOURNEY 2: CSV Upload Workflow =========");

    // ========== STEP 1: Test invalid file format ==========
    cy.logToTerminal("--- STEP 1: Test invalid file format validation ---");

    const txtFileName = "invalid-file-quickorder.txt";
    cy.writeFile(`cypress/src/fixtures/${txtFileName}`, "Some text content");

    cy.get(fields.quickOrderCsvUploadContainer).within(() => {
      cy.get(fields.csvFileInput).selectFile(
        `cypress/src/fixtures/${txtFileName}`,
        {
          force: true,
        },
      );
    });
    cy.wait(1000);

    cy.get(fields.csvErrorMessage).should("exist");
    cy.logToTerminal("✅ Invalid file format rejected");

    // ========== STEP 2: Upload valid CSV ==========
    cy.logToTerminal("--- STEP 2: Upload valid CSV file ---");

    const csvContent = `sku,quantity\n${testProducts.simple1.sku},2\n${testProducts.simple2.sku},3\n${testProducts.simple3.sku},1`;
    cy.writeFile("cypress/src/fixtures/test-quick-order.csv", csvContent);

    cy.get(fields.quickOrderCsvUploadContainer).within(() => {
      cy.get(fields.csvFileInput).selectFile(
        "cypress/src/fixtures/test-quick-order.csv",
        {
          force: true,
        },
      );
    });

    cy.wait(3000);

    // ========== STEP 3: Verify CSV items added ==========
    cy.logToTerminal("--- STEP 3: Verify CSV items added to list ---");

    cy.get(fields.quickOrderItemsContainer, { timeout: 10000 }).within(() => {
      cy.get(fields.itemCard, { timeout: 10000 }).should("have.length", 3);
    });

    cy.logToTerminal("✅ CSV items successfully processed");

    // ========== STEP 4: Remove one item and add to cart ==========
    cy.logToTerminal("--- STEP 4: Remove item and add remaining to cart ---");

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.itemCard).last().find(fields.itemRemoveButton).click();
    });
    cy.wait(500);

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.itemCard).should("have.length", 2);
      cy.contains("button", "Add to Cart").click();
    });
    cy.wait(2000);

    // ========== STEP 5: Verify notification banner ==========
    cy.logToTerminal("--- STEP 5: Verify success notification ---");

    cy.get(fields.notificationBanner).should("exist").and("be.visible");

    cy.get(fields.notificationMessage)
      .should("exist")
      .invoke("text")
      .should("not.be.empty");

    cy.logToTerminal("✅ Success notification displayed");
    cy.logToTerminal("✅ JOURNEY 2: Complete - CSV workflow successful");
  });

  it("JOURNEY 3: Search functionality and configurable products", () => {
    cy.logToTerminal(
      "========= 🚀 JOURNEY 3: Search and Configurable Products =========",
    );

    // ========== STEP 1: Search for product ==========
    cy.logToTerminal("--- STEP 1: Search for product by SKU ---");

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.searchInput).type(testProducts.simple1.sku);
    });
    cy.wait(1500);

    cy.get(fields.searchResults).should("be.visible");
    cy.get(fields.searchResultItem).should("have.length.greaterThan", 0);

    // ========== STEP 2: Select product from search ==========
    cy.logToTerminal("--- STEP 2: Select product from search results ---");

    cy.get(fields.searchResultItem).first().click();
    cy.wait(1500);

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.itemCard).should("have.length", 1);
    });

    cy.logToTerminal("✅ Product added from search");

    // ========== STEP 3: Add configurable product ==========
    cy.logToTerminal("--- STEP 3: Add configurable product ---");

    cy.get(fields.quickOrderMultipleSkuContainer).within(() => {
      cy.get(fields.multipleSkuTextarea)
        .clear()
        .type(testProducts.configurable.sku);
      cy.contains("button", "Add to List").click();
    });

    cy.wait(2000);

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.itemCard).should("have.length", 2);
    });

    // ========== STEP 4: Verify configurable product has options ==========
    cy.logToTerminal("--- STEP 4: Verify configurable product options ---");

    cy.get(`form[data-sku="${testProducts.configurable.sku}"]`)
      .find(fields.productOptionsSlot)
      .should("exist");

    cy.logToTerminal("✅ Configurable product options available");

    // ========== STEP 5: Select option and update quantity ==========
    cy.logToTerminal("--- STEP 5: Configure product options ---");

    cy.get(`form[data-sku="${testProducts.configurable.sku}"]`)
      .find('select[name="color"]')
      .select("red");
    cy.wait(1000);

    cy.get(fields.itemCard)
      .first()
      .find(fields.itemQuantityInput)
      .clear()
      .type("3");
    cy.wait(500);

    // ========== STEP 6: Add to cart ==========
    cy.logToTerminal("--- STEP 6: Add configured products to cart ---");

    cy.get(fields.addAllToCartButton).click();
    cy.wait(2000);

    // ========== STEP 7: Verify notification banner ==========
    cy.logToTerminal("--- STEP 7: Verify success notification banner ---");

    cy.get(fields.notificationBanner).should("exist").and("be.visible");

    cy.get(fields.notificationMessage)
      .should("exist")
      .invoke("text")
      .should("not.be.empty");

    cy.logToTerminal("✅ Notification banner with success message displayed");
    cy.logToTerminal(
      "✅ JOURNEY 3: Complete - Search and configurable products workflow successful",
    );
  });

  it("JOURNEY 4: Complete workflow with mixed input methods", () => {
    cy.logToTerminal(
      "========= 🚀 JOURNEY 4: Mixed Input Methods Workflow =========",
    );

    // ========== STEP 1: Add via Multiple SKU ==========
    cy.logToTerminal("--- STEP 1: Add first product via Multiple SKU ---");

    cy.get(fields.quickOrderMultipleSkuContainer).within(() => {
      cy.get(fields.multipleSkuTextarea).type(testProducts.simple1.sku);
      cy.contains("button", "Add to List").click();
    });
    cy.wait(1500);

    cy.get(fields.itemCard).should("have.length", 1);
    cy.logToTerminal("✅ Product added via Multiple SKU");

    // ========== STEP 2: Add via Search ==========
    cy.logToTerminal("--- STEP 2: Add second product via Search ---");

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(".b2b-quick-order-form-quick-order-items-list__global-search")
        .find(fields.searchInput)
        .type(testProducts.simple2.sku);
    });
    cy.wait(1000);
    cy.get(fields.searchResultItem).first().click();
    cy.wait(1500);

    cy.get(fields.itemCard).should("have.length", 2);
    cy.logToTerminal("✅ Product added via Search");

    // ========== STEP 3: Add configurable product ==========
    cy.logToTerminal("--- STEP 3: Add configurable product ---");

    cy.get(fields.quickOrderMultipleSkuContainer).within(() => {
      cy.get(fields.multipleSkuTextarea)
        .clear()
        .type(testProducts.configurable.sku);
      cy.contains("button", "Add to List").click();
    });
    cy.wait(1500);

    cy.get(fields.itemCard).should("have.length", 3);

    // ========== STEP 4: Configure options ==========
    cy.logToTerminal("--- STEP 4: Configure product options ---");

    cy.get(`form[data-sku="${testProducts.configurable.sku}"]`)
      .find('select[name="color"]')
      .select("green");
    cy.wait(1000);

    // ========== STEP 5: Update quantities ==========
    cy.logToTerminal("--- STEP 5: Update product quantities ---");

    cy.get(fields.itemCard)
      .eq(0)
      .find(fields.itemQuantityInput)
      .clear()
      .type("3");

    cy.get(fields.itemCard)
      .eq(1)
      .find(fields.itemQuantityInput)
      .clear()
      .type("2");
    cy.wait(500);

    cy.logToTerminal("✅ Quantities updated");

    // ========== STEP 6: Verify total items and add to cart ==========
    cy.logToTerminal("--- STEP 6: Verify items and add to cart ---");

    cy.get(fields.itemCard).should("have.length.greaterThan", 2);

    cy.get(fields.addAllToCartButton).click();
    cy.wait(2000);

    // ========== STEP 7: Verify comprehensive notification banner ==========
    cy.logToTerminal("--- STEP 7: Verify notification banner and message ---");

    cy.get(fields.notificationBanner).should("exist").and("be.visible");

    cy.get(fields.notificationMessage)
      .should("exist")
      .and("be.visible")
      .invoke("text")
      .should("not.be.empty")
      .then((text) => {
        cy.logToTerminal(`📋 Banner message: ${text.substring(0, 50)}...`);
      });

    cy.get("body").then(($body) => {
      if ($body.find(fields.notificationDismiss).length > 0) {
        cy.logToTerminal("🔘 Testing banner dismiss functionality");
        cy.get(fields.notificationDismiss).should("be.visible").click();
        cy.wait(300);
        cy.get(fields.notificationBanner).should("not.exist");
        cy.logToTerminal("✅ Banner successfully dismissed");
      }
    });

    cy.logToTerminal("✅ JOURNEY 4: Complete - Mixed workflow successful");
    cy.logToTerminal(
      "✅ All products from different input methods added to cart",
    );
  });
});
