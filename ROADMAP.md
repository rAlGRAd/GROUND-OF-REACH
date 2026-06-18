# ROADMAP — GROUND OF REACH

Stato del lavoro e prossime voci. Procedi **una voce per esecuzione**, dall'alto.

## Protocollo (per ogni esecuzione)
1. Leggi questo file. Prendi **la prima voce non spuntata** (`- [ ]`). Se non ce ne sono, no-op.
2. Implementa **solo quella voce**.
3. **Veridicità prima di tutto** + **gap gioco↔legenda minimo** (vedi `CLAUDE.md`). Se una regola non
   rispecchia il comportamento reale delle reti IPv4, è un bug.
4. **Fonte di verità = `data.js`**. `index.html` e `compendio.html` rendono di conseguenza. Aggiungendo
   termini, aggiorna `INFO`/`KW_INFO` e i rimandi `TERM_REF`/`KW_REF` verso `COMP`.
5. **Verifica** nel preview: 0 errori console, link e àncore (`#rX.Y`, `#cX`) che risolvono.
6. **Spunta la voce** (`- [x]`) con nota breve. Poi fermati.

## Lavori (in ordine di priorità)
- [ ] **Carte esempio svolto** — aggiungi al compendio un capitolo 9 «Esercizi svolti» con i casi del
      materiale Bononi (es. 130.136.128.128 /17, 130.136.9.1 /21) e collega carte SUBNET ai casi.
- [ ] **Keyword `CONTIGUOUS`** — prerequisito di aggregazione; in `KW`/`KW_INFO`, applicala a
      `Supernet` e `Summarization`, con `KW_REF` → §5.2.
- [ ] **Espansione ADDRESS** — carte `Loopback` (127/8), `APIPA` (169.254/16), `Public IP`, ciascuna
      con `INFO` e `TERM_REF` verso §2.
- [ ] **Espansione SECURITY** — carte minaccia: `IP Spoofing`, `Subnet Scan`, con campo opzionale
      `req` (prerequisito reale della tecnica) reso in carta e legenda.
- [ ] **Costi in bit** — assegna `cost` numerico (host-bit / prefisso) alle carte dove la quantità è
      didatticamente significativa (es. `Borrow Bits`, `Host Range`); aggiorna il rendering.
- [ ] **Print CSS** — `@media print` in `index.html`: nasconde nav/ricerca, stampa la griglia carte.
- [ ] **build-standalone.js** — implementa l'inlining di `data.js` + pagine in un unico HTML.
- [ ] **Revisione veridicità** — rileggi 5 voci `INFO`/regole e correggi imprecisioni; annota quali.

## Log
<!-- una riga per ogni voce completata -->
- v0.1 — scaffold + seed iniziale (data model, 22 carte, 16 keyword, compendio 8 capitoli).
