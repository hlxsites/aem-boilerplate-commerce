/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
import { Customer } from '../../data/models';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface LoginFormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'title'> {
    customer: Customer | null;
    email: string;
    error: string;
    headingContent?: VNode;
    hint: string | VNode;
    onEmailBlur: (event: Event) => void;
    onEmailChange: (event: Event) => void;
    onEmailInvalid: (event: Event) => void;
    preferences?: VNode;
    title?: VNode;
}
export declare const LoginForm: FunctionComponent<LoginFormProps & import("..").ConditionalProps>;
