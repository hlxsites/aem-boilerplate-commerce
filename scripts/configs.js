/* eslint-disable import/no-cycle */
import { deepmerge } from '@dropins/tools/lib.js';
import { getMetadata } from './aem.js';
import { getRootPath } from './scripts.js';

/**
 * Builds the URL for the config file.
 *
 * @returns {URL} - The URL for the config file.
 */
function buildConfigURL() {
  return new URL(`${window.location.origin}/config.json`);
}

/**
 * Retrieves a value from a config object using dot notation.
 *
 * @param {Object} obj - The config object.
 * @param {string} key - The key to retrieve (supports dot notation).
 * @returns {any} - The value of the key.
 */
function getValue(obj, key) {
  return key.split('.').reduce((current, part) => {
    if (!Object.prototype.hasOwnProperty.call(current, part)) {
      console.warn(`Property ${key} does not exist in the object`);
      return undefined;
    }
    return current[part];
  }, obj);
}

/**
 * Applies config overrides from metadata.
 *
 * @param {Object} config - The base config.
 * @returns {Object} - The config with overrides applied.
 */
function applyConfigOverrides(config) {
  const root = getRootPath();
  const current = deepmerge(
    config.public.default,
    root === '/' ? config.public.default : config.public[root] || config.public.default,
  );

  // add overrides
  const website = getMetadata('commerce-website');
  const store = getMetadata('commerce-store');
  const storeview = getMetadata('commerce-storeview');

  if (website) {
    current.headers.cs['Magento-Website-Code'] = website;
  }

  if (store) {
    current.headers.cs['Magento-Store-Code'] = store;
  }

  if (storeview) {
    current.headers.all.Store = storeview;
    current.headers.cs['Magento-Store-View-Code'] = storeview;
  }

  return current;
}

/**
 * Retrieves the commerce config.
 *
 * @returns {Promise<Object>} - The commerce config.
 */
const getConfig = async () => {
  try {
    const configJSON = window.sessionStorage.getItem('config');
    if (!configJSON) {
      throw new Error('No config in session storage');
    }

    const parsedConfig = JSON.parse(configJSON);
    if (!parsedConfig[':expiry'] || parsedConfig[':expiry'] < Math.round(Date.now() / 1000)) {
      throw new Error('Config expired');
    }
    return applyConfigOverrides(parsedConfig);
  } catch (e) {
    let configJSON = await fetch(buildConfigURL());
    if (!configJSON.ok) {
      throw new Error('Failed to fetch config');
    }
    configJSON = await configJSON.json();
    configJSON[':expiry'] = Math.round(Date.now() / 1000) + 7200;
    window.sessionStorage.setItem('config', JSON.stringify(configJSON));
    return applyConfigOverrides(configJSON);
  }
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
