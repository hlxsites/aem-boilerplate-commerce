import { UpdatePassword } from '@/auth/containers/UpdatePassword';
/**
 * ```ts
 * import UpdatePassword from '@dropins/auth/containers/UpdatePassword.js';
 * ```
 */
export default {
    title: 'Containers/Update Password Form',
    component: UpdatePassword,
    argTypes: {
        formSize: {
            control: { type: 'select' },
            options: ['default', 'small'],
            description: 'Determines the initial size of the form.',
        },
        routeRedirectOnSignIn: {
            defaultValue: () => '/',
            description: 'The main URL to redirect users after a specific action.',
        },
        routeSignInPage: {
            defaultValue: () => '/',
            description: 'URL to redirect users to the sign-in page.',
        },
        slots: {
            SuccessNotification: {
                description: "Renders a notification component to inform the user of a successful action, such as account creation. It accepts a parameter that provides the user's name to customize the notification message.",
                table: {
                    category: 'Functions',
                    type: {
                        summary: '(userName: string) => JSX.Element',
                    },
                    defaultValue: {
                        summary: 'undefined',
                    },
                },
                parameters: {
                    headingText: 'Welcome {userName}',
                    messageText: 'Your account has been successfully created.',
                    primaryButtonText: 'Continue shopping',
                    secondaryButtonText: 'Logout',
                    onPrimaryButtonClick: 'Function to be called on primary button click.',
                    onSecondaryButtonClick: 'Async function to log out the user and redirect to the homepage.',
                },
            },
        },
        signInOnSuccess: {
            control: 'boolean',
            description: 'Enables or disables automatic sign-in to the user account upon successful completion of an action.',
        },
        routeWrongUrlRedirect: {
            defaultValue: () => '/',
            description: 'URL to redirect users in case of an error.',
        },
        routeRedirectOnPasswordUpdate: {
            defaultValue: () => '/',
            description: 'This URL is used to redirect users after enabling email confirmation.',
        },
        onErrorCallback: {
            action: 'clicked',
            description: 'Callback function that is invoked when an error occurs.',
        },
        onSuccessCallback: {
            action: 'clicked',
            description: 'Callback function that is invoked on successful completion of an action.',
        },
    },
    decorators: [
        (Story) => (<div style="border:1px solid lightgrey; text-align: -webkit-right;">
        <Story />
      </div>),
    ],
};
const Template = {
    render: (args) => <UpdatePassword {...args}/>,
};
export const SmallSize = {
    ...Template,
    args: {
        formSize: 'small',
    },
};
