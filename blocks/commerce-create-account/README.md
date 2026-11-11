# Commerce Create Account Block

## Overview

The Commerce Create Account block provides user registration functionality with sign-up form, email confirmation, and privacy policy consent. It handles new user account creation with authentication flow integration and redirects authenticated users to their account page.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

### OAuth 2.0 Sign-Up

When the shopper reaches this page from the sign-in link of an OAuth 2.0 authorization request (see the Commerce Login block README), the block reads the pending request from `sessionStorage` and switches to OAuth 2.0 mode: the new customer is signed in automatically and sent back to the OAuth client with an authorization code.

The flow lives in `scripts/oauth-authorize.js` (`handleOauthSignUp`). To add it to an existing storefront, set up the Commerce Login block first, then call the handler first in `decorate`:

```js
import { handleOauthSignUp } from '../../scripts/oauth-authorize.js';

export default async function decorate(block) {
  if (await handleOauthSignUp(block)) {
    return;
  }
  // existing block code
}
```

### Session Storage

| Key | Description |
|---|---|
| `oauth_authorization_request` | Pending OAuth 2.0 request written by the Commerce Login block. Ignored and removed after it expires (10 minutes). Removed when the code is requested. |

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is already authenticated, redirects to customer account page
- **Unauthenticated Users**: When user is not authenticated, renders sign-up form
- **Email Confirmation**: Handles email confirmation flow with appropriate UI states
- **OAuth 2.0 Sign-Up**: When an OAuth 2.0 request is pending, a signed-in shopper is sent straight back to the OAuth client, and a new shopper is signed in after sign-up and then sent back

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If already authenticated, redirects to account page
3. **Registration Process**: If not authenticated, renders sign-up form with privacy policy consent
4. **Email Confirmation**: After registration, handles email confirmation flow
5. **Success Redirect**: After successful sign-up and confirmation, redirects to account page

OAuth 2.0 sign-up mode:

1. **Sign-Up**: Renders the sign-up form with automatic sign-in
2. **Authorization Code**: After sign-in, calls the `issueOauthAuthorizationCode` GraphQL mutation with the stored request
3. **Client Redirect**: Redirects the browser to the `redirect_url` returned by Commerce (it carries `code`, `state` and `iss`)

When the store requires email confirmation, or the automatic sign-in fails, no code is requested and the pending request is kept: signing in from the same tab before it expires completes the authorization. When the automatic sign-in fails, the block shows that the account was created, with a link to the sign-in page.

### Error Handling

- **Authentication Errors**: If user is already authenticated, automatically redirects to account page
- **Registration Errors**: If sign-up fails, the SignUp container handles error display
- **Email Confirmation Errors**: If email confirmation fails, appropriate error handling is provided
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **OAuth Errors**: If Commerce refuses the authorization request, an inline error is shown and the shopper is not redirected; the shopper starts again from the client
- **Fallback Behavior**: Always falls back to sign-up form if not authenticated
