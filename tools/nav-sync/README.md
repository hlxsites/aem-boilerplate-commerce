# nav-sync — Dynamic Category Navigation

Automatically generates storefront navigation from your Commerce category tree and publishes it to [da.live](https://da.live), while keeping full control over the result.

This approach uses Commerce as the source of category data, but stores the final navigation structure in a generated `nav-dynamic.json` file served by EDS. The generated file provides a working default navigation, while still allowing you to edit, extend, and customize the result directly in the CMS layer.

This makes the navigation both **automated and flexible**: Commerce provides the category backbone, and you can enrich it with additional content and rules.

> **Why `header-dynamic` and `nav-dynamic.json`?**
> The `-dynamic` naming is intentional. It lets you add this feature to an existing site without touching the current `header` block or `/nav` document. Both can coexist, so you can test the dynamic navigation in parallel before committing to it as the default.

<!-- -->

> **Note — ACO only (for now)**
> The reference implementation targets ACO / ACO Connector using the `navigation(family:)` GraphQL query.
> ACCS uses a different API (`categories` query) and would require a separate script.

## What you'll build

By the end of this setup, you'll have:

- A `nav-sync` script that fetches the category tree and publishes it to da.live
- A `header-dynamic` block that renders the dynamic navigation at runtime
- Full control to edit or override the published navigation in da.live
- A GitHub Actions workflow that keeps the navigation in sync on a schedule (optional)

## How it works

1. Fetches `config.json` from your live EDS site URL to get the Commerce endpoint and headers
2. Calls the ACO `navigation(family:)` GraphQL query for the requested store. The `family` is a product family defined in your ACO instance — it determines which part of the catalog tree is returned
3. Flattens the category tree into `path / title` rows
4. Writes local output files (`nav-dynamic.json`, `nav-dynamic.txt`) under `tools/nav-sync/<store>/`
5. Depending on the `--mode` flag:
   - `local` — stops here
   - `preview` — uploads to da.live and stages at the preview URL
   - `publish` (default) — uploads, previews, and publishes live via the AEM Admin API

The published sheet is served by EDS at `/nav-dynamic.json` (default store) or `/<store>/nav-dynamic.json` (other stores) and consumed by the `header-dynamic` block to render the nav.

## Prerequisites

Before starting, make sure you have:

- A working Commerce storefront on Edge Delivery Services
- An Adobe Commerce instance with categories configured (ACO or ACO Connector)
- Your storefront `config.json` set up with Commerce endpoints and headers
- A [da.live](https://da.live) account with write access to your site's content repository
- Node.js 22 or later installed locally

---

## Step 1: Add the nav-sync script

The `tools/nav-sync/` directory already contains the script in this repository. Copy it into your own storefront repo:

- `tools/nav-sync/nav-sync.js`

**Key design decisions in the script:**

- **Config is fetched from the live site URL** (`https://<site>/config.json`), not from the local filesystem. This means the script works without a local copy of your repo and is compatible with the [repoless](https://www.aem.live/docs/repoless) pattern.
- **Org and repo are derived from the site hostname** (`branch--repo--org.aem.live`), so no extra DA configuration is needed.
- **The GraphQL query is ACO-specific.** ACCS uses a different data model and would require a separate implementation.
---

## Step 2: Configure authentication

The script supports two authentication methods for uploading to da.live.

**Option A — `DA_TOKEN` (simplest for local runs):**

Copy the Bearer token from an active da.live browser session:

1. Open [da.live](https://da.live) and log in
2. Open DevTools → Network tab → click any request
3. Copy the value from the `Authorization` header (everything after `Bearer`)
4. Pass it as an environment variable:

```bash
DA_TOKEN="eyJhbGci..." node tools/nav-sync/nav-sync.js \
  main--my-repo--my-org.aem.live default my-family
```

**Option B — IMS server-to-server credentials (for CI / GitHub Actions):**

Create an OAuth server-to-server credential in the [Adobe Developer Console](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/) and set:

```bash
export DA_CLIENT_ID="<client-id>"
export DA_CLIENT_SECRET="<client-secret>"
```

> **⚠️ da.live permissions**
> The identity used to upload must be added to the `/**` path group in the da.live config sheet at `da.live/config#/{org}/{repo}/`.
>
> - For `DA_TOKEN`: use your Adobe account email.
> - For IMS server-to-server: use the technical account's IMS **profile email** (not the JWT `user_id`). To find it:
>
> ```http
> GET https://ims-na1.adobelogin.com/ims/profile/v1
> Authorization: Bearer <token>
> ```

**Without credentials**, the script still runs. It fetches and flattens the categories and writes local output files, but skips the DA upload. This is equivalent to running with `--mode local` and is useful for inspecting the category tree before committing to a publish.

---

## Step 3: Run the script

Run from the repository root:

```bash
node tools/nav-sync/nav-sync.js <site> <store> <family> [--mode <mode>]
```

| Argument | Description |
| --- | --- |
| `site` | EDS site hostname (e.g. `main--my-repo--my-org.aem.live`) |
| `store` | `default` or a store key from `config.json` (e.g. `spain`) |
| `family` | ACO product family — the family defined in your Commerce Optimizer instance that groups the categories you want in the navigation. Must be created in ACO first |
| `--mode` | `local`, `preview`, or `publish` (default: `publish`) |

### Modes

| Mode | Local files | DA upload | Preview | Publish live |
| --- | --- | --- | --- | --- |
| `local` | Yes | No | No | No |
| `preview` | Yes | Yes | Yes | No |
| `publish` | Yes | Yes | Yes | Yes |

- **`local`** — generates `nav-dynamic.json` and `.txt` locally. No DA credentials needed. Useful for inspecting the output before committing to a publish.
- **`preview`** — uploads to da.live and stages at the preview URL for review before going live.
- **`publish`** — full pipeline: upload, preview, and publish. Default when `--mode` is omitted.

### Examples

```bash
# Generate local files only (no credentials needed)
node tools/nav-sync/nav-sync.js main--my-repo--my-org.aem.live default my-family --mode local

# Upload and preview for review before going live
DA_TOKEN="..." node tools/nav-sync/nav-sync.js main--my-repo--my-org.aem.live default my-family --mode preview

# Full sync: upload, preview, and publish (default)
DA_TOKEN="..." node tools/nav-sync/nav-sync.js main--my-repo--my-org.aem.live default my-family

# Sync a secondary store
DA_TOKEN="..." node tools/nav-sync/nav-sync.js main--my-repo--my-org.aem.live spain my-family --mode publish
```

After a successful run you'll see:

```text
Site: main--thunderbolts-aco--adobe-commerce.aem.live
Mode: publish
[default] Starting sync...
[default] Fetching navigation (family: my-family)...
[default] Flattened 7 categories
✅ [default] Written tools/nav-sync/default/nav-dynamic.json
✅ [default] DA: saved /adobe-commerce/thunderbolts-aco/nav-dynamic.json
✅ [default] DA: previewed
✅ [default] DA: published
Done.
```

---

## Step 4: Add the header-dynamic block

The `blocks/header-dynamic/` directory in this repository contains a full fork of the default `header` block with dynamic navigation support added. Copy the entire directory into your storefront repo.

The key addition is a `buildNavSectionsFromJson` function that fetches the published JSON and builds the nav menu from it:

```javascript
async function buildNavSectionsFromJson(src) {
  let rows;
  try {
    const resp = await fetch(src);
    if (!resp.ok) return null;
    const json = await resp.json();
    rows = json.data || [];
  } catch {
    return null;
  }
  if (!rows.length) return null;

  const wrapper = document.createElement('div');
  wrapper.classList.add('default-content-wrapper');
  const rootUl = document.createElement('ul');
  wrapper.appendChild(rootUl);

  const dropdownMap = new Map();
  const groupMap = new Map();

  rows.forEach(({ path: catPath, title }) => {
    const segments = catPath.split('/').filter(Boolean);
    const topSlug = segments[0];

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = rootLink(catPath);
    a.textContent = title;
    li.appendChild(a);

    if (segments.length === 1) {
      rootUl.appendChild(li);
      const dropdownUl = document.createElement('ul');
      li.appendChild(dropdownUl);
      dropdownMap.set(topSlug, dropdownUl);
    } else if (segments.length === 2) {
      li.classList.add('nav-group');
      const groupItemsUl = document.createElement('ul');
      groupItemsUl.classList.add('nav-group-items');
      li.appendChild(groupItemsUl);
      const dropdownUl = dropdownMap.get(topSlug);
      if (dropdownUl) {
        dropdownUl.appendChild(li);
        groupMap.set(`${topSlug}/${segments[1]}`, groupItemsUl);
      }
    } else {
      const groupKey = segments.slice(0, 2).join('/');
      const target = groupMap.get(groupKey) || dropdownMap.get(topSlug);
      if (target) target.appendChild(li);
    }
  });

  rootUl.querySelectorAll('.nav-group-items:empty').forEach((ul) => ul.remove());
  rootUl.querySelectorAll(':scope > li > ul:empty').forEach((ul) => ul.remove());

  return wrapper;
}
```

Inside the `decorate` function, the block replaces the static nav sections with the dynamic content:

```javascript
const navSections = nav.querySelector('.nav-sections');

const navCategoriesMeta = getMetadata('nav-categories');
const navCategoriesPath = navCategoriesMeta
  ? new URL(navCategoriesMeta, window.location).pathname
  : rootLink('/nav-dynamic.json');
const dynamicSections = await buildNavSectionsFromJson(navCategoriesPath);
if (navSections && dynamicSections) {
  navSections.textContent = '';
  navSections.appendChild(dynamicSections);
}
```

**How the nav tree is built from the JSON:**

- Depth-1 rows (e.g. `/women`) become top-level bar items with a dropdown
- Depth-2 rows (e.g. `/women/clothing`) become group headings inside the dropdown
- Depth-3+ rows are nested under their depth-2 parent
- If the fetch fails or returns no data, the static `/nav` document content is preserved as a fallback
- The `nav-categories` metadata key on any page can override the JSON source

> **💡 Customization**
> You can customize navigation beyond what the category tree provides — for example, adding promotional links, images, or non-commerce pages — by editing the published `nav-dynamic.json` directly in da.live, or by extending the `header-dynamic` block logic.

---

## Step 5: Set up the GitHub Actions workflow (optional)

The GitHub Actions workflow is optional. If you prefer to run the sync manually, you can run the script directly from the command line (see Step 3) without setting up any workflow. The workflow is useful when you want the navigation to stay current automatically without manual intervention.

The workflow at `.github/workflows/sync-nav.yml` runs automatically every day at midnight UTC and can also be triggered manually. Copy it into your storefront repo. For more details on scheduling recurring tasks with GitHub Actions in AEM, see the [AEM docs on recurring tasks](https://www.aem.live/docs/recurring).

> **💡 When to disable the schedule**
> Once the navigation is stable and you have customized `nav-dynamic.json` in da.live, **disable the `schedule` trigger** to prevent automated runs from overwriting your edits. Re-enable it or trigger manually whenever taxonomy changes need to be picked up.

**Required repository secrets** (at least one set):

- `DA_TOKEN` — pre-generated Bearer token, or
- `DA_CLIENT_ID` + `DA_CLIENT_SECRET` — IMS server-to-server credentials

**Manual trigger inputs:**

| Input | Description |
| --- | --- |
| `site` | EDS site hostname (defaults to `NAV_SITE` env in the workflow) |
| `store` | Store to sync. Leave blank to run all configured stores. |
| `family` | ACO product family (required; must be created in ACO first) |
| `mode` | `publish` (default), `preview`, or `local` |

**To add more stores**, add a new step for each. Each step runs independently so one store's failure doesn't block the others:

```yaml
- name: Sync <store> store
  if: github.event_name == 'schedule' || github.event.inputs.store == '<store>'
  env:
    DA_TOKEN: ${{ secrets.DA_TOKEN }}
    DA_CLIENT_ID: ${{ secrets.DA_CLIENT_ID }}
    DA_CLIENT_SECRET: ${{ secrets.DA_CLIENT_SECRET }}
  run: |
    node tools/nav-sync/nav-sync.js "$NAV_SITE" <store> "$NAV_FAMILY" --mode publish
```

After each run, the output `.txt` files are uploaded as a `nav-categories` artifact so you can inspect the synced categories without pulling the repo.

---

## Step 6: Verify the result

After running the script (locally or via GitHub Actions):

1. **Check the local output**: Open `tools/nav-sync/default/nav-dynamic.json` to inspect the generated category sheet
2. **Check da.live**: Navigate to [da.live](https://da.live) → your org/repo and verify the `nav-dynamic.json` file exists
3. **Check the live site**: Visit your storefront and verify the navigation reflects the category tree
4. **Test the fallback**: Rename `nav-dynamic.json` in da.live to confirm the header falls back to the static `/nav` document

**Expected JSON output:**

```json
{
  "total": 7,
  "offset": 0,
  "limit": 7,
  "data": [
    { "path": "/women", "title": "Women" },
    { "path": "/women/clothing", "title": "Women's Clothing" },
    { "path": "/women/clothing/pants", "title": "Women's Pants" },
    { "path": "/women/clothing/shirts", "title": "Women's Shirts" },
    { "path": "/men", "title": "Men" },
    { "path": "/men/clothing", "title": "Men's Clothing" },
    { "path": "/men/clothing/pants", "title": "Men's Pants" }
  ],
  ":type": "sheet"
}
```

---

## Multistore support

For multistore setups, the script uses the store key from `config.json` to resolve the correct headers for each store view. Run the script once per store:

```bash
node tools/nav-sync/nav-sync.js main--my-repo--my-org.aem.live default my-family
node tools/nav-sync/nav-sync.js main--my-repo--my-org.aem.live spain   my-family
node tools/nav-sync/nav-sync.js main--my-repo--my-org.aem.live fr-ca   my-family
```

Each store's sheet is published to its own path (`/nav-dynamic.json`, `/spain/nav-dynamic.json`, `/fr-ca/nav-dynamic.json`). The `header-dynamic` block uses `rootLink('/nav-dynamic.json')` which automatically resolves to the correct store-scoped path.

In the GitHub Actions workflow, add one step per store so they run independently.

---

## Flexibility and customization

The generated navigation is only the starting point. You can customize it in da.live or extend it through the `header-dynamic` block. This enables use cases such as:

- Supporting multiple `nav-dynamic.json` files for different customer groups
- Filtering navigation entries based on the active customer segment
- Adding images in arbitrary locations inside the menu structure
- Including non-category or non-commerce links
- Introducing custom navigation behavior without changing the sync workflow

Commerce defines the base structure, but you are not limited to Commerce-only entries or a rigid hierarchy.

---

## Output files

Each run writes two files per store under `tools/nav-sync/<store>/`:

| File | Format | Purpose |
| --- | --- | --- |
| `nav-dynamic.json` | EDS sheet JSON | Uploaded to da.live; served by EDS |
| `nav-dynamic.txt` | TSV (tab-separated `path` and `title`) | Human-readable audit log; attached as CI artifact |

---

## Known limitations

- **Sync can overwrite manual edits**: Generated content is replaced on each sync run unless the workflow is disabled. There is no automatic merge strategy for preserving manual edits made in da.live.
- **ACO only**: The reference implementation targets ACO. ACCS requires a separate script with different query logic.
- **Scheduled sync introduces latency**: Category changes in Commerce are not reflected on the storefront until the next script run. For immediate updates, trigger the workflow manually or run the script locally.
- **Missing page strategy needed**: The script generates navigation links, but corresponding product listing pages must still exist in da.live. Categories without a destination page will produce broken links.
- **Depends on correct Commerce configuration**: Each store view must have the correct endpoint and headers configured in `config.json`.

---

## Troubleshooting

### "No navigation items for family" warning

> The family name doesn't match any family configured in your ACO instance. Verify the family name in the ACO admin and ensure it matches the `<family>` argument.

### DA upload returns 401 or 403

> Your token has expired or the identity lacks permissions. For `DA_TOKEN`, copy a fresh token from da.live DevTools. For IMS credentials, verify the technical account email is added to the da.live config sheet at `da.live/config#/{org}/{repo}/`.

### Navigation doesn't update on the live site

> The script runs three steps: save → preview → publish. Check the script output for any skipped steps. If preview or publish failed, you can trigger them manually from the da.live UI.

### Header still shows old/static navigation

> Verify that `nav-dynamic.json` is accessible at `https://<site>/nav-dynamic.json`. Check that the `header-dynamic` block fetches this path and that there are no caching issues (clear CDN cache if needed).
