/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import React from 'react';
import * as ReactDOM from 'react-dom';

import Picker from './picker.js';
import getCustomerSegments from './api/segments.graphql.js';
import getCatalogRules from './api/catalogrules.graphql.js';
import getCartRules from './api/cartrules.graphql.js';
import getCustomerGroups from "./api/customergroups.graphql";

import './styles.css';

/**
 * Object containing all configuration files that should be exposed in the picker.
 */
const configFiles = {
  'prod': 'https://main--aem-boilerplate-commerce--hlxsites.aem.live/configs.json?sheet=prod',
  'stage': 'https://main--aem-boilerplate-commerce--hlxsites.aem.live/configs-stage.json',
  'dev': 'https://main--aem-boilerplate-commerce--hlxsites.aem.live/configs-dev.json',
}

/**
 * Default configuration to be loaded.
 */
const defaultConfig = 'stage';

const personalisationCategories = [
  {
    'key': 'segments',
    'title': 'Customer Segments',
    'initializer': getCustomerSegments,
  },
  {
    'key': 'groups',
    'title': 'Customer Groups',
    'initializer': getCustomerGroups,
  },
  {
    'key': 'cartRules',
    'title': 'Cart Rules',
    'initializer': getCartRules,
  },
  {
    'key': 'catalogRules',
    'title': 'Catalog Rules',
    'initializer': getCatalogRules,
  },
  // {
  //   'key': 'utmParams',
  //   'title': 'UTM URL Parameters',
  //   'initializer': null,
  // },
];


const app = document.getElementById("app");
if (app) {
  ReactDOM.render(<Picker
    personalisationCategories={personalisationCategories}
    configFiles={configFiles}
    defaultConfig={defaultConfig}/>, app);
}
