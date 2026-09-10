/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
type OptionValue = string | number;
interface Option {
    label: string;
    value: OptionValue;
    disabled?: boolean;
}
type SelectedValues = OptionValue[];
export interface MultiSelectProps {
    options: Option[];
    value: SelectedValues;
    onChange: (value: SelectedValues) => void;
    placeholder?: string;
    selectAllText?: string;
    deselectAllText?: string;
    noResultsText?: string;
    name?: string;
    disabled?: boolean;
    className?: string;
    maxHeight?: number;
    floatingLabel?: string;
    error?: boolean;
    success?: boolean;
    id?: string;
}
export declare const MultiSelect: FunctionComponent<MultiSelectProps>;
export {};
