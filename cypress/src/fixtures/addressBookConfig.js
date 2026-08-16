const random = Cypress._.random(0, 999999);

const VIEWER_ROLE_NAME = `AB Viewer ${random}`;
const CREATOR_ROLE_NAME = `AB Creator ${random}`;
const CREATOR_DEFAULT_ROLE_NAME = `AB Creator Default ${random}`;
const EDITOR_ROLE_NAME = `AB Editor ${random}`;
const DELETER_ROLE_NAME = `AB Deleter ${random}`;
const FULL_ROLE_NAME = `AB Full ${random}`;
const NO_ACCESS_ROLE_NAME = `AB No Access ${random}`;
const USER_PASSWORD = 'Test123!';

export const addressBookLabels = {
  createNew: 'Create new',
  edit: 'Edit',
  remove: 'Remove',
  save: 'Save',
  cancel: 'Cancel',
  addAddress: 'Add address',
  editAddress: 'Edit address',
  noSavedAddresses: 'No saved addresses',
  noPermissionCreate: "You don't have permission to add addresses",
  setDefaultShipping: 'Set as default shipping address',
  setDefaultBilling: 'Set as default billing address',
  shippingAddress: 'Shipping Address',
  billingAddress: 'Billing Address',
  removeConfirm: 'Are you sure you would like to remove this address?',
  logout: 'Logout',
};

export const addressBookUsers = {
  viewer: {
    firstname: `AB Viewer ${random}`,
    lastname: 'Test',
    email: `ab_viewer_${random}@example.com`,
    password: USER_PASSWORD,
  },
  creator: {
    firstname: `AB Creator ${random}`,
    lastname: 'Test',
    email: `ab_creator_${random}@example.com`,
    password: USER_PASSWORD,
  },
  creatorWithDefault: {
    firstname: `AB Creator Default ${random}`,
    lastname: 'Test',
    email: `ab_creator_default_${random}@example.com`,
    password: USER_PASSWORD,
  },
  editor: {
    firstname: `AB Editor ${random}`,
    lastname: 'Test',
    email: `ab_editor_${random}@example.com`,
    password: USER_PASSWORD,
  },
  deleter: {
    firstname: `AB Deleter ${random}`,
    lastname: 'Test',
    email: `ab_deleter_${random}@example.com`,
    password: USER_PASSWORD,
  },
  full: {
    firstname: `AB Full ${random}`,
    lastname: 'Test',
    email: `ab_full_${random}@example.com`,
    password: USER_PASSWORD,
  },
  noAccess: {
    firstname: `AB No Access ${random}`,
    lastname: 'Test',
    email: `ab_no_access_${random}@example.com`,
    password: USER_PASSWORD,
  },
};

// Base permissions every address-book test role needs in order to log in and
// reach `/customer/company` at all (same base set used by poRolesConfig).
const basePermissions = [
  { resource_id: 'Magento_Company::index', permission: 'allow' },
  { resource_id: 'Magento_Company::view', permission: 'allow' },
  { resource_id: 'Magento_Company::view_account', permission: 'allow' },
];

// Real ACL resource IDs for the company address book, confirmed against the
// production dropin bundle (scripts/__dropins__/storefront-account/api.js,
// resolveCompanyAddressPermissions) — NOT guessed from the mocked examples.
const addressBookAcl = {
  view: 'Magento_CompanyAddressStorefrontCompatibility::company_address',
  add: 'Magento_CompanyAddressStorefrontCompatibility::add',
  edit: 'Magento_CompanyAddressStorefrontCompatibility::edit',
  delete: 'Magento_CompanyAddressStorefrontCompatibility::delete',
  default: 'Magento_CompanyAddressStorefrontCompatibility::default',
};

const allow = (resourceId) => ({ resource_id: resourceId, permission: 'allow' });

export const addressBookRolesConfig = {
  // Base view-only access — sees the address book but no create/edit/remove/default actions.
  viewOnly: {
    role_name: VIEWER_ROLE_NAME,
    permissions: [...basePermissions, allow(addressBookAcl.view)],
  },
  // Can create addresses, but cannot mark them as default (default checkbox disabled).
  create: {
    role_name: CREATOR_ROLE_NAME,
    permissions: [...basePermissions, allow(addressBookAcl.view), allow(addressBookAcl.add)],
  },
  // Can create addresses AND set them as default while creating.
  createWithDefault: {
    role_name: CREATOR_DEFAULT_ROLE_NAME,
    permissions: [
      ...basePermissions,
      allow(addressBookAcl.view),
      allow(addressBookAcl.add),
      allow(addressBookAcl.default),
    ],
  },
  // Can edit existing addresses, cannot create or remove.
  edit: {
    role_name: EDITOR_ROLE_NAME,
    permissions: [...basePermissions, allow(addressBookAcl.view), allow(addressBookAcl.edit)],
  },
  // Can remove addresses, cannot create or edit.
  delete: {
    role_name: DELETER_ROLE_NAME,
    permissions: [...basePermissions, allow(addressBookAcl.view), allow(addressBookAcl.delete)],
  },
  // Full access — create, edit, delete, default all allowed.
  full: {
    role_name: FULL_ROLE_NAME,
    permissions: [
      ...basePermissions,
      allow(addressBookAcl.view),
      allow(addressBookAcl.add),
      allow(addressBookAcl.edit),
      allow(addressBookAcl.delete),
      allow(addressBookAcl.default),
    ],
  },
  // No address-book permission at all (base company permissions only) — the
  // module should be fully hidden or show a "no permission" state.
  noAccess: {
    role_name: NO_ACCESS_ROLE_NAME,
    permissions: [...basePermissions],
  },
};

// Address form-fill payloads — field names match the shared `createAddress`
// action / addressInfo.json fixture shape already used by the B2C account suite.
export const addressBookAddresses = {
  shipping: {
    firstName: 'Company',
    lastName: 'Shipping',
    street: '111 Warehouse Way',
    streetMultiline_2: 'Dock 3',
    countryCode: 'US',
    region: 'Texas',
    city: 'Austin',
    telephone: '5125550100',
    postcode: '78758',
    vatId: 'VAT-AB-SHIP',
    defaultShipping: false,
  },
  billing: {
    firstName: 'Company',
    lastName: 'Billing',
    street: '222 Finance Blvd',
    streetMultiline_2: 'Suite 400',
    countryCode: 'US',
    region: 'New York',
    city: 'New York City',
    telephone: '2125550100',
    postcode: '10001',
    vatId: 'VAT-AB-BILL',
    defaultShipping: false,
  },
  edited: {
    firstName: 'Company',
    lastName: 'Shipping Updated',
    street: '999 Updated Warehouse Way',
    streetMultiline_2: 'Dock 3',
    countryCode: 'US',
    region: 'Texas',
    city: 'Austin',
    telephone: '5125550199',
    postcode: '78758',
    vatId: 'VAT-AB-SHIP',
    defaultShipping: false,
  },
};
