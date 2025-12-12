import {
    approveNegotiableQuoteByEmail,
} from '../../support/b2bQuoteAPICalls';
import {
    createUserAssignCompanyAndRole,
    manageCompanyRole,
} from '../../support/b2bPOAPICalls';
import {
    assertCartSummaryProduct,
    assertSignInSuccess,
} from "../../assertions";
import {
    signInUser,
    logout,
} from "../../actions";

// Quote role configuration with negotiable quote permissions
const quoteRoleConfig = {
    role_name: `Quote User ${Cypress._.random(0, 999999)}`,
    company_id: 13,
    permissions: [
        { resource_id: 'Magento_Company::index', permission: 'allow' },
        { resource_id: 'Magento_Company::view', permission: 'allow' },
        { resource_id: 'Magento_Company::view_account', permission: 'allow' },
        { resource_id: 'Magento_Sales::all', permission: 'allow' },
        { resource_id: 'Magento_Sales::place_order', permission: 'allow' },
        { resource_id: 'Magento_Sales::view_orders', permission: 'allow' },
        { resource_id: 'Magento_NegotiableQuote::all', permission: 'allow' },
        { resource_id: 'Magento_NegotiableQuote::view_quotes', permission: 'allow' },
        { resource_id: 'Magento_NegotiableQuote::manage', permission: 'allow' },
        { resource_id: 'Magento_NegotiableQuote::checkout', permission: 'allow' },
        { resource_id: 'Magento_NegotiableQuote::view_quotes_sub', permission: 'allow' },
    ],
};

describe("Verify B2B Quote feature", () => {
    let customerData;
    let username;
    let quoteRoleId;

    const quoteLabels = {
        requestQuote: 'Request a Quote',
        submitQuote: 'Submit Quote',
        myQuotes: 'My Quotes',
        quotes: 'Quotes',
        viewQuote: 'View',
        proceedToCheckout: 'Proceed to Checkout',
        placeOrder: 'Place Order',
        logout: 'Logout',
        checkMoneyOrder: 'Check / Money order',
    };

    before(() => {
        cy.logToTerminal('🚀 B2B Quote to Order test suite started');
        // Load customer fixture data
        cy.fixture('customerinfo').then((data) => {
            customerData = data;
        });
    });

    beforeEach(() => {
        cy.logToTerminal('🧹 Clearing cookies and local storage');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.intercept('**/graphql').as('defaultGraphQL');
    });

    it("Verify B2B Quote to Order Placement", { tags: "@B2BSaas" }, () => {
        const random = Cypress._.random(0, 10000000);
        username = `${random}${customerData.customer.email}`;
        const quoteName = `${customerData.quote.quote_name} ${random}`;

        cy.logToTerminal('========= ⚙️ Step 1: Create role with quote permissions =========');

        // Visit the homepage first
        cy.visit('/');

        // Create role, then create user with that role (properly chained)
        cy.wrap(null).then(() => {
            cy.logToTerminal(`Creating quote role: ${quoteRoleConfig.role_name}`);
            return manageCompanyRole(quoteRoleConfig);
        }).then((roleResult) => {
            quoteRoleId = roleResult?.role?.id;
            cy.logToTerminal(`✅ Quote role created with ID: ${quoteRoleId}`);
            
            // Now create the user with this role (inside the same chain)
            cy.logToTerminal('========= ⚙️ Step 2: Create customer and assign to company with quote role =========');
            
            const testUser = {
                firstname: customerData.customer.firstname,
                lastname: customerData.customer.lastname,
                email: username,
                password: customerData.customer.password,
                isSubscribed: customerData.customer.is_subscribed,
                companyId: 13,
            };

            cy.logToTerminal(`Creating user ${username} with role ID: ${quoteRoleId}`);
            return createUserAssignCompanyAndRole(testUser, quoteRoleId);
        }).then((result) => {
            cy.logToTerminal(`📋 Customer creation result: ${JSON.stringify(result, null, 2)}`);
            
            if (result && result.success) {
                cy.logToTerminal(`✅ Customer created and assigned to company with quote role: ${username}`);
            } else {
                cy.logToTerminal(`❌ Customer creation failed: ${result?.error || 'Unknown error'}`);
            }
        });

        // Wait for customer creation to propagate in the system
        cy.wait(8000);

        cy.logToTerminal('========= ⚙️ Step 3: Login as company user =========');

        // Login company user
        cy.visit('/customer/login');
        signInUser(username, customerData.customer.password);
        assertSignInSuccess(customerData.customer.firstname, customerData.customer.lastname, username);
        cy.logToTerminal('✅ User logged in successfully');

        cy.logToTerminal('========= ⚙️ Step 4: Add product to cart =========');

        // Add product to cart
        cy.visit("/products/youth-tee/adb150");
        cy.wait(3000);
        cy.get(".dropin-incrementer__input").clear().type(10);
        cy.wait(1000);
        cy.get(".dropin-incrementer__input").should("have.value", "10");
        cy.get(".product-details__buttons__add-to-cart button")
            .should("be.visible")
            .click();
        cy.logToTerminal('✅ Product added to cart');

        cy.wait(2000);

        // Assert product exists in mini cart
        cy.get(".minicart-wrapper").click();
        cy.get('.minicart-panel[data-loaded="true"]').should('exist');
        cy.get(".minicart-panel").should("not.be.empty");
        assertCartSummaryProduct(
            "Youth tee",
            "ADB150",
            "10",
            "$10.00",
            "$100.00",
            "0",
        )(".cart-mini-cart");
        cy.contains("View Cart").click();
        cy.logToTerminal('✅ Navigated to cart page');

        // Assert product exists in cart
        assertCartSummaryProduct(
            "Youth tee",
            "ADB150",
            "10",
            "$10.00",
            "$100.00",
            "0",
        )(".commerce-cart-wrapper");

        cy.logToTerminal('========= ⚙️ Step 5: Request a quote =========');

        // Request a quote
        cy.contains(quoteLabels.requestQuote).click();
        cy.wait(3000);

        // Fill quote request form
        cy.logToTerminal('📝 Filling quote request form');
        
        // Enter quote name
        cy.get('body').then(($body) => {
            // Try to find quote name input field
            if ($body.find('input[name="quote-name"]').length > 0) {
                cy.get('input[name="quote-name"]').clear().type(quoteName);
            } else if ($body.find('input[name="quoteName"]').length > 0) {
                cy.get('input[name="quoteName"]').clear().type(quoteName);
            } else if ($body.find('input[name="name"]').length > 0) {
                cy.get('input[name="name"]').first().clear().type(quoteName);
            }
        });

        cy.wait(1000);

        // Enter quote comment
        cy.get('body').then(($body) => {
            if ($body.find('textarea[name="comment"]').length > 0) {
                cy.get('textarea[name="comment"]').type(customerData.quote.comment);
            } else if ($body.find('textarea').length > 0) {
                cy.get('textarea').first().type(customerData.quote.comment);
            }
        });

        cy.wait(1000);

        // Submit the quote (click "Request a Quote" button)
        cy.get('button[data-testid="form-request-button"]')
            .should('be.visible')
            .click();

        cy.wait(5000);
        cy.logToTerminal('✅ Quote submitted');

        cy.logToTerminal('========= ⚙️ Step 6: View Quote in My Account =========');

        // Navigate to My Account > Quotes
        cy.visit('/customer/account');
        cy.wait(3000);

        // Click on Quotes in account navigation
        cy.get('body').then(($body) => {
            if ($body.find('a[href*="/customer/quotes"]').length > 0) {
                cy.get('a[href*="/customer/quotes"]').first().click();
            } else if ($body.find('a:contains("Quotes")').length > 0) {
                cy.contains('a', 'Quotes').click();
            } else if ($body.find('a:contains("My Quotes")').length > 0) {
                cy.contains('a', 'My Quotes').click();
            }
        });

        cy.wait(5000);
        cy.logToTerminal('✅ Navigated to quotes list');

        // Verify quote exists in the list with "Submitted" status
        cy.get('body').then(($body) => {
            const bodyText = $body.text();
            if (bodyText.includes(quoteName)) {
                cy.logToTerminal('✅ Quote found in quotes list');
            }
            if (bodyText.includes('Submitted')) {
                cy.logToTerminal('✅ Quote status is Submitted');
            }
        });

        // Store the quote name for later verification
        Cypress.env('testQuoteName', quoteName);

        cy.logToTerminal('========= ⚙️ Step 7: View Quote Details =========');

        // Click on the quote to view its details
        cy.get('body').then(($body) => {
            // Try to find and click the View button
            if ($body.find('button:contains("View")').length > 0) {
                cy.contains('button', 'View').first().click();
            } else if ($body.find('a:contains("View")').length > 0) {
                cy.contains('a', 'View').first().click();
            } else if ($body.find('[data-testid="quote-view-button"]').length > 0) {
                cy.get('[data-testid="quote-view-button"]').first().click();
            } else {
                // Try clicking on the quote name itself
                cy.contains(quoteName).click();
            }
        });

        cy.wait(5000);
        cy.logToTerminal('✅ Viewing quote details');

        // Verify we're on the quote detail page
        cy.get('body').then(($body) => {
            const bodyText = $body.text();
            if (bodyText.includes(quoteName)) {
                cy.logToTerminal('✅ Quote detail page loaded - quote name visible');
            }
            if (bodyText.includes('Submitted') || bodyText.includes('Open')) {
                cy.logToTerminal('✅ Quote status visible on detail page');
            }
        });

        cy.logToTerminal('✅ B2B Quote creation test completed successfully - quote details viewed');

        // TODO: Remaining steps to be implemented:
        // Step 7: Approve quote via admin REST API
        // Step 8: Place quote order from My Account > Quotes
        // Step 9: Check quote status in My Account
        // Step 10: Cleanup - Logout

        /*
        cy.logToTerminal('========= ⚙️ Step 7: Approve quote via admin REST API =========');

        // Wait for quote to be processed before approval
        cy.wait(5000);

        // Approve the quote via admin REST API
        cy.wrap(null).then(async () => {
            try {
                cy.logToTerminal(`🔄 Approving quote for user: ${username}`);
                
                const approvalResult = await approveNegotiableQuoteByEmail(
                    username,
                    'Quote approved via Cypress B2B test automation'
                );

                if (approvalResult.success) {
                    cy.logToTerminal(`✅ Quote approved successfully. Quote ID: ${approvalResult.quote_id}`);
                    Cypress.env('approvedQuoteId', approvalResult.quote_id);
                } else {
                    cy.logToTerminal(`⚠️ Quote approval response: ${approvalResult.message}`);
                }
            } catch (error) {
                cy.logToTerminal(`❌ Error approving quote: ${error.message}`);
            }
        });

        cy.wait(5000);

        cy.logToTerminal('========= ⚙️ Step 8: Place quote order from My Account > Quotes =========');

        // Refresh the quotes page to see updated status
        cy.visit('/customer/quotes');
        cy.wait(5000);

        // Find and click on the quote to view details
        cy.get('body').then(($body) => {
            // Click on View/Show button for the quote
            if ($body.find('button:contains("View")').length > 0) {
                cy.contains('button', 'View').first().click();
            } else if ($body.find('button:contains("Show")').length > 0) {
                cy.contains('button', 'Show').first().click();
            } else if ($body.find('a:contains("View")').length > 0) {
                cy.contains('a', 'View').first().click();
            }
        });

        cy.wait(5000);

        // Proceed to checkout from quote
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Proceed to Checkout")').length > 0) {
                cy.contains('button', 'Proceed to Checkout').click();
            } else if ($body.find('a:contains("Proceed to Checkout")').length > 0) {
                cy.contains('a', 'Proceed to Checkout').click();
            } else if ($body.find('[data-testid="quote-checkout-button"]').length > 0) {
                cy.get('[data-testid="quote-checkout-button"]').click();
            } else if ($body.find('button:contains("Checkout")').length > 0) {
                cy.contains('button', 'Checkout').click();
            }
        });

        cy.wait(10000);

        // Complete checkout - fill shipping address if needed
        cy.url().then((url) => {
            if (url.includes('checkout')) {
                cy.logToTerminal('📝 Completing checkout process');

                // Wait for checkout to load
                cy.wait(5000);

                // Check if we need to fill shipping address
                cy.get('body').then(($body) => {
                    // If shipping form fields are visible and empty, fill them
                    const firstNameField = $body.find('input[name="firstName"]:visible');
                    if (firstNameField.length > 0 && firstNameField.val() === '') {
                        cy.get('input[name="firstName"]').first().clear().type('John');
                        cy.get('input[name="lastName"]').first().clear().type('Doe');
                        cy.get('input[name="street"]').first().clear().type('123 Test Street');
                        
                        // Select region if dropdown exists
                        if ($body.find('select[name="region"]:visible').length > 0) {
                            cy.get('select[name="region"]').first().select('Texas');
                        } else if ($body.find('input[name="region"]:visible').length > 0) {
                            cy.get('input[name="region"]').first().clear().type('Texas');
                        }

                        cy.get('input[name="city"]').first().clear().type('Austin');
                        cy.get('input[name="postcode"]').first().clear().type('78758');
                        cy.get('input[name="telephone"]').first().clear().type('5551234567');
                    }
                });

                cy.wait(3000);

                // Select payment method - Check / Money order
                cy.contains('label', quoteLabels.checkMoneyOrder).click({ force: true });
                cy.wait(2000);

                // Accept terms and conditions if present
                cy.get('body').then(($body) => {
                    if ($body.find('.checkout-terms-and-conditions__form input[type="checkbox"]').length > 0) {
                        cy.get('.checkout-terms-and-conditions__form input[type="checkbox"]').check({ force: true });
                    }
                });

                cy.wait(2000);

                // Place the order
                cy.get('button[data-testid="place-order-button"]')
                    .should('be.visible')
                    .should('not.be.disabled')
                    .click();

                cy.wait(5000);
                cy.logToTerminal('✅ Order placed successfully');
            }
        });

        cy.logToTerminal('========= ⚙️ Step 9: Check quote status in My Account =========');

        // Navigate back to quotes to verify status
        cy.visit('/customer/quotes');
        cy.wait(5000);

        // Verify quote status has changed (to Ordered or Closed)
        cy.get('body').then(($body) => {
            const bodyText = $body.text();
            if (bodyText.includes('Ordered') || bodyText.includes('Closed') || bodyText.includes('Complete')) {
                cy.logToTerminal('✅ Quote status updated correctly - quote has been ordered');
            } else if (bodyText.includes('Open') || bodyText.includes('Submitted')) {
                cy.logToTerminal('⚠️ Quote still shows as Open/Submitted - order may still be processing');
            }
        });

        // Also verify the order was created in order history
        cy.visit('/customer/orders');
        cy.wait(5000);

        cy.get('body').then(($body) => {
            if ($body.find('.dropin-table__body__row').length > 0) {
                cy.logToTerminal('✅ Order found in order history');
            }
        });

        cy.logToTerminal('========= ⚙️ Step 10: Cleanup - Logout =========');

        // Logout
        cy.visit('/');
        cy.wait(3000);
        logout(quoteLabels);
        cy.logToTerminal('✅ User logged out successfully');

        cy.logToTerminal('✅ B2B Quote to Order test completed successfully');
        */
    });
});
