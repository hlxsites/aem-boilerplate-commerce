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
/**
 * Awaitable 'sleep'.
 */
export declare function timeout(ms: number): Promise<void>;
/**
 * Converts SCREAMING_SNAKE_CASE to kebab-case.
 */
export declare function screamingSnakeToKebabCase(screamCaseText: string): string;
/** Maps an optional value or returns undefined if the value is undefined. */
export declare function mapOptional<T, R>(value: T | undefined, mapper: (v: T) => R): R | undefined;
/**
 * Generates a short random alphanumeric string (0-9, a-z), useful for building unique DOM
 * element ids.
 */
export declare function randomAlphanumericSuffix(length?: number): string;
//# sourceMappingURL=utils.d.ts.map