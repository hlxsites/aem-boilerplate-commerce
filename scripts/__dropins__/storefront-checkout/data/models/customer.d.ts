import { Address } from '.';

export interface CustomerAddress extends Address {
    id: string;
}
export type Customer = {
    firstName: string;
    lastName: string;
    email: string;
    addresses: CustomerAddress[];
    defaultBillingAddress?: CustomerAddress;
    defaultShippingAddress?: CustomerAddress;
};
//# sourceMappingURL=customer.d.ts.map