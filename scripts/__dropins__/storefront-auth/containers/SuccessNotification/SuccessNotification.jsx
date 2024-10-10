import SuccessNotificationForm from '@/auth/components/SuccessNotificationForm';
export const SuccessNotification = ({ formSize = 'default', slots, className, labels, }) => {
    return (<div className="auth-success-notification">
      <SuccessNotificationForm formSize={formSize} className={className} slots={slots} labels={labels}/>
    </div>);
};
