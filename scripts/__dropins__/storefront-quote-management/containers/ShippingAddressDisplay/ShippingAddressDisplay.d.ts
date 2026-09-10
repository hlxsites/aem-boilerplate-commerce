/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/lib';
import { ShippingAddress } from '../../data/models/negotiable-quote-model';
export interface ShippingAddressDisplayProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    shippingAddress?: ShippingAddress;
    loading?: boolean;
}
export declare const ShippingAddressDisplay: Container<ShippingAddressDisplayProps>;
