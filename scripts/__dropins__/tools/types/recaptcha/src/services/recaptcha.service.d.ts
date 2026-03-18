import { ReCaptchaV3Model } from '../types/recaptcha.types';

/**
 * Retrieves a reCAPTCHA token.
 * @param websiteKey - The reCAPTCHA site key
 * @param isEnterprise - If true, uses grecaptcha.enterprise.execute() for Enterprise
 */
export declare const getRecaptchaToken: (websiteKey: string, isEnterprise?: boolean) => Promise<string>;
export declare const waitForReCaptcha: (isEnterprise?: boolean) => Promise<unknown>;
export declare const verifyReCaptchaLoad: (badgeId: string, config: ReCaptchaV3Model, logger: boolean) => Promise<void>;
//# sourceMappingURL=recaptcha.service.d.ts.map