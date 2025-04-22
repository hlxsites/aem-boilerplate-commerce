/* eslint-disable no-underscore-dangle, import/no-unresolved */

import { crawl } from 'https://da.live/nx/public/utils/tree.js';
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

const { token } = await DA_SDK;

const DA_ORIGIN = 'https://admin.da.live';
const AEM_ORIGIN = 'https://admin.hlx.page';

const BLUEPRINT = '/adobe-commerce/boilerplate';

function getDestinationPath(siteName, org) {
  return `/${org}/${siteName}`;
}

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${token}`,
  };
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
  const { results } = crawl({
    path: parent, callback, concurrent: 5, throttle: 250,
  });

  await results;
}

async function copyContent(data) {
  const formData = new FormData();
  const destination = getDestinationPath(data.repo, data.org);

  formData.set('destination', destination);

  const opts = { method: 'POST', body: formData, headers: getAuthHeaders() };

  // TODO: Remove force delete. Copying tree doesn't seem to work
  const del = await fetch(`${DA_ORIGIN}/source${destination}`, { method: 'DELETE', headers: getAuthHeaders() });

  const res = await fetch(`${DA_ORIGIN}/copy${BLUEPRINT}/`, opts);

  if (!res.ok) throw new Error(`Failed to copy content: ${res.statusText}`);
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
  await copyContent(data);
  setStatus({ message: 'Previewing pages.' });
  await previewOrPublishPages(data, 'preview', setStatus);
  setStatus({ message: 'Publishing pages.' });
  await previewOrPublishPages(data, 'live', setStatus);
  setStatus({ message: 'Done!' });
}
