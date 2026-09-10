import { CustomerDataModelShort } from '../data/models/customer';
export declare const transformDobCustomer: (customerData: CustomerDataModelShort) => CustomerDataModelShort | (CustomerDataModelShort & {
    dob: string;
});
