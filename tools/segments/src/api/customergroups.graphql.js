/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql.js';

const query = `
  query {
    allCustomerGroups {
      name
    }
  }
`;

const getCustomerGroups = async (config) => {
  let customerGroups = [];
  try {
    const groups = await executeGraphQlQuery(query, config);
    groups?.allCustomerGroups?.forEach(group => {
      customerGroups.push({
        'key': group.name,
        'name': group.name,
      });
    });
  } catch (err) {
    console.error('Could not retrieve customer segments', err);
  }
  return customerGroups;
}

export default getCustomerGroups;
