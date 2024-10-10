import { confirmEmail } from '@/auth/api/confirmEmail/confirmEmail';
import { fetchGraphQl } from '../fetch-graphql';
import { waitFor } from '@adobe/elsie/lib/tests';
jest.mock('@adobe/fetch-graphql', () => {
    return {
        FetchGraphQL: jest.fn().mockImplementation(() => ({
            getMethods: jest.fn(() => ({
                fetchGraphQl: jest.fn(),
            })),
        })),
    };
});
describe('[AUTH-API] - Confirmation Email Status', () => {
    test('Confirmation Email', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {
                confirmEmail: {
                    customer: {
                        email: 'mail@mail.com',
                    },
                },
            },
            errors: [],
        });
        const response = await confirmEmail({
            customerEmail: '2',
            customerConfirmationKey: '3',
        });
        if (!response)
            return null;
        await waitFor(() => {
            expect(response.data.confirmEmail.customer.email).toEqual('mail@mail.com');
        });
    });
});
