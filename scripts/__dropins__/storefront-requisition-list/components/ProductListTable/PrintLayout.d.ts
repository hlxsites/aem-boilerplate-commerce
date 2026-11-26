import { RequisitionList } from '../../data/models/requisitionList';
export interface PrintLayoutProps {
    list: RequisitionList;
    useParentConfigurableThumbnail?: boolean;
}
export declare function PrintLayout({ list, useParentConfigurableThumbnail, }: PrintLayoutProps): import("preact").JSX.Element;
