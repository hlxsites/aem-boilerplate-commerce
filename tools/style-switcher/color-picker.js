/**
 * @param {string | null | undefined} value
 */
export function sanitizeHexColor(value) {
  if (typeof value !== 'string') return null;
  const color = value.trim();
  if (!color) return null;
  if (/^#[0-9a-f]{3}$/i.test(color)) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`.toLowerCase();
  }
  if (/^#[0-9a-f]{6}$/i.test(color)) return color.toLowerCase();
  return null;
}

/**
 * @param {string} hex
 */
export function getContrastColor(hex) {
  const color = sanitizeHexColor(hex);
  if (!color) return '#18181b';
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#000000' : '#ffffff';
}

/**
 * @param {string} hex
 */
function hexToRgb(hex) {
  const color = sanitizeHexColor(hex) || '#000000';
  return {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  };
}

/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 */
function rgbToHex(r, g, b) {
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')}`;
}

/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 */
function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6;
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      default:
        h = (rn - gn) / delta + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h, s: s * 100, l: l * 100 };
}

/**
 * @param {number} h
 * @param {number} s
 * @param {number} l
 */
function hslToRgb(h, s, l) {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;

  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];

  return {
    r: (rp + m) * 255,
    g: (gp + m) * 255,
    b: (bp + m) * 255,
  };
}

/**
 * @param {string} hex
 */
function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
}

/**
 * @param {number} h
 * @param {number} s
 * @param {number} l
 */
function hslToHex(h, s, l) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

export class ColorPicker {
  constructor() {
    this.h = 0;
    this.s = 100;
    this.l = 50;
    this.onChange = null;
    this.anchor = null;
    this.isOpen = false;
    this.dragTarget = null;

    this.el = document.createElement('div');
    this.el.className = 'color-picker-popup';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="picker-header">
        <span class="picker-title" data-picker-title></span>
        <button type="button" class="picker-close" data-picker-close aria-label="Close color picker">×</button>
      </div>
      <div class="picker-surface" data-picker-surface>
        <div class="picker-cursor" data-picker-cursor></div>
      </div>
      <div class="picker-hue" data-picker-hue>
        <div class="picker-hue-cursor" data-picker-hue-cursor></div>
      </div>
      <div class="picker-footer">
        <button type="button" class="picker-eyedropper" data-picker-eyedropper aria-label="Pick color from screen" title="Eyedropper">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.5 3.5a4.12 4.12 0 0 0-5.83 0L3.8 11.37a2.5 2.5 0 0 0 0 3.54l1.29 1.29a2.5 2.5 0 0 0 3.54 0l7.87-7.87a4.12 4.12 0 0 0 0-5.83ZM6.63 14.74 5.34 13.45a.5.5 0 0 1 0-.71l7.87-7.87a2.12 2.12 0 0 1 3 3l-7.87 7.87a.5.5 0 0 1-.71 0Z" />
            <path d="M14.5 6.5 17.5 9.5 10.5 16.5 7.5 13.5Z" />
            <path d="M3 20.5h7" />
          </svg>
        </button>
        <div class="picker-preview" data-picker-preview></div>
        <label class="picker-hex-field">
          <span class="picker-hex-prefix">#</span>
          <input type="text" class="picker-hex-input" data-picker-hex maxlength="6" spellcheck="false" autocomplete="off" />
        </label>
        <input type="color" class="picker-native-input" data-picker-native tabindex="-1" aria-hidden="true" />
      </div>
    `;

    this.title = this.el.querySelector('[data-picker-title]');
    this.surface = this.el.querySelector('[data-picker-surface]');
    this.surfaceCursor = this.el.querySelector('[data-picker-cursor]');
    this.hue = this.el.querySelector('[data-picker-hue]');
    this.hueCursor = this.el.querySelector('[data-picker-hue-cursor]');
    this.preview = this.el.querySelector('[data-picker-preview]');
    this.hexInput = this.el.querySelector('[data-picker-hex]');
    this.eyedropperBtn = this.el.querySelector('[data-picker-eyedropper]');
    this.nativeInput = this.el.querySelector('[data-picker-native]');
    this.supportsEyeDropper = 'EyeDropper' in window;

    this.el.querySelector('[data-picker-close]').addEventListener('click', () => this.close());
    this.eyedropperBtn.addEventListener('click', () => this.pickFromScreen());
    this.nativeInput.addEventListener('input', (event) => {
      this.setColor(/** @type {HTMLInputElement} */ (event.target).value);
    });
    this.hexInput.addEventListener('input', (event) => this.handleHexInput(event));
    this.hexInput.addEventListener('blur', (event) => this.handleHexBlur(event));
    this.hexInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.handleHexBlur(event);
        this.close();
      }
    });

    this.surface.addEventListener('pointerdown', (event) => this.startDrag(event, 'surface'));
    this.hue.addEventListener('pointerdown', (event) => this.startDrag(event, 'hue'));

    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);

    document.body.appendChild(this.el);
  }

  /**
   * @param {{ anchor: HTMLElement, value?: string, label?: string, onChange?: (hex: string) => void }} options
   */
  open({ anchor, value = '#000000', label = 'Color', onChange }) {
    this.anchor = anchor;
    this.onChange = onChange || null;
    this.setColor(sanitizeHexColor(value) || '#000000', false);

    this.title.textContent = label;
    this.nativeInput.value = sanitizeHexColor(value) || '#000000';
    this.eyedropperBtn.title = this.supportsEyeDropper
      ? 'Eyedropper'
      : 'System color picker (includes eyedropper)';
    this.el.hidden = false;
    this.isOpen = true;
    this.position();

    requestAnimationFrame(() => {
      this.hexInput.focus();
      this.hexInput.select();
    });

    document.addEventListener('pointermove', this.handlePointerMove);
    document.addEventListener('pointerup', this.handlePointerUp);
    document.addEventListener('pointercancel', this.handlePointerUp);
    document.addEventListener('keydown', this.handleKeydown);
    requestAnimationFrame(() => document.addEventListener('click', this.handleDocumentClick, true));
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.el.hidden = true;
    this.dragTarget = null;
    document.removeEventListener('pointermove', this.handlePointerMove);
    document.removeEventListener('pointerup', this.handlePointerUp);
    document.removeEventListener('pointercancel', this.handlePointerUp);
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('click', this.handleDocumentClick, true);
  }

  /**
   * @param {string} hex
   * @param {boolean} [emit=true]
   */
  setColor(hex, emit = true) {
    const color = sanitizeHexColor(hex) || '#000000';
    const { h, s, l } = hexToHsl(color);
    this.h = h;
    this.s = s;
    this.l = l;
    this.render(emit ? color : null);
  }

  render(emitHex = null) {
    const hex = emitHex || hslToHex(this.h, this.s, this.l);
    this.surface.style.backgroundColor = `hsl(${this.h} 100% 50%)`;
    this.surfaceCursor.style.left = `${this.s}%`;
    this.surfaceCursor.style.top = `${100 - this.l}%`;
    this.hueCursor.style.left = `${(this.h / 360) * 100}%`;
    this.preview.style.backgroundColor = hex;
    this.hexInput.value = hex.slice(1);
    this.hexInput.classList.remove('is-invalid');

    if (emitHex) this.onChange?.(emitHex);
  }

  position() {
    if (!this.anchor) return;
    const rect = this.anchor.getBoundingClientRect();
    const margin = 8;
    const popupRect = this.el.getBoundingClientRect();
    let top = rect.bottom + margin;
    let left = rect.left;

    if (left + popupRect.width > window.innerWidth - margin) {
      left = window.innerWidth - popupRect.width - margin;
    }
    if (left < margin) left = margin;

    if (top + popupRect.height > window.innerHeight - margin) {
      top = rect.top - popupRect.height - margin;
    }
    if (top < margin) top = margin;

    this.el.style.top = `${top}px`;
    this.el.style.left = `${left}px`;
  }

  /**
   * @param {PointerEvent} event
   * @param {'surface' | 'hue'} target
   */
  startDrag(event, target) {
    event.preventDefault();
    this.dragTarget = target;
    event.currentTarget.setPointerCapture(event.pointerId);
    this.updateFromPointer(event, target);
  }

  /**
   * @param {PointerEvent} event
   */
  handlePointerMove(event) {
    if (!this.dragTarget) return;
    this.updateFromPointer(event, this.dragTarget);
  }

  /**
   * @param {PointerEvent} event
   */
  handlePointerUp() {
    this.dragTarget = null;
  }

  /**
   * @param {PointerEvent} event
   * @param {'surface' | 'hue'} target
   */
  updateFromPointer(event, target) {
    if (target === 'hue') {
      const rect = this.hue.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      this.h = ratio * 360;
      this.render();
      return;
    }

    const rect = this.surface.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    this.s = x * 100;
    this.l = (1 - y) * 100;
    this.render();
  }

  /**
   * @param {Event} event
   */
  handleHexInput(event) {
    const input = /** @type {HTMLInputElement} */ (event.target);
    const raw = input.value.replace(/[^0-9a-f]/gi, '').slice(0, 6).toLowerCase();
    input.value = raw;

    if (raw.length === 3 || raw.length === 6) {
      const parsed = sanitizeHexColor(`#${raw}`);
      if (parsed) {
        const { h, s, l } = hexToHsl(parsed);
        this.h = h;
        this.s = s;
        this.l = l;
        this.render(parsed);
        return;
      }
    }

    input.classList.toggle('is-invalid', raw.length > 0 && raw.length !== 3 && raw.length !== 6);
  }

  /**
   * @param {Event} event
   */
  handleHexBlur(event) {
    const input = /** @type {HTMLInputElement} */ (event.target);
    const parsed = sanitizeHexColor(`#${input.value}`);
    if (parsed) {
      this.setColor(parsed);
      return;
    }
    input.value = hslToHex(this.h, this.s, this.l).slice(1);
    input.classList.remove('is-invalid');
  }

  /**
   * @param {MouseEvent} event
   */
  handleDocumentClick(event) {
    if (!this.isOpen) return;
    const target = /** @type {Node} */ (event.target);
    if (this.el.contains(target) || this.anchor?.contains(target)) return;
    this.close();
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    if (event.key === 'Escape') this.close();
  }

  async pickFromScreen() {
    if (this.supportsEyeDropper) {
      const dropper = new window.EyeDropper();
      try {
        this.el.hidden = true;
        const result = await dropper.open();
        this.el.hidden = false;
        this.setColor(result.sRGBHex);
      } catch {
        this.el.hidden = false;
      }
      return;
    }

    this.nativeInput.value = hslToHex(this.h, this.s, this.l);
    this.nativeInput.showPicker?.() || this.nativeInput.click();
  }
}
