import '@testing-library/jest-dom';
import { DEFAULT__SIGN_IN_EMAIL_FIELD } from '@/auth/configs/defaultCreateUserConfigs';
import { render, renderHook, fireEvent, act } from '@adobe/elsie/lib/tests';
import { simplifyTransformAttributesForm } from '@/auth/lib/simplifyTransformAttributesForm';
import { Provider } from '@/auth/render/Provider';
import { Form } from '@/auth/components';
import { useForm } from './useForm';
jest.mock('@/auth/components/SignInForm');
const wrapper = ({ children }) => <Provider>{children}</Provider>;
describe('[AUTH-hooks] - useForm', () => {
    const mockSubmitCallback = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('initializes with default form data and errors', () => {
        const { result } = renderHook(() => useForm({
            onSubmit: jest.fn(),
            fieldsConfig: [],
        }));
        expect(result.current.formData).toEqual({});
        expect(result.current.errors).toEqual({});
    });
    test('updates form data on handleChange', () => {
        const { result } = renderHook(() => useForm({
            onSubmit: jest.fn(),
            fieldsConfig: [],
        }));
        act(() => {
            result.current.handleChange({
                target: {
                    name: 'test',
                    value: 'value',
                },
            });
        });
        expect(result.current.formData).toEqual({ test: 'value' });
    });
    test('initializes form fields based on fieldsConfig', () => {
        const fieldsConfig = simplifyTransformAttributesForm([
            {
                customUpperCode: 'name',
                code: 'name',
                default_value: 'John Doe',
                is_required: true,
                frontend_input: 'text',
            },
            { code: 'email', is_required: true, frontend_input: 'email' },
        ]);
        const { result } = renderHook(() => useForm({
            onSubmit: jest.fn(),
            fieldsConfig,
        }));
        expect(result.current.formData['name']).toEqual('John Doe');
        expect(result.current.formData['email']).toEqual('');
    });
    test('initializes formData for DATE field', () => {
        const fieldsConfig = [
            {
                customUpperCode: 'date',
                name: 'date',
                code: 'date',
                id: 'date',
                fieldType: 'DATE',
                required: true,
                defaultValue: '2023-01-01',
            },
        ];
        const { result } = renderHook(() => useForm({
            onSubmit: jest.fn(),
            fieldsConfig,
        }));
        expect(result.current.formData).toEqual({ date: '2023-01-01' });
    });
    test('handles submit correctly when form is valid', () => {
        const fieldsConfig = [
            {
                customUpperCode: 'email',
                name: 'email',
                fieldType: 'TEXT',
                required: true,
                defaultValue: 'test@example.com',
            },
        ];
        const { result } = renderHook(() => useForm({
            onSubmit: mockSubmitCallback,
            fieldsConfig,
        }));
        act(() => {
            result.current.handleSubmit({
                preventDefault: jest.fn(),
            });
        });
        expect(mockSubmitCallback).toHaveBeenCalledWith(expect.any(Object), true);
    });
    test('handles checkbox change correctly', () => {
        const fieldsConfig = [
            {
                customUpperCode: 'agree',
                name: 'agree',
                fieldType: 'BOOLEAN',
                required: true,
                options: [{ value: '1', is_default: true }],
            },
        ];
        const { result } = renderHook(() => useForm({
            onSubmit: jest.fn(),
            fieldsConfig,
        }));
        act(() => {
            result.current.handleChange({
                target: { name: 'agree', type: 'checkbox', checked: true },
            });
        });
        expect(result.current.formData).toEqual({ agree: true });
        act(() => {
            result.current.handleChange({
                target: {
                    name: 'agree',
                    type: 'checkbox',
                    checked: false,
                },
            });
        });
        expect(result.current.formData).toEqual({ agree: false });
    });
    test('should set error on empty required field', async () => {
        const fieldsConfig = simplifyTransformAttributesForm(DEFAULT__SIGN_IN_EMAIL_FIELD);
        const { result } = renderHook(() => useForm({
            fieldsConfig,
        }), { wrapper });
        const event = {
            target: { name: 'email', value: '' },
        };
        act(() => {
            result.current.handleBlur(event);
        });
        expect(result.current.errors['email']).toBeDefined();
        expect(result.current.errors['email']).toBe('This is a required field.');
    });
    test('focuses on the first input with an error when the form is invalid', () => {
        const defaultFieldsConfig = simplifyTransformAttributesForm(DEFAULT__SIGN_IN_EMAIL_FIELD);
        const { getByText } = render(<Form fieldsConfig={defaultFieldsConfig} loading={false}>
        <button type="submit">Sign in</button>
      </Form>);
        const submitButton = getByText('Sign in');
        const originalFocus = HTMLElement.prototype.focus;
        HTMLElement.prototype.focus = jest.fn();
        fireEvent.click(submitButton);
        expect(HTMLElement.prototype.focus).toHaveBeenCalled();
        HTMLElement.prototype.focus = originalFocus;
    });
    test('initializes formData for SELECT field', () => {
        const fieldsConfig = [
            {
                customUpperCode: 'select',
                id: 'select',
                name: 'select',
                code: 'select',
                fieldType: 'SELECT',
                required: true,
                defaultValue: 'xyz789',
                options: [
                    {
                        is_default: true,
                        label: 'xyz789',
                        value: 'xyz789',
                    },
                ],
            },
        ];
        const { result } = renderHook(() => useForm({
            onSubmit: jest.fn(),
            fieldsConfig,
        }));
        expect(result.current.formData).toEqual({ select: 'xyz789' });
    });
});
