import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent } from 'preact';
import { RequisitionList as RequisitionListModel } from '../../data/models/requisitionList';

export interface RequisitionListProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    requisitionList: RequisitionListModel;
}
export declare const RequisitionList: FunctionComponent<RequisitionListProps>;
//# sourceMappingURL=RequisitionList.d.ts.map