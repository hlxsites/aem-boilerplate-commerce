import { COOKIE_LIFETIME } from '@/auth/configs/cookieConfigs';
export const transformStoreConfig = (response) => {
    return {
        autocompleteOnStorefront: response?.data?.storeConfig?.autocomplete_on_storefront || false,
        // Need information about min length in response undefined
        minLength: response?.data?.storeConfig?.minimum_password_length || 3,
        requiredCharacterClasses: +response?.data?.storeConfig?.required_character_classes_number || 0,
        createAccountConfirmation: response?.data?.storeConfig?.create_account_confirmation || false,
        customerAccessTokenLifetime: response?.data?.storeConfig?.customer_access_token_lifetime *
            COOKIE_LIFETIME || COOKIE_LIFETIME,
    };
};
