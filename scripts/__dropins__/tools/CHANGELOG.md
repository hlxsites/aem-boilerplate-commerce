# @adobe-commerce/elsie

## 3.0.0-alpha-20261007104527

### Major Changes

- 3313516: feat(elsie)!: restructure the toolchain (Elsie 3) — breaking

  The CLI, shared configs, and test-kit have been reorganized.
  `@dropins/tools`'s runtime bundle (components, build tools, and the re-exposed
  `event-bus` / `fetch-graphql`) is unaffected — these changes only impact repos
  that consume `@adobe-commerce/elsie` as their **development toolchain** (the
  drop-in package repos).

  Migration checklist for consuming repos:

  1. **Config source.** Elsie no longer reads `.elsie.cjs` / `.elsie.js`. Move
     your configuration into the `"elsie"` key of `package.json`.

  2. **`elsie types` removed.** Replace any `"type-check": "elsie types"` script
     with a direct `tsc --noEmit` (or your project's equivalent). Note the old
     command now no longer exists — audit scripts that relied on it, since a
     stale reference will fail rather than silently pass.

  3. **`config/` → `configs/` (plural) relocation.** Update references:
     - tsconfig `extends`: `@adobe-commerce/elsie/config/tsconfig-base.json` →
       `@adobe-commerce/elsie/configs/tsconfig/base.json` (and
       `tsconfig-preact.json` → `configs/tsconfig/preact.json`).
     - Prettier: `@adobe-commerce/elsie/config/prettier.json` →
       `@adobe-commerce/elsie/configs/prettier.js`.
     - Jest / ESLint / Vite: `config/jest.mjs`, `config/eslint.mjs`,
       `config/vite.mjs` → `configs/jest.js`, `configs/eslint.js`,
       `configs/vite.js`.

  4. **Test-kit import path.** `@adobe-commerce/elsie/lib/tests` →
     `@adobe-commerce/elsie/tests` (and `@adobe-commerce/elsie/tests/dom` for
     component tests). See the test-kit changeset for the full ambient-globals
     migration.

  5. **Shared tsconfig dropped ambient Jest types.** Repos extending the base
     tsconfig should import the jest API from `@adobe-commerce/elsie/tests`
     (backed by `@jest/globals`) and drop `@types/jest` / `types: ["jest"]`.

  6. **ESLint config factory replaced.** The `createConfig` /`browser`/`node`
     exports of `@adobe-commerce/elsie/configs/eslint.js` are gone. Compose your
     flat config from the building blocks instead:

     ```js
     import {
       defineConfig,
       globals,
       typescript,
       tests,
       preact,
       storybook,
     } from '@adobe-commerce/elsie/configs/eslint.js';

     // was: createConfig({ runtime: 'browser' })
     export default defineConfig(globals('browser'), typescript(), tests());
     ```

     `defineConfig(...layers)` keeps the shared base first and prettier last;
     `globals(env, files)` scopes environment globals; presets and
     `runtime: 'agnostic'` (omit `globals`) map over directly. One config can
     now scope different folders to different runtimes via each layer's `files`.

  7. **Jest config factory renamed.** `@adobe-commerce/elsie/configs/jest.js`
     now exports `defineConfig` (was `createConfig`), matching the ESLint entry.
     Update your `jest.config.js` imports accordingly; the options are
     unchanged.

  8. **`restrictions` moved under the ESLint presets, its own export subpath
     dropped.** `@adobe-commerce/elsie/configs/eslint/restrictions.js` no longer
     exists; `restrictions` is now exported from
     `@adobe-commerce/elsie/configs/eslint.js` like the other presets:

     ```js
     import {
       defineConfig,
       typescript,
       restrictions,
     } from '@adobe-commerce/elsie/configs/eslint.js';

     // was: import { restrictions } from '@adobe-commerce/elsie/configs/eslint/restrictions.js';
     export default defineConfig(typescript(), restrictions());
     ```

### Minor Changes

- 3313516: feat(elsie): add `clean` and `format` builders

  - New `elsie clean [paths...]` command (wraps rimraf, defaults to `dist`).
  - New `elsie format [paths...]` command (wraps Prettier; `--check` verifies
    instead of writing; defaults to the current directory).

  As a result, `@dropins/build-tools` drops its `rimraf` and `vite`
  devDependencies, and `@adobe-commerce/storefront-design` drops `rimraf`; both
  now use `elsie clean` for their cleanup step.

- b58cb76: Provide a shared Storybook main-config factory with the Preact/Vite
  framework and common addons resolved from Elsie. Resolve Storybook preview
  imports from Elsie's dependency tree so isolated consumers can run
  `elsie storybook` and `elsie storybook build` without installing the Storybook
  CLI themselves.
- 3313516: feat(elsie): extend `elsie storybook` with `build` and `test` modes

  `elsie storybook` only ever ran `storybook dev`; building and testing
  Storybook still meant calling `storybook build` and `test-storybook` bare,
  which resolve their binaries via the shell's inherited `PATH` — the same class
  of bug the CLI's `resolveBin()`-based dispatch (`lint`/`test`/
  `changeset`/`types`) was fixed to avoid.

  `elsie storybook [mode]` now accepts `dev` (default, unchanged), `build`
  (`elsie storybook build`), and `test` (`elsie storybook test`, resolving
  `@storybook/test-runner`'s `test-storybook` bin). All other arguments keep
  flowing through untouched, so existing invocations are unaffected.

  `packages/elsie`'s own `build:storybook`, `build:storybook:ci`,
  `test:storybook`, and `test:storybook:ci` scripts now go through this instead
  of calling `storybook build` / `test-storybook` directly.

- 3313516: feat(elsie): explicit jest imports via an
  `@adobe-commerce/elsie/tests` test-kit

  Tests now import their jest API explicitly instead of relying on ambient
  `@types/jest` globals, following Jest's recommendation for version-matched
  types (`@jest/globals` ships with jest, `@types/jest` is third-party and can
  drift):

  The test-kit is split into three tiers, each a superset of the previous, so a
  test imports exactly the machinery it needs:

  - `@adobe-commerce/elsie/tests` — the base tier. Re-exports the jest API
    surface (`jest`/`describe`/`it`/`test`/`expect` + lifecycle hooks) from
    `@jest/globals` plus the `mockResolvedFn`/`mockRejectedFn` helpers. Pulls in
    no DOM code, so it is safe to import from any package's jest config.
  - `@adobe-commerce/elsie/tests/dom` — the "pure DOM" tier. Adds jest-dom
    assertion matchers (registered against jsdom) for tests that assert on the
    DOM but render no components.
  - `@adobe-commerce/elsie/tests/preact` — the "DOM + preact" tier. Adds
    `@testing-library/preact` and `userEvent` on top of `/tests/dom`, for
    component tests (requires a jest config that resolves packages to their
    node/CJS builds, e.g. via `testEnvironmentOptions.customExportConditions`).

  The jest `defineConfig` factory mirrors these tiers with a `preset` option
  (replacing the previous `environment: 'node' | 'jsdom'`):

  - `preset: 'node'` (default) — a node environment, no DOM.
  - `preset: 'dom'` — a jsdom environment with browser-API shims, without the
    preact/compat module aliasing or asset mocks, so packages that only touch
    the DOM no longer pull in preact machinery.
  - `preset: 'preact'` — everything `dom` sets up plus the preact/compat
    aliasing and css/svg asset mocks needed to render preact components.

  Other notes:

  - `@jest/globals` and `@testing-library/user-event` are now elsie
    dependencies; the DOM tier includes jest-dom's matcher type augmentation.
  - `@types/jest` is no longer required and `types: ["jest"]` has been dropped
    from the shared tsconfig. Import `jest` from the test-kit in files that use
    its runtime API or mock types. The shared Jest config rewrites named `jest`
    imports before Babel's mock hoisting and resolves Elsie's Jest dependency.

  Consumers migrating: replace ambient jest globals with imports from
  `@adobe-commerce/elsie/tests` (`/tests/dom` for DOM-only tests,
  `/tests/preact` for component tests), pick the matching `defineConfig`
  `preset`, and drop `@types/jest`.

- 3313516: fix(elsie): declare the toolchain as real dependencies so it works
  outside this monorepo

  `elsie`'s CLI
  (`lint`/`test`/`build`/`serve`/`format`/`clean`/`changeset`/`gql`) and its
  shared configs (`configs/jest.js`, `configs/eslint.js`, `configs/vite.js`, and
  the `@adobe-commerce/elsie/tests`(`/dom`) test-kit) required packages that
  were classified as `devDependencies` — `eslint`, `jest` and its environments,
  `babel-jest` and the Babel presets it needs, `vite` and its plugins,
  `prettier`, `rimraf`, `@changesets/cli`, `@jest/globals`,
  `@testing-library/preact`/`user-event`, and others. `devDependencies` are
  never installed for anyone who depends on `@adobe-commerce/elsie` normally, so
  none of this was actually present for an external consumer's install,
  regardless of package manager or `node_modules` layout — the CLI and shared
  configs only ever worked inside this monorepo (where every workspace package's
  `devDependencies` are installed at the root), contradicting the "batteries
  included, no separate install needed" toolchain this SDK is meant to provide.

  The packages `tooling/` actually requires at runtime are now real
  `dependencies` — including `graphql-codegen-typescript-mock-data`, which the
  `elsie gql mocks` command loads as a codegen plugin and which is not reachable
  through `@graphql-codegen/cli`'s own dependency subtree. Packages elsie only
  uses to build its own `dist` bundle (the sibling SDK workspace packages,
  `@types/node`, `@chromatic-com/storybook`, etc.) remain `devDependencies`.
  `typescript` is a `peerDependency` instead — see
  `docs/toolchain-peer-dependencies.md`.

  Verified end-to-end: packed the tarball, installed it into a scratch pnpm
  project with the default (isolated, non-hoisted) `nodeLinker` and zero other
  dependencies, and confirmed `elsie test`/`elsie format` run successfully
  against it — no `nodeLinker: hoisted` workaround needed.

- 3313516: feat(elsie): make `typescript` a peer dependency; remove the `types`
  command

  `typescript` is now an optional `peerDependency` of `@adobe-commerce/elsie`
  instead of a bundled `dependency`. The `dts` Vite plugin (used by
  `elsie build` for `.d.ts` generation) resolves `typescript` from the building
  package's own install rather than elsie's, so declaration output reflects the
  exact compiler version that package's `tsconfig.json`, source, and IDE
  actually use. A package with no `typescript` devDependency of its own gets a
  clear error instead of a silently mismatched build. See
  `docs/toolchain-peer-dependencies.md` for the full rationale.

  The `elsie types` command (`tsc --noEmit` plus TS6 tsconfig validation) is
  removed — with `typescript` no longer bundled, elsie has no reason to own a
  type-checking command. A package that wants one defines its own script (e.g.
  `"types": "tsc --noEmit"`), using its own installed `typescript`.

  `build-tools`, `event-bus`, `fetch-graphql`, and `recaptcha` each gain a
  `typescript` devDependency of their own (pinned via `pnpm-workspace.yaml`'s
  `catalog.typescript`) so `.d.ts` generation and any future type-checking
  script keep working now that elsie no longer bundles it.

### Patch Changes

- e06c05f: fix(a11y): Checkbox now derives its internal label/description ids
  from the unique `id` prop when provided, instead of the (often shared) `name`
  prop, so two checkboxes with the same `name` no longer produce duplicate DOM
  ids that cause screen readers to announce the wrong checkbox's label (WCAG
  4.1.2)
- 3313516: fix(elsie): stop importing preact's private `preact/src/jsx` in
  `classes`

  `src/lib/classes.ts` imported `JSXInternal` from `preact/src/jsx`, a path
  preact does not expose through its package `exports`. Under modern module
  resolution this fails to resolve, and the specifier leaked into the published
  `@dropins/tools` declarations, breaking standalone TypeScript consumers. The
  small structural signal type is now defined locally instead.

- 59b2754: Fix dropin declaration imports that resolve through `node_modules` so
  they reference the published `@dropins/tools/lib` and
  `@dropins/tools/components` entry points instead of relative filesystem paths.
- 00d0d9b: fix(elsie): scope TypeScript ESLint parser and rules to JS/TS files

  Composing `typescript()` and `mdx()` now parses Markdown and MDX correctly in
  either order. Existing TypeScript-only core-rule overrides retain their
  narrower file scope.

- 3313516: fix(elsie): publish a deterministic package via a `files` allowlist

  The package relied on a `.npmignore` denylist that missed `storybook-static`
  (and referenced a stale `vite.config.mjs`), so a pack after a Storybook build
  shipped ~24 MB unpacked and its contents depended on which local build
  commands had run. It now uses a `package.json` `files` allowlist (`tooling`,
  `src`, and docs, minus tests/snapshots/coverage), producing a stable ~1.5 MB
  package.

- daf8d7f: fix(elsie): recognize JSX component imports in MDX linting

  The MDX ESLint preset now counts JSX component tags as usages of their
  imports, while still reporting genuinely unused imports.

- 69f5386: Fix Storybook Vite dependency-optimization warnings for pnpm
  consumers by resolving the React DOM shim to its installed file and removing a
  prebundle entry for unpublished static assets.
- 6c5b573: Remove the ambient Jest declaration from the shared tsconfigs. All
  three test tiers export runtime `jest` and its type namespace for explicit
  imports such as `import { jest } from '@adobe-commerce/elsie/tests'` and
  `jest.Mock<() => Promise<null>>`.

  The shared Jest config rewrites named Jest imports before mock hoisting and
  resolves `@jest/globals` from Elsie's own dependencies, including with pnpm's
  isolated linker. Consumers must import `jest` wherever they use its runtime
  API or mock types; no consumer-installed Jest dependency is required. Use
  jest-dom's bundled DOM matcher types instead of Elsie's redundant local
  augmentation.

  Centralize provider-backed component rendering in `/tests/preact`. Its
  `render` loads the consumer's `src/i18n/en_US.json`, supplies `UIProvider` and
  the `.dropin-design` wrapper, and supports language/definition overrides.
  Export the original Testing Library render as `renderPreact`. The legacy
  `/lib/tests` entry point now re-exports this tier so tests can migrate to a
  single public import.

- 3313516: fix(elsie): make downgraded import restrictions work for wildcard
  patterns

  `restrictions()`'s `severityOverrides` built the warning's
  `no-restricted-syntax` selector from an exact `source.value=` match, so
  downgrading a wildcard pattern (e.g. `@adobe-commerce/elsie/src/*`) matched
  nothing. Wildcard groups now emit a regex selector. All downgraded patterns
  are also emitted in a single `no-restricted-syntax` rule, so downgrading more
  than one no longer drops all but the last (flat config replaces, rather than
  merges, repeated rule entries).

- 3313516: fix(elsie): fix `transformIgnorePatterns` for pnpm's isolated-linker
  virtual store

  The shared Jest config factory (`@adobe-commerce/elsie/configs/jest.js`)
  allow-lists elsie and the other `@adobe-commerce/*` packages for
  transformation since they ship untranspiled TS/TSX source. The allow-list
  regex only matched the outer `node_modules/` segment, so under pnpm's default
  (isolated) linker — where a real dependency is nested one level deeper at
  `node_modules/.pnpm/<scope>+<name>@<version>/node_modules/<scope>/<name>/…` —
  the pattern no longer matched and those packages silently stopped being
  transformed, failing every consumer test suite with
  `SyntaxError: Cannot use import statement outside a module`.

  `transformIgnorePatterns` now includes a second pattern anchored on `.pnpm/`
  so both the flat/hoisted layout (Yarn, npm, `nodeLinker: hoisted`) and pnpm's
  isolated virtual store are handled correctly. Consumers on pnpm's default
  linker no longer need a hand-rolled `transformIgnorePatterns` override or
  `nodeLinker: hoisted` to work around this.

- 3313516: fix(elsie): stop `MultiSelect`'s screen-reader announcements from
  looping infinitely while the dropdown is open

  `preact-i18n`'s `useText()` returns a brand-new translations object on every
  render. Two of `MultiSelect`'s `useEffect`s depended on that whole object and
  each called `announce()` with a different message, so while the dropdown was
  open they kept re-triggering each other — one effect's announcement change
  caused a re-render that fired the other effect, which changed the announcement
  back, forever, synchronously. This produced an unbounded render loop that
  could exhaust the JS heap (observed as Jest OOM crashes in
  `MultiSelect.test.tsx`).

  Both effects now depend on the specific translation strings they use instead
  of the whole object, and `useAccessibilityAnnouncements` clears its pending
  timeout before scheduling a new one (and on unmount) instead of leaving it
  dangling.

- 3313516: fix(elsie): only announce `MultiSelect`'s open message on the open
  transition

  The effect that announces "Dropdown expanded. N options available" depended on
  the selection and filtered-result counts, so it re-fired on every select and
  search keystroke while the dropdown was open — overwriting the specific
  selection and search-result announcements with the generic open message. It
  now runs only on the closed-to-open transition.

- 641d4f5: fix(a11y): Picker's accessible name now prefers the human-readable
  floating label or placeholder over the raw `name` attribute, so screen readers
  announce the same text sighted users see instead of an internal field
  identifier (WCAG 2.5.3)
- 3313516: chore: migrate build tooling from Yarn to pnpm

  The monorepo now uses pnpm instead of Yarn v1. As part of this, elsie's CLI
  (`lint`/`test`/`storybook`/`changeset`/`types`) no longer shells out to bare
  command names — each tool is resolved and spawned directly, fixing a latent
  path-with-spaces bug and command-injection surface.

  `tooling/` (the CLI, and the shared
  eslint/jest/prettier/vite/storybook/tsconfig configs) is now correctly
  included when `@adobe-commerce/elsie` is published — an oversight from merging
  the tooling package back into elsie meant `.npmignore` excluded it, which
  would have shipped a package whose own `bin` and `exports` pointed at files
  that didn't exist in the tarball. This is unrelated to (and does not affect)
  the separate `@dropins/tools` bundle published from `dist/`.

- cd72618: Fix an intermittent `insertBefore` `NotFoundError` crash caused by
  `Portal` manually grafting its rendered DOM node into `document.body` (via a
  raw `appendChild` in a `useLayoutEffect`) instead of using Preact's own portal
  primitive.

  That manual graft moved a Preact-owned DOM node out from under its logical
  parent without informing the reconciler, so the parent's internal DOM
  bookkeeping became stale. Any later update that needed to remove or reposition
  the portalled node relative to a sibling — for example `Modal` closing while a
  sibling in the same parent re-renders, as happens in `storefront-cart`'s
  `GiftOptions` when clicking "Apply" (closing the gift-wrap modal while the
  accordion swaps from its editable form to the read-only summary) — could throw
  `Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`

  `Portal` now renders its children with `createPortal` (from `preact/compat`)
  into the same lazily-created, `document.body`-appended root element, so
  Preact's reconciler tracks the split between logical parent and DOM container
  itself instead of relying on an untracked DOM move. Timing is unchanged (the
  root is still created during render and attached during `useLayoutEffect`), so
  no consumer-visible behavior changes and no `Slot` or image-swatch code needed
  to change.

- 3313516: chore: upgrade vite-tsconfig-paths 4.3.2 → 6.1.1

  6.x resolves `${configDir}`-expanded `include` entries correctly, so the
  per-package relative `include` overrides that worked around the 4.x limitation
  are no longer needed. Removed the redundant `["src", "tests"]` overrides (and
  their duplicated comments) from `build-tools`, `event-bus`, `fetch-graphql`,
  and `recaptcha`, which now inherit the base tsconfig's `${configDir}` include.
  `elsie` keeps its `["src"]` include (it deliberately excludes its jest `tests`
  dir); its comment was updated to reflect the real reason rather than the
  obsolete workaround.

  Also removed the default `@/*` → `${configDir}/src/*` mapping from the base
  tsconfig. Because tsconfig `paths` is replaced wholesale (never merged) when a
  config redeclares it, a base-level default is a footgun: any package that
  needs an extra alias silently loses `@/*`. It is now opt-in — a package that
  wants it declares its own `paths`. No base-extending package in the repo
  relied on it (event-bus already uses relative imports). Preact packages are
  unaffected: the preact config still declares its own `@/*` alongside the
  react→preact aliases.

## 2.1.0

### Minor Changes

- e8f81dd: **Incrementer**: Add optional `label` prop that renders a visible
  `<label>` element associated with the input field via `htmlFor`/`id`. This
  addresses WCAG 3.3.2 (Labels or Instructions) which requires form fields to
  have visible labels.
- d9ac070: feat(a11y): add LiveRegion component and Button loading state for
  WCAG 4.1.3

  - New `LiveRegion` component: a visually-hidden, always-mounted
    `role="status"` span for announcing status changes to screen readers without
    focus movement. Accepts `message` (string toggled between empty and the
    label) and `politeness` ("polite" | "assertive"). Use this alongside
    `Skeleton` and `ProgressSpinner` instead of relying on those components' own
    `role="status"` which fires unreliably when they are conditionally mounted.
  - `Button` now accepts `loading?: boolean` (sets `aria-busy` on the button
    element) and `loadingLabel?: string` (renders a sibling `LiveRegion` outside
    the button element — live regions must not be nested inside interactive
    elements).

- 4cecbe2: Bump `preact` from `~10.22.1` to `~10.29.7` and `@preact/signals`
  from `1.3.0` to `^2.3.1`, matching the preact version most external consumers
  already have installed.

  Preact 10.29 narrowed its generic `HTMLAttributes<Target>` typings: `value`,
  `checked`, `alt`, `width`, `height`, `loading`, `srcSet`, `required`, and
  `name` moved out into per-element interfaces instead of being available on
  every element generically. This restores the type declarations for the
  components that were affected (`Input`, `TextArea`, `Checkbox`, `Image`,
  `Incrementer`, `Button`, `ActionButton`, `Picker`, `InputFile`, `Accordion`,
  `CartItem`, `Slot`) — no runtime or prop-API changes, just typings that would
  otherwise break consumers' own TypeScript builds.

- cadd9f3: feat(lib): add `sanitizeHtml` and `createSanitizedHtml` helpers
  (backed by DOMPurify) for safely rendering untrusted HTML via
  `dangerouslySetInnerHTML`. By default only basic inline formatting tags are
  allowed (`DEFAULT_ALLOWED_TAGS`); callers can extend or replace the
  allow-list.

### Patch Changes

- af12113: Accessibility color contrast fixes (WCAG 1.4.11, 1.4.3):

  - **ProgressSpinner**: Use `--color-neutral-600` for inactive border (3.94:1
    vs previous 1.46:1)
  - **Button disabled states**: Use `--color-neutral-700` for text in all
    variants (4.21:1 on neutral-300, 5.74:1 on white vs previous 1.36:1/1.91:1)

- 9a3dabd: Fix multiple accessibility issues in the `InputPassword` and `Field`
  components:

  - The input `aria-label` now uses the consumer-provided `floatingLabel` or
    `placeholder` instead of a hardcoded "Password" translation, so the
    accessible name matches the visible label (WCAG 2.5.3 Label in Name).
  - The show/hide toggle button `aria-label` now includes the field label (e.g.
    "Click to show password: New Password") so each instance is uniquely
    identifiable by screen readers (WCAG 2.4.6 Headings and Labels).
  - The `PasswordStatusIndicator` now receives a unique `id` via `useId()` and
    the input `aria-describedby` references it, programmatically associating
    password requirement messages with their field (WCAG 3.3.1 Error
    Identification).
  - The `Field` component no longer overrides the child's `aria-describedby`
    with `undefined` when no error is present, preserving any existing
    association.

- fe6e31d: Fix the `elsie concurrently` builder passing `killOthers` to the
  `concurrently` package, which was renamed to `killOthersOn` in
  `concurrently@10`. Since `concurrently` doesn't validate unknown options, the
  mismatch silently no-opped `-k`/`--kill-others`, leaving sibling processes
  (e.g. the `http-server` serving `storybook-static`) running after another
  process in the group exited — hanging commands like `test-storybook-ci` until
  an external timeout killed them.
- 1256599: Cap the `eslint-plugin-cypress` peer dependency range at `<7.0.0`.
  The unbounded `>=3.0.0` range let npm's resolver consider
  `eslint-plugin-cypress@7`, which peer-requires `eslint@>=10` and conflicts
  with elsie's own `eslint@^9.39.5` dependency — even though
  `eslint-plugin-cypress` remains an optional peer. Versions up to `6.4.4` still
  support `eslint@>=9`, so the range now stays within what's actually
  compatible.
- 089ba5c: fix(a11y): prevent dummy update when keyboard focus moves to
  Incrementer buttons and add aria-valuetext for VoiceOver
- d59c153: Fix `Modal` accessibility: while the modal is open, sibling content
  in `document.body` is now hidden from assistive technology with
  `aria-hidden="true"`, preventing screen reader users from navigating outside
  the modal with arrow keys. The attribute is removed automatically when the
  modal closes. Other portal roots (e.g. nested modals or toasts) and elements
  that already declare `aria-hidden` are left untouched.
- c9674f9: fix(a11y): add aria-current="page" to active pagination button and
  fix active indicator contrast (WCAG 1.4.11, 4.1.2)
- 6957e90: Fix `PasswordStatusIndicator` requirement status changes (e.g. the
  length or character-class error icon) not being announced by screen readers.
  The container now carries `role="status"` and `aria-live="polite"` so
  assistive technology announces requirement changes as they happen (WCAG
  4.1.3).
- 238981b: Pin Preact to 10.22.1, the latest version verified against the
  affected consumer checkout flow without the AEM Asset Slot `insertBefore`
  crash. Also restore `@preact/signals` 1.3.0, the compatible Signals release
  used with this Preact version. Preact 10.23.0 introduced child-diffing changes
  that expose the existing detached render-root and raw DOM graft behavior.
- 406a36d: Restore the existing Slot implementation and temporarily downgrade
  Preact from 10.29 to 10.28.4, the latest pre-10.29 release, to avoid
  intermittent `insertBefore` crashes in AEM Asset image Slots while the
  underlying DOM graft and render-root ownership changes are developed and
  validated separately.
- fea748d: Pin Preact to 10.27.0, the latest version verified not to throw with
  the existing detached render-root mechanism. Preact 10.27.1 and newer
  reproduce intermittent `insertBefore` crashes in AEM Asset image Slots.
- 85e5b20: fix(a11y): keep RadioButton's focusable input anchored to its visible
  label when the page scrolls, preventing focus from appearing obscured or
  off-screen (WCAG 2.4.11)
- 896c6c9: reCAPTCHA form types are now configurable via feature flag.
  COMPANY_CREATE is no longer in the default form-type map. B2B storefronts pass
  `{ b2bEnabled: true }` to `setConfig()` to include it in the configuration
  query.
- a920177: fix(Incrementer): prevent quantity input flicker during in-progress
  typing, and prevent double onValue call when debounce fires before blur

## 2.1.0-beta.8

### Patch Changes

- 238981b: Pin Preact to 10.22.1, the latest version verified against the
  affected consumer checkout flow without the AEM Asset Slot `insertBefore`
  crash. Also restore `@preact/signals` 1.3.0, the compatible Signals release
  used with this Preact version. Preact 10.23.0 introduced child-diffing changes
  that expose the existing detached render-root and raw DOM graft behavior.

## 2.1.0-beta.7

### Patch Changes

- fea748d: Pin Preact to 10.27.0, the latest version verified not to throw with
  the existing detached render-root mechanism. Preact 10.27.1 and newer
  reproduce intermittent `insertBefore` crashes in AEM Asset image Slots.

## 2.1.0-beta.6

### Patch Changes

- 406a36d: Restore the existing Slot implementation and temporarily downgrade
  Preact from 10.29 to 10.28.4, the latest pre-10.29 release, to avoid
  intermittent `insertBefore` crashes in AEM Asset image Slots while the
  underlying DOM graft and render-root ownership changes are developed and
  validated separately.

## 2.1.0-beta.5

### Patch Changes

- 4cc7219: Fix a memory leak in `Slot`'s VNode cache (added to fix repeated
  `insertBefore` crashes from replay churn): entries were never pruned, so a
  `slot` callback that keeps calling `replaceWith`/`appendChild`/`prependChild`
  with newly constructed elements over time (rather than mutating one element in
  place) would pin every historical element in memory for the Slot's whole
  lifetime. Entries are now evicted via the grafted element's `ref` callback
  firing with `null`, which Preact does precisely when that VNode is detached
  (superseded by a different element, or the Slot unmounting).

  See `docs/slot-dom-graft-race.md` for the full trace, including a
  pre-existing, unrelated gap this surfaced: calling `replaceWith` a second time
  with a different element doesn't remove the first one.

- ba3bbe7: Fix a recurring `insertBefore` crash in `Slot` when content grafted
  via `replaceWith`/`appendChild`/`prependChild` is re-applied on unrelated
  re-renders. `Slot` replays its registered methods on every render pass (by
  design, so `onRender`/`onChange` can react to fresh state), but the grafted
  content's wrapper VNode was rebuilt from scratch on every replay, handing
  Preact a brand new `ref` closure for a DOM node that was already grafted. That
  churn corrupted Preact's internal DOM bookkeeping for the grafted subtree over
  repeated re-renders, especially in components with ongoing state changes. The
  wrapper VNode is now cached per element, so repeated replays reuse the same
  VNode instance and Preact's diff bails out instead of re-touching the subtree.

  See `docs/slot-dom-graft-race.md` for the full trace, including why an earlier
  attempt at this fix (making `replaceWith` a no-op after its first run) was
  wrong.

## 2.1.0-beta.4

### Patch Changes

- 8fc53e5: Fix `Slot` silently dropping
  `replaceWith`/`appendChild`/`prependChild`/
  `appendSibling`/`prependSibling`/`remove` calls made from a `slot` callback
  that doesn't `return`/`await` its own async work (e.g. a non-`async` callback
  that calls an `async` helper as a bare statement). Previously, nothing was
  left to trigger the render that would have picked up the queued method once
  the slot's normal init-triggered render pass had already completed. `Slot` now
  detects that case and flushes the pending update itself. Existing callers that
  already `return`/`await` their `slot` callback are unaffected.

  See `docs/slot-dom-graft-race.md` for the full trace.

## 2.1.0-beta.3

### Patch Changes

- 3bfb136: Fix an intermittent `insertBefore` crash in AEM Assets image slots
  (`tryRenderAemAssetsImage`/`makeAemAssetsImageSlot`) that surfaced after the
  preact 10.29 bump. The image render into its container was never awaited
  before handing the container to `Slot`'s `replaceWith`, so it could be grafted
  into the DOM before it had any content. See `docs/slot-dom-graft-race.md` for
  the full trace.

## 2.1.0-beta.2

### Patch Changes

- fe6e31d: Fix the `elsie concurrently` builder passing `killOthers` to the
  `concurrently` package, which was renamed to `killOthersOn` in
  `concurrently@10`. Since `concurrently` doesn't validate unknown options, the
  mismatch silently no-opped `-k`/`--kill-others`, leaving sibling processes
  (e.g. the `http-server` serving `storybook-static`) running after another
  process in the group exited — hanging commands like `test-storybook-ci` until
  an external timeout killed them.

## 2.1.0-beta.1

### Patch Changes

- 1256599: Cap the `eslint-plugin-cypress` peer dependency range at `<7.0.0`.
  The unbounded `>=3.0.0` range let npm's resolver consider
  `eslint-plugin-cypress@7`, which peer-requires `eslint@>=10` and conflicts
  with elsie's own `eslint@^9.39.5` dependency — even though
  `eslint-plugin-cypress` remains an optional peer. Versions up to `6.4.4` still
  support `eslint@>=9`, so the range now stays within what's actually
  compatible.

## 2.1.0-beta.0

### Minor Changes

- e8f81dd: **Incrementer**: Add optional `label` prop that renders a visible
  `<label>` element associated with the input field via `htmlFor`/`id`. This
  addresses WCAG 3.3.2 (Labels or Instructions) which requires form fields to
  have visible labels.
- d9ac070: feat(a11y): add LiveRegion component and Button loading state for
  WCAG 4.1.3

  - New `LiveRegion` component: a visually-hidden, always-mounted
    `role="status"` span for announcing status changes to screen readers without
    focus movement. Accepts `message` (string toggled between empty and the
    label) and `politeness` ("polite" | "assertive"). Use this alongside
    `Skeleton` and `ProgressSpinner` instead of relying on those components' own
    `role="status"` which fires unreliably when they are conditionally mounted.
  - `Button` now accepts `loading?: boolean` (sets `aria-busy` on the button
    element) and `loadingLabel?: string` (renders a sibling `LiveRegion` outside
    the button element — live regions must not be nested inside interactive
    elements).

- 4cecbe2: Bump `preact` from `~10.22.1` to `~10.29.7` and `@preact/signals`
  from `1.3.0` to `^2.3.1`, matching the preact version most external consumers
  already have installed.

  Preact 10.29 narrowed its generic `HTMLAttributes<Target>` typings: `value`,
  `checked`, `alt`, `width`, `height`, `loading`, `srcSet`, `required`, and
  `name` moved out into per-element interfaces instead of being available on
  every element generically. This restores the type declarations for the
  components that were affected (`Input`, `TextArea`, `Checkbox`, `Image`,
  `Incrementer`, `Button`, `ActionButton`, `Picker`, `InputFile`, `Accordion`,
  `CartItem`, `Slot`) — no runtime or prop-API changes, just typings that would
  otherwise break consumers' own TypeScript builds.

- cadd9f3: feat(lib): add `sanitizeHtml` and `createSanitizedHtml` helpers
  (backed by DOMPurify) for safely rendering untrusted HTML via
  `dangerouslySetInnerHTML`. By default only basic inline formatting tags are
  allowed (`DEFAULT_ALLOWED_TAGS`); callers can extend or replace the
  allow-list.

### Patch Changes

- af12113: Accessibility color contrast fixes (WCAG 1.4.11, 1.4.3):

  - **ProgressSpinner**: Use `--color-neutral-600` for inactive border (3.94:1
    vs previous 1.46:1)
  - **Button disabled states**: Use `--color-neutral-700` for text in all
    variants (4.21:1 on neutral-300, 5.74:1 on white vs previous 1.36:1/1.91:1)

- 9a3dabd: Fix multiple accessibility issues in the `InputPassword` and `Field`
  components:

  - The input `aria-label` now uses the consumer-provided `floatingLabel` or
    `placeholder` instead of a hardcoded "Password" translation, so the
    accessible name matches the visible label (WCAG 2.5.3 Label in Name).
  - The show/hide toggle button `aria-label` now includes the field label (e.g.
    "Click to show password: New Password") so each instance is uniquely
    identifiable by screen readers (WCAG 2.4.6 Headings and Labels).
  - The `PasswordStatusIndicator` now receives a unique `id` via `useId()` and
    the input `aria-describedby` references it, programmatically associating
    password requirement messages with their field (WCAG 3.3.1 Error
    Identification).
  - The `Field` component no longer overrides the child's `aria-describedby`
    with `undefined` when no error is present, preserving any existing
    association.

- 089ba5c: fix(a11y): prevent dummy update when keyboard focus moves to
  Incrementer buttons and add aria-valuetext for VoiceOver
- d59c153: Fix `Modal` accessibility: while the modal is open, sibling content
  in `document.body` is now hidden from assistive technology with
  `aria-hidden="true"`, preventing screen reader users from navigating outside
  the modal with arrow keys. The attribute is removed automatically when the
  modal closes. Other portal roots (e.g. nested modals or toasts) and elements
  that already declare `aria-hidden` are left untouched.
- c9674f9: fix(a11y): add aria-current="page" to active pagination button and
  fix active indicator contrast (WCAG 1.4.11, 4.1.2)
- 6957e90: Fix `PasswordStatusIndicator` requirement status changes (e.g. the
  length or character-class error icon) not being announced by screen readers.
  The container now carries `role="status"` and `aria-live="polite"` so
  assistive technology announces requirement changes as they happen (WCAG
  4.1.3).
- 85e5b20: fix(a11y): keep RadioButton's focusable input anchored to its visible
  label when the page scrolls, preventing focus from appearing obscured or
  off-screen (WCAG 2.4.11)
- 896c6c9: reCAPTCHA form types are now configurable via feature flag.
  COMPANY_CREATE is no longer in the default form-type map. B2B storefronts pass
  `{ b2bEnabled: true }` to `setConfig()` to include it in the configuration
  query.
- a920177: fix(Incrementer): prevent quantity input flicker during in-progress
  typing, and prevent double onValue call when debounce fires before blur

## 2.0.1

### Patch Changes

- 7df4102: Revert reCAPTCHA support for B2B company registration (createCompany)

## 2.0.0

### Major Changes

- ea02d5f: Upgrade Jest to 30.4.2 and Storybook to 10.4.0

  Updated testing and component development tools to latest stable versions.
  Jest 30.4.2 provides enhanced snapshot handling and improved test performance.
  Storybook 10.4.0 includes updated addon ecosystem, improved Preact Vite
  integration, and enhanced accessibility features with addon-a11y and
  addon-coverage support.

- 9cd299b: Upgrade TypeScript to 6.0 and ESLint to 9 (flat config)

  ## What changed

  ### TypeScript 4.7 → 6.0
  - `tsconfig-base.json` updated with correct TS 6 defaults. Two new-default
    opt-outs are deferred as tech debt: `exactOptionalPropertyTypes` and
    `verbatimModuleSyntax`.
  - `moduleResolution` changed from `"nodenext"` to `"bundler"` across all
    packages — the correct pairing for `module: "esnext"` in a Vite monorepo.
    Only `packages/elsie` keeps `"NodeNext"` (paired with `module: "NodeNext"`
    for its dual CJS/ESM output).
  - `baseUrl` removed from all tsconfigs (deprecated in TS 6; `paths` resolves
    relative to the tsconfig file directly).
  - `rootDir` added explicitly to `build-tools`, `event-bus`, `fetch-graphql`,
    and `recaptcha` tsconfigs (implicit `rootDir` deprecated in TS 6).
  - `types: []` set in `tsconfig-base.json` to prevent ambient test types from
    leaking into declaration output. Each package's own `tsconfig.json` declares
    its `types` explicitly (`jest`, `node`, `vite/client`, etc.).
  - `babel-plugin-tsconfig-paths` removed — it was a no-op in every package that
    listed it.
  - `noUncheckedIndexedAccess` enabled — violations were few enough to fix in
    source.

  ### ESLint 8 → 9 (flat config)
  - `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` (v5)
    removed; replaced by the unified `typescript-eslint` v8 package.
  - `eslint-config-preact` bumped to `^2.0.0` (ESLint 9 support).
  - `eslint-config-prettier` bumped to `^10.0.0`.
  - `eslint-plugin-mdx` bumped to `^3.8.1`. **ESLint 10 is not supported** —
    `eslint-plugin-mdx` vendors an internal ESLint API removed in v10; ESLint 9
    is pinned until a fix is released.
  - `globals` added (`^15.0.0`) for `languageOptions.globals` in flat config.
  - Shared config (`packages/elsie/config/eslint.mjs`) rewritten as a
    flat-config array export.
  - Per-package `.eslintrc.js` files deleted; replaced with `eslint.config.js`
    (ESM flat config).
  - Several `typescript-eslint` v8 rules disabled to preserve prior behavior:
    `no-explicit-any`, `ban-ts-comment`, `no-unused-expressions`,
    `no-unsafe-function-type`, `no-require-imports`, `no-empty-object-type`.
    Tracked as tech debt.
  - `reportUnusedDisableDirectives` disabled to avoid sweeping pre-existing
    inline disable comments.

  ### `vite-plugin-dts` removed; replaced with custom `dtsPlugin`

  `vite-plugin-dts@3.9.1` declared a `typescript <5.0` peer range and its v5
  successor was incompatible with this monorepo's layout (cross-package sources,
  workspace symlinks, multi-`outDir`). It was removed and replaced with a thin
  custom Vite plugin at `packages/elsie/config/plugins/dts.mjs` (`dtsPlugin`)
  that runs `tsc` directly. The resulting `dist/` layout is identical to what
  v3.9 produced (147 `.d.ts` files, 12 top-level entry shims).

  ### Module format standardization

  All tooling config files now follow a consistent format:

  - **ESLint / Jest / Vite configs** — ESM (`.js` in `"type":"module"` packages;
    `.mjs` in elsie).
  - **Prettier** — JSON only (`@adobe-commerce/elsie/config/prettier.json`
    referenced via each package's `"prettier"` key). `prettier.config.*` files
    deleted from all packages.
  - **elsie CLI** (`bin/**`) — intentionally stays CommonJS.

  See `architecture/decisions/009-module-format.md` for the full convention.

  ### `.elsie.js` → `.elsie.cjs`

  The consumer project config file is renamed from `.elsie.js` to `.elsie.cjs`.
  With `"type":"module"` now required in consumer packages, a plain `.js` file
  is treated as ES module — making `module.exports` a SyntaxError and making
  `require()` in the elsie CLI fail with `ERR_REQUIRE_ESM`. The `.cjs` extension
  forces CommonJS regardless of the package's `"type"` field.

  - `elsie generate config` now writes `.elsie.cjs`.
  - The CLI (`bin/lib/config.js`) and `config/vite.mjs` both prefer `.elsie.cjs`
    and fall back to `.elsie.js` for packages not yet migrated.
  - `.elsie.cjs` added to `.npmignore` in all consumer packages.

  ## Consumer migration

  See `docs/elsie-v2-migration.md` for the full step-by-step guide. Key actions:

  1. Add `"type": "module"` to `package.json`.
  2. Replace `.eslintrc.js` with `eslint.config.js` (ESM flat config importing
     from `@adobe-commerce/elsie/config/eslint.mjs`).
  3. Rename `.elsie.js` → `.elsie.cjs` (keep `module.exports` content as-is).
  4. Add `"prettier": "@adobe-commerce/elsie/config/prettier.json"` to
     `package.json`; delete `prettier.config.js`.
  5. Update `tsconfig.json`: remove `baseUrl`, add explicit `rootDir` and
     `types`.
  6. Add `tsconfig.build.json` for declaration emit (required by `dtsPlugin`).
  7. Convert `.elsie.js` imports in `.storybook/main.js` and
     `storybook-stories.js` to reference `.elsie.cjs`.

### Minor Changes

- c21a378: Add optional `cypress` export to shared ESLint config

  `cypress` is a new named export from `@adobe-commerce/elsie/config/eslint.mjs`
  that provides a pre-configured ESLint flat config for Cypress test files
  (`cypress/**/*.js`). It applies `eslint-plugin-cypress`'s recommended rules
  with `jest/expect-expect` turned off.

  The plugin is declared as an optional peer dependency — `cypress` resolves to
  an empty array when `eslint-plugin-cypress` is not installed, so projects that
  don't use Cypress are unaffected.

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

- 9d558ed: Adds `window.DROPINS.showOverlays(state)` — a developer utility that
  visually outlines all dropin containers and slots on the page with labeled
  overlays, making it easier to understand how the storefront is composed at
  runtime.

  `DROPINS.showSlots()` is deprecated in favor of `showOverlays()` and will log
  a console warning when called.

- c25a5d7: feat(elsie): add `changeset` builder command

  Adds `elsie changeset` as a first-class CLI command, wrapping
  `@changesets/cli`. All subcommands pass through transparently (`status`,
  `version`, `publish`, `--snapshot`, etc.). `@changesets/cli` is now a
  dependency of elsie, so consumers no longer need to install it separately.

- 005edc7: Adds validation to the Incrementer component when the field is
  changed to "empty".

### Patch Changes

- bf352d2: Fix InputDate showing wrong format after selecting a date from the
  calendar
- 4c3d82d: fix(field): associate error messages with inputs via aria-describedby
  (WCAG 3.3.1)
- 36354d9: Add disableWhenSingle prop to Picker; defaults to true (preserves
  existing behavior). Pass false to keep the picker interactive when only one
  option is available.
- 09c2100: Declare `preact` as a runtime dependency. It previously sat in
  `devDependencies` (unlike `@preact/signals` and `preact-i18n`), so standalone
  consumers of `@adobe-commerce/elsie` had an unmet `preact` — also the unmet
  peer of `@preact/preset-vite`, `@storybook/preact-vite` and
  `@testing-library/preact`. It now resolves to the same `~10.22.1` bundled into
  `@dropins/tools`. The emitted bundle is unchanged.
- 4641ab0: Fix `Field` and `InLineAlert` status/error messages not being
  announced by screen readers. `Field`'s description/hint element now always
  carries `role="status"` and `aria-live="polite"`, instead of only adding
  `aria-live` once an error appeared, so assistive technology reliably announces
  validation and success messages (WCAG 4.1.3). `InLineAlert` now sets
  `role="alert"`/`aria-live="assertive"` for `type="error"` and
  `role="status"`/`aria-live="polite"` for `success`/`warning`, since it
  previously had no live-region semantics at all.
- ccada8c: Reset default margin on Header and CartItem titles to support
  rendering them as semantic headings
- cb6eb81: Fix `InLineAlert` additional-action buttons announcing the same
  accessible name across multiple alerts. Each entry in `additionalActions` may
  now include an optional `'aria-label'` that is applied to the rendered button
  (falling back to `label` when omitted), so consumers can give visually
  identical "Undo"/"Dismiss" style buttons unique, descriptive names for
  assistive technology.
- ab5cf32: Fix `Modal` accessibility: the dialog now exposes `role="dialog"`,
  `aria-modal="true"`, and an `aria-labelledby` linked to its title. Focus moves
  into the modal when it opens (falling back to the dialog body when there are
  no focusable elements), Tab/Shift+Tab now cycles between the first and last
  focusable elements instead of escaping the modal, and focus returns to the
  previously focused element when the modal closes.
- 58da630: Fix `Picker` accessible name and label association. The `<select>`
  now falls back to `floatingLabel` or `placeholder` for its `aria-label` when
  no `name` is provided, and the floating `<label>` is now correctly associated
  with the rendered `<select>` via its generated id instead of the raw `id`
  prop.
- 450c408: fix(Picker): auto-select and emit the sole option when the control
  auto-disables, so single-option narrowing on configurable PDPs no longer
  leaves the value unselected and Add to Cart permanently disabled
- 33ebe8a: Add accessible labels to password validation and input status icons
  (WCAG 1.1.1)
- 2ad7316: Fix `ToggleButton`'s underlying radio input announcing the shared
  radio-group `name` (e.g. "payment-method") as its accessible name for every
  option instead of the option's own visible label, which violates WCAG 2.4.6
  (Headings and Labels) and 2.5.3 (Label in Name). The radio input's accessible
  name now defaults to `aria-labelledby` pointing at the option's own visible
  label content (e.g. "Check / Money order"), which works correctly whether
  `label` is a string or a `VNode`. An optional `ariaLabel` prop is still
  available for consumers who need to set an explicit accessible name via
  `aria-label` instead.
- 256007e: Fix ToggleButton generating invalid HTML ids when value prop contains
  spaces, breaking aria-labelledby label association
- 016a558: Fix low-contrast field label text in `Input` when a field is in an
  error state. The floating label color now meets WCAG AA contrast requirements
  for normal-size text against light backgrounds, matching the color already
  used for error text elsewhere (helper text, alerts).
- 51fcb35: fix(a11y): darken low-contrast focus indicators to meet WCAG 1.4.11
  (3:1 non-text contrast)

  The default keyboard focus indicator across Button, IconButton, Checkbox,
  RadioButton, ActionButton, ActionButtonGroup, ToggleButton, TextSwatch,
  ColorSwatch, ImageSwatch, and links used `--color-neutral-400` (#d6d6d6,
  ~1.45:1 against white), below the 3:1 minimum required by WCAG 1.4.11. These
  focus indicators now use `--color-neutral-600` (#8f8f8f, ~3.2:1), so keyboard
  users can reliably see which control is focused.

## 2.0.0-beta.1

### Patch Changes

- 256007e: Fix ToggleButton generating invalid HTML ids when value prop contains
  spaces, breaking aria-labelledby label association

## 2.0.0-beta.0

### Major Changes

- ea02d5f: Upgrade Jest to 30.4.2 and Storybook to 10.4.0

  Updated testing and component development tools to latest stable versions.
  Jest 30.4.2 provides enhanced snapshot handling and improved test performance.
  Storybook 10.4.0 includes updated addon ecosystem, improved Preact Vite
  integration, and enhanced accessibility features with addon-a11y and
  addon-coverage support.

- 9cd299b: Upgrade TypeScript to 6.0 and ESLint to 9 (flat config)

  ## What changed

  ### TypeScript 4.7 → 6.0
  - `tsconfig-base.json` updated with correct TS 6 defaults. Two new-default
    opt-outs are deferred as tech debt: `exactOptionalPropertyTypes` and
    `verbatimModuleSyntax`.
  - `moduleResolution` changed from `"nodenext"` to `"bundler"` across all
    packages — the correct pairing for `module: "esnext"` in a Vite monorepo.
    Only `packages/elsie` keeps `"NodeNext"` (paired with `module: "NodeNext"`
    for its dual CJS/ESM output).
  - `baseUrl` removed from all tsconfigs (deprecated in TS 6; `paths` resolves
    relative to the tsconfig file directly).
  - `rootDir` added explicitly to `build-tools`, `event-bus`, `fetch-graphql`,
    and `recaptcha` tsconfigs (implicit `rootDir` deprecated in TS 6).
  - `types: []` set in `tsconfig-base.json` to prevent ambient test types from
    leaking into declaration output. Each package's own `tsconfig.json` declares
    its `types` explicitly (`jest`, `node`, `vite/client`, etc.).
  - `babel-plugin-tsconfig-paths` removed — it was a no-op in every package that
    listed it.
  - `noUncheckedIndexedAccess` enabled — violations were few enough to fix in
    source.

  ### ESLint 8 → 9 (flat config)
  - `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` (v5)
    removed; replaced by the unified `typescript-eslint` v8 package.
  - `eslint-config-preact` bumped to `^2.0.0` (ESLint 9 support).
  - `eslint-config-prettier` bumped to `^10.0.0`.
  - `eslint-plugin-mdx` bumped to `^3.8.1`. **ESLint 10 is not supported** —
    `eslint-plugin-mdx` vendors an internal ESLint API removed in v10; ESLint 9
    is pinned until a fix is released.
  - `globals` added (`^15.0.0`) for `languageOptions.globals` in flat config.
  - Shared config (`packages/elsie/config/eslint.mjs`) rewritten as a
    flat-config array export.
  - Per-package `.eslintrc.js` files deleted; replaced with `eslint.config.js`
    (ESM flat config).
  - Several `typescript-eslint` v8 rules disabled to preserve prior behavior:
    `no-explicit-any`, `ban-ts-comment`, `no-unused-expressions`,
    `no-unsafe-function-type`, `no-require-imports`, `no-empty-object-type`.
    Tracked as tech debt.
  - `reportUnusedDisableDirectives` disabled to avoid sweeping pre-existing
    inline disable comments.

  ### `vite-plugin-dts` removed; replaced with custom `dtsPlugin`

  `vite-plugin-dts@3.9.1` declared a `typescript <5.0` peer range and its v5
  successor was incompatible with this monorepo's layout (cross-package sources,
  workspace symlinks, multi-`outDir`). It was removed and replaced with a thin
  custom Vite plugin at `packages/elsie/config/plugins/dts.mjs` (`dtsPlugin`)
  that runs `tsc` directly. The resulting `dist/` layout is identical to what
  v3.9 produced (147 `.d.ts` files, 12 top-level entry shims).

  ### Module format standardization

  All tooling config files now follow a consistent format:

  - **ESLint / Jest / Vite configs** — ESM (`.js` in `"type":"module"` packages;
    `.mjs` in elsie).
  - **Prettier** — JSON only (`@adobe-commerce/elsie/config/prettier.json`
    referenced via each package's `"prettier"` key). `prettier.config.*` files
    deleted from all packages.
  - **elsie CLI** (`bin/**`) — intentionally stays CommonJS.

  See `architecture/decisions/009-module-format.md` for the full convention.

  ### `.elsie.js` → `.elsie.cjs`

  The consumer project config file is renamed from `.elsie.js` to `.elsie.cjs`.
  With `"type":"module"` now required in consumer packages, a plain `.js` file
  is treated as ES module — making `module.exports` a SyntaxError and making
  `require()` in the elsie CLI fail with `ERR_REQUIRE_ESM`. The `.cjs` extension
  forces CommonJS regardless of the package's `"type"` field.

  - `elsie generate config` now writes `.elsie.cjs`.
  - The CLI (`bin/lib/config.js`) and `config/vite.mjs` both prefer `.elsie.cjs`
    and fall back to `.elsie.js` for packages not yet migrated.
  - `.elsie.cjs` added to `.npmignore` in all consumer packages.

  ## Consumer migration

  See `docs/elsie-v2-migration.md` for the full step-by-step guide. Key actions:

  1. Add `"type": "module"` to `package.json`.
  2. Replace `.eslintrc.js` with `eslint.config.js` (ESM flat config importing
     from `@adobe-commerce/elsie/config/eslint.mjs`).
  3. Rename `.elsie.js` → `.elsie.cjs` (keep `module.exports` content as-is).
  4. Add `"prettier": "@adobe-commerce/elsie/config/prettier.json"` to
     `package.json`; delete `prettier.config.js`.
  5. Update `tsconfig.json`: remove `baseUrl`, add explicit `rootDir` and
     `types`.
  6. Add `tsconfig.build.json` for declaration emit (required by `dtsPlugin`).
  7. Convert `.elsie.js` imports in `.storybook/main.js` and
     `storybook-stories.js` to reference `.elsie.cjs`.

### Minor Changes

- c21a378: Add optional `cypress` export to shared ESLint config

  `cypress` is a new named export from `@adobe-commerce/elsie/config/eslint.mjs`
  that provides a pre-configured ESLint flat config for Cypress test files
  (`cypress/**/*.js`). It applies `eslint-plugin-cypress`'s recommended rules
  with `jest/expect-expect` turned off.

  The plugin is declared as an optional peer dependency — `cypress` resolves to
  an empty array when `eslint-plugin-cypress` is not installed, so projects that
  don't use Cypress are unaffected.

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

- 9d558ed: Adds `window.DROPINS.showOverlays(state)` — a developer utility that
  visually outlines all dropin containers and slots on the page with labeled
  overlays, making it easier to understand how the storefront is composed at
  runtime.

  `DROPINS.showSlots()` is deprecated in favor of `showOverlays()` and will log
  a console warning when called.

- c25a5d7: feat(elsie): add `changeset` builder command

  Adds `elsie changeset` as a first-class CLI command, wrapping
  `@changesets/cli`. All subcommands pass through transparently (`status`,
  `version`, `publish`, `--snapshot`, etc.). `@changesets/cli` is now a
  dependency of elsie, so consumers no longer need to install it separately.

- 005edc7: Adds validation to the Incrementer component when the field is
  changed to "empty".

### Patch Changes

- bf352d2: Fix InputDate showing wrong format after selecting a date from the
  calendar
- 4c3d82d: fix(field): associate error messages with inputs via aria-describedby
  (WCAG 3.3.1)
- 36354d9: Add disableWhenSingle prop to Picker; defaults to true (preserves
  existing behavior). Pass false to keep the picker interactive when only one
  option is available.
- 09c2100: Declare `preact` as a runtime dependency. It previously sat in
  `devDependencies` (unlike `@preact/signals` and `preact-i18n`), so standalone
  consumers of `@adobe-commerce/elsie` had an unmet `preact` — also the unmet
  peer of `@preact/preset-vite`, `@storybook/preact-vite` and
  `@testing-library/preact`. It now resolves to the same `~10.22.1` bundled into
  `@dropins/tools`. The emitted bundle is unchanged.
- 4641ab0: Fix `Field` and `InLineAlert` status/error messages not being
  announced by screen readers. `Field`'s description/hint element now always
  carries `role="status"` and `aria-live="polite"`, instead of only adding
  `aria-live` once an error appeared, so assistive technology reliably announces
  validation and success messages (WCAG 4.1.3). `InLineAlert` now sets
  `role="alert"`/`aria-live="assertive"` for `type="error"` and
  `role="status"`/`aria-live="polite"` for `success`/`warning`, since it
  previously had no live-region semantics at all.
- ccada8c: Reset default margin on Header and CartItem titles to support
  rendering them as semantic headings
- cb6eb81: Fix `InLineAlert` additional-action buttons announcing the same
  accessible name across multiple alerts. Each entry in `additionalActions` may
  now include an optional `'aria-label'` that is applied to the rendered button
  (falling back to `label` when omitted), so consumers can give visually
  identical "Undo"/"Dismiss" style buttons unique, descriptive names for
  assistive technology.
- ab5cf32: Fix `Modal` accessibility: the dialog now exposes `role="dialog"`,
  `aria-modal="true"`, and an `aria-labelledby` linked to its title. Focus moves
  into the modal when it opens (falling back to the dialog body when there are
  no focusable elements), Tab/Shift+Tab now cycles between the first and last
  focusable elements instead of escaping the modal, and focus returns to the
  previously focused element when the modal closes.
- 58da630: Fix `Picker` accessible name and label association. The `<select>`
  now falls back to `floatingLabel` or `placeholder` for its `aria-label` when
  no `name` is provided, and the floating `<label>` is now correctly associated
  with the rendered `<select>` via its generated id instead of the raw `id`
  prop.
- 450c408: fix(Picker): auto-select and emit the sole option when the control
  auto-disables, so single-option narrowing on configurable PDPs no longer
  leaves the value unselected and Add to Cart permanently disabled
- 33ebe8a: Add accessible labels to password validation and input status icons
  (WCAG 1.1.1)
- 2ad7316: Fix `ToggleButton`'s underlying radio input announcing the shared
  radio-group `name` (e.g. "payment-method") as its accessible name for every
  option instead of the option's own visible label, which violates WCAG 2.4.6
  (Headings and Labels) and 2.5.3 (Label in Name). The radio input's accessible
  name now defaults to `aria-labelledby` pointing at the option's own visible
  label content (e.g. "Check / Money order"), which works correctly whether
  `label` is a string or a `VNode`. An optional `ariaLabel` prop is still
  available for consumers who need to set an explicit accessible name via
  `aria-label` instead.
- 016a558: Fix low-contrast field label text in `Input` when a field is in an
  error state. The floating label color now meets WCAG AA contrast requirements
  for normal-size text against light backgrounds, matching the color already
  used for error text elsewhere (helper text, alerts).
- 51fcb35: fix(a11y): darken low-contrast focus indicators to meet WCAG 1.4.11
  (3:1 non-text contrast)

  The default keyboard focus indicator across Button, IconButton, Checkbox,
  RadioButton, ActionButton, ActionButtonGroup, ToggleButton, TextSwatch,
  ColorSwatch, ImageSwatch, and links used `--color-neutral-400` (#d6d6d6,
  ~1.45:1 against white), below the 3:1 minimum required by WCAG 1.4.11. These
  focus indicators now use `--color-neutral-600` (#8f8f8f, ~3.2:1), so keyboard
  users can reliably see which control is focused.

## 1.9.0

### Minor Changes

- af62897: Update minimum Node.js requirement to 22 LTS

  Packages are now built with Node.js 22. `elsie` requires `>=22`; browser-only
  packages (`fetch-graphql`, `event-bus`, `recaptcha`, `storefront-design`,
  `build-tools`) do not declare an `engines` field as they do not run in
  Node.js.

- 62adf1c: Reduce HTTP requests on page load through three bundling
  optimizations. The preact runtime is isolated in its own vendor chunk so it no
  longer co-locates into other chunks. Dropin API and internal component modules
  are consolidated into `chunks/api.js` and `chunks/components.js` respectively,
  replacing the previous pattern of one chunk file per function or component.
  All SVG icons are consolidated into a single `chunks/icons.js` chunk instead
  of one chunk per icon.

  Drop-ins must be rebuilt against this release to get the reduced request
  footprint. No source changes are required.

### Patch Changes

- d2aacc7: Fix: GraphQL fragment source files are no longer incorrectly bundled
  into `chunks/api.js`. The `manualChunks` function now walks the full importer
  graph (with cycle protection) to determine whether an api-directory module is
  owned by the fragments barrel, so fragment files stay in the fragments output
  chunk even when accessed through intermediate sub-barrels.
- 5c64620: Implement a new `fragment-import-redirect` build plugin that
  automatically detects and redirects any dropin source file that directly
  imports a fragment source file (bypassing the barrel). The import is silently
  redirected to the fragments barrel at build time and a warning is emitted
  identifying the file so it can be corrected in source. This ensures fragment
  constants always appear as local declarations in `fragments.js` regardless of
  how dropin source code references them.

## 1.9.0-beta.3

### Patch Changes

- 5c64620: Implement a new `fragment-import-redirect` build plugin that
  automatically detects and redirects any dropin source file that directly
  imports a fragment source file (bypassing the barrel). The import is silently
  redirected to the fragments barrel at build time and a warning is emitted
  identifying the file so it can be corrected in source. This ensures fragment
  constants always appear as local declarations in `fragments.js` regardless of
  how dropin source code references them.

## 1.9.0-beta.2

### Patch Changes

- d2aacc7: Fix: GraphQL fragment source files are no longer incorrectly bundled
  into `chunks/api.js`. The `manualChunks` function now walks the full importer
  graph (with cycle protection) to determine whether an api-directory module is
  owned by the fragments barrel, so fragment files stay in the fragments output
  chunk even when accessed through intermediate sub-barrels. Boilerplate GraphQL
  overrides work correctly in all dropin barrel structures.

## 1.9.0-beta.1

### Minor Changes

- af62897: Update minimum Node.js requirement to 22 LTS

  Packages are now built with Node.js 22. `elsie` requires `>=22`; browser-only
  packages (`fetch-graphql`, `event-bus`, `recaptcha`, `storefront-design`,
  `build-tools`) do not declare an `engines` field as they do not run in
  Node.js.

## 1.9.0-beta.0

### Minor Changes

- 62adf1c: Reduce HTTP requests on page load through three bundling
  optimizations. The preact runtime is isolated in its own vendor chunk so it no
  longer co-locates into other chunks. Dropin API and internal component modules
  are consolidated into `chunks/api.js` and `chunks/components.js` respectively,
  replacing the previous pattern of one chunk file per function or component.
  All SVG icons are consolidated into a single `chunks/icons.js` chunk instead
  of one chunk per icon.

  Drop-ins must be rebuilt against this release to get the reduced request
  footprint. No source changes are required.

## 1.8.1

### Patch Changes

- e44f618: Fixed `srcset w` descriptors to use actual image widths instead of
  viewport breakpoints, preventing blurry product images.
- 46d57ca: Add optional `sizes` prop to the `Image` component so dropins can
  provide layout-aware sizing hints for more accurate srcset image source
  selection.

## 1.8.1-beta.0

### Patch Changes

- e44f618: Fixed `srcset w` descriptors to use actual image widths instead of
  viewport breakpoints, preventing blurry product images.
- 46d57ca: Add optional `sizes` prop to the `Image` component so dropins can
  provide layout-aware sizing hints for more accurate srcset image source
  selection.

## 1.8.0

### Minor Changes

- c4da094: Enhance the Vite build process to automatically generate a
  package.json file and include both the LICENSE and CHANGELOG files in the dist
  directory.

### Patch Changes

- 7792c59: Fix vite.mjs path for LICENSE.md

## 1.8.0-beta.1

### Patch Changes

- 7792c59: Fix vite.mjs path for LICENSE.md

## 1.8.0-beta.0

### Minor Changes

- c4da094: Enhance the Vite build process to automatically generate a
  package.json file and include both the LICENSE and CHANGELOG files in the dist
  directory.
