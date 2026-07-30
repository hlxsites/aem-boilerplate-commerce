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
declare module '@adobe-commerce/event-bus' {
    interface Events {
        'company/updated': {
            company?: unknown;
            message?: string;
            error?: unknown;
        };
        'companyStructure/updated': {
            message?: string;
            action?: 'move' | 'remove' | 'add';
            nodeId?: string;
            newParentId?: string;
            nodeIds?: string[];
            nodes?: unknown[];
            error?: unknown;
        };
        'companyContext/changed': string | null | undefined;
    }
}
