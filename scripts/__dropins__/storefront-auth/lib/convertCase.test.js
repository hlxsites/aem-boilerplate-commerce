import { convertToCamelCase, convertToSnakeCase, convertKeysCase, } from '@/auth/lib/convertCase';
describe('[Account-LIB] - convertToCamelCase', () => {
    test('should convert snake_case to camelCase', () => {
        expect(convertToCamelCase('example_key')).toBe('exampleKey');
        expect(convertToCamelCase('another_example_key')).toBe('anotherExampleKey');
        expect(convertToCamelCase('singleword')).toBe('singleword');
    });
    test('should return an empty string when given an empty string', () => {
        expect(convertToCamelCase('')).toBe('');
    });
});
describe('[Account-LIB] - convertToSnakeCase', () => {
    test('should convert camelCase to snake_case', () => {
        expect(convertToSnakeCase('exampleKey')).toBe('example_key');
        expect(convertToSnakeCase('anotherExampleKey')).toBe('another_example_key');
        expect(convertToSnakeCase('singleword')).toBe('singleword');
    });
    test('should return an empty string when given an empty string', () => {
        expect(convertToSnakeCase('')).toBe('');
    });
});
describe('[Account-LIB] - convertKeysCase', () => {
    test('should convert keys of an object to camelCase', () => {
        const data = {
            example_key: 'value',
            another_example_key: {
                nested_key: 'nestedValue',
            },
        };
        const result = convertKeysCase(data, 'camelCase');
        expect(result).toEqual({
            exampleKey: 'value',
            anotherExampleKey: {
                nestedKey: 'nestedValue',
            },
        });
    });
    test('should convert keys of an object to snakeCase', () => {
        const data = {
            exampleKey: 'value',
            anotherExampleKey: {
                nestedKey: 'nestedValue',
            },
        };
        const result = convertKeysCase(data, 'snakeCase');
        expect(result).toEqual({
            example_key: 'value',
            another_example_key: {
                nested_key: 'nestedValue',
            },
        });
    });
    test('should handle arrays correctly', () => {
        const data = [
            { example_key: 'value' },
            { another_example_key: 'anotherValue' },
        ];
        const result = convertKeysCase(data, 'camelCase');
        expect(result).toEqual([
            { exampleKey: 'value' },
            { anotherExampleKey: 'anotherValue' },
        ]);
    });
    test('should handle primitive types in arrays', () => {
        const data = [1, 'string', true, null];
        const result = convertKeysCase(data, 'camelCase');
        expect(result).toEqual([1, 'string', true, null]);
    });
    test('should use dictionary if provided', () => {
        const data = {
            example_key: 'value',
        };
        const dictionary = {
            example_key: 'customKey',
        };
        const result = convertKeysCase(data, 'camelCase', dictionary);
        expect(result).toEqual({
            customKey: 'value',
        });
    });
    test('should return original data if not an object or array', () => {
        const data = 'stringValue';
        const result = convertKeysCase(data, 'camelCase');
        expect(result).toBe('stringValue');
    });
    test('should handle primitive types correctly in objects', () => {
        const data = {
            numberKey: 123,
            stringKey: 'test',
            booleanKey: true,
            nullKey: null,
        };
        const result = convertKeysCase(data, 'snakeCase');
        expect(result).toEqual({
            number_key: 123,
            string_key: 'test',
            boolean_key: true,
            null_key: null,
        });
    });
    test('should return element as is if it is a primitive type in array', () => {
        const data = [1, 'string', true, null, { example_key: 'value' }];
        const result = convertKeysCase(data, 'camelCase');
        expect(result).toEqual([1, 'string', true, null, { exampleKey: 'value' }]);
    });
});
