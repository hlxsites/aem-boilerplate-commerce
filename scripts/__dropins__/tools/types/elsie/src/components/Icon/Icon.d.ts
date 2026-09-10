/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
import { SVGProps } from 'preact/compat';
export type IconType = keyof typeof import('../../icons');
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'size'> {
    source?: FunctionComponent<SVGProps<SVGSVGElement> & {
        title?: string;
    }> | IconType | string;
    size?: '12' | '16' | '24' | '32' | '64' | '80';
    stroke?: '1' | '2' | '3' | '4';
    className?: string;
    title?: string;
}
export type IconNode = FunctionComponent<SVGProps<SVGSVGElement> & {
    title?: string;
}>;
export declare function Icon({ source: Source, size, stroke, viewBox, className, ...props }: IconProps): import("preact").JSX.Element;
