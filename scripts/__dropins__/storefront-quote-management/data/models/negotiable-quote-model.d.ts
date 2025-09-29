export interface NegotiableQuoteModel {
    uid: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    status: NegotiableQuoteStatus;
    buyer: {
        firstname: string;
        lastname: string;
    };
    comments?: {
        uid: string;
        createdAt: string;
        author: {
            firstname: string;
            lastname: string;
        };
    }[];
    items?: {
        product: {
            uid: string;
            sku: string;
            name: string;
            templateId?: string;
            templateName?: string;
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        value: number;
                    };
                };
            };
        };
        quantity: number;
        prices: {
            subtotalExcludingTax: {
                value: number;
            };
            subtotalIncludingTax: {
                value: number;
            };
            subtotalWithDiscountExcludingTax: {
                value: number;
            };
            grandTotal: {
                value: number;
                currency: string;
            };
        };
    }[];
}
export interface NegotiableQuotesListModel {
    items: NegotiableQuoteModel[];
    pageInfo: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
    totalCount: number;
    paginationInfo?: PaginationInfo;
    sortFields?: {
        default: string;
        options: Array<{
            label: string;
            value: string;
        }>;
    };
}
export declare enum NegotiableQuoteStatus {
    SUBMITTED = "SUBMITTED",
    PENDING = "PENDING",
    UPDATED = "UPDATED",
    OPEN = "OPEN",
    ORDERED = "ORDERED",
    CLOSED = "CLOSED",
    DECLINED = "DECLINED",
    EXPIRED = "EXPIRED",
    DRAFT = "DRAFT"
}
export interface PaginationInfo {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    startItem: number;
    endItem: number;
    totalPages: number;
    pageSizeOptions?: number[];
}
//# sourceMappingURL=negotiable-quote-model.d.ts.map