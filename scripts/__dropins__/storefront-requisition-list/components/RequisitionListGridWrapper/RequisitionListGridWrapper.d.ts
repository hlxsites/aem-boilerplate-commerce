import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent, VNode } from 'preact';
import { RequisitionLists as RequisitionListsModel } from '../../data/models/requisitionLists';

export interface RequisitionListGridWrapperProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    requisitionLists?: RequisitionListsModel;
    isLoading?: boolean;
    addReqList?: boolean;
    header?: VNode;
}
export declare const RequisitionListGridWrapper: FunctionComponent<RequisitionListGridWrapperProps>;
//# sourceMappingURL=RequisitionListGridWrapper.d.ts.map