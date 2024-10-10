// Doc - https://experienceleague.adobe.com/en/docs/commerce-merchant-services/data-connection/event-forwarding/events#signin
export const loginContext = (ctx) => {
    return {
        personalEmail: {
            address: ctx?.email || '',
        },
        userAccount: {
            login: true,
        },
        commerce: {
            commerceScope: {
                storeCode: ctx?.store_code || '',
            },
        },
    };
};
// Doc - https://experienceleague.adobe.com/en/docs/commerce-merchant-services/data-connection/event-forwarding/events#signout
export const logoutContext = (ctx) => {
    return {
        userAccount: {
            logout: true,
        },
        commerce: {
            commerceScope: {
                storeCode: ctx?.store_code || '',
            },
        },
    };
};
// Doc - https://experienceleague.adobe.com/en/docs/commerce-merchant-services/data-connection/event-forwarding/events#createaccount
export const createAccountContext = (ctx) => {
    return {
        personalEmail: {
            address: ctx?.email || '',
        },
        userAccount: {
            updateProfile: ctx?.updateProfile,
        },
        commerce: {
            commerceScope: {
                storeCode: ctx?.store_code || '',
            },
        },
    };
};
