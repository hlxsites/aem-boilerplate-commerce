const DA_ADMIN = 'https://admin.da.live';
const AEM_API = 'https://api.aem.live';
const HLX_ADMIN = 'https://admin.hlx.page';

const STYLES_PATH = '/config/styles.json';

/** @type {Map<string, Promise<boolean>>} */
const hlx6Cache = new Map();

/**
 * @param {Function} daFetch
 * @param {string} org
 * @param {string} site
 */
function probeHlx6(daFetch, org, site) {
  const key = `${org}/${site}`;
  if (!hlx6Cache.has(key)) {
    hlx6Cache.set(
      key,
      daFetch(`${HLX_ADMIN}/ping/${org}/${site}`)
        .then((resp) => resp.headers?.get('x-api-upgrade-available') !== null)
        .catch(() => false),
    );
  }
  return hlx6Cache.get(key);
}

/**
 * @param {Array<Record<string, string>>} rows
 * @param {string} sheetName
 */
function sheetBody(rows, sheetName) {
  /** @type {Record<string, unknown>} */
  const json = {
    total: rows.length,
    limit: rows.length,
    offset: 0,
    data: rows,
    ':type': 'sheet',
  };
  if (sheetName) json[':sheetname'] = sheetName;
  return JSON.stringify(json);
}

/**
 * Writes /config/styles.json through the DA source API, then asks preview to pick it up.
 * @param {{ daFetch: Function, org: string, site: string, token?: string, rows: Array<Record<string, string>>, sheetName?: string }} options
 * @returns {Promise<'ok' | 'preview'>}
 */
export async function saveStylesSheet({
  daFetch, org, site, token, rows, sheetName = '',
}) {
  if (!daFetch || !org || !site) throw new Error('missing context');

  const hlx6 = await probeHlx6(daFetch, org, site);
  const sourceUrl = hlx6
    ? `${AEM_API}/${org}/sites/${site}/source${STYLES_PATH}`
    : `${DA_ADMIN}/source/${org}/${site}${STYLES_PATH}`;
  const body = sheetBody(rows, sheetName);
  /** @type {Record<string, string>} */
  const authHeaders = {};
  if (token && hlx6) authHeaders['x-content-source-authorization'] = `Bearer ${token}`;

  let sourceResp;
  if (hlx6) {
    sourceResp = await daFetch(sourceUrl, {
      method: 'POST',
      headers: { ...authHeaders, 'Content-Type': 'application/json' },
      body,
    });
  } else {
    const form = new FormData();
    form.append('data', new Blob([body], { type: 'application/json' }));
    sourceResp = await daFetch(sourceUrl, { method: 'POST', body: form });
  }
  if (!sourceResp?.ok) throw new Error(`source ${sourceResp?.status || 0}`);

  const previewUrl = hlx6
    ? `${AEM_API}/${org}/sites/${site}/preview${STYLES_PATH}`
    : `${HLX_ADMIN}/preview/${org}/${site}/main${STYLES_PATH}`;
  try {
    const previewResp = await daFetch(previewUrl, {
      method: 'POST',
      headers: authHeaders,
    });
    if (!previewResp?.ok) return 'preview';
  } catch {
    return 'preview';
  }
  return 'ok';
}
