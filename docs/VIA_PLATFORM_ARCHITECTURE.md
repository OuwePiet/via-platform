# VIA platformarchitectuur

`viadeso.online` is het product. Historische namen zoals Velcon, VERO en Lumen zijn uitsluitend bronmateriaal.

## Productkern

VIA wordt als één DeSo-native platform opgebouwd uit drie actieve sporen die dezelfde publieke identiteit, navigatie en databronnen delen.

### 1. Social
- DeSo feed: Hot, Recent, Following en Media.
- Creator discovery, zoeken en publieke profielen.
- Posts, replies, social graph en read-only notificaties.
- Publieke VIA-links zijn deelbaar buiten VIA.
- Schrijfacties zoals follow, like, repost, diamond en posting komen pas achter aantoonbaar veilige DeSo signing.

### 2. NFT & Creator
- Publieke DeSo NFT-collecties als kern van VIA.
- Schaalbare collectie-weergave voor grote accounts.
- NFT-detail, media, serials, verkoopstatus, prijs, filters en sortering.
- Creator-profiel en NFT-collectie worden één doorlopende ervaring.
- Mint, buy, bid, auction, transfer, burn, claim en unlockables worden modulair toegevoegd; geen transactiestroom gaat live zonder signing-, kosten- en productietests.

### 3. Platform & Trust
- DeSo/on-chain blijft bron van waarheid voor identiteit, social data, NFT-eigendom en transactiestatus waar het protocol die data levert.
- Next.js/Vercel vormt de weblaag; VIA bewaart nooit seed phrases of onbeperkte wallet-private keys.
- Eén responsive interface voor iPhone/iPad, Android/Samsung, pc en laptop.
- Datazuinig laden, timeouts, gecontroleerde retries en duidelijke foutstatussen.
- Productiewijzigingen gaan via branch -> groene preview -> PR -> merge -> groene productie.

## Modulegrenzen

| Module | Verantwoordelijkheid | Statusrichting |
| --- | --- | --- |
| Identity | publieke DeSo-profielen en later veilige autorisatie | actief/read-only; signing apart |
| Social Graph | feed, profielen, follows, posts, replies, notificaties | actief/read-only |
| NFT Explorer | collecties, detail, media, sale-informatie | actief/read-only |
| Discovery | creators, media en vindbaarheid | actief |
| Sharing | publieke VIA-profiel/NFT-links naar externe kanalen | actief zonder walletrechten |
| Transaction Engine | follow/like/diamond/post/mint/buy/bid/transfer | gated; pas na veilige signing |
| Commerce | fiat/crypto/regionale betalingen en settlement | Fase 3 totdat model is goedgekeurd |
| Messaging | DeSo private messaging/access groups | Fase 3 totdat encryptie/auth-flow is bewezen |
| Resilience | netwerkfouten, performance, monitoring, herstel | actief; automatische node-rotatie blijft gated |
| International | taal, datazuinig mobiel, regionale UX | actief; regionale betalingen gated |

## Documentverwerking

Voor ieder historisch document geldt voortaan:

1. **Al aanwezig** — geen duplicaat bouwen; eventueel huidige implementatie verbeteren.
2. **Bouwen** — uniek, nuttig en veilig punt opnemen in een aparte ontwikkelbranch.
3. **Fase 3** — waardevol maar security-, financiële, juridische of productkeuze vereist; reden vastleggen in `FASE_3_BESPREKEN.md`.
4. **Niet opnemen** — alleen na expliciet besluit; reden blijvend documenteren.

Losse voorbeeldcode uit oude documenten is nooit automatisch productiecode. Het functionele idee wordt eerst tegen de actuele VIA-code, DeSo-interface en productieregels getoetst.

## Ontwerpprincipe

VIA moet niet aanvoelen als losse NFT-, feed- en walletpagina's. De creator is de verbindende eenheid: vanuit een profiel moet een bezoeker zonder omweg posts, media, sociale activiteit en NFT-collectie kunnen ontdekken. Dezelfde creator-identiteit en DeSo-bron worden door alle modules hergebruikt.
