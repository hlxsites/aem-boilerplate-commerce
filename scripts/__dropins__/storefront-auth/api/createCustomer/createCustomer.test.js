import { createCustomer } from '@/auth/api/createCustomer';
jest.mock('@adobe/recaptcha', () => ({
    verifyReCaptcha: jest.fn().mockResolvedValue('token'),
}));
jest.mock('@/auth/lib/setReCaptchaToken');
const defaultFormsData = {
    firstname: 'Bob',
    lastname: 'Loblaw',
    email: 'bobloblaw@example.com',
    password: 'b0bl0bl@w',
    is_subscribed: true,
};
// that return an object with a `fetchGraphQl` method that returns a promise
jest.mock('@adobe/fetch-graphql', () => {
    return {
        FetchGraphQL: jest.fn().mockImplementation(() => ({
            getMethods: jest.fn(() => ({
                fetchGraphQl: jest.fn(() => Promise.resolve({
                    data: {
                        createCustomer: {
                            customer: {
                                firstname: 'Bob',
                                lastname: 'Loblaw',
                                email: 'bobloblaw@example.com',
                                password: 'b0bl0bl@w',
                                is_subscribed: true,
                            },
                        },
                    },
                })),
            })),
        })),
    };
});
describe('[AUTH-API-V1] - Create Customer', () => {
    test('returns customer', async () => {
        const { data } = await createCustomer(defaultFormsData, false);
        expect(data?.createCustomer?.customer).toEqual({
            firstname: 'Bob',
            lastname: 'Loblaw',
            email: 'bobloblaw@example.com',
            password: 'b0bl0bl@w',
            is_subscribed: true,
        });
    });
});
describe('[AUTH-API-V2] - Create Customer', () => {
    test('returns customer', async () => {
        const { data } = await createCustomer({
            ...defaultFormsData,
            custom_attributes: [{ company_name_demo: 'Hello' }],
        }, true);
        expect({
            ...data?.createCustomer?.customer,
            custom_attributes: [{ company_name_demo: 'Hello' }],
        }).toEqual({
            firstname: 'Bob',
            lastname: 'Loblaw',
            email: 'bobloblaw@example.com',
            password: 'b0bl0bl@w',
            is_subscribed: true,
            custom_attributes: [{ company_name_demo: 'Hello' }],
        });
    });
});
