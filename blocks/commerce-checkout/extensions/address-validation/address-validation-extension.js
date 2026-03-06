/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */

// Checkout Dropin
import AddressValidation from '@dropins/storefront-checkout/containers/AddressValidation.js';
import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';

// Tools
import { events } from '@dropins/tools/event-bus.js';

// Block Utilities
import { showModal, removeModal } from '../../utils.js';
import { getContainer, CONTAINERS } from '../../containers.js';
import { SHIPPING_ADDRESS_DATA_KEY } from '../../constants.js';

/**
 * Validates the shipping address against an address verification service.
 * Replace this stub with your actual address verification API call.
 *
 * @returns {Promise<Object|null>} - Returns a suggested address object
 */
const validateAddress = async () => {
  // ==========================================================================
  // TODO: Replace this stub with your actual address verification API call
  // ==========================================================================
  const shippingAddress = events.lastPayload('checkout/addresses/shipping').data;
  console.log('[Address validation] Current shipping address:', shippingAddress);

  return {
    city: 'Bainbridge Island',
    countryCode: 'US',
    postcode: '98110-2450',
    region: 'CA',
    street: ['123 Winslow Way E'],
  };
};

/**
 * Renders the AddressValidation container in a modal and returns a Promise
 * that resolves with the user's selection.
 *
 * @param {HTMLElement} container - DOM element to render into
 * @param {Object} suggestedAddress - The suggested address from validation
 * @returns {Promise<{selection: string, address: Object}>} - User's selection
 */
const renderAddressValidation = (container, suggestedAddress) => new Promise((resolve) => {
  CheckoutProvider.render(AddressValidation, {
    suggestedAddress,
    handleSelectedAddress: ({ selection, address }) => {
      resolve({ selection, address });
    },
  })(container);
});

// Get the base path for extension assets
const extensionBasePath = new URL('.', import.meta.url).pathname;

export default {
  id: 'address-validation',
  name: 'Address Validation Extension',

  externalStyles: [
    `${extensionBasePath}address-validation-extension.css`,
  ],

  hooks: {
    /**
     * VALIDATE HOOK: Validate shipping address before placing order
     *
     * This hook validates the shipping address before any payment processing.
     * If the address verification service returns a suggestion, a modal is
     * displayed allowing the shopper to choose between the original and
     * suggested addresses.
     *
     * - If user selects "suggested": Updates the form, sets isValid=false
     *   so the user can review and click Place Order again.
     * - If user selects "original": Leaves isValid=true, order proceeds
     *   to place-order hooks (payment processing).
     */
    'checkout/validate': async ({ context }) => {
      try {
        const suggestion = await validateAddress();

        if (suggestion) {
          const container = document.createElement('div');
          container.classList.add('checkout-address-validation');

          await showModal(container);

          // Wait for user selection
          const { selection, address } = await renderAddressValidation(container, suggestion);

          removeModal();

          if (selection === 'suggested') {
            // Update the shipping form UI with the suggested address
            // The form's onChange handler will automatically update the cart
            const shippingForm = getContainer(CONTAINERS.SHIPPING_ADDRESS_FORM);
            sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
            shippingForm.setProps((prevProps) => ({
              ...prevProps,
              inputsDefaultValueSet: address,
            }));

            // Set isValid to false so the user can review the updated address
            // and click Place Order again
            context.isValid = false;
          }
          // If "original" selected, isValid remains true and order proceeds
        }
        // If no suggestion, isValid remains true and order proceeds
      } catch (error) {
        console.error('[Address Validation] Error:', error);
        throw error;
      }
    },
  },
};
