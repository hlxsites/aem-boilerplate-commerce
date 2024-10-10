import UpdatePasswordForm from '@/auth/components/UpdatePasswordForm';
export const UpdatePassword = ({ slots, formSize, signInOnSuccess, routeRedirectOnPasswordUpdate, routeRedirectOnSignIn, routeSignInPage, routeWrongUrlRedirect, onErrorCallback, onSuccessCallback, }) => {
    return (<div className="auth-update-password">
      <UpdatePasswordForm formSize={formSize} signInOnSuccess={signInOnSuccess} routeSignInPage={routeSignInPage} routeRedirectOnSignIn={routeRedirectOnSignIn} routeWrongUrlRedirect={routeWrongUrlRedirect} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback} slots={slots} routeRedirectOnPasswordUpdate={routeRedirectOnPasswordUpdate}/>
    </div>);
};
