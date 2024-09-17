import { CustomerAddressesModel } from './customer-address';

export type ProductImage = {
    url: string;
};
export type Product = {
    smallImage: ProductImage;
};
export type OrderItem = {
    status: string;
    productName: string;
    id: string;
    product: Product;
};
export type PaymentMethod = {
    name: string;
};
export type MoneyAmount = {
    value: number;
    currency: string;
};
export type Discount = {
    amount: MoneyAmount;
    label: string;
};
export type Tax = {
    amount: MoneyAmount;
    rate: number;
    title: string;
};
export type OrderTotals = {
    discounts: Discount[];
    grandTotal: MoneyAmount;
    subtotal: MoneyAmount;
    taxes: Tax[];
    totalTax: MoneyAmount;
    totalShipping: MoneyAmount;
};
export type OrderDetails = {
    token: string;
    billingAddress: CustomerAddressesModel;
    carrier: string;
    email: string;
    id: string;
    items: OrderItem[];
    number: string;
    orderDate: string;
    paymentMethods: PaymentMethod[];
    shippingAddress: CustomerAddressesModel;
    status: string;
    total: OrderTotals;
};
export type PaginationInfo = {
    currentPage: number;
    pageSize: number;
    totalPages: number;
};
export interface OrderHistory {
    items: OrderDetails[];
    pageInfo: PaginationInfo;
    totalCount: number;
}
//# sourceMappingURL=order-history-list.d.ts.map