import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface SharedRequisitionListProps {
    /**
     * The share token from the URL (e.g. from ?requisition_id=<token>).
     */
    token: string;
    /**
     * Called with the imported list UID and list name on a successful import.
     * The integration should navigate to the requisition list detail page.
     * Store listName in localStorage so the detail page can show the alert with
     * the correct name after redirect.
     * Example: (uid, listName) => {
     *   localStorage.setItem('requisitionListPendingAlert', JSON.stringify({
     *     action: 'import', type: 'success', context: 'requisitionList', listName,
     *   }));
     *   window.location.href = `/b2b/requisition-list?uid=${uid}`;
     * }
     *
     * Note: this callback is captured at mount time. Pass a stable reference
     * (e.g. a module-level function or a `useCallback` with no deps) so that
     * the closure always holds the correct value.
     */
    routeRequisitionList?: (uid: string, listName: string) => string | void;
}
export declare const SharedRequisitionList: Container<SharedRequisitionListProps>;
//# sourceMappingURL=SharedRequisitionList.d.ts.map