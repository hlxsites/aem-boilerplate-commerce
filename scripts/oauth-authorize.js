import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import {
  CORE_FETCH_GRAPHQL,
  CUSTOMER_FORGOTPASSWORD_PATH,
  checkIsAuthenticated,
  fetchPlaceholders,
  rootLink,
} from './commerce.js';
import { getUserTokenCookie } from './initializers/index.js';

/**
 * OAuth 2.0 authorization request parameters forwarded to Commerce.
 * See https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1 and RFC 7636 (PKCE).
 */
const OAUTH_PARAMS = [
  'client_id',
  'redirect_uri',
  'scope',
  'state',
  'code_challenge',
  'code_challenge_method',
];

const REQUIRED_PARAMS = ['client_id', 'redirect_uri', 'code_challenge', 'code_challenge_method'];

const ISSUE_AUTHORIZATION_CODE = `
  mutation ISSUE_OAUTH_AUTHORIZATION_CODE($input: IssueOauthAuthorizationCodeInput!) {
    issueOauthAuthorizationCode(input: $input) {
      redirect_url
    }
  }
`;

/**
 * Reads an OAuth 2.0 authorization request (authorization code + PKCE) from the page URL.
 * @param {string} [href] - URL to read, defaults to the current location.
 * @returns {Object|null} The request parameters, or null when the page was not opened by an
 * OAuth client.
 */
export function getOauthAuthorizationRequest(href = window.location.href) {
  const { searchParams } = new URL(href);
  if (searchParams.get('response_type') !== 'code') {
    return null;
  }

  const request = OAUTH_PARAMS.reduce((acc, name) => {
    const value = searchParams.get(name);
    if (value) {
      acc[name] = value;
    }
    return acc;
  }, {});

  return REQUIRED_PARAMS.every((name) => request[name]) ? request : null;
}

/**
 * Issues an authorization code for the signed-in customer.
 * @param {Object} request - Result of getOauthAuthorizationRequest().
 * @returns {Promise<string>} The client redirect URL carrying the code, state and iss.
 * @throws {Error} When Commerce refuses the request.
 */
export async function issueOauthAuthorizationCode(request) {
  const token = getUserTokenCookie();
  if (!token) {
    throw new Error('The customer is not signed in.');
  }
  CORE_FETCH_GRAPHQL.setFetchGraphQlHeader('Authorization', `Bearer ${token}`);

  const { data, errors } = await CORE_FETCH_GRAPHQL.fetchGraphQl(ISSUE_AUTHORIZATION_CODE, {
    method: 'POST',
    variables: { input: request },
  });

  const redirectUrl = data?.issueOauthAuthorizationCode?.redirect_url;
  if (errors?.length || !redirectUrl) {
    throw new Error(errors?.[0]?.message || 'The authorization request was refused.');
  }

  return redirectUrl;
}

/**
 * Issues the authorization code and sends the browser back to the OAuth client. On failure,
 * shows an inline error and keeps the shopper on the page.
 */
async function completeOauthAuthorization(request, $notification) {
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
 * Handles a sign-in page opened by an OAuth 2.0 client (authorization code + PKCE): signs the
 * shopper in when needed, then redirects back to the client with an authorization code.
 * @param {HTMLElement} block - The commerce-login block.
 * @returns {Promise<boolean>} True when the page was an OAuth request and was handled here.
 */
export async function handleOauth(block) {
  const request = getOauthAuthorizationRequest();
  if (!request) {
    return false;
  }

  const $notification = document.createElement('div');
  $notification.className = 'commerce-login__oauth-notification';

  if (checkIsAuthenticated()) {
    block.append($notification);
    await completeOauthAuthorization(request, $notification);
    return true;
  }

  // Without routeRedirectOnSignIn the drop-in calls onSuccessCallback and then renders the
  // SuccessNotification slot, which shows the redirect status instead of the welcome message.
  await authRenderer.render(SignIn, {
    routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
    onSuccessCallback: () => completeOauthAuthorization(request, $notification),
    slots: {
      SuccessNotification: (ctx) => ctx.replaceWith($notification),
    },
  })(block);
  return true;
}
