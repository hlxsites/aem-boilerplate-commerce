/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { ReCaptchaModel } from '../types/recaptcha.types';
declare const getConfigStorage: (storageKey: string, retries?: number, delay?: number) => Promise<ReCaptchaModel | null>;
declare const setConfigStorage: (storageKey: string, config: ReCaptchaModel, logger: boolean) => null | undefined;
export { getConfigStorage, setConfigStorage };
