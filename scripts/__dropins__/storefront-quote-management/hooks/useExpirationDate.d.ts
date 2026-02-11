/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface UseExpirationDateParams {
    templateId?: string;
    initialExpirationDate?: string;
    expirationDateRequiredErrorMessage?: string;
}
export interface UseExpirationDateReturn {
    /**
     * Whether the expiration date modal is currently open.
     */
    isExpirationModalOpen: boolean;
    /**
     * The new expiration date entered by the user (in YYYY-MM-DD format).
     */
    expirationDate: string;
    /**
     * Error message for expiration date operation.
     */
    expirationError: string;
    /**
     * Error message for expiration date validation.
     */
    expirationDateError: string;
    /**
     * Success message for expiration date operation.
     */
    expirationSuccess: string;
    /**
     * Opens the expiration date modal and initializes state with the current expiration date.
     */
    handleExpirationClick: (currentExpirationDate?: string) => void;
    /**
     * Closes the expiration date modal and resets all state.
     */
    handleExpirationClose: () => void;
    /**
     * Updates the expiration date and clears any date-related errors.
     */
    handleExpirationDateChange: (value: string) => void;
    /**
     * Validates and saves the expiration date. Makes an API call to save immediately.
     * Closes the modal if successful.
     * Returns a promise that resolves to true if successful, false otherwise.
     */
    handleExpirationSave: () => Promise<boolean>;
    /**
     * Resets expiration date state (useful after successful submission).
     */
    resetExpirationState: () => void;
}
/**
 * Custom hook to manage quote template expiration date functionality.
 * Handles state management for the expiration date modal, validation, and API calls.
 * Saves the expiration date immediately when user clicks "Save" in the modal.
 */
export declare const useExpirationDate: (params?: UseExpirationDateParams) => UseExpirationDateReturn;
//# sourceMappingURL=useExpirationDate.d.ts.map