import { HTMLAttributes } from 'preact/compat';

export interface ConfirmationFormProps extends HTMLAttributes<HTMLDivElement> {
    orderNumber: string | number;
    routePurchaseOrderDetails: () => string;
    routeContinueShopping: () => string;
}
//# sourceMappingURL=confirmationForm.types.d.ts.map