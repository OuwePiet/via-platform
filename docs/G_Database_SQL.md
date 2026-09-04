# Module G – Database

## Status
Gecontroleerde basis voor VIA. Dit document legt alleen vast wat door het aangeleverde projectmateriaal wordt ondersteund.

## Databasecomponenten
De database bevat of reserveert de volgende tabellen:

- `user_profiles`
- `nft_listings`
- `nft_bids`
- `community_spotlight`
- `gatekeeper_access_logs`
- `platform_wallet_settings`
- `archive_collections`
- `archive_items`

## Architectuurafspraak

- **DeSo/on-chain** is de bron van waarheid voor NFT-eigendom.
- **Supabase** ondersteunt de platformlaag voor UI-data, listings en logs.
- Off-chain gegevens mogen on-chain eigendom niet overschrijven of vervangen.

## SQL-migratie
De bedoelde migratie staat op:

`07_CODES/sql_migratie_compleet.sql`

De aangeleverde Module G bevat nog geen kolommen, constraints, indexes, RLS-policies of triggers. Die worden daarom niet ingevuld totdat het bijbehorende bronmateriaal is ontvangen en gecontroleerd.
