import { getAttributesForm } from '@/auth/api/getAttributesForm';
import { fetchGraphQl } from '../fetch-graphql';
import { waitFor } from '@adobe/elsie/lib/tests';
import { transformAttributesForm } from '@/auth/data/transforms';
const mockItems = transformAttributesForm({
    data: {
        attributesForm: {
            items: [
                {
                    code: 'firstname',
                    default_value: null,
                    entity_type: 'CUSTOMER',
                    frontend_class: null,
                    frontend_input: 'TEXT',
                    is_required: true,
                    is_unique: false,
                    label: 'First Name',
                    options: [],
                    sort_order: 1,
                    multiline_count: 1,
                },
                {
                    code: 'lastname',
                    default_value: null,
                    entity_type: 'CUSTOMER',
                    frontend_class: null,
                    frontend_input: 'TEXT',
                    is_required: true,
                    is_unique: false,
                    label: 'Last Name',
                    options: [],
                    sort_order: 1,
                    multiline_count: 1,
                },
                {
                    code: 'email',
                    default_value: null,
                    entity_type: 'CUSTOMER',
                    frontend_class: null,
                    frontend_input: 'TEXT',
                    is_required: true,
                    is_unique: false,
                    label: 'Email',
                    options: [],
                    sort_order: 1,
                    multiline_count: 1,
                },
            ],
        },
    },
});
const mockErrors = [{ message: 'Error 1' }, { message: 'Error 2' }];
jest.mock('@adobe/fetch-graphql', () => {
    return {
        FetchGraphQL: jest.fn().mockImplementation(() => ({
            getMethods: jest.fn(() => ({
                fetchGraphQl: jest.fn(),
            })),
        })),
    };
});
describe('[Account-API] - Get Attributes Form', () => {
    test('AttributesForm successfully fetches data', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {
                attributesForm: {
                    items: [
                        {
                            code: 'firstname',
                            default_value: null,
                            entity_type: 'CUSTOMER',
                            frontend_class: null,
                            frontend_input: 'TEXT',
                            is_required: true,
                            is_unique: false,
                            label: 'First Name',
                            options: [],
                            sort_order: 1,
                            multiline_count: 1,
                        },
                        {
                            code: 'lastname',
                            default_value: null,
                            entity_type: 'CUSTOMER',
                            frontend_class: null,
                            frontend_input: 'TEXT',
                            is_required: true,
                            is_unique: false,
                            label: 'Last Name',
                            options: [],
                            sort_order: 1,
                            multiline_count: 1,
                        },
                        {
                            code: 'email',
                            default_value: null,
                            entity_type: 'CUSTOMER',
                            frontend_class: null,
                            frontend_input: 'TEXT',
                            is_required: true,
                            is_unique: false,
                            label: 'Email',
                            options: [],
                            sort_order: 1,
                            multiline_count: 1,
                        },
                    ],
                    errors: [],
                },
            },
            errors: [],
        });
        const response = await getAttributesForm('testForm');
        if (!response)
            return null;
        await waitFor(() => {
            expect(response).toEqual(mockItems);
        });
    });
    test('AttributesForm handles fetch error', async () => {
        fetchGraphQl.mockResolvedValue({
            data: {},
            errors: mockErrors,
        });
        await expect(getAttributesForm('testForm')).rejects.toThrow('Error 1 Error 2');
    });
});
