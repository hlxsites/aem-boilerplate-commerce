# Style Picker

Experience Workspace (EW) / Document Authoring (DA) library plugin that lets authors preview a style live in the page canvas, save it on the page, and add or edit styles.

Styles are rows in a sheet at `/config/styles`. The first column is the style name, every other column is a design token:

| style  | background | foreground | accent  | shape-border-radius-3 |
| ------ | ---------- | ---------- | ------- | --------------------- |
| ocean  | #0b3c5d    | #ffffff    | #f9a620 | 4px                   |
| forest | #1f3d2b    | #f2f2f2    | #9bd770 |                       |

A style is applied as a class on the element it is assigned to:

- **Page** – the `Theme` property in the page Metadata block (applied to `<body>` by `decorateTemplateAndTheme` in `scripts/aem.js`).
- **Section** – the `Style` property in Section Metadata.
- **Block** – the style name as a block variant, e.g. `Cards (forest)`.

Token columns become CSS custom properties on that class:

| Column       | CSS variable          | Effect in the boilerplate                                                    |
| ------------ | --------------------- | ---------------------------------------------------------------------------- |
| `background` | `--background-color`  | Page background. On a section or block with the style, that element is painted with it |
| `foreground` | `--foreground-color`  | Page text color. On a section or block with the style, that element's text color |
| `accent`     | `--accent-color`      | Links and buttons (`--color-brand-500/600/700`, `--link-color`), including drop-ins |
| any other    | `--<column>`          | Available to your CSS. Non-color values are also set as `data-<column>`.     |

### Drop-ins

Drop-in roots (`.dropin-design`) re-declare the design tokens on themselves, so a value set on the page, section or block does not reach them by inheritance. The picker therefore also sets these tokens on the drop-ins inside the styled element:

- the accent (`--color-brand-500/600/700`), which drives drop-in buttons and links;
- any column named after a drop-in token scale: `color-*`, `shape-*`, `spacing-*`, `type-*`, `grid-*`, `shadow-*` (for example a column `shape-border-radius-3`).

These are the tokens the `commerce-login` drop-in reads, so you know which columns to add:

| Column                  | Effect in the login drop-in                                        |
| ----------------------- | ------------------------------------------------------------------ |
| `accent`                | Primary button, links, password eye icon                           |
| `color-neutral-50`      | Card background                                                    |
| `color-neutral-600`     | Input borders                                                      |
| `color-neutral-700`     | Input labels                                                       |
| `color-neutral-800`     | Heading and typed text                                             |
| `shape-border-radius-3` | Primary button corners (default `24px`). `-2` is the card (`8px`), `-1` the inputs (`3px`) |

The example above sets `shape-border-radius-3` to `4px` for `ocean`, which squares the Sign in button; `forest` leaves it empty and keeps the default. A column accepts a color, `var(--token)` or a simple value such as `4px` or `60-40`. Decimals such as `0.8rem` are not accepted.

Neutral tokens are shared by all drop-ins, so a style that sets them also restyles the other drop-ins it contains. Check the drop-ins you use before adding them to a style.

Background, foreground and every other column do not reach drop-ins.

When styles are nested, the nearest one wins for each token it sets: block over section over page, regardless of the row order in the sheet. A style only overrides the tokens it has a value for.

Tokens a style leaves empty come from the style above it. A drop-in block styled `sand` on a `forest` page therefore gets Sand's accent but Forest's `color-neutral-*` values, which can mix colors and lose contrast. Give every style you use on drop-ins a value for each `color-neutral-*` column (or for none of them).

### Example: reading a token in a block

A style class sets the variables on its element, so every block inside inherits them. `blocks/cards/cards.css` shows the pattern with one line: the card border reads `--accent-color` and falls back to the previous value, so nothing changes when no style is applied.

```css
border: var(--shape-border-width-1) solid var(--accent-color, var(--color-neutral-500));
```

Use the same approach in your own blocks. For a non-color column such as `layout-split`, the value is also set as a `data-layout-split` attribute on the block, its section or the page, so you can select on it (`[data-layout-split='40-60'] .columns { … }`).

## What this adds

| Path                          | Purpose                                                                  |
| ----------------------------- | ------------------------------------------------------------------------ |
| `tools/style-switcher/`       | The plugin UI (`style-switcher.html`, `.js`, `.css`, color picker, collab/sheet helpers) |
| `scripts/design-tokens.js`    | Loads `/config/styles.json` and turns each row into a CSS class         |
| `scripts/style-switcher.js`   | Channel between the plugin and the EW canvas for live preview           |
| `scripts/scripts.js`          | Loads tokens before decoration and starts the canvas listener in EW     |
| `.eslintignore`               | Excludes `tools/style-switcher` from lint, like `tools/pdp-metadata`     |
| `blocks/cards`                | Example block that reads `--accent-color` (see above)                    |

`/config/styles.json` is requested on every page load. If your site has no `/config/styles` sheet, the request returns a 404 and the page renders unstyled by the picker.

## Install from the PR branch

Run these in the root of your own storefront repository (a fork or clone of this boilerplate). Replace `feat/style-picker` if the branch was renamed.

1. Add this repository as a remote and fetch the branch:

   ```bash
   git remote add boilerplate https://github.com/hlxsites/aem-boilerplate-commerce.git
   git fetch boilerplate main feat/style-picker
   ```

2. Copy the plugin and its shared scripts:

   ```bash
   git checkout boilerplate/feat/style-picker -- tools/style-switcher scripts/design-tokens.js scripts/style-switcher.js
   ```

3. Apply the changes to your existing `scripts/scripts.js` (and lint ignore):

   ```bash
   git diff boilerplate/main...boilerplate/feat/style-picker -- scripts/scripts.js .eslintignore | git apply --3way
   ```

   If you have customized those files and the patch conflicts, resolve the conflict markers, or make the changes by hand:

   - `scripts/scripts.js`: import `applyDesignTokenDataAttributes`, `applyDesignTokenStyle` and `loadDesignTokens` from `./design-tokens.js`; call `applyDesignTokenDataAttributes(main)` in `decorateMain`; in `loadEager`, right after `decorateTemplateAndTheme()`, `await loadDesignTokens()` and, unless `window.daStyleSwitcherLive` is set, apply the page `Theme` metadata with `applyDesignTokenStyle(document.body, theme)`; import `./style-switcher.js` and call `initCanvasStyleSwitcher()` when `window.self !== window.top`, before `loadPage()`.
   - `.eslintignore`: add `tools/style-switcher` (optional, only if your lint rules reject the plugin code).

   The example block is optional. To include it, add `blocks/cards` to the paths in the `git diff` command above.

4. Commit and push to your branch, e.g. `git push origin style-picker`.

5. Create the styles sheet. In DA/EW create a sheet at `/config/styles` with the columns above, then preview and publish it. The plugin can also create and edit it in manage mode and previews the change on save.

6. Register the plugin. Open your site config (`https://da.live/config#/{org}/{site}/`), add a row to the `library` tab (create the tab with a `ref` header if missing), and save:

   | title        | path                                                                                  | ref            |
   | ------------ | ------------------------------------------------------------------------------------- | -------------- |
   | Style Picker | `https://style-picker--{site}--{org}.aem.page/tools/style-switcher/style-switcher.html` | `style-picker` |

   Use your branch name for both the host prefix and `ref`.

7. Test it. Open a page in EW with the branch ref: `https://da.live/edit?ref=style-picker#/{org}/{site}/{path}`, open **Library**, select **Style Picker**, then pick a style.

   For local development, use `http://localhost:3000/tools/style-switcher/style-switcher.html` with `ref` set to `local`, run `aem up`, and open `https://da.live/edit?ref=local#/{org}/{site}/{path}`.

When the change is merged to `main`, change the `path` to `/tools/style-switcher/style-switcher.html` (or your production host) and clear `ref`.

## Notes

- The plugin needs write access to the site's `/config/styles` sheet to add or edit styles.
- The plugin imports the DA SDK and collaboration library from `https://da.live`, so it only runs inside EW/DA. It is excluded from ESLint like the other standalone tools.
- Style names are lowercased and hyphenated (`Ocean Blue` becomes `.ocean-blue`).
