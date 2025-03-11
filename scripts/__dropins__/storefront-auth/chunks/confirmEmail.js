/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as o}from"./network-error.js";import{f as r}from"./fetch-graphql.js";const t=`
  mutation CONFIRM_EMAIL($email: String!, $confirmation_key: String!) {
    confirmEmail(
      input: { email: $email, confirmation_key: $confirmation_key }
    ) {
      customer {
        email
      }
    }
  }
`,e=async({customerEmail:i,customerConfirmationKey:a})=>await r(t,{method:"POST",variables:{email:i,confirmation_key:a}}).catch(o);export{e as c};
