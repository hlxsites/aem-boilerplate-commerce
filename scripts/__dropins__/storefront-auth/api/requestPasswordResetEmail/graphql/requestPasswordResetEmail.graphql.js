export const REQUEST_PASSWORD_RESET_EMAIL = `
  mutation REQUEST_PASSWORD_RESET_EMAIL($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`;
