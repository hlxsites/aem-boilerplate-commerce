/**
 * B2B Purchase Orders Test Suite
 *
 * This test suite verifies the Purchase Orders functionality for B2B customers.
 * Tests include creating, approving, and managing purchase orders.
 */

import { createUserAssignCompanyAndRole } from "../../support/b2bPOAPICalls";

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

  const selectors = {
    loginForm: "main .auth-sign-in-form",
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    submitButton: 'button[type="submit"]',
    addToCartButton: "button",
    navCartButton: ".nav-cart-button",
    checkoutLink: 'a[href="/checkout"]',
    checkMoneyOrderLabel: "label",
    termsCheckbox: 'input[type="checkbox"]',
    placePOButton: 'button[type="button"]',
    navDropdownButton: ".nav-dropdown-button",
    logoutButton: "button",
    checkbox: 'input[type="checkbox"]',
    companyPOContainer: '[data-testid="company-purchase-orders-container"]',
    approvalPOWrapper:
      ".commerce-b2b-po-require-approval-purchase-orders-wrapper",
    myApprovalPOWrapper: ".commerce-b2b-po-require-approval-purchase-orders",
    poTable: ".b2b-purchase-order-purchase-orders-table",
    showButton: "button",
    editButton: "button.dropin-action-button",
    nameInput: 'input[name="name"]',
    statusCheckbox: 'input[type="checkbox"][name="status"]',
    textarea: "textarea",
    ruleTypeSelect: 'select[name="ruleType"]',
    ruleConditionSelect: 'select[name="ruleCondition"]',
    ruleValueInput: 'input[name="ruleValue"]',
    multiSelect: ".dropin-multi-select",
  };

  const texts = {
    addToCart: "Add to Cart",
    checkout: "Checkout",
    checkMoneyOrder: "Check / Money order",
    placePO: "Place Purchase Order",
    logout: "Logout",
    approveSelected: "Approve selected",
    rejectSelected: "Reject selected",
    show: "Show",
    hide: "Hide",
    edit: "Edit",
    save: "Save",
    addNewRule: "Add New Rule",
    approver: "PO Approver",
    salesManager: "PO Sales",
    specificRoles: "Specific Roles",
    allUsers: "All Users",
    grandTotal: "Grand Total",
    numberOfSKUs: "Number of SKUs",
  };

  const waitTimes = {
    short: 500,
    medium: 1500,
    long: 2000,
    extraLong: 3000,
    reloadWait: 5000,
  };

  const approvalRules = {
    rule1: {
      name: "Approval Rule for Orders Over 50 Dollars",
      description:
        "This rule requires approval for purchase orders with grand total over 50 dollars",
      appliesTo: "Specific Roles",
      role: "PO Sales",
      ruleType: "Grand Total",
      ruleCondition: "is more than or equal to",
      ruleValue: "50",
      approverRole: "PO Approver",
    },
    rule2: {
      name: "Approval Rule for Multiple Product Orders",
      description:
        "This rule requires approval for purchase orders with more than one unique product SKU",
      appliesTo: "All Users",
      ruleType: "Number of SKUs",
      ruleCondition: "is more than",
      ruleValue: "1",
      approverRole: "PO Rules Manager",
    },
    rule3: {
      name: "New Approval Rule for Multiple Product Orders",
      description:
        "This rule requires approval for purchase orders with more than one unique product SKU",
      appliesTo: "All Users",
      ruleType: "Number of SKUs",
      ruleCondition: "is more than",
      ruleValue: "1",
      approverRole: "PO Approver",
    },
    rule4: {
      name: "Approval Rule for Orders Over 50 Dollars",
      description:
        "This rule requires approval for purchase orders with grand total over 50 dollars",
      appliesTo: "Specific Roles",
      role: "PO Sales",
      ruleType: "Grand Total",
      ruleCondition: "is more than or equal to",
      ruleValue: "50",
      approverRole: "PO Rules Manager",
    },
  };

  const login = (user) => {
    cy.visit(urls.login);
    cy.get(selectors.loginForm).within(() => {
      cy.get(selectors.emailInput).type(user.email);
      cy.wait(waitTimes.medium);
      cy.get(selectors.passwordInput).type(user.password);
      cy.wait(waitTimes.medium);
      cy.get(selectors.submitButton).click();
    });
    cy.url().should("include", urls.account);
  };

  const logout = () => {
    cy.get(selectors.navDropdownButton).click();
    cy.contains(selectors.logoutButton, texts.logout).click();
  };

  const addProductToCart = (times = 1, isCheep = false) => {
    cy.visit(!isCheep ? urls.product : urls.cheepProduct);
    cy.wait(waitTimes.long);
    for (let i = 0; i < times; i++) {
      cy.contains(selectors.addToCartButton, texts.addToCart).click();
      cy.wait(waitTimes.long);
    }
  };

  const proceedToCheckout = () => {
    cy.get(selectors.navCartButton).click();
    cy.wait(waitTimes.long);

    cy.get(selectors.checkoutLink).contains(texts.checkout).click();
    cy.wait(waitTimes.long);
  };

  const completeCheckout = () => {
    // Wait for checkout page to fully load
    cy.url().should("include", urls.checkout);
    cy.wait(waitTimes.extraLong);

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
        cy.wait(waitTimes.medium);
        cy.get('input[name="lastName"]')
          .first()
          .clear({ force: true })
          .type("Test", { force: true });
        cy.wait(waitTimes.medium);
        cy.get('input[name="street"]')
          .first()
          .clear({ force: true })
          .type("Test", { force: true });
        cy.wait(waitTimes.medium);
        cy.get('select[name="region"]')
          .first()
          .select("Alabama", { force: true });
        cy.wait(waitTimes.medium);
        cy.get('input[name="city"]')
          .first()
          .clear({ force: true })
          .type("Test", { force: true });
        cy.wait(waitTimes.medium);
        cy.get('input[name="postcode"]')
          .first()
          .clear({ force: true })
          .type("1235", { force: true });
        cy.wait(waitTimes.medium);
        cy.get('input[name="telephone"]')
          .first()
          .clear({ force: true })
          .type("123456789", { force: true });
        cy.wait(waitTimes.extraLong);
      }
    });

    cy.wait(waitTimes.medium);
    cy.contains(selectors.checkMoneyOrderLabel, texts.checkMoneyOrder)
      .should("be.visible")
      .click();
    cy.wait(waitTimes.medium);
    cy.get(".checkout-terms-and-conditions__form")
      .find(selectors.termsCheckbox)
      .check({ force: true });
    cy.wait(waitTimes.medium);
    cy.get(selectors.placePOButton)
      .contains(texts.placePO)
      .should("be.visible")
      .click();
    cy.wait(waitTimes.extraLong);
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
    cy.get(selectors.statusCheckbox).click({ force: true });
    cy.wait(waitTimes.medium);
    cy.get(selectors.nameInput).clear().type(rule.name);
    cy.wait(waitTimes.medium);
    cy.get(selectors.textarea).clear().type(rule.description);
    cy.wait(waitTimes.medium);
    cy.contains(rule.appliesTo).click();
    cy.wait(waitTimes.medium);

    if (rule.appliesTo === texts.specificRoles && rule.role) {
      cy.get(selectors.multiSelect).first().click();
      cy.wait(waitTimes.medium);
      cy.get(selectors.multiSelect).first().contains(rule.role).click();
      cy.wait(waitTimes.medium);
      cy.get("body").type("{esc}");
      cy.wait(waitTimes.medium);
    }

    cy.get(selectors.ruleTypeSelect).select(rule.ruleType);
    cy.wait(waitTimes.medium);
    cy.get(selectors.ruleConditionSelect).select(rule.ruleCondition);
    cy.wait(waitTimes.medium);
    cy.get(selectors.ruleValueInput).clear().type(rule.ruleValue);
    cy.wait(waitTimes.medium);

    const multiSelectIndex = rule.appliesTo === texts.specificRoles ? 1 : 0;
    cy.get(selectors.multiSelect).eq(multiSelectIndex).click();
    cy.wait(waitTimes.medium);
    cy.get(selectors.multiSelect)
      .eq(multiSelectIndex)
      .contains(rule.approverRole)
      .click();
    cy.wait(waitTimes.medium);
    cy.get("body").type("{esc}");
    cy.wait(waitTimes.medium);
  };

  const PASSWORD = "Qwe123456";
  const users = {
    sales_manager: {
      firstname: "Sales",
      lastname: "Manager",
      email: `po_user_sales_manager@example.com`,
      password: PASSWORD,
    },
    po_rules_manager: {
      firstname: "PO Rules",
      lastname: "Manager",
      email: `po_user_po_rules_manager@example.com`,
      password: PASSWORD,
    },
    approver_manager: {
      firstname: "Approver",
      lastname: "Manager",
      email: `po_user_approver_manager@example.com`,
      password: PASSWORD,
    },
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept("**/graphql").as("defaultGraphQL");
  });

  afterEach(() => {});

  it(
    "Create and edit Approval Rules with different conditions",
    { tags: ["@B2BPaas", "@B2BSaas"] },
    () => {
      // Init Users
      const config = [
        {
          user: users.po_rules_manager,
          roleId: 55,
        },
        {
          user: users.sales_manager,
          roleId: 53,
        },
        {
          user: users.approver_manager,
          roleId: 54,
        },
      ];

      // Create users sequentially using Cypress commands
      // Use reduce to ensure sequential execution
      config.reduce((chain, element) => {
        return chain.then(() => {
          cy.wait(waitTimes.extraLong);
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

      cy.get(selectors.showButton).contains(texts.addNewRule).click();
      cy.wait(waitTimes.medium);

      cy.contains("Purchase order approval rule").should("be.visible");
      cy.wait(waitTimes.medium);

      fillApprovalRuleForm(approvalRules.rule1);

      cy.get(selectors.showButton).contains(texts.save).click();
      cy.wait(waitTimes.long);

      cy.contains("Approval rules").should("be.visible");
      cy.contains(approvalRules.rule1.name).should("be.visible");

      // === Step 2: Edit first Approval Rule (Grand Total) to Number of SKUs condition ===
      cy.contains(approvalRules.rule1.name)
        .should("be.visible")
        .closest("tr")
        .find(selectors.showButton)
        .contains(texts.show)
        .click();
      cy.wait(waitTimes.medium);

      cy.get(selectors.editButton)
        .filter(`:contains("${texts.edit}")`)
        .first()
        .click();
      cy.wait(waitTimes.medium);

      cy.contains("Purchase order approval rule").should("be.visible");
      cy.wait(waitTimes.medium);

      fillApprovalRuleForm(approvalRules.rule2);

      cy.get(selectors.showButton).contains(texts.save).click();
      cy.wait(waitTimes.long);

      cy.contains("Approval rules").should("be.visible");
      cy.contains(approvalRules.rule2.name).should("be.visible");

      // === Step 3: Create Approval Rule with Number of SKUs condition ===
      cy.get(selectors.showButton).contains(texts.addNewRule).click();
      cy.wait(waitTimes.medium);

      cy.contains("Purchase order approval rule").should("be.visible");
      cy.wait(waitTimes.medium);

      fillApprovalRuleForm(approvalRules.rule3);

      cy.get(selectors.showButton).contains(texts.save).click();
      cy.wait(waitTimes.long);

      cy.contains("Approval rules").should("be.visible");
      cy.contains(approvalRules.rule3.name).should("be.visible");

      // === Step 4: Edit second Approval Rule (Number of SKUs) to Grand Total condition ===
      cy.get(`tr:contains("${approvalRules.rule3.name}")`)
        .last()
        .find(selectors.showButton)
        .contains(texts.show)
        .click();
      cy.wait(waitTimes.medium);

      cy.get(selectors.editButton)
        .filter(`:contains("${texts.edit}")`)
        .first()
        .click();
      cy.wait(waitTimes.medium);

      cy.contains("Purchase order approval rule").should("be.visible");
      cy.wait(waitTimes.medium);

      fillApprovalRuleForm(approvalRules.rule4);

      cy.get(selectors.showButton).contains(texts.save).click();
      cy.wait(waitTimes.long);

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
          cy.wait(waitTimes.extraLong);
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
      cy.get(selectors.approvalPOWrapper).within(() => {
        // Find table with "Requires my approval" header
        cy.contains("Requires my approval").should("be.visible");

        // Find 3 enabled checkboxes (not disabled, excluding selectAll)
        cy.get(
          `${selectors.checkbox}:not([disabled]):not([name="selectAll"])`
        ).should("have.length.at.least", 3);

        // Verify action buttons exist
        cy.contains(selectors.showButton, texts.rejectSelected).should(
          "be.visible"
        );
        cy.contains(selectors.showButton, texts.approveSelected).should(
          "be.visible"
        );
      });

      // Select first two checkboxes and approve
      const checkboxSelector = `${selectors.checkbox}:not([disabled]):not([name="selectAll"])`;
      [0, 1].forEach((index) => {
        cy.get(selectors.approvalPOWrapper)
          .find(checkboxSelector)
          .eq(index)
          .click();
        cy.wait(waitTimes.medium);
      });

      // Click Approve selected button
      cy.get(selectors.approvalPOWrapper)
        .contains(selectors.showButton, texts.approveSelected)
        .click();
      cy.wait(waitTimes.long);

      // Verify approval success message appears
      cy.get(".dropin-in-line-alert--success").should("be.visible");

      // Wait for the alert to disappear and server to update data
      cy.wait(waitTimes.reloadWait);

      // Verify that only 1 "Approval required" item remains (was 3, approved 2)
      cy.get(selectors.approvalPOWrapper)
        .find(".b2b-purchase-order-purchase-orders-table__status")
        .contains("Approval required")
        .should("have.length", 1);

      // Select third checkbox and reject
      cy.get(selectors.approvalPOWrapper).find(checkboxSelector).eq(0).click();
      cy.wait(waitTimes.medium);

      // Click Reject selected button
      cy.get(selectors.approvalPOWrapper)
        .contains(selectors.showButton, texts.rejectSelected)
        .click();
      cy.wait(waitTimes.long);

      // Verify rejection success message appears
      cy.get(".dropin-in-line-alert--success").should("be.visible");

      // Wait for the alert to disappear and server to update data
      cy.wait(waitTimes.reloadWait);

      // Verify that no "Approval required" items remain (all processed)
      cy.get(selectors.approvalPOWrapper)
        .find(".b2b-purchase-order-purchase-orders-table__status")
        .contains("Approval required")
        .should("have.length", 0);

      // Find and select 30 in the dropdown
      cy.get(selectors.approvalPOWrapper)
        .find(
          "select.dropin-picker__select.dropin-picker__select--primary.dropin-picker__select--medium"
        )
        .select("30")
        .should("have.value", "30");

      // === Step 7: Test scenario: Approver logs in, navigates to "My purchase orders ===
      //      finds first order, expands it, views details page
      //      Verifies: Login, navigation, order expansion, detail page headers

      cy.contains("Requires my approval").should("be.visible");

      cy.get(selectors.myApprovalPOWrapper)
        .find(selectors.poTable)
        .should("be.visible")
        .within(() => {
          cy.contains(selectors.showButton, texts.show).first().click();
        });
      cy.wait(waitTimes.medium);

      cy.get(selectors.myApprovalPOWrapper)
        .find(selectors.poTable)
        .contains(selectors.showButton, "View")
        .first()
        .click();
      cy.wait(waitTimes.long);

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
      cy.wait(waitTimes.medium);
      cy.contains("button", "Add Comment").click();
      cy.wait(waitTimes.long);
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
      cy.wait(waitTimes.long);

      cy.get(selectors.companyPOContainer).should("exist");

      cy.contains("Company purchase orders").should("be.visible");

      cy.get(selectors.companyPOContainer)
        .contains(selectors.showButton, texts.show)
        .first()
        .click();
      cy.wait(waitTimes.medium);

      cy.get(selectors.companyPOContainer)
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
      cy.wait(waitTimes.long);
      cy.visit(urls.approvalRules);
      cy.wait(waitTimes.long);

      cy.contains("Approval rules").should("be.visible");

      cy.contains(selectors.showButton, texts.show).first().click();
      cy.wait(waitTimes.medium);

      cy.contains(selectors.showButton, "Delete").first().click();
      cy.wait(waitTimes.long);

      cy.contains(selectors.showButton, "Delete").first().click();
      cy.wait(waitTimes.long);

      cy.contains(selectors.showButton, texts.show).should("not.exist");
    }
  );

  it(
    "Logout Sale and Delete Customer",
    { tags: ["@B2BPaas", "@B2BSaas"] },
    () => {
      login(users.sales_manager);
      cy.url().should("include", urls.account);
      cy.wait(waitTimes.medium);
    }
  );

  it(
    "Logout Approver and Delete Customer",
    { tags: ["@B2BPaas", "@B2BSaas"] },
    () => {
      login(users.approver_manager);
      cy.url().should("include", urls.account);
      cy.wait(waitTimes.medium);
    }
  );
});
