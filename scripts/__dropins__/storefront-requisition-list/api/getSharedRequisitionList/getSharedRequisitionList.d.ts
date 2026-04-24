import { RequisitionList } from '../../data/models/requisitionList';
import { Item } from '../../data/models/item';

export interface SharedRequisitionListResult {
    senderName: string;
    requisitionList: RequisitionList;
}
export declare const getSharedRequisitionList: (token: string, currentPage?: number, pageSize?: number, enrichConfigurableProducts?: ((items: Item[]) => Promise<Item[]>) | undefined) => Promise<SharedRequisitionListResult | null>;
//# sourceMappingURL=getSharedRequisitionList.d.ts.map