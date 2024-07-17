import { inLineAlertInterface } from './notification.types';

export interface EmailConfirmationFormProps {
    userEmail: string;
    formSize: 'default' | 'small';
    inLineAlertProps: inLineAlertInterface;
    hideCloseBtnOnEmailConfirmation?: boolean;
    handleSetInLineAlertProps: (value: inLineAlertInterface) => void;
    onPrimaryButtonClick: () => void;
}
export interface useEmailConfirmationFormProps extends Omit<EmailConfirmationFormProps, 'formSize' | 'inLineAlertProps' | 'onPrimaryButtonClick'> {
    handleSetInLineAlertProps: (value: inLineAlertInterface) => void;
}
//# sourceMappingURL=emailConfirmationForm.types.d.ts.map