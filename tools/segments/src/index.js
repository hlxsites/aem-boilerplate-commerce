import React from 'react';
import * as ReactDOM from 'react-dom';

import Picker from './picker.js';
import customerSegmentsQuery from './queries/segments.graphql.js';

import './styles.css';

/**
 * Object containing all configuration files that should be exposed in the picker.
 */
const configFiles = {
  'prod': 'https://main--aem-boilerplate-commerce--hlxsites.hlx.live/configs.json?sheet=prod',
  'stage': 'https://main--aem-boilerplate-commerce--hlxsites.hlx.live/configs-stage.json',
  'dev': 'http://localhost:3000/tools/segments/config-dev.json',
}
/**
 * Default configuration to be loaded.
 */
const defaultConfig = 'dev';

/**
 * List of blocks to be available in the picker.
 *
 * Format: Object with key -> block mapping. Each block is defined by the following properties:
 *   key: Unique key, must be same as the key in the object
 *   name: Displayed name of the block
 *   output: Function that receives the selected product(s) and/or category(ies) and returns the HTML to be copied into the clipboard
 *   selection: Define if single or multi selection: single or multiple
 *   type: Define what can be selected: any, item or folder
 */
const blocks = {
  'segments-list': {
    'key': 'segments-list',
    'name': 'Segments',
    'output': i => `<table width="100%" style="border: 1px solid black;">
            <tr>
                <th colspan="2" style="border: 1px solid black; background: lightgray;">Segments</th>
            </tr>
            <tr>
                <td style="border: 1px solid black">segment</td>
                <td style="border: 1px solid black">segment</td>
            </tr>
        </table>`,
    'selection': 'single',
    'type': 'folder',
  },
};

async function executeCustomerSegmentsQuery(query, config, variables = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': config['commerce.headers.cs.x-api-key'],
    'Magento-Customer-Group': config['commerce.headers.cs.Magento-Customer-Group'],
    'Magento-Environment-Id': config['commerce.headers.cs.Magento-Environment-Id'],
    'Magento-Store-Code': config['commerce.headers.cs.Magento-Store-Code'],
    'Magento-Store-View-Code': config['commerce.headers.cs.Magento-Store-View-Code'],
    'Magento-Website-Code': config['commerce.headers.cs.Magento-Website-Code'],
  };

  const apiCall = new URL(config['commerce-endpoint']);
  apiCall.searchParams.append('query', query.replace(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ')
    .replace(/\s\s+/g, ' '));
  apiCall.searchParams.append('variables', variables ? JSON.stringify(variables) : null);

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

const getCustomerSegments = async (config) => {
  let customerSegments = [];
  try {
    const segments = await executeCustomerSegmentsQuery(customerSegmentsQuery, config);
    segments?.allCustomerSegments?.forEach(segment => {
      customerSegments.push({
        "key": segment.name,
        "name": segment.name,
        "apply_to": segment.apply_to,
      });
    });
  } catch (err) {
    console.error('Could not retrieve customer segments', err);
  }
  return customerSegments;
}

const app = document.getElementById("app");
if (app) {
  ReactDOM.render(<Picker
    blocks={blocks}
    getCustomerSegments={getCustomerSegments}
    configFiles={configFiles}
    defaultConfig={defaultConfig}/>, app);
}
