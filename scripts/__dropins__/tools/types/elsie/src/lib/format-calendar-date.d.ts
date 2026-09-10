/********************************************************************
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
/**
 * Formats a YYYY-MM-DD calendar date string for display in the user's
 * browser locale (e.g. MM/DD/YYYY in en-US, DD/MM/YYYY in en-GB,
 * YYYY/MM/DD in ja-JP). Useful for any "calendar date" value (birthdate,
 * appointment date, etc.) where the value must be interpreted as-is,
 * without shifting due to the viewer's timezone.
 *
 * @example
 * formatCalendarDate('2023-07-29'); // "07/29/2023" in en-US
 *
 * @param val a date string in YYYY-MM-DD format
 * @returns the locale-formatted date, or the original string if it isn't a valid YYYY-MM-DD date
 */
export declare const formatCalendarDate: (val: string) => string;
