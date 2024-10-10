export const CREATE_CUSTOMER_ADDRESS = `
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input:$input) {
      firstname
   }
  }
`;
