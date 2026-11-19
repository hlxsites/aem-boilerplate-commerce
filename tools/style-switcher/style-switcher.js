import { ColorPicker, sanitizeHexColor } from './color-picker.js';
import { openCollabTheme } from './collab-theme.js';
import { saveStylesSheet } from './sheet-source.js';
import { DESIGN_TOKENS_URL } from '../../scripts/design-tokens.js';
import {
  getSavedStyle,
  publishStyle,
  publishTokenRows,
} from '../../scripts/style-switcher.js';
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

/**
 * @param {unknown} payload
 */
function normalizePayload(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (typeof payload === 'object' && Array.isArray(payload.data)) return payload.data;
  return [];
}

/**
 * @param {Array<Record<string, string>>} rows
 */
function extractColumns(rows) {
  if (!rows.length) return [];

  const seen = new Set();
  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!key.startsWith(':')) seen.add(key);
    });
  });

  const ordered = Object.keys(rows[0]).filter((key) => seen.has(key));
  const remainder = [...seen].filter((key) => !ordered.includes(key));
  return [...ordered, ...remainder];
}

/**
 * @param {string} column
 * @param {Array<Record<string, string>>} rows
 */
function isColorColumn(column, rows) {
  if (getSelectOptions(column)) return false;

  const values = rows
    .map((row) => row[column])
    .filter((value) => value != null && value !== '');

  if (!values.length) {
    const slug = toClassName(column);
    return slug.includes('color')
      || slug.includes('background')
      || slug.includes('foreground')
      || slug.includes('accent');
  }
  return values.every((value) => Boolean(sanitizeHexColor(value)));
}

/**
 * @param {Record<string, string>} row
 */
function rowToToken(row) {
  return {
    id: crypto.randomUUID(),
    values: { ...row },
  };
}

/**
 * @param {string[]} columns
 */
function createEmptyToken(columns) {
  return {
    id: crypto.randomUUID(),
    values: Object.fromEntries(columns.map((column) => [column, ''])),
  };
}

/**
 * @param {string} name
 */
function toClassName(name) {
  return typeof name === 'string'
    ? name
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    : '';
}

const SELECT_OPTIONS = {
  'layout-split': ['30-70', '40-60', '50-50', '60-40', '70-30'],
  'horizontal-alignment': ['left', 'center', 'right'],
  'vertical-alignment': ['top', 'center', 'bottom'],
  'font-sizes': ['small', 'medium', 'large'],
};

/**
 * @param {string} column
 * @returns {string[] | null}
 */
function getSelectOptions(column) {
  const slug = toClassName(column);
  if (slug.includes('layout') && slug.includes('split')) return SELECT_OPTIONS['layout-split'];
  if (slug.includes('horizontal') && slug.includes('align')) return SELECT_OPTIONS['horizontal-alignment'];
  if (slug.includes('vertical') && slug.includes('align')) return SELECT_OPTIONS['vertical-alignment'];
  if (slug.includes('font') && slug.includes('size')) return SELECT_OPTIONS['font-sizes'];
  return null;
}

/** Unstyled page: white surface, ink text. Accent falls back to ink too. */
const DEFAULT_PREVIEW = {
  bg: '#ffffff',
  fg: '#292929',
  accent: '#292929',
};

/**
 * @param {{ values: Record<string, string> }} token
 * @param {string[]} columns
 */
function getPreviewColors(token, columns) {
  const colors = { ...DEFAULT_PREVIEW };

  columns.slice(1).forEach((column) => {
    const color = sanitizeHexColor(token.values[column]);
    if (!color) return;

    const slug = toClassName(column);
    if (slug === 'background' || slug.includes('background')) colors.bg = color;
    else if (slug === 'foreground' || slug.includes('foreground')) colors.fg = color;
    else if (slug.includes('accent')) colors.accent = color;
  });

  return colors;
}

/**
 * @param {string} value
 */
function parseLayoutSplit(value) {
  const match = /^(\d+)\s*-\s*(\d+)$/.exec(String(value || '').trim());
  if (!match) return { content: 60, media: 40 };
  return { content: Number(match[1]), media: Number(match[2]) };
}

/**
 * @param {{ values: Record<string, string> }} token
 * @param {string[]} columns
 */
function getPreviewLayout(token, columns) {
  const layout = {
    split: '60-40',
    horizontal: 'left',
    vertical: 'center',
    fontSize: 'medium',
  };

  columns.slice(1).forEach((column) => {
    const value = String(token.values[column] || '').trim().toLowerCase();
    if (!value) return;

    const slug = toClassName(column);
    if (slug.includes('layout') && slug.includes('split')) layout.split = value;
    else if (slug.includes('horizontal') && slug.includes('align')) layout.horizontal = value;
    else if (slug.includes('vertical') && slug.includes('align')) layout.vertical = value;
    else if (slug.includes('font') && slug.includes('size')) layout.fontSize = value;
  });

  return layout;
}

/**
 * @param {HTMLElement} frame
 * @param {HTMLElement} content
 * @param {HTMLElement} heading
 * @param {HTMLElement} button
 * @param {{ values: Record<string, string> }} token
 * @param {string[]} columns
 */
function paintPreview(frame, content, heading, button, token, columns) {
  const { bg, fg, accent } = getPreviewColors(token, columns);
  const { split, horizontal, vertical, fontSize } = getPreviewLayout(token, columns);
  const { content: contentShare, media } = parseLayoutSplit(split);

  frame.dataset.split = split;
  frame.dataset.horizontal = horizontal;
  frame.dataset.vertical = vertical;
  frame.dataset.fontSize = fontSize;
  frame.style.gridTemplateColumns = `${contentShare}fr ${media}fr`;

  let alignItems = 'flex-start';
  if (horizontal === 'center') alignItems = 'center';
  else if (horizontal === 'right') alignItems = 'flex-end';

  let justifyContent = 'center';
  if (vertical === 'top') justifyContent = 'flex-start';
  else if (vertical === 'bottom') justifyContent = 'flex-end';

  content.style.backgroundColor = bg;
  content.style.color = fg;
  content.style.alignItems = alignItems;
  content.style.justifyContent = justifyContent;
  content.style.textAlign = horizontal;
  heading.style.color = accent;
  button.style.backgroundColor = accent;
}

class StylePicker {
  constructor(root) {
    this.root = root;
    this.tokens = [];
    this.columns = [];
    this.sourceRows = [];
    this.sheetName = '';
    this.managing = false;
    this.editingId = null;
    this.activeStyle = '';
    this.pagePath = '';
    this.collab = null;
    this.org = '';
    this.site = '';
    this.daFetch = null;
    this.accessToken = '';
    this.loadFailed = false;
    this.dirty = false;
    this.dirtyVersion = 0;
    this.saving = false;
    this.dragId = null;
    this.list = root.querySelector('[data-preview-list]');
    this.propertySheet = root.querySelector('[data-property-sheet]');
    this.sheetFields = root.querySelector('[data-sheet-fields]');
    this.sheetPreview = root.querySelector('[data-sheet-preview]');
    this.sheetTitle = root.querySelector('[data-sheet-title]');
    this.emptyState = root.querySelector('[data-empty-state]');
    this.targetHint = root.querySelector('[data-target-hint]');
    this.errorState = root.querySelector('[data-error-state]');
    /** @type {{ kind: 'theme' | 'section' | 'block', label: string, style: string } | null} */
    this.target = null;
    this.modeBtn = root.querySelector('[data-mode-btn]');
    this.addBtn = root.querySelector('[data-add-btn]');
    this.saveBtn = root.querySelector('[data-save-btn]');
    this.colorPicker = new ColorPicker();

    this.modeBtn.addEventListener('click', () => this.toggleManage());
    this.addBtn.addEventListener('click', () => this.addToken());
    this.saveBtn.addEventListener('click', () => this.saveStyles());
    root.querySelector('[data-sheet-back]').addEventListener('click', () => this.closeEditor());
    this.boot();
  }

  async boot() {
    await Promise.all([this.loadTokens(), this.loadDocumentTheme()]);
    if (!this.loadFailed) this.render();
  }

  async loadDocumentTheme() {
    let sdk;
    try {
      sdk = await Promise.race([
        DA_SDK,
        new Promise((resolve) => { setTimeout(resolve, 4000); }),
      ]);
    } catch { /* handshake failed */ }

    if (!sdk?.context?.org || !sdk.token) {
      this.activeStyle = getSavedStyle() ?? '';
      this.refreshTarget();
      return;
    }

    this.pagePath = sdk.context.path || '/';
    this.org = sdk.context.org;
    this.site = sdk.context.repo || sdk.context.site || '';
    this.daFetch = sdk.actions?.daFetch || null;
    this.accessToken = sdk.token || '';

    try {
      this.collab = await openCollabTheme({
        token: sdk.token,
        context: sdk.context,
        actions: sdk.actions,
      });
      this.activeStyle = this.collab.getTheme();
      publishStyle(this.activeStyle, this.pagePath);
      this.collab.watchSelection(() => this.refreshTarget());
      this.refreshTarget();
    } catch {
      this.activeStyle = getSavedStyle() ?? '';
      this.showStatus('Could not open this document in collab.');
      this.refreshTarget();
    }
  }

  /**
   * @param {string} message
   */
  showStatus(message) {
    this.errorState.hidden = !message;
    this.errorState.textContent = message || '';
  }

  /**
   * @returns {string[]}
   */
  styleNames() {
    const column = this.columns[0];
    if (!column) return [];
    return this.tokens.map((token) => token.values[column]).filter(Boolean);
  }

  /**
   * Style name shown as selected. Page Theme for Metadata, the Style
   * property for section metadata, and the block variant otherwise.
   */
  highlightedStyle() {
    if (!this.target) return null;
    if (this.target.kind === 'theme') return this.activeStyle;
    return this.target.style || '';
  }

  refreshTarget() {
    this.target = this.collab?.targetState(this.styleNames()) ?? null;
    this.targetHint.hidden = this.managing;
    if (!this.target) {
      this.targetHint.textContent = 'Select a block to apply a style.';
    } else {
      this.targetHint.textContent = `Applying to ${this.target.label}`;
    }
    this.list.classList.toggle('is-disabled', !this.managing && !this.target);
    if (!this.managing) this.renderPreviews();
  }

  /**
   * @param {string} styleName
   * @param {string[]} [extraKnown] style names to treat as known so a rename or delete replaces them
   */
  commitStyle(styleName, extraKnown = []) {
    if (!this.collab) {
      this.refreshTarget();
      return;
    }
    const names = [...new Set([...this.styleNames(), ...extraKnown].filter(Boolean))];
    let applied = null;
    try {
      applied = this.collab.applyStyle(styleName, names);
    } catch {
      this.showStatus('Could not save the style on this block.');
      return;
    }
    this.showStatus('');
    if (!applied) {
      this.refreshTarget();
      return;
    }
    if (applied.kind === 'theme') {
      this.activeStyle = styleName;
      publishStyle(styleName, this.pagePath);
    }
    this.refreshTarget();
  }

  toggleManage() {
    this.managing = !this.managing;
    this.editingId = null;
    this.modeBtn.setAttribute('aria-pressed', String(this.managing));
    this.modeBtn.textContent = this.managing ? 'Done' : 'Manage styles';
    this.colorPicker.close();
    this.render();
  }

  /**
   * @param {string} message
   */
  showError(message) {
    this.errorState.hidden = false;
    this.errorState.textContent = message;
    this.propertySheet.hidden = true;
    this.list.hidden = true;
    this.emptyState.hidden = true;
  }

  clearError() {
    this.errorState.hidden = true;
    this.errorState.textContent = '';
  }

  async loadTokens() {
    this.clearError();
    try {
      const response = await fetch(DESIGN_TOKENS_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const rows = normalizePayload(payload);
      this.sourceRows = rows;
      this.columns = extractColumns(rows);
      this.tokens = rows.map(rowToToken);
      this.sheetName = payload && typeof payload === 'object' && !Array.isArray(payload)
        ? payload[':sheetname'] || ''
        : '';
      this.loadFailed = false;
    } catch (error) {
      this.tokens = [];
      this.columns = [];
      this.sourceRows = [];
      this.sheetName = '';
      this.loadFailed = true;
      this.showError(`Failed to load ${DESIGN_TOKENS_URL}: ${error.message}`);
    }
  }

  broadcastRows() {
    publishTokenRows(this.tokens.map((token) => ({ ...token.values })));
  }

  /**
   * @param {string} styleName
   */
  chooseStyle(styleName) {
    this.commitStyle(styleName);
  }

  addToken() {
    if (!this.columns.length) {
      this.showStatus('This style sheet has no columns.');
      return;
    }
    const token = createEmptyToken(this.columns);
    this.tokens.push(token);
    this.editingId = token.id;
    this.markDirty();
    this.render();
  }

  /**
   * @param {string} id
   */
  removeToken(id) {
    const token = this.tokens.find((entry) => entry.id === id);
    const name = token ? token.values[this.columns[0]] : '';
    const wasApplied = Boolean(name && this.highlightedStyle() === name);
    this.tokens = this.tokens.filter((entry) => entry.id !== id);
    if (this.editingId === id) this.editingId = null;
    if (wasApplied) this.commitStyle('', [name]);
    this.markDirty();
    this.render();
  }

  /**
   * @param {string} fromId
   * @param {string} toId
   * @param {boolean} placeBefore
   */
  reorderToken(fromId, toId, placeBefore) {
    if (!fromId || fromId === toId) return;
    const from = this.tokens.findIndex((token) => token.id === fromId);
    if (from < 0) return;
    const [token] = this.tokens.splice(from, 1);
    let insertAt = this.tokens.findIndex((entry) => entry.id === toId);
    if (insertAt < 0) {
      this.tokens.splice(from, 0, token);
      return;
    }
    if (!placeBefore) insertAt += 1;
    this.tokens.splice(insertAt, 0, token);
    this.markDirty();
    this.render();
  }

  /**
   * @param {string} id
   */
  editToken(id) {
    this.editingId = id;
    this.colorPicker.close();
    this.render();
  }

  closeEditor() {
    this.editingId = null;
    this.colorPicker.close();
    this.render();
  }

  markDirty() {
    this.dirty = true;
    this.dirtyVersion += 1;
    this.updateSaveButton();
  }

  updateSaveButton() {
    if (!this.saveBtn) return;
    this.saveBtn.hidden = !this.managing;
    this.saveBtn.disabled = !this.dirty || this.saving;
    this.saveBtn.textContent = this.saving ? 'Saving…' : 'Save';
  }

  async saveStyles() {
    if (!this.dirty || this.saving) return;
    const version = this.dirtyVersion;
    const rows = this.rowsForSave();
    const { sheetName } = this;
    this.saving = true;
    this.updateSaveButton();
    const saved = await this.persistRows(rows, sheetName);
    if (saved && this.dirtyVersion === version) {
      this.dirty = false;
      this.broadcastRows();
    }
    this.saving = false;
    this.updateSaveButton();
  }

  rowsForSave() {
    return this.tokens.map((token) => {
      const row = {};
      this.columns.forEach((column) => {
        row[column] = token.values[column] ?? '';
      });
      return row;
    });
  }

  /**
   * @param {Array<Record<string, string>>} rows
   * @param {string} sheetName
   * @returns {Promise<boolean>}
   */
  async persistRows(rows, sheetName) {
    if (!this.daFetch || !this.org || !this.site) {
      this.showSaveStatus('Could not save styles. Open this panel from a document.');
      return false;
    }
    try {
      const result = await saveStylesSheet({
        daFetch: this.daFetch,
        org: this.org,
        site: this.site,
        token: this.accessToken,
        rows,
        sheetName,
      });
      this.showSaveStatus(result === 'preview'
        ? 'Styles were saved. Preview did not update.'
        : '');
      return true;
    } catch {
      this.showSaveStatus('Could not save styles.');
      return false;
    }
  }

  /**
   * @param {string} message
   */
  showSaveStatus(message) {
    const current = this.errorState.textContent || '';
    const saveMessages = [
      'Could not save styles.',
      'Could not save styles. Open this panel from a document.',
      'Styles were saved. Preview did not update.',
    ];
    if (!message && !saveMessages.includes(current)) return;
    this.showStatus(message);
  }

  renderPreviews() {
    this.list.innerHTML = '';
    this.list.classList.toggle('is-disabled', !this.target);
    this.list.append(this.renderDefaultCard());
    this.tokens.forEach((token) => {
      this.list.append(this.renderPreviewCard(token));
    });
  }

  renderDefaultCard() {
    const button = document.createElement('button');
    button.type = 'button';
    const highlighted = this.highlightedStyle();
    button.className = `preview-card${highlighted === '' ? ' is-selected' : ''}`;
    button.disabled = !this.target;
    button.addEventListener('click', () => this.commitStyle(''));

    const name = document.createElement('span');
    name.className = 'preview-card-name';
    name.textContent = 'Site default';
    button.append(name, this.buildPreviewFrame(null));
    return button;
  }

  /**
   * @param {{ id: string, values: Record<string, string> } | null} token
   */
  buildPreviewFrame(token) {
    const frame = document.createElement('span');
    frame.className = 'token-preview';
    const content = document.createElement('span');
    content.className = 'token-preview-content';
    const kicker = document.createElement('span');
    kicker.className = 'preview-kicker';
    kicker.textContent = "This Week's Hot Deals:";
    const title = document.createElement('span');
    title.className = 'preview-title';
    title.textContent = 'Sample Heading';
    const action = document.createElement('span');
    action.className = 'preview-button';
    action.textContent = 'Shop the sale';
    const image = document.createElement('span');
    image.className = 'token-preview-image';
    image.setAttribute('aria-hidden', 'true');
    content.append(kicker, title, action);
    frame.append(content, image);

    if (token) paintPreview(frame, content, title, action, token, this.columns);
    else {
      content.style.backgroundColor = DEFAULT_PREVIEW.bg;
      content.style.color = DEFAULT_PREVIEW.fg;
      title.style.color = DEFAULT_PREVIEW.accent;
      action.style.backgroundColor = DEFAULT_PREVIEW.accent;
    }
    return frame;
  }

  /**
   * @param {{ id: string, values: Record<string, string> }} token
   */
  renderPreviewCard(token) {
    const styleName = token.values[this.columns[0]] || 'Untitled';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `preview-card${this.highlightedStyle() === styleName ? ' is-selected' : ''}`;
    button.disabled = !this.target;
    button.addEventListener('click', () => this.chooseStyle(styleName));

    const name = document.createElement('span');
    name.className = 'preview-card-name';
    name.textContent = styleName;
    button.append(name, this.buildPreviewFrame(token));
    return button;
  }

  /**
   * @param {string} id
   * @param {string} column
   * @param {string} value
   */
  updateToken(id, column, value) {
    const token = this.tokens.find((entry) => entry.id === id);
    if (!token || token.values[column] === value) return;
    const previous = token.values[column];
    token.values[column] = value;
    this.markDirty();

    const renaming = column === this.columns[0]
      && previous
      && this.highlightedStyle() === previous;
    if (renaming) this.commitStyle(value, [previous]);
    if (this.editingId === id) this.paintEditingPreview();
  }

  paintEditingPreview() {
    const token = this.tokens.find((entry) => entry.id === this.editingId);
    const frame = this.sheetPreview?.querySelector('.token-preview');
    if (!token || !(frame instanceof HTMLElement)) return;
    const content = frame.querySelector('.token-preview-content');
    const title = frame.querySelector('.preview-title');
    const action = frame.querySelector('.preview-button');
    if (content instanceof HTMLElement && title instanceof HTMLElement && action instanceof HTMLElement) {
      paintPreview(frame, content, title, action, token, this.columns);
    }
    this.sheetTitle.textContent = token.values[this.columns[0]] || 'New style';
  }

  /**
   * @param {{ id: string, values: Record<string, string> }} token
   * @param {string} column
   * @param {string} value
   * @param {string[]} options
   */
  renderPropertySelect(token, column, value, options) {
    const select = document.createElement('select');
    const blank = document.createElement('option');
    blank.value = '';
    blank.textContent = '—';
    select.append(blank);

    const normalized = String(value || '').trim().toLowerCase();
    if (normalized && !options.includes(normalized)) {
      const custom = document.createElement('option');
      custom.value = normalized;
      custom.textContent = normalized;
      select.append(custom);
    }
    options.forEach((option) => {
      const el = document.createElement('option');
      el.value = option;
      el.textContent = option;
      select.append(el);
    });
    select.value = normalized;
    select.addEventListener('change', (event) => {
      this.updateToken(token.id, column, event.target.value);
    });
    return select;
  }

  /**
   * @param {{ id: string, values: Record<string, string> }} token
   * @param {string} column
   * @param {string} value
   */
  renderPropertyColor(token, column, value) {
    const row = document.createElement('span');
    row.className = 'property-color';
    const color = sanitizeHexColor(value);

    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = `color-swatch${color ? '' : ' is-empty'}`;
    swatch.setAttribute('aria-label', `Pick ${column}`);
    if (color) swatch.style.backgroundColor = color;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = color || '';
    input.spellcheck = false;
    input.placeholder = '#000000';
    input.autocomplete = 'off';
    input.setAttribute('aria-label', column);

    const paintSwatch = (hex) => {
      swatch.classList.toggle('is-empty', !hex);
      swatch.style.backgroundColor = hex || '';
      input.value = hex || '';
    };

    swatch.addEventListener('click', () => {
      this.colorPicker.open({
        anchor: swatch,
        value: sanitizeHexColor(token.values[column]) || '#000000',
        label: column,
        onChange: (hex) => {
          this.updateToken(token.id, column, hex);
          paintSwatch(hex);
        },
      });
    });
    input.addEventListener('change', () => {
      const hex = sanitizeHexColor(input.value) || '';
      this.updateToken(token.id, column, hex);
      paintSwatch(hex);
    });

    row.append(swatch, input);
    return row;
  }

  /**
   * @param {{ id: string, values: Record<string, string> }} token
   * @param {string} column
   */
  renderProperty(token, column) {
    const field = document.createElement('label');
    field.className = 'property-field';
    const caption = document.createElement('span');
    caption.textContent = column;
    field.append(caption);

    const value = token.values[column] || '';
    const selectOptions = column === this.columns[0] ? null : getSelectOptions(column);
    if (selectOptions) {
      field.append(this.renderPropertySelect(token, column, value, selectOptions));
      return field;
    }
    if (column !== this.columns[0] && isColorColumn(column, this.sourceRows)) {
      field.append(this.renderPropertyColor(token, column, value));
      return field;
    }

    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.autocomplete = 'off';
    if (column === this.columns[0]) input.placeholder = 'Style name';
    input.addEventListener('input', (event) => {
      this.updateToken(token.id, column, event.target.value);
    });
    field.append(input);
    return field;
  }

  renderPropertySheet() {
    const token = this.tokens.find((entry) => entry.id === this.editingId);
    if (!token) return;
    this.sheetPreview.replaceChildren(this.buildPreviewFrame(token));
    this.sheetTitle.textContent = token.values[this.columns[0]] || 'New style';
    this.sheetFields.replaceChildren(
      ...this.columns.map((column) => this.renderProperty(token, column)),
    );
  }

  /**
   * @param {string} label
   * @param {() => void} onClick
   * @param {boolean} [disabled]
   */
  actionButton(label, onClick, disabled = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'manage-btn';
    button.textContent = label;
    button.disabled = disabled;
    button.addEventListener('click', onClick);
    return button;
  }

  /**
   * @param {{ id: string, values: Record<string, string> }} token
   */
  renderManageCard(token) {
    const styleName = token.values[this.columns[0]] || 'Untitled';
    const card = document.createElement('article');
    card.className = 'preview-card manage-card';

    const grabber = document.createElement('button');
    grabber.type = 'button';
    grabber.className = 'grabber';
    grabber.draggable = true;
    grabber.setAttribute('aria-label', `Drag to reorder ${styleName}`);
    grabber.innerHTML = '<svg viewBox="0 0 10 16" aria-hidden="true"><circle cx="2" cy="2" r="1.2"/><circle cx="8" cy="2" r="1.2"/><circle cx="2" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="2" cy="14" r="1.2"/><circle cx="8" cy="14" r="1.2"/></svg>';

    const main = document.createElement('div');
    main.className = 'manage-card-main';
    const name = document.createElement('span');
    name.className = 'preview-card-name';
    name.textContent = styleName;
    main.append(name, this.buildPreviewFrame(token));

    const actions = document.createElement('div');
    actions.className = 'manage-actions';
    const edit = this.actionButton('Edit', () => this.editToken(token.id));
    edit.setAttribute('aria-label', `Edit ${styleName}`);
    const remove = this.actionButton('Delete', () => this.removeToken(token.id));
    remove.classList.add('is-danger');
    remove.setAttribute('aria-label', `Delete ${styleName}`);
    actions.append(edit, remove);

    grabber.addEventListener('dragstart', (event) => {
      this.dragId = token.id;
      card.classList.add('is-dragging');
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', token.id);
      event.dataTransfer.setDragImage(card, 20, 20);
    });
    grabber.addEventListener('dragend', () => {
      this.dragId = null;
      this.clearDropMarkers();
    });
    card.addEventListener('dragover', (event) => {
      if (!this.dragId || this.dragId === token.id) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      const before = event.clientY < card.getBoundingClientRect().top + (card.getBoundingClientRect().height / 2);
      this.markDropTarget(card, before);
    });
    card.addEventListener('drop', (event) => {
      if (!this.dragId) return;
      event.preventDefault();
      const before = card.classList.contains('is-drop-before');
      const fromId = event.dataTransfer.getData('text/plain') || this.dragId;
      this.clearDropMarkers();
      this.reorderToken(fromId, token.id, before);
    });

    card.append(grabber, main, actions);
    return card;
  }

  /**
   * @param {HTMLElement} card
   * @param {boolean} before
   */
  markDropTarget(card, before) {
    this.list.querySelectorAll('.manage-card').forEach((entry) => {
      entry.classList.toggle('is-drop-before', entry === card && before);
      entry.classList.toggle('is-drop-after', entry === card && !before);
    });
  }

  clearDropMarkers() {
    this.list.querySelectorAll('.manage-card').forEach((entry) => {
      entry.classList.remove('is-dragging', 'is-drop-before', 'is-drop-after');
    });
  }

  renderManageList() {
    this.list.innerHTML = '';
    this.list.classList.remove('is-disabled');
    this.tokens.forEach((token) => {
      this.list.append(this.renderManageCard(token));
    });
  }

  render() {
    const editing = Boolean(
      this.managing
      && this.editingId
      && this.tokens.some((token) => token.id === this.editingId),
    );
    if (this.managing && this.editingId && !editing) this.editingId = null;

    const hasTokens = this.tokens.length > 0;
    this.emptyState.hidden = hasTokens || editing;
    this.targetHint.hidden = this.managing;
    this.addBtn.hidden = !this.managing || editing;
    this.list.hidden = editing || !hasTokens;
    this.propertySheet.hidden = !editing;
    this.updateSaveButton();

    if (editing) {
      this.renderPropertySheet();
      return;
    }
    this.colorPicker.close();
    if (this.managing) {
      this.renderManageList();
      return;
    }
    if (hasTokens) this.renderPreviews();
  }
}

const root = document.querySelector('[data-style-picker]');
if (root) new StylePicker(root);

DA_SDK.catch(() => {
  // Outside Experience Workspace the panel title handshake is unavailable.
});
