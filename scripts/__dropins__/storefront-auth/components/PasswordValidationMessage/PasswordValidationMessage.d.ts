import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { ValidateLengthConfigProps, statusTypes } from '../../types';

export interface PasswordValidationMessageProps {
    validateLengthConfig?: ValidateLengthConfigProps;
    isValidUniqueSymbols?: statusTypes;
    minLength?: number;
    requiredCharacterClasses?: number;
}
export declare const PasswordValidationMessage: FunctionComponent<PasswordValidationMessageProps & HTMLAttributes<HTMLDivElement>>;
//# sourceMappingURL=PasswordValidationMessage.d.ts.map