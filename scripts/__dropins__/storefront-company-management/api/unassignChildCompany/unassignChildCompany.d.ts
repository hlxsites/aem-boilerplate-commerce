import { Company } from '../../types';

/**
 * Unassign a child company from its parent company within the company relation hierarchy
 *
 * @param childCompanyId - The unique ID of the child company to unassign
 * @returns Promise resolving to array of Company objects representing the updated hierarchy
 * @throws {Error} When network errors or GraphQL errors occur
 */
export declare function unassignChildCompany(childCompanyId: string): Promise<Company[]>;
//# sourceMappingURL=unassignChildCompany.d.ts.map