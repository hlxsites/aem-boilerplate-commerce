/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
