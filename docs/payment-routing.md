# VIA payment routing v1

Voorlopige basisconfiguratie voor VIA.

## Public keys

- OuwePiet: `BC1YLiYZREAeJgL4337px5oGWDr1c5KKRNdd4mU5b4DKTG6MdMzqt3Q`
- desomunt: `BC1YLgeR5kPmvUf2cX3cG7DArso7Dch7w8pFdUMtfAg9kSS8vxZx9At`

## Verdeelregel

De betaalrouter werkt in eurocenten:

- van €0,00 t/m €5,00 gaat het volledige bedrag naar OuwePiet;
- bij bedragen boven €5,00 blijft de eerste €5,00 voor OuwePiet;
- uitsluitend het deel boven €5,00 gaat naar desomunt.

Voorbeelden:

| Totaal | OuwePiet | desomunt |
|---:|---:|---:|
| €4,00 | €4,00 | €0,00 |
| €5,00 | €5,00 | €0,00 |
| €5,01 | €5,00 | €0,01 |
| €12,50 | €5,00 | €7,50 |

## Technisch uitgangspunt

`07_CODES/payment-routing.ts` bevat de centrale configuratie en de pure splitfunctie. Andere betaalvaluta moeten eerst tegen de voor de transactie vastgezette koers naar EUR-centen worden omgerekend voordat deze verdeelregel wordt toegepast.

Dit bestand beschrijft routinglogica; het verstuurt zelf geen blockchaintransactie en bevat geen private keys of seed phrases.
