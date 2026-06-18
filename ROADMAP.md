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
- [x] **Espansione SECURITY** — carte minaccia `IP Spoofing` (→8.4) e `Subnet Scan` (→8.5) con nuovo
      campo opzionale `req` (prerequisito reale), reso in galleria e nell'overlay; regole 8.4/8.5 nel
      compendio. 27 carte. Verificato nel preview (req visibile, link §8.x, 0 errori).
- [x] **Costi in bit** — semantica `cost`: N=bit fissati (su 32), `+s`=host-bit prestati, `h`=32−prefisso,
      `S`=⊕ effetto. Assegnati `Loopback` 8, `APIPA` 16, `Borrow Bits` +s, `Host Range` h; badge con tooltip
      e legenda nel footer. Verificato nel preview (0 errori).
- [x] **Print CSS** — `@media print` in `index.html`: nasconde ricerca/nav/overlay, griglia a 3 colonne su
      fondo bianco, niente ombre/gradienti, badge e tag leggibili, carte non spezzate tra pagine
      (`break-inside:avoid`). Verificato (regola print parsata, 0 errori).
- [x] **build-standalone.js** — `node build-standalone.js` genera `ground-of-reach-standalone.html`
      (43 KB): inlina `data.js`, embedda il compendio renderizzato da `COMP` e riscrive i rimandi
      `compendio.html#r…` in àncore interne. Verificato nel preview (27 carte, 9 cap./37 regole, 0 errori).
- [x] **Revisione veridicità** — riletti INFO/regole; corretti: (1) regola 6.1 — inoltro host ora confronta
      i DUE Network ID (proprio e destinazione), non solo la destinazione; (2) `Public IP` esempio
      `203.0.113.10` (range di sola documentazione RFC5737) → `8.8.8.8` realmente instradabile; (3) `linkRel`
      — i rimandi `[keyword]` (es. `[Prefix]`) ora aprono il glossario e i termini inesistenti (`[Routing]`)
      sono testo semplice → eliminati i link morti. Confermati corretti calcoli subnetting/conversioni e
      comandi reali (uRPF, NAT/PAT, nmap, wildcard/ACL). Standalone rigenerato. 0 errori console.

## Log
<!-- una riga per ogni voce completata -->
- v0.1 — scaffold + seed iniziale (data model, 22 carte, 16 keyword, compendio 8 capitoli).
- Capitolo 9 «Esercizi svolti» (casi Bononi) + `EX_REF` e link esercizio nelle carte SUBNET.
- Keyword `CONTIGUOUS` su `Supernet`/`Summarization` (prerequisito di aggregazione, §5.2).
- Espansione ADDRESS: `Loopback`, `APIPA` (+regola §2.5 link-local), `Public IP`.
- Espansione SECURITY: `IP Spoofing`, `Subnet Scan` + campo `req` (prerequisito reale).
- Costi in bit: semantica N/+s/h/⊕, badge con tooltip e legenda.
- Print CSS: galleria stampabile (griglia 3 col, ink-friendly, no page-break nelle carte).
- build-standalone.js: single-file con galleria + glossario + compendio inlinati.
- Revisione veridicità: fix regola 6.1, esempio Public IP, link morti [Prefix]/[Routing].
- Tagging Netrunner+StS: SUBTYPES (vocab controllato, chip referenziabili) + glossario per categoria.
- diagramma.html: 4 diagrammi di flusso (DAG→SVG) da FLOWS, nodi → compendio.
- applicazioni.html: 11 applicazioni reali (net/subnetting + crittografia + sicurezza) da APPS.
- standalone esteso: ora include anche diagrammi e applicazioni (file unico, àncore interne).
