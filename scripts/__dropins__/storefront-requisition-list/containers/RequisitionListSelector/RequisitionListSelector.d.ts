import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { RequisitionList } from '../../data/models/requisitionList.js';

/**
 * Handles requisitionLists/data payload: updates setter when payload is truthy.
 * Exported for unit tests so coverage attributes the branch to a direct test.
 */
export declare function applyRequisitionListsDataPayload(payload: RequisitionList[] | null, setLists: (lists: RequisitionList[]) => void): void;
export interface RequisitionListSelectorProps extends HTMLAttributes<HTMLDivElement> {
    canCreate?: boolean;
    sku: string;
    selectedOptions?: string[];
    quantity?: number;
    matchBySKU?: boolean;
    beforeAddProdToReqList?: () => Promise<void> | void;
}
export declare const RequisitionListSelector: Container<RequisitionListSelectorProps>;
//# sourceMappingURL=RequisitionListSelector.d.ts.map