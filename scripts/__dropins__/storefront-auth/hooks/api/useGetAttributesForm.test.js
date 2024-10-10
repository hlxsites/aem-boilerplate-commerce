import { renderHook, waitFor } from '@adobe/elsie/lib/tests';
import { useGetAttributesForm } from '@/auth/hooks/api/useGetAttributesForm';
import { DEFAULT_SIGN_UP_FIELDS } from '@/auth/configs/defaultCreateUserConfigs';
import { getAttributesForm } from '@/auth/api/getAttributesForm';
import { simplifyTransformAttributesForm } from '@/auth/lib/simplifyTransformAttributesForm';
jest.mock('@/auth/api/getAttributesForm');
describe('[AUTH-hooks] - useGetAttributesForm', () => {
    const defaultFields = simplifyTransformAttributesForm(DEFAULT_SIGN_UP_FIELDS);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should start with inputsDefaultValueSet', async () => {
        getAttributesForm.mockResolvedValue(defaultFields);
        const inputsDefaultValueSet = [
            { code: 'firstname', defaultValue: 'Hello I am Joe' },
        ];
        const fieldsConfigForApiVersion1 = [];
        const apiVersion2 = true;
        const expectedFields = defaultFields.map((field) => field.code === 'firstname'
            ? { ...field, defaultValue: 'Hello I am Joe' }
            : field);
        const { result } = renderHook(() => useGetAttributesForm({
            fieldsConfigForApiVersion1,
            apiVersion2,
            inputsDefaultValueSet,
        }));
        await waitFor(() => {
            expect(result.current.fieldsListConfigs).toEqual(expectedFields);
        });
    });
    test('should start without inputsDefaultValueSet', async () => {
        getAttributesForm.mockResolvedValue({
            fields: defaultFields,
            errors: [],
        });
        const fieldsConfigForApiVersion1 = [];
        const inputsDefaultValueSet = [];
        const apiVersion2 = false;
        const { result } = renderHook(() => useGetAttributesForm({
            fieldsConfigForApiVersion1,
            apiVersion2,
            inputsDefaultValueSet,
        }));
        await waitFor(() => {
            expect(result.current.fieldsListConfigs).toEqual(defaultFields);
        });
    });
    test('set response getAttributesForm fields list configs', async () => {
        getAttributesForm.mockResolvedValue(defaultFields);
        const inputsDefaultValueSet = [];
        const fieldsConfigForApiVersion1 = [];
        const apiVersion2 = true;
        const { result } = renderHook(() => useGetAttributesForm({
            fieldsConfigForApiVersion1,
            apiVersion2,
            inputsDefaultValueSet,
        }));
        await waitFor(() => {
            expect(result.current.fieldsListConfigs).toEqual(defaultFields);
        });
    });
    test('called getAttributesForm with fields null', async () => {
        getAttributesForm.mockResolvedValue({
            fields: null,
            errors: [],
        });
        const inputsDefaultValueSet = [];
        const fieldsConfigForApiVersion1 = [];
        const apiVersion2 = true;
        const { result } = renderHook(() => useGetAttributesForm({
            fieldsConfigForApiVersion1,
            apiVersion2,
            inputsDefaultValueSet,
        }));
        await waitFor(() => {
            expect(result.current.fieldsListConfigs).toEqual([]);
        });
    });
});
