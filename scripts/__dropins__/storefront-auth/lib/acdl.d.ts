/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
declare enum EventsList {
    CREATE_ACCOUNT_EVENT = "create-account",
    SIGN_IN = "sign-in",
    SIGN_OUT = "sign-out"
}
declare function pushEvent(event: string): void;
declare const publishEvents: (eventType: string, eventParams: any) => null | undefined;
export { EventsList, publishEvents, pushEvent };
//# sourceMappingURL=acdl.d.ts.map