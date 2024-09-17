import { OrderDetails } from '../../data/models';
import { useOrdersListProps } from '../../types';

export declare const useOrdersList: ({ ordersInMinifiedView, minifiedView, pageSize, selectedDate, }: useOrdersListProps) => {
    loading: boolean;
    orderHistoryListItems: OrderDetails[];
    pageInfo: {};
};
//# sourceMappingURL=useOrdersList.d.ts.map