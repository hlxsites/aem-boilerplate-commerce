import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { SignUp } from '@dropins/storefront-auth/containers/SignUp.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import {
  CORE_FETCH_GRAPHQL,
  CUSTOMER_CREATE_PATH,
  CUSTOMER_FORGOTPASSWORD_PATH,
  CUSTOMER_LOGIN_PATH,
  authPrivacyPolicyConsentSlot,
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

// The request lives only in the sign-in page URL, so it is kept for the tab to survive the
// sign-in to create-account navigation. It holds no secret: the PKCE code_verifier stays with the
// client, and Commerce validates the request again when the code is issued.
const STORAGE_KEY = 'oauth_authorization_request';
const STORAGE_TTL_MS = 10 * 60 * 1000;

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

function hasOauthParams(href = window.location.href) {
  const { searchParams } = new URL(href);
  return searchParams.has('response_type') || searchParams.has('client_id');
}

// Storage can be unavailable or full: the flow then keeps the request of the page URL only.
function clearPendingOauthRequest() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Could not remove the pending OAuth request.', error);
  }
}

function storePendingOauthRequest(request) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      request,
      expires: Date.now() + STORAGE_TTL_MS,
    }));
  } catch (error) {
    console.warn('Could not keep the OAuth request for the sign-up page.', error);
  }
}

function readPendingOauthRequest() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (stored?.expires > Date.now() && REQUIRED_PARAMS.every((name) => stored.request?.[name])) {
      return stored.request;
    }
  } catch (error) {
    // Unreadable value: treated as no request.
  }
  return null;
}

/**
 * Returns the OAuth 2.0 authorization request of the current tab. Authorization parameters in the
 * page URL start a new request that replaces any stored one, even when they are incomplete (the
 * page then falls back to its regular flow). Without them, the request stored by a previous page of
 * this tab is resumed until it expires.
 * @returns {Object|null} The request parameters, or null when there is none.
 */
function getPendingOauthRequest() {
  if (hasOauthParams()) {
    const request = getOauthAuthorizationRequest();
    if (request) {
      storePendingOauthRequest(request);
    } else {
      clearPendingOauthRequest();
    }
    return request;
  }

  const stored = readPendingOauthRequest();
  if (!stored) {
    clearPendingOauthRequest();
  }
  return stored;
}

async function getOauthLabels() {
  return (await fetchPlaceholders('placeholders/auth.json'))?.Auth?.OAuth ?? {};
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
  clearPendingOauthRequest();
  const labels = await getOauthLabels();
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
  const request = getPendingOauthRequest();
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
    renderSignUpLink: true,
    routeSignUp: () => rootLink(CUSTOMER_CREATE_PATH),
    onSuccessCallback: () => completeOauthAuthorization(request, $notification),
    slots: {
      SuccessNotification: (ctx) => ctx.replaceWith($notification),
    },
  })(block);
  return true;
}

/**
 * Handles a create-account page reached from an OAuth 2.0 sign-in: the new customer is signed in
 * automatically and then sent back to the OAuth client with an authorization code.
 * @param {HTMLElement} block - The commerce-create-account block.
 * @returns {Promise<boolean>} True when an OAuth request is pending and was handled here.
 */
export async function handleOauthSignUp(block) {
  const request = getPendingOauthRequest();
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

  const labels = await getOauthLabels();
  await authRenderer.render(SignUp, {
    hideCloseBtnOnEmailConfirmation: true,
    isAutoSignInEnabled: true,
    routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
    // SignUp also reports success when the account was created but the customer is not signed in
    // (email confirmation required, or the automatic sign-in failed). The request is then kept, so
    // signing in from this tab still completes the authorization.
    onSuccessCallback: async () => {
      if (checkIsAuthenticated()) {
        await completeOauthAuthorization(request, $notification);
      }
    },
    slots: {
      ...authPrivacyPolicyConsentSlot,
      SuccessNotification: (ctx) => {
        if (checkIsAuthenticated()) {
          ctx.replaceWith($notification);
          return;
        }
        // The account exists but the automatic sign-in failed: the shopper signs in to continue.
        const $message = document.createElement('p');
        $message.textContent = labels.accountCreated ?? 'Your account was created. Sign in to continue.';
        const $signIn = document.createElement('a');
        $signIn.className = 'button';
        $signIn.href = rootLink(CUSTOMER_LOGIN_PATH);
        $signIn.textContent = labels.signIn ?? 'Sign in';
        $notification.replaceChildren($message, $signIn);
        ctx.replaceWith($notification);
      },
    },
  })(block);
  return true;
}
