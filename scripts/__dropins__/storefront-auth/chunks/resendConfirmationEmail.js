/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as r}from"./network-error.js";import{f as i}from"./fetch-graphql.js";const t=`
  mutation RESEND_CONFIRMATION_EMAIL($email: String!) {
    resendConfirmationEmail(email: $email)
  }
`,m=async a=>await i(t,{method:"POST",variables:{email:a}}).catch(r);export{m as r};
