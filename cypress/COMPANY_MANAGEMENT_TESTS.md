# Company Management E2E Tests

Comprehensive Cypress test suite for Adobe Commerce B2B Company Management functionality.

## Overview

This test suite covers end-to-end testing of the Company Management dropins on a real ACCS (Adobe Commerce Cloud Service) backend. Tests are organized by feature area and follow existing boilerplate patterns.

## Test Files

### 1. `verifyCompanyProfile.spec.js` - **8 tests** (Priority: P0)
Tests for viewing and editing company profile information.

**Test Cases:**
- TC-07: Company created in Admin Panel displays correctly on My Company page
- TC-09: Company created via Storefront displays correctly
- TC-11: Company info block on Account Information page (Admin view)
- TC-11: Company info block on Account Information page (User view)
- TC-12: Company Admin can edit Account Information and Legal Address
- TC-13: Company User with Default User role can view but not edit profile
- Edit form validates required fields (empty, whitespace)
- Edit form validates special characters in company name/legal name

**Coverage:** Company profile viewing, editing, form validation

---

### 2. `verifyCompanyUsers.spec.js` - **8 tests** (Priority: P0)
Tests for managing company users (CRUD operations).

**Test Cases:**
- TC-15: Company Admin can view list of company users in grid
- TC-16: Add user form validation (required fields, email format)
- TC-17: Add new user and verify "invitation sent" message
- TC-20: Admin cannot delete or deactivate themselves
- TC-22: Company Admin can edit their own user data
- TC-23: Company Admin can edit other user data
- TC-24: Set user Inactive via Manage controls
- TC-24: Delete user via Manage controls

**Coverage:** User management grid, add/edit/delete users, permission boundaries, form validation

---

### 3. `verifyCompanyRolesAndPermissions.spec.js` - **8 tests** (Priority: P1)
Tests for managing company roles and permissions.

**Test Cases:**
- TC-26: Default Roles and Permissions state for new company
- TC-27: Duplicate Default User role and delete it
- TC-28: Edit Default Role permissions affects user access to My Company page
- TC-29: Cannot delete role with assigned users
- TC-30: User with "Edit Company Profile" permission can edit
- TC-31: User with "Manage Roles" permission can view/edit roles
- Role form validates required role name
- Role form validates max length (40 characters)

**Coverage:** Roles CRUD, permission system, form validation, access control

---

### 4. `verifyCompanyStructure.spec.js` - **10 tests** (Priority: P1)
Tests for company organizational hierarchy and structure management.

**Test Cases:**
- TC-32: Default Company Structure state and controls
- TC-33: Add new user to structure via "Add User" button
- TC-34: Add user via structure shows invitation flow message
- TC-35: Default User can view but not edit Structure (controls disabled)
- TC-36: Admin can edit their own user from Structure page
- TC-37: Admin can edit other user from Structure page
- TC-38: Remove user from Structure sets user to Inactive
- TC-39: Create new team in structure
- TC-39: Edit team name and description
- TC-39: Delete team without users/teams

**Coverage:** Structure tree view, team management, user hierarchy, drag & drop (documented)

---

### 5. `verifyCompanySwitcher.spec.js` - **6 tests** (Priority: P1)
Tests for multi-company context switching (Company Switcher dropin integration).

**Test Cases:**
- TC-40: Switch company → My Company page shows correct data
- TC-40: Switch company → Company Users grid shows correct users
- TC-40: Switch company → Company Structure shows correct hierarchy
- TC-41: Admin in Company A sees edit controls
- TC-41: Switch to Company B (regular user) → Edit controls hidden
- TC-41: Roles & Permissions respect company context

**Coverage:** Context switching, data isolation, permission enforcement per company

---

### 6. `verifyCompanyCredit.spec.js` - **3 tests** (Priority: P2)
Tests for Company Credit/Payment on Account feature.

**Prerequisites:** Payment on Account must be enabled (mocked in tests)

**Test Cases:**
- TC-47: Company Credit page displays all operation types
- TC-47 CASE_3: Set company credit limit creates Allocation record ✨ NEW
- TC-48: User without Company Credit permission sees restricted access message

**Coverage:** Credit page display, credit limit allocation, permission restrictions, empty state

---

## Total Coverage

- **43 new tests** across 6 test files
- **Plus existing:** 6 tests in `verifyCompanyRegistration.spec.js`
- **Grand Total:** 49 E2E tests for Company Management
- **Automation:** 100% (all tests fully automated)

## Prerequisites

### Environment Setup

1. **ACCS B2B Environment:**
   ```bash
   export CYPRESS_API_ENDPOINT="https://na1-sandbox.api.commerce.adobe.com/..."
   export CYPRESS_IMS_CLIENT_ID="your_client_id"
   export CYPRESS_IMS_ORG_ID="your_org_id"
   export CYPRESS_IMS_CLIENT_SECRET="your_client_secret"
   ```

2. **Backend Configuration (Default Assumptions):**
   - Company Registration: ENABLED
   - Company Features: ENABLED
   - B2B Features: ENABLED
   - Payment on Account: Mocked in tests (optional)

### Required Files

- `src/support/b2bCompanyManagementAPICalls.js` - **12 API helper functions** ✨
- `src/fixtures/companyManagementData.js` - Test data fixtures

**New API Functions Added (Dec 2024):**
- `updateCompanyProfile()` - Update company via REST API
- `updateCompanyUserStatus()` - Set user active/inactive
- `updateCompanyTeam()` - Update team via REST API
- `deleteCompanyTeam()` - Delete team via REST API
- `getCompanyCredit()` - Retrieve credit information
- `updateCompanyCredit()` - Set credit limit (enables TC-47 CASE_3)

## Running the Tests

### Run All Company Management Tests
```bash
cd cypress
npm run cypress:b2b:saas:run -- --spec "src/tests/b2b/verifyCompany*.spec.js"
```

### Run Individual Test Files
```bash
# Company Profile tests
npx cypress run --spec "src/tests/b2b/verifyCompanyProfile.spec.js"

# Company Users tests
npx cypress run --spec "src/tests/b2b/verifyCompanyUsers.spec.js"

# Company Roles tests
npx cypress run --spec "src/tests/b2b/verifyCompanyRolesAndPermissions.spec.js"

# Company Structure tests
npx cypress run --spec "src/tests/b2b/verifyCompanyStructure.spec.js"

# Company Switcher tests
npx cypress run --spec "src/tests/b2b/verifyCompanySwitcher.spec.js"

# Company Credit tests
npx cypress run --spec "src/tests/b2b/verifyCompanyCredit.spec.js"
```

### Run with Cypress UI
```bash
npm run cypress:b2b:saas:open
```

## Test Strategy

### What We Test (Real Backend)
✅ **Core Functionality (90%):**
- Company profile viewing and editing
- User management (add, edit, delete, set inactive)
- Roles and permissions CRUD
- Company structure hierarchy management
- Multi-company context switching
- Permission enforcement

✅ **Form Validation:**
- Required field validation
- Email format validation
- Special character handling
- Max length validation

### What We Mock (Frontend Behavior)
✅ **Configuration Testing (10%):**
- Store config responses (e.g., `allow_company_registration`)
- Payment on Account enabled/disabled
- Frontend redirect behavior based on config

### What We Skip
❌ **Backend Configuration Changes:**
- Cannot change actual backend config via REST API
- Tests assume default configuration (features enabled)

❌ **Email Delivery:**
- No email inbox checking
- No invitation link clicking
- Users are directly activated via API

❌ **Non-Company-Management Features:**
- Shared Catalog pricing (separate dropin)
- Cart Price Rules (separate dropin)
- Checkout flows (separate dropin)

## Test Data Management

### Dynamic Data Generation
All test data uses timestamps and random strings to avoid conflicts:

```javascript
const companyName = `Test Company ${Date.now()}`;
const email = `test.${Date.now()}.${random()}@example.com`;
```

### API-Based Setup
Tests use REST/GraphQL APIs for setup:
- Create companies via GraphQL
- Create and assign users via GraphQL + REST
- Create roles via REST API
- Bypass email invitation flows

### Cleanup
- Test data is unique per run (no conflicts)
- Optional: Implement `after()` hooks for cleanup if needed

## Key Patterns

### 1. API Setup in `before()` Hook
```javascript
before(() => {
  cy.wrap(null).then(async () => {
    testCompany = await createCompanyViaGraphQL(companyData);
    testUser = await createUserAndAssignToCompany(userData, companyId);
    cy.wait(5000); // Wait for indexing
  });
});
```

### 2. Company Switcher Pattern
```javascript
cy.get('[data-testid="company-switcher"]')
  .select(companyName);
cy.wait(2000); // Wait for data reload
```

### 3. Permission Testing Pattern
```javascript
// Login as admin
cy.contains('button', 'Edit').should('be.visible');

// Login as user
cy.contains('button', 'Edit').should('not.exist');
```

### 4. Config Mocking Pattern
```javascript
cy.intercept('POST', '**/graphql', (req) => {
  if (req.body.query?.includes('storeConfig')) {
    req.reply({
      body: { data: { storeConfig: { payment_on_account_enabled: true } } }
    });
  }
});
```

## Troubleshooting

### Common Issues

1. **Setup Failures:**
   - Check API credentials in environment variables
   - Verify network access to ACCS endpoint
   - Check company ID conflicts (use unique names)

2. **Timing Issues:**
   - Increase wait times after API calls (indexing delay)
   - Add explicit waits for GraphQL responses
   - Use `cy.wait('@graphQL')` aliases

3. **Element Not Found:**
   - Check `data-testid` attributes match actual implementation
   - Verify correct page URL
   - Ensure company context is set correctly

4. **Permission Errors:**
   - Verify user role assignments
   - Check company admin vs regular user context
   - Confirm role permissions are correctly set

## CI/CD Integration

### GitHub Actions
Add to `.github/workflows`:

```yaml
- name: Run Company Management E2E Tests
  run: |
    cd cypress
    npm run cypress:b2b:saas:run -- --spec "src/tests/b2b/verifyCompany*.spec.js"
  env:
    CYPRESS_API_ENDPOINT: ${{ secrets.CYPRESS_API_ENDPOINT }}
    CYPRESS_IMS_CLIENT_ID: ${{ secrets.CYPRESS_IMS_CLIENT_ID }}
    CYPRESS_IMS_ORG_ID: ${{ secrets.CYPRESS_IMS_ORG_ID }}
    CYPRESS_IMS_CLIENT_SECRET: ${{ secrets.CYPRESS_IMS_CLIENT_SECRET }}
```

## Related Documentation

- [Company Management Test Plan](https://confluence.corp.adobe.com/...) - Full manual test plan
- [B2B Cypress Setup](./README.md#pre-setup-for-b2b-specific) - Environment setup
- [Company Registration Tests](./src/tests/b2b/verifyCompanyRegistration.spec.js) - Existing company creation tests

## Contributing

When adding new tests:
1. Follow existing naming conventions (`TC-##` for test plan coverage)
2. Use API setup in `before()` hooks
3. Generate unique test data (timestamps + random strings)
4. Add comprehensive logging with `cy.logToTerminal()`
5. Update this README with new test cases

## Support

For issues or questions:
- Check existing test patterns in `verifyPurchaseOrders.spec.js` and `verifyB2BRequisitionLists.spec.js`
- Review API helper functions in `b2bCompanyManagementAPICalls.js`
- Consult [Cypress B2B Documentation](./README.md)

