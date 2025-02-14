import { FunctionComponent } from 'preact';
import { ChangeEvent } from 'preact/compat';

export interface LabelledInputProps {
    checked: boolean;
    name: string;
    attribute: string;
    type: "checkbox" | "radio";
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    value: string;
    count?: number | null;
}
export declare const LabelledInput: FunctionComponent<LabelledInputProps>;
//# sourceMappingURL=LabelledInput.d.ts.map