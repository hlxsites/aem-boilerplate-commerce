import SignInForm from '@/auth/components/SignInForm';
export const SignIn = ({ slots, labels, enableEmailConfirmation, initialEmailValue, formSize, renderSignUpLink, hideCloseBtnOnEmailConfirmation, routeRedirectOnEmailConfirmationClose, routeRedirectOnSignIn, routeForgotPassword, routeSignUp, onSuccessCallback, onErrorCallback, onSignUpLinkClick, }) => {
    return (<div className="auth-sign-in">
      <SignInForm slots={slots} labels={labels} formSize={formSize} renderSignUpLink={renderSignUpLink} initialEmailValue={initialEmailValue} enableEmailConfirmation={enableEmailConfirmation} hideCloseBtnOnEmailConfirmation={hideCloseBtnOnEmailConfirmation} routeRedirectOnEmailConfirmationClose={routeRedirectOnEmailConfirmationClose} routeSignUp={routeSignUp} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback} onSignUpLinkClick={onSignUpLinkClick} routeForgotPassword={routeForgotPassword} routeRedirectOnSignIn={routeRedirectOnSignIn}/>
    </div>);
};
