import { CompanyRoleModel } from '../../data/models';
import { GetCompanyRolesOptions } from '../../types/api';

/**
 * Retrieves company roles with pagination support
 * @param options - Pagination options
 * @param options.pageSize - Number of items per page (default: 20)
 * @param options.currentPage - Current page number (default: 1)
 * @returns Promise resolving to array of CompanyRoleModel
 */
export declare function getCompanyRoles(options?: GetCompanyRolesOptions): Promise<CompanyRoleModel[]>;
//# sourceMappingURL=getCompanyRoles.d.ts.map