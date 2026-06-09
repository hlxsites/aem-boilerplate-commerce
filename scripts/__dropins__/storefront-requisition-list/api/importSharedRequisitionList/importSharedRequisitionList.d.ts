import { RequisitionList } from '../../data/models/requisitionList';

export interface ImportSharedRequisitionListUserError {
    message: string;
    code: string;
}
export interface ImportSharedRequisitionListResult {
    requisitionList: RequisitionList | null;
    userErrors: ImportSharedRequisitionListUserError[];
}
export declare const importSharedRequisitionList: (token: string) => Promise<ImportSharedRequisitionListResult>;
//# sourceMappingURL=importSharedRequisitionList.d.ts.map