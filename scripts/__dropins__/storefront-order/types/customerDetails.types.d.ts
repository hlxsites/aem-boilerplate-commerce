import { OrderDataModel } from '../data/models';

export interface KeysSortOrderProps {
    name: string;
    orderNumber?: number;
    label?: string | null;
}
export interface NormalizeAddressProps extends KeysSortOrderProps {
    value: any;
}
export interface CustomerDetailsProps {
    className?: string;
    paymentIconsMap?: Record<string, string>;
    orderData?: OrderDataModel;
    withHeader?: boolean;
    title?: string;
}
export interface UseCustomerDetails {
    orderData?: OrderDataModel;
}
export interface CustomerDetailsContentProps extends Omit<CustomerDetailsProps, 'orderData' | 'className'> {
    loading: boolean;
    order?: OrderDataModel;
    normalizeAddress?: {
        billingAddress: NormalizeAddressProps[];
        shippingAddress: NormalizeAddressProps[];
    };
}
export interface CustomerAddressesModel {
    firstname?: string;
    lastname?: string;
    city?: string;
    company?: string;
    countryCode?: string;
    region?: {
        region: string;
        regionCode: string;
        regionId: string | number;
    };
    telephone?: string;
    id?: string;
    vatId?: string;
    postcode?: string;
    street?: string;
    street_2?: string;
    defaultShipping?: boolean;
    defaultBilling?: boolean;
}
//# sourceMappingURL=customerDetails.types.d.ts.map