import { OrdersReturnProps } from '../../data/models';

export declare const useReturnsList: () => {
    pageInfo: {
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
    selectedPage: number;
    loading: boolean;
    returnOrderList: [] | OrdersReturnProps[];
    handleSetSelectPage: (value: number) => void;
};
//# sourceMappingURL=useReturnsList.d.ts.map