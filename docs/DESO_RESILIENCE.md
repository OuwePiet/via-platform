# DeSo netwerkresilience

VIA gebruikt DeSo als bron van waarheid voor publieke NFT-data.

Voor de publieke viewer gelden daarom deze uitgangspunten:

- standaard DeSo-node: `https://node.deso.org`
- requests hebben een vaste timeout
- tijdelijke rate-limit- en serverfouten mogen eenmaal opnieuw worden geprobeerd
- retries krijgen een korte oplopende wachttijd zodat VIA niet direct opnieuw op dezelfde fout botst
- de standaardnode blijft de veilige fallback
- er worden geen private keys, seed phrases of wallet-geheimen gebruikt

Deze laag verandert geen eigendom, verkoopstatus of on-chain gegevens; hij maakt alleen het uitlezen robuuster.
