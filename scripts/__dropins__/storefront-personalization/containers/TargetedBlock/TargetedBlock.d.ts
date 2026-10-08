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
import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/lib';
import { PersonalizationData } from "../../data/models";
export interface TargetedBlockProps extends HTMLAttributes<HTMLDivElement> {
    slots: {
        Content: SlotProps;
    };
    personalizationData: PersonalizationData;
    type?: string;
}
export declare const TargetedBlock: Container<TargetedBlockProps>;
