import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import {
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_FORGOTPASSWORD_PATH,
  checkIsAuthenticated,
  fetchPlaceholders,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/auth.js';

/**
 * Completes an OAuth 2.0 authorization request for the signed-in customer: Commerce issues
 * the authorization code and the browser goes back to the client.
 */
async function completeOauthAuthorization(request, $notification, issueOauthAuthorizationCode) {
  const labels = (await fetchPlaceholders('placeholders/auth.json'))?.Auth?.OAuth ?? {};
  $notification.textContent = labels.redirecting ?? 'Redirecting you back…';

  try {
    window.location.assign(await issueOauthAuthorizationCode(request));
  } catch (error) {
    console.error('OAuth authorization failed.', error);
    $notification.textContent = '';
    const { InLineAlert, provider: UI } = await import('@dropins/tools/components.js');
    await UI.render(InLineAlert, {
      heading: labels.errorHeading ?? 'We could not complete the sign-in for this app.',
      description: error.message,
      type: 'error',
      variant: 'primary',
      role: 'alert',
    })($notification);
  }
}

/**
 * Loads the OAuth 2.0 helpers only when the page was opened by an OAuth client, so regular
 * sign-in pages load nothing extra.
 * @returns {Promise<Object|null>} The authorization request and the code issuer, or null.
 */
async function loadOauthAuthorization() {
  if (new URLSearchParams(window.location.search).get('response_type') !== 'code') {
    return null;
  }
  const { getOauthAuthorizationRequest, issueOauthAuthorizationCode } = await import(
    '../../scripts/oauth-authorize.js'
  );
  const request = getOauthAuthorizationRequest();
  return request ? { request, issueOauthAuthorizationCode } : null;
}

export default async function decorate(block) {
  const oauth = await loadOauthAuthorization();

  if (oauth) {
    const { request: oauthRequest, issueOauthAuthorizationCode } = oauth;
    const $notification = document.createElement('div');
    $notification.className = 'commerce-login__oauth-notification';

    if (checkIsAuthenticated()) {
      block.append($notification);
      await completeOauthAuthorization(oauthRequest, $notification, issueOauthAuthorizationCode);
      return;
    }

    // Without routeRedirectOnSignIn the drop-in calls onSuccessCallback and then renders the
    // SuccessNotification slot, which shows the redirect status instead of the welcome message.
    await authRenderer.render(SignIn, {
      routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
      onSuccessCallback: () => completeOauthAuthorization(
        oauthRequest,
        $notification,
        issueOauthAuthorizationCode,
      ),
      slots: {
        SuccessNotification: (ctx) => ctx.replaceWith($notification),
      },
    })(block);
    return;
  }

  if (checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  } else {
    await authRenderer.render(SignIn, {
      routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
      routeRedirectOnSignIn: () => rootLink(CUSTOMER_ACCOUNT_PATH),
    })(block);
  }
}
