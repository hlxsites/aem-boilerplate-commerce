import { FunctionComponent, h } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CheckboxFieldProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size'> {
    initialValue?: boolean;
    name?: string;
    errors?: Record<string, string>;
    label?: string;
    onChange?: (event: h.JSX.TargetedEvent<HTMLInputElement, Event>) => void;
    onBlur?: (event: h.JSX.TargetedEvent<HTMLInputElement, Event>) => void;
}
export declare const CheckboxField: FunctionComponent<CheckboxFieldProps>;
//# sourceMappingURL=CheckboxField.d.ts.map