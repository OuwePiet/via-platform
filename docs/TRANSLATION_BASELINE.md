# VIA translation baseline

Status: research/baseline. No translation provider is locked in yet.

## Product direction

VIA is an international DeSo social + NFT interface. Translation is therefore treated as a core social usability capability, not as a blockchain rewrite of the original post.

- Keep the original DeSo post body unchanged and visible as the source of truth.
- Offer a per-post `Translate` action.
- Offer `Show original` after translation.
- Respect a VIA interface/reader language preference.
- Translate on user action first; do not automatically translate every feed item.
- Cache translations by post hash + target language where technically and legally appropriate.
- Preserve regional language codes where they matter, for example `pt-BR`.
- Keep the translation provider behind an abstraction so VIA can change provider without changing post UX.
- Never claim that a translated copy is stored on DeSo unless it actually is.

## DeSo interoperability

DeSo posts provide the original body and can carry application-defined ExtraData. No verified native DeSo translation service or standardized post-language ExtraData key has been established for VIA yet.

Before VIA writes language metadata on-chain, verify whether an interoperable language key is already used by active DeSo applications. Avoid inventing a conflicting ExtraData convention.

## Existing app references

Observed/researched references for UX comparison:

- DeSocialWorld: multilingual interface/language selection and a per-post `Translate Post` action.
- Focus: per-post `Translate` action.
- Diamond: translation was not visible in the supplied post menu evidence, so VIA must not assume identical behavior.
- DeSoOps / Web3 Simplified (John Jardin): separate research source for DeSo creator/collector management ideas; not evidence for a translation provider.

The provider used by DeSocialWorld or Focus has not been verified. Do not encode assumptions about Google, Azure, DeepL or another provider into VIA.

## Cost/safety baseline

- Prefer a provider with a usable free allowance for the MVP.
- Add a hard monthly usage/cost ceiling before enabling a paid translation path.
- Do not send wallet secrets, private keys, session credentials or unrelated profile data to a translation provider.
- Send only the text needed for the requested translation.
- Do not execute translated text, metadata or returned HTML/JavaScript.

## Next implementation gate

Safe to build before provider selection:

1. provider-independent translation types/interface;
2. language preference model;
3. per-post Translate / Show original UI states;
4. cache-key design;
5. graceful unavailable/error state.

Provider API calls, billing configuration and any on-chain language metadata write require a separate reviewed implementation.