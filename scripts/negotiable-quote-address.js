/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */

// Shared between commerce-b2b-negotiable-quote and commerce-b2b-negotiable-quote-template:
// both blocks let the customer pick a shipping address for a not-yet-submitted
// document, and both have to reconcile "what the container preselected" against
// "what the document already holds" the same way.

import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { Addresses } from '@dropins/storefront-account/containers/Addresses.js';
import {
  getCompanyAddressBook,
  getCustomerAddress,
} from '@dropins/storefront-account/api.js';
import { isCompanyAddressBookEnabled } from './initializers/account.js';

export const isShippingSelectable = (address) => {
  if (address?.addressType === 'SHIPPING') return true;
  if (address?.addressType === 'BILLING') return false;

  // Untyped entries are read through their defaults, the same way the container
  // reads them: one default and not the other decides which kind it is.
  return Boolean(address?.defaultShipping) && !address?.defaultBilling;
};

// The addresses the container will offer: the company address book when it is
// enabled, the customer's own otherwise. The caller needs the list itself, not
// just a preselection — the container reports only what it picked, and falls
// back to the first entry whether or not it is a default or the address the
// document actually holds.
export const readSelectableAddresses = async (b2bEnabled) => {
  try {
    const useCompanyAddresses = Boolean(b2bEnabled)
      && (await isCompanyAddressBookEnabled());

    if (!useCompanyAddresses) {
      const customerAddresses = await getCustomerAddress();

      return customerAddresses;
    }

    const items = (await getCompanyAddressBook())?.addresses?.items;

    // The address book returns billing entries too, and the container drops them
    // for a shipping selection. Matching that here keeps this list to what is
    // actually on offer.
    return items?.filter(isShippingSelectable);
  } catch {
    // An unreachable address book must not block the document. With no list
    // nothing is preselected, which is the safe outcome either way.
    return undefined;
  }
};

export const matchesAddressRef = (address, ref) => address?.uid === ref
  || String(address?.id ?? '') === String(ref);

/**
 * Builds the `ctx.onChange` handler that keeps a document's shipping-address
 * picker (an `Addresses` container) in sync with the saved address on the
 * quote/template. Encapsulates the "was this report a real click, or just the
 * container's automatic preselection" gate, since both callers need the same
 * answer to the same question.
 *
 * @param {object} options
 * @param {boolean} options.isB2BEnabled - value of the `commerce-b2b-enabled` config
 * @param {HTMLElement} options.shippingInformation - container the Addresses UI
 *   renders into
 * @param {HTMLElement} options.progressSpinner - spinner shown while a selection
 *   is being saved
 * @param {(error: unknown) => void} options.showAddressError - renders a save
 *   failure
 * @param {(data: object) => void} options.writeTypedAddress - debounced writer
 *   for a not-yet-saved address; payload shape is caller-specific
 * @param {string} options.className - className forwarded to the Addresses
 *   container
 * @param {object} [options.extraAddressesProps] - additional props merged into
 *   the Addresses container
 * @param {(next: object) => object | undefined} options.getData - reads the
 *   quote/template data off the slot's `next`
 * @param {(companyAddressId: string | undefined, customerAddressUid: string
 *   | undefined) => object} options.buildAddressRef - shapes the "use this
 *   saved address" payload; the field name for a personal address differs
 *   between callers
 * @param {(addressRef: object) => Promise<unknown>} options.writeSelectedAddress
 *   - persists `buildAddressRef`'s result on the document
 * @param {(event: Event, formValid: boolean) => void} [options.onSubmit] -
 *   forwarded to the Addresses container as-is; the two callers' new-address
 *   flows differ too much to share
 * @returns {(next: object) => Promise<void>} the handler to pass to `ctx.onChange`
 */
export const createShippingAddressChangeHandler = ({
  isB2BEnabled,
  shippingInformation,
  progressSpinner,
  showAddressError,
  writeTypedAddress,
  className,
  extraAddressesProps = {},
  getData,
  buildAddressRef,
  writeSelectedAddress,
  onSubmit,
}) => {
  // The container reports a selection as soon as it renders, before the
  // customer touches anything, and that report is whatever it preselected
  // rather than what the document holds. Writing it back would replace the
  // saved address on every page load. A real click always raises a change
  // event on the radio first, so this listener tells the two apart.
  let customerPickedAddress = false;
  shippingInformation.addEventListener('change', (event) => {
    if (event.target?.name === 'selectedShippingAddress') {
      customerPickedAddress = true;
    }
  }, true);

  return async (next) => {
    // Writing the typed address brings the document straight back through
    // here, and rebuilding would take the form apart under the customer's
    // hands — focus, text and all. The list can wait until they leave it;
    // the address shown above this container updates either way.
    if (shippingInformation.contains(document.activeElement)) return;

    // Remove existing content from the shipping information container
    shippingInformation.innerHTML = '';
    // Every re-render brings a fresh automatic report, so the flag has to
    // start over with it.
    customerPickedAddress = false;

    const data = getData(next);

    if (!data) return;

    if (!data.canSendForReview) return;

    // The document stores a copy of the address, so its `uid` matches
    // nothing in the address book. `companyAddressId` and
    // `customerAddressUid` say which saved address the copy came from.
    const savedAddress = data.shippingAddresses?.[0];
    const savedAddressRef = savedAddress?.companyAddressId
      ?? savedAddress?.customerAddressUid;
    const addressBookEnabled = Boolean(isB2BEnabled)
      && (await isCompanyAddressBookEnabled());
    const addresses = await readSelectableAddresses(isB2BEnabled);
    // Enabling the company address book leaves a personal address the
    // document still holds absent from the list. Restoring it then means
    // asking for an entry that is not there, and the container answers
    // with the first one, which the document does not hold.
    const restoreRef = addresses?.some(
      (address) => matchesAddressRef(address, savedAddressRef),
    ) ? savedAddressRef : undefined;
    // A default is an opening choice, so it applies only while the
    // document holds no address at all.
    const defaultAddress = savedAddress
      ? undefined
      : addresses?.find((address) => address?.defaultShipping);
    const defaultAddressRef = defaultAddress?.id ?? defaultAddress?.uid;
    const refOf = (address) => address?.companyAddressId ?? address?.uid;
    const isSameAsSaved = (address) => {
      if (savedAddressRef) return refOf(address) === savedAddressRef;
      // A drop-in build without those references leaves comparing the
      // address itself as the only way to recognise the saved one.
      return Boolean(
        savedAddress
        && address?.postcode === savedAddress.postcode
        && address?.city === savedAddress.city
        && String(address?.street ?? '') === String(savedAddress.street ?? ''),
      );
    };

    accountRenderer.render(Addresses, {
      b2bEnabled: isB2BEnabled,
      minifiedView: false,
      withActionsInMinifiedView: false,
      selectable: true,
      className,
      selectShipping: true,
      // Only with the company address book on: there the typed address
      // is sent as it is written, so a Save button has nothing to do.
      // Without it the form keeps its buttons and its submit handler.
      hideActionFormButtons: addressBookEnabled,
      // The address the document holds while it is still selectable, else
      // the customer's default. `0` says there is neither: nothing is
      // selected and the new-address form is offered instead.
      defaultSelectAddressId: restoreRef ?? defaultAddressRef ?? 0,
      ...extraAddressesProps,
      onAddressData: (params) => {
        const { data: addressData, isDataValid: isValid } = params;
        // A company address arrives as `companyAddressId`, because the
        // container moves the identifier there for the B2B flow and
        // leaves `uid` empty. A personal address arrives as `uid`. Once
        // the company address book is on, the backend accepts only the
        // company reference and rejects a customer address outright.
        const companyAddressId = addressData?.companyAddressId;
        const customerAddressUid = addressData?.uid;

        if (!isValid) return;
        // Nothing to write when the choice is what the document already holds.
        if (isSameAsSaved(addressData)) return;

        // Neither reference means this is the new-address form being typed
        // into. With the company address book on there is no Save button,
        // so the values stream out the way checkout sends them, and the
        // form stays on screen — no spinner here. Without the book the
        // form still has its buttons, and onSubmit does the writing.
        if (!companyAddressId && !customerAddressUid) {
          if (addressBookEnabled) writeTypedAddress(addressData);

          return;
        }

        // Past this point the report is a card from the list. The
        // container reports one as soon as it renders, so only a report
        // the customer actually caused may replace an address the document
        // already holds. Typing is not covered by this: it raises no
        // change event on the radio, and it is deliberate anyway.
        if (!customerPickedAddress && savedAddress) return;

        const addressRef = buildAddressRef(companyAddressId, customerAddressUid);

        progressSpinner.removeAttribute('hidden');
        shippingInformation.setAttribute('hidden', true);

        writeSelectedAddress(addressRef).catch(showAddressError).finally(() => {
          progressSpinner.setAttribute('hidden', true);
          shippingInformation.removeAttribute('hidden');
        });
      },
      onSubmit,
    })(shippingInformation);
  };
};
