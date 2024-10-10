export const RESEND_CONFIRMATION_EMAIL = `
mutation RESEND_CONFIRMATION_EMAIL($email: String!) {
  resendConfirmationEmail(email: $email)
}`;
