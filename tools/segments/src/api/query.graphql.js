/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */

async function executeGraphQlQuery(query, config) {
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': config['commerce.headers.cs.x-api-key'],
    'Magento-Customer-Group': config['commerce.headers.cs.Magento-Customer-Group'],
    'Magento-Environment-Id': config['commerce.headers.cs.Magento-Environment-Id'],
    'Magento-Store-Code': config['commerce.headers.cs.Magento-Store-Code'],
    'Magento-Store-View-Code': config['commerce.headers.cs.Magento-Store-View-Code'],
    'Magento-Website-Code': config['commerce.headers.cs.Magento-Website-Code'],
  };

  const apiCall = new URL(config['commerce-core-endpoint']);
  apiCall.searchParams.append('query', query.replace(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ')
    .replace(/\s\s+/g, ' '));

  const response = await fetch(apiCall, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    return null;
  }

  const queryResponse = await response.json();
  return queryResponse.data;
}

export default executeGraphQlQuery;