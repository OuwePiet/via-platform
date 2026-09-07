# VIA — Fase 3: bespreken vóór implementatie

`viadeso.online` is de vaste uitgangsbasis. Dit register voorkomt dat goede ideeën verloren gaan terwijl de stabiele basis gericht verder wordt gebouwd.

## Werkwijze

Een onderdeel komt hier terecht wanneer het kansrijk is, maar nog niet veilig of volledig genoeg is om direct in productie op te nemen. Per onderdeel leggen we vast waarom overleg of aanvullend onderzoek nodig is.

| Onderdeel | Status | Waarom nog niet direct opnemen |
| --- | --- | --- |
| Open minting voor andere creators | Bespreken | Rechten, misbruikpreventie, opslagkosten en transactiestroom moeten eerst volledig zijn vastgelegd. |
| Fiat/crypto betaaluitbreiding buiten de bestaande routing | Bespreken | Juridische, provider-, koers- en settlementkeuzes mogen niet worden verzonnen of half ingebouwd. |
| Cross-chain NFT-koppelingen | Later onderzoeken | VIA blijft eerst DeSo-native; externe chains vergroten complexiteit en onderhoud. |
| Volautomatische software-updates | Bespreken | Productie mag niet automatisch wijzigen zonder build-, test- en rollbackcontrole. |
| Automatische node-rotatie bij storing | Bespreken | Vereist betrouwbare health checks en duidelijke failoverregels om foutieve omschakeling te voorkomen. |
| Eigen wallet/cold-wallet automatisering | Bespreken | Sleutelbeheer en geldstromen zijn security-kritisch; private keys/seeds horen nooit in de repository. |
| Claim-mechanismen op basis van follow/repost/diamonds | Later onderzoeken | Eerst betrouwbare verificatie en anti-misbruikregels nodig. |
| Wereldwijde/regiospecifieke uitbreiding | Later onderzoeken | Taal, wetgeving, betaalmethoden en moderatie verschillen per regio. |
| Mirror/staking-integraties | Later onderzoeken | Externe protocolafhankelijkheden en actuele werking moeten eerst worden geverifieerd. |
| Uitgebreide privéchat | Bespreken | Privacy, opslag, moderatie en DeSo-integratie moeten vooraf duidelijk zijn. |
| Wallet-lichte onboarding via e-mail/passkey | Bespreken | E-mail/passkey kan toegang vereenvoudigen, maar mag nooit stilzwijgend DeSo-transactiebevoegdheid geven; signing en herstel moeten eerst worden ontworpen. |
| AI-hulp voor alt-tekst, titels, hashtags en deelteksten | Later onderzoeken | Provider, privacy, kosten, moderatie en expliciete gebruikerskeuze moeten eerst vaststaan. |
| AI-covers/placeholders voor video en NFT-media | Later onderzoeken | Automatische generatie verandert creatorcontent; opslag, rechten, kosten en opt-in moeten eerst worden bepaald. |
| Regionale betaalmethoden UPI / Alipay / WeChat Pay | Bespreken | Beschikbaarheid, wetgeving, providerdekking, settlement en kosten per regio moeten eerst actueel worden geverifieerd. |
| Regio-badges en lokale Top Creator-ranglijsten | Bespreken | Rankingcriteria, manipulatie, geografische toewijzing en moderatie moeten eerst eerlijk en controleerbaar zijn. |
| Externe verificatie via X/TikTok/andere platforms | Later onderzoeken | Bewijsbron, privacy, herverificatie en afhankelijkheid van derden moeten eerst worden vastgesteld. |
| Gasless/sponsored DeSo-transacties | Bespreken | Vereist een expliciet fee-, permissie-, limiet- en anti-misbruikmodel. |
| In-feed mini-apps | Later onderzoeken | Interessant voor innovatie, maar sandboxing, rechten, veiligheid en mobiele UX moeten eerst worden ontworpen. |
| Buy-burn/tokenomics-automatisering | Bespreken | Automatische geld- of tokenstromen zijn financieel en technisch kritisch en mogen niet zonder expliciet model worden geactiveerd. |
| Automatische App Metadata/software-detectie | Onderzoeken | Detecteren van nieuwe publieke DeSo-appmetadata kan later waardevol zijn voor een innovatie-/ecosysteemoverzicht, maar de betrouwbaarheid en betekenis van de metadata moeten eerst officieel worden vastgesteld. |
| Automatisch gedetecteerde software live uitvoeren | Niet zonder nieuw ontwerp | Externe metadata of HTML/JS mag nooit automatisch vertrouwd en uitgevoerd worden; vereist sandboxing, allowlisting, review en expliciete activatie. |
| Browsergebaseerd admin/updatepaneel | Bespreken | Vereist sterke admin-authenticatie, rollen, auditlog, CSRF-bescherming, preview en rollback. Een publiek DeSo-adres of e-mailadres alleen is geen autorisatie. |
| DAO-coins/orderbook diep in VIA | Later onderzoeken | DeSo-functionaliteit bestaat, maar nut en UX voor VIA moeten eerst worden bepaald zodat het NFT/sociale kernproduct niet onnodig complex wordt. |
| Volledige timed-auction UX | Bespreken | Veilingtimers, biedstatus, afronding, race-conditions en signing moeten als één betrouwbare transactiestroom worden ontworpen. |
| Unlockable/exclusive NFT-inhoud | Bespreken | Bezitscontrole, toegangsherroeping, opslag en lekpreventie moeten worden ontworpen voordat geheime content wordt aangeboden. |
| Silent derived keys voor write-acties | Bespreken | Alleen met minimale rechten, harde expiratie, duidelijke gebruikersscope en betrouwbare revoke; gemak mag geen permanente transactiemacht opleveren. |
| Automatische multi-node failover | Bespreken | Kandidaten uit oude documenten zijn niet automatisch vertrouwd; eerst uptime, API-compatibiliteit, data-consistentie en beheer/eigenaarschap verifiëren. |
| 18+ verificatie/content-gating | Bespreken | Een lokale `sessionStorage`-vlag is geen echte leeftijdsverificatie. Vereisten verschillen per land en type content. |
| Juridische MiCA/CASP-positionering | Externe beoordeling nodig | Oude documenten doen absolute juridische claims die niet als waarheid mogen worden ingebouwd. Betaal-, swap-, custody- en tokenfuncties vereisen actuele beoordeling. |
| Creator-links naar WhatsApp/externe commerce | Bespreken | Bruikbaar idee, maar alleen met strikte URL/host-validatie, phishingbescherming en duidelijke externe-link UX. |
| Welcome Feed / First Posts | Onderzoeken | Oude documenten noemen deze als vaste feedmodi, maar zonder betrouwbare officiële DeSo-definitie of endpoint mogen we geen kunstmatige ranking presenteren alsof die native is. |
| NFT-eventnotificaties voor bod, claim, veiling en verkoop | Later bouwen | Pas activeren zodra de bijbehorende echte DeSo write-/signingflows bestaan en de eventstatus betrouwbaar kan worden afgeleid; geen fictieve transactiemeldingen. |

## Niet parkeren: hoort bij de kern

Deze onderdelen blijven onderdeel van de actieve VIA-richting en worden dus niet als afgewezen beschouwd:

- DeSo sociale functies en account/creator-ervaring;
- NFT-collecties en NFT-detailweergave;
- media, filters, sortering en zoeken;
- veilige login zonder seed-frictie waar technisch verantwoord;
- mobiel/tablet gebruik;
- pc- en laptopgebruik;
- duidelijke kosten en betaalrouting;
- robuuste productie, monitoring en herstelbaarheid;
- datazuinig gedrag voor tragere mobiele verbindingen;
- duidelijke foutstatus bij verdwenen of onbereikbare NFT-media;
- veilige sociale deelbaarheid van publieke VIA-links;
- transparante royalty- en kostenweergave vóór toekomstige transacties;
- geen automatische herhaling van onzekere blockchaintransacties;
- draagbaarheid van publieke DeSo-data;
- internationale bruikbaarheid;
- VIA als nieuwe plaats voor DeSo-NFT's na het wegvallen van NFTz.

## Beslisregel

Na overleg verhuist een item naar één van drie uitkomsten:

1. **Bouwen** — opnemen in een gecontroleerde ontwikkelbranch;
2. **Later** — bewaren met afhankelijkheden/voorwaarden;
3. **Niet opnemen** — reden blijvend documenteren.
