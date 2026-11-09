/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Render } from '../../lib';
import { Lang } from '../../i18n';
export declare const UIContext: import("preact").Context<{
    locale: string;
}>;
type LangDefinitions = {
    [key: string]: any;
};
export interface UIProviderProps extends HTMLAttributes<HTMLDivElement> {
    lang?: Lang;
    langDefinitions?: LangDefinitions;
}
export declare const UIProvider: FunctionComponent<UIProviderProps>;
export declare const provider: Render;
export {};
