import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface PurchaseOrderConfirmationProps extends HTMLAttributes<HTMLDivElement> {
    slots?: {
        PurchaseOrderConfirmationCta?: SlotProps;
    };
    purchaseOrderNumber: string | number;
    routePurchaseOrderDetails: () => string;
    routePrimaryCta: () => string;
}
//# sourceMappingURL=purchaseOrderConfirmationProps.types.d.ts.map