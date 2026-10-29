/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface FacetProps extends HTMLAttributes<HTMLDivElement> {
    numberOfOptionsConfig?: number;
    header: VNode;
    buckets: VNode[];
    last?: boolean;
    /**
     * ARIA role used to group the facet's controls with its header.
     * Use "radiogroup" when the buckets are rendered as radio buttons (e.g. price ranges)
     * so that assistive technology (e.g. VoiceOver) announces the group name for every
     * option, not just the first one, as it does for the generic "group" role.
     */
    groupRole?: 'group' | 'radiogroup';
}
export declare const Facet: FunctionComponent<FacetProps>;
