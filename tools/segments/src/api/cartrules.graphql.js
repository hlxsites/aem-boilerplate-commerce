/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql.js';

const query = `
  query {
    allCartRules {
      name
    }
  }
`;

const getCartRules = async (config) => {
  let cartRules = [];
  try {
    const rules = await executeGraphQlQuery(query, config);
    rules?.allCartRules?.forEach(rule => {
      cartRules.push({
        'key': rule.name,
        'name': rule.name,
      });
    });
  } catch (err) {
    console.error('Could not retrieve customer segments', err);
  }
  return cartRules;
}

export default getCartRules;
