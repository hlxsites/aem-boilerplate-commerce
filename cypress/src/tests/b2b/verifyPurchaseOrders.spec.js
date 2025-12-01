import {
  createUserAssignCompanyAndRole,
  manageCompanyRole,
  deleteCompanyRoles,
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
    cy.logToTerminal('🧹 B2B Purchase Orders test suite cleanup');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  // Test 1: Setup roles and users
  it(
    'Setup - Create roles and users',
    { tags: ['@B2BSaas'], retries: 0 },
    () => {
      cy.logToTerminal(
        '========= ⚙️ Test 1: Setup - Creating roles and users =========',
      );

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
            cy.wait(1500);

            return manageCompanyRole(element.role).then((result) => {
              poUsersConfig[index].roleId = result?.role?.id;
              createdRoleIds.push(result?.role?.id);

              cy.logToTerminal(
                `✅ Role created: ${element.role.role_name} | ID: ${result?.role?.id}`,
              );
            });
          });
        }, cy.wrap(null))
        .then(() => {
          Cypress.env('poTestRoleIds', createdRoleIds);
          Cypress.env('poUsersConfig', poUsersConfig);
          cy.logToTerminal(
            `📝 Stored ${createdRoleIds.length} role IDs for cleanup`,
          );
          cy.logToTerminal(
            '⏳ Waiting for roles to be indexed in the system...',
          );
          cy.wait(5000);
        });

      // Create users
      cy.logToTerminal('⚙️ Creating test users & assigning roles');
      poUsersConfig
        .reduce((chain, element) => {
          return chain.then(() => {
            cy.wait(5000);
            return cy.wrap(null).then(() => {
              cy.logToTerminal(
                `Creating user: ${element.user.email} with role ID: ${element.roleId}...`,
              );
              return createUserAssignCompanyAndRole(
                element.user,
                element.roleId,
              ).then(() => {
                cy.logToTerminal(`✅ User crated`);
              });
            });
          });
        }, cy.wrap(null))
        .then(() => {
          cy.logToTerminal(
            '⏳ Waiting for users and permissions to be fully applied in the system...',
          );
          cy.wait(5000);
          cy.logToTerminal('✅ Test 1: Setup completed successfully');
        });
    },
  );

  // Test 2: Manage approval rules
  it(
    'Manage approval rules - Create and edit',
    { tags: ['@B2BSaas'], retries: 0 },
    () => {
      cy.logToTerminal(
        '========= ⚙️ Test 2: Managing approval rules =========',
      );

      cy.logToTerminal(`🔐 Login as PO Rules Manager`);
      actions.login(poUsers.po_rules_manager, urls);

      // Step 1: Create Approval Rule with Grand Total condition
      cy.logToTerminal(
        '📝 STEP 1: Creating Approval Rule with Grand Total condition',
      );

      cy.visit(urls.approvalRules);
      cy.wait(5000);
      cy.contains(poLabels.approvalRulesHeader).should('be.visible');

      cy.get(selectors.poShowButton).contains(poLabels.addNewRule).click();
      cy.contains(poLabels.approvalRuleFormHeader).should('be.visible');

      actions.fillApprovalRuleForm(poApprovalRules.rule1, poLabels);
      cy.get(selectors.poShowButton).contains(poLabels.save).click();

      cy.contains(poLabels.approvalRulesHeader).should('be.visible');
      cy.contains(poApprovalRules.rule1.name).should('be.visible');

      // Step 2: Edit first Approval Rule (Grand Total) to Number of SKUs
      cy.logToTerminal(
        '✏️ STEP 2: Editing first Approval Rule to Number of SKUs condition',
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
        '📝 STEP 3: Creating second Approval Rule with Number of SKUs condition',
      );
      cy.get(selectors.poShowButton).contains(poLabels.addNewRule).click();
      cy.contains(poLabels.approvalRuleFormHeader).should('be.visible');

      actions.fillApprovalRuleForm(poApprovalRules.rule2, poLabels);
      cy.get(selectors.poShowButton).contains(poLabels.save).click();

      cy.contains(poLabels.approvalRulesHeader).should('be.visible');
      cy.contains(poApprovalRules.rule2.name).should('be.visible');

      // Step 4: Edit second Approval Rule (Number of SKUs) to Grand Total
      cy.logToTerminal(
        '✏️ STEP 4: Editing second Approval Rule to Grand Total condition',
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
    },
  );

  // Test 3: Sales Manager - Create first Purchase Order requiring approval
  it(
    'Sales Manager - Create first Purchase Order requiring approval',
    { tags: ['@B2BSaas'], retries: 0 },
    () => {
      cy.logToTerminal(
        '========= ⚙️ Test 3: Sales Manager - Creating first Purchase Order requiring approval =========',
      );

      cy.logToTerminal('🔐 Login as Sales Manager');
      actions.login(poUsers.sales_manager, urls);

      cy.logToTerminal('🛒 Creating first Purchase Order with 2 items');
      actions.createPurchaseOrder(2, false, urls, poLabels);

      cy.logToTerminal('🚪 Logging out Sales Manager');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(poLabels);

      cy.logToTerminal('✅ Test 3: First Purchase Order created successfully');
      cy.logToTerminal('⏳ Waiting for Purchase Order to be indexed...');
      cy.wait(5000);
    },
  );

  // Test 4: Sales Manager - Create second Purchase Order requiring approval
  it(
    'Sales Manager - Create second Purchase Order requiring approval',
    { tags: ['@B2BSaas'], retries: 0 },
    () => {
      cy.logToTerminal(
        '⚙️ Test 4: Sales Manager - Creating second Purchase Order requiring approval',
      );

      cy.logToTerminal('🔐 Login as Sales Manager');
      actions.login(poUsers.sales_manager, urls);

      cy.logToTerminal('🛒 Creating second Purchase Order with 2 items');
      actions.createPurchaseOrder(2, false, urls, poLabels);

      cy.logToTerminal('🚪 Logging out Sales Manager');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(poLabels);

      cy.logToTerminal('✅ Test 4: Second Purchase Order created successfully');
      cy.logToTerminal('⏳ Waiting for Purchase Order to be indexed...');
      cy.wait(5000);
    },
  );

  // Test 5: Approver - Approve and reject Purchase Orders
  it(
    'Approver - Approve and reject Purchase Orders',
    { tags: ['@B2BSaas'] },
    () => {
      cy.logToTerminal(
        '⚙️ Test 5: Approver - Managing Purchase Orders approval',
      );

      cy.logToTerminal('🔐 Login as Approver Manager');
      actions.login(poUsers.approver_manager, urls);

      // Safely parses GraphQL request body, handling JSON, strings, or empty payloads
      const resolveGraphQLPayload = (rawBody) => {
        if (!rawBody) {
          return { operationName: '', query: '' };
        }

        if (typeof rawBody === 'string') {
          try {
            return JSON.parse(rawBody);
          } catch (error) {
            return { operationName: '', query: rawBody };
          }
        }

        return rawBody;
      };

      // Detects purchase-order GraphQL queries and assigns them the alias 'poApprovalList'
      const aliasIfPurchaseOrders = (req) => {
        const { operationName = '', query = '' } = resolveGraphQLPayload(
          req.body,
        );
        const queryText = typeof query === 'string' ? query : '';

        if (
          operationName === 'GET_PURCHASE_ORDERS' ||
          queryText.includes('GET_PURCHASE_ORDERS') ||
          queryText.includes('purchaseOrders') ||
          queryText.includes('customerPurchaseOrders')
        ) {
          req.alias = 'poApprovalList';
        }
      };

      // Intercepts all GraphQL POST/GET calls and applies PO aliasing logic
      cy.intercept('POST', '**/graphql', aliasIfPurchaseOrders);
      cy.intercept('GET', '**/graphql*', aliasIfPurchaseOrders);

      // Waits for the expected number of PO requests using the aliased GraphQL calls
      const waitForPurchaseOrdersRequest = (expectedCount = 1) => {
        const waitNext = (remaining) => {
          if (remaining <= 0) {
            return;
          }

          cy.wait('@poApprovalList', { timeout: 60000 }).then(() => {
            waitNext(remaining - 1);
          });
        };

        waitNext(expectedCount);
      };

      cy.logToTerminal('📄 Navigating to Purchase Orders page');
      cy.visit(urls.purchaseOrders);
      waitForPurchaseOrdersRequest(3);

      // Find and verify Purchase Orders requiring approval
      cy.logToTerminal('🔍 Verifying Purchase Orders requiring approval');
      const checkboxSelector = `${selectors.poCheckbox}:not([disabled]):not([name="selectAll"])`;
      const MAX_APPROVAL_FETCH_ATTEMPTS = 3;
      const APPROVAL_RETRY_DELAY = 10000;

      const waitForPurchaseOrders = (attempt = 1) => {
        cy.get(selectors.poApprovalPOWrapper).within(() => {
          cy.contains('Requires my approval').should('be.visible');
        });

        return cy
          .get(selectors.poApprovalPOWrapper)
          .find(checkboxSelector)
          .then(($checkboxes) => {
            if ($checkboxes.length >= 2) {
              cy.logToTerminal(
                `✅ Found ${$checkboxes.length} Purchase Orders requiring approval`,
              );
              return;
            }

            if (attempt >= MAX_APPROVAL_FETCH_ATTEMPTS) {
              throw new Error(
                `Expected at least 2 Purchase Orders, found ${$checkboxes.length} after ${attempt} attempts`,
              );
            }

            cy.logToTerminal(
              `⏳ Found ${$checkboxes.length} Purchase Orders (need 2). Retrying... [attempt ${attempt}/${MAX_APPROVAL_FETCH_ATTEMPTS}]`,
            );

            cy.wait(APPROVAL_RETRY_DELAY);
            cy.reload();
            waitForPurchaseOrdersRequest(3);
            return waitForPurchaseOrders(attempt + 1);
          });
      };

      waitForPurchaseOrders();

      cy.get(selectors.poApprovalPOWrapper)
        .contains(selectors.poShowButton, poLabels.rejectSelected)
        .should('be.visible');
      cy.get(selectors.poApprovalPOWrapper)
        .contains(selectors.poShowButton, poLabels.approveSelected)
        .should('be.visible');

      // Approve first Purchase Order
      cy.logToTerminal('Approving first Purchase Order...');
      cy.get(selectors.poApprovalPOWrapper)
        .find(checkboxSelector)
        .eq(0)
        .click();
      cy.wait(1500);
      cy.get(selectors.poApprovalPOWrapper)
        .contains(selectors.poShowButton, poLabels.approveSelected)
        .click();

      cy.get('.dropin-in-line-alert--success').should('be.visible');
      cy.logToTerminal('✅ First Purchase Order approved successfully');

      cy.get(selectors.poApprovalPOWrapper)
        .find('.b2b-purchase-order-purchase-orders-table__status')
        .contains('Approval required')
        .should('have.length', 1);
      cy.logToTerminal(
        '✅ Verified that 1 Purchase Order left in approval required list',
      );

      cy.logToTerminal(
        '⏳ Reloading page to refresh DOM after Purchase Order approval...',
      );
      cy.reload();
      cy.wait(5000); // Wait for page reload and data to settle

      // Reject second Purchase Order
      cy.logToTerminal('🗑️ Rejecting second Purchase Order');

      cy.logToTerminal('Rejecting second Purchase Order...');
      cy.get(selectors.poApprovalPOWrapper)
        .find(checkboxSelector)
        .eq(0)
        .should('not.be.disabled')
        .click();
      cy.wait(1500);

      cy.get(selectors.poApprovalPOWrapper)
        .contains(selectors.poShowButton, poLabels.rejectSelected)
        .click();

      cy.get('.dropin-in-line-alert--success').should('be.visible');
      cy.logToTerminal('✅ Second Purchase Order rejected successfully');

      cy.get(selectors.poApprovalPOWrapper)
        .find('.b2b-purchase-order-purchase-orders-table__status')
        .contains('Approval required')
        .should('have.length', 0);
      cy.logToTerminal(
        '✅ Verified that no Purchase Orders left in approval required list',
      );

      cy.logToTerminal('🚪 Logging out Approver Manager');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(poLabels);
      cy.logToTerminal('✅ Test 5: Purchase Orders approved/rejected');
    },
  );

  // Test 6: Approver - View Purchase Order details and add comment
  it(
    'Approver - View Purchase Order details and add comment',
    { tags: ['@B2BSaas'] },
    () => {
      cy.logToTerminal('⚙️ Test 6: Approver - Viewing Purchase Order details');

      cy.logToTerminal('🔐 Login as Approver Manager');
      actions.login(poUsers.approver_manager, urls);

      cy.logToTerminal('📄 Navigating to Purchase Orders page');
      cy.visit(urls.purchaseOrders);
      cy.wait(5000);

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
      cy.logToTerminal('✅ Test 6: Purchase Order details verified');
    },
  );

  // Test 7: Sales Manager - Create auto-approved Purchase Order
  it(
    'Sales Manager - Create auto-approved Purchase Order',
    { tags: ['@B2BSaas'], retries: 0 },
    () => {
      cy.logToTerminal(
        '⚙️ Test 7: Sales Manager - Creating auto-approved Purchase Order',
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
                expect(total).to.be.lessThan(15);
              }
            });
        });

      cy.logToTerminal('🚪 Logging out PO Rules Manager');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(poLabels);
      cy.logToTerminal('✅ Test 7: Auto-approved Purchase Order verified');
    },
  );

  // Test 8: Cleanup - Delete approval rules, users and roles
  it(
    'Cleanup - Delete approval rules, users and roles',
    { tags: ['@B2BSaas'] },
    () => {
      cy.logToTerminal(
        '⚙️ Test 8: Cleanup - Deleting approval rules, users and roles',
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
        '⏳ Waiting for session and permissions to initialize...',
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

      // Delete roles AFTER all users are deleted
      cy.then(() => {
        cy.logToTerminal('🗑️ Deleting test roles');

        const envUsersConfig = Cypress.env('poUsersConfig') || [];
        const roleIdsFromEnv = Cypress.env('poTestRoleIds') || [];

        const poUsersConfig = envUsersConfig.length
          ? envUsersConfig
          : [
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

        // Extract role names for deletion
        const roleNamesToDelete = poUsersConfig
          .map((config) => config.role?.role_name)
          .filter(Boolean);

        const userEmailsToUnassign = poUsersConfig.map(
          (config) => config.user.email,
        );

        cy.logToTerminal(
          `🗑️ Role names to delete: ${roleNamesToDelete.join(', ') || 'none'}`,
        );

        cy.wrap(unassignRoles(userEmailsToUnassign), { timeout: 60000 }).then(
          () => {
            if (!roleNamesToDelete.length) {
              cy.logToTerminal(
                '⚠️ No role names found. Skipping deleteCompanyRoles.',
              );
              return;
            }

            cy.wrap(deleteCompanyRoles(roleNamesToDelete), {
              timeout: 60000,
            }).then(() =>
              cy.logToTerminal('✅ All test roles deleted successfully'),
            );
          },
        );
      });

      cy.logToTerminal('✅ B2B Purchase Orders test suite completed'); // Delete PO Rules Manager user (last one)
      cy.logToTerminal('🗑️ Deleting PO Rules Manager user');
      cy.visit('/');
      cy.wait(3000);
      cy.deleteCustomer();
    },
  );
});
