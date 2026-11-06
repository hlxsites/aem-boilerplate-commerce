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
import { SlotProps } from '@dropins/tools/lib/slot';
export type SubmitSkuValue = Array<{
    sku: string;
    quantity: number;
}>;
type DefaultSlotContext = {
    handleAddToList: (values: SubmitSkuValue) => void;
    loading: boolean;
    textAreaValue: string;
};
export interface QuickOrderMultipleSkuProps {
    className?: string;
    onChange?: (skus: string[]) => void;
    slots?: {
        AddToListButton?: SlotProps<DefaultSlotContext>;
    };
}
export interface SkuListInputProps {
    t: Record<string, string>;
    onChange: (e: Event) => void;
    textAreaValue: string;
    loading: boolean;
    disabled?: boolean;
}
export interface UseQuickOrderMultipleSkuProps extends Omit<QuickOrderMultipleSkuProps, 'className'> {
}
export interface UseQuickOrderMultipleSkuReturn {
    handleChange: (e: Event) => void;
    textAreaValue: string;
    loading: boolean;
    handleAddToList: (values?: SubmitSkuValue) => void;
}
export {};
