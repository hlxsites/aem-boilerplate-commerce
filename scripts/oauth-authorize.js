import { CORE_FETCH_GRAPHQL } from './commerce.js';
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
