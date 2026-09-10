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
export interface PriceProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'size'> {
    amount?: number;
    currency?: string | null;
    locale?: string;
    formatOptions?: {
        [key: string]: any;
    };
    variant?: 'default' | 'strikethrough';
    weight?: 'bold' | 'normal';
    sale?: boolean;
    size?: 'small' | 'medium' | 'large';
}
export declare const Price: FunctionComponent<PriceProps>;
