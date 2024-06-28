import { GuestOrderByTokenQuery, GuestOrderQuery } from '../__generated__/types';

export declare enum Actions {
    ADD_ORDER_REFERENCE = "ADD_ORDER_REFERENCE",
    LOADING = "LOADING",
    SET_DETAILS = "SET_DETAILS",
    ALERT = "ALERT",
    DISMISS_ALERT = "DISMISS_ALERT"
}
export type OrderDetails = GuestOrderQuery['guestOrder'] | GuestOrderByTokenQuery['guestOrderByToken'];
interface LoadingAction {
    type: Actions.LOADING;
}
interface SetDetailsAction {
    type: Actions.SET_DETAILS;
    details: OrderDetails | null;
    alert?: Alert;
    fromSearchForm?: boolean;
}
export declare enum AlertType {
    ERROR = "error",
    WARNING = "warning",
    SUCCESS = "success"
}
export declare enum AlertCode {
    INVALID_ORDER = "invalid_order",
    INVALID_SEARCH = "invalid_search",
    UNKNOWN = "unknown_error"
}
export type Alert = {
    type: AlertType;
    code: AlertCode;
    message: string;
};
interface AlertAction {
    type: Actions.ALERT;
    alert: Alert;
}
interface DismissAlertAction {
    type: Actions.DISMISS_ALERT;
}
export interface State {
    isLoading: boolean;
    details: OrderDetails | null;
    orderRef?: string;
    alert?: Alert;
    isOrderFromSearchForm: boolean;
}
type Action = LoadingAction | SetDetailsAction | AlertAction | DismissAlertAction;
export declare function orderConfirmationReducer(state: State, action: Action): State;
export {};
//# sourceMappingURL=orderConfirmation.d.ts.map