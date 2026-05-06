/**
 * nav-sync.js
 *
 * Fetches the Commerce category tree via the ACO Catalog Service `navigation`
 * query (ACO-only), writes local output files, and — when DA credentials are
 * present — uploads and publishes the sheet to da.live so EDS serves it at
 * /nav-dynamic.json.
 *
 * Config is fetched from the live EDS site, mirroring what the browser SDK
 * does, so this script works without a local copy of the repository.
 * The DA org and repo are derived automatically from the site URL.
 *
 * Usage:
 *   node nav-sync.js <site> <store> <family> [--mode <mode>]
 *
 *   site    — EDS site hostname, e.g. main--thunderbolts-aco--adobe-commerce.aem.live
 *   store   — "default" or a store key from config.json (e.g. "spain")
 *   family  — ACO product family passed to navigation(family:). Required.
 *             Every ACO family must be created manually — there is no
 *             universal default.
 *   --mode  — Controls what happens after fetching the category tree:
 *               local   — generate local files only; skip DA upload entirely
 *               preview — upload to DA and preview; do not publish live
 *               publish — upload, preview, and publish (default)
 *
 * Examples:
 *   # Generate local files only (no DA credentials needed)
 *   node nav-sync.js main--thunderbolts-aco--adobe-commerce.aem.live default my-family --mode local
 *
 *   # Upload and preview (for review before going live)
 *   node nav-sync.js main--thunderbolts-aco--adobe-commerce.aem.live \
 *     default my-family --mode preview
 *
 *   # Full sync: upload, preview, and publish (default behavior)
 *   node nav-sync.js main--thunderbolts-aco--adobe-commerce.aem.live \
 *     default my-family
 *   node nav-sync.js main--thunderbolts-aco--adobe-commerce.aem.live \
 *     spain my-family --mode publish
 *
 * DA upload (required for preview and publish modes, skipped in local mode):
 *   DA_TOKEN        — Pre-generated IMS Bearer token. Simplest option for
 *                     local runs: copy from an active da.live browser session
 *                     (DevTools → Network → any request → Authorization header).
 *   DA_CLIENT_ID  + DA_CLIENT_SECRET  — IMS OAuth server-to-server credentials.
 *                     Use for automated / CI runs.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NAV_SHEET_NAME = 'nav-dynamic';

// ─── Config ───────────────────────────────────────────────────────────────────

/**
 * Deep-merges `source` into `target`, with source values winning on conflict.
 * Only plain objects are recursed; arrays and primitives are replaced wholesale.
 *
 * NOTE: The browser SDK provides `initializeConfig` / `getConfigValue` for this
 * but those utilities depend on browser APIs (window.location, sessionStorage)
 * and cannot run in Node. This function mirrors the same merge semantics so the
 * script resolves per-store config identically to what the storefront sees.
 */
function deepMerge(target, source) {
  return Object.keys(source).reduce((result, key) => ({
    ...result,
    [key]: source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
      ? deepMerge(result[key] || {}, source[key])
      : source[key],
  }), { ...target });
}

async function fetchPublicConfig(site) {
  const url = `https://${site}/config.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch config from ${url}: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  if (!json.public?.default) throw new Error(`config.json at ${url} is missing public.default`);
  return json.public;
}

function resolveStoreKey(pub, arg) {
  if (arg === 'default') return 'default';
  const normalised = arg.replace(/^\/|\/$/g, '');
  const match = Object.keys(pub).find((k) => k.replace(/^\/|\/$/g, '') === normalised);
  if (!match) {
    throw new Error(
      `Store "${arg}" not found in config.json. Available: ${Object.keys(pub).join(', ')}`,
    );
  }
  return match;
}

function getStoreConfig(pub, storeKey) {
  if (storeKey === 'default') return pub.default;
  const override = pub[storeKey];
  if (!override) {
    throw new Error(
      `Store "${storeKey}" not found in config.json. Available: ${Object.keys(pub).join(', ')}`,
    );
  }
  return {
    ...pub.default,
    headers: deepMerge(pub.default.headers || {}, override.headers || {}),
    ...(override['commerce-endpoint'] && { 'commerce-endpoint': override['commerce-endpoint'] }),
  };
}

// ─── Site URL parsing ─────────────────────────────────────────────────────────

/**
 * Derives DA org and repo from an AEM site hostname.
 * Format: <ref>--<repo>--<org>.aem.live  →  { org, repo }
 */
function parseSiteUrl(site) {
  const subdomain = site.split('.')[0];
  const parts = subdomain.split('--');
  if (parts.length < 3) {
    throw new Error(
      `Cannot derive org/repo from site "${site}". Expected format: <ref>--<repo>--<org>.aem.live`,
    );
  }
  const org = parts[parts.length - 1];
  const repo = parts[parts.length - 2];
  return { org, repo };
}

// ─── GraphQL ──────────────────────────────────────────────────────────────────

// NOTE: This query targets the ACO Catalog Service navigation API and is
// ACO-specific. ACCS / classic Catalog Service uses a different data model
// and will require a separate implementation.
const NAVIGATION_QUERY = `
  query navigation($family: String!) {
    navigation(family: $family) {
      slug
      name
      children {
        slug
        name
        children {
          slug
          name
          children {
            slug
            name
            children {
              slug
              name
            }
          }
        }
      }
    }
  }
`;

async function fetchNavigation(endpoint, headers, family) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({ query: NAVIGATION_QUERY, variables: { family } }),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText} from ${endpoint}`);
  }
  const json = await response.json();
  if (json.errors?.length) {
    throw new Error(`GraphQL errors:\n${JSON.stringify(json.errors, null, 2)}`);
  }
  return json.data?.navigation ?? [];
}

// ─── Tree flattening ──────────────────────────────────────────────────────────

function flattenTree(categories, rows = []) {
  categories.forEach((cat) => {
    rows.push({ path: `/${cat.slug}`, title: cat.name });
    if (cat.children?.length) flattenTree(cat.children, rows);
  });
  return rows;
}

// ─── Output helpers ───────────────────────────────────────────────────────────

function toTSV(rows) {
  const header = 'path\ttitle';
  const body = rows.map((r) => `${r.path}\t${r.title}`);
  return [header, ...body].join('\n');
}

function toEdsJson(rows) {
  return {
    total: rows.length,
    offset: 0,
    limit: rows.length,
    data: rows,
    ':type': 'sheet',
  };
}

// ─── DA API upload ────────────────────────────────────────────────────────────

const DA_ADMIN = 'https://admin.da.live';
const HLX_ADMIN = 'https://admin.hlx.page';
const IMS_TOKEN_URL = 'https://ims-na1.adobelogin.com/ims/token/v3';

/**
 * Resolves a DA Bearer token from the environment.
 *
 * Priority:
 *   1. DA_TOKEN         — pre-generated token; ideal for local runs.
 *   2. DA_CLIENT_ID + DA_CLIENT_SECRET — IMS server-to-server exchange; ideal for CI.
 *
 * Returns null (without throwing) when no credentials are set so that local
 * runs without a DA account simply skip the upload step.
 */
async function getToken() {
  if (process.env.DA_TOKEN) return process.env.DA_TOKEN;

  const clientId = process.env.DA_CLIENT_ID;
  const clientSecret = process.env.DA_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'read_organizations,additional_info.projectedProductContext,AdobeID,openid,aem.frontend.all',
  });

  const response = await fetch(IMS_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!response.ok) {
    throw new Error(`IMS token exchange failed: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  return json.access_token;
}

/**
 * Writes the nav sheet to da.live then previews and publishes it.
 *
 * @param {string} token   Bearer token
 * @param {string} org     DA org (derived from site URL)
 * @param {string} repo    DA repo (derived from site URL)
 * @param {string} daPath  Path within the repo (e.g. "nav-dynamic", "spain/nav-dynamic")
 * @param {object} edsJson EDS sheet JSON payload
 * @param {string} tag     Log prefix
 *
 * Steps:
 *   1. PUT  /source/{org}/{repo}/{daPath}  — saves the sheet content
 *   2. POST /preview/{org}/{repo}/{daPath} — stages it at the preview URL
 *   3. POST /live/{org}/{repo}/{daPath}    — publishes it so EDS serves it live (publish mode only)
 *
 * @param {string} mode 'preview' or 'publish'
 */
async function uploadToDA(token, org, repo, daPath, edsJson, tag, mode) {
  const authHeader = { Authorization: `Bearer ${token}` };
  const basePath = `${org}/${repo}/${daPath}`;
  const sourcePath = `${basePath}.json`;

  // 1. Save
  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(edsJson)], { type: 'application/json' }));
  const writeRes = await fetch(`${DA_ADMIN}/source/${sourcePath}`, {
    method: 'PUT',
    headers: authHeader,
    body: formData,
  });
  if (!writeRes.ok) {
    const body = await writeRes.text().catch(() => '');
    throw new Error(`DA write failed: ${writeRes.status} ${writeRes.statusText}${body ? `\n${body}` : ''}`);
  }
  console.info(`${tag} DA: saved /${sourcePath}`);

  // 2. Preview + Publish
  const aemPath = `${org}/${repo}/main/${daPath}.json`;
  const previewRes = await fetch(`${HLX_ADMIN}/preview/${aemPath}`, {
    method: 'POST',
    headers: authHeader,
  });
  if (previewRes.ok) {
    console.info(`✅ ${tag} DA: previewed`);
    if (mode === 'publish') {
      const publishRes = await fetch(`${HLX_ADMIN}/live/${aemPath}`, {
        method: 'POST',
        headers: authHeader,
      });
      if (publishRes.ok) {
        console.info(`✅ ${tag} DA: published`);
      } else {
        console.warn(`⚠️ ${tag} DA publish skipped: ${publishRes.status} ${publishRes.statusText}`);
      }
    } else {
      console.info(`ℹ️ ${tag} DA: publish skipped (mode: preview). Use --mode publish to go live.`);
    }
  } else {
    console.warn(`⚠️ ${tag} DA preview skipped: ${previewRes.status} ${previewRes.statusText} — file saved to da.live but not yet published`);
  }
}

// ─── Per-store sync ───────────────────────────────────────────────────────────

async function syncStore(pub, storeKey, family, site, mode) {
  const config = getStoreConfig(pub, storeKey);
  const endpoint = config['commerce-endpoint'];
  const headers = { ...config.headers?.all, ...config.headers?.cs };

  if (!endpoint) throw new Error(`commerce-endpoint not set for store "${storeKey}"`);

  const storeSlug = storeKey.replace(/\//g, '') || 'default';
  const tag = `[${storeSlug}]`;
  console.info(`${tag} Starting sync...`);
  console.info(`${tag} Endpoint: ${endpoint}`);
  console.info(`${tag} Headers: ${Object.keys(headers).join(', ')} (values redacted)`);
  console.info(`${tag} Fetching navigation (family: ${family})...`);

  const navigationItems = await fetchNavigation(endpoint, headers, family);

  if (!navigationItems.length) {
    console.warn(`❌ ${tag} No navigation items for family "${family}" — skipping (family not configured in ACO?)\n`);
    return;
  }

  const rows = flattenTree(navigationItems);
  console.info(`${tag} Flattened ${rows.length} categories`);

  // Write local files
  const outDir = path.join(__dirname, storeSlug);
  await fs.promises.mkdir(outDir, { recursive: true });
  const txtPath = path.join(outDir, `${NAV_SHEET_NAME}.txt`);
  const jsonPath = path.join(outDir, `${NAV_SHEET_NAME}.json`);
  await Promise.all([
    fs.promises.writeFile(txtPath, toTSV(rows), 'utf-8'),
    fs.promises.writeFile(jsonPath, JSON.stringify(toEdsJson(rows), null, 2), 'utf-8'),
  ]);
  console.info(`✅ ${tag} Written ${txtPath}`);
  console.info(`✅ ${tag} Written ${jsonPath}`);

  if (mode === 'local') {
    console.info(`ℹ️ ${tag} DA upload skipped (mode: local)`);
  } else {
    const token = await getToken();
    if (token) {
      const { org, repo } = parseSiteUrl(site);
      const daPath = storeSlug === 'default' ? NAV_SHEET_NAME : `${storeSlug}/${NAV_SHEET_NAME}`;
      await uploadToDA(token, org, repo, daPath, toEdsJson(rows), tag, mode);
    } else {
      console.warn(`⚠️ ${tag} DA upload skipped — set DA_TOKEN or DA_CLIENT_ID + DA_CLIENT_SECRET to enable`);
    }
  }

  console.info('');
}

// ─── CLI argument parsing ─────────────────────────────────────────────────────

const VALID_MODES = ['local', 'preview', 'publish'];

function parseArgs(argv) {
  const args = argv.slice(2);
  const positional = [];
  let mode = 'publish';

  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--mode') {
      i += 1;
      if (!args[i] || !VALID_MODES.includes(args[i])) {
        throw new Error(`Invalid --mode value "${args[i]}". Must be one of: ${VALID_MODES.join(', ')}`);
      }
      mode = args[i];
    } else {
      positional.push(args[i]);
    }
  }

  return { positional, mode };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  let parsed;
  try {
    parsed = parseArgs(process.argv);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  const [siteArg, storeArg, familyArg] = parsed.positional;
  const { mode } = parsed;

  if (!siteArg || !storeArg || !familyArg) {
    console.error('Usage: node nav-sync.js <site> <store> <family> [--mode <mode>]');
    console.error('  site   — EDS site hostname, e.g. main--thunderbolts-aco--adobe-commerce.aem.live');
    console.error('  store  — "default" or a store key from config.json (e.g. "spain")');
    console.error('  family — ACO product family (required; must be created in ACO first)');
    console.error('  --mode — local | preview | publish (default: publish)');
    process.exit(1);
  }

  try {
    console.info(`Site: ${siteArg}`);
    console.info(`Mode: ${mode}`);
    const pub = await fetchPublicConfig(siteArg);
    const storeKey = resolveStoreKey(pub, storeArg);
    await syncStore(pub, storeKey, familyArg, siteArg, mode);
    console.info('Done.');
  } catch (err) {
    console.error(`\nError: ${err.message}`);
    process.exit(1);
  }
})();
