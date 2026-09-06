# VIA / Velcon — Fase 1 implementatie

Status: gestart op branch `velcon-document-review`.

## Doel van Fase 1

Fase 1 brengt de bestaande VIA-basis technisch en administratief op één lijn, zonder onbewezen of risicovolle functies uit historische VERO/Lumen-documenten direct in productie te zetten.

## Nu uitvoeren

1. **Naam en domein consistent maken**
   - Projectnaam: `via-platform`
   - Publieke naam: `VIA`
   - Hoofddomein: `https://viadeso.online`
   - Historische namen VERO/Lumen alleen als bronverwijzing behouden.

2. **Bestaande Next.js-basis behouden**
   - Geen terugbouw naar Vite/Framer/Webflow uit oudere documenten.
   - `npm run typecheck` en `npm run build` blijven de minimale technische controles.

3. **DeSo als bron van waarheid behouden**
   - NFT-eigendom en blockchain-data komen uit DeSo/on-chain data.
   - Eventuele databasefuncties zijn ondersteunend en mogen on-chain eigendom niet vervangen.

4. **Veilige payment-routing behouden**
   - Alleen publieke keys in de repository.
   - Geen seeds, private keys of wallet-geheimen in code of documentatie.
   - Bestaande payment-routing documentatie/code blijft leidend totdat een afzonderlijke betaalmodule gecontroleerd is.

5. **Documenten classificeren vóór implementatie**
   Elke bron krijgt één van deze statussen:
   - al aanwezig;
   - bruikbaar en nu in Fase 1;
   - eerst technisch verifiëren;
   - parkeren voor Fase 2;
   - afwijzen wegens risico of incompatibiliteit.

## Niet automatisch uitvoeren in Fase 1

De volgende onderdelen uit historische documenten worden niet als bestaand of production-ready beschouwd en gaan pas verder na afzonderlijke controle:

- Supabase realtime/WebSocket synchronisatie;
- automatische multi-node/CDN failover;
- Gasless Relay Server;
- Auto-Sweep naar hardware wallet;
- God-Mode of whitelist-bypass;
- Passkeys/OTP gatekeeper;
- WhatsApp commerce funnel;
- Stripe/iDEAL/crypto bridge;
- autonome veiling-engine en bulk minting;
- Buy & Burn-tokenomics;
- mempool-gebaseerde premium vrijgave.

## Werkregel

Geen wijziging naar `main` zonder afzonderlijke controle van de wijziging. Voor productie geldt minimaal: typecheck, build en functionele controle van de gewijzigde onderdelen.
