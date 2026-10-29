/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
/**
 * All known reCAPTCHA form types and their associated GraphQL mutation names.
 * Keys = form type identifiers (matching ReCaptchaFormEnum on the backend).
 * Values = mutation names used for badge mapping.
 */
export declare const RECAPTCHA_FORMS: {
    readonly PLACE_ORDER: "placeOrder";
    readonly CONTACT: "contactUs";
    readonly CUSTOMER_LOGIN: "generateCustomerToken";
    readonly CUSTOMER_FORGOT_PASSWORD: "requestPasswordResetEmail";
    readonly CUSTOMER_CREATE: "createCustomerV2";
    readonly CUSTOMER_EDIT: "updateCustomerV2";
    readonly NEWSLETTER: "subscribeEmailToNewsletter";
    readonly PRODUCT_REVIEW: "createProductReview";
    readonly SENDFRIEND: "SENDFRIEND";
    readonly BRAINTREE: "BRAINTREE";
    readonly COMPANY_CREATE: "createCompany";
};
/**
 * Default form-type → mutation mapping.
 * Only base (non-B2B) forms live here. B2B forms are included conditionally
 * via the `b2bEnabled` option in `setConfig()`.
 */
export declare const typeDefaultForm: Record<string, string>;
