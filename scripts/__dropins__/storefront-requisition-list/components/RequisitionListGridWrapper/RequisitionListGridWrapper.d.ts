import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent, VNode } from 'preact';
import { RequisitionList as RequisitionListModel } from '../../data/models/requisitionList';

export interface RequisitionListGridWrapperProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    requisitionLists?: RequisitionListModel[];
    header?: VNode;
}
export declare const RequisitionListGridWrapper: FunctionComponent<RequisitionListGridWrapperProps>;
//# sourceMappingURL=RequisitionListGridWrapper.d.ts.map