/**
 * @typedef {Object} Store
 * @property {Object|undefined} billingFormValues - The billing form values, initially undefined
 *  but expected to be an object.
 * @property {boolean} isBillToShipping - A flag indicating whether the billing address is the same
 *  as the shipping address. Defaults to true.
 */

/**
 * Creates a new store object with initial default values.
 *
 * @returns {Store} The store object.
 */
const createStore = () => ({
  billingFormValues: undefined,
  isBillToShipping: true,
  storeConfig: undefined,
});

export default createStore;
