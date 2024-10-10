import { classes, Slot } from '@adobe/elsie/lib';
import { useGetAttributesForm } from '@/auth/hooks/api/useGetAttributesForm';
import { useGetStoreConfigs } from '@/auth/hooks/api/useGetStoreConfigs';
import { usePasswordValidationMessage } from '@/auth/hooks/components/usePasswordValidationMessage';
import { useSignUpForm } from '@/auth/hooks/components/useSignUpForm';
import { useInLineAlert } from '@/auth/hooks/useInLineAlert';
import { Form, Button } from '@/auth/components';
import { Field, Checkbox, InLineAlert, InputPassword, Header, } from '@adobe/elsie/components';
import EmailConfirmationForm from '../EmailConfirmationForm';
import SkeletonLoader from '../SkeletonLoader';
import { useText } from '@adobe/elsie/i18n';
import '@/auth/components/SignUpForm/SignUpForm.css';
export const SignUpForm = ({ addressesData, formSize = 'default', inputsDefaultValueSet, fieldsConfigForApiVersion1, apiVersion2 = true, isAutoSignInEnabled = true, displayTermsOfUseCheckbox = false, displayNewsletterCheckbox = false, hideCloseBtnOnEmailConfirmation = false, routeRedirectOnEmailConfirmationClose, routeRedirectOnSignIn, routeSignIn, onErrorCallback, onSuccessCallback, setActiveComponent, slots, }) => {
    const translations = useText({
        title: 'Auth.SignUpForm.title',
        buttonPrimary: 'Auth.SignUpForm.buttonPrimary',
        buttonSecondary: 'Auth.SignUpForm.buttonSecondary',
        privacyPolicyDefaultText: 'Auth.SignUpForm.privacyPolicyDefaultText',
        subscribedDefaultText: 'Auth.SignUpForm.subscribedDefaultText',
        keepMeLoggedText: 'Auth.SignUpForm.keepMeLoggedText',
        customerTokenErrorMessage: 'Auth.Api.customerTokenErrorMessage',
        failedCreateCustomerAddress: 'Auth.SignUpForm.failedCreateCustomerAddress',
        placeholder: 'Auth.InputPassword.placeholder',
        floatingLabel: 'Auth.InputPassword.floatingLabel',
        requiredFieldError: 'Auth.FormText.requiredFieldError',
    });
    const { passwordConfigs, isEmailConfirmationRequired } = useGetStoreConfigs();
    const { fieldsListConfigs } = useGetAttributesForm({
        fieldsConfigForApiVersion1,
        apiVersion2,
        inputsDefaultValueSet,
    });
    const { inLineAlertProps, handleSetInLineAlertProps } = useInLineAlert();
    const { isKeepMeLogged, userEmail, showEmailConfirmationForm, isSuccessful, isClickSubmit, signUpPasswordValue, isLoading, onSubmitSignUp, signInButton, handleSetSignUpPasswordValue, onKeepMeLoggedChange, handleHideEmailConfirmationForm, } = useSignUpForm({
        addressesData,
        translations,
        isEmailConfirmationRequired,
        apiVersion2,
        passwordConfigs,
        isAutoSignInEnabled,
        routeRedirectOnSignIn,
        routeSignIn,
        onErrorCallback,
        onSuccessCallback,
        setActiveComponent,
        handleSetInLineAlertProps,
        routeRedirectOnEmailConfirmationClose,
    });
    const { isValidUniqueSymbols, defaultLengthMessage } = usePasswordValidationMessage({
        password: signUpPasswordValue,
        isClickSubmit,
        passwordConfigs,
    });
    const shouldShowPersistLoginCheckbox = !isEmailConfirmationRequired && addressesData?.length;
    if (!fieldsListConfigs.length && apiVersion2) {
        return (<div className={`auth-sign-up-form auth-sign-up-form--${formSize} skeleton-loader`} data-testid="SignUpForm">
        <SkeletonLoader activeSkeleton="signUpForm"/>
      </div>);
    }
    if (isSuccessful.status && slots?.SuccessNotification) {
        return (<Slot data-testid="successNotificationTestId" name="SuccessNotification" slot={slots?.SuccessNotification} context={{ isSuccessful }}/>);
    }
    if (showEmailConfirmationForm) {
        return (<EmailConfirmationForm formSize={formSize} userEmail={userEmail} inLineAlertProps={inLineAlertProps} hideCloseBtnOnEmailConfirmation={hideCloseBtnOnEmailConfirmation} handleSetInLineAlertProps={handleSetInLineAlertProps} onPrimaryButtonClick={handleHideEmailConfirmationForm}/>);
    }
    return (<div className={classes([
            'auth-sign-up-form',
            `auth-sign-up-form--${formSize}`,
        ])} data-testid="SignUpForm">
      <Header title={translations.title} divider={false} className="auth-sign-up-form__title"/>
      {inLineAlertProps.text ? (<InLineAlert className="auth-sign-up-form__notification" type={inLineAlertProps.type} variant="secondary" heading={inLineAlertProps.text} icon={inLineAlertProps.icon}/>) : null}
      <Form onSubmit={onSubmitSignUp} className="auth-sign-up-form__form" loading={isLoading} name="signUp_form" fieldsConfig={fieldsListConfigs}>
        <InputPassword validateLengthConfig={defaultLengthMessage} className="auth-sign-up-form__form__field" autoComplete={'current-password'} name={'password'} minLength={passwordConfigs?.minLength} errorMessage={isValidUniqueSymbols === 'error' ||
            defaultLengthMessage?.status === 'error' ||
            (isClickSubmit && signUpPasswordValue.length <= 0)
            ? translations.requiredFieldError
            : undefined} defaultValue={signUpPasswordValue} uniqueSymbolsStatus={isValidUniqueSymbols} requiredCharacterClasses={passwordConfigs?.requiredCharacterClasses} onValue={handleSetSignUpPasswordValue} placeholder={translations.placeholder} floatingLabel={translations.floatingLabel}>
          {shouldShowPersistLoginCheckbox ? (<div className={'auth-sign-up-form__automatic-login'}>
              <Field>
                <Checkbox name="" placeholder={translations.keepMeLoggedText} label={translations.keepMeLoggedText} checked={isKeepMeLogged} onChange={onKeepMeLoggedChange}/>
              </Field>
            </div>) : null}
        </InputPassword>

        {displayNewsletterCheckbox || displayTermsOfUseCheckbox ? (<div className="auth-sign-up-form__item auth-sign-up-form__checkbox">
            {displayNewsletterCheckbox ? (<Field>
                <Checkbox data-testid="isSubscribed" name="is_subscribed" placeholder={translations.subscribedDefaultText} label={translations.subscribedDefaultText}/>
              </Field>) : null}

            {displayTermsOfUseCheckbox ? (<Field>
                <Checkbox data-testid="privacyPolicy" name="privacyPolicy" placeholder={translations.privacyPolicyDefaultText} label={translations.privacyPolicyDefaultText}/>
              </Field>) : null}
          </div>) : null}

        <div className="auth-sign-up-form-buttons">
          <Button type="button" variant="tertiary" style={{ padding: 0 }} buttonText={translations.buttonSecondary} enableLoader={false} onClick={signInButton}/>
          <Button type="submit" buttonText={translations.buttonPrimary} variant="primary" enableLoader={isLoading}/>
        </div>
      </Form>
      <div id="createCustomerV2"/>
    </div>);
};
