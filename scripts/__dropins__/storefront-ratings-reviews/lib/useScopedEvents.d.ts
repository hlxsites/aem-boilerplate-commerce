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
import { EventChannel } from './scopedRequest.js';
export interface ScopedEventState<Request, Result> {
    request: Request | null;
    loading: boolean;
    error: string | null;
    accepted: {
        request: Request;
        result: Result;
    } | null;
}
/** Mirrors the `<channel>/*` events published by an API function for one scope. */
export declare const useScopedEvents: <Request, Result>(channel: EventChannel, scope?: string) => ScopedEventState<Request, Result>;
