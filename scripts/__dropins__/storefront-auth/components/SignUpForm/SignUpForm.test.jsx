/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen, fireEvent, waitFor } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { SignUpForm } from '@/auth/components/SignUpForm';
import { useGetStoreConfigs } from '@/auth/hooks/api/useGetStoreConfigs';
import { useGetAttributesForm } from '@/auth/hooks/api/useGetAttributesForm';
import { useSignUpForm } from '@/auth/hooks/components/useSignUpForm';
import { DEFAULT_SIGN_UP_FIELDS } from '@/auth/configs/defaultCreateUserConfigs';
import { useInLineAlert } from '@/auth/hooks/useInLineAlert';
jest.mock('@/auth/hooks/api/useGetStoreConfigs');
jest.mock('@/auth/hooks/api/useGetAttributesForm');
jest.mock('@/auth/hooks/components/useSignUpForm');
jest.mock('@adobe/event-bus');
jest.mock('@/auth/api/fetch-graphql');
jest.mock('@/auth/api');
jest.mock('@/auth/hooks/useInLineAlert');
const mockHandleSetInLineAlertProps = jest.fn();
describe('[AUTH-components] - SignUpForm', () => {
    const apiVersion2 = true;
    const passwordConfigs = { minLength: 5, requiredCharacterClasses: 1 };
    const routeRedirectOnSignIn = () => 'www.google.com';
    const routeSignIn = () => 'www.google.com';
    const onErrorCallback = jest.fn();
    const onSuccessCallback = jest.fn();
    beforeEach(() => {
        useInLineAlert.mockReturnValue({
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            inLineAlertProps: {},
        });
        useGetAttributesForm.mockReturnValue({
            fieldsListConfigs: DEFAULT_SIGN_UP_FIELDS.slice(0, 4),
        });
        useSignUpForm.mockReturnValue({
            isSuccessful: { status: false, userName: '' },
            signUpPasswordValue: '',
            updateNotification: { status: '', text: '' },
            isLoading: false,
            onSubmitSignUp: jest.fn(),
            signInButton: jest.fn(),
            handleSetSignUpPasswordValue: jest.fn(),
        });
    });
    test('renders', () => {
        useGetStoreConfigs.mockReturnValue({
            ...passwordConfigs,
            isEmailConfirmationRequired: true,
        });
        const { container } = render(<SignUpForm slots={{}}/>);
        expect(!!container).toEqual(true);
        const element = container.querySelector('.auth-signUpForm__automatic-login');
        expect(element).toBeNull();
    });
    test('renders the sign up form correctly', async () => {
        useGetStoreConfigs.mockReturnValue(passwordConfigs);
        render(<SignUpForm apiVersion2={apiVersion2} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignIn} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback}/>);
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Create account' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Already a member? Sign in' })).toBeInTheDocument();
        });
    });
    test('renders terms of use and newsletter checkboxes if displayed', async () => {
        useGetStoreConfigs.mockReturnValue(passwordConfigs);
        render(<SignUpForm displayNewsletterCheckbox={false} displayTermsOfUseCheckbox={true} apiVersion2={apiVersion2} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignIn} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback} fieldsConfigForApiVersion1={DEFAULT_SIGN_UP_FIELDS.slice(0, 4)}/>);
        const privacyPolicy = screen.getByTestId('privacyPolicy');
        expect(privacyPolicy).toBeInTheDocument();
    });
    test('renders newsletter checkboxes if displayed', async () => {
        useGetStoreConfigs.mockReturnValue(passwordConfigs);
        render(<SignUpForm displayNewsletterCheckbox={true} displayTermsOfUseCheckbox={false} apiVersion2={apiVersion2} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignIn} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback} fieldsConfigForApiVersion1={DEFAULT_SIGN_UP_FIELDS.slice(0, 4)}/>);
        const is_subscribed = screen.getByTestId('isSubscribed');
        expect(is_subscribed).toBeInTheDocument();
    });
    test('handles "Already a member? Sign in" button click', () => {
        useGetStoreConfigs.mockReturnValue(passwordConfigs);
        const signInButtonMock = jest.fn();
        const routeSignInMock = jest.fn().mockReturnValue('http://localhost/');
        useSignUpForm.mockReturnValueOnce({
            isSuccessful: { status: false, userName: '' },
            updateNotification: { status: '', text: '' },
            isLoading: false,
            onSubmitSignUp: jest.fn(),
            handleSetSignUpPasswordValue: jest.fn(),
            signInButton: signInButtonMock,
        });
        render(<SignUpForm apiVersion2={apiVersion2} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignInMock} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback}/>);
        fireEvent.click(screen.getByText('Already a member? Sign in'));
        expect(signInButtonMock).toHaveBeenCalledTimes(1);
    });
    test('renders skeleton loading', async () => {
        useGetStoreConfigs.mockReturnValue(passwordConfigs);
        useGetAttributesForm.mockReturnValue({
            fieldsListConfigs: [],
        });
        render(<SignUpForm apiVersion2={true} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignIn} fieldsConfigForApiVersion1={[]}/>);
        expect(screen.getByTestId('SignUpForm')).toHaveClass('skeleton-loader');
    });
    test('displays success notification upon successful sign up', async () => {
        useGetStoreConfigs.mockReturnValue(passwordConfigs);
        const handleSetInLineAlertProps = jest.fn();
        useSignUpForm.mockReturnValueOnce({
            ...useSignUpForm({
                apiVersion2,
                passwordConfigs,
                routeRedirectOnSignIn,
                routeSignIn,
                onErrorCallback,
                onSuccessCallback,
                handleSetInLineAlertProps,
                translations: {},
            }),
            isSuccessful: { status: true, userName: 'John Doe' },
        });
        const { container } = render(<SignUpForm apiVersion2={apiVersion2} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignIn} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback} slots={{
                SuccessNotification: () => { },
            }}/>);
        expect(screen.getByTestId('successNotificationTestId')).toBeInTheDocument();
        expect(!!container).toEqual(true);
    });
    test('render showEmailConfirmationForm', () => {
        useGetStoreConfigs.mockReturnValue(passwordConfigs);
        useSignUpForm.mockReturnValueOnce({
            userEmail: 'test@mail.com',
            showEmailConfirmationForm: true,
            setShowEmailConfirmationForm: jest.fn(),
            isSuccessful: { status: true, userName: 'John Doe' },
        });
        render(<SignUpForm apiVersion2={apiVersion2} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignIn} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback}/>);
        expect(screen.getByText('Verify your email address')).toBeInTheDocument();
    });
    test('displays InLineAlert when inLineAlertProps.text is not empty', () => {
        useInLineAlert.mockReturnValue({
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            inLineAlertProps: { text: 'Test notification', status: 'success' },
        });
        render(<SignUpForm apiVersion2={apiVersion2} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignIn} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback}/>);
        expect(screen.getByText('Test notification')).toBeInTheDocument();
    });
    test('displays error input password', () => {
        useSignUpForm.mockReturnValue({
            isSuccessful: { status: false, userName: '' },
            signUpPasswordValue: '',
            updateNotification: { status: '', text: '' },
            isLoading: false,
            onSubmitSignUp: jest.fn(),
            signInButton: jest.fn(),
            handleSetSignUpPasswordValue: jest.fn(),
            isClickSubmit: true,
        });
        render(<SignUpForm apiVersion2={apiVersion2} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignIn} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback}/>);
        const element = screen.getByText('This is a required field.');
        expect(element).toBeInTheDocument();
    });
});
