/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { useEmailConfirmationForm } from '@/auth/hooks/components/useEmailConfirmationForm';
import EmailConfirmationForm from '@/auth/components/EmailConfirmationForm';
import { render, screen, fireEvent } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
jest.mock('@/auth/hooks/api/useGetStoreConfigs');
jest.mock('@/auth/hooks/components/useUpdatePasswordForm');
jest.mock('@/auth/hooks/components/usePasswordValidationMessage');
jest.mock('@/auth/api', () => ({
    revokeCustomerToken: jest.fn(),
}));
jest.mock('@/auth/hooks/components/useEmailConfirmationForm');
describe('[AUTH-components] - EmailConfirmationForm', () => {
    const mockUpdateNotification = jest.fn();
    const mockRedirectToLoginOnClick = jest.fn();
    const mockHandleEmailConfirmation = jest.fn();
    beforeEach(() => {
        useEmailConfirmationForm.mockReturnValue({
            storedUserEmail: '',
            disabledButton: false,
            handleEmailConfirmation: jest.fn(),
        });
        Storage.prototype.setItem = jest.fn();
    });
    test('renders with minimal props', () => {
        render(<EmailConfirmationForm formSize={'default'} userEmail={'stored@example.com'} inLineAlertProps={{}} handleSetInLineAlertProps={mockUpdateNotification} onPrimaryButtonClick={mockRedirectToLoginOnClick}/>);
        expect(screen.getByText('Verify your email address')).toBeInTheDocument();
        expect(screen.getByText('Resend email')).toBeInTheDocument();
        expect(screen.getByText('Close')).toBeInTheDocument();
    });
    test('displays user email if provided', () => {
        render(<EmailConfirmationForm formSize={'default'} userEmail="user@example.com" inLineAlertProps={{}} handleSetInLineAlertProps={mockUpdateNotification} onPrimaryButtonClick={mockRedirectToLoginOnClick}/>);
        expect(screen.getByText(/user@example.com/)).toBeInTheDocument();
    });
    test('does not display storedUserEmail if userEmail not provided', () => {
        sessionStorage.setItem('userEmail', '');
        useEmailConfirmationForm.mockReturnValueOnce({
            disabledButton: false,
            handleEmailConfirmation: mockHandleEmailConfirmation,
            storedUserEmail: '',
        });
        render(<EmailConfirmationForm formSize={'default'} userEmail="" inLineAlertProps={{}} handleSetInLineAlertProps={mockUpdateNotification} onPrimaryButtonClick={mockRedirectToLoginOnClick}/>);
        expect(screen.queryByText(/stored@example.com/)).not.toBeInTheDocument();
    });
    test('calls handleEmailConfirmation when "Resend email" is clicked', () => {
        useEmailConfirmationForm.mockReturnValueOnce({
            disabledButton: false,
            handleEmailConfirmation: mockHandleEmailConfirmation,
            storedUserEmail: '',
        });
        render(<EmailConfirmationForm formSize={'default'} userEmail="user@example.com" inLineAlertProps={{}} handleSetInLineAlertProps={mockUpdateNotification} onPrimaryButtonClick={mockRedirectToLoginOnClick}/>);
        fireEvent.click(screen.getByText('Resend email'));
        expect(mockHandleEmailConfirmation).toHaveBeenCalledTimes(1);
    });
    test('calls onPrimaryButtonClick when "Close" is clicked', () => {
        render(<EmailConfirmationForm formSize={'default'} userEmail="user@example.com" inLineAlertProps={{}} handleSetInLineAlertProps={mockUpdateNotification} onPrimaryButtonClick={mockRedirectToLoginOnClick}/>);
        fireEvent.click(screen.getByText('Close'));
        expect(mockRedirectToLoginOnClick).toHaveBeenCalledTimes(1);
    });
    test('hide close button on Email Confirmation', () => {
        render(<EmailConfirmationForm formSize={'default'} userEmail={'stored@example.com'} inLineAlertProps={{}} handleSetInLineAlertProps={mockUpdateNotification} onPrimaryButtonClick={mockRedirectToLoginOnClick} hideCloseBtnOnEmailConfirmation={true}/>);
        expect(screen.queryByTestId('closeBtnOnEmailConfirmation')).toBeNull();
        expect(screen.queryByTestId('authInLineAlert')).not.toBeInTheDocument();
    });
    test('show inLineAlert', () => {
        render(<EmailConfirmationForm formSize={'default'} userEmail={'stored@example.com'} inLineAlertProps={{ text: 'Text message', type: 'success' }} handleSetInLineAlertProps={mockUpdateNotification} onPrimaryButtonClick={mockRedirectToLoginOnClick} hideCloseBtnOnEmailConfirmation={true}/>);
        expect(screen.queryByTestId('authInLineAlert')).toBeInTheDocument();
    });
});
