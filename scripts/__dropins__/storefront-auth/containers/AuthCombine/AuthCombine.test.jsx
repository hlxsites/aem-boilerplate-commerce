/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen, waitFor, renderHook } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { AuthCombine } from '@/auth/containers/AuthCombine';
import { useGetAttributesForm } from '@/auth/hooks/api/useGetAttributesForm';
jest.mock('../../hooks/api/useGetAttributesForm', () => ({
    useGetAttributesForm: jest.fn().mockImplementation(() => ({
        fieldsListConfigs: [{ id: 1, name: 'Test Attribute' }],
    })),
}));
describe('[AUTH-containers] - AuthCombine', () => {
    test('renders', () => {
        const { container } = render(<AuthCombine />);
        expect(!!container).toEqual(true);
    });
    test('renders SignInForm as default', () => {
        render(<AuthCombine signInFormConfig={{}} signUpFormConfig={{}} resetPasswordFormConfig={{}} defaultView="signInForm"/>);
        expect(screen.getByTestId('signInForm')).toBeInTheDocument();
    });
    test('renders SignUpForm as default', async () => {
        const fieldsConfigForApiVersion1 = [];
        const apiVersion2 = false;
        render(<AuthCombine signInFormConfig={{}} signUpFormConfig={{}} resetPasswordFormConfig={{}} defaultView="signUpForm"/>);
        const { result } = renderHook(() => useGetAttributesForm({ fieldsConfigForApiVersion1, apiVersion2 }));
        await waitFor(() => expect(result.current.fieldsListConfigs).toHaveLength(1));
        expect(result.current.fieldsListConfigs).toEqual([
            { id: 1, name: 'Test Attribute' },
        ]);
        const signUpForm = await screen.findByTestId('SignUpForm');
        expect(signUpForm).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByTestId('SignUpForm')).toBeInTheDocument();
        });
    });
    test('renders ResetPasswordForm as default', async () => {
        render(<AuthCombine signInFormConfig={{}} signUpFormConfig={{}} resetPasswordFormConfig={{}} defaultView="resetPasswordForm"/>);
        const resetPasswordForm = await screen.findByTestId('resetPasswordForm');
        expect(resetPasswordForm).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByTestId('resetPasswordForm')).toBeInTheDocument();
        });
    });
});
