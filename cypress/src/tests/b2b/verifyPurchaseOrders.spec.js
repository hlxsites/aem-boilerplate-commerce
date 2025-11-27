import {
  createUserAssignCompanyAndRole,
  manageCompanyRole,
  deleteCustomerRoles,
  unassignRoles,
} from '../../support/b2bPOAPICalls';
import {
  poLabels,
  poApprovalRules,
  poUsers,
  poRolesConfig,
} from '../../fixtures';
import * as selectors from '../../fields';
import * as actions from '../../actions';

describe('B2B Purchase Orders', () => {
  const urls = Cypress.env('poUrls');

  before(() => {
    cy.logToTerminal('🚀 B2B Purchase Orders test suite started');
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  // Test 1: Setup roles and users
  it(
    'Setup - Create roles and users',
    { tags: ['@B2BSaas'], retries: 0 },
    () => {
      cy.logToTerminal('⚙️ Test 1: Setup - Creating roles and users');

      const poUsersConfig = [
        {
          user: poUsers.po_rules_manager,
          role: poRolesConfig.rulesManager,
          roleId: null,
        },
        {
          user: poUsers.sales_manager,
          role: poRolesConfig.salesManager,
          roleId: null,
        },
        {
          user: poUsers.approver_manager,
          role: poRolesConfig.approver,
          roleId: null,
        },
      ];

      // Create roles
      cy.logToTerminal('⚙️ Creating user roles');
      const createdRoleIds = [];
      poUsersConfig
        .reduce((chain, element, index) => {
          return chain.then(() => {
            cy.logToTerminal(`Creating role: ${element.role.role_name}...`);
            cy.wait(3000);

            return manageCompanyRole(element.role).then((result) => {
              poUsersConfig[index].roleId = result?.role?.id;
              createdRoleIds.push(result?.role?.id);

              cy.logToTerminal(
                `✅ Role created: ${element.role.role_name} | ID: ${result?.role?.id}`
              );
            });
          });
        }, cy.wrap(null))
        .then(() => {
          Cypress.env('poTestRoleIds', createdRoleIds);
          Cypress.env('poUsersConfig', poUsersConfig);
          cy.logToTerminal(
            `📝 Stored ${createdRoleIds.length} role IDs for cleanup`
          );
          cy.logToTerminal(
            '⏳ Waiting 10 seconds for roles to be indexed in the system...'
          );
          cy.wait(10000);
        });

      // Create users
      cy.logToTerminal('⚙️ Creating test users');
      poUsersConfig
        .reduce((chain, element) => {
          return chain.then(() => {
            cy.wait(5000);
            return cy.wrap(null).then(() => {
              cy.logToTerminal(
                `✅ Creating user: ${element.user.email} with role ID: ${element.roleId}`
              );
              return createUserAssignCompanyAndRole(
                element.user,
                element.roleId
              );
            });
          });
        }, cy.wrap(null))
        .then(() => {
          cy.logToTerminal(
            '⏳ Waiting 5 seconds for users and permissions to be fully applied...'
          );
          cy.wait(5000);
          cy.logToTerminal('✅ Test 1: Setup completed successfully');
        });
    }
  );

  // Test 2: Manage approval rules
  it(
    'Manage approval rules - Create and edit',
    { tags: ['@B2BSaas'], retries: 0 },
    () => {
      cy.logToTerminal('⚙️ Test 2: Managing approval rules');

      cy.logToTerminal(`🔐 Login as PO Rules Manager`);
      actions.login(poUsers.po_rules_manager, urls);
      cy.logToTerminal(
        '⏳ Waiting for session and permissions to initialize...'
      );
      cy.wait(3000);

      // Step 1: Create Approval Rule with Grand Total condition
      cy.logToTerminal(
        '📝 STEP 1: Creating Approval Rule with Grand Total condition'
      );
      cy.visit(urls.approvalRules);
      cy.wait(2000);
      cy.reload();
      cy.wait(3000);
      cy.contains(poLabels.approvalRulesHeader).should('be.visible');

      cy.get(selectors.poShowButton).contains(poLabels.addNewRule).click();
      cy.contains(poLabels.approvalRuleFormHeader).should('be.visible');

      actions.fillApprovalRuleForm(poApprovalRules.rule1, poLabels);
      cy.get(selectors.poShowButton).contains(poLabels.save).click();

      cy.contains(poLabels.approvalRulesHeader).should('be.visible');
      cy.contains(poApprovalRules.rule1.name).should('be.visible');

      // Step 2: Edit first Approval Rule (Grand Total) to Number of SKUs
      cy.logToTerminal(
        '✏️ STEP 2: Editing first Approval Rule to Number of SKUs condition'
      );
      cy.contains(poApprovalRules.rule1.name)
        .should('be.visible')
        .closest('tr')
        .find(selectors.poShowButton)
        .contains(poLabels.show)
        .click();
      cy.get(selectors.poEditButton)
        .filter(`:contains("${poLabels.edit}")`)
        .first()
        .click();
      cy.contains(poLabels.approvalRuleFormHeader).should('be.visible');

      actions.fillApprovalRuleForm(poApprovalRules.rule1Edited, poLabels);
      cy.get(selectors.poShowButton).contains(poLabels.save).click();

      cy.contains(poLabels.approvalRulesHeader).should('be.visible');
      cy.contains(poApprovalRules.rule1Edited.name).should('be.visible');

      // Step 3: Create second Approval Rule with Number of SKUs
      cy.logToTerminal(
        '📝 STEP 3: Creating second Approval Rule with Number of SKUs condition'
      );
      cy.get(selectors.poShowButton).contains(poLabels.addNewRule).click();
      cy.contains(poLabels.approvalRuleFormHeader).should('be.visible');

      actions.fillApprovalRuleForm(poApprovalRules.rule2, poLabels);
      cy.get(selectors.poShowButton).contains(poLabels.save).click();

      cy.contains(poLabels.approvalRulesHeader).should('be.visible');
      cy.contains(poApprovalRules.rule2.name).should('be.visible');

      // Step 4: Edit second Approval Rule (Number of SKUs) to Grand Total
      cy.logToTerminal(
        '✏️ STEP 4: Editing second Approval Rule to Grand Total condition'
      );
      cy.get(`tr:contains("${poApprovalRules.rule2.name}")`)
        .last()
        .find(selectors.poShowButton)
        .contains(poLabels.show)
        .click();
      cy.get(selectors.poEditButton)
        .filter(`:contains("${poLabels.edit}")`)
        .first()
        .click();
      cy.contains(poLabels.approvalRuleFormHeader).should('be.visible');

      actions.fillApprovalRuleForm(poApprovalRules.rule2Edited, poLabels);
      cy.get(selectors.poShowButton).contains(poLabels.save).click();

      cy.contains(poLabels.approvalRulesHeader).should('be.visible');
      cy.contains(poApprovalRules.rule2Edited.name).should('be.visible');

      cy.logToTerminal('🚪 Logging out PO Rules Manager');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(poLabels);
      cy.logToTerminal('✅ Test 2: Approval rules management completed');
    }
  );

  // Test 3: Sales Manager - Create Purchase Orders requiring approval
  it(
    'Sales Manager - Create Purchase Orders requiring approval',
    { tags: ['@B2BSaas'], retries: 0 },
    () => {
      cy.logToTerminal(
        '⚙️ Test 3: Sales Manager - Creating Purchase Orders requiring approval'
      );

      cy.logToTerminal('🔐 Login as Sales Manager');
      actions.login(poUsers.sales_manager, urls);

      for (let i = 0; i < 2; i++) {
        cy.logToTerminal(`🛒 Creating Purchase Order ${i + 1}/2 with 2 items`);
        actions.createPurchaseOrder(2, false, urls, poLabels);
        if (i < 1) {
          cy.wait(3000);
        }
      }

      cy.logToTerminal('🚡 Logging out Sales Manager');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(poLabels);
      cy.logToTerminal('✅ Test 3: Purchase Orders created successfully');
      cy.logToTerminal(
        '⏳ Waiting 20 seconds for Purchase Orders to be indexed...'
      );
      cy.wait(20000);
    }
  );

  // Test 4: Approver - Approve and reject Purchase Orders
  it(
    'Approver - Approve and reject Purchase Orders',
    { tags: ['@B2BSaas'] },
    () => {
      cy.logToTerminal(
        '⚙️ Test 4: Approver - Managing Purchase Orders approval'
      );

      cy.logToTerminal('🔐 Login as Approver Manager');
      actions.login(poUsers.approver_manager, urls);
      cy.logToTerminal('⏳ Waiting for session to initialize...');
      cy.wait(3000);

      cy.logToTerminal('📄 Navigating to Purchase Orders page');
      cy.visit(urls.purchaseOrders);
      cy.wait(5000);
      cy.reload();
      cy.wait(5000);

      // Find and verify Purchase Orders requiring approval
      cy.logToTerminal('🔍 Verifying Purchase Orders requiring approval');
      cy.get(selectors.poApprovalPOWrapper).within(() => {
        cy.contains('Requires my approval').should('be.visible');
        // Wait up to 30 seconds for at least 2 checkboxes to appear
        const checkboxSelector = `${selectors.poCheckbox}:not([disabled]):not([name="selectAll"])`;
        cy.get(checkboxSelector, { timeout: 30000 })
          .should('have.length.at.least', 2)
          .then(($checkboxes) => {
            cy.logToTerminal(
              `📋 Found ${$checkboxes.length} Purchase Orders requiring approval`
            );
          });
        cy.contains(selectors.poShowButton, poLabels.rejectSelected).should(
          'be.visible'
        );
        cy.contains(selectors.poShowButton, poLabels.approveSelected).should(
          'be.visible'
        );
      });
      cy.logToTerminal('✅ Found 2 Purchase Orders requiring approval');

      // Approve first Purchase Order
      cy.logToTerminal('✅ Approving first Purchase Order');
      const checkboxSelector = `${selectors.poCheckbox}:not([disabled]):not([name="selectAll"])`;
      cy.get(selectors.poApprovalPOWrapper)
        .find(checkboxSelector)
        .eq(0)
        .click();
      cy.wait(1500);

      cy.get(selectors.poApprovalPOWrapper)
        .contains(selectors.poShowButton, poLabels.approveSelected)
        .click();

      cy.get('.dropin-in-line-alert--success').should('be.visible');
      cy.get(selectors.poApprovalPOWrapper)
        .find('.b2b-purchase-order-purchase-orders-table__status')
        .contains('Approval required')
        .should('have.length', 1);

      // Reject second Purchase Order
      cy.logToTerminal('🗑️ Rejecting second Purchase Order');
      cy.get(selectors.poApprovalPOWrapper)
        .find(checkboxSelector)
        .eq(0)
        .click();
      cy.wait(1500);

      cy.get(selectors.poApprovalPOWrapper)
        .contains(selectors.poShowButton, poLabels.rejectSelected)
        .click();

      cy.get('.dropin-in-line-alert--success').should('be.visible');
      cy.get(selectors.poApprovalPOWrapper)
        .find('.b2b-purchase-order-purchase-orders-table__status')
        .contains('Approval required')
        .should('have.length', 0);

      // Select 30 items in dropdown
      cy.get(selectors.poApprovalPOWrapper)
        .find(
          'select.dropin-picker__select.dropin-picker__select--primary.dropin-picker__select--medium'
        )
        .select('30')
        .should('have.value', '30');

      cy.logToTerminal('🚪 Logging out Approver Manager');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(poLabels);
      cy.logToTerminal('✅ Test 4: Purchase Orders approved/rejected');
    }
  );

  // Test 5: Approver - View Purchase Order details and add comment
  it(
    'Approver - View Purchase Order details and add comment',
    { tags: ['@B2BSaas'] },
    () => {
      cy.logToTerminal('⚙️ Test 5: Approver - Viewing Purchase Order details');

      cy.logToTerminal('🔐 Login as Approver Manager');
      actions.login(poUsers.approver_manager, urls);

      cy.logToTerminal('📄 Navigating to Purchase Orders page');
      cy.visit(urls.purchaseOrders);
      cy.wait(2000);
      cy.reload();
      cy.wait(3000);

      cy.logToTerminal('📋 Viewing Purchase Order details and adding comment');
      cy.contains('Requires my approval').should('be.visible');

      cy.get(selectors.poMyApprovalPOWrapper)
        .find(selectors.poTable)
        .should('be.visible')
        .within(() => {
          cy.contains(selectors.poShowButton, poLabels.show).first().click();
        });

      cy.get(selectors.poMyApprovalPOWrapper)
        .find(selectors.poTable)
        .contains(selectors.poShowButton, 'View')
        .first()
        .click();

      cy.url().should('not.include', urls.purchaseOrders);
      cy.wait(2000);
      cy.reload();
      cy.wait(3000);

      cy.get('.dropin-header-container__title').should('have.length.gt', 7);
      cy.contains(/Purchase order \d+/).should('be.visible');
      cy.contains('Order placed').should('be.visible');
      cy.contains('Purchase order history log').should('be.visible');
      cy.contains('Purchase order comments').should('be.visible');
      cy.contains('Customer information').should('be.visible');
      cy.contains('Order summary').should('be.visible');
      cy.contains(/Your order \(\d+\)/).should('be.visible');
      cy.contains('Add purchase order comment').should('be.visible');

      cy.get('textarea').type('Test comment message');
      cy.contains('button', 'Add Comment').click();

      cy.logToTerminal('🚪 Logging out Approver Manager');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(poLabels);
      cy.logToTerminal('✅ Test 5: Purchase Order details verified');
    }
  );

  // Test 6: Sales Manager - Create auto-approved Purchase Order
  it(
    'Sales Manager - Create auto-approved Purchase Order',
    { tags: ['@B2BSaas'], retries: 0 },
    () => {
      cy.logToTerminal(
        '⚙️ Test 6: Sales Manager - Creating auto-approved Purchase Order'
      );

      cy.logToTerminal('🔐 Login as Sales Manager');
      actions.login(poUsers.sales_manager, urls);

      cy.logToTerminal('🛒 Creating auto-approved Purchase Order with 1 item');
      actions.createPurchaseOrder(1, true, urls, poLabels);

      cy.logToTerminal('🚪 Logging out Sales Manager');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(poLabels);

      // Verify auto-approved order
      cy.logToTerminal('🔐 Login as PO Rules Manager to verify order');
      actions.login(poUsers.po_rules_manager, urls);

      cy.logToTerminal('📄 Navigating to Company Purchase Orders');
      cy.visit(urls.purchaseOrders);
      cy.wait(2000);
      cy.reload();
      cy.wait(3000);

      cy.get(selectors.poCompanyPOContainer).should('exist');
      cy.contains('Company purchase orders').should('be.visible');

      cy.get(selectors.poCompanyPOContainer)
        .contains(selectors.poShowButton, poLabels.show)
        .first()
        .click();

      cy.get(selectors.poCompanyPOContainer)
        .find('.b2b-purchase-order-purchase-orders-table__row-details-content')
        .should('be.visible')
        .within(() => {
          cy.contains(/Total: \$\d+\.\d{2}/)
            .invoke('text')
            .then((text) => {
              const match = text.match(/Total: \$(\d+\.\d{2})/);
              if (match) {
                const total = parseFloat(match[1]);
                cy.log(`Found total: $${total}`);
                expect(total).to.be.lessThan(10);
              }
            });
        });

      cy.logToTerminal('🚪 Logging out PO Rules Manager');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(poLabels);
      cy.logToTerminal('✅ Test 6: Auto-approved Purchase Order verified');
    }
  );

  // Test 7: Cleanup - Delete approval rules, users and roles
  it(
    'Cleanup - Delete approval rules, users and roles',
    { tags: ['@B2BSaas'] },
    () => {
      cy.logToTerminal(
        '⚙️ Test 7: Cleanup - Deleting approval rules, users and roles'
      );

      // Delete Sales Manager user
      cy.logToTerminal('🗑️ Deleting Sales Manager user');
      actions.login(poUsers.sales_manager, urls);
      cy.url().should('include', urls.account);
      cy.visit('/');
      cy.wait(3000);
      cy.deleteCustomer();

      // Delete Approver Manager user
      cy.logToTerminal('🗑️ Deleting Approver Manager user');
      actions.login(poUsers.approver_manager, urls);
      cy.url().should('include', urls.account);
      cy.visit('/');
      cy.wait(3000);
      cy.deleteCustomer();

      // Delete approval rules as PO Rules Manager
      cy.logToTerminal('🔐 Login as PO Rules Manager');
      actions.login(poUsers.po_rules_manager, urls);
      cy.logToTerminal(
        '⏳ Waiting for session and permissions to initialize...'
      );
      cy.wait(3000);

      cy.logToTerminal('📄 Navigating to Approval Rules page');
      cy.visit(urls.approvalRules);
      cy.wait(2000);
      cy.reload();
      cy.wait(3000);
      cy.contains(poLabels.approvalRulesHeader).should('be.visible');

      cy.logToTerminal('🗑️ Deleting first approval rule');
      actions.deleteApprovalRule(poApprovalRules.rule1Edited.name);
      cy.wait(3000);

      cy.logToTerminal('🗑️ Deleting second approval rule');
      actions.deleteApprovalRule(poApprovalRules.rule2Edited.name);
      cy.wait(3000);

      cy.logToTerminal('✅ All approval rules deleted successfully');

      // Delete PO Rules Manager user (last one)
      cy.logToTerminal('🗑️ Deleting PO Rules Manager user');
      cy.visit('/');
      cy.wait(3000);
      cy.deleteCustomer();

      // Delete roles AFTER all users are deleted
      cy.then(() => {
        cy.logToTerminal('🗑️ Deleting test roles');
        const poUsersConfig = [
          {
            user: poUsers.po_rules_manager,
            role: poRolesConfig.rulesManager,
            roleId: null,
          },
          {
            user: poUsers.sales_manager,
            role: poRolesConfig.salesManager,
            roleId: null,
          },
          {
            user: poUsers.approver_manager,
            role: poRolesConfig.approver,
            roleId: null,
          },
        ];

        const roleNamesToDelete = poUsersConfig.map(
          (config) => config.role.role_name
        );
        const userEmailsToUnassign = poUsersConfig.map(
          (config) => config.user.email
        );

        cy.logToTerminal(`🗑️ Roles to delete: ${roleNamesToDelete.join(', ')}`);

        cy.wrap(unassignRoles(userEmailsToUnassign), { timeout: 60000 }).then(
          () =>
            cy
              .wrap(deleteCustomerRoles(roleNamesToDelete), { timeout: 60000 })
              .then(() =>
                cy.logToTerminal('✅ All test roles deleted successfully')
              )
        );
      });

      cy.logToTerminal('✅ B2B Purchase Orders test suite completed');
    }
  );
});
