# VIA changelog

## DeSo resilience

- DeSo requests houden de bestaande timeout.
- Tijdelijke HTTP 429- en 5xx-fouten krijgen één gecontroleerde retry.
- Voor de retry wordt kort gewacht om directe herhaling tegen dezelfde storing te voorkomen.
- Geen wijziging aan NFT-eigendom, verkooplogica of walletgedrag.
