# VIA

VIA is het nieuwe platformproject onder `viadeso.online`.

## Huidige repository-status

Deze repository wordt stapsgewijs opgebouwd vanuit gecontroleerd projectmateriaal. Alleen onderdelen die door de aangeleverde documenten en expliciet vastgelegde projectafspraken worden ondersteund, worden vastgelegd of gebouwd.

## Reeds vastgelegd

- Database-architectuur: `docs/G_Database_SQL.md`
- SQL-code locatie: `07_CODES/`
- Historische repository-setup: `docs/repository-setup.md`
- Payment routing v1: `docs/payment-routing.md`
- Payment routing code: `07_CODES/payment-routing.ts`
- Grensgevallen voor payment routing: `07_CODES/payment-routing.test.ts`

## Databaseprincipe

DeSo/on-chain blijft de bron van waarheid voor NFT-eigendom. Supabase ondersteunt de platformlaag voor UI-data, listings en logs.

## Payment routing v1

Voorlopige basis:

- OuwePiet is de basisontvanger tot en met EUR 5,00;
- desomunt ontvangt uitsluitend het deel boven EUR 5,00;
- bedragen worden intern in eurocenten gesplitst;
- alleen public keys staan in de repository; private keys en seed phrases worden niet opgeslagen.

## Nog niet ingevuld

Het bestand `07_CODES/sql_migratie_compleet.sql` wordt pas toegevoegd zodra de volledige gecontroleerde SQL-definitie of voldoende bronmateriaal beschikbaar is. Ontbrekende kolommen, constraints, indexes, RLS-policies en triggers worden niet verzonnen.
