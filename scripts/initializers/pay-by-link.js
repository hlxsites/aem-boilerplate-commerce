import { events } from '@dropins/tools/event-bus.js';
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import { PBL_FETCH_GRAPHQL } from './pay-by-link-client.js';
import { PAY_BY_LINK_CART_QUERY } from './queries/pay-by-link-cart.graphql.js';

export const PBL_READY_EVENT = 'pbl/ready';
export const PBL_LINK_ERROR_EVENT = 'pbl/link-error';
export const PBL_SETUP_ERROR_EVENT = 'pbl/setup-error';

const CREATE_POC_CART_MUTATION = `
  mutation CreatePocCart {
    createGuestCart {
      cart {
        id
      }
    }
  }
`;

const ADD_POC_PRODUCT_MUTATION = `
  mutation AddPocProduct($cartId: String!) {
    addProductsToCart(
      cartId: $cartId
      cartItems: [{ sku: "ADB111", quantity: 1 }]
    ) {
      cart {
        id
      }
      user_errors {
        code
        message
      }
    }
  }
`;

const POC_ADDRESS = {
  city: 'San Jose',
  company: 'Adobe',
  countryCode: 'US',
  customAttributes: [],
  firstName: 'PBL',
  lastName: 'Shopper',
  postcode: '95110',
  regionId: 12,
  saveInAddressBook: false,
  street: ['345 Park Avenue'],
  telephone: '4085550100',
};

const resolveCartId = async (token) => {
  const { data, errors } = await PBL_FETCH_GRAPHQL.fetchGraphQl(
    PAY_BY_LINK_CART_QUERY,
    { method: 'POST', variables: { token } },
  );

  if (errors?.length || !data?.payByLinkCart?.masked_cart_id) {
    throw new Error(errors?.[0]?.message || 'The payment link cart could not be resolved.');
  }

  return data.payByLinkCart.masked_cart_id;
};

const createDemoCart = async () => {
  const { data, errors } = await PBL_FETCH_GRAPHQL.fetchGraphQl(CREATE_POC_CART_MUTATION, {
    method: 'POST',
  });
  const cartId = data?.createGuestCart?.cart?.id;

  if (errors?.length || !cartId) {
    throw new Error(errors?.[0]?.message || 'The PoC guest cart could not be created.');
  }

  const productResult = await PBL_FETCH_GRAPHQL.fetchGraphQl(ADD_POC_PRODUCT_MUTATION, {
    method: 'POST',
    variables: { cartId },
  });
  const productErrors = productResult.data?.addProductsToCart?.user_errors ?? [];

  if (productResult.errors?.length || productErrors.length) {
    throw new Error(
      productResult.errors?.[0]?.message
      || productErrors[0]?.message
      || 'The demo product could not be added.',
    );
  }

  return cartId;
};

const prepareDemoCheckout = async () => {
  await checkoutApi.setGuestEmailOnCart('pbl-poc@example.com');
  const shippingCart = await checkoutApi.setShippingAddress({ address: POC_ADDRESS });
  await checkoutApi.setBillingAddress({ sameAsShipping: true });

  const shippingMethod = shippingCart?.shippingAddresses?.[0]?.availableShippingMethods?.[0];
  if (!shippingMethod) throw new Error('No shipping method is available for the PoC cart.');

  return checkoutApi.setShippingMethods([{
    carrierCode: shippingMethod.carrier.code,
    methodCode: shippingMethod.code,
  }]);
};

export async function initializePayByLink() {
  const { hostname, searchParams } = new URL(window.location.href);
  const token = searchParams.get('token');
  const isLocalDemo = hostname === 'localhost' && searchParams.get('demo') === 'true';
  let cartId;

  try {
    if (!token && !isLocalDemo) throw new Error('The payment link token is missing.');
    cartId = token ? await resolveCartId(token) : await createDemoCart();
  } catch (error) {
    events.emit(token ? PBL_LINK_ERROR_EVENT : PBL_SETUP_ERROR_EVENT, { error });
    return null;
  }

  try {
    checkoutApi.setEndpoint(PBL_FETCH_GRAPHQL);
    await checkoutApi.authenticateCustomer(false);
    await checkoutApi.initializeCheckout({ id: cartId });

    let checkoutData = events.lastPayload('checkout/initialized') ?? null;
    if (!checkoutData) throw new Error('The payment checkout could not be initialized.');
    if (isLocalDemo) {
      checkoutData = await prepareDemoCheckout();
    }

    events.emit(PBL_READY_EVENT, {
      cartId,
      checkoutData,
    });
    return cartId;
  } catch (error) {
    events.emit(PBL_SETUP_ERROR_EVENT, { error });
    return null;
  }
}
