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
type statusTypes = '' | 'success' | 'error' | 'pending';
export interface ValidateLengthConfigProps {
    status?: statusTypes;
    icon?: statusTypes;
    message?: string;
}
export interface PasswordStatusIndicatorProps {
    validateLengthConfig?: ValidateLengthConfigProps;
    uniqueSymbolsStatus?: statusTypes;
    minLength?: number;
    requiredCharacterClasses?: number;
}
export declare const PasswordStatusIndicator: FunctionComponent<PasswordStatusIndicatorProps & HTMLAttributes<HTMLDivElement>>;
export {};
