import { Company } from '../../types';

/**
 * Assign a child company to a parent company within the company relation hierarchy
 *
 * @param parentCompanyId - The unique ID of the parent company
 * @param childCompanyId - The unique ID of the child company
 * @returns Promise resolving to array of Company objects representing the updated hierarchy
 * @throws {Error} When network errors or GraphQL errors occur
 */
export declare function assignChildCompany(parentCompanyId: string, childCompanyId: string): Promise<Company[]>;
//# sourceMappingURL=assignChildCompany.d.ts.map