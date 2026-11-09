/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, JSX } from 'preact';
type BaseProps = {
    href?: string;
    type?: 'button';
    disabled?: boolean;
};
export type PaginationButtonProps = BaseProps & (Omit<JSX.HTMLAttributes<HTMLAnchorElement>, 'type'> | Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'href'>);
export declare const PaginationButton: FunctionComponent<PaginationButtonProps>;
export {};
