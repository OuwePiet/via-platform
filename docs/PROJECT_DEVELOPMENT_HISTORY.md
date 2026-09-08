# VIA development history and decision rule

## Status

This document is a permanent project rule for VIA / viadeso.online.

## One continuous project

VIA was developed step by step over an extended period. During that process the project used several working names because earlier names were unavailable or no longer suitable. Those older names do **not** represent unrelated projects. They are earlier development stages of the same product that is now VIA / viadeso.online.

Therefore documents that mention earlier names such as Lumen, Vero, Velcon or other temporary names must be read as historical VIA development material unless the content itself clearly belongs to another project.

## How historical documents must be treated

The historical documents and modules are not random idea dumps. Many were created after repeated research, comparison, discussion, reconsideration and refinement. They often contain decisions that were deliberately assembled from the best elements available at that moment.

For that reason VIA development follows these rules:

1. **viadeso.online is the current source of truth for the product that exists now.**
2. **Older documents remain design and research evidence.** A module is not discarded merely because it uses an older project name.
3. **Previously researched modules are presumed to contain considered work.** They must be compared with the current implementation before changing, replacing or rejecting them.
4. **Keep the best ingredients.** When several documents solve the same problem differently, retain the safest, clearest, lowest-cost and most useful combination rather than blindly adopting the newest text.
5. **Do not restart solved research without reason.** Re-research is appropriate when technology, law, pricing, security assumptions, provider availability or DeSo capabilities may have changed, or when prior evidence was weak.
6. **Do not preserve obsolete claims just because they are documented.** Statements such as guaranteed permanence, zero cost forever, automatic security, unsupported node failover, regulatory certainty or unverified provider capabilities must be revalidated before they become VIA product claims.
7. **Safe and useful missing functionality may be incorporated into VIA.** Existing implementation may be adjusted when necessary to preserve the stronger historical design.
8. **Items that are not yet suitable for implementation go to Fase 3 with the reason.** They are retained for later discussion rather than silently discarded.

## Module maturity

A historical module can have one of these practical states:

- **Established baseline** — repeatedly researched and accepted; preserve unless new evidence requires change.
- **Implemented** — represented in current VIA code or production behaviour.
- **Needs modern verification** — concept is established, but current APIs, costs, legal conditions, security or provider details must be checked again before implementation.
- **Fase 3 / discussion** — intentionally held back because it needs owner approval, stronger authentication, transaction safety, legal review, cost proof or additional research.
- **Rejected detail, retained goal** — the original implementation method is unsafe, expensive or obsolete, but the user goal behind it remains valid and should be solved another way.

## Financial design rule

VIA was conceived to avoid becoming a platform that creates recurring personal costs for its owner before it has revenue. Development and testing should therefore use free or near-zero-cost infrastructure where practical, avoid running an own DeSo node unless demonstrably necessary, and prevent fixed costs from growing ahead of real use.

At the same time VIA is intended to have a sustainable revenue model. Service fees, sponsorship, pay-per-feature services or other transparent revenue sources may be used when they fit the platform, provided costs and user impact are clear. Expensive features should, where practical, finance their own external costs and may include a reasonable VIA margin. Revenue is not treated as guaranteed.

The decision sequence for a new feature is therefore:

**What does it add? -> Was it already researched? -> Can it run safely and cheaply? -> Can existing DeSo/public infrastructure do it? -> If it creates external cost, can that cost be covered by the feature itself? -> Does VIA gain sustainable value without harming the relaxed user experience?**

## Product character to preserve

VIA is intended as a friendly, informal DeSo social + NFT environment with room to grow internationally. It should be easy to enter and pleasant to use, while its architecture remains capable of scaling to a much larger audience. Optional extras such as games, discovery tools or analytics must remain optional and must not obstruct the core social/NFT experience.

VIA does not use gambling as a product mechanic.

## Working method

Continue work in at least three tracks where useful:

- inspect historical documents and outside ecosystem ideas for unique, still-relevant ingredients;
- implement safe and useful improvements in VIA;
- record deferred or disputed ideas in Fase 3 with a reason.

All production changes continue to follow the branch -> preview -> PR -> merge -> production-check workflow.

## Interpretation rule

When a future discussion appears to contradict an older document, do not assume the older document was simply wrong or forgotten. First determine whether the difference is:

- a deliberate later decision;
- a project-name transition;
- an implementation improvement;
- a changed external fact;
- a safety/cost correction; or
- a genuinely unresolved conflict.

Only after that comparison should VIA be changed.
