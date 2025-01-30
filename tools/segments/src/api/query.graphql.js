/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import { getConfigValue } from '../../../../scripts/configs.js';

async function executeGraphQlQuery(query, environment) {
  const apiCall = new URL(await getConfigValue('commerce-core-endpoint', environment));
  apiCall.searchParams.append('query', query.replace(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ')
    .replace(/\s\s+/g, ' '));

  const response = await fetch(apiCall, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return null;
  }

  const queryResponse = await response.json();
  return queryResponse.data;
}

export default executeGraphQlQuery;
