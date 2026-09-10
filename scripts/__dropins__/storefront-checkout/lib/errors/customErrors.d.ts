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
import { FetchQueryError } from '../../api/fetch-graphql';
export declare class FetchError extends Error {
    constructor(reasons: FetchQueryError);
}
export declare class InvalidInput extends Error {
    constructor(message: string);
}
export declare class MissingArgument extends InvalidInput {
    constructor(argumentName: string);
}
export declare class MissingCart extends MissingArgument {
    constructor();
}
export declare class MissingCartAndQuote extends InvalidInput {
    constructor();
}
export declare class Unauthenticated extends Error {
    constructor();
}
export declare class MissingNegotiableQuoteId extends MissingArgument {
    constructor();
}
export declare class MissingEmail extends MissingArgument {
    constructor();
}
export declare class MissingPaymentMethod extends MissingArgument {
    constructor();
}
export declare class MissingShippingAddress extends MissingArgument {
    constructor();
}
export declare class MissingShippingMethod extends MissingArgument {
    constructor();
}
export declare class MissingBillingAddress extends MissingArgument {
    constructor();
}
export declare class MissingCountry extends MissingArgument {
    constructor();
}
