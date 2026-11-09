# Release operations

## Status and release channels

Automatic publishing is **disabled** by `is-dry-run: true` in
[the release caller](./.github/workflows/release.yaml). Changing that gate
requires explicit maintainer approval. A local build, push, or successful
dry-run is not evidence that an npm package has been published.

The manual **Release: Alpha (Pull Request)** workflow is a real publisher:
the shared PR workflow has no dry-run input. Do not dispatch it without
publication approval, even while the automatic release caller is dry-run gated.

| Trigger                                                   | Shared workflow     | npm channel               |
| --------------------------------------------------------- | ------------------- | ------------------------- |
| Push to `develop` adding a new changeset                  | `release.yml@v7`    | `alpha` after activation  |
| Manual dispatch with an open, reviewed same-repository PR | `release-pr.yml@v7` | `alpha`                   |
| Prepared stable candidate merged to `main`                | `release.yml@v7`    | `latest` after activation |

Alpha packages are public npm prereleases for internal testing, not private
registry packages. Use exact versions when testing: the `alpha` tag can move
between PR snapshots and `develop` builds.

The selected v7 contract follows neighboring drop-ins. Do not switch callers to
v8 without an approved channel/branch migration: v8 uses `preview`, `next`, and
`prerelease/*` rather than `develop` / `alpha`.

## Shared-workflow prerequisites

Before any publishing activation:

1. Confirm this consumer repository is allowed to use the private
   `adobe-commerce/storefront-workflows` repository.
2. Confirm Actions policy permits its workflows and referenced actions.
3. Confirm the secret `NPM_TOKEN` is available to this
   repository and authorized to publish public
   `@dropins/storefront-ratings-reviews` packages. The caller maps it to the
   shared workflow's `NPM_TOKEN`. Do not create a personal token or print secret
   values.
4. Confirm public alpha exposure, package ownership, and the first stable version
   with the package maintainers. A source version is not a registry reservation.
5. Optionally enable the existing `STOREFRONT_SLACK_WEBHOOK_URL` organization
   secret for release notifications.
6. Require the candidate's existing functional checks and the new shared CI
   checks before merge; update branch-protection check names deliberately.

Caller references and internal composite actions use the moving `v7` tag,
matching neighboring drop-ins; record the resolved workflow/action revisions
with release evidence.
This is not a fully SHA-pinned dependency graph.

## Local checks and package contents

Use the pinned pnpm version and Node.js 22 or later:

The root `pnpm-workspace.yaml` requires third-party package releases to be at
least seven days old (`minimumReleaseAge: 10080` minutes), excluding
`@adobe-commerce/*` as requested by the code owner. pnpm 10.34.9 supports this
policy; pnpm 10.9.0 predates it. Cypress remains a separate npm project and
does not inherit pnpm's policy.

```sh
pnpm install --frozen-lockfile
pnpm run lint
pnpm run format:check
pnpm run test:ci
pnpm run build
pnpm run build:storybook
pnpm run changeset:status
npm pack ./dist --dry-run --json
```

`test:ci` runs packaging tests and the existing Jest 100% coverage gate. It fails
if Jest discovers no tests. Formatting is intentionally scoped to release tooling
instead of reformatting unrelated application code.
`lint` also validates `elsie.config.js` and checks that the examples' tools
runtime version matches the pinned SDK. The version check does not modify files;
run `pnpm exec elsie sync-tools` to resolve a mismatch.

Cypress remains a separate npm project. Install with
`npm --prefix cypress ci`, start the built sandbox with `pnpm run serve`, wait
for ports 3000 and 3002, then run `npm --prefix cypress run test:ci`.

Elsie 3, pnpm, and shared workflows v7 are the supported toolchain pairing.
Pin Elsie and the matching public `@dropins/tools` runtime to
`3.0.0-alpha-20261027201236`, the selected snapshot for the SDK Star Rating
component needed by upcoming work.
The SDK provides the build, Jest, ESLint, Prettier, Storybook, and MSW tooling;
run commands through `elsie` rather than relying on hoisted executables.
After upgrading Elsie, run `pnpm exec elsie sync-tools` and
`pnpm exec elsie msw init .storybook/public --save` to update the sandbox tools
version and Storybook worker. Commit those generated changes with the lockfile.

The build cleans generated `dist` output before using `elsie.config.js`, so removed
entry points and declarations cannot survive a rebuild. Do not generate a
`TestDropin` configuration.
The project TypeScript config uses `${configDir}`-relative paths without output
directory overrides. The declaration config extends the SDK's build defaults
for its source root and declaration output, preserving the existing exclusions.
The local Vite configuration extends the SDK configuration with cross-platform
container discovery and metadata handling. This avoids the Windows
path/glob mismatch without modifying installed dependencies. Build-tooling
regressions run alongside packaging tests, including on the Windows runner.
This extension is still needed with the selected SDK; its bundled drop-in configuration
uses native Windows paths in glob patterns and Vite module-ID comparisons.

Keep Changesets' default `access` set to `restricted`, matching other drop-ins.
The package-specific `publishConfig.access: public` overrides that default for
this package's public alpha and stable releases.

The distribution manifest:

- is generated by the SDK's Vite plugin with the name, version, license,
  license file, and changelog;
- is enriched by the local post-step, which validates SDK metadata against the
  root after versioning and checks the required generated files;
- preserves ESM and shared `@dropins/tools` metadata;
- validates the API, render, Review, and Pagination JavaScript/declaration files;
- includes compiled JavaScript, declarations, CSS where generated, license,
  README, release runbook, and changelog;
- excludes source maps, the development reload marker, development scripts,
  dependencies, and root publishing configuration from the npm payload.

The local post-step copies only the additional README and release runbook.
It requires the SDK-generated manifest, license, and changelog rather than
regenerating or recopying them.

The package uses compiled component styles; do not promise a separate stylesheet
entry point without checking the generated output. Inspect source-map references
and browser console output as part of the consumer smoke test.

Create a real tarball with `npm pack ./dist --pack-destination <temporary-dir>`,
then install it in a clean consumer. Verify the public API, render, Review, and
Pagination imports, their declarations, and rendering with the existing
`@dropins/tools` import-map integration. Packing the root is not the release
contract.

## Shared CI checks

- Workflow Validation: shared actionlint.
- PR Lint and Unit Tests: lint, release-tooling format check, packaging tests,
  Jest coverage, and JUnit reporting from `junit.xml`.
- Check Changeset: compares against the actual PR base; draft and reviewed
  `skip-changeset` exemptions remain caller policies.
- GraphQL Validation: shared validator with the existing default endpoints and
  endpoint override support from the PR description. A release must use a
  review-capable schema; do not hide schema failures with skips.
- Linux and Windows builds: frozen installation and real distribution builds.
- Rating tests: package/Storybook builds and the existing browser suite, readiness
  checks, screenshots, and failure logs.

The shared lint/unit job does not run on the Windows runner; Windows retains its
independent build check. Keep these checks separate in branch protection.

## Alpha validation and activation

1. Merge reviewed onboarding with automatic publishing still dry-run gated.
   The manual caller must exist on the default branch (`develop`) to be
   dispatchable.
2. Open a reviewed validation PR in this repository with a pending package
   changeset. Confirm it is not a fork and all candidate checks pass.
3. Obtain explicit publishing approval. Dispatch **Release: Alpha (Pull Request)**
   with that PR number.
4. Record the run URL, source commit, and exact alpha version from the result
   comment. Confirm it is installable and renders in a clean consumer.
5. Approve an activation change setting automatic `is-dry-run` to `false`.
   Include a new package changeset in the `develop` push that validates automatic
   alpha publishing: merely retaining old changesets does not trigger it.
6. Check that the stable `latest` tag was not moved by the alpha publication.

The shared v7 PR workflow checks out the selected PR branch. Dispatch only for
reviewed internal branches and serialize maintainer requests; inspect the resolved
source commit in every run.

## Stable release preparation

The shared stable workflow publishes prepared versions. It does **not** create a
version PR or consume pending changesets on `main`.

1. Create a reviewed release branch containing the intended `develop` changes.
2. Run `pnpm run changeset:version` and `pnpm install --no-frozen-lockfile`.
3. Review the version, consumed changesets, changelog, and lockfile. Confirm the
   intended version does not already exist on npm.
4. Ensure no pending `.changeset/*.md` files remain except `README.md`, and
   `.changeset/pre.json` is absent. The stable workflow rejects either state,
   including during dry-runs.
5. Run all candidate checks and archive/consumer validation. Use the reviewed
   `skip-changeset` exemption for the version PR if appropriate.
6. Before activation, validate this prepared candidate through the shared
   dry-run path on the approved release destination. Do not bypass guards.
7. After explicit production-release approval and activation, merge to `main`.
8. Verify npm, the package-version git tag, GitHub release, and optional Slack
   notification independently.
9. Reconcile stable version/changelog changes back into `develop` through a
   reviewed PR. Automatic backmerging is not configured by this onboarding.

Do not enable `release/**` without separately approving the beta prerelease-mode
lifecycle.

## Publication evidence and recovery

After each approved publication:

```sh
npm view @dropins/storefront-ratings-reviews dist-tags --json --registry=https://registry.npmjs.org
```

Also query and install the exact version returned by the workflow. Record its
integrity, source commit, workflow/action revisions, run URL, consumer import
checks, and browser smoke-test result.

- If credentials/access are missing, stop and fix organization access; do not
  switch registries or create personal credentials.
- If an npm version already exists, it cannot be overwritten. Inspect it before
  rerunning; use an approved corrected version or deprecation/tag repair.
- Inspect partial releases individually. A rerun that finds nothing new on npm
  may skip GitHub-release, artifact, or notification steps; it is not proof those
  downstream steps completed.
- To pause automation, restore the dry-run gate through a reviewed change.
  Published versions remain available; rollback is not an unpublish operation.

See [the versioned consumer setup guide](https://github.com/adobe-commerce/storefront-workflows/blob/v7.2.1/docs/repository-setup.md)
and [shared release implementation](https://github.com/adobe-commerce/storefront-workflows/blob/v7.2.1/.github/workflows/release.yml).
