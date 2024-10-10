import { fetchGraphQl } from '../fetch-graphql';
import { waitFor } from '@adobe/elsie/lib/tests';
import { transformStoreConfig } from '@/auth/data/transforms';
import { getStoreConfig } from './getStoreConfig';
const mockItems = transformStoreConfig({
    data: {
        storeConfig: {
            customer_access_token_lifetime: 24,
            autocomplete_on_storefront: false,
            create_account_confirmation: false,
            minimum_password_length: 3,
            required_character_classes_number: '1',
        },
    },
});
const mockErrors = [{ message: 'Error 1' }, { message: 'Error 2' }];
jest.mock('@/auth/api/fetch-graphql');
jest.mock('@/auth/api/getStoreConfig');
jest.mock('@adobe/fetch-graphql', () => {
    return {
        FetchGraphQL: jest.fn().mockImplementation(() => ({
            getMethods: jest.fn(() => ({
                fetchGraphQl: jest.fn(),
            })),
        })),
    };
});
describe('[AUTH-API] - Get Store Config', () => {
    test('returns store config', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {
                storeConfig: {
                    customer_access_token_lifetime: 24,
                    autocomplete_on_storefront: false,
                    create_account_confirmation: false,
                    minimum_password_length: 3,
                    required_character_classes_number: 1,
                },
            },
            errors: [],
        });
        const response = await getStoreConfig();
        if (!response)
            return null;
        await waitFor(() => {
            expect(response).toEqual(mockItems);
        });
    });
    test('getStoreConfig handles fetch error', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {},
            errors: mockErrors,
        });
        await expect(getStoreConfig()).rejects.toThrow('Error 1 Error 2');
    });
});
