/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql.js';

const catalogRules = [];

const query = `
  query {
    allCatalogRules {
      name
    }
  }
`;

const getCatalogRules = async (config) => {
  if (!catalogRules.length > 0) {
    try {
      const rules = await executeGraphQlQuery(query, config);
      rules?.allCatalogRules?.forEach(rule => {
        catalogRules.push({
          'key': rule.name,
          'name': rule.name,
        });
      });
    } catch (err) {
      console.error('Could not retrieve customer segments', err);
    }
  }

  return catalogRules;
}

export default getCatalogRules;
