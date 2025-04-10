/* eslint-disable import/no-cycle */
import { deepmerge } from '@dropins/tools/lib.js';

// load config
const CONFIG = await getConfig();
const ROOT_PATH = getRootPath();
const ROOT_CONFIG = await applyConfigOverrides(CONFIG, ROOT_PATH);

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
 * Get root path
 * @param {Object} [config] - The config object.
 * @returns {string} - The root path.
 */
export function getRootPath() {
  const value = Object.keys(CONFIG?.public)
    // Sort by number of non-empty segments to find the deepest path
    .sort((a, b) => {
      const aSegments = a.split('/').filter(Boolean).length;
      const bSegments = b.split('/').filter(Boolean).length;
      return bSegments - aSegments;
    })
    .find((key) => window.location.pathname === key || window.location.pathname.startsWith(key));

  const rootPath = value ?? '/';

  if (!rootPath.startsWith('/') || !rootPath.endsWith('/')) {
    throw new Error('Invalid root path');
  }

  return rootPath;
}

/**
 * Get list of root paths from public config
 * @returns {Array} - The list of root paths.
 */
export function getListOfRootPaths() {
  return Object.keys(CONFIG?.public).filter((root) => root !== 'default');
}

/**
 * Checks if the public config contains more than "default"
 * @returns true if public config contains more than "default"
 */
export function isMultistore() {
  return getListOfRootPaths().length > 1;
}

/**
 * Retrieves a configuration value.
 *
 * @param {string} configParam - The configuration parameter to retrieve.
 * @returns {Promise<string|undefined>} - The value of the configuration parameter, or undefined.
 */
export async function getConfigValue(configParam) {
  return getValue(ROOT_CONFIG, configParam);
}

/**
 * Retrieves headers from config entries like commerce.headers.pdp.my-header, etc and
 * returns as object of all headers like { my-header: value, ... }
 */
export async function getHeaders(scope) {
  const headers = ROOT_CONFIG.headers ?? {};
  return {
    ...headers.all ?? {},
    ...headers[scope] ?? {},
  };
}

/**
 * Get cookie
 * @param {string} cookieName - The name of the cookie to get
 * @returns {string} - The value of the cookie
 */
export function getCookie(cookieName) {
  const cookies = document.cookie.split(';');
  let foundValue;

  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      foundValue = decodeURIComponent(value);
    }
  });

  return foundValue;
}

export function checkIsAuthenticated() {
  return !!getCookie('auth_dropin_user_token') ?? false;
}

/**
 * Fetches config from remote and saves in session, then returns it, otherwise
 * returns if it already exists.
 *
 * @returns {Promise<Object>} - The config JSON from session storage
 */
async function getConfigFromSession() {
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
}

/**
 * Applies config overrides from metadata.
 *
 * @param {Object} config - The base config.
 * @returns {Object} - The config with overrides applied.
 */
async function applyConfigOverrides(config, root) {
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
 * Retrieves the commerce config.
 *
 * @returns {Promise<Object>} - The commerce config.
 */
async function getConfig() {
  return getConfigFromSession();
}
