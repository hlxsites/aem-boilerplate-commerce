import { createAccountContext, loginContext, logoutContext, } from '../data/transforms';
var EventsList;
(function (EventsList) {
    EventsList["CREATE_ACCOUNT_EVENT"] = "create-account";
    EventsList["SIGN_IN"] = "sign-in";
    EventsList["SIGN_OUT"] = "sign-out";
})(EventsList || (EventsList = {}));
const AUTH_CONTEXT = 'authContext';
const events = {
    CREATE_ACCOUNT: EventsList.CREATE_ACCOUNT_EVENT,
    SIGN_IN: EventsList.SIGN_IN,
    SIGN_OUT: EventsList.SIGN_OUT,
};
function setContext(name, data) {
    const adobeDataLayer = window.adobeDataLayer || [];
    adobeDataLayer.push({
        [name]: null,
    });
    adobeDataLayer.push({
        [name]: data,
    });
}
export function pushEvent(event) {
    const adobeDataLayer = window.adobeDataLayer || [];
    adobeDataLayer.push((acdl) => {
        const state = acdl.getState ? acdl.getState() : {};
        acdl.push({
            event,
            eventInfo: {
                ...state,
            },
        });
    });
}
function createAccountEvent(eventData) {
    const transformedEventData = createAccountContext(eventData);
    setContext(AUTH_CONTEXT, transformedEventData);
    pushEvent(events.CREATE_ACCOUNT);
}
function loginEvent(eventData) {
    const transformedEventData = loginContext(eventData);
    setContext(AUTH_CONTEXT, transformedEventData);
    pushEvent(events.SIGN_IN);
}
function logoutEvent(eventData) {
    const transformedEventData = logoutContext(eventData);
    setContext(AUTH_CONTEXT, transformedEventData);
    pushEvent(events.SIGN_OUT);
}
const publishEvents = (eventType, eventParams) => {
    const storeConfigRaw = sessionStorage.getItem('storeConfig');
    const storeConfig = storeConfigRaw ? JSON.parse(storeConfigRaw) : {};
    const eventData = { ...storeConfig, ...eventParams };
    switch (eventType) {
        case EventsList.CREATE_ACCOUNT_EVENT:
            createAccountEvent(eventData);
            break;
        case EventsList.SIGN_IN:
            loginEvent(eventData);
            break;
        case EventsList.SIGN_OUT:
            logoutEvent(eventData);
            break;
        default:
            return null;
    }
};
export { EventsList, publishEvents };
