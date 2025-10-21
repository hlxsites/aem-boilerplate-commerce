import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface PurchaseOrderConfirmationContentProps extends HTMLAttributes<HTMLDivElement> {
    slots?: {
        PurchaseOrderConfirmationCta?: SlotProps;
    };
    purchaseOrderNumber: string | number;
    routePurchaseOrderDetails: () => string;
    routePrimaryCta: () => string;
}
//# sourceMappingURL=purchaseOrderConfirmationContent.types.d.ts.map