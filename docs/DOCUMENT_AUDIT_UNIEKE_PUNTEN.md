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
| Publieke follower/following-context bij creatorprofielen | Actief bouwen | Read-only via officiële DeSo `get-follows-stateless`; geen signing of blockchain-write. |
| Datazuinig mobiel gedrag | Kernrichting | Lazy images, beperkte media per kaart en `preload=metadata` voor video blijven leidend; verder toetsen op Android/Samsung en iOS. |
| Duidelijke foutstatus bij verdwenen NFT-media | Kernrichting | Opnemen in NFT/media-hardening; geen stille lege kaarten. |
| Sociale deelbaarheid van NFT/post-links | Kernrichting | Veilige linkdeling kan zonder walletmachtiging worden uitgebreid. |
| AI-hulp voor alt-tekst, titels, hashtags en deelteksten | Fase 3 | AI-provider, kosten, privacy en opt-in moeten eerst worden vastgesteld. |
| Wallet-lichte onboarding via e-mail/passkey | Fase 3 | Web2-toegang mag niet worden verward met DeSo-transactiebevoegdheid; signingmodel eerst ontwerpen. |
| Regionale betaalmethoden zoals UPI/Alipay/WeChat Pay | Fase 3 | Providerdekking, wetgeving, settlement en kosten eerst verifiëren. |
| Regio-badges en externe verificatie | Fase 3 | Ranking, bewijsbron, misbruikpreventie en moderatie eerst bepalen. |
| Cross-chain/L2 bridging | Fase 3 | VIA blijft eerst DeSo-native; extra chains vergroten security- en onderhoudsoppervlak. |
| Automatische nodefailover | Fase 3 | Alleen na verificatie van betrouwbare openbare nodes, health checks en consistente API-responses. |
| Gasless relay / sponsored transactions | Fase 3 | Vereist expliciet permissie-, fee- en misbruikmodel. |
| In-feed mini-apps | Fase 3 | Interessant voor vernieuwing, maar sandboxing, security en UX eerst uitwerken. |

## Controleprincipe

Een oud document kan een goed idee bevatten én technisch onjuiste aannames. Daarom geldt steeds:

1. huidige VIA-code controleren;
2. officiële DeSo-bron/API verifiëren;
3. alleen read-only of anderszins laag-risico onderdelen direct bouwen;
4. security-, wallet-, payment-, automatische update- en cross-chainonderdelen eerst naar Fase 3;
5. na Vercel-preview pas mergen naar `main`.
