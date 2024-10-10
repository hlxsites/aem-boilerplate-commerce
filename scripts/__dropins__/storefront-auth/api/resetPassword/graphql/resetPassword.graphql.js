export const RESET_PASSWORD = `
  mutation RESET_PASSWORD($email: String!, $resetPasswordToken: String!, $newPassword: String!){
    resetPassword(email: $email,resetPasswordToken: $resetPasswordToken,newPassword: $newPassword)
  }
`;
