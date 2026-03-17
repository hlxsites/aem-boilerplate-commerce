import { HTMLAttributes } from 'preact/compat';

export interface SellerAssistedPurchasingProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export interface SellerAssistedPurchasingControlProps {
    loading: boolean;
    isRemoteShoppingAssistanceAvailable: boolean;
    isRemoteShoppingAssistanceEnabled: boolean;
    showAlert: boolean;
    checkboxLabel: string;
    checkboxTooltip: string;
    alertMessage: string;
    featureDisabledMessage: string;
    handleCheckboxChange: (checked: boolean) => void;
    handleDismissAlert: () => void;
    children?: any;
}
export interface UseSellerAssistedPurchasingReturn {
    loading: boolean;
    isRemoteShoppingAssistanceAvailable: boolean;
    isRemoteShoppingAssistanceEnabled: boolean;
    showAlert: boolean;
    handleCheckboxChange: (checked: boolean) => void;
    handleDismissAlert: () => void;
}
//# sourceMappingURL=sellerAssistedPurchasing.types.d.ts.map