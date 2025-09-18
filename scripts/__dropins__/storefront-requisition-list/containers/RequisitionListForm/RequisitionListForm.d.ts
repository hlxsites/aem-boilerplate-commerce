import { Container } from '@dropins/tools/types/elsie/src/lib';
import { RequisitionListFormMode, RequisitionListFormValues } from '../../hooks/useRequisitionListForm';

export interface RequisitionListFormProps {
    mode: RequisitionListFormMode;
    requisitionListUid?: string;
    defaultValues?: RequisitionListFormValues;
    onSuccess?: () => void;
    onError?: (message: string) => void;
    onCancel: () => void;
}
export declare const RequisitionListForm: Container<RequisitionListFormProps>;
//# sourceMappingURL=RequisitionListForm.d.ts.map