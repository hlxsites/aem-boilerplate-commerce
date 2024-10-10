import { validateAlpha, validateAlphanumeric, validateAlphanumWithSpaces, validateDate, validateEmail, validateNumeric, validationFields, InputValidation, validateUrl, isDateWithinRange, convertTimestampToDate, } from './validationFields';
describe('[Account-LIB] - Validation Functions', () => {
    test('validateNumeric should return true for numeric strings', () => {
        expect(validateNumeric('12345')).toBe(true);
        expect(validateNumeric('abc')).toBe(false);
    });
    test('validateAlphanumWithSpaces should validate alphanumeric strings with spaces', () => {
        expect(validateAlphanumWithSpaces('abc 123')).toBe(true);
        expect(validateAlphanumWithSpaces('abc@123')).toBe(false);
    });
    test('validateAlphanumeric should validate alphanumeric strings', () => {
        expect(validateAlphanumeric('abc123')).toBe(true);
        expect(validateAlphanumeric('abc 123')).toBe(false);
    });
    test('validateAlpha should validate alphabetic strings', () => {
        expect(validateAlpha('abc')).toBe(true);
        expect(validateAlpha('abc123')).toBe(false);
    });
    test('validateEmail should validate email addresses', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('invalid-email')).toBe(false);
    });
    test('validateDate should validate date strings in YYYY-MM-DD format', () => {
        expect(validateDate('2023-09-01')).toBe(true);
        expect(validateDate('01-09-2023')).toBe(false);
    });
    test('validateUrl should validate url', () => {
        expect(validateUrl('ftp://www.example.com')).toBe(true);
        expect(validateUrl('https://www.example.com')).toBe(true);
        expect(validateUrl('htp://invalid-url')).toBe(false);
        expect(validateUrl('www.example.com')).toBe(false);
    });
    test('should return true if the date is within the range', () => {
        const date = '2024-09-12';
        const minTimestamp = 1725148800; // 2024-09-01
        const maxTimestamp = 1725494400; // 2024-09-05
        const result = isDateWithinRange(date, minTimestamp, maxTimestamp);
        expect(result).toBe(false); // 2024-09-01 — 2024-09-05
    });
    test('should correctly convert timestamp to date string in format YYYY-MM-DD', () => {
        const timestamp = '1725148800'; // 2024-09-01
        const result = convertTimestampToDate(timestamp);
        expect(result).toBe('2024-09-01');
    });
});
describe('[Account-LIB] - validationFields', () => {
    let errorsList;
    beforeEach(() => {
        errorsList = {};
    });
    const translations = {
        requiredFieldError: 'Field is required',
        lengthTextError: 'Text length must be between {min} and {max}',
        numericError: 'Only numeric values are allowed',
        alphaNumWithSpacesError: 'Only alphanumeric characters with spaces are allowed',
        alphaNumericError: 'Only alphanumeric characters are allowed',
        alphaError: 'Only alphabetic characters are allowed',
        emailError: 'Invalid email format',
        dateError: 'Invalid date format',
        dateLengthError: 'Date must be between {min} and {max}',
        dateMaxError: 'Date must be less than or equal to {max}.',
        dateMinError: 'Date must be greater than or equal to {min}.',
    };
    test('should return requiredFieldError if field is required and value is empty', () => {
        const configs = {
            validateRules: [],
            customUpperCode: 'testField',
            required: true,
        };
        expect(validationFields('', configs, translations, {})).toEqual({
            testField: translations.requiredFieldError,
        });
    });
    test('should return defaultState if field is required false and value is empty', () => {
        const configs = {
            validateRules: [],
            customUpperCode: 'testField',
            required: false,
        };
        expect(validationFields('', configs, translations, {})).toEqual({
            testField: '',
        });
    });
    test('should return lengthTextError if value length is out of bounds', () => {
        const configs = {
            validateRules: [
                { name: 'MIN_TEXT_LENGTH', value: '5' },
                { name: 'MAX_TEXT_LENGTH', value: '10' },
            ],
            customUpperCode: 'testField',
            required: false,
        };
        expect(validationFields('abc', configs, translations, {})).toEqual({
            testField: translations.lengthTextError
                .replace('{min}', '5')
                .replace('{max}', '10'),
        });
    });
    test('should validate based on provided rules and return corresponding errors', () => {
        const configs = {
            validateRules: [
                { name: 'INPUT_VALIDATION', value: InputValidation.Numeric },
            ],
            customUpperCode: 'testField',
            required: false,
        };
        expect(validationFields('abc', configs, translations, {})).toEqual({
            testField: translations.numericError,
        });
        expect(validationFields('123', configs, translations, {})).toEqual({
            testField: '',
        });
    });
    test('should return defaultFields if no validation rules are provided', () => {
        const configs = {
            validateRules: [],
            customUpperCode: 'testField',
            required: false,
        };
        expect(validationFields('value', configs, translations, {})).toEqual({
            testField: '',
        });
    });
    test('should return appropriate validation error for email', () => {
        const configs = {
            validateRules: [
                { name: 'INPUT_VALIDATION', value: InputValidation.Email },
            ],
            customUpperCode: 'testField',
            required: false,
        };
        expect(validationFields('invalid-email', configs, translations, {})).toEqual({
            testField: translations.emailError,
        });
        expect(validationFields('test@example.com', configs, translations, {})).toEqual({ testField: '' });
    });
    test('should clear error from errorsList when field is valid', () => {
        const validateRulesConfig = {
            MIN_TEXT_LENGTH: '2',
            MAX_TEXT_LENGTH: '10',
            INPUT_VALIDATION: 'Alphanumeric',
        };
        const configs = {
            validateRules: [validateRulesConfig],
            customUpperCode: 'testField',
            required: true,
        };
        errorsList.testField = 'Some previous error';
        const result = validationFields('validValue', configs, translations, errorsList);
        expect(result).toEqual({ testField: '' });
        expect(errorsList).not.toHaveProperty('testField');
    });
    test('should not return validation error if it already exists in errorsList', () => {
        const validateRulesConfig = {
            INPUT_VALIDATION: 'Numeric',
        };
        const configs = {
            validateRules: [validateRulesConfig],
            customUpperCode: 'testField',
            required: false,
        };
        const errorsList = { testField: 'Some existing error' };
        const result = validationFields('abc', configs, translations, errorsList);
        expect(result).toEqual({ testField: '' });
    });
    test('should return dateLengthError if value length is out of bounds', () => {
        const configs = {
            validateRules: [
                { name: 'DATE_RANGE_MIN', value: '1725148800' },
                { name: 'DATE_RANGE_MAX', value: '1725494400' },
            ],
            customUpperCode: 'testField',
            required: false,
        };
        expect(validationFields('2024-09-12', configs, translations, {})).toEqual({
            testField: translations.dateLengthError
                .replace('{min}', '2024-09-01')
                .replace('{max}', '2024-09-05'),
        });
    });
    test('should return dateMaxError', () => {
        const configs = {
            validateRules: [{ name: 'DATE_RANGE_MAX', value: '1725494400' }],
            customUpperCode: 'testField',
            required: false,
        };
        expect(validationFields('2024-09-12', configs, translations, {})).toEqual({
            testField: translations.dateMaxError.replace('{max}', '2024-09-05'),
        });
    });
    test('should return dateMinError', () => {
        const configs = {
            validateRules: [{ name: 'DATE_RANGE_MIN', value: '1725494400' }],
            customUpperCode: 'testField',
            required: false,
        };
        expect(validationFields('2024-09-12', configs, translations, {})).toEqual({
            testField: '',
        });
    });
});
describe('[Account-LIB] - convertTimestampToDate', () => {
    test('should return an empty string for null input', () => {
        expect(convertTimestampToDate(null)).toBe('');
    });
    test('should return an empty string for undefined input', () => {
        expect(convertTimestampToDate(undefined)).toBe('');
    });
    test('should return an empty string for an empty string input', () => {
        expect(convertTimestampToDate('')).toBe('');
    });
    test('should return an empty string for a string with only spaces', () => {
        expect(convertTimestampToDate('   ')).toBe('');
    });
    test('should return an empty string for invalid timestamp string', () => {
        expect(convertTimestampToDate('invalid-timestamp')).toBe('');
    });
    test('should return a formatted date for valid numeric timestamp as string', () => {
        const timestamp = (new Date('2023-10-10T12:00:00Z').getTime() / 1000).toString();
        expect(convertTimestampToDate(timestamp)).toBe('2023-10-10');
    });
    test('should return an empty string for a timestamp that results in an invalid date', () => {
        expect(convertTimestampToDate('999999999999999999999999')).toBe('');
    });
    test('should handle negative timestamp correctly', () => {
        expect(convertTimestampToDate('-1')).toBe('1969-12-31');
    });
});
describe('[Account-LIB] - isDateWithinRange', () => {
    test('should return false for invalid date string', () => {
        expect(isDateWithinRange('invalid-date')).toBe(false);
    });
    test('should return false for a negative timestamp (before 1970)', () => {
        expect(isDateWithinRange('1969-12-31T23:59:59Z')).toBe(false);
    });
    test('should return true for a valid date string', () => {
        expect(isDateWithinRange('2023-10-10T12:00:00Z')).toBe(true);
    });
    test('should return false when date is less than minTimestamp', () => {
        const minTimestamp = new Date('2023-10-10T12:00:00Z').getTime() / 1000;
        expect(isDateWithinRange('2023-10-09T12:00:00Z', minTimestamp)).toBe(false);
    });
    test('should return true when date is greater than or equal to minTimestamp', () => {
        const minTimestamp = new Date('2023-10-10T12:00:00Z').getTime() / 1000;
        expect(isDateWithinRange('2023-10-10T12:00:00Z', minTimestamp)).toBe(true);
    });
    test('should return false when date is greater than maxTimestamp', () => {
        const maxTimestamp = new Date('2023-10-10T12:00:00Z').getTime() / 1000;
        expect(isDateWithinRange('2023-10-11T12:00:00Z', undefined, maxTimestamp)).toBe(false);
    });
    test('should return true when date is less than or equal to maxTimestamp', () => {
        const maxTimestamp = new Date('2023-10-10T12:00:00Z').getTime() / 1000;
        expect(isDateWithinRange('2023-10-10T12:00:00Z', undefined, maxTimestamp)).toBe(true);
    });
    test('should return false when date is less than minTimestamp and greater than maxTimestamp', () => {
        const minTimestamp = new Date('2023-10-10T12:00:00Z').getTime() / 1000;
        const maxTimestamp = new Date('2023-10-11T12:00:00Z').getTime() / 1000;
        expect(isDateWithinRange('2023-10-12T12:00:00Z', minTimestamp, maxTimestamp)).toBe(false);
        expect(isDateWithinRange('2023-10-09T12:00:00Z', minTimestamp, maxTimestamp)).toBe(false);
    });
    test('should return true when date is within the min and max timestamp range', () => {
        const minTimestamp = new Date('2023-10-10T12:00:00Z').getTime() / 1000;
        const maxTimestamp = new Date('2023-10-12T12:00:00Z').getTime() / 1000;
        expect(isDateWithinRange('2023-10-11T12:00:00Z', minTimestamp, maxTimestamp)).toBe(true);
    });
});
