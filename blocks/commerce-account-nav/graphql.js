export const GET_CUSTOMER_ROLE_PERMISSIONS = `
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      email
      lastname
      role {
        id
        name
        permissions {
          id
          text
          sort_order
          children {
            id
            text
            sort_order
            children {
              id
              text
              sort_order
              children {
                id
                text
                sort_order
                children {
                  id
                  text
                  sort_order
                  children {
                    id
                    text
                    sort_order
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
