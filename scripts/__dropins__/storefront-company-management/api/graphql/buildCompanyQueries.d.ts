/**
 * Builds a dynamic company query based on user permissions
 */
export declare const buildCompanyQuery: (allowed: Set<string>, isAdmin?: boolean) => string;
/**
 * Builds a dynamic company update mutation based on user permissions
 */
export declare const buildUpdateCompanyMutation: (allowed: Set<string>, isAdmin?: boolean) => string;
/**
 * Builds a dynamic updateCompanyConfig mutation based on user permissions.
 * Config fields (address_book_enabled, custom_shipping_address_enabled) are only
 * ever requested for Company Administrators (isAdmin), since this mutation is
 * exclusively surfaced to that role in the UI.
 */
export declare const buildUpdateCompanyConfigMutation: (allowed: Set<string>, isAdmin?: boolean) => string;
//# sourceMappingURL=buildCompanyQueries.d.ts.map