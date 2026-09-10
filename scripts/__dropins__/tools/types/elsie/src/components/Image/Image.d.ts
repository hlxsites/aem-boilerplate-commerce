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
import { ResolveImageUrlOptions } from '../../lib';
export interface ImageProps extends HTMLAttributes<HTMLDivElement> {
    params?: ResolveImageUrlOptions;
    src: string;
    sizes?: string;
    onLoad?: (e: any) => void;
}
export declare const Image: FunctionComponent<ImageProps>;
