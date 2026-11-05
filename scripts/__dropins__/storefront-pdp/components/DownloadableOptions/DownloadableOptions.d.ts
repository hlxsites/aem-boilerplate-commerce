/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2023 Adobe
 * All Rights Reserved.
 * __________________
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 */
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export type DownloadableLink = {
    uid: string;
    price: number;
    sample_url: string | null;
    label: string;
    number_of_downloads: number;
};
export type DownloadableSample = {
    uid: string;
    label: string;
    url: string;
};
export type DownloadableValue = {
    links: DownloadableLink[];
    samples: DownloadableSample[];
    purchaseSeparately: boolean;
};
export interface DownloadableOptionsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
    label: string;
    value: DownloadableValue;
    onLinkChange?: (uid: string, selected: boolean) => void;
    currency?: string;
    locale?: string;
}
export declare const DownloadableOptions: FunctionComponent<DownloadableOptionsProps>;
