/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
export type EventChannel = 'reviews';
export type UntypedEventBus = {
    emit: (event: string, payload: unknown, options?: {
        scope?: string;
    }) => void;
    on: (event: string, handler: (payload: any) => void, options?: {
        eager?: boolean;
        scope?: string;
    }) => {
        off: () => void;
    } | undefined;
};
export declare const eventBus: UntypedEventBus;
/**
 * Publishes `<channel>/request`, `<channel>/loading`, `<channel>/result` and
 * `<channel>/error` for one request and resolves with its result. A request that
 * a newer one in the same channel and scope has superseded publishes nothing.
 */
export declare function publishRequest<Request, Result>(channel: EventChannel, request: Request, scope: string | undefined, load: () => Promise<Result>): Promise<Result>;
