/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { JSXInternal } from 'preact/src/jsx';
type ClassName = string | JSXInternal.SignalLike<string | undefined>;
export declare const classes: (classes: Array<ClassName | [ClassName, boolean] | undefined>) => string;
export {};
