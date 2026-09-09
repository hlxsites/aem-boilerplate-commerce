/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
/**
 * Registers company create with the shared reCAPTCHA module and initializes the badge/script.
 * Relies on @adobe-commerce/recaptcha batching COMPANY_CREATE via typeDefaultForm (tools 1.2+).
 */
export declare const configureCompanyRecaptcha: () => Promise<void>;
