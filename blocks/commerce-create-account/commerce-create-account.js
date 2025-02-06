/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { SignUp } from '@dropins/storefront-auth/containers/SignUp.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { CUSTOMER_ACCOUNT_PATH, CUSTOMER_LOGIN_PATH } from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/auth.js';

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = CUSTOMER_ACCOUNT_PATH;
  } else {
    await authRenderer.render(SignUp, {
      hideCloseBtnOnEmailConfirmation: true,
      routeSignIn: () => CUSTOMER_LOGIN_PATH,
      routeRedirectOnSignIn: () => CUSTOMER_ACCOUNT_PATH,
      slots: {
        PrivacyPolicyConsent: async (ctx) => {
          const wrapper = document.createElement('span');
          Object.assign(wrapper.style, {
            color: 'var(--color-neutral-700)',
            font: 'var(--type-details-caption-2-font)',
            display: 'block',
            marginBottom: 'var(--spacing-medium)',
          });

          const link = document.createElement('a');
          link.href = '/privacy-policy';
          link.target = '_blank';
          link.textContent = 'Privacy Policy';

          wrapper.append(
            'By creating an account, you acknowledge that you have read and agree to our ',
            link,
            ', which outlines how we collect, use, and protect your personal data.',
          );

          ctx.appendChild(wrapper);
        },
      },
    })(block);
  }
}
