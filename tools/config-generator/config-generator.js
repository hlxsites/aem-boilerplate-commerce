/* eslint-disable import/no-unresolved */

import getStyle from 'https://da.live/nx/utils/styles.js';
import { LitElement, html, nothing } from 'da-lit';
import { fetchStoreConfig } from './schema.js';
import { generateConfig } from './config.js';

const style = await getStyle(import.meta.url);

class ConfigGenerator extends LitElement {
  static properties = {
    _loading: { state: true },
    _status: { state: true },
    _config: { state: true },
    _endpoint: { state: true },
  };

  async connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.adoptedStyleSheets = [style];
  }

  handleEnvironmentTypeChange(e) {
    const environmentType = e.target.value;
    const endpointInput = this.renderRoot.querySelector('input[name="endpoint"]');

    const defaultEndpoints = {
      paas: 'https://www.aemshop.net/graphql',
      saas: 'https://na1-sandbox.api.commerce.adobe.com/LwndYQs37CvkUQk9WEmNkz/graphql',
      aco: 'https://na1-sandbox.api.commerce.adobe.com/Fwus6kdpvYCmeEdcCX7PZg/graphql',
    };

    if (endpointInput) {
      endpointInput.value = defaultEndpoints[environmentType] || defaultEndpoints.paas;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    this._loading = true;
    this._status = null;
    this._config = null;

    const endpoint = this.renderRoot.querySelector('input[name="endpoint"]').value;
    const environmentType = this.renderRoot
      .querySelector('input[name="environmentType"]:checked')?.value
      || 'paas';

    if (!endpoint) {
      this._status = { type: 'error', message: 'Please enter a GraphQL endpoint URL.' };
      this._loading = false;
      return;
    }

    try {
      // Fetch store configuration using hardcoded query
      this._status = { type: 'note', message: 'Fetching store configuration...' };
      const data = await fetchStoreConfig(endpoint);

      const { storeConfig, dataServicesStorefrontInstanceContext } = data;
      this._config = generateConfig(endpoint, storeConfig, dataServicesStorefrontInstanceContext, environmentType);
      this._endpoint = endpoint;
      this._status = { type: 'success', message: 'Configuration generated successfully!' };
    } catch (err) {
      this._status = { type: 'error', message: `Error: ${err.message}` };
      this._config = null;
    } finally {
      this._loading = false;
    }
  }

  copyToClipboard() {
    if (!this._config) return;
    const configStr = JSON.stringify(this._config, null, 2);
    navigator.clipboard.writeText(configStr);
    this._status = { type: 'success', message: 'Configuration copied to clipboard!' };
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit} autocomplete="off">
        <div class="inputgroup">
          <label for="endpoint">GraphQL API Endpoint</label>
          <div class="input-group">
            <input
              id="endpoint"
              name="endpoint"
              type="text"
              value="https://www.aemshop.net/graphql"
              placeholder="Enter GraphQL API URL (e.g. https://your-store.com/graphql)"
            />
            <button
              type="submit"
              ?disabled=${this._loading}
            >Generate</button>
            <button
              type="button"
              ?disabled=${!this._config}
              @click=${this.copyToClipboard}
            >Copy</button>
          </div>
        </div>
        <div class="fieldgroup">
          <label>Environment Type</label>
          <div class="radio-group">
            <label class="radio-label">
              <input
                type="radio"
                name="environmentType"
                value="paas"
                checked
                @change=${this.handleEnvironmentTypeChange}
              />
              PaaS (Magento Commerce Cloud)
            </label>
            <label class="radio-label">
              <input
                type="radio"
                name="environmentType"
                value="saas"
                @change=${this.handleEnvironmentTypeChange}
              />
              SaaS (Commerce Services - ACCS)
            </label>
            <!-- Temporarily disabled ACO option due to inability to query without valid headers
            <label class="radio-label">
              <input
                type="radio"
                name="environmentType"
                value="aco"
                @change=${this.handleEnvironmentTypeChange}
              />
              ACO (Adobe Commerce Operations)
            </label>
            -->
          </div>
        </div>
        ${this._status ? html`<p class="status ${this._status?.type || 'note'}">${this._status?.message}</p>` : nothing}
        ${this._config ? html`
          <div class="success-panel">
            <pre><code>${JSON.stringify(this._config, null, 2)}</code></pre>
          </div>
        ` : nothing}
      </form>
    `;
  }
}

customElements.define('da-config-generator', ConfigGenerator);
