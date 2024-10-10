import ResetPasswordForm from '@/auth/components/ResetPasswordForm';
export const ResetPassword = ({ formSize, routeSignIn, onErrorCallback, }) => {
    return (<div className="auth-reset-password">
      <ResetPasswordForm formSize={formSize} routeSignIn={routeSignIn} onErrorCallback={onErrorCallback}/>
    </div>);
};
