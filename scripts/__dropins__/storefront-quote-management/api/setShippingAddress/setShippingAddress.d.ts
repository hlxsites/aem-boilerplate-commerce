import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface AddressInput {
    city: string;
    company?: string;
    countryCode: string;
    firstname: string;
    lastname: string;
    postcode: string;
    region?: string;
    regionId?: number;
    saveInAddressBook?: boolean;
    street: string[];
    telephone: string;
}
export interface SetShippingAddressInput {
    quoteUid: string;
    addressId?: number;
    addressData?: AddressInput;
}
export declare const setShippingAddress: (input: SetShippingAddressInput) => Promise<NegotiableQuoteModel | null>;
//# sourceMappingURL=setShippingAddress.d.ts.map