import { useState, useCallback } from 'preact/hooks';
import { CheckWithCircle as Success, Warning, WarningWithCircle as Error, } from '@adobe/elsie/icons';
const iconsList = {
    success: <Success />,
    warning: <Warning />,
    error: <Error />,
};
export const useInLineAlert = () => {
    const [inLineAlertProps, setInLineAlertProps] = useState({});
    const handleSetInLineAlertProps = useCallback((notification) => {
        if (!notification || !notification.type) {
            setInLineAlertProps({});
            return;
        }
        const icon = iconsList[notification.type];
        setInLineAlertProps({
            ...notification,
            icon,
        });
    }, []);
    return { inLineAlertProps, handleSetInLineAlertProps };
};
