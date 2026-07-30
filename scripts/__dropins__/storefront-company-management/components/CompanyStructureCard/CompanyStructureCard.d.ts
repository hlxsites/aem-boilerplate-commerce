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
import { FunctionComponent } from 'preact';
import { CompanyStructureCardProps } from '../../types/companyStructure.types';
/**
 * CompanyStructureCard component for managing company organizational structure
 * Displays a tree view of company users and teams with CRUD operations
 *
 * @param permissions - User permissions for editing company structure
 * @param slots - Customizable rendering slots for different parts of the component
 */
export declare const CompanyStructureCard: FunctionComponent<CompanyStructureCardProps>;
