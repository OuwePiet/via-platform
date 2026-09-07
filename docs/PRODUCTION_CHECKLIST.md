# VIA productie-checklist

Deze checklist beschermt de werkende productieversie tijdens verdere ontwikkeling.

## Voor iedere wijziging

- Werk op een aparte branch; niet rechtstreeks op `main`.
- Houd de publieke NFT-weergave read-only tenzij een aparte transactiemodule expliciet wordt gebouwd.
- Sla nooit private keys, seed phrases of andere wallet-geheimen op in de repository.
- DeSo/on-chain blijft bron van waarheid voor NFT-eigendom.
- Een publieke VIA-sessie mag nooit worden gebruikt als autorisatie voor writes, betalingen of beheeracties.
- Voeg geen fallback-DeSo-node toe voordat beschikbaarheid, API-compatibiliteit en consistente data expliciet zijn gecontroleerd.
- Valideer creator/externe URL's op protocol en toegestane host voordat ze klikbaar worden; externe links zijn niet automatisch vertrouwd.
- Gebruik een `sessionStorage`- of `localStorage`-vlag nooit als bewijs van leeftijd, identiteit of juridische verificatie.

## Voor merge naar main

- Vercel preview/build moet slagen.
- Controleer account lookup met minimaal `OuwePiet` en een grote externe collectie.
- Controleer mediafilters, verkoopfilter, sortering en zoekfunctie.
- Controleer mobiel/tablet gedrag op zowel iOS/iPadOS als Android.
- Neem bij Android expliciet Samsung-telefoons/tablets en Samsung Internet mee, naast gangbare Android Chrome-schermformaten.
- Controleer pc- en laptopgedrag op gangbare desktopbreedtes, inclusief Windows en macOS en waar praktisch Linux.
- Neem op desktop/laptop minimaal Chrome, Edge en Firefox mee; controleer Safari op macOS.
- Zorg dat responsive layouts bruikbaar blijven van kleine telefoons tot tablets, laptops en grote desktopschermen, zonder afgesneden navigatie of onnodig uitgerekte content.
- Voorkom browser-specifieke navigatie, touch- of scrolloplossingen die alleen in Safari/iOS werken.
- Controleer dat ontbrekende media de pagina niet laten crashen.
- Controleer dat gedeelde collectie/NFT-links blijven werken.
- Controleer publieke profiel-, post- en NFT-deellinks naar X/LinkedIn zonder wallet- of transactietoegang.
- Test op tragere mobiele verbindingen: afbeeldingen lazy-loaden waar mogelijk en video's mogen niet onnodig volledig vooraf laden.
- Beperk eerste mobiele payloads; een feed of collectie moet bruikbaar worden voordat alle zware media zijn geladen.
- Controleer dat geen externe metadata, HTML of database-inhoud als uitvoerbare code wordt behandeld.

## Na merge

- Controleer Vercel production status.
- Controleer de publieke productiepagina.
- Bij regressie: geen nieuwe features toevoegen voordat de productieversie weer stabiel is.

## Geldstroom-afspraak v1

De bestaande payment-routing documentatie/code blijft leidend. Alleen publieke DeSo keys mogen in broncode/documentatie staan; private sleutels nooit.
