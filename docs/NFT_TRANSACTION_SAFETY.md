# VIA — NFT transactieveiligheid

Dit document legt veiligheidsregels vast die uit de oudere VIA/Lumen/NFT-documentatie bruikbaar blijven. Het activeert geen transacties en bevat geen private keys of signingcode.

## Regels voor toekomstige mint/listing/bid flows

1. **Expliciete review vóór signing** — toon NFT/edition, prijs, royalty's, kosten, ontvangend publiek adres en relevante permanente instellingen voordat de gebruiker ondertekent.
2. **Geen automatische herhaling** — een mint, listing, bod of andere blockchainhandeling met onzekere/pending status wordt nooit automatisch opnieuw verstuurd.
3. **Opnieuw verifiëren vóór uitvoering** — controleer vlak voor signing relevante on-chain status zoals eigenaar, edition, verkoopstatus en burn/pending status.
4. **Veilige standaard** — een nieuw geminte NFT staat niet automatisch te koop tenzij de gebruiker dat afzonderlijk kiest en ondertekent.
5. **Eén bewuste handeling per transactie** — publicatie, mint en verkoop/listing zijn afzonderlijke acties en vragen afzonderlijke bevestiging waar DeSo signing nodig is.
6. **Geen secrets in VIA-opslag of repository** — seed phrases, hoofd-private keys en andere walletgeheimen worden niet opgeslagen.
7. **Duurzame media eerst controleren** — claim nooit dat NFT-media permanent zijn opgeslagen zonder aantoonbare opslagstatus voor dat concrete medium.
8. **Unlockables afschermen** — publieke pagina's mogen bestaan/status tonen, maar geheime inhoud alleen na betrouwbaar geverifieerd eigendom en een apart toegangsmodel.
9. **Kosten vooraf zichtbaar** — toekomstige transactie-UI toont waar beschikbaar blockchainkosten, royalty's, servicekosten en nettoresultaat vóór signing.
10. **Fail closed** — als eigendom, prijs, royalty's of transactiestatus niet betrouwbaar kan worden vastgesteld, wordt de write-actie niet uitgevoerd.

## Huidige productgrens

De huidige VIA-basis blijft voor deze onderdelen read-only. Deze regels zijn ontwerpvoorwaarden voor een latere afzonderlijke transactiemodule en zijn geen toestemming om wallet-, mint-, bid- of verkoopwrites nu al te activeren.
