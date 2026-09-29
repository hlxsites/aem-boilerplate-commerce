import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { SelectableOption } from '../../data/models';

export interface CustomizableOptionsProps extends HTMLAttributes<HTMLDivElement> {
    options: SelectableOption[];
    selectedUIDs: string[];
    currency?: string;
    locale?: string;
    onValueToggle: (uid: string, selected: boolean) => void;
}
export declare const CustomizableOptions: FunctionComponent<CustomizableOptionsProps>;
//# sourceMappingURL=CustomizableOptions.d.ts.map