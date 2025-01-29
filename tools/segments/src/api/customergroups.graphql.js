/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql.js';
import queryCache from './query.cache';

const query = `
  query {
    allCustomerGroups {
      name
    }
  }
`;

const getCustomerGroups = async (config) => {
  if (!queryCache['customerGroups'].length > 0) {
    try {
      const groups = await executeGraphQlQuery(query, config);
      groups?.allCustomerGroups?.forEach(group => {
        queryCache['customerGroups'].push({
          'key': group.name,
          'name': group.name,
        });
      });
    } catch (err) {
      console.error('Could not retrieve customer segments', err);
    }
  }
  return queryCache['customerGroups'];
}

export default getCustomerGroups;
