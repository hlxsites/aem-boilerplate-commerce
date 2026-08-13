import { CompanyModel } from '../../data/models/company';
import { UpdateCompanyConfigDto } from '../../types';

/**
 * Updates company address book configuration (Company Administrator only).
 *
 * This function dynamically builds the GraphQL mutation based on user permissions/role:
 * - Only requests fields the user can view in the response
 * - Config fields (`address_book_enabled`, `custom_shipping_address_enabled`) are only
 *   requested for Company Administrators, matching the UI gating for this feature
 *
 * **Permissions Required:**
 * - Company Administrator role - the dropin UI only exposes this action to admins
 *
 * @param input - Partial config data to update (only changed fields)
 * @returns Promise resolving to complete updated company object with all current data
 * @throws Error if network request fails or GraphQL returns errors
 *
 * @example
 * ```typescript
 * const updated = await updateCompanyConfig({
 *   addressBookEnabled: true,
 *   customShippingAddressEnabled: false,
 * });
 * ```
 */
export declare const updateCompanyConfig: (input: UpdateCompanyConfigDto) => Promise<CompanyModel>;
//# sourceMappingURL=updateCompanyConfig.d.ts.map