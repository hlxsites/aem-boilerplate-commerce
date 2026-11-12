import { WebsocketProvider, Y } from 'https://da.live/deps/da-y-wrapper/dist/index.js';

const COLLAB_ORIGIN = 'wss://collab.da.live';
const DA_ADMIN = 'https://admin.da.live';
const AEM_API = 'https://api.aem.live';
const HLX_ADMIN = 'https://admin.hlx.page';

/**
 * Same room the Experience Workspace editor joins. da-collab picks the
 * content store from this URL.
 * @param {{ org?: string, repo?: string, site?: string, path?: string }} context
 * @param {boolean} hlx6
 */
function collabRoom(context, hlx6) {
  const site = context.repo || context.site;
  let path = context.path || '/index';
  if (!path.startsWith('/')) path = `/${path}`;
  path = path.replace(/\.html$/, '');
  if (path === '/') path = '/index';
  if (hlx6) return `${AEM_API}/${context.org}/sites/${site}/source${path}.html`;
  return `${DA_ADMIN}/source/${context.org}/${site}${path}.html`;
}

/**
 * @param {{ daFetch: Function }} actions
 * @param {string} org
 * @param {string} site
 */
async function probeHlx6(actions, org, site) {
  if (!actions?.daFetch || !org || !site) return false;
  try {
    const resp = await actions.daFetch(`${HLX_ADMIN}/ping/${org}/${site}`);
    return resp.headers?.get('x-api-upgrade-available') !== null;
  } catch {
    return false;
  }
}

/**
 * @param {WebsocketProvider} provider
 */
function waitForSync(provider) {
  if (provider.synced) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      provider.off('synced', onSynced);
      reject(new Error('Collab sync timed out'));
    }, 8000);

    const onSynced = (state) => {
      const synced = Array.isArray(state) ? state[0] : state;
      if (!synced) return;
      clearTimeout(timer);
      provider.off('synced', onSynced);
      resolve();
    };

    provider.on('synced', onSynced);
  });
}

/**
 * @param {Y.XmlFragment | Y.XmlElement | null | undefined} node
 */
function children(node) {
  if (!node || typeof node.toArray !== 'function') return [];
  return node.toArray();
}

/**
 * @param {Y.XmlFragment | Y.XmlElement} node
 */
function plainText(node) {
  if (!node) return '';
  if (node instanceof Y.XmlText) return node.toString();
  if (node instanceof Y.XmlElement || node instanceof Y.XmlFragment) {
    return children(node).map(plainText).join('');
  }
  return '';
}

/**
 * @param {Y.XmlFragment | Y.XmlElement} node
 * @param {string} nodeName
 */
function elementsNamed(node, nodeName) {
  return children(node).filter((child) => (
    child instanceof Y.XmlElement && child.nodeName === nodeName
  ));
}

/**
 * @param {Y.XmlElement} node
 * @param {Y.XmlText[]} found
 */
function collectText(node, found) {
  children(node).forEach((child) => {
    if (child instanceof Y.XmlText) found.push(child);
    else if (child instanceof Y.XmlElement) collectText(child, found);
  });
}

/**
 * @param {Y.XmlElement} cell
 * @param {string} value
 */
function setCellText(cell, value) {
  const texts = [];
  collectText(cell, texts);
  if (!texts.length) {
    let paragraph = elementsNamed(cell, 'paragraph')[0];
    if (!paragraph) {
      paragraph = new Y.XmlElement('paragraph');
      cell.insert(0, [paragraph]);
    }
    const text = new Y.XmlText();
    if (value) text.insert(0, value);
    paragraph.insert(0, [text]);
    return;
  }

  const [first, ...rest] = texts;
  const current = first.toString();
  if (current !== value) {
    if (current.length) first.delete(0, current.length);
    if (value) first.insert(0, value);
  }
  rest.forEach((text) => {
    const length = text.toString().length;
    if (length) text.delete(0, length);
  });
}

/**
 * @param {Y.XmlElement | undefined} sample
 * @param {string} value
 */
function textCell(sample, value) {
  if (sample) {
    const copy = sample.clone();
    setCellText(copy, value);
    copy.setAttribute('colspan', 1);
    copy.setAttribute('rowspan', 1);
    return copy;
  }

  const cell = new Y.XmlElement('table_cell');
  cell.setAttribute('colspan', 1);
  cell.setAttribute('rowspan', 1);
  const paragraph = new Y.XmlElement('paragraph');
  const text = new Y.XmlText();
  if (value) text.insert(0, value);
  paragraph.insert(0, [text]);
  cell.insert(0, [paragraph]);
  return cell;
}

/**
 * @param {Y.XmlFragment} fragment
 */
function metadataTables(fragment) {
  const found = [];
  const walk = (node) => {
    children(node).forEach((child) => {
      if (!(child instanceof Y.XmlElement)) return;
      if (child.nodeName === 'table') {
        const rows = elementsNamed(child, 'table_row');
        const label = plainText(rows[0]).trim().toLowerCase();
        if (label === 'metadata') found.push(child);
      } else {
        walk(child);
      }
    });
  };
  walk(fragment);
  return found;
}

/**
 * @param {Y.XmlElement} row
 */
function rowCells(row) {
  return children(row).filter((child) => (
    child instanceof Y.XmlElement
    && (child.nodeName === 'table_cell' || child.nodeName === 'table_header')
  ));
}

/**
 * @param {Y.XmlElement} table
 * @param {string} propertyName
 */
function propertyCells(table, propertyName) {
  const wanted = propertyName.trim().toLowerCase();
  const rows = elementsNamed(table, 'table_row').slice(1);
  const row = rows.find((entry) => plainText(rowCells(entry)[0]).trim().toLowerCase() === wanted);
  if (!row) return null;
  return { row, cells: rowCells(row) };
}

/**
 * @param {Y.XmlElement | null | undefined} table
 * @param {string} propertyName
 */
function readProperty(table, propertyName) {
  if (!table) return '';
  return plainText(propertyCells(table, propertyName)?.cells[1]).trim();
}

/**
 * @param {Y.Doc} ydoc
 */
function readTheme(ydoc) {
  const fragment = ydoc.getXmlFragment('prosemirror');
  const table = metadataTables(fragment).at(-1);
  return readProperty(table, 'Theme');
}

/**
 * Writes a key/value row. Metadata uses Theme; section metadata uses Style.
 * @param {Y.XmlElement} table
 * @param {string} propertyName
 * @param {string} styleName
 */
function ensurePropertyRow(table, propertyName, styleName) {
  const existing = propertyCells(table, propertyName);
  if (existing?.cells[1]) {
    setCellText(existing.cells[1], styleName);
    return;
  }
  if (existing) {
    existing.row.insert(existing.row.length, [textCell(undefined, styleName)]);
    return;
  }

  const sampleRow = elementsNamed(table, 'table_row')[1] || elementsNamed(table, 'table_row')[0];
  const sampleCells = sampleRow ? rowCells(sampleRow) : [];
  const row = new Y.XmlElement('table_row');
  row.insert(0, [
    textCell(sampleCells[0], propertyName),
    textCell(sampleCells[1] || sampleCells[0], styleName),
  ]);
  table.insert(table.length, [row]);
}

/**
 * @param {string} text
 */
function parseBlockHeader(text) {
  const raw = text.trim();
  const open = raw.lastIndexOf('(');
  if (open === -1 || !raw.endsWith(')')) return { name: raw, variants: [] };
  const name = raw.slice(0, open).trim();
  const variants = raw.slice(open + 1, -1).split(',').map((variant) => variant.trim()).filter(Boolean);
  return { name, variants };
}

/**
 * @param {string} name
 * @param {string[]} variants
 */
function formatBlockHeader(name, variants) {
  if (!variants.length) return name;
  return `${name} (${variants.join(', ')})`;
}

/**
 * @param {Y.XmlElement | Y.XmlText | null | undefined} node
 * @returns {Y.XmlElement | null}
 */
function ancestorTable(node) {
  let current = node || null;
  while (current) {
    if (current instanceof Y.XmlElement && current.nodeName === 'table') return current;
    current = current.parent || null;
  }
  return null;
}

/**
 * @param {Y.XmlElement} table
 */
function headerCell(table) {
  const row = elementsNamed(table, 'table_row')[0];
  return row ? rowCells(row)[0] : null;
}

/**
 * @param {Y.XmlElement} table
 */
function blockName(table) {
  return parseBlockHeader(plainText(headerCell(table))).name.trim().toLowerCase().replace(/\s+/g, '-');
}

/**
 * @param {Y.XmlElement} table
 */
function isMetadataBlock(table) {
  return blockName(table) === 'metadata';
}

/**
 * @param {Y.XmlElement} table
 */
function isSectionMetadataBlock(table) {
  return blockName(table) === 'section-metadata';
}

/**
 * Table around the editor caret, or the table the caret is sitting on.
 * Includes the Metadata block.
 * @param {{ type: Y.AbstractType, index: number } | null} abs
 */
function tableFromPosition(abs) {
  if (!abs?.type) return null;
  const surrounding = ancestorTable(abs.type);
  if (surrounding) return surrounding;
  if (typeof abs.type.get !== 'function') return null;
  return ancestorTable(abs.type.get(abs.index));
}

/**
 * @param {Y.XmlFragment} fragment
 * @param {Y.XmlElement | null} table
 */
function isInDocument(fragment, table) {
  let current = table || null;
  while (current) {
    if (current === fragment) return true;
    current = current.parent || null;
  }
  return false;
}

/**
 * @param {Y.XmlElement} table
 */
function blockLabel(table) {
  return plainText(headerCell(table)).trim();
}

/**
 * Style-sheet variant currently written on the block, if any.
 * @param {Y.XmlElement} table
 * @param {string[]} styleNames
 */
function blockStyle(table, styleNames) {
  const known = new Set(styleNames.map((entry) => entry.trim().toLowerCase()).filter(Boolean));
  const { variants } = parseBlockHeader(plainText(headerCell(table)));
  return variants.find((variant) => known.has(variant.toLowerCase())) || '';
}

/**
 * Keep authored variants. Swap any previous style-sheet variant for the one just chosen.
 * An empty styleName removes style variants and leaves the others.
 * @param {Y.XmlElement} table
 * @param {string} styleName
 * @param {string[]} styleNames
 */
function writeBlockVariant(table, styleName, styleNames) {
  const cell = headerCell(table);
  if (!cell) return;
  const current = plainText(cell).trim();
  const { name, variants } = parseBlockHeader(current);
  if (!name) return;

  const known = new Set(styleNames.map((entry) => entry.trim().toLowerCase()).filter(Boolean));
  const next = variants.filter((variant) => !known.has(variant.toLowerCase()));
  if (styleName && !next.some((variant) => variant.toLowerCase() === styleName.toLowerCase())) {
    next.push(styleName);
  }

  const formatted = formatBlockHeader(name, next);
  if (formatted !== current) setCellText(cell, formatted);
}

/**
 * Joins the open document's collab session and reads or updates Metadata → Theme.
 * @param {{ token?: string, context: { org?: string, repo?: string, site?: string, path?: string }, actions?: { daFetch: Function } }} options
 */
export async function openCollabTheme({ token, context, actions }) {
  const site = context.repo || context.site;
  const hlx6 = await probeHlx6(actions, context.org, site);
  const room = collabRoom(context, hlx6);
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(COLLAB_ORIGIN, room, ydoc, {
    connect: true,
    protocols: token ? ['yjs', token] : ['yjs'],
  });
  provider.maxBackoffTime = 30000;

  try {
    await waitForSync(provider);
  } catch (error) {
    provider.destroy?.();
    ydoc.destroy();
    throw error;
  }

  const { awareness } = provider;
  /** @type {Map<number, { cursor: { anchor: object, head?: object }, clearedAt: number }>} */
  const cursors = new Map();

  const syncCursors = () => {
    const seen = new Set();
    awareness.getStates().forEach((state, clientId) => {
      if (clientId === awareness.clientID) return;
      seen.add(clientId);
      const cursor = state?.cursor?.anchor ? state.cursor : null;
      const prev = cursors.get(clientId);
      if (cursor) cursors.set(clientId, { cursor, clearedAt: 0 });
      else if (prev?.cursor && !prev.clearedAt) {
        cursors.set(clientId, { cursor: prev.cursor, clearedAt: Date.now() });
      }
    });
    cursors.forEach((prev, clientId) => {
      if (seen.has(clientId) || !prev.cursor || prev.clearedAt) return;
      cursors.set(clientId, { cursor: prev.cursor, clearedAt: Date.now() });
    });
  };

  const editorCursor = () => {
    const now = Date.now();
    /** @type {{ cursor: { anchor: object }, clearedAt: number } | null} */
    let justCleared = null;
    /** @type {{ cursor: { anchor: object }, clearedAt: number } | null} */
    let live = null;
    cursors.forEach((entry) => {
      if (!entry.cursor) return;
      if (!entry.clearedAt) live = entry;
      else if (now - entry.clearedAt < 2000 && (!justCleared || entry.clearedAt > justCleared.clearedAt)) {
        justCleared = entry;
      }
    });
    return (justCleared || live)?.cursor || null;
  };

  const fragment = ydoc.getXmlFragment('prosemirror');
  /** @type {Y.XmlElement | null} */
  let remembered = null;
  /** @type {() => void} */
  let onRemembered = () => {};

  const blockFromCursor = (cursor) => {
    if (!cursor?.anchor) return null;
    try {
      const relative = Y.createRelativePositionFromJSON(cursor.anchor);
      const absolute = Y.createAbsolutePositionFromRelativePosition(relative, ydoc);
      return tableFromPosition(absolute);
    } catch {
      return null;
    }
  };

  const noteSelection = () => {
    const live = blockFromCursor(editorCursor());
    if (!live || live === remembered) return;
    remembered = live;
    onRemembered();
  };

  const syncAndNote = () => {
    syncCursors();
    noteSelection();
  };
  awareness.on('change', syncAndNote);
  syncAndNote();

  const targetBlock = () => {
    const live = blockFromCursor(editorCursor());
    if (live) {
      if (live !== remembered) {
        remembered = live;
        onRemembered();
      }
      return live;
    }
    if (isInDocument(fragment, remembered)) return remembered;
    if (remembered) {
      remembered = null;
      onRemembered();
    }
    return null;
  };

  return {
    getTheme() {
      return readTheme(ydoc);
    },
    /**
     * The block styles will be applied to. A live selection replaces the
     * remembered one. After the editor blurs, the remembered block is kept.
     * @param {string[]} styleNames
     * @returns {{ kind: 'theme' | 'section' | 'block', label: string, style: string } | null}
     */
    targetState(styleNames) {
      const table = targetBlock();
      if (!table) return null;
      if (isMetadataBlock(table)) {
        return { kind: 'theme', label: 'Metadata', style: readTheme(ydoc) };
      }
      if (isSectionMetadataBlock(table)) {
        return { kind: 'section', label: 'Section metadata', style: readProperty(table, 'Style') };
      }
      return { kind: 'block', label: blockLabel(table), style: blockStyle(table, styleNames) };
    },
    /**
     * @param {() => void} callback
     */
    watchSelection(callback) {
      onRemembered = callback;
      noteSelection();
    },
    /**
     * Metadata updates the page Theme. Section metadata updates that block's Style
     * property. Any other block gets the style as a variant.
     * @param {string} styleName
     * @param {string[]} styleNames
     * @returns {{ kind: 'theme' | 'section' | 'block', label: string } | null}
     */
    applyStyle(styleName, styleNames) {
      const table = targetBlock();
      if (!table) return null;
      if (isMetadataBlock(table)) {
        ydoc.transact(() => ensurePropertyRow(table, 'Theme', styleName));
        return { kind: 'theme', label: 'Metadata' };
      }
      if (isSectionMetadataBlock(table)) {
        ydoc.transact(() => ensurePropertyRow(table, 'Style', styleName));
        return { kind: 'section', label: 'Section metadata' };
      }
      ydoc.transact(() => writeBlockVariant(table, styleName, styleNames));
      return { kind: 'block', label: blockLabel(table) };
    },
  };
}
