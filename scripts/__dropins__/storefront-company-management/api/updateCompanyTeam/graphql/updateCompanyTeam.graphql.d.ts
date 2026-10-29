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
export declare const UPDATE_COMPANY_TEAM = "\n  mutation updateCompanyTeam($input: CompanyTeamUpdateInput!) {\n    updateCompanyTeam(input: $input) {\n      __typename\n      team {\n        id\n        name\n      }\n    }\n  }\n";
