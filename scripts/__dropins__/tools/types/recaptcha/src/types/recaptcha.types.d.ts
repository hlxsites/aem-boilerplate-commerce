/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface ReCaptchaInitProps {
    is_enabled?: boolean;
    website_key?: string;
    minimum_score?: number;
    badge_position?: string;
    language_code?: string;
    failure_message?: string;
    theme: string;
}
export interface ReCaptchaProps extends ReCaptchaInitProps {
    forms?: string[];
}
export interface PropsFormTypes {
    badgeId: string;
    enabledBadgePlace?: boolean;
}
export interface ReCaptchaModifyProps extends ReCaptchaInitProps {
    forms?: PropsFormTypes[];
}
export interface ReCaptchaResponse {
    data?: {
        recaptchaConfig?: ReCaptchaProps | ReCaptchaModifyProps;
        [key: string]: ReCaptchaFormConfigResult | ReCaptchaProps | ReCaptchaModifyProps | undefined;
    };
    errors?: {
        message: string;
    }[];
}
export type ReCaptchaType = 'v3' | 'enterprise';
export interface ReCaptchaModel {
    isEnabled?: boolean;
    websiteKey?: string;
    minimumScore?: number;
    badgePosition?: string;
    languageCode?: string;
    failureMessage?: string;
    theme?: string;
    forms?: PropsFormTypes[] | string[];
    recaptchaType?: ReCaptchaType;
}
export interface ReCaptchaFormConfigResult {
    website_key?: string;
    badge_position?: string;
    language_code?: string;
    minimum_score?: number;
    re_captcha_type?: string;
    technical_failure_message?: string;
    validation_failure_message?: string;
    theme?: string;
}
export interface MutationObserverInit {
    childList?: boolean;
    attributes?: boolean;
    characterData?: boolean;
    subtree?: boolean;
    attributeOldValue?: boolean;
    characterDataOldValue?: boolean;
    attributeFilter?: string[];
}
