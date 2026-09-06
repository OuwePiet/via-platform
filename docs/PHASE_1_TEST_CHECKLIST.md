# VIA / Velcon — Fase 1 testchecklist

Deze checklist vertaalt de bruikbare delen van historische testdocumenten naar de actuele read-only VIA-basis. Er worden in Fase 1 geen private keys, derived private keys, wallet-secrets of write-transacties getest.

## Build en deployment

- [ ] `npm run typecheck` slaagt.
- [ ] `npm run build` slaagt.
- [ ] Vercel preview voor de actuele branch is groen.
- [ ] Geen nieuwe browser-consolefouten op de startpagina.
- [ ] Ontbrekende of kapotte media veroorzaken geen pagina-crash.

## Responsive basis

- [ ] Startpagina bruikbaar op desktop.
- [ ] Startpagina bruikbaar op iPad/tablet.
- [ ] Startpagina bruikbaar op iPhone/mobiel.
- [ ] Accountzoeker, NFT/social-tabs en feedknoppen blijven bereikbaar zonder horizontaal vastlopen.

## Publieke DeSo accounts

- [ ] Zoeken op `OuwePiet` werkt.
- [ ] Zoeken op `@OuwePiet` werkt.
- [ ] Exacte username-match is niet hoofdlettergevoelig.
- [ ] Een onbekend account geeft een nette foutmelding.
- [ ] Een DeSo/API-storing geeft een foutmelding zonder dat de pagina crasht.

## Publieke NFT-collecties

- [ ] NFT-overzicht opent read-only voor een gevonden account.
- [ ] Sale-status en prijsvelden worden alleen getoond wanneer data beschikbaar is.
- [ ] Mediafilter werkt voor image/video/audio/unavailable.
- [ ] Grote collectie kan geladen worden zonder dubbele items.
- [ ] Gedeelde NFT/account-links herstellen de bedoelde publieke weergave.
- [ ] NFT-detailpagina en terugnavigatie blijven werken.

## Publieke sociale feed

- [ ] Profieltab `Social posts` opent zonder login.
- [ ] `view=social` opent direct de juiste accountfeed.
- [ ] Paginering `Load more social posts` voegt nieuwe posts toe zonder duplicaten.
- [ ] Afbeelding/video in een post wordt weergegeven of valt netjes terug naar placeholder.
- [ ] Replies kunnen read-only worden geopend wanneer `CommentCount > 0`.
- [ ] Likes, replies, reposts, quotes en diamonds worden alleen als publieke telling getoond; er is geen write-knop.

## Publieke discovery-feed

- [ ] `Open public feed` haalt publieke DeSo-posts op.
- [ ] Refresh vervangt de feed zonder duplicaten.
- [ ] Media wordt veilig weergegeven met dezelfde mediafallback als NFT/social-weergave.
- [ ] Replies openen read-only.
- [ ] Geen login, signing of walletconnectie wordt gestart.

## Security-baseline

- [ ] `X-Content-Type-Options: nosniff` aanwezig.
- [ ] `X-Frame-Options: DENY` aanwezig.
- [ ] `Referrer-Policy: strict-origin-when-cross-origin` aanwezig.
- [ ] Camera, microfoon en geolocatie blijven uit zolang Fase 1 ze niet gebruikt.
- [ ] Geen private keys, seeds of derived private-key materiaal in repository, browseropslag of databasecode.

## Buiten Fase 1

Niet als Fase-1 test uitvoeren: login/signing, follow/unfollow, likes schrijven, diamonds sturen, repost/quote schrijven, composer, private chat, minting, Buy Now, bids, Claim, timed auctions, Stripe/iDEAL, WhatsApp-commerce, adminmutaties, Passkeys of multi-node failover. Deze krijgen pas tests nadat hun architectuur afzonderlijk is goedgekeurd en gebouwd.
