# Velcon broncontrole — Google-100%-klaar

Bron: `Google-100%-klaar.docx`

## Status

Dit document wordt behandeld als een bron-/idee-document en niet als bewijs dat VIA technisch al volledig productie-klaar is.

## Bruikbaar als richting

- Serverless architectuur als kostenbewuste ontwerpkeuze.
- DeSo/on-chain als belangrijke technische basis.
- Fail-safe ontwerp en node-fallback als gewenste robuustheid.
- Sterke beveiliging rond wallets en transacties.
- Gefaseerde lancering en gecontroleerde uitrol.

## Nog niet bewezen of niet automatisch overnemen

De volgende claims uit het document zijn niet als geïmplementeerd aangetoond door dit document alleen en mogen daarom niet als gereed worden gemarkeerd zonder code- en deploymentcontrole:

- WhatsApp Commerce Funnel.
- Geautomatiseerde hybride veilingklok.
- Anonieme chat-fallback.
- Passkey-handshakes.
- Volledige Supabase SQL/RLS-set.
- Gasless Relay Server.
- Buy & Burn-tokenomics.
- Node Fallback Router.
- Auto-Sweep naar hardware wallet.
- Developer/God-Mode whitelist-bypass.
- 24-uurs FOMO-launchcyclus.

## VIA-afwijkingen

- Het document spreekt over Lumen en een directe Lumen-launch. VIA is het actuele platformproject onder `viadeso.online`; oude Lumen-launchinstructies gelden niet automatisch voor VIA.
- Supabase is bij VIA ondersteunend aan de platformlaag; DeSo/on-chain blijft de bron van waarheid voor NFT-eigendom.
- Private keys, seed phrases en walletgeheimen mogen nooit in de repository worden opgeslagen.
- Productieclaims worden pas bevestigd nadat code, tests, Vercel-build en productiegedrag zijn gecontroleerd.

## Werkregel voor volgende Velcon-documenten

Voor ieder nieuw document worden onderdelen ingedeeld als:

1. reeds aanwezig;
2. bruikbaar maar nog te bouwen;
3. eerst technisch te verifiëren;
4. niet passend bij VIA;
5. veiligheids- of productie-risico.

Alleen categorie 1 en aantoonbaar afgeronde onderdelen uit categorie 2 mogen als 'gereed' worden beschouwd.
