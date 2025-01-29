/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql.js';
import queryCache from './query.cache';

const query = `
  query {
    allCartRules {
      name
    }
  }
`;

const getCartRules = async (config) => {
  if (!queryCache['cartRules'].length > 0) {
    try {
      const rules = await executeGraphQlQuery(query, config);
      rules?.allCartRules?.forEach(rule => {
        queryCache['cartRules'].push({
          'key': rule.name,
          'name': rule.name,
        });
      });
    } catch (err) {
      console.error('Could not retrieve customer segments', err);
    }
  }
  return queryCache['cartRules'];
}

export default getCartRules;
