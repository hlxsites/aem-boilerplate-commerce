import { Button, provider as UI } from '@dropins/tools/components.js';
import { rootLink, SUPPORT_PATH } from '../../../scripts/commerce.js';
import {
  ERROR_STATE_CONFIG, ERROR_CTA, PAY_BY_LINK_ERROR, mapErrorToState, resolveOnRetry,
} from './error-states.js';

function renderCta(ctaEl, cta, ns, onRetry) {
  if (cta === ERROR_CTA.CONTACT_SUPPORT) {
    UI.render(Button, {
      children: ns.ErrorContactSupportLabel || '',
      variant: 'primary',
      size: 'medium',
      href: rootLink(SUPPORT_PATH),
      'data-testid': 'pay-by-link-error-cta',
    })(ctaEl);
    return;
  }

  if (cta === ERROR_CTA.TRY_AGAIN) {
    UI.render(Button, {
      children: ns.ErrorTryAgainLabel || '',
      variant: 'primary',
      size: 'medium',
      onClick: () => { if (typeof onRetry === 'function') onRetry(); },
      'data-testid': 'pay-by-link-error-cta',
    })(ctaEl);
    return;
  }

  ctaEl.remove();
}

export function renderErrorCard(container, state, { labels, onRetry, headingLevel = 1 } = {}) {
  const resolvedState = ERROR_STATE_CONFIG[state] ? state : PAY_BY_LINK_ERROR.GENERIC;
  const config = ERROR_STATE_CONFIG[resolvedState];
  const ns = labels?.PayByLink || {};

  const level = Number.isInteger(headingLevel) && headingLevel >= 1 && headingLevel <= 6
    ? headingLevel
    : 1;
  const h = `h${level}`;

  container.innerHTML = `
    <div class="pay-by-link pay-by-link--error" data-state="${resolvedState}">
      <div class="pay-by-link__error-card" role="alert" aria-live="assertive">
        <${h} class="pay-by-link__error-title" tabindex="-1"></${h}>
        <p class="pay-by-link__error-body"></p>
        <div class="pay-by-link__error-cta"></div>
      </div>
    </div>
  `;

  const titleEl = container.querySelector('.pay-by-link__error-title');
  const bodyEl = container.querySelector('.pay-by-link__error-body');
  const ctaEl = container.querySelector('.pay-by-link__error-cta');

  titleEl.textContent = ns[config.titleKey] || '';
  bodyEl.textContent = ns[config.bodyKey] || '';

  renderCta(ctaEl, config.cta, ns, onRetry);
  titleEl.focus();
}

/**
 * Map an API/transport error to a state and render the matching error card.
 * @param {Element} container
 * @param {unknown} error - GraphQL response, thrown error, or pre-flight state string.
 * @param {{ labels?: object, retry?: Function }} options
 */
export function renderMappedError(container, error, { labels, retry } = {}) {
  const state = mapErrorToState(error);
  renderErrorCard(container, state, {
    labels,
    onRetry: resolveOnRetry(state, retry),
  });
}
