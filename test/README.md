# Consent verification

Run `npm run test:unit` from the repository root to execute all `*.test.mjs`
files in `test/unit/`. Tests execute the production
modules in isolated Node VM contexts with storage, imports and drop-in boundaries
stubbed; no new test dependencies are required. Node reports an experimental VM
modules warning.

Test scenarios and assertions live in `test/unit/consent.test.mjs`. Shared VM
environments and their feature-specific mocks live in
`test/helpers/consent-environments.mjs`; each exported helper documents what it
simulates. Doubles used by a single scenario remain beside that test.

The upstream binary `consent.update` payload (`detail.consented`) controls both
`commerce-collection` and `commerce-recommendations`. Unknown topics are denied.
`getConsent()` (or an empty-string topic) returns this global boolean for loading
generic consented scripts; Commerce consumers continue to query their own topic.
An explicit `undefined` uses the default empty topic. Other invalid values such
as `null`, `false` and `0` are denied, even when global consent is granted.
The upstream `?consent=accept` / `?consent=decline` override is honored only on
loopback hosts (`localhost`, `127.0.0.1`, `[::1]`). It is ignored on AEM preview,
live and merchant storefront domains, so a URL parameter cannot grant production
consent. The override remains a local testing aid, not a production CMP.

SI integration must connect the merchant's CMP to the consent.update contract;
the current global boolean is sufficient. Map categories to Commerce topics only
if the CMP provides separate category decisions. This phase does not implement
a modal or persist a consent preference. Analytics synchronizes the collector's documented `mg_dnt`
transport opt-out cookie; this is not the future CMP preference cookie.

Revocation retains the store's product and purchase histories unchanged. It
blocks new writes, history reads for recommendations, and removes history from
existing recommendation container props. Reacceptance may reuse retained history.
History listeners use future-only ACDL events; activation/acceptance records the
current product, but does not replay past purchases.

Analytics subscriptions also exclude pre-consent events. The analytics event
adapter buffers authorized events in memory only while the SDK and collector
load, so events generated during setup are not lost. Once collector subscriptions
are configured, the adapter stops capture and clears the buffer; revocation also
clears it. Neither action clears localStorage or ACDL. On first analytics
initialization, the SDK publishes
one current page view instead of replaying the page's earlier views. Subscription
removal still delegates to the original SDK for callbacks not owned by the adapter.
The delayed phase waits for ACDL initialization to avoid reclassifying queued
pre-consent events when the data-layer script loads slowly.

Analytics loads SDK before collector, at most once after successful initialization.
Revocation disables forwarding and uses `mg_dnt` and AEP `setConsent` to opt out.
Requests already dispatched before revocation cannot be recalled. Transport
queues/retries in the actual third-party libraries require browser verification;
unit mocks do not establish that every pending request is cancelled.

The unit suite covers AEP consent calls using a mock; it does not validate a real
AEP datastream. For browser scenarios and execution instructions, see
[Cypress consent verification](../cypress/README.md#consent-verification).