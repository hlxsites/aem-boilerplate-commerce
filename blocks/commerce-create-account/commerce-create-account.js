import { SignUp } from '@dropins/storefront-auth/containers/SignUp.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { fetchGraphQl } from '@dropins/tools/fetch-graphql.js';
import {
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_LOGIN_PATH,
  PRIVACY_POLICY_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/auth.js';

let newsletterInput;

/**
 * Creates a newsletter subscription checkbox with proper accessibility
 * @returns {HTMLElement} The newsletter checkbox container
 */
function createNewsletterCheckbox() {
  const newsletterCheckbox = document.createElement('div');
  newsletterCheckbox.className = 'newsletter-checkbox';

  newsletterInput = document.createElement('input');
  newsletterInput.type = 'checkbox';
  newsletterInput.id = 'newsletter-subscription';
  newsletterInput.name = 'is_subscribed';
  newsletterInput.value = 'true';
  newsletterInput.checked = true;
  newsletterInput.setAttribute('aria-describedby', 'newsletter-description');

  const newsletterLabel = document.createElement('label');
  newsletterLabel.htmlFor = 'newsletter-subscription';
  newsletterLabel.textContent = 'Keep me informed about the latest products, trends and promotions';
  newsletterLabel.className = 'newsletter-label';

  // Add description for screen readers
  const description = document.createElement('div');
  description.id = 'newsletter-description';
  description.className = 'sr-only';
  description.textContent = 'Subscribe to receive promotional emails and updates';

  newsletterCheckbox.appendChild(newsletterInput);
  newsletterCheckbox.appendChild(newsletterLabel);
  newsletterCheckbox.appendChild(description);

  return newsletterCheckbox;
}

/**
 * Subscribes user to newsletter via GraphQL mutation
 * @param {string} email - User's email address
 * @returns {Promise<void>}
 */
async function subscribeToNewsletter(email) {
  try {
    const query = `
      mutation subscribeEmailToNewsletter($email: String!) {
        subscribeEmailToNewsletter(email: $email) {
          status
        }
      }`;

    const result = await fetchGraphQl(query, {
      method: 'POST',
      variables: { email },
    });

    if (result.errors) {
      console.error('Newsletter subscription failed:', result.errors);
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
  }
}

/**
 * Handles successful account creation
 * @param {Object} data - User data from successful signup
 */
async function handleSignupSuccess(data) {
  // If newsletter checkbox is not checked, do not subscribe to newsletter
  if (!newsletterInput?.checked) {
    return;
  }

  const { userEmail: email } = data;
  if (email) {
    await subscribeToNewsletter(email);
  }
}

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

  await authRenderer.render(SignUp, {
    hideCloseBtnOnEmailConfirmation: true,
    routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
    routeRedirectOnSignIn: () => rootLink(CUSTOMER_ACCOUNT_PATH),
    // Subscribe to newsletter after sign up
    onSuccessCallback: handleSignupSuccess,
    slots: {
      PrivacyPolicyConsent: async (ctx) => {
        const wrapper = document.createElement('span');
        wrapper.className = 'privacy-policy-wrapper';

        const newsletterCheckbox = createNewsletterCheckbox();
        wrapper.appendChild(newsletterCheckbox);

        // copied from authPrivacyPolicyConsentSlot in file scripts/commerce.js
        Object.assign(wrapper.style, {
          color: 'var(--color-neutral-700)',
          font: 'var(--type-details-caption-2-font)',
          display: 'block',
          marginBottom: 'var(--spacing-medium)',
        });

        const link = document.createElement('a');
        link.href = PRIVACY_POLICY_PATH;
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
