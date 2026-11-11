# Commerce Login Block

## Overview

The Commerce Login block provides user authentication functionality using the @dropins/storefront-auth SignIn container. It handles user sign-in with forgot password integration and redirects authenticated users to their account page.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

### URL Parameters

The block switches to OAuth 2.0 authorization mode when the page URL carries an authorization code request with PKCE (for example, from an AI agent that links the shopper's account through Universal Commerce Protocol):

| Parameter | Required | Description |
|---|---|---|
| `response_type` | Yes | Must be `code` |
| `client_id` | Yes | OAuth client registered in Commerce Admin |
| `redirect_uri` | Yes | Must exactly match a redirect URI registered for the client |
| `code_challenge` | Yes | PKCE challenge |
| `code_challenge_method` | Yes | Must be `S256` |
| `scope` | No | Space-separated scopes |
| `state` | No | Returned unchanged to the client |

Without these parameters, the block behaves as before.

The request is also kept in `sessionStorage` (see [Session Storage](#session-storage)) so that a shopper who follows the sign-up link can create an account and still be sent back to the OAuth client.

The OAuth 2.0 flow lives in `scripts/oauth-authorize.js` (`handleOauth`). To add it to an existing storefront:

1. Copy `scripts/oauth-authorize.js` into your project.
2. In `scripts/commerce.js`, export `CUSTOMER_CREATE_PATH` if it is missing:

```js
export const CUSTOMER_CREATE_PATH = `${CUSTOMER_PATH}/create`;
```

3. In `blocks/commerce-login/commerce-login.js`, import the handler and call it first in `decorate`:

```js
import { handleOauth } from '../../scripts/oauth-authorize.js';

export default async function decorate(block) {
  if (await handleOauth(block)) {
    return;
  }
  // existing block code
}
```

4. To support sign-up during authorization, add the same call to `blocks/commerce-create-account/commerce-create-account.js` with `handleOauthSignUp` (see the Commerce Create Account block README).

### Placeholders

Optional keys in `placeholders/auth.json`:

| Key | Default |
|---|---|
| `Auth.OAuth.redirecting` | `Redirecting you back…` |
| `Auth.OAuth.errorHeading` | `We could not complete the sign-in for this app.` |
| `Auth.OAuth.accountCreated` | `Your account was created. Sign in to continue.` |
| `Auth.OAuth.signIn` | `Sign in` |

### Session Storage

| Key | Description |
|---|---|
| `oauth_authorization_request` | The pending OAuth 2.0 request of the tab, with an expiry 10 minutes after it was read from the URL. Removed when the code is requested. It holds no secret: the PKCE `code_verifier` stays with the client, and Commerce validates the request again when the code is issued. |

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is already authenticated, redirects to customer account page
- **Unauthenticated Users**: When user is not authenticated, renders sign-in form
- **Forgot Password**: Provides integration with forgot password functionality
- **OAuth 2.0 Authorization**: When OAuth parameters are present, the signed-in shopper is sent back to the OAuth client with an authorization code instead of the account page

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If already authenticated, redirects to account page
3. **Sign-In Process**: If not authenticated, renders sign-in form with forgot password link
4. **Success Redirect**: After successful sign-in, redirects to account page

OAuth 2.0 authorization mode:

1. **Sign-In**: If not authenticated, renders the sign-in form with a sign-up link; if already authenticated, skips it
2. **Authorization Code**: Calls the `issueOauthAuthorizationCode` GraphQL mutation with the customer token and the URL parameters
3. **Client Redirect**: Redirects the browser to the `redirect_url` returned by Commerce (it carries `code`, `state` and `iss`)

Commerce validates the client, redirect URI, scopes and PKCE, and rejects the request when the OAuth 2.0 server is disabled. No consent screen is shown: OAuth clients can only be registered by the merchant (Commerce Admin or the admin REST API), and registering a client preapproves it for the shoppers of the store.

Authorization parameters in the URL always start a new request and replace a pending one; when they are incomplete, the pending request is dropped and the regular sign-in flow is used. If `sessionStorage` is unavailable, the request of the URL is still completed, but it is not kept for the sign-up page.

### Error Handling

- **Authentication Errors**: If user is already authenticated, automatically redirects to account page
- **Sign-In Errors**: If sign-in fails, the SignIn container handles error display
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **OAuth Errors**: If Commerce refuses the authorization request, an inline error is shown and the shopper is not redirected
- **Fallback Behavior**: Always falls back to sign-in form if not authenticated
