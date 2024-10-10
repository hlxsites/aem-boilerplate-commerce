import { resendConfirmationEmail } from '@/auth/api/resendConfirmationEmail/resendConfirmationEmail';
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
describe('[AUTH-API] - Resend Confirm Email', () => {
    test('Confirmation Email', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {
                resendConfirmationEmail: true,
            },
            errors: [],
        });
        const response = await resendConfirmationEmail('mail@mail.com');
        if (!response)
            return null;
        await waitFor(() => {
            expect(response.data.resendConfirmationEmail).toEqual(true);
        });
    });
    test('Error Confirmation Email', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {
                resendConfirmationEmail: false,
            },
            errors: [{ message: "email doesn't exist" }],
        });
        const response = await resendConfirmationEmail('mail@mail.com');
        if (!response)
            return null;
        await waitFor(() => {
            expect(response.errors).toEqual([
                {
                    message: "email doesn't exist",
                },
            ]);
        });
    });
});
