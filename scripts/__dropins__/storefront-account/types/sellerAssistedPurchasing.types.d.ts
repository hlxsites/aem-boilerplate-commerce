import { HTMLAttributes } from 'preact/compat';

export interface SellerAssistedPurchasingProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export interface SellerAssistedPurchasingCardProps {
    loading: boolean;
    isFeatureAvailable: boolean;
    isEnabled: boolean;
    showAlert: boolean;
    checkboxLabel: string;
    alertMessage: string;
    featureDisabledMessage: string;
    handleCheckboxChange: (event: Event) => void;
    handleDismissAlert: () => void;
    children?: any;
}
export interface UseSellerAssistedPurchasingReturn {
    loading: boolean;
    isFeatureAvailable: boolean;
    isEnabled: boolean;
    showAlert: boolean;
    handleCheckboxChange: (event: Event) => void;
    handleDismissAlert: () => void;
}
//# sourceMappingURL=sellerAssistedPurchasing.types.d.ts.map