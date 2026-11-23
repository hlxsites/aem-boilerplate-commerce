# Commerce B2B Requisition List View Block

## Overview

The Commerce B2B Requisition List View block surfaces a buyer's requisition list using the `@dropins/storefront-requisition-list-view` drop-in. It renders the contents of a requisition list and provides a route back to the grid. The block gates access by authentication and feature availability.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| – | – | – | This block has no authorable configuration. | – | – |

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block yet. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated users**: Required. Unauthenticated users are redirected to `CUSTOMER_LOGIN_PATH`.
- **Feature availability**: If `isRequisitionListEnabled()` returns false, the block renders nothing (feature off).
- **Empty state**: When the buyer has no requisition lists, the grid renders an empty state (`[data-testid="empty-list"]`).

### User Interaction Flows

1. **Initialization**: Auth check → feature flag check → render requisition list with `getRequisitionList(uid)` data and renders `RequisitionListView`.
3. **Detail → Grid**: `routeRequisitionListGrid()` redirects to the requisition list .

## Error Handling

- **API errors**: The requisition list drop-ins handle their own error display.
- **Auth/feature checks**: If unauthenticated, redirect to login. If feature disabled, return early (no UI).
- **Data loading**: Grid and detail views render loading states provided by the drop-ins; no additional handling is required in the wrapper.

## Print integration

During requisition-list printing, the drop-in adds `requisition-list-printing`
to the body and mounts a separate print root as a direct body child, outside
`main`. This block's print stylesheet hides the site's direct-body `header`,
`main` and `footer`, keeping navigation and other page content out of the PDF
without hiding the print root.

The rule applies only to print media while that body class is present. Normal
screen rendering and ordinary browser printing are unchanged.

## Catalog adapters

The requisition-list initializer uses PDP's existing raw-response APIs without
changing PDP itself. Configurable selections are matched by option/value labels
to catalog IDs, not reconstructed from Commerce UIDs. Only a resolved simple
variant is accepted; a parent fallback is reported as unavailable.

Product lookups and configurable refinement use at most four concurrent requests
per adapter invocation. Parent lookups are shared within an enrichment operation.
The full-list loader separately batches product SKUs in groups of 50.

Only exact prices with the catalog `visible` role are exposed. Genuine zero
amounts remain zero; absent final amounts are not replaced with regular prices,
parent prices or range minima. Range-only products do not receive a calculated
unit price. Existing table handling of absent prices is unchanged.

Failed individual lookups retain successful results and report structured
warnings through `context.onWarning`, or the console for legacy callers.
These PDP APIs do not accept abort signals. The adapters stop scheduling work
after abort, discard in-flight results and reject cancellation without warnings.

Run the focused adapter tests with:

```sh
node --test test/requisition-list-adapters.test.mjs
```
