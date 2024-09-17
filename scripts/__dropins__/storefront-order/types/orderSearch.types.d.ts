import { FieldsProps } from '.';

type errorInformationProps = {
    error: string;
};
export interface inLineAlertProps {
    text: string;
    type: 'success' | 'warning' | 'error';
}
export interface OrderSearchProps {
    className?: string;
    onError?: (errorInformation: errorInformationProps) => boolean | Promise<boolean> | undefined;
    isAuth: boolean;
    routeSignIn: () => string;
    routeCustomerOrderDetails: () => string;
    routeOrderDetails: () => string;
}
export interface useOrderSearchProps {
    onError?: (errorInformation: errorInformationProps) => boolean | Promise<boolean> | undefined;
    isAuth?: boolean;
    routeSignIn?: () => string;
    routeCustomerOrderDetails?: () => string;
    routeOrderDetails?: () => string;
}
export interface OrderSearchFormProps {
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
    loading?: boolean;
    inLineAlert: inLineAlertProps;
    fieldsConfig?: FieldsProps[];
}
export interface useOrderSearch extends Omit<OrderSearchProps, 'className'> {
}
export {};
//# sourceMappingURL=orderSearch.types.d.ts.map