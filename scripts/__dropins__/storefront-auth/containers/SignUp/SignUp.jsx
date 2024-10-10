import SignUpForm from '@/auth/components/SignUpForm';
export const SignUp = ({ slots, formSize, apiVersion2, addressesData, isAutoSignInEnabled, inputsDefaultValueSet, displayNewsletterCheckbox, displayTermsOfUseCheckbox, fieldsConfigForApiVersion1, hideCloseBtnOnEmailConfirmation, routeRedirectOnEmailConfirmationClose, routeRedirectOnSignIn, onSuccessCallback, onErrorCallback, routeSignIn, }) => {
    return (<div className="auth-sign-up">
      <SignUpForm formSize={formSize} apiVersion2={apiVersion2} addressesData={addressesData} isAutoSignInEnabled={isAutoSignInEnabled} inputsDefaultValueSet={inputsDefaultValueSet} fieldsConfigForApiVersion1={fieldsConfigForApiVersion1} displayNewsletterCheckbox={displayNewsletterCheckbox} displayTermsOfUseCheckbox={displayTermsOfUseCheckbox} hideCloseBtnOnEmailConfirmation={hideCloseBtnOnEmailConfirmation} routeRedirectOnEmailConfirmationClose={routeRedirectOnEmailConfirmationClose} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignIn} slots={slots} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback}/>
    </div>);
};
