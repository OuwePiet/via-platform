# VIA / Velcon — bronbesluiten

Dit bestand voorkomt dat historische Lumen/VERO-documenten rechtstreeks als actuele implementatie-instructie worden behandeld. De huidige Next.js/Vercel-repository en `viadeso.online` zijn leidend.

## Reeds inhoudelijk vergeleken

### Google-masterdocument.docx
Status: **gedeeltelijk bruikbaar, grotendeels herclassificeren**.

Nu bruikbaar:
- DeSo/on-chain als primaire bron voor sociale en NFT-data;
- publieke profielen/NFTs zonder verplichte login;
- responsive webinterface;
- royalties, biedingen en minting als toekomstige transactiemodules;
- lichte ondersteunende database alleen waar on-chain data niet geschikt is.

Niet letterlijk overnemen:
- Webflow/Framer als frontend; VIA gebruikt Next.js;
- Gumroad/Zapier/Make/HeroSwap als verplichte stack;
- derived seeds in een database opslaan, ook niet versleuteld;
- automatische acceptatie van biedingen namens gebruikers zonder afzonderlijk signing/security-ontwerp;
- claims dat alle DeSo-data permanent en gratis is zonder technische nuance;
- oude App-tag `Lumen`; toekomstige transacties moeten VIA gebruiken als dat technisch wordt ingevoerd.

Fase 2 / eerst overleg:
- Identity/derived-key transacties;
- minting, bieden, Buy Now, royalties;
- premium video en betaalmuur;
- veilingen/timers;
- admin badges/reputatie;
- cross-chain;
- CoinGecko-pricing en Diamond-betalingen;
- bulk minting en institutionele opslag.

### Grok-site-Status_Fase1_vs_Fase2.md.docx
Status: **bron voor gewenste scope, niet bewijs van implementatie**.

De bron noemt feed, profiel, wallet, diamonds, chat, volledige NFT-verkoop, composer, WhatsApp, Spotlight, Gatekeeper en Supabase als Fase 1. In de actuele repository zijn die niet allemaal gebouwd. Daarom wordt de daadwerkelijke code-status als waarheid gebruikt. Publieke feed/profielen/NFTs worden nu veilig read-only opgebouwd; wallet/signing/chat/verkoop blijven apart gecontroleerde modules.

### Grok-site-module-walletloos niet overal.docx
Status: **richting geaccepteerd**.

- geen volledige wallet-loze ombouw;
- publieke browsefuncties mogen zonder login;
- transacties volgen later de gekozen DeSo-auth/signing-route;
- eenvoudige lokale hulp/suggestielogica kan later zonder betaalde AI-afhankelijkheid worden toegevoegd.

### Google-nieuwe updates inlezen.docx
Status: **gedeeltelijk verouderd**.

Bruikbaar:
- codewijzigingen via GitHub en gecontroleerde deployment;
- data/configuratie later scheiden van code waar dat nuttig is.

Niet overnemen:
- aannemen dat Supabase al de live bron voor VIA is;
- `is_developer=true` als God-Mode/bypass;
- claims van nul downtime of directe live synchronisatie zonder verificatie.

### Google-beveiliging-site.docx
Status: **deels direct bruikbaar, deels alleen voor Fase 2**.

Bruikbaar en leidend zodra deze onderdelen bestaan:
- geheime sleutels horen uitsluitend in beveiligde environment variables en nooit in clientcode of repository;
- alle verbindingen moeten via HTTPS lopen;
- als Supabase later wordt gebruikt, RLS standaard per tabel ontwerpen en testen;
- admin-toegang moet gekoppeld zijn aan een verifieerbare identiteit/public key en niet aan alleen een eenvoudig wachtwoord.

Niet letterlijk overnemen:
- derived seeds of vergelijkbaar signing-secret in Supabase/database opslaan, ook niet wanneer AES-versleuteling wordt voorgesteld;
- de claim dat alleen RLS plus AES-encryptie het platform direct optimaal tegen hackers beschermt;
- aannemen dat Supabase al onderdeel is van de huidige VIA-productiebasis.

Fase 2 / eerst technisch ontwerpen:
- admin-authenticatie en autorisatie;
- eventuele Supabase-datalaag en RLS-beleid;
- secret/key-management voor server-side functies;
- DeSo Identity/derived-key signing zonder opslag van seedmateriaal.

### Google-admin panel.docx
Status: **bruikbare UX-specificatie, uitvoering Fase 2**.

Bruikbaar:
- adminpaneel als afzonderlijke, afgeschermde route;
- handmatige goedkeuring voor badges/vinkjes;
- duidelijke wachtrij, ranking- en prijsweergave als mogelijke beheerfuncties;
- toegang nooit alleen met een wachtwoord beveiligen.

Eerst ontwerpen/verifiëren:
- exacte admin-identiteitscontrole en server-side autorisatie;
- bron en integriteit van ranking/activiteitsdata;
- CoinGecko/prijslogica;
- eventuele Supabase-tabellen en RLS.

Niet aannemen:
- dat een client-side public-key check voldoende adminbeveiliging is;
- dat 0%-commissie voor topgebruikers of genoemde prijsstaffels al een VIA-besluit zijn.

### Google node rotetor, bij storing.docx
Status: **goede richting, concrete nodes en garanties eerst verifiëren**.

Bruikbaar:
- DeSo-node-afhankelijkheid als reëel beschikbaarheidsrisico behandelen;
- timeout, retry en later gecontroleerde multi-node failover ontwerpen;
- read-only degradatiemodus verkiezen boven crashen wanneer live data tijdelijk niet beschikbaar is.

Huidige code:
- `app/deso-api.ts` heeft al timeout en retry op de primaire DeSo-node;
- echte multi-node rotatie staat nog niet aan.

Niet letterlijk overnemen:
- ongeverifieerde publieke nodes als productie-fallback hardcoderen;
- 1,5 seconde als universele harde timeout zonder metingen;
- claims dat de site daardoor 'altijd online' blijft;
- Supabase-cache/WhatsApp fallback aannemen terwijl die modules nog niet bestaan.

### Google-testlijst-platform.docx en Google-testlijst-codes.docx
Status: **waardevol als bron voor toekomstige acceptance tests, niet als uitvoerbaar script**.

Nu bruikbaar:
- responsive gedrag controleren;
- publieke DeSo-profielen/posts/NFT-data tegen andere DeSo-interfaces vergelijken;
- mobiele werking, foutafhandeling en deployment afzonderlijk testen;
- latere transactiemodules alleen met expliciete end-to-end tests vrijgeven.

Afwijzen of herschrijven:
- derived private keys in `sessionStorage` opslaan;
- platform seed phrases in relaycode/environment als generieke transactiesigner gebruiken;
- claims van realtime synchronisatie binnen exact twee seconden zonder technische garantie;
- automatische NFT-bid acceptatie en silent transactions voordat auth/signing veilig ontworpen zijn.

De testlijsten worden later opgesplitst in: read-only Fase-1 tests, auth/signing tests, transactie/NFT tests en Fase-2 integratietests.

## Actuele Fase 1 code-status

Aanwezig op `velcon-document-review`:
- VIA/viadeso.online centrale branding;
- basis security headers;
- publieke DeSo accountzoeker;
- publieke NFT-collecties en NFT-detaildata;
- publieke profiel-social-feed met paginering;
- publieke replies/thread-weergave;
- deelbare sociale profiel-URL (`view=social`);
- profielnavigatie tussen NFT collection en Social posts;
- publieke DeSo discovery-feed via `get-posts-stateless`, inclusief media en read-only replies;
- geen login, signing, wallet-geheimen of write-transacties in deze read-only laag.

## Fase 2 / eerst technisch en functioneel besluiten

- DeSo login/Identity en signingmodel;
- follow/unfollow, like, diamond, repost, quote en reply schrijven;
- composer en polls;
- private chat/messages;
- minting, biedingen, Buy Now, Claim, timed auctions en royalties;
- Supabase/RLS waar echt nodig;
- betalingen (iDEAL/kaart/crypto), premium opslag en Spotlight;
- admin/reputatie/badges;
- grote archief/museumopslag en metadata-export;
- WhatsApp commerce;
- multi-node failover;
- Passkeys/OTP;
- cross-chain.

## Veiligheidsregel

Nooit private keys, seeds of derived seed material in repository, browseropslag of platformdatabase opslaan. Een adminfunctie mag geen beveiligingsregels of gebruikersrechten omzeilen. Claims uit bronbestanden worden pas 'werkend' genoemd nadat code, build en gedrag aantoonbaar zijn gecontroleerd.
