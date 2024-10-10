import { mergeFormObjects } from './mergeFormObjects';
describe('[Account-LIB] - mergeFormObjects', () => {
    test('should process object with base keys and custom attributes', () => {
        const input = {
            firstname: 'Smith',
            city: 'New City',
            postcode: '55555',
            station: 'Times Sq - 42 St',
        };
        const expectedOutput = {
            firstname: 'Smith',
            custom_attributes: [
                { attribute_code: 'city', value: 'New City' },
                {
                    attribute_code: 'postcode',
                    value: '55555',
                },
                {
                    attribute_code: 'station',
                    value: 'Times Sq - 42 St',
                },
            ],
        };
        expect(mergeFormObjects(input, true)).toEqual(expectedOutput);
    });
    test('should handle object with only base keys', () => {
        const input = {
            city: 'New City',
            postcode: '55555',
        };
        const expectedOutput = {
            custom_attributes: [
                {
                    attribute_code: 'city',
                    value: 'New City',
                },
                {
                    attribute_code: 'postcode',
                    value: '55555',
                },
            ],
        };
        expect(mergeFormObjects(input, true)).toEqual(expectedOutput);
    });
    test('should handle object with only custom attributes', () => {
        const input = {
            station: 'Times Sq - 42 St',
            services: '507',
        };
        const expectedOutput = {
            custom_attributes: [
                { attribute_code: 'station', value: 'Times Sq - 42 St' },
                { attribute_code: 'services', value: '507' },
            ],
        };
        expect(mergeFormObjects(input, true)).toEqual(expectedOutput);
    });
    test('should return an empty object for empty input', () => {
        const input = {};
        const expectedOutput = {};
        expect(mergeFormObjects(input, false)).toEqual(expectedOutput);
    });
    test('should return  inputs with change gender apiVersion2 === false or true', () => {
        const input = { gender: '1' };
        const expectedOutput = { gender: 1 };
        expect(mergeFormObjects(input, false)).toEqual(expectedOutput);
        expect(mergeFormObjects(input, true)).toEqual(expectedOutput);
    });
});
