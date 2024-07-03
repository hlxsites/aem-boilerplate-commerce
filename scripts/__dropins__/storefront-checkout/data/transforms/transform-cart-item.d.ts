import { GetCartQuery } from '../../__generated__/types';
import { Item } from '../models';

type CartItemsV2 = NonNullable<GetCartQuery['cart']>['itemsV2'];
type NonNullableCartItemsV2 = NonNullable<CartItemsV2>;
type CartItems = NonNullableCartItemsV2['items'];
export declare function transformCartItems(items: CartItems): Item[];
export declare function transformCartItemsV2(itemsV2: CartItemsV2): Item[];
export {};
//# sourceMappingURL=transform-cart-item.d.ts.map