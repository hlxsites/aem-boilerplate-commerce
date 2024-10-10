// @ts-nocheck
import { transformCustomerData } from './transform-customer-data';
describe('transformCustomerData', () => {
    test('correctly transforms customer data with all fields present', () => {
        const response = {
            data: {
                customer: {
                    email: 'john.doe@example.com',
                    firstname: 'John',
                    lastname: 'Doe',
                },
            },
        };
        expect(transformCustomerData(response)).toEqual({
            email: 'john.doe@example.com',
            firstname: 'John',
            lastname: 'Doe',
        });
    });
    test('returns empty strings for missing fields', () => {
        const response = {
            data: {
                customer: {
                    email: 'john.doe@example.com',
                },
            },
        };
        expect(transformCustomerData(response)).toEqual({
            email: 'john.doe@example.com',
            firstname: '',
            lastname: '',
        });
    });
    test('handles null or undefined input gracefully', () => {
        expect(transformCustomerData(null)).toEqual({
            email: '',
            firstname: '',
            lastname: '',
        });
        expect(transformCustomerData(undefined)).toEqual({
            email: '',
            firstname: '',
            lastname: '',
        });
    });
    test('handles responses without a data object', () => {
        const response = {};
        expect(transformCustomerData(response)).toEqual({
            email: '',
            firstname: '',
            lastname: '',
        });
    });
});
