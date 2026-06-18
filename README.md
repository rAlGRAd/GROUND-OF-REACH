# GROUND OF REACH

Gioco di carte **didattico** sulle **fondamenta delle reti IPv4** (MOD 1.1 — Bononi).
Lo specchio **«al contrario»** di [ROOT OF TRUST](https://github.com/rAlGRAd/root-of-trust)
(MOD 3.3, Active Directory): **stesso motore, soggetto opposto**.

Dove Root of Trust *sale* verso la fiducia in cima allo stack, Ground of Reach *scende* alle
fondamenta dell'indirizzamento e **suddivide** la rete. La risorsa del gioco sono i **32 bit**
di un indirizzo IPv4, e le azioni (AND, prendi-in-prestito, suddividi, aggrega) **sono** le
operazioni di rete reali: la **carta** dice l'operazione, la **legenda** dice cos'è davvero in rete —
con il minimo scarto possibile fra le due.

## File
| File | Cosa è |
|---|---|
| `index.html` | Galleria carte (per classe) + glossario keyword + ricerca con autocompletamento; finestre overlay indipendenti (trascinabili, si chiudono con un click); rimandi al compendio. |
| `compendio.html` | Compendio dei **processi delle reti IPv4** in stile rulebook a regole numerate (Cap.Regola), in ordine reale: binario → indirizzo → maschera → subnetting → aggregazione → inoltro → NAT → sicurezza. |
| `diagramma.html` | **Diagrammi di flusso** dei processi tecnici/di gioco (inoltro pacchetto, subnetting, binario→maschera, ACL) renderizzati in SVG da `FLOWS`; i nodi rimandano alle carte nel compendio. |
| `applicazioni.html` | **Applicazioni reali** delle meccaniche (subnetting: VLSM/CIDR/NAT/BGP; crittografia: bitmask AND, XOR/WEP, bit di chiave, RSA; sicurezza: ACL/IPsec/anti-spoofing) da `APPS`. |
| `data.js` | **Unica fonte di verità**: META, fazioni, classi, keyword, carte, legenda, compendio, rimandi. Si modifica qui. |
| `build-standalone.js` | Genera `ground-of-reach-standalone.html` (single-file, comodo da condividere). |
| `CLAUDE.md` | Contesto di progetto per Claude Code. |
| `ROADMAP.md` | Stato e prossimi lavori. |

## Aprire
Doppio click su `index.html` (o `compendio.html`). È tutto statico: nessuna installazione,
funziona offline da filesystem.

## Versione single-file (opzionale)
```bash
node build-standalone.js   # crea ground-of-reach-standalone.html
```

## Lavorarci con Claude Code
```bash
cd ground-of-reach
claude
```
Claude Code legge automaticamente `CLAUDE.md`. Esempi:
- «Aggiungi la carta `Loopback` (ADDRESS) con legenda e rimando §2.2.»
- «Introduci la keyword `CONTIGUOUS` e applicala a `Supernet` e `Summarization`.»
- «Aggiungi gli esempi svolti di subnetting come capitolo 9 del compendio.»

## Regola d'oro
Ogni carta e ogni voce di legenda deve essere **fedele alle reti IPv4 reali**, e la **meccanica
deve coincidere con l'operazione**: si impara giocando. La veridicità viene prima della giocabilità.

## Versione
v0.1 — seed iterabile. Soggetto: MOD 1.1 (Bononi). Costi in bit dove pertinenti; il resto è `S`.
