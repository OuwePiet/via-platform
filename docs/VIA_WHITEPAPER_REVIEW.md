# VIA whitepaper review — 2026-09-06

Bron: `Google-VERO-whitepaper..docx`.

## Conclusie

De historische VERO-whitepaper bevat een bruikbare kern, maar is **niet geschikt om ongewijzigd als officiele VIA-whitepaper te publiceren**. De visie rond DeSo als primaire openbare gegevenslaag, portable eigendom, read-only hergebruik en een lichte VIA-interface blijft bruikbaar. Een aantal technische, financiele en veiligheidsclaims is echter te absoluut of niet door de huidige VIA-code aangetoond.

## Wat we behouden voor VIA

- DeSo/on-chain als primaire bron van waarheid voor blockchain-eigendom en transacties.
- Bestaande openbare DeSo-data zo veel mogelijk hergebruiken in plaats van dupliceren.
- VIA als lichte presentatie-, zoek-, navigatie- en gebruikslaag boven DeSo.
- Portable openbare profielen, posts, NFT-data en sociale signalen waar de actuele DeSo API/SDK die betrouwbaar levert.
- Serverless/web-first architectuur op Vercel voor de huidige front-end.
- Duidelijke scheiding tussen on-chain post/metadata en extern opgeslagen mediabestanden.
- Toekomstige transacties alleen via minimale, progressief gevraagde permissions en zonder private keys/seeds op te slaan.

## Claims die moeten worden verwijderd of herschreven

1. **`100% serverless` en `exact EUR 0 vaste serverkosten`**
   - Niet als garantie publiceren. Vercel heeft een gratis laag, maar gebruik, opslag, externe diensten en toekomstige features kunnen kosten veroorzaken.

2. **`ALTIJD operationeel`, autonome fallback-router en wereldwijde back-upnodes**
   - De huidige VIA-code heeft timeout/retry naar de gekozen DeSo-node, maar nog geen geverifieerde multi-node failoverarchitectuur.

3. **Derived Key Guardian die permissies automatisch herstelt via FaceID/TouchID**
   - Niet huidige functionaliteit en niet als vanzelfsprekende veilige flow presenteren. Login/signing is Fase 2.

4. **Supabase production SQL als bestaand VIA-fundament**
   - De huidige VIA Fase 1 gebruikt dit niet als bron van waarheid. SQL uit het oude document niet blind uitvoeren.

5. **Developer God Mode / `is_developer` bypass**
   - Niet gebruiken. Beheer moet later expliciet geauthenticeerd en geautoriseerd worden zonder verborgen bypass.

6. **WhatsApp Commerce Funnel als kern van het huidige product**
   - Historisch concept, niet de huidige VIA-basis. Alleen opnemen als later afzonderlijk productbesluit.

7. **Stripe, iDEAL, Buy & Burn, automatische 10%-burn**
   - Niet huidige functionaliteit. Fase 2 en bovendien technisch/financieel/juridisch apart beoordelen.

8. **`alle gebruikersdata, NFT-metadata en social interacties` rechtstreeks on-chain**
   - Te breed. Per datatype beschrijven wat werkelijk uit DeSo komt. Media-URLs betekenen niet dat de mediabytes zelf op-chain staan.

9. **Royaltyclaims als universeel/autonoom bij iedere secundaire verkoop**
   - Alleen publiceren voor zover actuele DeSo NFT-mechanismen en de daadwerkelijk gekozen VIA-flow dit aantoonbaar ondersteunen.

10. **Whitepaper Gatekeeper/OTP en 100% controle wie gelezen heeft**
    - Niet huidige VIA-functionaliteit en `100% sluitend` is geen geschikte garantie.

## Nieuwe VIA-kern voor de uiteindelijke whitepaper

### 1. Doel
VIA (`viadeso.online`) is een web-first platform dat openbare DeSo-data eenvoudiger vindbaar, leesbaar en bruikbaar maakt voor creators, verzamelaars en sociale gebruikers.

### 2. DeSo als voorraadmagazijn
VIA gebruikt de DeSo-blockchain en openbare DeSo-API's als primaire bron voor onder meer profielen, posts, sociale signalen, NFT-eigendom en transactiegerelateerde blockchain-data waar deze betrouwbaar beschikbaar zijn. VIA dupliceert deze gegevens niet onnodig in een eigen database.

### 3. Bewaarstatus
VIA maakt onderscheid tussen:
- on-chain gegevens;
- gekoppelde externe media;
- ontbrekende/niet-beschikbare media;
- eventueel later door VIA extra veiliggestelde media.

Daarmee doet VIA geen onjuiste claim dat ieder beeld-, video- of audiobestand permanent op de blockchain staat.

### 4. Fase 1
- read-only publieke DeSo-profielen;
- publieke posts en threads;
- publieke NFT-collecties en detailweergave;
- owner/copies/sale/bid informatie waar aantoonbaar beschikbaar;
- interne deelbare VIA-routes;
- subtiel VIA-watermerk alleen bij NFT-presentatie;
- veilige foutafhandeling zonder private key/seed-verwerking.

### 5. Fase 2
Pas na aparte goedkeuring en technisch ontwerp:
- login en account switching;
- signing en minimale permissions;
- post/reply/like/repost/follow/diamond;
- private messaging;
- NFT mint/bid/buy/transfer;
- betalingen/premium opslag;
- admin/moderatie;
- aanvullende redundantie/failover.

## Publicatieregel

De definitieve VIA-whitepaper moet alleen functies als `live`, `veilig`, `permanent`, `gratis`, `gedecentraliseerd`, `automatisch` of `altijd beschikbaar` beschrijven wanneer de actuele code, infrastructuur en testresultaten dat aantoonbaar ondersteunen. Toekomstige functies worden als roadmap/Fase 2 benoemd, niet als reeds bestaande functionaliteit.
