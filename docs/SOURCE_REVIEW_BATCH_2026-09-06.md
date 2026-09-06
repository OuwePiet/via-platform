# VIA / Velcon — bronreview batch 6 september 2026

Deze batch vult `docs/SOURCE_DECISIONS.md` aan. De actuele Next.js/Vercel-code, het domein `viadeso.online` en de naam VIA blijven leidend. Historische Lumen/VERO-documenten zijn bronmateriaal, geen bewijs dat functies al bestaan.

## Google definitieve ontwikkelingsbrief 2.docx

Status: **waardevolle scopebron, technisch grotendeels herclassificeren**.

Bruikbaar voor VIA:
- responsive indeling: desktop 3 kolommen, tablet 2 kolommen, mobiel 1 kolom;
- publieke DeSo-profielen, posts, comments en NFT-status als netwerkbron;
- NFT-editie-, royalty-, bied- en veilingconcepten als toekomstige transactiemodules;
- in-app-browserwaarschuwing als mogelijke latere UX-verbetering;
- scheiding tussen lichte kern en zwaardere betaalde functies als productidee.

Niet letterlijk overnemen:
- Webflow/Framer als frontend; VIA gebruikt Next.js;
- Supabase/Railway, Gumroad, Zapier/Make, HeroSwap/MegaSwap of Stripe als reeds gekozen productiestack;
- `App: Lumen`; bij toekomstige writes moet de actuele VIA-identiteit worden gebruikt;
- derived seed/private signing material AES-versleuteld in een database opslaan;
- vaste 5 MB-, 5 mints/24u-, prijs-, royalty-, Diamond- of kostenclaims zonder actuele protocol- en productverificatie;
- claims dat DeSo-data permanent, gratis of beschikbaar zonder nuance is.

Fase 2 / eerst ontwerp en besluit:
- DeSo Identity/signing;
- minting, royalties, bids, timed auctions;
- User/App Associations voor favorieten of badges;
- premium video, signed media access en pay-per-feature;
- betalingsproviders en fiat/crypto flows;
- admin/reputatie en ranking;
- live pricing/Diamond-betalingen;
- mempool-gebaseerde vrijgave.

## Google-beveiliging-bij uitval Velcon-Github.docx

Status: **availability-risico terecht, garanties en voorbeeldarchitectuur niet als werkelijkheid behandelen**.

Bruikbaar:
- hosting-, node- en externe-dienstuitval expliciet meenemen in het ontwerp;
- read-only degradatie en gecontroleerde retries/fallbacks verkiezen boven crashen;
- herstel en deployment via versiebeheer documenteren.

Niet overnemen:
- `800 ms` als universele storingsgrens;
- browsercode die wordt voorgesteld alsof die een niet geladen website kan redden wanneer de primaire host zelf onbereikbaar is;
- beweringen als 100% uptime, zelfgenezing of `onverwoestbaar`;
- aannemen dat Cloudflare + Vercel + DNS-failover gratis en automatisch beschikbaar zijn zonder configuratie, contract- en DNS-controle;
- Supabase/WhatsApp-cache als bestaande VIA-infrastructuur.

Huidige Fase 1:
- `app/deso-api.ts` heeft timeout en retry op de primaire DeSo-node;
- Vercel preview wordt per relevante commit gecontroleerd;
- multi-host en multi-node failover blijven Fase 2.

## Google-premium-na nftz inplementatie.docx

Status: **grotendeels Fase 2 en financieel/security-gevoelig**.

Bruikbare ideeën:
- lokalisatie, taal- en valutaweergave modulair houden;
- idempotentie bij externe betalingen is belangrijk;
- rate limiting en RLS zijn relevante ontwerpprincipes als later een datalaag ontstaat;
- premium media en opslag kunnen afzonderlijke producten worden.

Niet implementeren uit dit bronbestand:
- centrale platform hot-wallet die namens klanten financiële acties uitvoert;
- `is_developer` God-Mode als bypass;
- Auto-Sweep, Buy & Burn of centrale treasury zonder afzonderlijk financieel/juridisch/security-ontwerp;
- het opgenomen SQL-script rechtstreeks uitvoeren;
- de vaste EUR↔DESO proxyberekening (`0.88`) of andere voorbeeldkoersen als productiekoers;
- algemene WhatsApp-check die willekeurige `https://` links toelaat terwijl hij als phishingfilter wordt gepresenteerd;
- de claim dat klanten zonder wallet automatisch volledig on-chain kunnen handelen door alleen een fiatbetaling.

## Google-hoe voelt de site.docx

Status: **sterke visuele/UX-bron; technische beloften scheiden van design**.

Bruikbaar voor pagina-indeling:
- diepe zwart/groene basis;
- platinawitte hoofdtypografie;
- subtiele smaragd/mint accenten;
- rustige kaarten, dunne randen en compacte informatiehiërarchie;
- statusindicatoren alleen wanneer ze echte gemeten status tonen;
- desktop-zijpanelen mogen op tablet/mobiel terugvallen naar 2/1 kolom.

Niet als productclaim tonen:
- `€0 vaste kosten`, `altijd online`, `100% veilig`, `onverwoestbaar`;
- live burn-teller zolang Buy & Burn niet aantoonbaar bestaat;
- Derived Key Guardian als garantie dat transactiefouten verdwijnen;
- WhatsApp/fallback/databaseclaims zolang die modules niet zijn gebouwd.

## Google comunicatie-blueprint.docx

Status: **belangrijke gecombineerde UX-/productbron; huidige read-only VIA-laag sluit aan op een deel ervan**.

Nu bruikbaar:
- publieke DeSo-verkenner zonder verplichte login;
- zoeking op username/public key;
- NFT- en socialweergave in dezelfde VIA-schil;
- responsive pagina-indeling;
- later een licht favorieten/snelmenu onderzoeken;
- duidelijke onderscheidingen tussen publieke weergave en acties waarvoor signing nodig is.

Fase 2:
- Identity, likes/comments/diamonds schrijven;
- minting en handel;
- premium video/paywall;
- veilingen;
- betalingen;
- admin-vinkjes;
- Associations voor persoonlijke favorieten.

Niet overnemen:
- Framer/Webflow als actuele techniek;
- AES-opslag van derived seeds;
- vaste DeSo/Diamond/prijsclaims;
- database-escrow als vervanging voor protocolvalidatie;
- juridische of technische termen als `waterdicht` zonder bewijs.

## VIA-logo en NFT-weergave

De gebruiker heeft het officiële VIA-woordmerk aangewezen: zilver/wit `VIA` op zwart met het mintgroene blad in/door de A. Dit is vanaf nu de visuele standaard voor VIA.

Voor NFT-weergave geldt:
- klein en subtiel VIA-watermerk rechtsonder;
- alleen als presentatie-overlay wanneer media binnen VIA wordt getoond;
- niet in het originele NFT-bestand bakken;
- bron-URL, on-chain metadata en eigenaarschap niet wijzigen;
- zwart uit het logo gedraagt zich visueel transparant tegen de media/weergave;
- watermark mag geen media-controls blokkeren en is geen kopieerbeveiligingsgarantie.

De huidige `app/nft-media.tsx` heeft hiervoor al een niet-interactieve VIA-overlay op afbeeldingen en video.

## Actuele technische controle

- PR #6 blijft open en `main` is nog niet gewijzigd.
- De actuele GitHub PR-resolutie rapporteert de branch als mergeable.
- Vercel preview van commit `09b07483df5fa304f3a916822c49add0d2c451b9` is geslaagd.
- De testchecklist is uitgebreid met watermark-, branding- en mergecontroles.

## Blijvende veiligheidsgrens Fase 1

Geen private keys, seeds, derived private material, centrale platform-signer, login/signing of write-transacties toevoegen in de huidige read-only laag. Fase-2 ideeën worden pas gebouwd na expliciet ontwerp, verificatie en besluit.
