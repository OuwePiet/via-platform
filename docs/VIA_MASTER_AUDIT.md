# VIA Master Audit

## Purpose
This file is the control sheet for decisions made under Lumen, Vero, Velcon and VIA. Earlier approved decisions are not silently discarded because the project name changed or because the implementation moved to a new repository structure.

Every historical item is classified as one of four states:

- **BUILT** — present in current VIA and technically acceptable.
- **MISSING** — approved or strategically required, but not yet present in current VIA.
- **MODERNIZE** — the goal remains approved, but the old implementation, wording, provider, security claim or technical method must be updated.
- **FASE 3** — not adopted now; keep it visible with the reason.

This audit is cumulative. New historical discoveries are added here before they are forgotten again.

## Governing rules
1. viadeso.online is the current baseline.
2. Later explicit approved decisions supersede earlier conflicting choices.
3. Historical approval remains meaningful unless explicitly replaced.
4. Old code is never copied blindly; preserve the goal and modernize unsafe or obsolete implementation.
5. DeSo is the primary foundation, not the ceiling.
6. No direct writes to `main`: branch -> preview -> review -> PR -> merge -> production check.
7. No own DeSo/Nostr/Bitcoin/storage/AI nodes by default.
8. No paid external service call before cost/entitlement is confirmed.
9. No gambling on VIA.
10. Rejected or postponed ideas remain traceable in Fase 3 with the reason.

## Core product
| Decision | Audit state | Notes |
| --- | --- | --- |
| Social network + NFT marketplace in one VIA platform | BUILT / CONTINUE | Must remain a combined experience, not an NFT-only site. |
| Home/social feed | BUILT / CONTINUE | Public/read-only foundation exists; richer posting/writes remain security-gated. |
| Marketplace/NFT discovery | BUILT / CONTINUE | Read-only marketplace and NFT routes exist; transaction writes remain gated. |
| Search creators/users/content | BUILT / CONTINUE | Continue improving discovery. |
| Profile | BUILT / CONTINUE | Read-only profile layer exists. |
| Messages/private communication | MISSING / SECURITY-GATED | Historical core item; requires safe authenticated design before writes. |
| Wallet overview / active $DESO context | PARTIAL / MODERNIZE | Public/read-only context is safe; wallet actions require real authenticated session/signing. |
| Multi-account switching | MISSING / SECURITY-GATED | Approved historically; must block switching during pending actions. |
| International languages/translation | PARTIAL / MODERNIZE | Baseline exists; provider/cost/privacy still to be finalized. |
| World Time/local time | BUILT | Preserve. |
| Mobile, iPhone, iPad/tablet, Android/Samsung and desktop support | BUILT / CONTINUE | Tablet is first-class, not stretched mobile. |

## NFT Engine
Historical approved engine remains the target. Current VIA implementation is compared against it item by item.

| Decision | Audit state | Notes |
| --- | --- | --- |
| Existing DeSo NFT import | PARTIAL | Read-only collection exists; full user import flow requires authenticated account proof. |
| Created by Me / Owned by Me | PARTIAL | Data concepts exist; authenticated personalized management still incomplete. |
| Copies/editions/serials | PARTIAL | Read-only copies are visible; full serial management remains to audit. |
| Minimum bid | PARTIAL | Read-only data supported where available. |
| Buy Now price | PARTIAL | Historical read-only implementation approved; current API semantics must stay verified. |
| For-sale count | BUILT / PRESERVE | Earlier approved read-only behavior should not disappear. |
| Set NFT for Sale | MISSING / SECURITY-GATED | Explicit signing and owner verification required. |
| Update Price / Remove from Sale | MISSING / SECURITY-GATED | Keep explicit review before signing. |
| Claim NFT | FASE 3 / VERIFY | Historical approval exists, but modern DeSo semantics and abuse potential must be revalidated before implementation. |
| Transfer NFT | MISSING / SECURITY-GATED | Owner verification + explicit signing. |
| Burn NFT | MISSING / SECURITY-GATED | No bulk burn, no one-click burn, no undo promise. |
| Unlockable Content | MISSING / SECURITY-GATED | Never expose secret content in public metadata; ownership verification required. |
| Mint NFT | MISSING / SECURITY-GATED | Historically initially restricted to @OuwePiet; current safe signing/auth design must precede mainnet writes. |
| Royalties | PARTIAL / VERIFY | Preserve creator/holder royalty goal; verify current DeSo fields/semantics before writes. |
| Categories/tags/collections | PARTIAL | Continue creator/collector organization layer. |
| Media Repair | PARTIAL / CONTINUE | Historical core feature; provenance, creator rights and media hash checks remain required. |
| Durable media backup/storage | PARTIAL / MODERNIZE | DeSo reference + reviewed external durable storage; never claim ordinary storage is permanent. |
| Creator Dashboard | MISSING / PARTIAL | Historical fixed component; build in stages around read-only data first. |
| Vault | MISSING / SECURITY-GATED | Strictly separate from wallet/Admin/Marketplace; no public URLs; strong re-auth for dangerous actions. |

## NFT presentation protection
### Approved intent
VIA should make casual copying of displayed NFT media harder and mark VIA-presented media visibly without modifying the original NFT file.

### Required modern implementation
- subtle **silver VIA leaf/logo** in the lower-right of displayed NFT media;
- protective overlay above presentation media to prevent easy drag interaction;
- suppress standard image dragging/context-menu actions on protected presentation surfaces where practical;
- optionally render a protected presentation copy through Canvas when warranted;
- never overwrite or alter the creator's original source asset solely to add the VIA mark;
- do not expose unlockable/high-resolution originals to unauthorised users;
- owner/creator access policy must be based on verified ownership/rights, not only username;
- provenance/storage hash checks remain separate from visual watermarking.

### Accuracy boundary
This is **copy deterrence**, not absolute copy prevention. VIA must never claim that screenshots, browser inspection, photography of a screen or all forms of copying can be made impossible.

**Audit state: MISSING — ACTIVE BUILD TARGET.**

## Media and storage
| Decision | Audit state | Notes |
| --- | --- | --- |
| DeSo remains source for identity/NFT ownership/status | BUILT / CONTINUE | Protocol abstraction still required for resilience. |
| External media is separate from on-chain ownership | BUILT / CONTINUE | Storage class should be visible to user. |
| IPFS/Arweave-style durable layer | PARTIAL / MODERNIZE | Provider/pricing/retention must be current and verifiable. |
| Ordinary object storage such as R2 | RESEARCH / MODERNIZE | Suitable for normal/temporary media and previews, not equivalent to permanent NFT storage. |
| Creator pays caused storage/compute cost where needed | POLICY BUILT | Prepaid before external billable resource is created. |
| Permanent Storage product direction | MODERNIZE | Preserve durable-preservation goal; avoid absolute permanence guarantees. |
| Museum/archive presentation | MISSING / PRODUCT TRACK | Strong differentiator; retain as future active product track. |

## VIA Studio
| Decision | Audit state | Notes |
| --- | --- | --- |
| Free local image editor | BUILT POC | No paid provider or blockchain action required. |
| Touch/stylus on iPad/tablet | BUILT POC / TEST | Must remain first-class. |
| Local PNG export | BUILT POC | Continue with crop/rotate/text/shapes/undo etc. |
| 2.5D preview | MISSING / NEXT STAGE | Local/browser-side where possible. |
| True AI image-to-3D | FASE 3 / PREPAID | Only after provider/security/cost validation. |
| Use for NFT hand-off | MISSING | Should feed draft -> metadata -> storage -> Review Mint. |

## Security and recovery
| Decision | Audit state | Notes |
| --- | --- | --- |
| No seed phrases or unrestricted master private keys | HARD RULE | Never weaken. |
| Read-only before authenticated writes | BUILT / CONTINUE | Current session is not sufficient for signing/admin/payment actions. |
| Authenticator / stronger re-auth for dangerous actions | MISSING / FUTURE WRITE GATE | Historical approved requirement. |
| No automatic blockchain write retries | HARD RULE | Read retries can be bounded; writes require explicit state handling. |
| Safe Git/Vercel recovery | BUILT / CONTINUE | Branch/preview/PR/production workflow. |
| Update Engine detects rather than blindly self-modifies code | BASELINE BUILT | No arbitrary code execution from metadata/databases. |
| DeSo shutdown contingency | BASELINE BUILT | Protocol abstraction; Nostr candidate, Bitcoin/Lightning when functionally appropriate, external portable storage. |

## Commercial baseline
| Decision | Audit state | Notes |
| --- | --- | --- |
| Keep owner fixed costs near zero during build/test | HARD RULE | Do not activate paid infrastructure automatically. |
| No own nodes by default | HARD RULE | Third-party/serverless/pay-per-use preferred. |
| Prepaid external service rule | HARD RULE | Quote -> payment/entitlement -> bounded provider call -> result. |
| Transparent VIA service margin | ACTIVE BUSINESS RULE | User sees total before purchase. |
| Sponsorship/Spotlight | PARTIAL / PRODUCT TRACK | Must remain clearly labelled and not damage relaxed atmosphere. |
| Marketplace/service fees | SECURITY/LEGAL-GATED | Transparent; only after safe payment/signing/legal checks. |

## Discovery and market differentiation
Active VIA Market Radar asks continuously:
- what users in 2026/2027 now expect as normal;
- what DeSo currently lacks;
- what competing social/NFT/creator products do well or badly;
- what VIA can add without unnecessary infrastructure/cost.

Priority differentiators currently retained:
- social + NFT in one journey;
- modern creator/collector discovery;
- translation/international access;
- storage transparency and recovery;
- durable creator/museum/archive media options;
- VIA Studio creative tools;
- NFT presentation protection with VIA silver-leaf marking;
- simple onboarding without exposing blockchain complexity;
- transparent costs and prepaid premium services;
- protocol resilience beyond DeSo.

## Fase 3 retained items
Keep visible until separately approved/revalidated:
- cross-chain trading/bridges;
- broad fiat/crypto payment expansion;
- open minting for everyone;
- bulk blockchain writes/transfers;
- opaque rankings or network-wide fraud accusations;
- autonomous code ingestion/self-modifying production;
- own nodes/validators/staking infrastructure;
- advanced AI/3D requiring paid compute until prepaid economics are proven;
- gambling/wagering — rejected for VIA;
- automatic DeSo -> Nostr migration without explicit verification/approval.

## Audit working method
For each next module:
1. search historical project documents first;
2. inspect current VIA implementation;
3. mark BUILT / MISSING / MODERNIZE / FASE 3;
4. preserve the approved goal;
5. modernize unsafe/obsolete implementation details;
6. build safe missing parts on a branch;
7. test preview;
8. PR/merge only when green;
9. verify production;
10. update this audit when the status changes.

This file is deliberately a living control document. It prevents small approved details from being lost between project names, chats, devices or development phases.