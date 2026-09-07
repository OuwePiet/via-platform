# VIA — documentaudit 2026-09-07

`viadeso.online` en de actuele `main`-branch zijn de vaste uitgangsbasis. Oude namen zoals Lumen, VERO en Velcon gelden alleen als historische bron voor ideeën; ze bepalen niet de huidige architectuur of branding.

## Doel

Documenten uit verschillende ontwikkelfasen worden niet blind samengevoegd. Ieder bruikbaar punt krijgt één van drie routes:

- **Nu benutten** — veilig, read-only of productiegericht en passend bij de bestaande VIA-basis;
- **Verder bouwen** — goed idee, maar vereist eerst gecontroleerde implementatie en preview-test;
- **Fase 3** — eerst overleg/goedkeuring, onderzoek of aanvullende beveiliging nodig.

## Unieke punten die direct in de actieve VIA-richting passen

| Punt uit oudere documenten | Beoordeling voor VIA | Actie |
| --- | --- | --- |
| Publieke follower/following-informatie op creatorprofielen | Past rechtstreeks in het sociale DeSo-deel en kan read-only via de officiële DeSo-backend | Actief bouwen op aparte branch |
| Data-zuinig mobiel gebruik, ook op goedkopere Android-toestellen en tragere verbindingen | Belangrijk voor wereldwijde bruikbaarheid en sluit aan op Samsung/Android-eis | Productiechecklist bevat lazy-load, video-preloadbeperking en eerste-payloadcontrole |
| Duidelijke status bij ontbrekende NFT-media | Verhoogt betrouwbaarheid na het wegvallen van oude NFTz-media | Actieve kern; per NFT/mediaweergave blijven hardenen |
| Sociale deelbaarheid zonder wallettoegang | Veilig zolang dit gewone publieke links zijn en geen transacties starten | Actieve kern; X/LinkedIn-deellinks mogen read-only blijven |
| DeSo blijft bron van waarheid voor NFT-eigendom en transactiestatus | Essentieel en al passend bij huidige architectuur | Behouden als harde regel |
| Geen seed/private key in gewone formulieren of repository | Essentieel beveiligingsprincipe | Behouden als harde regel |
| Eerlijke foutstatus bij uitval van DeSo of media | Geen schijnsucces tonen | Actief toepassen in read-only modules |

## Unieke punten die kansrijk zijn maar eerst gecontroleerd verder moeten worden gebouwd

| Punt | Voorwaarde vóór productie |
| --- | --- |
| Betere alt-tekst voor creator/NFT-media | Eerst eenvoudige niet-AI fallback verbeteren; AI-generatie apart beoordelen |
| Automatische deelteksten voor X/LinkedIn | Mag alleen tekstvoorstel zijn; gebruiker beslist en publiceert zelf |
| Wallet-lichte onboarding via e-mail/passkey | Web2-sessie en DeSo-transactiebevoegdheid strikt scheiden |
| Robuustere node-uitvalafhandeling | Eerst betrouwbare nodes, health-regels, timeouts en foutsemantiek vastleggen; geen willekeurige derde partij als blind failoverdoel |
| Creator-/communitystatus en badges | Criteria moeten transparant zijn en mogen niet onterecht DeSo-verificatie suggereren |

## Niet rechtstreeks overnemen

Oudere documenten bevatten soms stellige claims zoals “100% compleet”, “altijd online”, “€0 serverkosten” of vaste bouwtijden. Die claims worden niet als technische waarheid gebruikt. VIA blijft werken met meetbare preview/build-status, actuele providerkosten, echte runtime-controles en expliciete foutafhandeling.

Ook voorbeeldcode voor automatische node-rotatie, derived-key opslag, veilingen, betaalproviders of cross-chain koppelingen wordt niet letterlijk gekopieerd zonder actuele technische en beveiligingscontrole.

## Lopende drie sporen

1. **Bouwen:** sociale DeSo-profielen uitbreiden met veilige read-only informatie.
2. **Uitzoeken:** documenten blijven vergelijken met de actuele VIA-code om unieke, niet-dubbele punten te vinden.
3. **Fase 3:** risicovolle, financiële, identity-, automatiserings- en internationale uitbreidingen bewaren met reden tot overleg/goedkeuring.

Bij iedere volgende documentronde blijft dezelfde beslisregel gelden: **bouwen / later / niet opnemen**, met de reden vastgelegd.