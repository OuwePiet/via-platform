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

## Niet parkeren: hoort bij de kern

Deze onderdelen blijven onderdeel van de actieve VIA-richting en worden dus niet als afgewezen beschouwd:

- DeSo sociale functies en account/creator-ervaring;
- NFT-collecties en NFT-detailweergave;
- media, filters, sortering en zoeken;
- veilige login zonder seed-frictie waar technisch verantwoord;
- mobiel/tablet gebruik;
- duidelijke kosten en betaalrouting;
- robuuste productie, monitoring en herstelbaarheid;
- internationale bruikbaarheid;
- VIA als nieuwe plaats voor DeSo-NFT's na het wegvallen van NFTz.

## Beslisregel

Na overleg verhuist een item naar één van drie uitkomsten:

1. **Bouwen** — opnemen in een gecontroleerde ontwikkelbranch;
2. **Later** — bewaren met afhankelijkheden/voorwaarden;
3. **Niet opnemen** — reden blijvend documenteren.
