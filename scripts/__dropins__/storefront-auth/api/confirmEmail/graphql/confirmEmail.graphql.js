export const CONFIRM_EMAIL = `
  mutation CONFIRM_EMAIL($email: String!, $confirmation_key: String!) {
    confirmEmail(input: {
      email: $email,
      confirmation_key: $confirmation_key
    }) {
      customer {
        email
      }
    }
  }
`;
