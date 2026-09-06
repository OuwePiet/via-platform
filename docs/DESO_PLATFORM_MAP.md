# DeSo platform map voor VIA

Doel: DeSo zo veel mogelijk als primaire openbare databron voor VIA gebruiken, zonder private sleutels of onnodige eigen databasekopieen.

## Nu veilig benutten — read-only

- Publieke profielen: username, public key, bio, profielfoto en publieke statistieken waar de node/API ze levert.
- Publieke posts: tekst, datum, afbeeldingen, video en publieke engagement-tellingen.
- Replies/threads: openbare reacties en gesprekstructuur.
- NFT-data: NFT-posts, eigenaar/eigendom, copies, for-sale status en prijs/biedinformatie voor zover de actuele API dit betrouwbaar levert.
- Sociale signalen: follows/followers, likes, reposts/quotes en diamonds als openbare data wanneer een ondersteunde endpoint/SDK-functie dit levert.
- Deelbare permanente VIA-routes: /post/[hash] en /nft/[hash], met DeSo als bron.

## DeSo als voorraadmagazijn

VIA behandelt DeSo als het primaire openbare voorraadmagazijn voor blockchain- en sociale gegevens. De interface haalt bestaande data op, ordent die en presenteert die zonder onnodige duplicatie.

Per object onderscheiden we vier soorten bewaarstatus:

1. **DeSo on-chain** — de relevante post/blockchaingegevens worden rechtstreeks uit DeSo gelezen.
2. **Media extern gekoppeld** — de on-chain post of NFT bevat een URL naar beeld/video/audio; de mediabytes zelf zijn daarmee niet automatisch on-chain of permanent gegarandeerd.
3. **Media niet beschikbaar** — de on-chain gegevens bestaan nog maar de gekoppelde mediabron reageert niet of is verdwenen.
4. **Media extra veiliggesteld** — alleen gebruiken wanneer VIA later een aantoonbare redundante/permanente opslaglaag heeft ingericht en getest.

Deze status mag op post- en NFT-detailpagina's worden getoond en later als filter worden gebruikt. VIA claimt nooit dat externe media permanent on-chain staat enkel omdat een URL in DeSo-data voorkomt.

## Eerstvolgende Fase 1 uitbreidingen

1. Profielkaart rijker maken met beschikbare on-chain/sociale profielvelden.
2. Publieke follows/followers als read-only navigatie toevoegen nadat endpoint en paginatie zijn geverifieerd.
3. NFT-detail verrijken met aantoonbare owner/copies/sale/bid velden; geen 'verified' label zonder echte bronwaarde.
4. Post/NFT metadata gebruiken voor betere deelpreview/SEO, zonder te doen alsof externe media zelf on-chain staan.
5. Herbruikbare DeSo data-adapter maken zodat alle VIA-schermen dezelfde normalisatie, timeout, retry en foutafhandeling gebruiken.
6. Bewaarstatus consequent tonen op post- en NFT-detailweergaven.

## Fase 2 — alleen na ontwerp/goedkeuring

De officiele deso-protocol SDK ondersteunt Identity, account switching, progressieve permissions, signing/submitting, encrypted messaging en transactiebouwers. Voor VIA betekent dit later mogelijk:

- login en multi-account;
- posten/reply/like/repost/follow/diamond;
- private/encrypted messaging;
- NFT mint/bid/buy/transfer;
- minimale, progressief gevraagde transaction permissions.

Voor deze acties geldt: nooit private keys/seeds opslaan; geen UNLIMITED/God Mode; permissions per functie zo klein mogelijk houden.

## Niet verwarren met blockchain-opslag

Een DeSo-post/NFT kan URLs naar afbeeldingen/video bevatten. Een URL in on-chain metadata betekent niet automatisch dat de mediabytes permanent op de blockchain staan. VIA toont daarom alleen claims die uit de actuele data/architectuur aantoonbaar volgen.

## Technische bronkeuze

- Huidige VIA read-only adapter: https://node.deso.org/api/v0/...
- Officiele SDK: `deso-protocol`; standaard node is https://node.deso.org en een andere nodeURI is configureerbaar.
- SDK kan read-only data ophalen zonder vooraf transactiepermissies te vragen.
- Voor toekomstige writes: progressieve permissions gebruiken en signing door de officiele Identity/SDK-laag laten afhandelen.

## Bouwregel

Eerst bestaande DeSo-data hergebruiken. Alleen aanvullende VIA-data buiten DeSo opslaan wanneer die niet betrouwbaar uit DeSo afgeleid kan worden. DeSo/on-chain blijft de bron van waarheid voor blockchain-eigendom en transacties.