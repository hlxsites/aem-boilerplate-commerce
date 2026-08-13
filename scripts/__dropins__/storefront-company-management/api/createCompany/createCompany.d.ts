import { CompanyRegistrationModel } from '../../data/models/company';

export interface CompanyCreateInput {
    company_name: string;
    company_email: string;
    legal_name?: string;
    vat_tax_id?: string;
    reseller_id?: string;
    legal_address: {
        street: string[];
        city: string;
        region: {
            region_code: string;
            region?: string;
            region_id?: number;
        };
        postcode: string;
        country_id: string;
        telephone?: string;
    };
    company_admin: {
        email: string;
        firstname: string;
        lastname: string;
        job_title?: string;
        telephone?: string;
        gender?: number;
        custom_attributes?: Array<{
            attribute_code: string;
            value: string;
        }>;
    };
}
/**
 * Registers a new B2B company with complete business information.
 *
 * This function handles the entire company registration workflow including:
 * - Company details validation (name, email, legal name, tax IDs)
 * - Legal address validation with country/region support
 * - Company administrator account creation
 * - Email uniqueness validation
 *
 * @param formData - Company registration form data containing company info, legal address, and admin details
 * @returns Promise resolving to registration result with success status, company data, or errors
 *
 * @example
 * ```typescript
 * const result = await createCompany({
 *   company_name: 'Acme Corp',
 *   company_email: 'contact@acme.com',
 *   legal_name: 'Acme Corporation Inc.',
 *   vat_tax_id: 'VAT123456789',
 *   legal_address: {
 *     street: ['123 Main St', 'Suite 100'],
 *     city: 'San Francisco',
 *     region: { region_code: 'CA', region: 'California', region_id: 12 },
 *     postcode: '94105',
 *     country_id: 'US',
 *     telephone: '+1-555-123-4567'
 *   },
 *   company_admin: {
 *     email: 'admin@acme.com',
 *     firstname: 'John',
 *     lastname: 'Doe',
 *     job_title: 'CEO'
 *   }
 * });
 *
 * if (result.success) {
 *   console.log('Company registered:', result.company);
 * } else {
 *   console.error('Registration failed:', result.errors);
 * }
 * ```
 */
export declare const createCompany: (formData: any) => Promise<{
    success: boolean;
    company?: CompanyRegistrationModel;
    errors?: string[];
}>;
//# sourceMappingURL=createCompany.d.ts.map