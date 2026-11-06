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
export declare const GET_COMPANY_STRUCTURE = "\n  query getCompanyStructure {\n    company {\n      structure {\n        items {\n          id\n          parent_id\n          entity {\n            __typename\n            ... on CompanyTeam {\n              companyTeamId: id\n              structure_id\n              name\n              description\n            }\n            ... on Customer {\n              customerId: id\n              structure_id\n              firstname\n              lastname\n              status\n              job_title\n            }\n          }\n        }\n      }\n    }\n  }\n";
