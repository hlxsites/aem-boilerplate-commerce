/* eslint-disable import/no-cycle */
import { deepmerge } from '@dropins/tools/lib.js';

let AEM_ROOT_PATH = '/';

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
 * Fetches config from remote and saves in session, then returns it, otherwise
 * returns if it already exists.
 *
 * @returns the config JSON from session storage
 */
const getConfigFromSession = async () => {
  try {
    const configJSON = window.sessionStorage.getItem('config');
    if (!configJSON) {
      throw new Error('No config in session storage');
    }

    const parsedConfig = JSON.parse(configJSON);
    if (!parsedConfig[':expiry'] || parsedConfig[':expiry'] < Math.round(Date.now() / 1000)) {
      throw new Error('Config expired');
    }
    return parsedConfig;
  } catch (e) {
    let configJSON = await fetch(buildConfigURL());
    if (!configJSON.ok) {
      throw new Error('Failed to fetch config');
    }
    configJSON = await configJSON.json();
    configJSON[':expiry'] = Math.round(Date.now() / 1000) + 7200;
    window.sessionStorage.setItem('config', JSON.stringify(configJSON));
    return configJSON;
  }
};

/**
 * Retrieves the commerce config.
 *
 * @returns {Promise<Object>} - The commerce config.
 */
const getConfig = async () => applyConfigOverrides(await getConfigFromSession());

/**
 * Get root path
 */
export function getRootPath() {
  return AEM_ROOT_PATH ?? '/';
}

/**
 *
 * @returns true if public config contains more than "default"
 */
export async function isMultistore() {
  const config = await getConfigFromSession();
  return Object.keys(config.public).filter((root) => root !== 'default').length > 0;
}

/**
 * Applies config overrides from metadata.
 *
 * @param {Object} config - The base config.
 * @returns {Object} - The config with overrides applied.
 */
async function applyConfigOverrides(config) {
  const root = Object.keys(config.public)
    // Sort by number of non-empty segments to find the deepest path
    .sort((a, b) => {
      const aSegments = a.split('/').filter(Boolean).length;
      const bSegments = b.split('/').filter(Boolean).length;
      return bSegments - aSegments;
    })
    .find((key) => window.location.pathname === key || window.location.pathname.startsWith(key));

  const rootPath = root ?? '/';

  if (!rootPath.startsWith('/') || !rootPath.endsWith('/')) {
    throw new Error('Invalid root path');
  }

  AEM_ROOT_PATH = rootPath;

  const defaultConfig = config.public?.default;

  if (!defaultConfig) {
    throw new Error('No "default" config found.');
  }

  const current = deepmerge(
    defaultConfig,
    root === '/' ? defaultConfig : config.public[root] || defaultConfig,
  );

  return current;
}

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
  const headers = config.headers ?? {};
  return {
    ...headers.all ?? {},
    ...headers[scope] ?? {},
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
