import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent } from 'preact';
import { RequisitionList as RequisitionListModel } from '../../data/models/requisitionList';
import { ModalProps } from '../RequisitionListGridWrapper/RequisitionListGridWrapper';

export interface RequisitionListProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    requisitionList: RequisitionListModel;
    onRemoveBtnClick: (reqList: RequisitionListModel, modalProps: ModalProps) => void;
    onEdit?: (uid: string, defaults: {
        name: string;
        description?: string;
    }) => void;
}
export declare const RequisitionListItem: FunctionComponent<RequisitionListProps>;
//# sourceMappingURL=RequisitionListItem.d.ts.map