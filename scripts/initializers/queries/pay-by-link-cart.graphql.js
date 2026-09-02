export const PAY_BY_LINK_CART_QUERY = `
  query PayByLinkCart($token: String!) {
    payByLinkCart(token: $token) {
      masked_cart_id
    }
  }
`;
