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
- [x] **Carte esempio svolto** — capitolo 9 «Esercizi svolti» con i casi Bononi (130.136.128.128 /17 e /18,
      130.136.9.1 /21, conversione 37, VLSM 50/25/10) in `COMP`; nuova mappa `EX_REF` collega le carte
      SUBNET (`Borrow Bits`→9.1, `FLSM`→9.3, `VLSM`→9.5) agli esercizi, con link «Esercizio svolto §X»
      nell'overlay e stile `code`/`b` nel compendio. Verificato nel preview (0 errori, àncore `#r9.x` ok).
- [x] **Keyword `CONTIGUOUS`** — aggiunta a `KW`/`KW_INFO` (blocchi adiacenti e allineati a potenza di 2),
      applicata a `Supernet` e `Summarization`, `KW_REF` → §5.2. Verificato nel preview (glossario, overlay
      "Usata da", link §5.2, 0 errori).
- [x] **Espansione ADDRESS** — aggiunte `Loopback` (127/8 →2.2), `APIPA` (169.254/16 →2.5, nuova regola
      link-local nel compendio) e `Public IP` (→2.3), ciascuna con `INFO` (r/g/c) e `TERM_REF`. 25 carte
      totali. Verificato nel preview (ADDRESS 7 carte, overlay APIPA link §2.5, 0 errori).
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
- Capitolo 9 «Esercizi svolti» (casi Bononi) + `EX_REF` e link esercizio nelle carte SUBNET.
- Keyword `CONTIGUOUS` su `Supernet`/`Summarization` (prerequisito di aggregazione, §5.2).
- Espansione ADDRESS: `Loopback`, `APIPA` (+regola §2.5 link-local), `Public IP`.
