// @ts-nocheck
import { transformStoreConfig } from './transform-store-config';
describe('transformStoreConfig', () => {
    test('returns default values for undefined response', () => {
        expect(transformStoreConfig(undefined)).toEqual({
            autocompleteOnStorefront: false,
            minLength: 3,
            requiredCharacterClasses: 0,
            createAccountConfirmation: false,
            customerAccessTokenLifetime: 3600,
        });
    });
    test('processes complete and correct response correctly', () => {
        const response = {
            data: {
                storeConfig: {
                    autocomplete_on_storefront: true,
                    minimum_password_length: 8,
                    required_character_classes_number: 3,
                    create_account_confirmation: true,
                    customer_access_token_lifetime: 1,
                },
            },
        };
        expect(transformStoreConfig(response)).toEqual({
            autocompleteOnStorefront: true,
            minLength: 8,
            requiredCharacterClasses: 3,
            createAccountConfirmation: true,
            customerAccessTokenLifetime: 3600,
        });
    });
    test('handles missing `data` property', () => {
        const response = {};
        expect(transformStoreConfig(response)).toEqual({
            autocompleteOnStorefront: false,
            minLength: 3,
            requiredCharacterClasses: 0,
            createAccountConfirmation: false,
            customerAccessTokenLifetime: 3600,
        });
    });
});
