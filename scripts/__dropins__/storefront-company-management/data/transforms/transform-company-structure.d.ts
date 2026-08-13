/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
import type { CompanyStructureNode } from '../models/company-structure';
interface CompanyStructureResponse {
    items: CompanyStructureItemResponse[];
}
interface CompanyStructureItemResponse {
    id: string;
    parent_id: string | null;
    entity: {
        __typename: 'CompanyTeam' | 'Customer';
        companyTeamId?: string;
        customerId?: string;
        structure_id: string;
        firstname?: string;
        lastname?: string;
        status?: 'ACTIVE' | 'INACTIVE';
        job_title?: string | null;
        name?: string;
        description?: string | null;
    };
}
export declare function transformCompanyStructure(response: CompanyStructureResponse): CompanyStructureNode[];
export {};
