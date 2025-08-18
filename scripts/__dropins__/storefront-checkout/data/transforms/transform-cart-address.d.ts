import { CartAddress as CartAddressModel, CartAddressInput as CartAddressInputModel, CartShippingAddress as CartShippingAddressModel, CustomAttribute as CustomAttributeModel } from '../models';
import { CartAddressInput, GetCartQuery } from '../../__generated__/types';

type ShippingAddresses = NonNullable<GetCartQuery['cart']>['shipping_addresses'];
type CartShippingAddress = ShippingAddresses[0];
type NonNullableShippingAddress = NonNullable<CartShippingAddress>;
type CartBillingAddress = NonNullable<GetCartQuery['cart']>['billing_address'];
type NonNullableBillingAddress = NonNullable<CartBillingAddress>;
type CustomAttributes = NonNullableShippingAddress['custom_attributes'] | NonNullableBillingAddress['custom_attributes'];
export declare const transformCustomAttributes: (data: CustomAttributes) => CustomAttributeModel[];
declare const transformCartBillingAddress: (data: CartBillingAddress) => CartAddressModel | undefined;
declare const transformCartShippingAddress: (data: ({
    __typename?: "ShippingCartAddress" | undefined;
    id?: number | null | undefined;
    firstname: string;
    lastname: string;
    company?: string | null | undefined;
    street: (string | null)[];
    city: string;
    postcode?: string | null | undefined;
    vat_id?: string | null | undefined;
    telephone?: string | null | undefined;
    same_as_billing: boolean;
    prefix?: string | null | undefined;
    suffix?: string | null | undefined;
    middlename?: string | null | undefined;
    fax?: string | null | undefined;
    region?: {
        __typename?: "CartAddressRegion" | undefined;
        region_id?: number | null | undefined;
        code?: string | null | undefined;
        label?: string | null | undefined;
    } | null | undefined;
    country: {
        __typename?: "CartAddressCountry" | undefined;
        code: string;
        label: string;
    };
    custom_attributes: ({
        __typename?: "AttributeSelectedOptions" | undefined;
    } | {
        __typename?: "AttributeValue" | undefined;
        code: string;
        value: string;
    } | null)[];
    available_shipping_methods?: ({
        __typename?: "AvailableShippingMethod" | undefined;
        carrier_code: string;
        carrier_title: string;
        error_message?: string | null | undefined;
        method_code?: string | null | undefined;
        method_title?: string | null | undefined;
        amount: {
            __typename?: "Money" | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
            value?: number | null | undefined;
        };
        price_excl_tax: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
        price_incl_tax: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
    } | null)[] | null | undefined;
    selected_shipping_method?: {
        __typename?: "SelectedShippingMethod" | undefined;
        carrier_code: string;
        carrier_title: string;
        method_code: string;
        method_title: string;
        amount: {
            __typename?: "Money" | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
            value?: number | null | undefined;
        };
        price_excl_tax: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
        price_incl_tax: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
    } | null | undefined;
} | null)[]) => CartShippingAddressModel[];
declare const transformCartAddressInput: (address: CartAddressInputModel) => CartAddressInput;
export { CartBillingAddress, CartShippingAddress, transformCartAddressInput, transformCartBillingAddress, transformCartShippingAddress, };
//# sourceMappingURL=transform-cart-address.d.ts.map