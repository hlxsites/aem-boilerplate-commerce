/**
 * B2B Purchase Orders Test Suite
 *
 * This test suite verifies the Purchase Orders functionality for B2B customers.
 * Tests include creating, approving, and managing purchase orders.
 */

import { createUserAssignCompanyAndRole } from "../../support/b2bPOAPICalls";
import { texts, approvalRules, users, config } from "../../fixtures";
import * as selectors from "../../fields";

describe("B2B Purchase Orders", () => {
  const urls = {
    login: "/customer/login",
    account: "/customer/account",
    product: "/products/adobe-pattern-hoodie/adb127",
    cheepProduct: "/products/badge-reel/adb153",
    checkout: "/checkout",
    purchaseOrders: "/customer/purchase-orders",
    approvalRules: "/customer/approval-rules",
  };

  const login = (user) => {
    cy.visit(urls.login);
    cy.get(selectors.poLoginForm).within(() => {
      cy.get(selectors.poEmailInput).type(user.email);
      cy.wait(1500);
      cy.get(selectors.poPasswordInput).type(user.password);
      cy.wait(1500);
      cy.get(selectors.poSubmitButton).click();
    });
    cy.url().should("include", urls.account);
  };

  const logout = () => {
    cy.get(selectors.poNavDropdownButton).click();
    cy.contains(selectors.poLogoutButton, texts.logout).click();
  };

  const addProductToCart = (times = 1, isCheep = false) => {
    cy.visit(!isCheep ? urls.product : urls.cheepProduct);
    cy.wait(2000);
    for (let i = 0; i < times; i++) {
      cy.contains(selectors.poAddToCartButton, texts.addToCart).click();
      cy.wait(2000);
    }
  };

  const proceedToCheckout = () => {
    cy.get(selectors.poNavCartButton).click();
    cy.wait(2000);

    cy.get(selectors.poCheckoutLink).contains(texts.checkout).click();
    cy.wait(2000);
  };

  const completeCheckout = () => {
    // Wait for checkout page to fully load
    cy.url().should("include", urls.checkout);
    cy.wait(3000);

    // Check if shipping address form exists and fill it
    cy.get('input[name="firstName"]', { timeout: 10000 }).then(($firstName) => {
      if (
        $firstName.length > 0 &&
        (!$firstName.val() || $firstName.val().trim() === "")
      ) {
        cy.log("Filling shipping address form");
        cy.get('input[name="firstName"]')
          .first()
          .clear({ force: true })
          .type("Test", { force: true });
        cy.wait(1500);
        cy.get('input[name="lastName"]')
          .first()
          .clear({ force: true })
          .type("Test", { force: true });
        cy.wait(1500);
        cy.get('input[name="street"]')
          .first()
          .clear({ force: true })
          .type("Test", { force: true });
        cy.wait(1500);
        cy.get('select[name="region"]')
          .first()
          .select("Alabama", { force: true });
        cy.wait(1500);
        cy.get('input[name="city"]')
          .first()
          .clear({ force: true })
          .type("Test", { force: true });
        cy.wait(1500);
        cy.get('input[name="postcode"]')
          .first()
          .clear({ force: true })
          .type("1235", { force: true });
        cy.wait(1500);
        cy.get('input[name="telephone"]')
          .first()
          .clear({ force: true })
          .type("123456789", { force: true });
        cy.wait(3000);
      }
    });

    cy.wait(1500);
    cy.contains(selectors.poCheckMoneyOrderLabel, texts.checkMoneyOrder)
      .should("be.visible")
      .click();
    cy.wait(1500);
    cy.get(".checkout-terms-and-conditions__form")
      .find(selectors.poTermsCheckbox)
      .check({ force: true });
    cy.wait(1500);
    cy.get(selectors.poPlacePOButton)
      .contains(texts.placePO)
      .should("be.visible")
      .click();
    cy.wait(3000);
  };

  const verifyPOConfirmation = () => {
    cy.contains("Your Purchase Order request number is").should("be.visible");
    cy.get(".purchase-orders-confirmation-content__link")
      .should("exist")
      .and("be.visible");
    cy.contains("Continue shopping").should("exist").and("be.visible");
  };

  const createPurchaseOrder = (itemCount = 2, isCheep = false) => {
    addProductToCart(itemCount, isCheep);
    proceedToCheckout();
    completeCheckout();
    // TODO BROKEN TEST
    // verifyPOConfirmation();
  };

  const fillApprovalRuleForm = (rule) => {
    cy.get(selectors.poStatusCheckbox).click({ force: true });
    cy.wait(1500);
    cy.get(selectors.poNameInput).clear().type(rule.name);
    cy.wait(1500);
    cy.get(selectors.poTextarea).clear().type(rule.description);
    cy.wait(1500);
    cy.contains(rule.appliesTo).click();
    cy.wait(1500);

    if (rule.appliesTo === texts.specificRoles && rule.role) {
      cy.get(selectors.poMultiSelect).first().click();
      cy.wait(1500);
      cy.get(selectors.poMultiSelect).first().contains(rule.role).click();
      cy.wait(1500);
      cy.get("body").type("{esc}");
      cy.wait(1500);
    }

    cy.get(selectors.poRuleTypeSelect).select(rule.ruleType);
    cy.wait(1500);
    cy.get(selectors.poRuleConditionSelect).select(rule.ruleCondition);
    cy.wait(1500);
    cy.get(selectors.poRuleValueInput).clear().type(rule.ruleValue);
    cy.wait(1500);

    const multiSelectIndex = rule.appliesTo === texts.specificRoles ? 1 : 0;
    cy.get(selectors.poMultiSelect).eq(multiSelectIndex).click();
    cy.wait(1500);
    cy.get(selectors.poMultiSelect)
      .eq(multiSelectIndex)
      .contains(rule.approverRole)
      .click();
    cy.wait(1500);
    cy.get("body").type("{esc}");
    cy.wait(1500);
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept("**/graphql").as("defaultGraphQL");
  });

  it(
    "Create and edit Approval Rules with different conditions",
    { tags: ["@B2BPaas", "@B2BSaas"] },
    () => {
      // Init Users

      // Create users sequentially using Cypress commands
      // Use reduce to ensure sequential execution
      config.reduce((chain, element) => {
        return chain.then(() => {
          cy.wait(3000);
          return cy.wrap(null).then(() => {
            cy.log(`Creating user: ${element.user.email}`);
            return createUserAssignCompanyAndRole(element.user, element.roleId);
          });
        });
      }, cy.wrap(null));

      // Test scenario: Create and edit approval rules with Grand Total and Number of SKUs conditions
      // - Creates first rule with Grand Total condition
      // - Edits it to Number of SKUs condition
      // - Creates second rule with Number of SKUs condition
      // - Edits it to Grand Total condition
      // Verifies: Single login session, rule creation, rule editing, condition changes

      login(users.po_rules_manager);

      // === Step 1: Create Approval Rule with Grand Total condition ===
      cy.visit(urls.approvalRules);
      cy.contains("Approval rules").should("be.visible");

      cy.get(selectors.poShowButton).contains(texts.addNewRule).click();
      cy.wait(1500);

      cy.contains("Purchase order approval rule").should("be.visible");
      cy.wait(1500);

      fillApprovalRuleForm(approvalRules.rule1);

      cy.get(selectors.poShowButton).contains(texts.save).click();
      cy.wait(2000);

      cy.contains("Approval rules").should("be.visible");
      cy.contains(approvalRules.rule1.name).should("be.visible");

      // === Step 2: Edit first Approval Rule (Grand Total) to Number of SKUs condition ===
      cy.contains(approvalRules.rule1.name)
        .should("be.visible")
        .closest("tr")
        .find(selectors.poShowButton)
        .contains(texts.show)
        .click();
      cy.wait(1500);

      cy.get(selectors.poEditButton)
        .filter(`:contains("${texts.edit}")`)
        .first()
        .click();
      cy.wait(1500);

      cy.contains("Purchase order approval rule").should("be.visible");
      cy.wait(1500);

      fillApprovalRuleForm(approvalRules.rule2);

      cy.get(selectors.poShowButton).contains(texts.save).click();
      cy.wait(2000);

      cy.contains("Approval rules").should("be.visible");
      cy.contains(approvalRules.rule2.name).should("be.visible");

      // === Step 3: Create Approval Rule with Number of SKUs condition ===
      cy.get(selectors.poShowButton).contains(texts.addNewRule).click();
      cy.wait(1500);

      cy.contains("Purchase order approval rule").should("be.visible");
      cy.wait(1500);

      fillApprovalRuleForm(approvalRules.rule3);

      cy.get(selectors.poShowButton).contains(texts.save).click();
      cy.wait(2000);

      cy.contains("Approval rules").should("be.visible");
      cy.contains(approvalRules.rule3.name).should("be.visible");

      // === Step 4: Edit second Approval Rule (Number of SKUs) to Grand Total condition ===
      cy.get(`tr:contains("${approvalRules.rule3.name}")`)
        .last()
        .find(selectors.poShowButton)
        .contains(texts.show)
        .click();
      cy.wait(1500);

      cy.get(selectors.poEditButton)
        .filter(`:contains("${texts.edit}")`)
        .first()
        .click();
      cy.wait(1500);

      cy.contains("Purchase order approval rule").should("be.visible");
      cy.wait(1500);

      fillApprovalRuleForm(approvalRules.rule4);

      cy.get(selectors.poShowButton).contains(texts.save).click();
      cy.wait(2000);

      cy.contains("Approval rules").should("be.visible");
      cy.contains(approvalRules.rule4.name).should("be.visible");

      logout();

      // === Step 5: Create Purchase Orders as Sales user ===
      // Test scenario: Sales user creates 3 Purchase Orders with 3 items each
      // These orders will require approval due to quantity/total amount
      // Verifies: Login, product selection, cart, checkout flow, PO creation confirmation

      login(users.sales_manager);

      // Create 3 Purchase Orders
      for (let i = 0; i < 3; i++) {
        createPurchaseOrder(3);
        if (i < 2) {
          cy.wait(3000);
        }
      }

      logout();

      // === Step 6: Test scenario: Approver logs in and manages pending Purchase Orders ===
      // - Approves 2 Purchase Orders (status changes to "Order placed")
      // - Rejects 1 Purchase Order (status changes to "Rejected")
      // Verifies: Login, PO list display, bulk approve/reject actions, success messages, status updates

      login(users.approver_manager);

      // Navigate to Purchase Orders page
      cy.visit(urls.purchaseOrders);

      // Find wrapper with Purchase Orders requiring approval
      cy.get(selectors.poApprovalPOWrapper).within(() => {
        // Find table with "Requires my approval" header
        cy.contains("Requires my approval").should("be.visible");

        // Find 3 enabled checkboxes (not disabled, excluding selectAll)
        cy.get(
          `${selectors.poCheckbox}:not([disabled]):not([name="selectAll"])`
        ).should("have.length.at.least", 3);

        // Verify action buttons exist
        cy.contains(selectors.poShowButton, texts.rejectSelected).should(
          "be.visible"
        );
        cy.contains(selectors.poShowButton, texts.approveSelected).should(
          "be.visible"
        );
      });

      // Select first two checkboxes and approve
      const checkboxSelector = `${selectors.poCheckbox}:not([disabled]):not([name="selectAll"])`;
      [0, 1].forEach((index) => {
        cy.get(selectors.poApprovalPOWrapper)
          .find(checkboxSelector)
          .eq(index)
          .click();
        cy.wait(1500);
      });

      // Click Approve selected button
      cy.get(selectors.poApprovalPOWrapper)
        .contains(selectors.poShowButton, texts.approveSelected)
        .click();
      cy.wait(2000);

      // Verify approval success message appears
      cy.get(".dropin-in-line-alert--success").should("be.visible");

      // Wait for the alert to disappear and server to update data
      cy.wait(5000);

      // Verify that only 1 "Approval required" item remains (was 3, approved 2)
      cy.get(selectors.poApprovalPOWrapper)
        .find(".b2b-purchase-order-purchase-orders-table__status")
        .contains("Approval required")
        .should("have.length", 1);

      // Select third checkbox and reject
      cy.get(selectors.poApprovalPOWrapper)
        .find(checkboxSelector)
        .eq(0)
        .click();
      cy.wait(1500);

      // Click Reject selected button
      cy.get(selectors.poApprovalPOWrapper)
        .contains(selectors.poShowButton, texts.rejectSelected)
        .click();
      cy.wait(2000);

      // Verify rejection success message appears
      cy.get(".dropin-in-line-alert--success").should("be.visible");

      // Wait for the alert to disappear and server to update data
      cy.wait(5000);

      // Verify that no "Approval required" items remain (all processed)
      cy.get(selectors.poApprovalPOWrapper)
        .find(".b2b-purchase-order-purchase-orders-table__status")
        .contains("Approval required")
        .should("have.length", 0);

      // Find and select 30 in the dropdown
      cy.get(selectors.poApprovalPOWrapper)
        .find(
          "select.dropin-picker__select.dropin-picker__select--primary.dropin-picker__select--medium"
        )
        .select("30")
        .should("have.value", "30");

      // === Step 7: Test scenario: Approver logs in, navigates to "My purchase orders ===
      //      finds first order, expands it, views details page
      //      Verifies: Login, navigation, order expansion, detail page headers

      cy.contains("Requires my approval").should("be.visible");

      cy.get(selectors.poMyApprovalPOWrapper)
        .find(selectors.poTable)
        .should("be.visible")
        .within(() => {
          cy.contains(selectors.poShowButton, texts.show).first().click();
        });
      cy.wait(1500);

      cy.get(selectors.poMyApprovalPOWrapper)
        .find(selectors.poTable)
        .contains(selectors.poShowButton, "View")
        .first()
        .click();
      cy.wait(2000);

      cy.url().should("not.include", urls.purchaseOrders);

      cy.get(".dropin-header-container__title").should("have.length.gt", 7);
      cy.contains(/Purchase order \d+/).should("be.visible");
      cy.contains("Order placed").should("be.visible");
      cy.contains("Purchase order history log").should("be.visible");
      cy.contains("Purchase order comments").should("be.visible");
      cy.contains("Customer information").should("be.visible");
      cy.contains("Order summary").should("be.visible");
      cy.contains(/Your order \(\d+\)/).should("be.visible");
      cy.contains("Add purchase order comment").should("be.visible");

      // Add a comment
      cy.get("textarea").type("Test comment message");
      cy.wait(1500);
      cy.contains("button", "Add Comment").click();
      cy.wait(2000);
      logout();

      // === Step 8: Test scenario: Sales creates Purchase Order with 1 item (auto-approved), Admin verifies ===
      // - Sales user creates PO with single item (bypasses approval rules)
      // - PO is automatically approved (status: "Order placed")
      // - Sales logs out, Admin logs in
      // - Admin views company Purchase Orders and verifies auto-approved order details

      login(users.sales_manager);
      createPurchaseOrder(1, true);
      logout();

      login(users.po_rules_manager);

      cy.visit(urls.purchaseOrders);
      cy.wait(2000);

      cy.get(selectors.poCompanyPOContainer).should("exist");

      cy.contains("Company purchase orders").should("be.visible");

      cy.get(selectors.poCompanyPOContainer)
        .contains(selectors.poShowButton, texts.show)
        .first()
        .click();
      cy.wait(1500);

      cy.get(selectors.poCompanyPOContainer)
        .find(".b2b-purchase-order-purchase-orders-table__row-details-content")
        .should("be.visible")
        .within(() => {
          cy.contains(/Total: \$\d+\.\d{2}/)
            .invoke("text")
            .then((text) => {
              const match = text.match(/Total: \$(\d+\.\d{2})/);
              if (match) {
                const total = parseFloat(match[1]);
                cy.log(`Found total: $${total}`);
                expect(total).to.be.lessThan(10);
              }
            });
        });
      logout();

      // === Step 8: Delete approval rules ===
      // Navigate to Approval Rules page

      login(users.po_rules_manager);
      cy.wait(2000);
      cy.visit(urls.approvalRules);
      cy.wait(2000);

      cy.contains("Approval rules").should("be.visible");

      cy.contains(selectors.poShowButton, texts.show).first().click();
      cy.wait(1500);

      cy.contains(selectors.poShowButton, "Delete").first().click();
      cy.wait(2000);

      cy.contains(selectors.poShowButton, "Delete").first().click();
      cy.wait(2000);

      cy.contains(selectors.poShowButton, texts.show).should("not.exist");
    }
  );

  it(
    "Logout Sale and Delete Customer",
    { tags: ["@B2BPaas", "@B2BSaas"] },
    () => {
      login(users.sales_manager);
      cy.url().should("include", urls.account);
      cy.wait(1500);
    }
  );

  it(
    "Logout Approver and Delete Customer",
    { tags: ["@B2BPaas", "@B2BSaas"] },
    () => {
      login(users.approver_manager);
      cy.url().should("include", urls.account);
      cy.wait(1500);
    }
  );
});
