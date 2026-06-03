import { Container } from '@dropins/tools/types/elsie/src/lib';
import { ShareRequisitionListByEmailError } from '../../api/shareRequisitionListByEmail';

export interface ShareRequisitionListContentProps {
    requisitionListUid: string;
    isSubmitting: boolean;
    onSubmit: (customerUids: string[]) => Promise<Array<ShareRequisitionListByEmailError> | null>;
    currentCustomerEmail?: string;
    /**
     * Called with the already-built relative share URL to allow customization (e.g. making it absolute).
     * Example: (relativeUrl) => `${window.location.origin}${relativeUrl}`
     * Falls back to using the relative URL as-is, built from the storefront path in store config.
     */
    routeSharedRequisitionList?: (relativeUrl: string) => string;
}
export declare const ShareRequisitionListContent: Container<ShareRequisitionListContentProps>;
//# sourceMappingURL=ShareRequisitionListContent.d.ts.map