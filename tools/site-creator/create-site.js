/* eslint-disable no-underscore-dangle, import/no-unresolved */

import { crawl, Queue } from 'https://da.live/nx/public/utils/tree.js';
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

import { mdToDocDom, docDomToAemHtml } from 'https://da.live/nx/utils/converters.js';

const { token } = await DA_SDK;

const DA_ORIGIN = 'https://admin.da.live';
const AEM_ORIGIN = 'https://admin.hlx.page';

const IMPORT_BASE = 'https://main--aem-boilerplate-commerce--hlxsites.aem.live';
const INDEX = `${IMPORT_BASE}/full-index.json`;

function getDestinationPath(siteName, org) {
  return `/${org}/${siteName}`;
}

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${token}`,
  };
}

async function fetchIndex() {
  const res = await fetch(INDEX);
  if (!res.ok) throw new Error(`Failed to fetch index: ${res.statusText}`);
  return res.json();
}

async function previewOrPublishPages(data, action, setStatus) {
  const parent = getDestinationPath(data.repo, data.org);

  const label = action === 'preview' ? 'Previewing' : 'Publishing';

  const opts = { method: 'POST', headers: { Authorization: `Bearer ${token}` } };

  const callback = async (item) => {
    if (item.path.endsWith('.svg') || item.path.endsWith('.png') || item.path.endsWith('.jpg')) return;
    setStatus({ message: `${label}: ${item.path.replace(parent, '').replace('.html', '')}` });
    const aemPath = item.path.replace(parent, `${parent}/main`).replace('.html', '');
    const resp = await fetch(`${AEM_ORIGIN}/${action}${aemPath}`, opts);
    if (!resp.ok) throw new Error(`Could not preview ${aemPath}`);
  };

  // Get the library
  crawl({
    path: `${parent}/.da`, callback, concurrent: 5, throttle: 250,
  });
  const { results, getCallbackErrors } = crawl({
    path: parent, callback, concurrent: 5, throttle: 250,
  });

  await results;

  const errors = getCallbackErrors();
  if (errors.length > 0) {
    throw new Error(`Failed while ${label.toLowerCase()} for ${errors.length} files.`);
  }
}

function replaceHtml(text) {
  const inner = text
    .replaceAll('./media', `${IMPORT_BASE}/media`)
    .replaceAll('href="/', `href="${IMPORT_BASE}/`);

  return `
    <body>
      <header></header>
      <main>${inner}</main>
      <footer></footer>
    </body>
  `;
}

async function getAemHtml(text) {
  const dom = mdToDocDom(text);
  const aemHtml = docDomToAemHtml(dom);
  return aemHtml;
}

async function importUrl({ path, destination, setStatus }) {
  const suffix = path.endsWith('/') ? 'index' : '';
  const daDestinationPath = `${DA_ORIGIN}/source${destination}${path}${suffix}.html`;

  setStatus({ message: `Importing ${path}` });

  const resp = await fetch(`${IMPORT_BASE}${path}${suffix}.md`);

  let content = await resp.text();
  const aemHtml = await getAemHtml(content);
  const html = replaceHtml(aemHtml);

  content = new Blob([html], { type: 'text/html' });

  const formData = new FormData();
  formData.set('data', content);
  const updateRes = await fetch(daDestinationPath, { method: 'POST', body: formData, headers: getAuthHeaders() });
  if (!updateRes.ok) { throw new Error(`Failed to write ${path}: ${updateRes.statusText}`); }
}

async function copyContent(data, setStatus) {
  const destination = getDestinationPath(data.repo, data.org);

  const index = await fetchIndex();

  const failedUrls = [];
  const queue = new Queue(importUrl, 2, (item) => failedUrls.push(item.path));

  const promises = index.data.map(({ path, title }) => queue.push({
    path, title, destination, setStatus,
  }));

  await Promise.all(promises);

  if (failedUrls.length > 0) {
    throw new Error(`Failed to copy ${failedUrls.length} files.`);
  }
}

function checkAuth() {
  if (!token || token === 'undefined') {
    throw new Error('Please sign in.');
  }
}

// eslint-disable-next-line import/prefer-default-export
export async function createSite(data, setStatus) {
  checkAuth();
  setStatus({ message: 'Copying content.' });
  await copyContent(data, setStatus);
  setStatus({ message: 'Previewing pages.' });
  await previewOrPublishPages(data, 'preview', setStatus);
  setStatus({ message: 'Publishing pages.' });
  await previewOrPublishPages(data, 'live', setStatus);
  setStatus({ message: 'Done!' });
}
