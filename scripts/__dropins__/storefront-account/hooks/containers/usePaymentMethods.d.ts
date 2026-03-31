import { StoredPaymentMethodDisplay } from '../../data/models/stored-payment-method';

export declare const usePaymentMethods: (filterPaymentMethodCodes?: string[]) => {
    items: StoredPaymentMethodDisplay[];
    loading: boolean;
    loadError: string | null;
    actionError: string | null;
    removingHash: string | null;
    removeToken: (publicHash: string) => Promise<void>;
    refetch: () => Promise<void>;
};
//# sourceMappingURL=usePaymentMethods.d.ts.map