declare const mockEstimatedTotalsData: {
    estimatedAppliedTaxes: {
        amount: {
            currency: string;
            value: number;
        };
        label: string;
    }[];
    estimatedGrandTotalPrice: {
        currency: string;
        value: number;
    };
    estimatedItems: {
        price: {
            currency: string;
            value: number;
        };
        rowTotal: {
            currency: string;
            value: number;
        };
        rowTotalIncludingTax: {
            currency: string;
            value: number;
        };
        taxedPrice: {
            currency: string;
            value: number;
        };
        uid: string;
    }[];
    estimatedSubtotal: {
        excludingTax: {
            currency: string;
            value: number;
        };
        includingDiscountOnly: {
            currency: string;
            value: number;
        };
        includingTax: {
            currency: string;
            value: number;
        };
    };
    appliedTaxes: {
        amount: {
            currency: string;
            value: number;
        };
        label: string;
    }[];
    estimatedTaxTotal: {
        currency: string;
        value: number;
    };
};
export { mockEstimatedTotalsData };
//# sourceMappingURL=estimatedTotalsData.d.ts.map