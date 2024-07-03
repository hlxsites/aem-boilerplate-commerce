/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { SuccessNotification } from '@dropins/storefront-auth/containers/SuccessNotification.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { getCookie } from '../../scripts/configs.js';
import { h } from '../../scripts/preact.js';

export default function decorate(block) {
  const isAuthenticated = !!getCookie('auth_dropin_user_token');

  if (isAuthenticated) {
    window.location.href = '/customer/account';
  } else {
    authRenderer.render(SignIn, {
      enableEmailConfirmation: true,
      routeForgotPassword: () => '/customer/forgotpassword',
      successNotificationForm: (userName) => h(SuccessNotification, {
        headingText: `Welcome ${userName}`,
        messageText: 'You have successfully logged in.',
        primaryButtonText: 'My Account',
        secondaryButtonText: 'Logout',
        onPrimaryButtonClick: () => {
          window.location.href = '/customer/account';
        },
        onSecondaryButtonClick: async () => {
          await authApi.revokeCustomerToken();
          window.location.href = '/';
        },
      }),
    })(block);
  }
}
