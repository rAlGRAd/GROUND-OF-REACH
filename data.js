/* =====================================================================
   GROUND OF REACH — data.js — UNICA FONTE DI VERITÀ
   ---------------------------------------------------------------------
   Specchio "al contrario" di ROOT OF TRUST (MOD 3.3 · Active Directory).
   Soggetto: fondamenta delle reti IPv4 — MOD 1.1 · Bononi.

   Convenzione:  termini tecnici in INGLESE, prosa in ITALIANO.
   Regola d'oro: ogni CARTA e ogni LEGENDA è fedele alle reti IPv4 reali.
                 La meccanica deve COINCIDERE con l'operazione reale:
                 minimizza la distanza tra "gioco" e "legenda".
   Si modifica QUI; index.html e compendio.html rendono di conseguenza.
   ===================================================================== */

const META = {
  title: "GROUND OF REACH",
  subtitle: "Le fondamenta della rete IPv4 — binario · maschere · subnetting · NAT",
  module: "MOD 1.1 — Bononi",
  mirror: "Root of Trust sale verso la fiducia (cima dello stack); Ground of Reach scende alle fondamenta dell'indirizzamento e SUDDIVIDE la rete.",
  version: "v0.1 — seed iterabile"
};

/* Fazioni = i tre piani della rete (i tre 'colori' del gioco) */
const FAC = {
  net:  { label: "Network / Subnet", hint: "indirizzi, maschere, sottoreti" },
  host: { label: "Host / Endpoint",  hint: "nodi terminali e loro range" },
  edge: { label: "Edge / Forwarding", hint: "router, gateway, NAT, ACL" }
};

/* Classi = ordine REALE di applicazione (guida il compendio) */
const CLS_ORDER = ["BINARY","ADDRESS","MASK","SUBNET","AGGREGATION","FORWARDING","TRANSLATION","SECURITY"];
const CLS = {
  BINARY:      "Rappresentazione binaria",
  ADDRESS:     "Indirizzo e classi",
  MASK:        "Maschera e prefisso",
  SUBNET:      "Subnetting",
  AGGREGATION: "Aggregazione",
  FORWARDING:  "Inoltro e instradamento",
  TRANSLATION: "Traduzione (NAT)",
  SECURITY:    "Sicurezza"
};

/* ---------------------------------------------------------------------
   KEYWORD — [nome, tipo, descrizione breve]
   tipo:  "b" operazione sui bit · "a" struttura d'indirizzo · "r" inoltro
   --------------------------------------------------------------------- */
const KW = [
  ["BIT",       "b", "Unità: 32 bit formano un indirizzo IPv4. È la risorsa del gioco."],
  ["POWER2",    "b", "Con n bit → 2^n combinazioni; host utili = 2^h − 2."],
  ["AND",       "b", "AND bit-a-bit tra IP e Netmask → ricava il Network ID."],
  ["PREFIX",    "a", "Il /n: numero di bit di rete (a 1, contigui da sinistra)."],
  ["NETID",     "a", "Primo indirizzo del blocco: host-bit tutti a 0."],
  ["BROADCAST", "a", "Ultimo indirizzo del blocco: host-bit tutti a 1."],
  ["HOSTRANGE", "a", "Host assegnabili: da NetID+1 a Broadcast−1."],
  ["BORROW",    "b", "Prende in prestito host-bit per creare sottoreti (allunga il prefisso)."],
  ["SPLIT",     "b", "Suddivide un blocco in 2^s sottoreti."],
  ["AGGREGATE", "a", "Accorpa blocchi contigui (supernetting): accorcia il prefisso."],
  ["CONTIGUOUS", "a", "Blocchi adiacenti e allineati a una potenza di 2: prerequisito dell'aggregazione."],
  ["PRIVATE",   "a", "Spazi RFC1918 (10/8, 172.16/12, 192.168/16): non instradabili."],
  ["ROUTE",     "r", "Inoltro verso una rete remota tramite la tabella di routing."],
  ["GATEWAY",   "r", "Uscita dalla sottorete locale verso reti diverse."],
  ["MATCH",     "r", "Confronto: vince il prefisso più lungo (più specifico)."],
  ["TRANSLATE", "r", "Riscrive indirizzo/porta al confine (NAT/PAT)."],
  ["WILDCARD",  "b", "Maschera inversa: 0=deve combaciare, 1=indifferente. Usata nelle ACL."]
];

/* Significato REALE di ogni keyword (legenda del glossario) */
const KW_INFO = {
  BIT:       { r: "Un indirizzo IPv4 è lungo 32 bit, scritti come 4 ottetti decimali (0–255).", g: "Ogni carta spende/alloca BIT: i 32 bit sono il budget condiviso del tavolo." },
  POWER2:    { r: "n bit rappresentano 2^n valori. In una rete: 2^h indirizzi, di cui 2^h−2 host utili (NetID e Broadcast esclusi).", g: "Determina quante carte Host entrano in un blocco e quante sottoreti produce uno SPLIT." },
  AND:       { r: "Il Network ID si ottiene con l'AND logico bit-a-bit fra indirizzo e maschera.", g: "Azione base: combini [IPv4 Address] e [Netmask] per rivelare la rete a cui appartieni." },
  PREFIX:    { r: "Il prefisso /n indica quanti bit, da sinistra, identificano la rete.", g: "Il 'livello' della carta: allungarlo (+bit) divide, accorciarlo (−bit) aggrega." },
  NETID:     { r: "Indirizzo con tutti gli host-bit a 0: identifica il blocco, non un host.", g: "La carta 'ancora' del blocco; non può essere occupata da un Host." },
  BROADCAST: { r: "Indirizzo con tutti gli host-bit a 1: raggiunge tutti gli host del blocco.", g: "Chiude il blocco e delimita la HOSTRANGE; non occupabile." },
  HOSTRANGE: { r: "Gli indirizzi assegnabili vanno da NetID+1 a Broadcast−1.", g: "Lo spazio in cui collochi le carte Host del blocco." },
  BORROW:    { r: "Per creare sottoreti si convertono host-bit in bit di rete, allungando il prefisso.", g: "Spendi host-bit per guadagnare sottoreti: il trade-off centrale del gioco." },
  SPLIT:     { r: "s bit prestati dividono un blocco in 2^s sottoreti uguali.", g: "Un'azione SPLIT trasforma 1 carta-blocco in 2^s carte-blocco figlie." },
  AGGREGATE: { r: "Blocchi contigui e allineati si fondono in un prefisso più corto (supernet).", g: "Inverso di BORROW: ricuci più blocchi in uno, come Root of Trust aggrega fiducia." },
  CONTIGUOUS:{ r: "Per aggregare, i blocchi devono essere adiacenti e allineati a un confine potenza di 2 (es. .0/24 + .1/24 → /23, ma non .1/24 + .2/24).", g: "Requisito di AGGREGATE: solo carte-blocco confinanti e allineate si possono fondere." },
  PRIVATE:   { r: "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 non sono instradabili in Internet (RFC1918).", g: "Carte 'interne': per uscire devono passare da una carta TRANSLATE." },
  ROUTE:     { r: "Un router inoltra il pacchetto consultando la tabella di routing.", g: "Sposta una carta verso una rete non locale." },
  GATEWAY:   { r: "Il default gateway riceve il traffico destinato fuori dalla sottorete locale.", g: "Porta d'uscita obbligata quando la destinazione non è nel tuo blocco." },
  MATCH:     { r: "Fra più rotte compatibili vince quella con il prefisso più lungo.", g: "Risoluzione dei conflitti fra carte FORWARDING: la più specifica prevale." },
  TRANSLATE: { r: "La NAT riscrive l'indirizzo (e la porta, in PAT) al confine della rete.", g: "Converte una carta PRIVATE in una pubblica per attraversare l'Edge." },
  WILDCARD:  { r: "Maschera inversa usata nelle ACL: 0 impone il match del bit, 1 lo ignora.", g: "Filtro: definisce quali carte una ACL intercetta." }
};

/* ---------------------------------------------------------------------
   CARTE — { n, fac, cost, ty, cls, rel, kw }
   cost = BIT in gioco (numero) oppure "S" (effetto/regola, senza costo fisso)
   rel  = testo meccanico: [Carta] referenziata, " → " connettore
   --------------------------------------------------------------------- */
const CARDS = [
  /* --- BINARY --- */
  { n:"Bit",            fac:"net",  cost:"1",  ty:"Unità · Risorsa",       cls:"BINARY",      rel:"32× [Bit] = 1 [IPv4 Address]. Ogni [Bit] vale una potenza di 2.", kw:["BIT","POWER2"] },
  { n:"Octet",          fac:"net",  cost:"8",  ty:"Struttura",             cls:"BINARY",      rel:"8× [Bit] = 1 [Octet] (0–255) → 4× [Octet] = [IPv4 Address].", kw:["BIT","POWER2"] },
  { n:"Place Value",    fac:"net",  cost:"S",  ty:"Tecnica · Conversione", cls:"BINARY",      rel:"128 64 32 16 8 4 2 1 → somma i [Bit] a 1 per convertire dec↔bin.", kw:["BIT","POWER2"] },

  /* --- ADDRESS --- */
  { n:"IPv4 Address",   fac:"host", cost:"32", ty:"Oggetto",              cls:"ADDRESS",     rel:"32 [Bit] = [Network ID] + Host ID; il confine lo fissa la [Netmask].", kw:["BIT","NETID","PREFIX"] },
  { n:"Address Class",  fac:"net",  cost:"S",  ty:"Schema · Storico",     cls:"ADDRESS",     rel:"A /8 · B /16 · C /24 → prefisso classful di default. Superato da [CIDR].", kw:["PREFIX"] },
  { n:"Private Range",  fac:"host", cost:"S",  ty:"Oggetto",              cls:"ADDRESS",     rel:"10/8 · 172.16/12 · 192.168/16 → non instradabili; per uscire serve [NAT].", kw:["PRIVATE","TRANSLATE"] },
  { n:"CIDR",           fac:"net",  cost:"S",  ty:"Schema",               cls:"ADDRESS",     rel:"Il [Prefix] /n è esplicito e variabile → rimpiazza la [Address Class].", kw:["PREFIX","AGGREGATE"] },
  { n:"Loopback",       fac:"host", cost:"8",  ty:"Oggetto · Riservato",  cls:"ADDRESS",     rel:"127.0.0.0/8 → punta all'host stesso (127.0.0.1). Mai instradato fuori.", kw:["PREFIX"] },
  { n:"APIPA",          fac:"host", cost:"16", ty:"Oggetto · Autoconfig", cls:"ADDRESS",     rel:"169.254.0.0/16 → autoassegnato in assenza di DHCP. Solo segmento locale.", kw:["PREFIX"] },
  { n:"Public IP",      fac:"host", cost:"S",  ty:"Oggetto",              cls:"ADDRESS",     rel:"Indirizzo globalmente instradabile (no [Private Range]); spesso ottenuto via [NAT].", kw:["ROUTE","TRANSLATE"] },

  /* --- MASK --- */
  { n:"Netmask",        fac:"net",  cost:"S",  ty:"Oggetto · Operatore",  cls:"MASK",        rel:"[IPv4 Address] AND [Netmask] → [Network ID]. 1=rete, 0=host.", kw:["AND","PREFIX","NETID"] },
  { n:"Network ID",     fac:"net",  cost:"S",  ty:"Oggetto",              cls:"MASK",        rel:"Host-[Bit] tutti a 0 → primo indirizzo del blocco. Prodotto da [Netmask].", kw:["NETID","AND"] },
  { n:"Broadcast",      fac:"net",  cost:"S",  ty:"Oggetto",              cls:"MASK",        rel:"Host-[Bit] tutti a 1 → ultimo indirizzo; chiude la [Host Range].", kw:["BROADCAST","HOSTRANGE"] },
  { n:"Host Range",     fac:"host", cost:"h",  ty:"Oggetto",              cls:"MASK",        rel:"[Network ID]+1 … [Broadcast]−1 → host utili = 2^h − 2.", kw:["HOSTRANGE","POWER2"] },

  /* --- SUBNET --- */
  { n:"Borrow Bits",    fac:"net",  cost:"+s", ty:"Tecnica · Subnetting", cls:"SUBNET",      rel:"Sposta s host-[Bit] nella rete → 2^s [Network ID]. Allunga il [Prefix].", kw:["BORROW","SPLIT","POWER2","PREFIX"] },
  { n:"FLSM",           fac:"net",  cost:"S",  ty:"Tecnica · Subnetting", cls:"SUBNET",      rel:"[Borrow Bits] uniforme → sottoreti di pari taglia. Spreca se i fabbisogni differiscono.", kw:["SPLIT","BORROW"] },
  { n:"VLSM",           fac:"net",  cost:"S",  ty:"Tecnica · Subnetting", cls:"SUBNET",      rel:"Maschere variabili: assegna prima i blocchi grandi, poi i piccoli → spreco minimo.", kw:["SPLIT","BORROW","HOSTRANGE"] },

  /* --- AGGREGATION --- */
  { n:"Supernet",       fac:"net",  cost:"S",  ty:"Tecnica · Aggregazione", cls:"AGGREGATION", rel:"Accorpa 2^s blocchi contigui → accorcia il [Prefix]. Inverso di [Borrow Bits].", kw:["AGGREGATE","CONTIGUOUS","PREFIX"] },
  { n:"Summarization",  fac:"edge", cost:"S",  ty:"Tecnica · Aggregazione", cls:"AGGREGATION", rel:"Un solo [Prefix] riassume molte rotte → tabella di [Routing] più piccola.", kw:["AGGREGATE","CONTIGUOUS","ROUTE","MATCH"] },

  /* --- FORWARDING --- */
  { n:"Default Gateway",      fac:"edge", cost:"S", ty:"Oggetto",          cls:"FORWARDING",  rel:"Destinazione fuori dalla [Host Range] locale → consegna al [Default Gateway].", kw:["GATEWAY","ROUTE"] },
  { n:"Longest Prefix Match", fac:"edge", cost:"S", ty:"Regola · Routing", cls:"FORWARDING",  rel:"Tra più rotte che combaciano vince il [Prefix] più lungo (più specifico).", kw:["MATCH","ROUTE","PREFIX"] },

  /* --- TRANSLATION --- */
  { n:"NAT",            fac:"edge", cost:"S",  ty:"Tecnica · Edge",       cls:"TRANSLATION", rel:"Riscrive [Private Range] → IP pubblico al confine. 1:1 statico/dinamico.", kw:["TRANSLATE","PRIVATE","GATEWAY"] },
  { n:"PAT",            fac:"edge", cost:"S",  ty:"Tecnica · Edge",       cls:"TRANSLATION", rel:"NAT overload: molti host → 1 IP pubblico, distinti dalla porta sorgente.", kw:["TRANSLATE","PRIVATE"] },

  /* --- SECURITY --- */
  { n:"Wildcard Mask",  fac:"edge", cost:"S",  ty:"Oggetto · Operatore",  cls:"SECURITY",    rel:"Inverso della [Netmask]: 0=combacia, 1=indifferente. Alimenta la [ACL].", kw:["WILDCARD","MATCH"] },
  { n:"ACL",            fac:"edge", cost:"S",  ty:"Policy",               cls:"SECURITY",    rel:"Confronta il pacchetto con [Wildcard Mask] → permit/deny. Vince la prima riga che combacia.", kw:["WILDCARD","MATCH"] },
  { n:"IP Spoofing",    fac:"edge", cost:"S",  ty:"Minaccia · Spoofing",  cls:"SECURITY",    rel:"Falsifica l'IP sorgente → aggira i filtri della [ACL]. Inefficace con ingress filtering.", kw:["MATCH"], req:"Assenza di ingress filtering (BCP38/uRPF) sul percorso." },
  { n:"Subnet Scan",    fac:"edge", cost:"S",  ty:"Minaccia · Recon",     cls:"SECURITY",    rel:"Enumera la [Host Range] del bersaglio (ping/ARP sweep) per trovare host attivi.", kw:["HOSTRANGE","NETID","PREFIX"], req:"Conoscere [Network ID] e [Prefix] del bersaglio." }
];

/* ---------------------------------------------------------------------
   LEGENDA — INFO[nomeCarta] = { r, g, c? }
   r = cos'è DAVVERO nelle reti IPv4 · g = come funziona nel gioco · c = calcolo/comando reale
   --------------------------------------------------------------------- */
const INFO = {
  "Bit":            { r:"Cifra binaria (0/1). Un indirizzo IPv4 ne ha 32, in 4 ottetti.", g:"L'unità-risorsa: i 32 bit dell'indirizzo sono il budget da allocare fra rete e host.", c:"2^7…2^0 = 128 64 32 16 8 4 2 1" },
  "Octet":          { r:"Gruppo di 8 bit; in decimale va da 0 a 255. Quattro ottetti formano l'indirizzo.", g:"Confeziona 8 [Bit] in un valore 0–255 della notazione puntata.", c:"11000000 = 128+64 = 192" },
  "Place Value":    { r:"Metodo di conversione: ogni posizione binaria vale una potenza di 2; il decimale è la somma dei bit a 1.", g:"Tecnica per leggere/scrivere qualunque carta in binario, base di AND e maschere.", c:"37 = 32+4+1 → 00100101" },

  "IPv4 Address":   { r:"Identificatore logico a 32 bit di un'interfaccia; si divide in parte di rete e parte di host.", g:"La carta-bersaglio: combinata con [Netmask] rivela a quale [Network ID] appartiene.", c:"192.168.1.10 = 11000000.10101000.00000001.00001010" },
  "Address Class":  { r:"Sistema classful storico: A (1–126), B (128–191), C (192–223); 127 = loopback.", g:"Fissa il prefisso di default di una carta prima di qualunque [Borrow Bits].", c:"B: 130.136.x.y → /16 di default" },
  "Private Range":  { r:"Blocchi RFC1918 riservati alle reti interne, non instradabili su Internet.", g:"Carte 'interne': non escono finché una carta [NAT] non le traduce.", c:"10/8 · 172.16/12 · 192.168/16" },
  "CIDR":           { r:"Classless Inter-Domain Routing: il prefisso /n è esplicito e di lunghezza qualsiasi.", g:"Sblocca prefissi arbitrari, abilitando subnetting e aggregazione fini.", c:"192.168.1.0/26" },
  "Loopback":       { r:"127.0.0.0/8 è riservato al loopback: identifica l'host locale (tipicamente 127.0.0.1); i pacchetti non lasciano mai la macchina.", g:"Carta 'interna alla macchina': non entra mai nel routing.", c:"ping 127.0.0.1 → testa lo stack TCP/IP locale" },
  "APIPA":          { r:"169.254.0.0/16 (link-local, RFC3927): un host se l'assegna da solo quando non riceve un indirizzo dal DHCP; comunica solo nello stesso segmento e non è instradabile.", g:"Indirizzo di ripiego: gioca solo nel blocco locale, mai oltre il gateway.", c:"Windows: «Indirizzo IP autoconfigurato 169.254.x.y»" },
  "Public IP":      { r:"Indirizzo globalmente univoco e instradabile su Internet, assegnato da IANA/RIR; è l'opposto degli spazi privati RFC1918.", g:"Carta che attraversa l'Edge senza traduzione; è il bersaglio della NAT.", c:"es. 203.0.113.10 (TEST-NET-3)" },

  "Netmask":        { r:"Sequenza di 32 bit con 1 sui bit di rete e 0 su quelli di host; l'AND con l'indirizzo dà la rete.", g:"L'operatore centrale: applicato a [IPv4 Address] produce [Network ID].", c:"192.168.1.10 AND 255.255.255.0 → 192.168.1.0" },
  "Network ID":     { r:"Indirizzo con host-bit tutti a 0: nomina il blocco e non è assegnabile a un host.", g:"Ancora del blocco; le carte Host le si collocano accanto, mai sopra.", c:"/24 → 192.168.1.0" },
  "Broadcast":      { r:"Indirizzo con host-bit tutti a 1: raggiunge tutti gli host del blocco; non assegnabile.", g:"Chiude il blocco e segna il bordo superiore della [Host Range].", c:"/24 → 192.168.1.255" },
  "Host Range":     { r:"Indirizzi assegnabili: da [Network ID]+1 a [Broadcast]−1; host utili = 2^h − 2.", g:"Lo spazio giocabile del blocco; quante carte Host può contenere.", c:"/24 → .1–.254 (254 host)" },

  "Borrow Bits":    { r:"Subnetting: si convertono host-bit in bit di rete, allungando il prefisso da /n a /n+s.", g:"Trade-off cardine: spendi host-bit per ottenere 2^s sottoreti.", c:"/24 +3 → /27 = 8 sottoreti × 30 host" },
  "FLSM":           { r:"Fixed-Length Subnet Mask: tutte le sottoreti hanno la stessa maschera/taglia.", g:"SPLIT uniforme: semplice, ma può sprecare indirizzi se i fabbisogni variano.", c:"/24 → 4× /26 (62 host ciascuna)" },
  "VLSM":           { r:"Variable-Length Subnet Mask: maschere diverse per blocco, assegnando prima i fabbisogni grandi.", g:"SPLIT a misura: minimo spreco; richiede di ordinare i fabbisogni in decrescente.", c:"50/25/10 host → /26 · /27 · /28" },

  "Supernet":       { r:"Supernetting: accorpa 2^s blocchi contigui e allineati accorciando il prefisso.", g:"Inverso di [Borrow Bits]: ricuci i blocchi, come Root of Trust aggrega la fiducia.", c:"192.168.0.0/24 + 192.168.1.0/24 → /23" },
  "Summarization":  { r:"Route summarization: un prefisso riassuntivo rappresenta molte reti in tabella.", g:"Riduce le carte FORWARDING in gioco fondendole in una sola rotta.", c:"10.1.0.0/24…10.1.3.0/24 → 10.1.0.0/22" },

  "Default Gateway":      { r:"Router locale a cui l'host invia il traffico destinato fuori dalla propria sottorete.", g:"Uscita obbligata quando la destinazione non cade nella tua [Host Range].", c:"ip route 0.0.0.0 0.0.0.0 <gw>" },
  "Longest Prefix Match": { r:"Regola di scelta della rotta: vince la voce con il prefisso più lungo (più specifica).", g:"Risolve i conflitti tra carte FORWARDING: la più specifica prevale sulla generica.", c:"10.1.1.0/24 batte 10.0.0.0/8 per 10.1.1.5" },

  "NAT":            { r:"Network Address Translation: riscrive l'indirizzo privato in pubblico al confine.", g:"Trasforma una carta [Private Range] in pubblica per attraversare l'Edge.", c:"ip nat inside source static 10.0.0.5 203.0.113.5" },
  "PAT":            { r:"Port Address Translation (NAT overload): molti host condividono un IP pubblico via porta sorgente.", g:"Multiplexa molte carte interne su una sola uscita pubblica.", c:"ip nat inside source list 1 interface g0/0 overload" },

  "Wildcard Mask":  { r:"Maschera inversa: 0 impone il match del bit, 1 lo rende indifferente; usata nelle ACL.", g:"Definisce quali carte una [ACL] intercetta; è il complemento bit-a-bit della [Netmask].", c:"netmask 255.255.255.0 → wildcard 0.0.0.255" },
  "ACL":            { r:"Access Control List: regole permit/deny confrontate in ordine; vince la prima che combacia.", g:"Filtro a regole sequenziali con deny implicito finale.", c:"access-list 10 permit 192.168.1.0 0.0.0.255" },
  "IP Spoofing":    { r:"L'attaccante falsifica l'indirizzo IP sorgente dei pacchetti per impersonare un altro host o nascondersi. Si contrasta con ingress filtering (BCP38) e uRPF, che scartano i pacchetti con sorgente implausibile.", g:"Carta minaccia: aggira le ACL basate sulla sorgente; bloccata se l'Edge applica anti-spoofing.", c:"uRPF: ip verify unicast source reachable-via rx" },
  "Subnet Scan":    { r:"Ricognizione che enumera gli indirizzi della host range di una sottorete (ping sweep ICMP o ARP scan) per individuare gli host attivi prima di un attacco.", g:"Carta recon: rivela le carte Host presenti in un blocco; per enumerarlo serve conoscerne rete e prefisso.", c:"nmap -sn 192.168.1.0/24" }
};

/* ---------------------------------------------------------------------
   COMPENDIO — capitoli in ordine REALE di applicazione (Cap.Regola)
   --------------------------------------------------------------------- */
const COMP = [
  { id:"1", title:"Binario e valori di posizione", cls:"BINARY", intro:"Tutto parte dai 32 bit dell'indirizzo.", rules:[
    ["1.1","Un indirizzo IPv4 è una sequenza di 32 bit, raggruppati in 4 ottetti da 8 bit (notazione puntata, 0–255)."],
    ["1.2","Ogni posizione binaria vale una potenza di 2 (128 64 32 16 8 4 2 1). Il valore di un ottetto è la somma dei bit a 1."],
    ["1.3","Conversione dec→bin: sottrai il valore di posizione più grande possibile, segna 1, ripeti sul resto."],
    ["1.4","Con n bit si rappresentano 2^n combinazioni distinte."]
  ]},
  { id:"2", title:"Indirizzo IPv4 e classi", cls:"ADDRESS", intro:"L'indirizzo si divide in rete e host.", rules:[
    ["2.1","L'indirizzo si divide in Network ID (parte alta) e Host ID (parte bassa); il confine è dato dalla maschera."],
    ["2.2","Classful storico: A 1–126 (/8), B 128–191 (/16), C 192–223 (/24). 127 è riservato al loopback."],
    ["2.3","Indirizzi privati RFC1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16; non instradabili in Internet."],
    ["2.4","CIDR supera le classi: il prefisso /n è esplicito e di lunghezza variabile."],
    ["2.5","169.254.0.0/16 (APIPA / link-local): autoconfigurazione in assenza di DHCP; valido solo sul segmento locale, non instradabile. 127.0.0.0/8 è il loopback (host stesso)."]
  ]},
  { id:"3", title:"Maschera di rete e prefisso", cls:"MASK", intro:"La maschera separa rete e host.", rules:[
    ["3.1","La maschera ha i bit di rete a 1 e i bit di host a 0, contigui da sinistra. /n = n bit a 1."],
    ["3.2","Network ID = IPv4 AND Netmask (AND logico bit-a-bit)."],
    ["3.3","Il Network ID ha gli host-bit tutti a 0 (primo indirizzo del blocco); non assegnabile a un host."],
    ["3.4","Il Broadcast ha gli host-bit tutti a 1 (ultimo indirizzo); non assegnabile a un host."],
    ["3.5","Host utili = 2^h − 2, con h = 32 − n (esclusi Network ID e Broadcast)."]
  ]},
  { id:"4", title:"Subnetting", cls:"SUBNET", intro:"Suddividere prendendo in prestito host-bit.", rules:[
    ["4.1","Per creare sottoreti si prendono in prestito host-bit, allungando il prefisso da /n a /n+s."],
    ["4.2","s bit prestati → 2^s sottoreti; ciascuna ha 2^(h−s) − 2 host utili."],
    ["4.3","FLSM: stessa maschera per tutte le sottoreti (stessa taglia). Semplice ma può sprecare indirizzi."],
    ["4.4","VLSM: maschere variabili. Assegna prima i fabbisogni più grandi, poi i più piccoli, su blocchi contigui."]
  ]},
  { id:"5", title:"Aggregazione e supernetting", cls:"AGGREGATION", intro:"Ricucire blocchi contigui.", rules:[
    ["5.1","Supernetting: accorpa 2^s blocchi contigui accorciando il prefisso (/n−s). È l'inverso del subnetting."],
    ["5.2","Per aggregare, i blocchi devono essere contigui e allineati a una potenza di 2."],
    ["5.3","La route summarization riduce la dimensione della tabella di routing con un prefisso riassuntivo."]
  ]},
  { id:"6", title:"Inoltro e instradamento", cls:"FORWARDING", intro:"Locale o remoto?", rules:[
    ["6.1","L'host confronta (AND) la destinazione con la propria maschera: stessa rete → consegna diretta; rete diversa → al default gateway."],
    ["6.2","Un router sceglie la rotta con il prefisso che combacia più lungo (longest prefix match)."],
    ["6.3","La rotta di default 0.0.0.0/0 combacia con tutto (prefisso più corto): è l'ultima risorsa."]
  ]},
  { id:"7", title:"Traduzione degli indirizzi (NAT)", cls:"TRANSLATION", intro:"Dal privato al pubblico.", rules:[
    ["7.1","La NAT riscrive l'indirizzo sorgente privato in un indirizzo pubblico al confine della rete."],
    ["7.2","La PAT (NAT overload) multiplexa molti host su un solo IP pubblico usando la porta sorgente."],
    ["7.3","La NAT permette di usare lo spazio privato RFC1918 dietro pochi indirizzi pubblici."]
  ]},
  { id:"8", title:"Sicurezza: wildcard e ACL", cls:"SECURITY", intro:"Filtrare il traffico.", rules:[
    ["8.1","La wildcard mask è l'inverso della netmask: 0 = il bit deve combaciare, 1 = indifferente."],
    ["8.2","Le ACL confrontano i pacchetti con coppie indirizzo/wildcard e applicano permit o deny."],
    ["8.3","L'ordine conta: vince la prima riga che combacia; c'è un deny implicito finale."],
    ["8.4","<b>IP spoofing</b>: falsificazione dell'IP sorgente per impersonare o nascondersi; si contrasta con <b>ingress filtering</b> (BCP38) e <b>uRPF</b>. <i>Prerequisito</i>: assenza di tali filtri sul percorso."],
    ["8.5","<b>Subnet scan</b> (ping/ARP sweep): enumerazione della host range per scoprire host attivi. <i>Prerequisito</i>: conoscere Network ID e prefisso del bersaglio."]
  ]},
  { id:"9", title:"Esercizi svolti (materiale Bononi)", cls:"SUBNET", intro:"Identificazione di sottorete e Network ID sui casi del ripasso reti IPv4.", rules:[
    ["9.1","<b>130.136.128.128</b> · maschera <b>255.255.128.0</b> (/17). Rete classe B (default /16) estesa di <b>1 bit</b> → 2 sottoreti. 3° ottetto <code>128 = 10000000</code>: il bit di sottorete vale <b>1</b> → <b>sottorete 1</b>. Network ID <code>128 AND 128 = 128</code> → <b>130.136.128.0/17</b> (host .128.1–.255.254, broadcast .255.255)."],
    ["9.2","Stesso IP con maschera <b>255.255.192.0</b> (/18) → <b>2 bit</b> di sottorete (4 sottoreti). 3° ottetto <code>10000000</code>: i primi 2 bit <code>10</code> → <b>sottorete 2</b> (00·01·10·11). Network ID <code>128 AND 192 = 128</code> → <b>130.136.128.0/18</b>."],
    ["9.3","<b>130.136.9.1</b> · maschera <b>255.255.248.0</b> (/21). <code>248 = 128+64+32+16+8</code> → <b>5 bit</b> di sottorete (32 sottoreti uguali, FLSM). 3° ottetto <code>9 = 00001001</code>: i primi 5 bit <code>00001</code> → <b>sottorete 1</b>. Network ID <code>9 AND 248 = 8</code> → <b>130.136.8.0/21</b> (host .8.1–.15.254, broadcast .15.255)."],
    ["9.4","Conversione decimale→binario: <b>37</b> = <code>32+4+1</code> → <code>00100101</code> (metodo dei valori di posizione, §1.3)."],
    ["9.5","VLSM da <b>192.168.1.0/24</b> per fabbisogni 50/25/10 host (in ordine decrescente): 50→<b>/26</b> (62 host) .0–.63; 25→<b>/27</b> (30 host) .64–.95; 10→<b>/28</b> (14 host) .96–.111. Maschere variabili, spreco minimo."]
  ]}
];

/* Rimandi carta → regola del compendio */
const TERM_REF = {
  "Bit":"1.1", "Octet":"1.1", "Place Value":"1.3",
  "IPv4 Address":"2.1", "Address Class":"2.2", "Private Range":"2.3", "CIDR":"2.4",
  "Loopback":"2.2", "APIPA":"2.5", "Public IP":"2.3",
  "Netmask":"3.2", "Network ID":"3.3", "Broadcast":"3.4", "Host Range":"3.5",
  "Borrow Bits":"4.1", "FLSM":"4.3", "VLSM":"4.4",
  "Supernet":"5.1", "Summarization":"5.3",
  "Default Gateway":"6.1", "Longest Prefix Match":"6.2",
  "NAT":"7.1", "PAT":"7.2",
  "Wildcard Mask":"8.1", "ACL":"8.2", "IP Spoofing":"8.4", "Subnet Scan":"8.5"
};

/* Rimandi keyword → regola del compendio */
const KW_REF = {
  BIT:"1.1", POWER2:"1.4", AND:"3.2", PREFIX:"3.1", NETID:"3.3", BROADCAST:"3.4",
  HOSTRANGE:"3.5", BORROW:"4.1", SPLIT:"4.2", AGGREGATE:"5.1", CONTIGUOUS:"5.2", PRIVATE:"2.3",
  ROUTE:"6.2", GATEWAY:"6.1", MATCH:"6.2", TRANSLATE:"7.1", WILDCARD:"8.1"
};

/* Rimandi carta → esercizio svolto del compendio (cap. 9) */
const EX_REF = {
  "Borrow Bits":"9.1", "FLSM":"9.3", "VLSM":"9.5"
};

/* Esposizione globale (niente bundler: si apre da filesystem) */
if (typeof window !== "undefined") {
  Object.assign(window, { META, FAC, CLS, CLS_ORDER, KW, KW_INFO, CARDS, INFO, COMP, TERM_REF, KW_REF, EX_REF });
}
if (typeof module !== "undefined") { module.exports = { META, FAC, CLS, CLS_ORDER, KW, KW_INFO, CARDS, INFO, COMP, TERM_REF, KW_REF, EX_REF }; }
