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
import { CartAddressCountry, NegotiableQuoteAddressCountry } from '../../__generated__/types';
import { Country as CountryModel } from '../models';
type AddressCountry = CartAddressCountry | NegotiableQuoteAddressCountry;
type OptionalAddressCountry = AddressCountry | undefined | null;
export declare const transformAddressCountry: (data: OptionalAddressCountry) => CountryModel;
export {};
