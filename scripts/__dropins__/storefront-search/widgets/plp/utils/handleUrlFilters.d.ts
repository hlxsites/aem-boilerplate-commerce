import { SearchClauseInput } from '../types';

declare const addUrlFilter: (filter: SearchClauseInput) => void;
declare const removeUrlFilter: (name: string, option?: string) => void;
declare const removeAllUrlFilters: () => void;
declare const handleUrlSort: (sortOption: string) => void;
declare const handleViewType: (viewType: string) => void;
declare const handleUrlPageSize: (pageSizeOption: number) => void;
declare const handleUrlPagination: (pageNumber: number) => void;
declare const getFiltersFromUrl: (filterableAttributes: string[]) => SearchClauseInput[];
declare const getValueFromUrl: (param: string) => string;
export { addUrlFilter, getFiltersFromUrl, getValueFromUrl, handleUrlPageSize, handleUrlPagination, handleUrlSort, handleViewType, removeAllUrlFilters, removeUrlFilter, };
//# sourceMappingURL=handleUrlFilters.d.ts.map