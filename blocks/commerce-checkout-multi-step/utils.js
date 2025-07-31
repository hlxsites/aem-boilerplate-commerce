/* eslint-disable import/no-unresolved */
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';
import { debounce } from '@dropins/tools/lib.js';
import createModal from '../modal/modal.js';

/**
 * Scrolls to an element smoothly and focuses it
 * @param {HTMLElement} element - The DOM element to scroll to and focus
 */
export function scrollToElement(element) {
  element.scrollIntoView({ behavior: 'smooth' });
  element.focus();
}

/**
 * Checks if data is empty based on total quantity or isEmpty flag
 * @param {Object} data - The cart/checkout data object with totalQuantity or isEmpty property
 * @returns {boolean} - True if data is empty or null/undefined
 */
export function isDataEmpty(data) {
  return !data || data.isEmpty || data.totalQuantity < 1;
}

/**
 * Extracts and normalizes address data from checkout data
 * @param {Object} checkoutData - The checkout data object containing address information
 * @param {string} type - The address type ('shipping' or 'billing')
 * @returns {Object|null} - Normalized address object or null if not found
 */
export function getCartAddress(checkoutData, type) {
  if (!checkoutData) return null;

  const address = type === 'shipping'
    ? checkoutData.shippingAddresses?.[0]
    : checkoutData.billingAddress;

  if (!address) return null;

  return {
    id: address?.id,
    city: address.city,
    company: address?.company,
    countryCode: address.country?.value,
    customAttributes: address.customAttributes,
    fax: address.fax,
    firstName: address.firstName,
    lastName: address.lastName,
    middleName: address.middleName,
    postcode: address.postCode,
    prefix: address.prefix,
    region: {
      regionCode: address.region?.code,
      regionId: address.region?.id,
    },
    street: address.street,
    suffix: address.suffix,
    telephone: address.telephone,
    vatId: address.vatId,
  };
}

/**
 * Extracts the selected shipping method from cart data
 * @param {Object} data - The cart/checkout data object
 * @returns {Object|null} - The selected shipping method or null if not found
 */
export function getCartShippingMethod(data) {
  if (!data) return null;
  const shippingAddresses = data.shippingAddresses || [];
  if (shippingAddresses.length === 0) return null;
  return shippingAddresses[0]?.selectedShippingMethod;
}

/**
 * Extracts the selected payment method from cart data
 * @param {Object} data - The cart/checkout data object
 * @returns {Object|null} - The selected payment method or null if not found
 */
export function getCartPaymentMethod(data) {
  if (!data) return null;
  const { selectedPaymentMethod } = data;
  if (!selectedPaymentMethod || !selectedPaymentMethod?.code) return null;

  return data.selectedPaymentMethod;
}

/**
 * Transforms address form data into the format expected by the API
 * @param {Object} data - The address form data object
 * @returns {Object} - Transformed address object for API consumption
 */
export const transformAddressFormValues = (data) => {
  const isNewAddress = !data?.id;

  const customAttributes = data.customAttributes?.map(({ code, value }) => ({
    code,
    value: String(value),
  }));

  // TODO: implement new address creation
  return !isNewAddress
    ? { customerAddressId: data.id }
    : {
      address: {
        city: data.city,
        company: data?.company,
        countryCode: data.countryCode,
        customAttributes,
        fax: data.fax,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        postcode: data.postcode,
        prefix: data.prefix,
        region: data?.region?.regionCode,
        regionId: data?.region?.regionId,
        street: data.street,
        suffix: data.suffix,
        telephone: data.telephone,
        vatId: data.vatId,
        saveInAddressBook: data.saveAddressBook,
      },
    };
};

/**
 * Creates a debounced function to estimate shipping costs based on address data
 * @param {Function} api - The API function to call for shipping cost estimation
 * @param {number} [debounceMs=0] - Debounce delay in milliseconds
 * @returns {Function} - Function that handles address data and triggers cost estimation
 */
export function estimateShippingCost({ api, debounceMs = 0 }) {
  let prevEstimateShippingData = {};
  let shouldCancelDebounce = false;

  const debouncedApi = debounce((data) => {
    if (shouldCancelDebounce) return;

    const estimateShippingInputCriteria = {
      country_code: data.countryCode,
      region_name: String(data.region.regionCode || ''),
      region_id: String(data.region.regionId || ''),
      zip: data.postcode,
    };

    api({ criteria: estimateShippingInputCriteria });

    prevEstimateShippingData = {
      countryCode: data.countryCode,
      regionCode: data.region.regionCode,
      regionId: data.region.regionId,
      postcode: data.postcode,
    };
  }, debounceMs);

  return ({ data, isDataValid }) => {
    if (isDataValid) {
      shouldCancelDebounce = true;
      return;
    }

    if (
      prevEstimateShippingData.countryCode === data.countryCode
      && prevEstimateShippingData.regionCode === data.region.regionCode
      && prevEstimateShippingData.regionId === data.region.regionId
      && prevEstimateShippingData.postcode === data.postcode
    ) return;

    debouncedApi(data);
  };
}

/**
 * Validates a form using either simple or complex validation
 * @param {string} formName - The name of the form to validate
 * @param {Object} formRef - The form reference object (optional, for complex validation)
 * @returns {boolean} - Whether the form is valid
 */
export const validateForm = (formName, formRef = null) => {
  const formElement = document.forms[formName];
  if (!formElement) {
    return true;
  }

  // Skip validation for invisible forms
  const isVisible = formElement && formElement.offsetParent !== null;
  if (!isVisible) {
    return true;
  }

  formElement.setAttribute('novalidate', true);

  // Use complex validation if formRef is provided
  if (formRef && formRef.current) {
    return formRef.current.handleValidationSubmit(false);
  }

  // Use simple validation
  return formElement.checkValidity();
};

/**
 * Handles API calls with consistent error logging
 * @param {Function} apiCall - The API call function to execute
 * @param {string} errorMessage - The error message to log on failure
 * @returns {Promise<boolean>} - Whether the API call was successful
 */
export const handleApiCall = async (apiCall, errorMessage) => {
  try {
    await apiCall();
    return true;
  } catch (error) {
    console.error(errorMessage, error);
    return false;
  }
};

/**
 * Creates or updates a meta tag in the document head
 * @param {string} property - The property/name attribute value
 * @param {string} content - The content attribute value
 * @param {string} type - The attribute type ('name' or 'property')
 */
export function createMetaTag(property, content, type) {
  if (!property || !type) {
    return;
  }
  let meta = document.head.querySelector(`meta[${type}="${property}"]`);
  if (meta) {
    if (!content) {
      meta.remove();
      return;
    }
    meta.setAttribute(type, property);
    meta.setAttribute('content', content);
    return;
  }
  if (!content) {
    return;
  }
  meta = document.createElement('meta');
  meta.setAttribute(type, property);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

/**
 * Sets multiple meta tags for SEO and social media
 * @param {string} dropin - The content to use for meta tags
 */
export function setMetaTags(dropin) {
  createMetaTag('title', dropin);
  createMetaTag('description', dropin);
  createMetaTag('keywords', dropin);

  createMetaTag('og:description', dropin);
  createMetaTag('og:title', dropin);
  createMetaTag('og:url', window.location.href, 'property');
}

let modal;

/**
 * Shows a modal with the specified content
 * @param {HTMLElement} content - DOM element to display in the modal
 */
export const showModal = async (content) => {
  modal = await createModal([content]);
  modal.showModal();
};

/**
 * Removes the currently displayed modal and cleans up references
 */
export const removeModal = () => {
  if (!modal) return;
  modal.removeModal();
  modal = null;
};

/**
 * Validates the selected payment method
 * @param {Object} checkoutValues - The checkout values containing selected payment method
 * @param {Object} creditCardFormRef - React-style ref to the credit card form
 * @returns {boolean} - True if validation passes, false if validation fails
 */
export const isValidPaymentMethod = (checkoutValues, creditCardFormRef) => {
  if (checkoutValues?.selectedPaymentMethod?.code === PaymentMethodCode.CREDIT_CARD) {
    if (!creditCardFormRef?.current) {
      console.error('Credit card form not rendered.');
      return false;
    }

    try {
      return creditCardFormRef.current.validate();
    } catch (error) {
      console.error('Error during credit card validation:', error);
      return false;
    }
  }

  return true;
};

/**
 * Checks if the cart contains only virtual products
 * @param {Object} data - The cart/checkout data object
 * @returns {boolean} - True if cart contains only virtual products
 */
export function isVirtualCart(data) {
  return data?.isVirtual === true;
}
