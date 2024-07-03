import { CustomerAddressInput } from '../../__generated__/types';
import { OrderDetails } from '../../reducers';

export type OrderDetailsAddress = OrderDetails['shipping_address'] | OrderDetails['billing_address'];
export declare function transformCustomerAddress(address: OrderDetailsAddress): CustomerAddressInput;
//# sourceMappingURL=transform-customer-address.d.ts.map