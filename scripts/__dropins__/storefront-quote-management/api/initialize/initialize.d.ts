/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { Initializer } from '@dropins/tools/lib';
import { Lang } from '../../../node_modules/@dropins/tools/src/i18n';
type ConfigProps = {
    langDefinitions?: Lang;
    quoteId?: string;
    quoteTemplateId?: string;
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import("@dropins/tools/lib").Config<ConfigProps>;
export {};
