/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { OrderProps } from '..';
export interface PlaceNegotiableQuoteOrderProps extends OrderProps {
}
export interface PlaceNegotiableQuoteOrderResponse {
    data: {
        placeNegotiableQuoteOrderV2?: {
            errors?: {
                code: string;
                message: string;
            }[];
            order?: PlaceNegotiableQuoteOrderProps;
        };
    };
    errors?: {
        message: string;
    }[];
}
