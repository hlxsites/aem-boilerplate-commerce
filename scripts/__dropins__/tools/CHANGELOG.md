# @adobe-commerce/elsie

## 2.0.0

### Major Changes

- ea02d5f: Upgrade Jest to 30.4.2 and Storybook to 10.4.0

  Updated testing and component development tools to latest stable versions. Jest 30.4.2 provides enhanced snapshot handling and improved test performance. Storybook 10.4.0 includes updated addon ecosystem, improved Preact Vite integration, and enhanced accessibility features with addon-a11y and addon-coverage support.

- 9cd299b: Upgrade TypeScript to 6.0 and ESLint to 9 (flat config)

  ## What changed

  ### TypeScript 4.7 → 6.0

  - `tsconfig-base.json` updated with correct TS 6 defaults. Two new-default opt-outs are deferred as tech debt: `exactOptionalPropertyTypes` and `verbatimModuleSyntax`.
  - `moduleResolution` changed from `"nodenext"` to `"bundler"` across all packages — the correct pairing for `module: "esnext"` in a Vite monorepo. Only `packages/elsie` keeps `"NodeNext"` (paired with `module: "NodeNext"` for its dual CJS/ESM output).
  - `baseUrl` removed from all tsconfigs (deprecated in TS 6; `paths` resolves relative to the tsconfig file directly).
  - `rootDir` added explicitly to `build-tools`, `event-bus`, `fetch-graphql`, and `recaptcha` tsconfigs (implicit `rootDir` deprecated in TS 6).
  - `types: []` set in `tsconfig-base.json` to prevent ambient test types from leaking into declaration output. Each package's own `tsconfig.json` declares its `types` explicitly (`jest`, `node`, `vite/client`, etc.).
  - `babel-plugin-tsconfig-paths` removed — it was a no-op in every package that listed it.
  - `noUncheckedIndexedAccess` enabled — violations were few enough to fix in source.

  ### ESLint 8 → 9 (flat config)

  - `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` (v5) removed; replaced by the unified `typescript-eslint` v8 package.
  - `eslint-config-preact` bumped to `^2.0.0` (ESLint 9 support).
  - `eslint-config-prettier` bumped to `^10.0.0`.
  - `eslint-plugin-mdx` bumped to `^3.8.1`. **ESLint 10 is not supported** — `eslint-plugin-mdx` vendors an internal ESLint API removed in v10; ESLint 9 is pinned until a fix is released.
  - `globals` added (`^15.0.0`) for `languageOptions.globals` in flat config.
  - Shared config (`packages/elsie/config/eslint.mjs`) rewritten as a flat-config array export.
  - Per-package `.eslintrc.js` files deleted; replaced with `eslint.config.js` (ESM flat config).
  - Several `typescript-eslint` v8 rules disabled to preserve prior behavior: `no-explicit-any`, `ban-ts-comment`, `no-unused-expressions`, `no-unsafe-function-type`, `no-require-imports`, `no-empty-object-type`. Tracked as tech debt.
  - `reportUnusedDisableDirectives` disabled to avoid sweeping pre-existing inline disable comments.

  ### `vite-plugin-dts` removed; replaced with custom `dtsPlugin`

  `vite-plugin-dts@3.9.1` declared a `typescript <5.0` peer range and its v5 successor was incompatible with this monorepo's layout (cross-package sources, workspace symlinks, multi-`outDir`). It was removed and replaced with a thin custom Vite plugin at `packages/elsie/config/plugins/dts.mjs` (`dtsPlugin`) that runs `tsc` directly. The resulting `dist/` layout is identical to what v3.9 produced (147 `.d.ts` files, 12 top-level entry shims).

  ### Module format standardization

  All tooling config files now follow a consistent format:

  - **ESLint / Jest / Vite configs** — ESM (`.js` in `"type":"module"` packages; `.mjs` in elsie).
  - **Prettier** — JSON only (`@adobe-commerce/elsie/config/prettier.json` referenced via each package's `"prettier"` key). `prettier.config.*` files deleted from all packages.
  - **elsie CLI** (`bin/**`) — intentionally stays CommonJS.

  See `architecture/decisions/009-module-format.md` for the full convention.

  ### `.elsie.js` → `.elsie.cjs`

  The consumer project config file is renamed from `.elsie.js` to `.elsie.cjs`. With `"type":"module"` now required in consumer packages, a plain `.js` file is treated as ES module — making `module.exports` a SyntaxError and making `require()` in the elsie CLI fail with `ERR_REQUIRE_ESM`. The `.cjs` extension forces CommonJS regardless of the package's `"type"` field.

  - `elsie generate config` now writes `.elsie.cjs`.
  - The CLI (`bin/lib/config.js`) and `config/vite.mjs` both prefer `.elsie.cjs` and fall back to `.elsie.js` for packages not yet migrated.
  - `.elsie.cjs` added to `.npmignore` in all consumer packages.

  ## Consumer migration

  See `docs/elsie-v2-migration.md` for the full step-by-step guide. Key actions:

  1. Add `"type": "module"` to `package.json`.
  2. Replace `.eslintrc.js` with `eslint.config.js` (ESM flat config importing from `@adobe-commerce/elsie/config/eslint.mjs`).
  3. Rename `.elsie.js` → `.elsie.cjs` (keep `module.exports` content as-is).
  4. Add `"prettier": "@adobe-commerce/elsie/config/prettier.json"` to `package.json`; delete `prettier.config.js`.
  5. Update `tsconfig.json`: remove `baseUrl`, add explicit `rootDir` and `types`.
  6. Add `tsconfig.build.json` for declaration emit (required by `dtsPlugin`).
  7. Convert `.elsie.js` imports in `.storybook/main.js` and `storybook-stories.js` to reference `.elsie.cjs`.

### Minor Changes

- c21a378: Add optional `cypress` export to shared ESLint config

  `cypress` is a new named export from `@adobe-commerce/elsie/config/eslint.mjs` that provides a pre-configured ESLint flat config for Cypress test files (`cypress/**/*.js`). It applies `eslint-plugin-cypress`'s recommended rules with `jest/expect-expect` turned off.

  The plugin is declared as an optional peer dependency — `cypress` resolves to an empty array when `eslint-plugin-cypress` is not installed, so projects that don't use Cypress are unaffected.

  ## Usage

  Install the peer dependency in your project:

  ```sh
  yarn add -D eslint-plugin-cypress
  ```

  Then spread `cypress` into your ESLint config:

  ```js
  import base, {
    sourceImportRestrictions,
    cypress,
  } from '@adobe-commerce/elsie/config/eslint.mjs';

  export default [...base, ...cypress, ...sourceImportRestrictions];
  ```

- 9d558ed: Adds `window.DROPINS.showOverlays(state)` — a developer utility that visually outlines all dropin containers and slots on the page with labeled overlays, making it easier to understand how the storefront is composed at runtime.

  `DROPINS.showSlots()` is deprecated in favor of `showOverlays()` and will log a console warning when called.

- c25a5d7: feat(elsie): add `changeset` builder command

  Adds `elsie changeset` as a first-class CLI command, wrapping `@changesets/cli`. All subcommands pass through transparently (`status`, `version`, `publish`, `--snapshot`, etc.). `@changesets/cli` is now a dependency of elsie, so consumers no longer need to install it separately.

- 005edc7: Adds validation to the Incrementer component when the field is changed to "empty".

### Patch Changes

- bf352d2: Fix InputDate showing wrong format after selecting a date from the calendar
- 4c3d82d: fix(field): associate error messages with inputs via aria-describedby (WCAG 3.3.1)
- 36354d9: Add disableWhenSingle prop to Picker; defaults to true (preserves existing behavior). Pass false to keep the picker interactive when only one option is available.
- 09c2100: Declare `preact` as a runtime dependency. It previously sat in `devDependencies` (unlike `@preact/signals` and `preact-i18n`), so standalone consumers of `@adobe-commerce/elsie` had an unmet `preact` — also the unmet peer of `@preact/preset-vite`, `@storybook/preact-vite` and `@testing-library/preact`. It now resolves to the same `~10.22.1` bundled into `@dropins/tools`. The emitted bundle is unchanged.
- 4641ab0: Fix `Field` and `InLineAlert` status/error messages not being announced by screen readers. `Field`'s description/hint element now always carries `role="status"` and `aria-live="polite"`, instead of only adding `aria-live` once an error appeared, so assistive technology reliably announces validation and success messages (WCAG 4.1.3). `InLineAlert` now sets `role="alert"`/`aria-live="assertive"` for `type="error"` and `role="status"`/`aria-live="polite"` for `success`/`warning`, since it previously had no live-region semantics at all.
- ccada8c: Reset default margin on Header and CartItem titles to support rendering them as semantic headings
- cb6eb81: Fix `InLineAlert` additional-action buttons announcing the same accessible name across multiple alerts. Each entry in `additionalActions` may now include an optional `'aria-label'` that is applied to the rendered button (falling back to `label` when omitted), so consumers can give visually identical "Undo"/"Dismiss" style buttons unique, descriptive names for assistive technology.
- ab5cf32: Fix `Modal` accessibility: the dialog now exposes `role="dialog"`, `aria-modal="true"`, and an `aria-labelledby` linked to its title. Focus moves into the modal when it opens (falling back to the dialog body when there are no focusable elements), Tab/Shift+Tab now cycles between the first and last focusable elements instead of escaping the modal, and focus returns to the previously focused element when the modal closes.
- 58da630: Fix `Picker` accessible name and label association. The `<select>` now falls back to `floatingLabel` or `placeholder` for its `aria-label` when no `name` is provided, and the floating `<label>` is now correctly associated with the rendered `<select>` via its generated id instead of the raw `id` prop.
- 450c408: fix(Picker): auto-select and emit the sole option when the control auto-disables, so single-option narrowing on configurable PDPs no longer leaves the value unselected and Add to Cart permanently disabled
- 33ebe8a: Add accessible labels to password validation and input status icons (WCAG 1.1.1)
- 2ad7316: Fix `ToggleButton`'s underlying radio input announcing the shared radio-group `name` (e.g. "payment-method") as its accessible name for every option instead of the option's own visible label, which violates WCAG 2.4.6 (Headings and Labels) and 2.5.3 (Label in Name). The radio input's accessible name now defaults to `aria-labelledby` pointing at the option's own visible label content (e.g. "Check / Money order"), which works correctly whether `label` is a string or a `VNode`. An optional `ariaLabel` prop is still available for consumers who need to set an explicit accessible name via `aria-label` instead.
- 256007e: Fix ToggleButton generating invalid HTML ids when value prop contains spaces, breaking aria-labelledby label association
- 016a558: Fix low-contrast field label text in `Input` when a field is in an error state. The floating label color now meets WCAG AA contrast requirements for normal-size text against light backgrounds, matching the color already used for error text elsewhere (helper text, alerts).
- 51fcb35: fix(a11y): darken low-contrast focus indicators to meet WCAG 1.4.11 (3:1 non-text contrast)

  The default keyboard focus indicator across Button, IconButton, Checkbox, RadioButton, ActionButton, ActionButtonGroup, ToggleButton, TextSwatch, ColorSwatch, ImageSwatch, and links used `--color-neutral-400` (#d6d6d6, ~1.45:1 against white), below the 3:1 minimum required by WCAG 1.4.11. These focus indicators now use `--color-neutral-600` (#8f8f8f, ~3.2:1), so keyboard users can reliably see which control is focused.

## 2.0.0-beta.1

### Patch Changes

- 256007e: Fix ToggleButton generating invalid HTML ids when value prop contains spaces, breaking aria-labelledby label association

## 2.0.0-beta.0

### Major Changes

- ea02d5f: Upgrade Jest to 30.4.2 and Storybook to 10.4.0

  Updated testing and component development tools to latest stable versions. Jest 30.4.2 provides enhanced snapshot handling and improved test performance. Storybook 10.4.0 includes updated addon ecosystem, improved Preact Vite integration, and enhanced accessibility features with addon-a11y and addon-coverage support.

- 9cd299b: Upgrade TypeScript to 6.0 and ESLint to 9 (flat config)

  ## What changed

  ### TypeScript 4.7 → 6.0

  - `tsconfig-base.json` updated with correct TS 6 defaults. Two new-default opt-outs are deferred as tech debt: `exactOptionalPropertyTypes` and `verbatimModuleSyntax`.
  - `moduleResolution` changed from `"nodenext"` to `"bundler"` across all packages — the correct pairing for `module: "esnext"` in a Vite monorepo. Only `packages/elsie` keeps `"NodeNext"` (paired with `module: "NodeNext"` for its dual CJS/ESM output).
  - `baseUrl` removed from all tsconfigs (deprecated in TS 6; `paths` resolves relative to the tsconfig file directly).
  - `rootDir` added explicitly to `build-tools`, `event-bus`, `fetch-graphql`, and `recaptcha` tsconfigs (implicit `rootDir` deprecated in TS 6).
  - `types: []` set in `tsconfig-base.json` to prevent ambient test types from leaking into declaration output. Each package's own `tsconfig.json` declares its `types` explicitly (`jest`, `node`, `vite/client`, etc.).
  - `babel-plugin-tsconfig-paths` removed — it was a no-op in every package that listed it.
  - `noUncheckedIndexedAccess` enabled — violations were few enough to fix in source.

  ### ESLint 8 → 9 (flat config)

  - `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` (v5) removed; replaced by the unified `typescript-eslint` v8 package.
  - `eslint-config-preact` bumped to `^2.0.0` (ESLint 9 support).
  - `eslint-config-prettier` bumped to `^10.0.0`.
  - `eslint-plugin-mdx` bumped to `^3.8.1`. **ESLint 10 is not supported** — `eslint-plugin-mdx` vendors an internal ESLint API removed in v10; ESLint 9 is pinned until a fix is released.
  - `globals` added (`^15.0.0`) for `languageOptions.globals` in flat config.
  - Shared config (`packages/elsie/config/eslint.mjs`) rewritten as a flat-config array export.
  - Per-package `.eslintrc.js` files deleted; replaced with `eslint.config.js` (ESM flat config).
  - Several `typescript-eslint` v8 rules disabled to preserve prior behavior: `no-explicit-any`, `ban-ts-comment`, `no-unused-expressions`, `no-unsafe-function-type`, `no-require-imports`, `no-empty-object-type`. Tracked as tech debt.
  - `reportUnusedDisableDirectives` disabled to avoid sweeping pre-existing inline disable comments.

  ### `vite-plugin-dts` removed; replaced with custom `dtsPlugin`

  `vite-plugin-dts@3.9.1` declared a `typescript <5.0` peer range and its v5 successor was incompatible with this monorepo's layout (cross-package sources, workspace symlinks, multi-`outDir`). It was removed and replaced with a thin custom Vite plugin at `packages/elsie/config/plugins/dts.mjs` (`dtsPlugin`) that runs `tsc` directly. The resulting `dist/` layout is identical to what v3.9 produced (147 `.d.ts` files, 12 top-level entry shims).

  ### Module format standardization

  All tooling config files now follow a consistent format:

  - **ESLint / Jest / Vite configs** — ESM (`.js` in `"type":"module"` packages; `.mjs` in elsie).
  - **Prettier** — JSON only (`@adobe-commerce/elsie/config/prettier.json` referenced via each package's `"prettier"` key). `prettier.config.*` files deleted from all packages.
  - **elsie CLI** (`bin/**`) — intentionally stays CommonJS.

  See `architecture/decisions/009-module-format.md` for the full convention.

  ### `.elsie.js` → `.elsie.cjs`

  The consumer project config file is renamed from `.elsie.js` to `.elsie.cjs`. With `"type":"module"` now required in consumer packages, a plain `.js` file is treated as ES module — making `module.exports` a SyntaxError and making `require()` in the elsie CLI fail with `ERR_REQUIRE_ESM`. The `.cjs` extension forces CommonJS regardless of the package's `"type"` field.

  - `elsie generate config` now writes `.elsie.cjs`.
  - The CLI (`bin/lib/config.js`) and `config/vite.mjs` both prefer `.elsie.cjs` and fall back to `.elsie.js` for packages not yet migrated.
  - `.elsie.cjs` added to `.npmignore` in all consumer packages.

  ## Consumer migration

  See `docs/elsie-v2-migration.md` for the full step-by-step guide. Key actions:

  1. Add `"type": "module"` to `package.json`.
  2. Replace `.eslintrc.js` with `eslint.config.js` (ESM flat config importing from `@adobe-commerce/elsie/config/eslint.mjs`).
  3. Rename `.elsie.js` → `.elsie.cjs` (keep `module.exports` content as-is).
  4. Add `"prettier": "@adobe-commerce/elsie/config/prettier.json"` to `package.json`; delete `prettier.config.js`.
  5. Update `tsconfig.json`: remove `baseUrl`, add explicit `rootDir` and `types`.
  6. Add `tsconfig.build.json` for declaration emit (required by `dtsPlugin`).
  7. Convert `.elsie.js` imports in `.storybook/main.js` and `storybook-stories.js` to reference `.elsie.cjs`.

### Minor Changes

- c21a378: Add optional `cypress` export to shared ESLint config

  `cypress` is a new named export from `@adobe-commerce/elsie/config/eslint.mjs` that provides a pre-configured ESLint flat config for Cypress test files (`cypress/**/*.js`). It applies `eslint-plugin-cypress`'s recommended rules with `jest/expect-expect` turned off.

  The plugin is declared as an optional peer dependency — `cypress` resolves to an empty array when `eslint-plugin-cypress` is not installed, so projects that don't use Cypress are unaffected.

  ## Usage

  Install the peer dependency in your project:

  ```sh
  yarn add -D eslint-plugin-cypress
  ```

  Then spread `cypress` into your ESLint config:

  ```js
  import base, {
    sourceImportRestrictions,
    cypress,
  } from '@adobe-commerce/elsie/config/eslint.mjs';

  export default [...base, ...cypress, ...sourceImportRestrictions];
  ```

- 9d558ed: Adds `window.DROPINS.showOverlays(state)` — a developer utility that visually outlines all dropin containers and slots on the page with labeled overlays, making it easier to understand how the storefront is composed at runtime.

  `DROPINS.showSlots()` is deprecated in favor of `showOverlays()` and will log a console warning when called.

- c25a5d7: feat(elsie): add `changeset` builder command

  Adds `elsie changeset` as a first-class CLI command, wrapping `@changesets/cli`. All subcommands pass through transparently (`status`, `version`, `publish`, `--snapshot`, etc.). `@changesets/cli` is now a dependency of elsie, so consumers no longer need to install it separately.

- 005edc7: Adds validation to the Incrementer component when the field is changed to "empty".

### Patch Changes

- bf352d2: Fix InputDate showing wrong format after selecting a date from the calendar
- 4c3d82d: fix(field): associate error messages with inputs via aria-describedby (WCAG 3.3.1)
- 36354d9: Add disableWhenSingle prop to Picker; defaults to true (preserves existing behavior). Pass false to keep the picker interactive when only one option is available.
- 09c2100: Declare `preact` as a runtime dependency. It previously sat in `devDependencies` (unlike `@preact/signals` and `preact-i18n`), so standalone consumers of `@adobe-commerce/elsie` had an unmet `preact` — also the unmet peer of `@preact/preset-vite`, `@storybook/preact-vite` and `@testing-library/preact`. It now resolves to the same `~10.22.1` bundled into `@dropins/tools`. The emitted bundle is unchanged.
- 4641ab0: Fix `Field` and `InLineAlert` status/error messages not being announced by screen readers. `Field`'s description/hint element now always carries `role="status"` and `aria-live="polite"`, instead of only adding `aria-live` once an error appeared, so assistive technology reliably announces validation and success messages (WCAG 4.1.3). `InLineAlert` now sets `role="alert"`/`aria-live="assertive"` for `type="error"` and `role="status"`/`aria-live="polite"` for `success`/`warning`, since it previously had no live-region semantics at all.
- ccada8c: Reset default margin on Header and CartItem titles to support rendering them as semantic headings
- cb6eb81: Fix `InLineAlert` additional-action buttons announcing the same accessible name across multiple alerts. Each entry in `additionalActions` may now include an optional `'aria-label'` that is applied to the rendered button (falling back to `label` when omitted), so consumers can give visually identical "Undo"/"Dismiss" style buttons unique, descriptive names for assistive technology.
- ab5cf32: Fix `Modal` accessibility: the dialog now exposes `role="dialog"`, `aria-modal="true"`, and an `aria-labelledby` linked to its title. Focus moves into the modal when it opens (falling back to the dialog body when there are no focusable elements), Tab/Shift+Tab now cycles between the first and last focusable elements instead of escaping the modal, and focus returns to the previously focused element when the modal closes.
- 58da630: Fix `Picker` accessible name and label association. The `<select>` now falls back to `floatingLabel` or `placeholder` for its `aria-label` when no `name` is provided, and the floating `<label>` is now correctly associated with the rendered `<select>` via its generated id instead of the raw `id` prop.
- 450c408: fix(Picker): auto-select and emit the sole option when the control auto-disables, so single-option narrowing on configurable PDPs no longer leaves the value unselected and Add to Cart permanently disabled
- 33ebe8a: Add accessible labels to password validation and input status icons (WCAG 1.1.1)
- 2ad7316: Fix `ToggleButton`'s underlying radio input announcing the shared radio-group `name` (e.g. "payment-method") as its accessible name for every option instead of the option's own visible label, which violates WCAG 2.4.6 (Headings and Labels) and 2.5.3 (Label in Name). The radio input's accessible name now defaults to `aria-labelledby` pointing at the option's own visible label content (e.g. "Check / Money order"), which works correctly whether `label` is a string or a `VNode`. An optional `ariaLabel` prop is still available for consumers who need to set an explicit accessible name via `aria-label` instead.
- 016a558: Fix low-contrast field label text in `Input` when a field is in an error state. The floating label color now meets WCAG AA contrast requirements for normal-size text against light backgrounds, matching the color already used for error text elsewhere (helper text, alerts).
- 51fcb35: fix(a11y): darken low-contrast focus indicators to meet WCAG 1.4.11 (3:1 non-text contrast)

  The default keyboard focus indicator across Button, IconButton, Checkbox, RadioButton, ActionButton, ActionButtonGroup, ToggleButton, TextSwatch, ColorSwatch, ImageSwatch, and links used `--color-neutral-400` (#d6d6d6, ~1.45:1 against white), below the 3:1 minimum required by WCAG 1.4.11. These focus indicators now use `--color-neutral-600` (#8f8f8f, ~3.2:1), so keyboard users can reliably see which control is focused.

## 1.9.0

### Minor Changes

- af62897: Update minimum Node.js requirement to 22 LTS

  Packages are now built with Node.js 22. `elsie` requires `>=22`; browser-only packages (`fetch-graphql`, `event-bus`, `recaptcha`, `storefront-design`, `build-tools`) do not declare an `engines` field as they do not run in Node.js.

- 62adf1c: Reduce HTTP requests on page load through three bundling optimizations. The preact runtime is isolated in its own vendor chunk so it no longer co-locates into other chunks. Dropin API and internal component modules are consolidated into `chunks/api.js` and `chunks/components.js` respectively, replacing the previous pattern of one chunk file per function or component. All SVG icons are consolidated into a single `chunks/icons.js` chunk instead of one chunk per icon.

  Drop-ins must be rebuilt against this release to get the reduced request footprint. No source changes are required.

### Patch Changes

- d2aacc7: Fix: GraphQL fragment source files are no longer incorrectly bundled into `chunks/api.js`. The `manualChunks` function now walks the full importer graph (with cycle protection) to determine whether an api-directory module is owned by the fragments barrel, so fragment files stay in the fragments output chunk even when accessed through intermediate sub-barrels.
- 5c64620: Implement a new `fragment-import-redirect` build plugin that automatically detects and redirects any dropin source file that directly imports a fragment source file (bypassing the barrel). The import is silently redirected to the fragments barrel at build time and a warning is emitted identifying the file so it can be corrected in source. This ensures fragment constants always appear as local declarations in `fragments.js` regardless of how dropin source code references them.

## 1.9.0-beta.3

### Patch Changes

- 5c64620: Implement a new `fragment-import-redirect` build plugin that automatically detects and redirects any dropin source file that directly imports a fragment source file (bypassing the barrel). The import is silently redirected to the fragments barrel at build time and a warning is emitted identifying the file so it can be corrected in source. This ensures fragment constants always appear as local declarations in `fragments.js` regardless of how dropin source code references them.

## 1.9.0-beta.2

### Patch Changes

- d2aacc7: Fix: GraphQL fragment source files are no longer incorrectly bundled into `chunks/api.js`. The `manualChunks` function now walks the full importer graph (with cycle protection) to determine whether an api-directory module is owned by the fragments barrel, so fragment files stay in the fragments output chunk even when accessed through intermediate sub-barrels. Boilerplate GraphQL overrides work correctly in all dropin barrel structures.

## 1.9.0-beta.1

### Minor Changes

- af62897: Update minimum Node.js requirement to 22 LTS

  Packages are now built with Node.js 22. `elsie` requires `>=22`; browser-only packages (`fetch-graphql`, `event-bus`, `recaptcha`, `storefront-design`, `build-tools`) do not declare an `engines` field as they do not run in Node.js.

## 1.9.0-beta.0

### Minor Changes

- 62adf1c: Reduce HTTP requests on page load through three bundling optimizations. The preact runtime is isolated in its own vendor chunk so it no longer co-locates into other chunks. Dropin API and internal component modules are consolidated into `chunks/api.js` and `chunks/components.js` respectively, replacing the previous pattern of one chunk file per function or component. All SVG icons are consolidated into a single `chunks/icons.js` chunk instead of one chunk per icon.

  Drop-ins must be rebuilt against this release to get the reduced request footprint. No source changes are required.

## 1.8.1

### Patch Changes

- e44f618: Fixed `srcset w` descriptors to use actual image widths instead of viewport breakpoints, preventing blurry product images.
- 46d57ca: Add optional `sizes` prop to the `Image` component so dropins can provide layout-aware sizing hints for more accurate srcset image source selection.

## 1.8.1-beta.0

### Patch Changes

- e44f618: Fixed `srcset w` descriptors to use actual image widths instead of viewport breakpoints, preventing blurry product images.
- 46d57ca: Add optional `sizes` prop to the `Image` component so dropins can provide layout-aware sizing hints for more accurate srcset image source selection.

## 1.8.0

### Minor Changes

- c4da094: Enhance the Vite build process to automatically generate a package.json file and include both the LICENSE and CHANGELOG files in the dist directory.

### Patch Changes

- 7792c59: Fix vite.mjs path for LICENSE.md

## 1.8.0-beta.1

### Patch Changes

- 7792c59: Fix vite.mjs path for LICENSE.md

## 1.8.0-beta.0

### Minor Changes

- c4da094: Enhance the Vite build process to automatically generate a package.json file and include both the LICENSE and CHANGELOG files in the dist directory.
