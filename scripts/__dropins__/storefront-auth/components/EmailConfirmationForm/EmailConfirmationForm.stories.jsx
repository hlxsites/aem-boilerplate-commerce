import { EmailConfirmationForm } from '@/auth/components/EmailConfirmationForm';
export default {
    title: 'Components/Email Confirmation Form',
    component: EmailConfirmationForm,
    argTypes: {
        userEmail: {
            control: 'text',
            description: 'The email of the user being verified.',
        },
        formSize: {
            control: 'radio',
            defaultValue: 'default',
            options: ['default', 'small'],
            description: 'Sets the initial size of the form.',
        },
        inLineAlertProps: {
            control: 'object',
            description: 'The notification data to display.',
            defaultValue: {
                status: '',
                text: '',
                icon: undefined,
            },
            table: {
                type: {
                    summary: 'object',
                    detail: `{ status: 'success' | 'error' | ''; text: string | unknown }`,
                },
            },
        },
        hideCloseBtnOnEmailConfirmation: {
            control: 'boolean',
            description: 'Optional, default to false. If provided true - hide "Close" button',
        },
        handleSetInLineAlertProps: {
            description: 'Function to update the notification state.',
        },
        onPrimaryButtonClick: {
            description: 'Function to redirect the user to the login page.',
        },
    },
    decorators: [
        (Story) => (<div style="border:1px solid lightgrey;">
        <Story />
      </div>),
    ],
};
export const Default = {
    args: {
        userEmail: 'user@example.com',
        formSize: 'default',
        inLineAlertProps: {
            type: 'error',
            text: 'Please verify your email address to continue.',
        },
        handleSetInLineAlertProps: (value) => console.log('Notification updated:', value),
        onPrimaryButtonClick: () => console.log('Redirecting to login page...'),
    },
};
