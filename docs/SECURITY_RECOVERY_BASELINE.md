# VIA — Security & recovery baseline

Deze regels komen voort uit de documentaudit en gelden als vaste grens voor verdere bouw.

## Identiteit en toekomstige derived keys

- De huidige publieke VIA-sessie is alleen geschikt voor read-only personalisatie.
- Een toekomstige derived key krijgt een beperkte scope en expliciete vervaldatum/`ExpirationBlockHeight`.
- Uitloggen moet lokale sessiedata beëindigen; als een derived key is uitgegeven moet ook een betrouwbare revoke-route beschikbaar zijn.
- Geen seed phrase, hoofd-private key of ander walletgeheim in repository, logging, analytics of gewone browseropslag.
- Gemak mag nooit betekenen dat VIA ongemerkt onbeperkte transactierechten krijgt.

## Externe links

- Door creators aangeleverde commerce/social links moeten vóór opslag én vóór rendering op protocol en toegestane host worden gevalideerd.
- Alleen `https:` waar extern verkeer nodig is; geen `javascript:`, `data:` of lookalike-hosts.
- Een UI-label of creatorprofiel maakt een externe link niet automatisch vertrouwd.

## Herstel en failover

- DeSo/on-chain publieke data blijft waar mogelijk de bron van waarheid.
- Nodefailover wordt pas geactiveerd nadat kandidaatnodes zijn geverifieerd op beschikbaarheid, API-compatibiliteit en consistente responses.
- Geen willekeurige derde node stil als vertrouwde fallback gebruiken.
- Hostingherstel gebruikt versiebeheer en reproduceerbare deployments; geen runtime-code uit externe metadata uitvoeren.
- Een storing mag writes nooit automatisch herhalen. Eerst status opnieuw vaststellen.

## Updates

- GitHub branch → Vercel preview → controle → PR → merge → productiecontrole blijft de VIA-route.
- Realtime data-updates kunnen later nuttig zijn, maar datawijzigingen mogen geen ongecontroleerde codewijzigingen veroorzaken.
- Externe App Metadata, HTML of JavaScript wordt als onbetrouwbare input behandeld.

## Compliance

- Juridische claims worden niet uit oude documenten overgenomen als feit.
- Externe betaal- of swapdiensten maken VIA niet automatisch vrij van eigen verplichtingen.
- Leeftijds- of contentrestricties mogen niet uitsluitend steunen op een zelf ingestelde `sessionStorage`-boolean wanneer echte verificatie vereist is.
- Voor betaal-, custody-, tokenomics-, cross-chain- en gereguleerde functies is actuele juridische beoordeling nodig vóór productie.
