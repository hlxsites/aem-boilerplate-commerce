/* eslint-disable no-underscore-dangle, import/no-unresolved */

import 'https://da.live/nx/public/sl/components.js';
import getStyle from 'https://da.live/nx/utils/styles.js';
import { LitElement, html, nothing } from 'da-lit';
import { createSite } from './create-site.js';

const style = await getStyle(import.meta.url);

class SiteCreator extends LitElement {
  static properties = {
    _data: { state: true },
    _loading: { state: true },
    _status: { state: true },
    _time: { state: true },
  };

  async connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.adoptedStyleSheets = [style];
  }

  static calculateCrawlTime(startTime) {
    const crawlTime = Date.now() - startTime;
    return `${String(crawlTime / 1000).substring(0, 4)}s`;
  }

  async handleSubmit(e) {
    e.preventDefault();
    this._time = null;
    this._loading = true;
    const formData = new FormData(e.target.closest('form'));
    const entries = Object.fromEntries(formData.entries());

    const empty = Object.keys(entries).some((key) => !entries[key]);
    if (empty) {
      this._status = { type: 'error', message: 'Some fields empty.' };
      return;
    }

    try {
      const url = new URL(entries.github);
      const org = url.pathname.split('/')[1];
      const repo = url.pathname.split('/')[2];

      if (!org || !repo) {
        this._status = { type: 'error', message: 'Invalid Github URL.' };
        return;
      }

      this._data = {
        repo,
        org,
      };
    } catch (err) {
      this._status = { type: 'error', message: `Invalid Github URL: ${err}` };
      return;
    }

    const startTime = Date.now();
    const getTime = setInterval(() => {
      this._time = SiteCreator.calculateCrawlTime(startTime);
    }, 100);

    const setStatus = (status) => { this._status = status; };

    try {
      await createSite(this._data, setStatus);
    } catch (err) {
      this._status = ({ type: 'error', message: e.message });
      throw err;
    } finally {
      clearTimeout(getTime);
    }

    this._status = { type: 'success', message: `Site created in ${SiteCreator.calculateCrawlTime(startTime)}.` };
  }

  renderSuccess() {
    return html`
      <div class="success-panel">
        <h2>Edit content</h2>
        <p><a href="https://da.live/edit#/${this._data.org}/${this._data.repo}/nav" target="_blank">Edit main navigation</a></p>
        <p><a href="https://da.live/edit#/${this._data.org}/${this._data.repo}/footer" target="_blank">Edit footer</a></p>
        <p><a href="https://da.live/#/${this._data.org}/${this._data.repo}" target="_blank">View all content</a></p>
      </div>
      <div class="success-panel">
        <h2>View site</h2>
        <p><a href="https://main--${this._data.repo}--${this._data.org}.aem.page" target="_blank">Visit site</a></p>
      </div>
      <p class="status ${this._status.type || 'note'}">${this._status.message}</p>
    `;
  }

  renderForm() {
    return html`
      <form>
        <div class="fieldgroup">
          <label>Project Github URL</label>
          <sl-input type="text" name="github" placeholder="Enter Github URL"></sl-input>
          <p>Don't have a Github repo yet? <a target="_blank" href="https://github.com/hlxsites/aem-boilerplate-commerce">Start here.</a></p>
        </div>
        <div class="form-footer">
          <div>
          </div>
          <div class="time-actions">
            <p>${this._time}</p>
            <sl-button ?disabled=${this._loading} @click=${this.handleSubmit}>Create site</sl-button>
          </div>
        </div>
        ${this._status ? html`<p class="status ${this._status?.type || 'note'}">${this._status?.message}</p>` : nothing}
      </form>
    `;
  }

  render() {
    return html`
      ${this._status?.type === 'success' ? this.renderSuccess() : this.renderForm()}
    `;
  }
}

customElements.define('da-site-creator', SiteCreator);
