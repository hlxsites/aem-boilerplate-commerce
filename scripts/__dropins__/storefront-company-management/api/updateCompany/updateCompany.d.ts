import { CompanyModel } from '../../data/models/company';
import { UpdateCompanyDto } from '../../types';

/**
 * Updates company profile information with permission-aware field filtering.
 *
 * This function dynamically builds the GraphQL mutation based on user permissions:
 * - Only requests fields the user can view in the response
 * - Only sends fields the user can edit in the mutation
 *
 * **Permissions Required:**
 * - `Magento_Company::edit_account` - To update name, email, legal name, VAT/Tax ID, Reseller ID
 * - `Magento_Company::edit_address` - To update legal address fields
 *
 * **Important:** The dropin UI gates which fields are editable. If neither permission
 * is granted, the submit button is disabled and this function should not be called.
 *
 * @param input - Partial company data to update (only changed fields)
 * @returns Promise resolving to complete updated company object with all current data
 * @throws Error if network request fails or GraphQL returns errors
 *
 * @fires company/updated - Emitted after successful update with new company data
 *
 * @example
 * ```typescript
 * const updated = await updateCompany({
 *   name: 'New Company Name',
 *   legalAddress: {
 *     street: ['456 New St'],
 *     city: 'Los Angeles',
 *     region: { region: 'California', regionCode: 'CA' },
 *     countryCode: 'US',
 *     postcode: '90001'
 *   }
 * });
 * // Event 'company/updated' is emitted with { company: updated }
 * ```
 */
export declare const updateCompany: (input: UpdateCompanyDto) => Promise<CompanyModel>;
//# sourceMappingURL=updateCompany.d.ts.map