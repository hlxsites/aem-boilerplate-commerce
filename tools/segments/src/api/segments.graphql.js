/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql.js';
import queryCache from './query.cache';

const query = `
  query {
    allCustomerSegments {
      name
      description
      apply_to
    }
  }
`;

const getCustomerSegments = async (config) => {
  if (!queryCache['customerSegments'].length > 0) {
    try {
      const segments = await executeGraphQlQuery(query, config);
      segments?.allCustomerSegments?.forEach(segment => {
        queryCache['customerSegments'].push({
          'key': segment.name,
          'name': segment.name,
          'apply_to': segment.apply_to,
        });
      });
    } catch (err) {
      console.error('Could not retrieve customer segments', err);
    }
  }
  return queryCache['customerSegments'];
}

export default getCustomerSegments;
