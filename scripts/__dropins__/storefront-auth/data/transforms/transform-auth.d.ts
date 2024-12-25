/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
export declare const loginContext: (ctx: any) => {
    personalEmail: {
        address: any;
    };
    userAccount: {
        login: boolean;
    };
    commerce: {
        commerceScope: {
            storeCode: any;
        };
    };
};
export declare const logoutContext: (ctx: any) => {
    userAccount: {
        logout: boolean;
    };
    commerce: {
        commerceScope: {
            storeCode: any;
        };
    };
};
export declare const createAccountContext: (ctx: any) => {
    personalEmail: {
        address: any;
    };
    userAccount: {
        updateProfile: any;
    };
    commerce: {
        commerceScope: {
            storeCode: any;
        };
    };
};
//# sourceMappingURL=transform-auth.d.ts.map