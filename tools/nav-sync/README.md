# nav-sync

Fetches the navigation category tree from the ACO Catalog Service and publishes it to [da.live](https://da.live) so the EDS storefront always serves up-to-date navigation without manual spreadsheet edits.

## How it works

1. Fetches `config.json` from the live EDS site URL (same pattern as the browser SDK)
2. Calls the ACO Catalog Service `navigation` GraphQL query for the requested store
3. Flattens the category tree into `path / title` rows
4. Writes local output files (`nav-dynamic.json`, `nav-dynamic.txt`) under `tools/nav-sync/<store>/`
5. When DA credentials are present, uploads the sheet to da.live then previews and publishes it via the AEM Admin API

The published sheet is served by EDS at `/nav-dynamic.json` (default store) or `/<store>/nav-dynamic.json` (other stores) and consumed by the `header-dynamic` block to render the nav.

## Usage

```bash
node tools/nav-sync/nav-sync.js <site> <store> <family>
```

| Argument | Description |
| --- | --- |
| `site` | EDS site hostname, e.g. `main--my-repo--my-org.aem.live` |
| `store` | `default` or a store key from `config.json` (e.g. `spain`) |
| `family` | ACO product family passed to `navigation(family:)`. Required — every ACO family must be created manually; there is no universal default. |

### Examples

```bash
# Sync the default store
node tools/nav-sync/nav-sync.js main--my-repo--my-org.aem.live default my-family

# Sync a secondary store
node tools/nav-sync/nav-sync.js main--my-repo--my-org.aem.live spain my-family
```

The script derives the DA org and repo automatically from the site URL (`branch--repo--org.aem.live`), so no extra configuration is needed.

## DA upload

The upload step is skipped when no credentials are configured, so local runs without a DA account still produce the local output files.

Set one of the following to enable upload:

| Variable | Description |
| --- | --- |
| `DA_TOKEN` | Pre-generated IMS Bearer token — the simplest option for local runs |
| `DA_CLIENT_ID` + `DA_CLIENT_SECRET` | IMS OAuth server-to-server credentials — for automated/CI runs |

To get a `DA_TOKEN` for a local run, copy the Bearer token from an active da.live browser session (DevTools → Network → any request → `Authorization` header).

For CI/GitHub Actions, IMS server-to-server credentials are the right approach. These require an Adobe Developer Console project with the `AEM` product profile added. See the [Adobe Developer Console docs](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/) for setup.

### da.live permissions

The identity used to upload must be added to the `/**` path group in the da.live config sheet at `da.live/config#/{org}/{repo}/`.

- For **`DA_TOKEN`**: use your Adobe account email.
- For **IMS server-to-server**: use the technical account's IMS **profile email** (not the JWT `user_id`). To find it:

```http
GET https://ims-na1.adobelogin.com/ims/profile/v1
Authorization: Bearer <token>
```

## GitHub Actions

The workflow at `.github/workflows/sync-nav.yml` runs automatically every day at midnight UTC and can also be triggered manually.

**Required repository secrets (at least one set):**

- `DA_TOKEN` — pre-generated token
- `DA_CLIENT_ID` + `DA_CLIENT_SECRET` — IMS server-to-server credentials

**Scheduled runs** sync every store listed as a step in the workflow. To add a new store, add a new step:

```yaml
- name: Sync <store> store
  if: github.event_name == 'schedule' || ...
  run: node tools/nav-sync/nav-sync.js "$SITE" <store> <family>
```

**Manual trigger inputs:**

| Input | Description |
| --- | --- |
| `site` | EDS site hostname (defaults to `NAV_SITE` env in the workflow) |
| `store` | Store to sync. Leave blank to run all configured stores. |
| `family` | ACO product family (required; must be created in ACO first) |

After each run, the output `.txt` files are uploaded as a `nav-categories` artifact so you can inspect the synced categories without pulling the repo.

## Output files

Each run writes two files per store under `tools/nav-sync/<store>/`:

| File | Format | Purpose |
| --- | --- | --- |
| `nav-dynamic.json` | EDS sheet JSON | Uploaded to da.live; served by EDS |
| `nav-dynamic.txt` | TSV (`path\ttitle`) | Human-readable audit log; attached as CI artifact |
