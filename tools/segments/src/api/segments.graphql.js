/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql.js';

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
  let customerSegments = [];
  try {
    const segments = await executeGraphQlQuery(query, config);
    segments?.allCustomerSegments?.forEach(segment => {
      customerSegments.push({
        'key': segment.name,
        'name': segment.name,
        'apply_to': segment.apply_to,
      });
    });
  } catch (err) {
    console.error('Could not retrieve customer segments', err);
  }
  return customerSegments;
}

export default getCustomerSegments;
