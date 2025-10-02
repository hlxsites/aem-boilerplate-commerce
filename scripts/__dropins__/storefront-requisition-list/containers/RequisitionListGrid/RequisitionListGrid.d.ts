import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { RequisitionList as RequisitionListModel } from '../../data/models/requisitionList';

export interface RequisitionListGridProps extends HTMLAttributes<HTMLDivElement> {
    requisitionLists?: RequisitionListModel[] | null;
    slots?: {
        Header?: SlotProps;
    };
}
export declare const RequisitionListGrid: Container<RequisitionListGridProps>;
//# sourceMappingURL=RequisitionListGrid.d.ts.map