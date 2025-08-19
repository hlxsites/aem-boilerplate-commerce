import { CustomAttribute } from './custom-attribute';

export interface CartAddressInput {
    city: string;
    company?: string;
    countryCode: string;
    customAttributes: CustomAttribute[];
    firstName: string;
    lastName: string;
    postcode?: string;
    region?: string;
    regionId?: number;
    saveInAddressBook?: boolean;
    street: string[];
    telephone?: string;
    vatId?: string;
    prefix?: string;
    suffix?: string;
    middleName?: string;
    fax?: string;
}
export interface ShippingAddressInput {
    address?: CartAddressInput;
    customerAddressId?: number;
    pickupLocationCode?: string;
}
export interface BillingAddressInput {
    address?: CartAddressInput;
    customerAddressId?: number;
    sameAsShipping?: boolean;
    useForShipping?: boolean;
}
//# sourceMappingURL=api.d.ts.map