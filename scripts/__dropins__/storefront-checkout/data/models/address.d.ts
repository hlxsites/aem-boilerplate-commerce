import { Country, Region, ShippingMethod } from '.';

export interface Address {
    city: string;
    company?: string;
    country: Country;
    firstName: string;
    lastName: string;
    postCode?: string;
    region?: Region;
    street: string[];
    telephone?: string;
}
export interface ShippingAddress extends Address {
    availableShippingMethods?: ShippingMethod[];
    selectedShippingMethod?: ShippingMethod;
}
//# sourceMappingURL=address.d.ts.map