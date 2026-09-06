# VIA productie-checklist

Deze checklist beschermt de werkende productieversie tijdens verdere ontwikkeling.

## Voor iedere wijziging

- Werk op een aparte branch; niet rechtstreeks op `main`.
- Houd de publieke NFT-weergave read-only tenzij een aparte transactiemodule expliciet wordt gebouwd.
- Sla nooit private keys, seed phrases of andere wallet-geheimen op in de repository.
- DeSo/on-chain blijft bron van waarheid voor NFT-eigendom.

## Voor merge naar main

- Vercel preview/build moet slagen.
- Controleer account lookup met minimaal `OuwePiet` en een grote externe collectie.
- Controleer mediafilters, verkoopfilter, sortering en zoekfunctie.
- Controleer mobiel/tablet gedrag.
- Controleer dat ontbrekende media de pagina niet laten crashen.
- Controleer dat gedeelde collectie/NFT-links blijven werken.

## Na merge

- Controleer Vercel production status.
- Controleer de publieke productiepagina.
- Bij regressie: geen nieuwe features toevoegen voordat de productieversie weer stabiel is.

## Geldstroom-afspraak v1

De bestaande payment-routing documentatie/code blijft leidend. Alleen publieke DeSo keys mogen in broncode/documentatie staan; private sleutels nooit.
