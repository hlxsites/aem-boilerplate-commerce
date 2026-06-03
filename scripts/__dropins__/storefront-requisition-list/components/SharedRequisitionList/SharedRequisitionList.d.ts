import { FunctionComponent } from 'preact';
import { SharedRequisitionListResult } from '../../api/getSharedRequisitionList';

export type SharedRequisitionListStatus = 'preview_loading' | 'preview_loaded' | 'preview_error' | 'importing' | 'import_success' | 'import_error';
export interface SharedRequisitionListProps {
    status: SharedRequisitionListStatus;
    previewData: SharedRequisitionListResult | null;
    errorMessage: string;
    onImport: () => void;
    translations: {
        loading: string;
        previewTitle: string;
        senderLabel: string;
        listNameLabel: string;
        descriptionLabel: string;
        itemsCountLabel: string;
        importButton: string;
        importingButton: string;
        successImport: string;
        skuHeader: string;
        qtyHeader: string;
        optionsHeader: string;
    };
}
export declare const SharedRequisitionList: FunctionComponent<SharedRequisitionListProps>;
//# sourceMappingURL=SharedRequisitionList.d.ts.map