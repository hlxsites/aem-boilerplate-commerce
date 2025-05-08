export declare const ELLIPSIS = "...";
type PaginationType = {
    currentPage: number;
    totalPages: number;
    siblingCount?: number;
};
export declare const usePagination: ({ currentPage, totalPages, siblingCount }: PaginationType) => (string | number)[] | undefined;
export {};
//# sourceMappingURL=usePagination.d.ts.map