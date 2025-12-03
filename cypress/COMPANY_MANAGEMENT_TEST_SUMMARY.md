# Company Management E2E Tests - Quick Reference

## 📊 Test Coverage Summary

| Test File | Tests | Priority | Feature Area |
|-----------|-------|----------|--------------|
| `verifyCompanyRegistration.spec.js` | 6 | P0 | Company Creation (existing) |
| `verifyCompanyProfile.spec.js` | 8 | P0 | View/Edit Company Info |
| `verifyCompanyUsers.spec.js` | 8 | P0 | User Management (CRUD) |
| `verifyCompanyRolesAndPermissions.spec.js` | 8 | P1 | Roles & Permissions |
| `verifyCompanyStructure.spec.js` | 10 | P1 | Organization Hierarchy |
| `verifyCompanySwitcher.spec.js` | 6 | P1 | Multi-Company Context |
| `verifyCompanyCredit.spec.js` | 3 | P2 | Payment on Account |
| **TOTAL** | **49** | - | - |

## 🚀 Quick Start

```bash
# Install dependencies (if needed)
cd cypress && npm install

# Run all Company Management tests
npm run cypress:b2b:saas:run -- --spec "src/tests/b2b/verifyCompany*.spec.js"

# Run specific test file
npx cypress run --spec "src/tests/b2b/verifyCompanyProfile.spec.js"

# Open Cypress UI
npm run cypress:b2b:saas:open
```

## 📋 Test Plan Coverage

### Test Case Mapping

| Test Case | File | Status |
|-----------|------|--------|
| TC-01 | `verifyCompanyRegistration.spec.js` | ✅ Existing (partial) |
| TC-02 | `verifyCompanyRegistration.spec.js` | ✅ Existing |
| TC-03 | `verifyCompanyRegistration.spec.js` | ✅ Existing (mocked) |
| TC-07 | `verifyCompanyProfile.spec.js` | ✅ New |
| TC-09 | `verifyCompanyRegistration.spec.js` | ✅ Existing |
| TC-11 | `verifyCompanyProfile.spec.js` | ✅ New |
| TC-12 | `verifyCompanyProfile.spec.js` | ✅ New |
| TC-13 | `verifyCompanyProfile.spec.js` | ✅ New |
| TC-14 | `verifyCompanyProfile.spec.js` | ✅ New |
| TC-15 | `verifyCompanyUsers.spec.js` | ✅ New |
| TC-16 | `verifyCompanyUsers.spec.js` | ✅ New |
| TC-17 | `verifyCompanyUsers.spec.js` | ✅ New |
| TC-20 | `verifyCompanyUsers.spec.js` | ✅ New |
| TC-22 | `verifyCompanyUsers.spec.js` | ✅ New |
| TC-23 | `verifyCompanyUsers.spec.js` | ✅ New |
| TC-24 | `verifyCompanyUsers.spec.js` | ✅ New |
| TC-26 | `verifyCompanyRolesAndPermissions.spec.js` | ✅ New |
| TC-27 | `verifyCompanyRolesAndPermissions.spec.js` | ✅ New |
| TC-28 | `verifyCompanyRolesAndPermissions.spec.js` | ✅ New |
| TC-29 | `verifyCompanyRolesAndPermissions.spec.js` | ✅ New |
| TC-30 | `verifyCompanyRolesAndPermissions.spec.js` | ✅ New |
| TC-31 | `verifyCompanyRolesAndPermissions.spec.js` | ✅ New |
| TC-32 | `verifyCompanyStructure.spec.js` | ✅ New |
| TC-33 | `verifyCompanyStructure.spec.js` | ✅ New |
| TC-34 | `verifyCompanyStructure.spec.js` | ✅ New |
| TC-35 | `verifyCompanyStructure.spec.js` | ✅ New |
| TC-36 | `verifyCompanyStructure.spec.js` | ✅ New |
| TC-37 | `verifyCompanyStructure.spec.js` | ✅ New |
| TC-38 | `verifyCompanyStructure.spec.js` | ✅ New |
| TC-39 | `verifyCompanyStructure.spec.js` | ✅ New (3 tests) |
| TC-40 | `verifyCompanySwitcher.spec.js` | ✅ New (3 tests) |
| TC-41 | `verifyCompanySwitcher.spec.js` | ✅ New (3 tests) |
| TC-47 | `verifyCompanyCredit.spec.js` | ✅ New |
| TC-47 CASE_3 | `verifyCompanyCredit.spec.js` | ✅ New |
| TC-48 | `verifyCompanyCredit.spec.js` | ✅ New |

## 🎯 What's Covered

### ✅ Fully Automated
- Company registration (existing + new tests)
- Company profile viewing and editing
- User management (add, edit, delete, set inactive)
- Roles and permissions CRUD operations
- Company structure hierarchy management
- Multi-company context switching
- Permission enforcement per company
- Form validation (required fields, formats, special chars)
- Permission boundaries (admin vs user)

### ⚙️ Mocked (Frontend Behavior Testing)
- Store configuration changes (`allow_company_registration`)
- Payment on Account enabled/disabled
- Frontend redirect behavior based on config

### ⏭️ Skipped (Out of Scope)
- Backend configuration changes (no API available)
- Email delivery and invitation link clicking
- Shared Catalog pricing (separate dropin)
- Cart Price Rules (separate dropin)
- Complex credit operations (require Admin Panel)

## 📁 New Files Created

```
cypress/
├── src/
│   ├── support/
│   │   └── b2bCompanyManagementAPICalls.js    ✨ 12 API helpers
│   ├── fixtures/
│   │   └── companyManagementData.js           ✨ Test data
│   └── tests/b2b/
│       ├── verifyCompanyProfile.spec.js       ✨ 8 tests
│       ├── verifyCompanyUsers.spec.js         ✨ 8 tests
│       ├── verifyCompanyRolesAndPermissions.spec.js ✨ 8 tests
│       ├── verifyCompanyStructure.spec.js     ✨ 10 tests
│       ├── verifyCompanySwitcher.spec.js      ✨ 6 tests
│       └── verifyCompanyCredit.spec.js        ✨ 3 tests
├── COMPANY_MANAGEMENT_TESTS.md                 ✨ Full documentation
├── COMPANY_MANAGEMENT_TEST_SUMMARY.md          ✨ Quick reference
├── TEST_COVERAGE_MATRIX.md                     ✨ Coverage matrix
└── API_IMPROVEMENTS.md                         ✨ API audit results
```

## 🔧 API Helpers

New API functions in `b2bCompanyManagementAPICalls.js`:

**Company Operations:**
- `createCompanyViaGraphQL(companyData)` - Create company
- `updateCompanyProfile(companyId, updates)` - Update company ✨

**User Operations:**
- `createUserAndAssignToCompany(userData, companyId)` - Create and assign user
- `updateCompanyUserStatus(customerId, status)` - Set active/inactive ✨ NEW

**Role Operations:**
- `createCompanyRole(roleData)` - Create custom role
- `deleteCompanyRole(roleId)` - Delete role

**Team Operations:**
- `createCompanyTeam(teamData)` - Create team
- `updateCompanyTeam(teamId, updates)` - Update team ✨ NEW
- `deleteCompanyTeam(teamId)` - Delete team ✨ NEW

**Credit Operations:**
- `getCompanyCredit(companyId)` - Get credit info ✨ NEW
- `updateCompanyCredit(companyId, creditData)` - Set credit limit ✨ NEW

## 🧪 Test Data Fixtures

New fixtures in `companyManagementData.js`:

- `baseCompanyData` - Full company data
- `minimalCompanyData` - Required fields only
- `companyUsers` - User templates (regular, manager, viewer)
- `roleData` - Role templates (custom, manager, view-only)
- `teamData` - Team templates (sales, marketing, engineering)
- `companyProfileUpdates` - Update data templates
- `invalidData` - Validation test data

## 🔍 Key Patterns

### 1. API Setup Pattern
```javascript
before(() => {
  cy.wrap(null).then(async () => {
    testCompany = await createCompanyViaGraphQL(companyData);
    testUser = await createUserAndAssignToCompany(userData, companyId);
    cy.wait(5000); // Wait for indexing
  });
});
```

### 2. Permission Testing Pattern
```javascript
// Admin view
cy.visit('/customer/login');
signInUser(adminEmail, password);
cy.contains('button', 'Edit').should('be.visible');

// User view
cy.visit('/customer/login');
signInUser(userEmail, password);
cy.contains('button', 'Edit').should('not.exist');
```

### 3. Company Switcher Pattern
```javascript
cy.get('[data-testid="company-switcher"]')
  .select(companyName);
cy.wait(2000); // Wait for context switch
cy.contains(companySpecificData).should('be.visible');
```

### 4. Form Validation Pattern
```javascript
// Empty field
cy.get('input[name="field"]').clear();
cy.contains('button', 'Save').click();
cy.contains(/required/i).should('be.visible');

// Invalid format
cy.get('input[name="email"]').type('invalid');
cy.contains('button', 'Save').click();
cy.contains(/valid.*email/i).should('be.visible');
```

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Company not found" | Increase wait time after company creation (indexing delay) |
| "User not found" | Verify user assignment API call succeeded, check wait times |
| "Permission denied" | Verify correct user role, check company context |
| Elements not visible | Check `data-testid` attributes match implementation |
| Test data conflicts | Tests use timestamps + random strings (should be unique) |
| API authentication fails | Verify environment variables are set correctly |

## 📊 Expected Results

After running all tests:
- ✅ 49 passing tests (+1 from API improvements)
- ⏱️ Estimated runtime: ~10-15 minutes (with API setup)
- 📝 Test data: Auto-generated (unique per run)
- 🧹 Cleanup: Optional (data doesn't conflict)
- 🚀 **100% Automated** - No documented-only tests!

## 🔗 References

- [Full Documentation](./COMPANY_MANAGEMENT_TESTS.md)
- [Manual Test Plan](https://confluence.corp.adobe.com/...)
- [Existing Company Registration Tests](./src/tests/b2b/verifyCompanyRegistration.spec.js)

## 🎉 Next Steps

1. **Review:** Check test files for any project-specific adjustments
2. **Configure:** Set environment variables for ACCS access
3. **Run:** Execute tests in CI/CD or locally
4. **Monitor:** Check for flaky tests and adjust wait times if needed
5. **Extend:** Add more test cases as features evolve

---

**Created:** December 2024  
**Status:** ✅ Ready for testing  
**Maintainer:** Company Management Team

