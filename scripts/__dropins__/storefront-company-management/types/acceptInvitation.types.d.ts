/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
export interface InvitationStatus {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    isCompanyDisabled: boolean;
}
export interface AcceptInvitationFormProps {
    /** Callback function that returns the URL path to the My Account page */
    routeMyAccount?: () => string;
    /** Callback function that returns the URL path to the Login page */
    routeLogin?: () => string;
    /** Indicates whether the current user is authenticated */
    isAuthenticated?: boolean;
    /** Optional custom labels for UI text customization */
    labels?: {
        /** Title text displayed at the top of the invitation acceptance page */
        title?: string;
        /** Loading message shown while processing the invitation */
        loadingText?: string;
        /** Title for the success state */
        successTitle?: string;
        /** Success message displayed after accepting invitation */
        successMessage?: string;
        /** Title for error states */
        errorTitle?: string;
        /** Button text for navigating to My Account (authenticated users) */
        myAccountButton?: string;
        /** Button text for navigating to Login (unauthenticated users) */
        loginButton?: string;
    };
    /** Additional CSS classes to apply to the container for custom styling */
    className?: string;
}
export interface AcceptInvitationProps extends AcceptInvitationFormProps {
}
//# sourceMappingURL=acceptInvitation.types.d.ts.map