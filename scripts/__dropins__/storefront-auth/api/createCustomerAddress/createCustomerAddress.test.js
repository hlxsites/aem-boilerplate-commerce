import { createCustomerAddress } from './createCustomerAddress';
import { fetchGraphQl } from '../fetch-graphql';
import { waitFor } from '@adobe/elsie/lib/tests';
import { handleNetworkError } from '@/auth/lib/network-error';
const defaultFormsData = {
    region: {
        region_id: 4,
        region: 'Arizona',
        region_code: 'AZ',
    },
    country_code: 'US',
    street: ['123 Main Street'],
    telephone: '111111177777',
    postcode: '11111',
    city: 'Phoenix',
    firstname: 'Bob',
    lastname: 'Loblaw',
    default_shipping: true,
    default_billing: false,
    company: '',
    middlename: '',
    suffix: '',
    vat_id: '',
    prefix: '',
    country_id: '',
    fax: '',
};
jest.mock('@adobe/fetch-graphql', () => {
    return {
        FetchGraphQL: jest.fn().mockImplementation(() => ({
            getMethods: jest.fn(() => ({
                fetchGraphQl: jest.fn(),
            })),
        })),
    };
});
jest.mock('@/auth/lib/network-error', () => ({
    handleNetworkError: jest.fn(),
}));
describe('[AUTH-API-V2] - createCustomerAddress', () => {
    test('created user address and return customer name', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {
                createCustomerAddress: {
                    firstname: 'Bob',
                },
            },
            errors: [],
        });
        const firstname = await createCustomerAddress(defaultFormsData);
        if (!firstname)
            return '';
        await waitFor(() => {
            expect(firstname).toEqual('Bob');
        });
    });
    test('created user address and return fetch error', async () => {
        fetchGraphQl.mockResolvedValue({
            data: null,
            errors: [{ message: 'Error' }],
        });
        await createCustomerAddress(defaultFormsData);
        expect(handleNetworkError).toHaveBeenCalled();
    });
    test('created user address and return empty user name', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {
                createCustomerAddress: {
                    firstname: null,
                },
            },
            errors: [],
        });
        const firstname = await createCustomerAddress(defaultFormsData);
        await waitFor(() => {
            expect(firstname).toEqual('');
        });
    });
});
