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
import { VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export type AdditionalActionsAlertProps = Array<{
    label: string;
    onClick: (event: Event) => void;
}>;
export interface InLineAlertInterface {
    type?: 'success' | 'warning' | 'error';
    text?: string;
    icon?: VNode<HTMLAttributes<SVGSVGElement>> | undefined;
}
export type statusTypes = '' | 'success' | 'error' | 'pending';
export interface ValidateLengthConfigProps {
    status?: statusTypes;
    icon?: statusTypes;
    message?: string;
}
