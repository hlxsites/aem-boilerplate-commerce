import initializeFormDataAndErrors from './initializeFormDataAndErrors';
describe('[AUTH-LIB] - initializeFormDataAndErrors', () => {
    test('should return empty objects when fieldsConfig is empty', () => {
        const fieldsConfig = [];
        const result = initializeFormDataAndErrors(fieldsConfig);
        expect(result.initialData).toEqual({});
        expect(result.errorList).toEqual({});
    });
    test('should initialize required fields with default values', () => {
        const fieldsConfig = [
            { customUpperCode: 'NAME', required: true, defaultValue: 'John' },
            { customUpperCode: 'AGE', required: true, defaultValue: 30 },
        ];
        const result = initializeFormDataAndErrors(fieldsConfig);
        expect(result.initialData).toEqual({ NAME: 'John', AGE: 30 });
        expect(result.errorList).toEqual({ NAME: '', AGE: '' });
    });
    test('should initialize required fields with empty string if no defaultValue is provided', () => {
        const fieldsConfig = [
            { customUpperCode: 'EMAIL', required: true },
            { customUpperCode: 'PHONE', required: true },
        ];
        const result = initializeFormDataAndErrors(fieldsConfig);
        expect(result.initialData).toEqual({ EMAIL: '', PHONE: '' });
        expect(result.errorList).toEqual({ EMAIL: '', PHONE: '' });
    });
    test('should skip non-required fields in both initialData and errorList', () => {
        const fieldsConfig = [
            { customUpperCode: 'EMAIL', required: true },
            { customUpperCode: 'AGE', required: false, defaultValue: 25 },
        ];
        const result = initializeFormDataAndErrors(fieldsConfig);
        expect(result.initialData).toEqual({ EMAIL: '' });
        expect(result.errorList).toEqual({ EMAIL: '' });
    });
    test('should handle fields with no customUpperCode', () => {
        const fieldsConfig = [
            { required: true, defaultValue: 'Unknown' },
            { customUpperCode: 'AGE', required: true, defaultValue: 30 },
        ];
        const result = initializeFormDataAndErrors(fieldsConfig);
        expect(result.initialData).toEqual({ AGE: 30 });
        expect(result.errorList).toEqual({ AGE: '' });
    });
    test('should work with mixed required and non-required fields', () => {
        const fieldsConfig = [
            { customUpperCode: 'NAME', required: true, defaultValue: 'John' },
            { customUpperCode: 'EMAIL', required: true },
            { customUpperCode: 'AGE', required: false, defaultValue: 30 },
        ];
        const result = initializeFormDataAndErrors(fieldsConfig);
        expect(result.initialData).toEqual({ NAME: 'John', EMAIL: '' });
        expect(result.errorList).toEqual({ NAME: '', EMAIL: '' });
    });
});
