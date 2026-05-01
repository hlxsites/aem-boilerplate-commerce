import { AdminAssistanceActions } from '../../types';

export interface CustomerDataModelShort {
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: string;
    prefix: string;
    gender: 1 | 2 | string;
    suffix: string;
    email: string;
    createdAt: string;
    allowRemoteShoppingAssistance?: boolean;
    adminAssistanceActions?: AdminAssistanceActions;
    [key: string]: string | boolean | number | undefined | AdminAssistanceActions;
}
export interface AccountModel {
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    phoneNumber?: string;
    countryCode?: string;
    accountId?: string;
    accountType?: string;
    company?: string;
    customerGroup?: string;
}
//# sourceMappingURL=customer.d.ts.map