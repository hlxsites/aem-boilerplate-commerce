import { getMetadata } from './aem.js';

import { getRootPath } from './scripts.js';

const root = '/en-ca/';

function buildConfigURL() {
  const configURL = new URL(`${window.location.origin}/config.json`);
  return configURL;
}

function getValue(obj, key) {
  const parts = key.split('.');
  let currentObj = obj;

  for (let i = 0; i < parts.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(currentObj, parts[i])) {
      console.warn(`Property ${key} does not exist in the object`);
    }

    currentObj = currentObj[parts[i]];
  }

  return currentObj;
}

function applyConfigOverrides(config) {
  // get overrides
  const website = getMetadata('commerce-website');
  const store = getMetadata('commerce-store');
  const storeview = getMetadata('commerce-storeview');

  // add overrides
  const updates = new Map([
    ['headers.cs.Magento-Website-Code', website],
    ['headers.cs.Magento-Store-Code', store],
    ['headers.cs.Magento-Store-View-Code', storeview],
    ['headers.all.Store', storeview],
  ]);

  // apply updates
  config.data.forEach((item) => {
    const next = updates.get(item.key);
    if (next) {
      item.value = next;
      updates.delete(item.key);
    }
  });

  // add any updates that weren't applied
  updates.forEach((value, key) => {
    if (value) {
      config.data.push({ key, value });
    }
  });

  return config;
}

const getConfig = async () => {
  let config;

  try {
    const configJSON = window.sessionStorage.getItem('config');
    if (!configJSON) {
      throw new Error('No config in session storage');
    }

    const parsedConfig = JSON.parse(configJSON);
    if (!parsedConfig[':expiry'] || parsedConfig[':expiry'] < Math.round(Date.now() / 1000)) {
      throw new Error('Config expired');
    }
    config = parsedConfig;
  } catch (e) {
    let configJSON = await fetch(buildConfigURL());
    if (!configJSON.ok) {
      throw new Error('Failed to fetch config');
    }
    configJSON = await configJSON.json();
    configJSON[':expiry'] = Math.round(Date.now() / 1000) + 7200;
    window.sessionStorage.setItem('config', JSON.stringify(configJSON));
    config = configJSON;
  }

  if (root === '/') {
    return config.public.default;
  }
  if (!config.public[root]) {
    console.warn(`No config for ${root}, using default config.`);
    return config.public.default;
  }

  // TODO: implement
  // return mergeConfigs(config.public[root], configs.public.default);
  return config.public[root];
};

/**
 * This function retrieves a configuration value.
 *
 * @param {string} configParam - The configuration parameter to retrieve.
 * @returns {Promise<string|undefined>} - The value of the configuration parameter, or undefined.
 */
export const getConfigValue = async (configParam) => {
  const config = await getConfig();
  return getValue(config, configParam);
};

/**
 * Retrieves headers from config entries like commerce.headers.pdp.my-header, etc and
 * returns as object of all headers like { my-header: value, ... }
 */
export const getHeaders = async (scope) => {
  const config = await getConfig();
  const { headers } = config;
  return {
    ...headers.all,
    ...headers[scope],
  };
};

export const getCookie = (cookieName) => {
  const cookies = document.cookie.split(';');
  let foundValue;

  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      foundValue = decodeURIComponent(value);
    }
  });

  return foundValue;
};

export const checkIsAuthenticated = () => !!getCookie('auth_dropin_user_token') ?? false;

window.getHeaders = getHeaders;
window.getConfigValue = getConfigValue;
