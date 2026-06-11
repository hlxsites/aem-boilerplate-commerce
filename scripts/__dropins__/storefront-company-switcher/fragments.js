/*! Copyright 2026 Adobe
All Rights Reserved. */
const e=`
  fragment COMPANY_FRAGMENT on Company {
    name
    id
    status
  }
`,t=`
  fragment CUSTOMER_FRAGMENT on Customer {
    companies(input: { pageSize: $pageSize }) {
      items {
        name
        id
        status
      }
    }
  }
`;export{e as COMPANY_FRAGMENT,t as CUSTOMER_FRAGMENT};
//# sourceMappingURL=fragments.js.map
