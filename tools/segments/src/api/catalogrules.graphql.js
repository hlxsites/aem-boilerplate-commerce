/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql';
import queryCache from './query.cache';

const query = `
  query {
    allCatalogRules {
      name
    }
  }
`;

const getCatalogRules = async (config) => {
  if (!queryCache['catalogRules'].length > 0) {
    try {
      const rules = await executeGraphQlQuery(query, config);
      rules?.allCatalogRules?.forEach(rule => {
        queryCache['catalogRules'].push({
          'key': rule.name,
          'name': rule.name,
        });
      });
    } catch (err) {
      console.error('Could not retrieve customer segments', err);
    }
  }

  return queryCache['catalogRules'];
}

export default getCatalogRules;
