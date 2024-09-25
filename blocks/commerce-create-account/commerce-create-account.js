/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { SignUp } from '@dropins/storefront-auth/containers/SignUp.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import checkIsAuthenticated from '../../scripts/utils/checkIsAuthenticated.js';

export default async function decorate(block) {
  const isAuthenticated = checkIsAuthenticated();

  if (isAuthenticated) {
    window.location.href = '/customer/account';
  } else {
    await authRenderer.render(SignUp, {
      hideCloseBtnOnEmailConfirmation: true,
      routeSignIn: () => '/customer/login',
      routeRedirectOnSignIn: () => '/customer/account',
    })(block);
  }
}
