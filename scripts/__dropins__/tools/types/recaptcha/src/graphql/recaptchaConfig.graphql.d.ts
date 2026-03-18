/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export declare const RECAPTCHA_CONFIGURATION_V3 = "query {\n  recaptchaV3Config {\n    is_enabled\n    website_key\n    minimum_score\n    badge_position\n    language_code\n    failure_message\n    forms\n    theme\n  } \n}";
export declare const RECAPTCHA_FORM_CONFIGURATION = "query {\n  recaptchaFormConfig(formType: PLACE_ORDER) {\n    is_enabled\n    configurations {\n      re_captcha_type\n      website_key\n      theme\n      badge_position\n      language_code\n      minimum_score\n      technical_failure_message\n      validation_failure_message\n    }\n  }\n}";
//# sourceMappingURL=recaptchaConfig.graphql.d.ts.map