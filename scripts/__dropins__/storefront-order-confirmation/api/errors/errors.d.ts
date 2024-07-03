import { FetchQueryError } from '@adobe/fetch-graphql';

export declare class FetchError extends Error {
    constructor(reasons: FetchQueryError);
}
export declare class MissingArgument extends Error {
    constructor(argument: string);
}
export declare class OrderNotFound extends Error {
    constructor();
}
//# sourceMappingURL=errors.d.ts.map