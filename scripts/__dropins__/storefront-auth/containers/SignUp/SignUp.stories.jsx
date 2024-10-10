import { SignUp } from '@/auth/containers/SignUp';
/**
 * ```ts
 * import SignUp from '@dropins/auth/containers/SignUp.js';
 * ```
 */
export default {
    title: 'Containers/Sign Up Form',
    component: SignUp,
    args: {
        apiVersion2: false,
        displayTermsOfUseCheckbox: true,
        displayNewsletterCheckbox: true,
    },
    argTypes: {
        apiVersion2: {
            defaultValue: false,
            description: 'Enables the use of version 2 of the API.',
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
        fieldsConfigForApiVersion1: {
            control: 'object',
            description: 'Defines the fields to be included in the sign-up form.',
        },
        addressesData: {
            control: 'object',
            description: 'A special prop you can set during user registration. When login occurs, before any redirects or other functions, the provided addresses will be created.',
        },
        inputsDefaultValueSet: {
            control: 'object',
            description: 'Defines an array of objects that allows specifying default values for fields in the sign-up form.',
        },
        hideCloseBtnOnEmailConfirmation: {
            control: 'boolean',
            description: 'Optional, default to false. If provided true - hide "Close" button in Email Confirmation component',
        },
        isAutoSignInEnabled: {
            control: 'boolean',
            description: 'Determines if the automatic sign-in feature is enabled, allowing users to log in automatically using saved credentials',
        },
        routeRedirectOnEmailConfirmationClose: {
            defaultValue: () => '/',
            description: 'URL to redirect after click "Close" button in Email Confirmation',
        },
        displayTermsOfUseCheckbox: {
            control: 'boolean',
            description: 'Controls the visibility of the terms of use agreement checkbox.',
            table: {
                defaultValue: { summary: false },
            },
        },
        displayNewsletterCheckbox: {
            control: 'boolean',
            description: 'Controls the visibility of the newsletter subscription checkbox.',
            table: {
                defaultValue: { summary: false },
            },
        },
        formSize: {
            control: { type: 'select' },
            options: ['default', 'small'],
            description: 'Determines the initial size of the form.',
        },
        routeRedirectOnSignIn: {
            defaultValue: () => '/',
            description: 'URL to redirect users after a main action is completed.',
        },
        routeSignIn: {
            defaultValue: () => '/',
            description: 'URL to redirect users to the sign-in page.',
        },
        onErrorCallback: {
            defaultValue: () => {
                console.info('onErrorCallback');
            },
            description: 'Callback function that is called when an error occurs.',
        },
        onSuccessCallback: {
            defaultValue: () => {
                console.info('onSuccessCallback');
            },
            description: 'Callback function that is called upon a successful action.',
        },
    },
    decorators: [
        (Story) => (<div style="border:1px solid lightgrey;">
        <Story />
      </div>),
    ],
};
export const DefaultSmallForm = {
    args: {
        apiVersion2: false,
        fieldsConfigForApiVersion1: [
            {
                code: 'email',
                default_value: '',
                entity_type: 'CUSTOMER',
                frontend_class: '',
                frontend_input: 'TEXT',
                is_required: true,
                is_unique: false,
                label: 'Email',
                options: [],
            },
            {
                code: 'firstname',
                default_value: '',
                entity_type: 'CUSTOMER',
                frontend_class: '',
                frontend_input: 'TEXT',
                is_required: true,
                is_unique: false,
                label: 'First name',
                options: [],
            },
            {
                code: 'lastname',
                default_value: '',
                entity_type: 'CUSTOMER',
                frontend_class: '',
                frontend_input: 'TEXT',
                is_required: false,
                is_unique: false,
                label: 'Last name',
                options: [],
            },
        ],
        formSize: 'small',
    },
};
export const DefaultWithApiVersion2 = {
    args: {
        formSize: 'default',
        apiVersion2: true,
    },
};
