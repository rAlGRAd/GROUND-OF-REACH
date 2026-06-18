# GROUND OF REACH — Contesto di progetto

Gioco di carte **didattico** sulle **fondamenta delle reti IPv4** — modulo **MOD 1.1 (Bononi)**.
È lo specchio **«al contrario»** di [ROOT OF TRUST](https://github.com/rAlGRAd/root-of-trust) (MOD 3.3, Active Directory):
stesso motore, stessa struttura, stesso data model — soggetto opposto.

## Principio guida (priorità assoluta)
**Minimizzare la distanza tra «gioco» e «legenda».** La meccanica della carta deve *coincidere*
con l'operazione reale di rete, così che giocare = capire il sistema. La giocabilità viene dopo
la fedeltà. Ogni carta e ogni voce di legenda è fedele alle reti IPv4 reali: se una regola non
rispecchia il comportamento reale, è un bug.

## Lo specchio (Root of Trust ↔ Ground of Reach)
| Root of Trust | Ground of Reach |
|---|---|
| Cima dello stack: fiducia / identità | Fondamenta dello stack: indirizzamento / raggiungibilità |
| **Aggrega** fiducia (gruppi, trust, SID) | **Suddivide** la rete (subnetting) — e il supernetting richiude il cerchio |
| Costo = segnaposto | Risorsa = i **32 bit** dell'indirizzo IPv4 (`cost` = bit) |
| Carta=processo, legenda=realtà AD | Carta=operazione, legenda=realtà di rete (gap minimo) |

## Architettura (statica, da filesystem, niente bundler)
- **`data.js`** — UNICA FONTE DI VERITÀ. Si modifica qui; le pagine rendono di conseguenza.
- **`index.html`** — galleria carte per classe, glossario keyword, ricerca con autocompletamento,
  finestre overlay indipendenti (drag + chiudi), rimandi al compendio.
- **`compendio.html`** — rulebook a regole numerate `Cap.Regola`, in **ordine reale di applicazione**:
  binario → indirizzo → maschera → subnetting → aggregazione → inoltro → NAT → sicurezza.
- **`build-standalone.js`** — opzionale: inlina tutto in `ground-of-reach-standalone.html`.

## Data model (`data.js`)
- `META` — titolo, sottotitolo, modulo, descrizione dello specchio, versione.
- `FAC` — fazioni/piani: `net` (Network/Subnet), `host` (Host/Endpoint), `edge` (Edge/Forwarding).
- `CLS` / `CLS_ORDER` — classi in ordine reale: `BINARY, ADDRESS, MASK, SUBNET, AGGREGATION, FORWARDING, TRANSLATION, SECURITY`.
- `KW` — `[nome, tipo, descrizione]`; tipo: `b` (bit), `a` (indirizzo), `r` (inoltro).
- `KW_INFO[name]` — `{ r: reale, g: gioco }`.
- `CARDS` — `{ n, fac, cost, ty, cls, rel, kw }`. `cost` = numero di bit oppure `"S"` (effetto/regola).
  `rel` usa `[Carta]` per i rimandi e ` → ` come connettore.
- `INFO[name]` — `{ r: cos'è davvero, g: nel gioco, c?: calcolo/comando reale }`.
- `COMP` — capitoli del compendio `{ id, title, cls, intro, rules:[[id,txt],…] }`.
- `TERM_REF[name]` / `KW_REF[name]` — rimando carta/keyword → regola del compendio (es. `"3.2"`).

## Convenzioni
- **Nomi tecnici in inglese, prosa in italiano** (es. `Netmask`, `Default Gateway`; spiegazioni in IT).
- Aggiungendo una carta: inserisci `CARDS` **e** la sua voce `INFO`; se introduce un termine/keyword
  nuovo, aggiorna `KW`+`KW_INFO` e i rimandi `TERM_REF`/`KW_REF` verso `COMP`.
- Verifica nel preview: pagine senza errori console, link e àncore (`#rX.Y`, `#cX`) che risolvono.

## Esempi di richieste
- «Aggiungi la carta `Loopback` (classe ADDRESS) con la sua legenda e rimando §2.2.»
- «Introduci la keyword `CONTIGUOUS` e applicala a `Supernet` e `Summarization`.»
- «Aggiungi il capitolo 9 del compendio sui problemi tipici di subnetting con esempi svolti.»

## Fonti del soggetto
Notebook **MOD.1.1 — BONONI** (binario, IPv4, netmask, FLSM/VLSM, supernetting/summarization,
wildcard mask, NAT, network security) + materiali Bononi (esempi netmask, ripasso reti IPv4).
