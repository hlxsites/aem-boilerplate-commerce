import { getMetadata } from './aem.js';

function buildConfigURL() {
  const configURL = new URL(`${window.location.origin}/configs.json`);
  return configURL;
}

function applyConfigOverrides(config) {
  // get overrides
  const website = getMetadata('commerce-website');
  const store = getMetadata('commerce-store');
  const storeview = getMetadata('commerce-storeview');

  // add overrides
  const updates = new Map([
    ['commerce.headers.cs.Magento-Website-Code', website],
    ['commerce.headers.cs.Magento-Store-Code', store],
    ['commerce.headers.cs.Magento-Store-View-Code', storeview],
    ['commerce.headers.all.Store', storeview],
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
  const configElements = config.data;
  return configElements.find((c) => c.key === configParam)?.value;
};

/**
 * Retrieves headers from config entries like commerce.headers.pdp.my-header, etc and
 * returns as object of all headers like { my-header: value, ... }
 */
export const getHeaders = async (scope) => {
  const config = await getConfig();
  const configElements = config.data.filter((el) => el?.key.includes('headers.all') || el?.key.includes(`headers.${scope}`));

  return configElements.reduce((obj, item) => {
    let { key } = item;

    // global values
    if (key.includes('commerce.headers.all.')) {
      key = key.replace('commerce.headers.all.', '');
    }

    // scoped values
    if (key.includes(`commerce.headers.${scope}.`)) {
      key = key.replace(`commerce.headers.${scope}.`, '');
    }

    return { ...obj, [key]: item.value };
  }, {});
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
