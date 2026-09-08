# VIA Resilience & Update Baseline

## Purpose
VIA must remain maintainable, low-cost and portable. DeSo is the primary protocol layer today, but it must not become a single architectural point of failure for VIA.

## Protocol abstraction
VIA product modules should call a VIA protocol/service interface rather than spreading provider-specific assumptions through the UI.

Primary path today:

`VIA UI -> VIA service/protocol adapters -> DeSo`

Resilience path to keep technically possible:

`VIA UI -> VIA service/protocol adapters -> alternative open protocols/services`

Historical project research identifies Nostr as an exit-path candidate, Bitcoin/Lightning where payment functionality genuinely requires it, and external content-addressed/durable storage for media. This is a contingency architecture, not an automatic migration decision.

## No own nodes by default
VIA does not operate its own DeSo, Nostr, Bitcoin, AI/GPU or storage nodes merely for sophistication. Prefer verified external/public infrastructure and provider abstraction while it is reliable, secure, legally usable and economically sensible. Running infrastructure requires a separate cost/security/availability decision.

## Update engine: three levels

### Level 1 — automatic data updates
May update automatically after validation and bounded retries: public rates, known service health, supported-provider metadata, compatibility data and other non-executable information.

Rules:
- validate schema and source;
- cache last known good value;
- bounded timeout/retry;
- never execute fetched data as code;
- failure must degrade safely.

### Level 2 — prepared software/config updates
Dependencies and controlled configuration may be detected and prepared automatically, but must pass build, security and preview checks before adoption.

Preferred flow:

`detect -> isolated branch -> tests/build -> Vercel preview -> review/PR -> merge`

### Level 3 — functional/code/protocol changes
Never silently replace production code or switch protocol/payment/storage architecture. Prepare evidence and a preview first. Human approval remains required unless a future narrowly-scoped rule has separately been reviewed and approved.

## Failover is not migration
A temporary API outage is not evidence that DeSo has ended. VIA may use verified read failover where safe, but must not automatically migrate identities, payments, signing, ownership or NFT semantics to another protocol because an endpoint is unavailable.

Any real DeSo exit requires explicit verification of the failure/end state, mapping of identity/social/content/ownership semantics, export/recovery testing, security review and an approved migration plan.

## Paid external services
VIA should avoid owner-funded usage risk. Where a feature creates an external per-use cost:

`show total price -> collect/confirm payment -> create bounded one-use entitlement -> call provider -> deliver result -> record cost/service outcome`

The displayed total can include the external cost, payment overhead and a transparent VIA service margin. Provider calls must not be released before the required payment/entitlement is confirmed.

Free browser-side processing remains preferred where practical.

## Recovery principles
- Git and tested deployments are the software recovery source.
- Keep provider-specific code behind adapters where practical.
- Keep media/storage references portable where practical.
- Preserve originals and provenance needed for export/recovery.
- Maintain a last-known-good configuration.
- Roll back failed releases rather than patching production blindly.
- Never store seed phrases/private keys in update, monitoring or failover systems.

## Status model for a future VIA Update dashboard
- Green: checked and safe/current.
- Amber: update/change detected; review required.
- Red: failed validation, incompatible or blocked.

The dashboard reports state; it is not permission to execute arbitrary code.

## Product rule
VIA should use DeSo as a strong foundation without making the future of VIA depend on one company, endpoint, node operator or infrastructure provider.