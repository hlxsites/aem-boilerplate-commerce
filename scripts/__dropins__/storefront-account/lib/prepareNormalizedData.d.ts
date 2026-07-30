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
import { Country, RegionTransform } from '../data/models';
type Field = {
    customUpperCode: string;
    defaultValue?: string | boolean | number;
    options?: any[];
    required?: boolean;
    disabled?: boolean;
};
interface ProcessFieldsProps {
    fields: Field[];
    countryOptions: Country[];
    regionOptions: RegionTransform[];
    isRequiredRegion: boolean;
    isRequiredPostCode: boolean;
    disableField: boolean;
    addressId?: string | number;
}
declare const _default: ({ fields, addressId, countryOptions, disableField, regionOptions, isRequiredRegion, isRequiredPostCode, }: ProcessFieldsProps) => Field[];
export default _default;
