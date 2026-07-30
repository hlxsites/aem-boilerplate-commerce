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
import { Container } from '@dropins/tools/lib';
export interface SharedRequisitionListProps {
    /**
     * The share token from the URL (e.g. from ?requisition_id=<token>).
     */
    token: string;
    /**
     * Called with the imported list UID and list name on a successful import.
     * The integration should navigate to the requisition list detail page.
     *
     * Note: this callback is captured at mount time. Pass a stable reference
     * (e.g. a module-level function or a `useCallback` with no deps) so that
     * the closure always holds the correct value.
     */
    routeRequisitionList?: (uid: string, listName: string) => string | void;
}
export declare const SharedRequisitionList: Container<SharedRequisitionListProps>;
