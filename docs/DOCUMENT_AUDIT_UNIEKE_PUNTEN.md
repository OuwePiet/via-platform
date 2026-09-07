# VIA — Documentaudit unieke punten

`viadeso.online` en de huidige `main` zijn de vaste basis. Oude projectnamen zijn alleen bronmateriaal; VIA blijft de actieve naam.

## Werkwijze

Documenten worden niet blind samengevoegd. Elk uniek punt krijgt één van drie uitkomsten:

- **Actief bouwen** — veilig, passend bij de huidige VIA-basis en zonder onbewezen wallet-/betaallogica.
- **Kernrichting** — hoort bij VIA en wordt stapsgewijs gebouwd zodra de technische basis gereed is.
- **Fase 3** — kansrijk, maar eerst overleg, verificatie of expliciete goedkeuring nodig.

## Unieke punten die direct bruikbaar zijn

| Punt uit documenten | Uitkomst | Verwerking |
| --- | --- | --- |
| Publieke follower/following-context bij creatorprofielen | Actief gebouwd | Read-only via officiële DeSo `get-follows-stateless`; geen signing of blockchain-write. |
| Datazuinig mobiel gedrag | Kernrichting | Lazy images, beperkte media per kaart en `preload=metadata` voor video blijven leidend; verder toetsen op Android/Samsung en iOS. |
| Duidelijke foutstatus bij verdwenen NFT-media | Kernrichting | Opnemen in NFT/media-hardening; geen stille lege kaarten. |
| Sociale deelbaarheid van NFT/post-links | Kernrichting | Veilige linkdeling kan zonder walletmachtiging worden uitgebreid. |
| NFT verkoopvormen Buy Now, bod en veiling | Kernrichting | Publieke verkoopstatus en prijsinformatie read-only tonen; transactiestappen pas na veilig signingmodel. |
| Unlockable/exclusive content | Kernrichting met beveiligingsgrens | Eigendomsstatus en aanwezigheid mogen zichtbaar zijn; geheime inhoud nooit publiek uitleveren. |
| Royalty- en kostenoverzicht vóór transactie | Kernrichting | Transparantie over creator/holder royalty, blockchainkosten, servicefee en netto-opbrengst hoort vóór iedere toekomstige ondertekening. |
| Transacties nooit stil automatisch herhalen | Kernrichting | Bij onzekere mint/listing-status stoppen en opnieuw verifiëren om dubbele blockchainhandelingen te voorkomen. |
| Draagbare DeSo-data / interoperabiliteit | Kernrichting | VIA blijft DeSo-native en gebruikt publieke/on-chain brondata waar mogelijk in plaats van eigen afgesloten datasilo's. |
| Gecontroleerde preview vóór productie | Actief proces | Branch → Vercel preview → PR → merge → productiecontrole blijft verplicht; documenten die direct naar `main` pushen voorstellen worden niet gevolgd. |
| AI-hulp voor alt-tekst, titels, hashtags en deelteksten | Fase 3 | AI-provider, kosten, privacy en opt-in moeten eerst worden vastgesteld. |
| Wallet-lichte onboarding via e-mail/passkey | Fase 3 | Web2-toegang mag niet worden verward met DeSo-transactiebevoegdheid; signingmodel eerst ontwerpen. |
| Regionale betaalmethoden zoals UPI/Alipay/WeChat Pay | Fase 3 | Providerdekking, wetgeving, settlement en kosten eerst verifiëren. |
| Regio-badges en externe verificatie | Fase 3 | Ranking, bewijsbron, misbruikpreventie en moderatie eerst bepalen. |
| Cross-chain/L2 bridging | Fase 3 | VIA blijft eerst DeSo-native; extra chains vergroten security- en onderhoudsoppervlak. |
| Automatische nodefailover | Fase 3 | Alleen na verificatie van betrouwbare openbare nodes, health checks en consistente API-responses. |
| Gasless relay / sponsored transactions | Fase 3 | Vereist expliciet permissie-, fee- en misbruikmodel. |
| In-feed mini-apps | Fase 3 | Interessant voor vernieuwing, maar sandboxing, security en UX eerst uitwerken. |
| Automatisch externe software detecteren én live implementeren | Fase 3 | On-chain metadata is geen vertrouwde executable software. Detectie kan later nuttig zijn, maar automatische uitvoering zonder review is onveilig. |
| Browser/admin updatepaneel | Fase 3 | Een beheeromgeving kan nuttig zijn, maar vereist echte admin-authenticatie, auditlog, rollen en rollback; een e-mailadres of publieke wallet-key alleen is onvoldoende. |

## Tweede documentronde — correcties op oude aannames

- Oude voorstellen waarin een sensor externe App Metadata automatisch omzet in live interfacecode worden **niet direct gebouwd**. Metadata mag nooit als vertrouwde code worden uitgevoerd.
- Oude instructies om rechtstreeks naar `main` te pushen zijn vervangen door VIA's bestaande preview/PR/productiecontrole.
- Claims als “permanent opgeslagen” worden alleen gebruikt wanneer de opslag van het concrete medium aantoonbaar duurzaam/permanent is.
- Oude projectnamen, kleurvoorstellen en alternatieve stijlen overschrijven de eerder gekozen VIA-huisstijl en het VIA-logo niet.
- Wallet-, mint-, verkoop- en biedlogica uit oude documenten geldt als functionele bron, niet als toestemming om transacties zonder expliciete signing en controle te activeren.

## Controleprincipe

Een oud document kan een goed idee bevatten én technisch onjuiste aannames. Daarom geldt steeds:

1. huidige VIA-code controleren;
2. officiële DeSo-bron/API verifiëren;
3. alleen read-only of anderszins laag-risico onderdelen direct bouwen;
4. security-, wallet-, payment-, automatische update- en cross-chainonderdelen eerst naar Fase 3;
5. na Vercel-preview pas mergen naar `main`.
