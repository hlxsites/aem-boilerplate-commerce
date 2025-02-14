import { Facet, PageSizeOption, Product, ProductSearchQuery, RedirectRouteFunc } from '../types/interface';

interface WithChildrenProps {
    children?: any;
}
declare const ProductsContextProvider: ({ children }: WithChildrenProps) => import("preact").JSX.Element;
declare const useProducts: () => {
    variables: ProductSearchQuery;
    loading: boolean;
    items: Product[];
    setItems: (items: Product[]) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    totalCount: number;
    setTotalCount: (count: number) => void;
    totalPages: number;
    setTotalPages: (pages: number) => void;
    facets: Facet[];
    setFacets: (facets: Facet[]) => void;
    categoryName: string;
    setCategoryName: (categoryName: string) => void;
    currencySymbol: string;
    setCurrencySymbol: (currencySymbol: string) => void;
    currencyRate: string;
    setCurrencyRate: (currencyRate: string) => void;
    minQueryLength: string | number;
    minQueryLengthReached: boolean;
    setMinQueryLengthReached: (minQueryLengthReached: boolean) => void;
    pageSizeOptions: PageSizeOption[];
    setRoute: RedirectRouteFunc | undefined;
    refineProduct: (optionIds: string[], sku: string) => any;
    pageLoading: boolean;
    setPageLoading: (loading: boolean) => void;
    categoryPath: string | undefined;
    viewType: string;
    setViewType: (viewType: string) => void;
    listViewType: string;
    setListViewType: (viewType: string) => void;
    resolveCartId?: (() => Promise<string | undefined>) | undefined;
    refreshCart?: (() => void) | undefined;
    addToCart?: ((sku: string, options: [], quantity: number) => Promise<void | undefined>) | undefined;
    searchHeaders: any;
    setSearchHeaders: (ccdmContext: any) => void;
};
export { ProductsContextProvider, useProducts };
//# sourceMappingURL=products.d.ts.map