import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { SelectableOption, ShopperInputOption, ValuesModel } from '../../data/models';

export interface CustomizableOptionsProps extends HTMLAttributes<HTMLDivElement> {
    options: SelectableOption[];
    selectedUIDs: string[];
    currency?: string;
    locale?: string;
    onValueToggle: (uid: string, selected: boolean) => void;
    shopperInput?: ShopperInputOption[];
    enteredOptions?: ValuesModel['enteredOptions'];
    onEnteredValueChange?: (uid: string, value: string) => void;
}
export declare const CustomizableOptions: FunctionComponent<CustomizableOptionsProps>;
//# sourceMappingURL=CustomizableOptions.d.ts.map