/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { ReCaptchaModel } from '../types/recaptcha.types';
declare global {
    interface Window {
        grecaptcha?: typeof grecaptcha;
    }
}
export declare const getRecaptchaToken: (websiteKey: string, isEnterprise?: boolean) => Promise<string>;
export declare const waitForReCaptcha: () => Promise<unknown>;
export declare const verifyReCaptchaLoad: (badgeId: string, config: ReCaptchaModel, logger: boolean, isEnterprise?: boolean) => Promise<void>;
