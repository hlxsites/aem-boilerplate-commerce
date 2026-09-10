/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { PlaceNegotiableQuoteOrderResponse } from '../../types';
import { OrderDataModel } from '../models';
export declare const transformPlaceNegotiableQuoteOrder: (response: PlaceNegotiableQuoteOrderResponse) => OrderDataModel | null;
