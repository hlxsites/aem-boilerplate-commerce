export const PAY_BY_LINK_ERROR = Object.freeze({
  MISSING: 'missing',
  MALFORMED: 'malformed',
  NOT_FOUND: 'not-found',
  EXPIRED: 'expired',
  ALREADY_COMPLETED: 'already-completed',
  CANCELLED: 'cancelled',
  GATEWAY_DECLINE: 'gateway-decline',
  SDK_LOAD_FAILURE: 'sdk-load-failure',
  GENERIC: 'generic',
});

export const ERROR_CTA = Object.freeze({
  NONE: 'none',
  CONTACT_SUPPORT: 'contactSupport',
  TRY_AGAIN: 'tryAgain',
});

export const ERROR_STATE_CONFIG = {
  [PAY_BY_LINK_ERROR.MISSING]: {
    titleKey: 'ErrorMissingTokenTitle',
    bodyKey: 'ErrorMissingTokenBody',
    cta: ERROR_CTA.CONTACT_SUPPORT,
  },
  [PAY_BY_LINK_ERROR.MALFORMED]: {
    titleKey: 'ErrorMalformedTokenTitle',
    bodyKey: 'ErrorMalformedTokenBody',
    cta: ERROR_CTA.CONTACT_SUPPORT,
  },
  [PAY_BY_LINK_ERROR.NOT_FOUND]: {
    titleKey: 'ErrorNotFoundTitle',
    bodyKey: 'ErrorNotFoundBody',
    cta: ERROR_CTA.CONTACT_SUPPORT,
  },
  [PAY_BY_LINK_ERROR.EXPIRED]: {
    titleKey: 'ErrorExpiredTitle',
    bodyKey: 'ErrorExpiredBody',
    cta: ERROR_CTA.CONTACT_SUPPORT,
  },
  [PAY_BY_LINK_ERROR.ALREADY_COMPLETED]: {
    titleKey: 'ErrorAlreadyCompletedTitle',
    bodyKey: 'ErrorAlreadyCompletedBody',
    cta: ERROR_CTA.NONE,
  },
  [PAY_BY_LINK_ERROR.CANCELLED]: {
    titleKey: 'ErrorCancelledTitle',
    bodyKey: 'ErrorCancelledBody',
    cta: ERROR_CTA.CONTACT_SUPPORT,
  },
  [PAY_BY_LINK_ERROR.GATEWAY_DECLINE]: {
    titleKey: 'ErrorGatewayDeclineTitle',
    bodyKey: 'ErrorGatewayDeclineBody',
    cta: ERROR_CTA.TRY_AGAIN,
  },
  [PAY_BY_LINK_ERROR.SDK_LOAD_FAILURE]: {
    titleKey: 'ErrorSdkLoadFailureTitle',
    bodyKey: 'ErrorSdkLoadFailureBody',
    cta: ERROR_CTA.TRY_AGAIN,
  },
  [PAY_BY_LINK_ERROR.GENERIC]: {
    titleKey: 'ErrorGenericTitle',
    bodyKey: 'ErrorGenericBody',
    cta: ERROR_CTA.TRY_AGAIN,
  },
};

const KNOWN_STATES = new Set(Object.values(PAY_BY_LINK_ERROR));

const HTTP_STATUS_TO_STATE = {
  404: PAY_BY_LINK_ERROR.NOT_FOUND,
  409: PAY_BY_LINK_ERROR.CANCELLED,
  410: PAY_BY_LINK_ERROR.EXPIRED,
};

const BACKEND_CODE_TO_STATE = {
  TOKEN_NOT_FOUND: PAY_BY_LINK_ERROR.NOT_FOUND,
  TOKEN_EXPIRED: PAY_BY_LINK_ERROR.EXPIRED,
  ORDER_ALREADY_PAID: PAY_BY_LINK_ERROR.ALREADY_COMPLETED,
  ORDER_CANCELLED: PAY_BY_LINK_ERROR.CANCELLED,
  PAY_BY_LINK_TOKEN_NOT_FOUND: PAY_BY_LINK_ERROR.NOT_FOUND,
  PAY_BY_LINK_TOKEN_CANCELLED: PAY_BY_LINK_ERROR.CANCELLED,
  PAY_BY_LINK_TOKEN_EXPIRED: PAY_BY_LINK_ERROR.EXPIRED,
  PAY_BY_LINK_ALREADY_COMPLETED: PAY_BY_LINK_ERROR.ALREADY_COMPLETED,
  PAY_BY_LINK_GATEWAY_DECLINE: PAY_BY_LINK_ERROR.GATEWAY_DECLINE,
};

function getHttpStatus(error) {
  if (!error || typeof error !== 'object') return undefined;
  const status = error.status
      ?? error.statusCode
      ?? error.response?.status
      ?? error.networkError?.statusCode;
  return typeof status === 'number' ? status : undefined;
}

function getBackendCode(error) {
  if (!error || typeof error !== 'object') return undefined;
  const code = error.extensions?.code
      ?? error.graphQLErrors?.[0]?.extensions?.code
      ?? error.errors?.[0]?.extensions?.code
      ?? error.body?.error?.code
      ?? error.code;
  return typeof code === 'string' ? code : undefined;
}

export function mapErrorToState(error) {
  if (typeof error === 'string' && KNOWN_STATES.has(error)) return error;

  const code = getBackendCode(error);
  if (code && BACKEND_CODE_TO_STATE[code]) return BACKEND_CODE_TO_STATE[code];

  const status = getHttpStatus(error);
  if (status && HTTP_STATUS_TO_STATE[status]) return HTTP_STATUS_TO_STATE[status];

  return PAY_BY_LINK_ERROR.GENERIC;
}
