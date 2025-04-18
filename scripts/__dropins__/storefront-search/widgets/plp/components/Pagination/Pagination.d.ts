import { FunctionComponent } from 'preact';

interface PaginationProps {
    onPageChange: (page: number | string) => void;
    totalPages: number;
    currentPage: number;
}
export declare const Pagination: FunctionComponent<PaginationProps>;
export default Pagination;
//# sourceMappingURL=Pagination.d.ts.map