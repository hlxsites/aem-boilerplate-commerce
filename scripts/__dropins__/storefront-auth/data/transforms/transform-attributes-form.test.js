// @ts-nocheck
import { cloneArrayIfExists, transformAttributesForm, } from './transform-attributes-form';
const getMockResponse = (items = []) => {
    return {
        data: {
            attributesForm: items.length ? items : null,
        },
    };
};
describe('[Account-Transform] - transformAttributesForm', () => {
    test('returns errors if present', () => {
        expect(transformAttributesForm(getMockResponse())).toEqual([]);
    });
    test('return correct data after transform', () => {
        expect(transformAttributesForm({
            data: {
                attributesForm: {
                    items: [
                        {
                            frontend_input: 'TEXT',
                            required: true,
                            label: 'First Name',
                            sort_order: 20,
                            name: 'country_id',
                            id: 'country_id',
                            code: 'country_id',
                            options: [],
                        },
                        {
                            frontend_input: 'TEXT',
                            required: true,
                            label: 'First Name',
                            sort_order: 20,
                            name: 'firstname',
                            id: 'firstname',
                            code: 'firstname',
                            options: [],
                        },
                        {
                            frontend_input: 'SELECT',
                            required: true,
                            label: 'Select label',
                            sort_order: 20,
                            name: 'select',
                            id: 'select',
                            code: 'select',
                            options: [
                                { is_default: 'true', label: 'select', value: 'select' },
                            ],
                        },
                    ],
                },
            },
        })).toEqual([
            {
                fieldType: 'TEXT',
                required: true,
                label: 'First Name',
                orderNumber: 20,
                name: 'country_code',
                id: 'country_code',
                code: 'country_code',
                customUpperCode: 'countryCode',
                options: [],
            },
            {
                fieldType: 'TEXT',
                required: true,
                label: 'First Name',
                orderNumber: 20,
                name: 'firstname',
                id: 'firstname',
                code: 'firstname',
                customUpperCode: 'firstName',
                options: [],
            },
            {
                fieldType: 'SELECT',
                required: true,
                label: 'Select label',
                orderNumber: 20,
                name: 'select',
                id: 'select',
                code: 'select',
                options: [{ isDefault: 'true', text: 'select', value: 'select' }],
                customUpperCode: 'select',
            },
        ]);
    });
});
describe('cloneArrayIfExists', () => {
    test('returns an empty array if the input array is empty', () => {
        const result = cloneArrayIfExists([]);
        expect(result).toEqual([]);
    });
    test('returns an empty array if multilineCount is less than 2', () => {
        const fields = [
            {
                frontend_input: 'MULTILINE',
                multiline_count: 1,
                code: 'code1',
                name: 'name1',
                id: 'id1',
            },
            {
                frontend_input: 'MULTILINE',
                multiline_count: 1,
                code: 'code2',
                name: 'name2',
                id: 'id2',
            },
        ];
        const result = cloneArrayIfExists(fields);
        expect(result).toEqual([]);
    });
    test('clones elements if fieldType is MULTILINE and multilineCount is greater than or equal to 2', () => {
        const fields = [
            {
                frontend_input: 'MULTILINE',
                multiline_count: 3,
                code: 'code1',
                name: 'name1',
                id: 'id1',
            },
            {
                frontend_input: 'MULTILINE',
                multiline_count: 2,
                code: 'code2',
                name: 'name2',
                id: 'id2',
            },
        ];
        const result = cloneArrayIfExists(fields);
        expect(result).toEqual([
            {
                frontend_input: 'MULTILINE',
                multiline_count: 3,
                code: 'code1_multiline_2',
                name: 'code1_multiline_2',
                id: 'code1_multiline_2',
                is_required: false,
            },
            {
                frontend_input: 'MULTILINE',
                multiline_count: 3,
                code: 'code1_multiline_3',
                name: 'code1_multiline_3',
                id: 'code1_multiline_3',
                is_required: false,
            },
            {
                frontend_input: 'MULTILINE',
                multiline_count: 2,
                code: 'code2_multiline_2',
                name: 'code2_multiline_2',
                id: 'code2_multiline_2',
                is_required: false,
            },
        ]);
    });
});
