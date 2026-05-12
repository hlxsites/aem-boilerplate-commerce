# update-dependencies

A Node.js script that checks for newer stable versions of `@adobe/*` and `@dropins/*` packages listed in the root `package.json` and updates them in place.

## Usage

**Preview changes without modifying any files:**

```bash
npm run update-dependencies:dry-run
```

**Apply updates:**

```bash
npm run update-dependencies
npm install
```

`npm install` must be run afterwards to refresh `package-lock.json` and regenerate the dropin assets under `scripts/__dropins__/`.

## How it works

1. Reads `package.json` from the project root
2. Fetches the `latest` dist-tag for each tracked package from the npm registry
3. Compares the fetched version against the pinned version using semver rules
4. Writes updated version pins back to `package.json`, preserving any existing `~` or `^` prefix

All npm fetches run in parallel. Each request has a 10-second timeout and a 100 KB response size cap to prevent hung or oversized registry responses from stalling the script.

## Pre-release packages

Only stable releases are proposed. If a package is currently pinned to a pre-release version (e.g. `3.0.4-beta2`) and the latest stable is behind the pre-release base (e.g. `3.0.3`), the package is **held** — no change is made and it is listed separately in the output.

```text
@dropins/storefront-pdp@3.0.4-beta2  held (latest stable 3.0.3)
```

Once a stable release equal to or higher than the pre-release base is published, the script will propose the upgrade automatically.

## Network failures

If any registry lookup fails (timeout, DNS error, oversized response), the affected package is skipped and listed in the output. The script exits with a non-zero code so CI surfaces the failure rather than silently reporting packages as up to date.

## Configuration

The list of tracked package scopes is defined at the top of the script:

```js
const TRACKED_SCOPES = ['@adobe/', '@dropins/'];
```

Add or remove scopes here to change which packages are checked.

Request limits can also be adjusted:

```js
const FETCH_TIMEOUT_MS = 10_000;  // per-request timeout in milliseconds
const FETCH_MAX_BYTES  = 100 * 1024;  // maximum response size in bytes
```

## Permissions

The workflow uses the built-in `GITHUB_TOKEN` provided automatically by GitHub Actions — no manual secret setup is required. The token is granted the following permissions so it can commit the changes and open the PR:

```yaml
permissions:
  contents: write
  pull-requests: write
```

## Automated workflow

A GitHub Actions workflow (`.github/workflows/update-dependencies.yaml`) runs this script every Monday at 08:00 UTC and opens a pull request when updates are found. The PR includes updated `package.json`, `package-lock.json`, and regenerated dropin assets. It can also be triggered manually from the **Actions** tab in GitHub.
