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
  subtitle: "Reti di calcolatori IPv4 — binario · subnetting · stack OSI/TCP-IP · L2–L7 · NAT · crittografia",
  module: "MOD 1.1 — Bononi",
  mirror: "Root of Trust sale verso la fiducia (cima dello stack); Ground of Reach scende alle fondamenta dell'indirizzamento e SUDDIVIDE la rete.",
  version: "v0.2 — copertura completa del modulo"
};

/* Fazioni = i tre piani della rete (i tre 'colori' del gioco) */
const FAC = {
  net:  { label: "Network / Subnet", hint: "indirizzi, maschere, sottoreti" },
  host: { label: "Host / Endpoint",  hint: "nodi terminali e loro range" },
  edge: { label: "Edge / Forwarding", hint: "router, gateway, NAT, ACL" }
};

/* Classi = ordine REALE di applicazione (guida il compendio) */
const CLS_ORDER = ["STACK","BINARY","ADDRESS","MASK","SUBNET","AGGREGATION","LINK","FORWARDING","ROUTING","TRANSPORT","APPLICATION","TRANSLATION","SECURITY","CRYPTO"];
const CLS = {
  STACK:       "Modello a livelli",
  BINARY:      "Rappresentazione binaria",
  ADDRESS:     "Indirizzo e classi",
  MASK:        "Maschera e prefisso",
  SUBNET:      "Subnetting",
  AGGREGATION: "Aggregazione",
  LINK:        "Collegamento (L2)",
  FORWARDING:  "Inoltro (host)",
  ROUTING:     "Instradamento (L3)",
  TRANSPORT:   "Trasporto (L4)",
  APPLICATION: "Applicativo (L7)",
  TRANSLATION: "Traduzione (NAT)",
  SECURITY:    "Sicurezza",
  CRYPTO:      "Crittografia"
};

/* ---------------------------------------------------------------------
   SOTTOTIPI — vocabolario CONTROLLATO (metodologia Netrunner/Null Signal).
   Il campo `ty` di ogni carta usa SOLO questi token (separati da " · ").
   Sono referenziabili: una regola/effetto può colpire "tutte le Tecnica",
   "tutti gli Operatore", "tutte le Minaccia", ecc.
   --------------------------------------------------------------------- */
const SUBTYPES = {
  "Unità":       "Elemento atomico della numerazione (il bit).",
  "Struttura":   "Raggruppamento di unità (l'ottetto).",
  "Oggetto":     "Indirizzo o blocco concreto su cui si opera.",
  "Schema":      "Convenzione d'indirizzamento (classful, CIDR).",
  "Tecnica":     "Operazione attiva che trasforma reti o indirizzi.",
  "Regola":      "Criterio deterministico di decisione (es. inoltro).",
  "Policy":      "Insieme ordinato di regole di filtraggio.",
  "Minaccia":    "Tecnica offensiva con prerequisito reale (campo req).",
  "Risorsa":     "Quantità spendibile: i 32 bit dell'indirizzo.",
  "Operatore":   "Trasforma indirizzi con operazioni bit-a-bit (AND, inverso).",
  "Conversione": "Passaggio tra basi numeriche (dec ↔ bin).",
  "Storico":     "Concetto superato ma fondante (classful).",
  "Riservato":   "Range a uso speciale non instradabile (loopback).",
  "Autoconfig":  "Indirizzo autoassegnato senza DHCP (link-local).",
  "Subnetting":  "Suddivisione di un blocco prendendo host-bit.",
  "Aggregazione":"Accorpamento di blocchi contigui.",
  "Edge":        "Funzione al confine della rete (NAT/PAT).",
  "Routing":     "Scelta del percorso e inoltro.",
  "Spoofing":    "Falsificazione dell'indirizzo sorgente.",
  "Recon":       "Ricognizione/scoperta di host o reti.",
  "Modello":     "Schema concettuale a livelli (OSI, TCP/IP).",
  "Processo":    "Sequenza di operazioni tra livelli (incapsulamento).",
  "Protocollo":  "Regole di dialogo tra i pari di un livello.",
  "Dispositivo": "Apparato di rete (hub, switch, router, firewall).",
  "Concetto":    "Nozione strutturale (dominio di collisione/broadcast).",
  "Campo":       "Campo di un'intestazione (es. TTL).",
  "L1":          "Livello fisico.",
  "L2":          "Livello di collegamento.",
  "L3":          "Livello di rete.",
  "L4":          "Livello di trasporto.",
  "L7":          "Livello applicativo.",
  "Crittografia":"Cifratura dei dati (simmetrica/asimmetrica).",
  "Integrità":   "Garanzia che i dati non siano alterati (hash).",
  "Autenticità": "Prova dell'origine (firma digitale).",
  "PKI":         "Infrastruttura a chiave pubblica (certificati, CA).",
  "Sicurezza":   "Protezione di rete (firewall, TLS, IPsec)."
};

/* Categorie keyword (metodologia Slay the Spire 2: keyword raggruppate) */
const KWCAT = { b:"Operazioni sui bit", a:"Struttura d'indirizzo", r:"Inoltro / routing",
  l:"Livelli & incapsulamento", p:"Protocolli & trasporto", s:"Sicurezza & crittografia" };

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
  ["WILDCARD",  "b", "Maschera inversa: 0=deve combaciare, 1=indifferente. Usata nelle ACL."],
  ["LAYER",     "l", "Funzione di un livello dello stack; dialoga col pari del nodo remoto."],
  ["ENCAP",     "l", "Ogni livello incapsula i dati superiori aggiungendo un'intestazione."],
  ["DECAP",     "l", "In ricezione ogni livello rimuove la propria intestazione."],
  ["RESOLVE",   "a", "ARP risolve un indirizzo IP nel MAC corrispondente sul segmento."],
  ["LEARN",     "r", "Lo switch impara la coppia MAC↔porta osservando i frame."],
  ["FLOOD",     "r", "Invio a tutte le porte (hub/broadcast): un solo dominio di collisione."],
  ["HOP",       "r", "Ogni router attraversato è un hop; il TTL cala di 1 a ogni hop."],
  ["PORT",      "p", "Numero (0–65535) che identifica l'applicazione al livello trasporto."],
  ["HANDSHAKE", "p", "TCP apre la connessione con un three-way handshake (SYN, SYN-ACK, ACK)."],
  ["RELIABLE",  "p", "TCP garantisce consegna ordinata e ritrasmissione; UDP no."],
  ["QUERY",     "p", "Richiesta-risposta (DNS/DHCP) per nomi o configurazione."],
  ["DIGEST",    "s", "Hash: impronta a lunghezza fissa di un messaggio (integrità)."],
  ["KEYPAIR",   "s", "Asimmetrica: chiave pubblica per cifrare, privata per decifrare."],
  ["SYMKEY",    "s", "Simmetrica: stessa chiave per cifrare e decifrare (DES/AES)."],
  ["XOR",       "s", "Operazione bit-a-bit reversibile alla base dei cifrari a flusso."],
  ["TUNNEL",    "s", "IPsec/VPN/TLS: incapsula e cifra il traffico tra due estremi."],
  ["FILTER",    "s", "Firewall/ACL: consente o blocca il traffico secondo regole."]
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
  WILDCARD:  { r: "Maschera inversa usata nelle ACL: 0 impone il match del bit, 1 lo ignora.", g: "Filtro: definisce quali carte una ACL intercetta." },
  LAYER:     { r: "Lo stack divide la comunicazione in livelli: ognuno offre servizi al livello superiore e dialoga col pari del nodo remoto.", g: "Le carte STACK/protocollo agiscono ciascuna al proprio livello." },
  ENCAP:     { r: "Scendendo lo stack, ogni livello inserisce i dati superiori in una 'busta' con la propria intestazione.", g: "Trasforma una carta-dato nell'unità del livello sotto (segment→packet→frame)." },
  DECAP:     { r: "In ricezione ogni livello verifica e rimuove la propria intestazione, risalendo lo stack.", g: "Inverso di ENCAP: scarta l'intestazione e passa su." },
  RESOLVE:   { r: "ARP trova il MAC associato a un IP sul segmento locale, inviando una richiesta in broadcast.", g: "Collega una carta [IPv4 Address] alla carta [MAC Address] per consegnare il frame." },
  LEARN:     { r: "Lo switch registra su quale porta ha visto ciascun MAC sorgente, costruendo la tabella MAC.", g: "Lo Switch memorizza dove sono le carte Host per inoltrare mirato." },
  FLOOD:     { r: "Hub e broadcast inviano a tutte le porte del segmento: un solo dominio di collisione.", g: "Effetto 'a tutti' sulle carte dello stesso dominio." },
  HOP:       { r: "Ogni router attraversato è un hop; il TTL cala di 1 e a 0 il pacchetto è scartato.", g: "Conta i passaggi: traceroute rivela gli hop, il TTL li limita." },
  PORT:      { r: "La porta (0–65535) identifica l'applicazione al livello trasporto; il socket è IP:porta.", g: "Distingue più flussi sullo stesso host (anche nella PAT)." },
  HANDSHAKE: { r: "TCP stabilisce la connessione con SYN → SYN-ACK → ACK prima di scambiare dati.", g: "Prerequisito per le carte TCP affidabili." },
  RELIABLE:  { r: "TCP numera, riordina, ritrasmette e controlla la congestione; UDP rinuncia a tutto ciò.", g: "Marca i flussi garantiti vs quelli leggeri." },
  QUERY:     { r: "DNS/DHCP funzionano a richiesta-risposta: risolvere un nome, ottenere una configurazione.", g: "Una carta interroga un servizio e riceve un valore." },
  DIGEST:    { r: "Una funzione hash produce un'impronta a lunghezza fissa H(m): cambia del tutto se m cambia.", g: "Verifica l'integrità di una carta-messaggio." },
  KEYPAIR:   { r: "Asimmetrica: si cifra con la chiave pubblica, si decifra con la privata (RSA, Diffie-Hellman).", g: "Separa pubblico e privato, come Public IP ↔ Private Range." },
  SYMKEY:    { r: "Simmetrica: un'unica chiave segreta per cifrare e decifrare (DES, AES); va distribuita in sicurezza.", g: "Cifratura veloce di una sessione." },
  XOR:       { r: "Cifrari a flusso: cᵢ = dᵢ XOR kᵢ; XOR è reversibile (dᵢ = cᵢ XOR kᵢ). Stessa famiglia di AND.", g: "Operazione bit-a-bit gemella dell'AND della maschera." },
  TUNNEL:    { r: "IPsec/VPN incapsulano e cifrano i pacchetti tra due gateway; TLS cifra il flusso TCP.", g: "Avvolge altre carte in un canale protetto." },
  FILTER:    { r: "Firewall e ACL confrontano il traffico con regole e applicano permit/deny.", g: "Blocca o lascia passare carte secondo criteri." }
};

/* ---------------------------------------------------------------------
   CARTE — { n, fac, cost, ty, cls, rel, kw }
   cost = BIT in gioco (numero) oppure "S" (effetto/regola, senza costo fisso)
   rel  = testo meccanico: [Carta] referenziata, " → " connettore
   --------------------------------------------------------------------- */
const CARDS = [
  /* --- STACK (modello a livelli) --- */
  { n:"OSI Model",      fac:"host", cost:"S",  ty:"Schema · Modello",      cls:"STACK",       rel:"7 [LAYER]: Applicazione, Presentazione, Sessione, Trasporto, Rete, Collegamento, Fisico.", kw:["LAYER","ENCAP"] },
  { n:"TCP/IP Model",   fac:"host", cost:"S",  ty:"Schema · Modello",      cls:"STACK",       rel:"4 [LAYER]: Applicazione, Trasporto, Internet, Accesso alla rete. Modello reale di Internet.", kw:["LAYER","ENCAP"] },
  { n:"Encapsulation",  fac:"host", cost:"S",  ty:"Processo",              cls:"STACK",       rel:"Ogni [LAYER] incapsula i dati superiori: dato → [Segment] → packet → [Frame] → bit.", kw:["ENCAP","DECAP","LAYER"] },
  { n:"PDU",            fac:"host", cost:"S",  ty:"Schema",                cls:"STACK",       rel:"Unità per livello: [Segment] (L4) · packet/datagram (L3) · [Frame] (L2) · bit (L1).", kw:["ENCAP","LAYER"] },

  /* --- BINARY --- */
  { n:"Bit",            fac:"net",  cost:"1",  ty:"Unità · Risorsa",       cls:"BINARY",      rel:"32× [Bit] = 1 [IPv4 Address]. Ogni [Bit] vale una potenza di 2.", kw:["BIT","POWER2"] },
  { n:"Octet",          fac:"net",  cost:"8",  ty:"Struttura",             cls:"BINARY",      rel:"8× [Bit] = 1 [Octet] (0–255) → 4× [Octet] = [IPv4 Address].", kw:["BIT","POWER2"] },
  { n:"Place Value",    fac:"net",  cost:"S",  ty:"Tecnica · Conversione", cls:"BINARY",      rel:"128 64 32 16 8 4 2 1 → somma i [Bit] a 1 per convertire dec↔bin.", kw:["BIT","POWER2"] },

  /* --- ADDRESS --- */
  { n:"IPv4 Address",   fac:"host", cost:"32", ty:"Oggetto",              cls:"ADDRESS",     rel:"32 [Bit] = [Network ID] + Host ID; il confine lo fissa la [Netmask].", kw:["BIT","NETID","PREFIX"] },
  { n:"Address Class",  fac:"net",  cost:"S",  ty:"Schema · Storico",     cls:"ADDRESS",     rel:"A /8 · B /16 · C /24 → prefisso classful di default. Superato da [CIDR].", kw:["PREFIX"] },
  { n:"Private Range",  fac:"host", cost:"S",  ty:"Oggetto",              cls:"ADDRESS",     rel:"10/8 · 172.16/12 · 192.168/16 → non instradabili; per uscire serve [NAT].", kw:["PRIVATE","TRANSLATE"] },
  { n:"CIDR",           fac:"net",  cost:"S",  ty:"Schema",               cls:"ADDRESS",     rel:"Il [Prefix] /n è esplicito e variabile → rimpiazza la [Address Class].", kw:["PREFIX","AGGREGATE"] },
  { n:"Multicast",      fac:"net",  cost:"S",  ty:"Oggetto · Schema",     cls:"ADDRESS",     rel:"Classe D 224.0.0.0/4 → consegna a un gruppo (uno-a-molti), non a un singolo host.", kw:["ROUTE"] },
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
  { n:"Point-to-Point", fac:"net",  cost:"S",  ty:"Tecnica · Subnetting", cls:"SUBNET",      rel:"/30 → 2 host utili: blocco minimo per un link tra due [Router]. /31 (RFC3021) senza sprechi.", kw:["BORROW","HOSTRANGE","POWER2"] },

  /* --- AGGREGATION --- */
  { n:"Supernet",       fac:"net",  cost:"S",  ty:"Tecnica · Aggregazione", cls:"AGGREGATION", rel:"Accorpa 2^s blocchi contigui → accorcia il [Prefix]. Inverso di [Borrow Bits].", kw:["AGGREGATE","CONTIGUOUS","PREFIX"] },
  { n:"Summarization",  fac:"edge", cost:"S",  ty:"Tecnica · Aggregazione", cls:"AGGREGATION", rel:"Un solo [Prefix] riassume molte rotte → [Routing Table] più piccola.", kw:["AGGREGATE","CONTIGUOUS","ROUTE","MATCH"] },

  /* --- FORWARDING --- */
  { n:"Default Gateway",      fac:"edge", cost:"S", ty:"Oggetto",          cls:"FORWARDING",  rel:"Destinazione fuori dalla [Host Range] locale → consegna al [Default Gateway].", kw:["GATEWAY","ROUTE"] },
  { n:"Longest Prefix Match", fac:"edge", cost:"S", ty:"Regola · Routing", cls:"FORWARDING",  rel:"Tra più rotte che combaciano vince il [Prefix] più lungo (più specifico).", kw:["MATCH","ROUTE","PREFIX"] },

  /* --- TRANSLATION --- */
  { n:"NAT",            fac:"edge", cost:"S",  ty:"Tecnica · Edge",       cls:"TRANSLATION", rel:"Riscrive [Private Range] → IP pubblico al confine. 1:1 statico/dinamico.", kw:["TRANSLATE","PRIVATE","GATEWAY"] },
  { n:"PAT",            fac:"edge", cost:"S",  ty:"Tecnica · Edge",       cls:"TRANSLATION", rel:"NAT overload: molti host → 1 IP pubblico, distinti dalla porta sorgente.", kw:["TRANSLATE","PRIVATE"] },

  /* --- SECURITY --- */
  { n:"Wildcard Mask",  fac:"edge", cost:"S",  ty:"Oggetto · Operatore",  cls:"SECURITY",    rel:"Inverso della [Netmask]: 0=combacia, 1=indifferente. Alimenta la [ACL].", kw:["WILDCARD","MATCH"] },
  { n:"ACL",            fac:"edge", cost:"S",  ty:"Policy",               cls:"SECURITY",    rel:"Confronta il pacchetto con [Wildcard Mask] → permit/deny. Vince la prima riga che combacia.", kw:["WILDCARD","MATCH","FILTER"] },
  { n:"Firewall",       fac:"edge", cost:"S",  ty:"Dispositivo · Sicurezza", cls:"SECURITY", rel:"Filtra il traffico al confine con regole ([ACL]/[Wildcard Mask]); separa zone fidate da non fidate.", kw:["FILTER","MATCH"] },
  { n:"IP Spoofing",    fac:"edge", cost:"S",  ty:"Minaccia · Spoofing",  cls:"SECURITY",    rel:"Falsifica l'IP sorgente → aggira i filtri della [ACL]. Inefficace con ingress filtering.", kw:["MATCH"], req:"Assenza di ingress filtering (BCP38/uRPF) sul percorso." },
  { n:"Subnet Scan",    fac:"edge", cost:"S",  ty:"Minaccia · Recon",     cls:"SECURITY",    rel:"Enumera la [Host Range] del bersaglio (ping/ARP sweep) per trovare host attivi.", kw:["HOSTRANGE","NETID","PREFIX"], req:"Conoscere [Network ID] e [Prefix] del bersaglio." },

  /* --- LINK (L2) --- */
  { n:"MAC Address",    fac:"net",  cost:"S",  ty:"Oggetto · L2",         cls:"LINK",        rel:"Indirizzo fisico a 48 bit della scheda di rete, univoco sul segmento. Risolto da [ARP].", kw:["RESOLVE"] },
  { n:"Frame",          fac:"net",  cost:"S",  ty:"Struttura · L2",       cls:"LINK",        rel:"Unità L2: incapsula un packet con [MAC Address] sorgente/dest. Vive in un solo segmento.", kw:["ENCAP","RESOLVE"] },
  { n:"ARP",            fac:"net",  cost:"S",  ty:"Protocollo · L2",      cls:"LINK",        rel:"Risolve un [IPv4 Address] nel [MAC Address] sul segmento locale (richiesta in broadcast).", kw:["RESOLVE","FLOOD"] },
  { n:"Switch",         fac:"edge", cost:"S",  ty:"Dispositivo · L2",     cls:"LINK",        rel:"Inoltra il [Frame] alla sola porta del MAC destinatario; ogni porta = un [Collision Domain]. [LEARN].", kw:["LEARN"] },
  { n:"Hub",            fac:"edge", cost:"S",  ty:"Dispositivo · L1",     cls:"LINK",        rel:"Ripete il segnale su tutte le porte ([FLOOD]): un solo [Collision Domain]. Superato dallo [Switch].", kw:["FLOOD"] },
  { n:"Collision Domain", fac:"net", cost:"S", ty:"Concetto · L1",       cls:"LINK",        rel:"Insieme che condivide il mezzo: due trasmissioni insieme = collisione. Lo [Switch] lo segmenta.", kw:["FLOOD"] },
  { n:"Broadcast Domain", fac:"net", cost:"S", ty:"Concetto · L2",       cls:"LINK",        rel:"Insieme raggiunto da un broadcast L2; coincide con la sottorete/VLAN. Il [Router] lo delimita.", kw:["FLOOD"] },

  /* --- ROUTING (L3) --- */
  { n:"Router",         fac:"edge", cost:"S",  ty:"Dispositivo · L3",     cls:"ROUTING",     rel:"Collega sottoreti diverse: instrada i packet via [Routing Table]. Delimita il [Broadcast Domain].", kw:["ROUTE","HOP"] },
  { n:"Routing Table",  fac:"edge", cost:"S",  ty:"Oggetto · L3",         cls:"ROUTING",     rel:"Rotte (rete/[Prefix] → next-hop/interfaccia); si sceglie con [Longest Prefix Match].", kw:["ROUTE","MATCH"] },
  { n:"Static Route",   fac:"edge", cost:"S",  ty:"Tecnica · L3",         cls:"ROUTING",     rel:"Rotta configurata a mano: semplice e prevedibile, ma non si adatta ai guasti.", kw:["ROUTE"] },
  { n:"Default Route",  fac:"edge", cost:"S",  ty:"Oggetto · L3",         cls:"ROUTING",     rel:"0.0.0.0/0 → combacia con tutto (prefisso più corto): ultima risorsa verso il [Default Gateway].", kw:["ROUTE","MATCH","GATEWAY"] },
  { n:"Routing Protocol", fac:"edge", cost:"S", ty:"Protocollo · L3",     cls:"ROUTING",     rel:"Scambia automaticamente le rotte: RIP (hop count), OSPF (link-state), BGP (tra AS su Internet).", kw:["ROUTE","HOP"] },
  { n:"ICMP",           fac:"edge", cost:"S",  ty:"Protocollo · L3",      cls:"ROUTING",     rel:"Controllo/diagnostica: ping (echo) e traceroute (TTL scaduto rivela gli [HOP]).", kw:["HOP"] },
  { n:"TTL",            fac:"net",  cost:"S",  ty:"Campo · L3",           cls:"ROUTING",     rel:"Time To Live: cala di 1 a ogni [HOP]; a 0 il packet è scartato → evita i loop di routing.", kw:["HOP"] },

  /* --- TRANSPORT (L4) --- */
  { n:"TCP",            fac:"host", cost:"S",  ty:"Protocollo · L4",      cls:"TRANSPORT",   rel:"Connessione affidabile: [HANDSHAKE] a 3 vie, numerazione, ACK, ritrasmissione, controllo congestione.", kw:["HANDSHAKE","RELIABLE","PORT"] },
  { n:"UDP",            fac:"host", cost:"S",  ty:"Protocollo · L4",      cls:"TRANSPORT",   rel:"Senza connessione: nessuna garanzia, basso overhead. Adatto a [DNS], streaming, VoIP.", kw:["PORT"] },
  { n:"Segment",        fac:"host", cost:"S",  ty:"Struttura · L4",       cls:"TRANSPORT",   rel:"Unità L4: incapsula i dati applicativi con le [Port] sorgente/destinazione.", kw:["ENCAP","PORT"] },
  { n:"Port",           fac:"host", cost:"S",  ty:"Oggetto · L4",         cls:"TRANSPORT",   rel:"Numero 0–65535 che identifica l'applicazione: 80 [HTTP], 443 HTTPS, 53 [DNS].", kw:["PORT"] },
  { n:"Socket",         fac:"host", cost:"S",  ty:"Oggetto · L4",         cls:"TRANSPORT",   rel:"Coppia [IPv4 Address] : [Port] → identifica univocamente un estremo di comunicazione.", kw:["PORT"] },

  /* --- APPLICATION (L7) --- */
  { n:"DNS",            fac:"host", cost:"S",  ty:"Protocollo · L7",      cls:"APPLICATION", rel:"Risolve i nomi (www.unibo.it) in [IPv4 Address] tramite [QUERY] gerarchiche (porta 53).", kw:["QUERY","PORT"] },
  { n:"DHCP",           fac:"host", cost:"S",  ty:"Protocollo · L7",      cls:"APPLICATION", rel:"Assegna automaticamente IP, [Netmask], [Default Gateway] e [DNS] agli host (scambio DORA).", kw:["QUERY","GATEWAY"] },
  { n:"HTTP",           fac:"host", cost:"S",  ty:"Protocollo · L7",      cls:"APPLICATION", rel:"Trasferimento ipertesti del Web su [TCP] (porta 80; 443 con [TLS]).", kw:["PORT","RELIABLE"] },

  /* --- CRYPTO --- */
  { n:"Symmetric Key",  fac:"host", cost:"S",  ty:"Tecnica · Crittografia", cls:"CRYPTO",    rel:"Stessa chiave per cifrare e decifrare (DES, AES). Veloce; problema: distribuire la chiave.", kw:["SYMKEY","XOR"] },
  { n:"Asymmetric Key", fac:"host", cost:"S",  ty:"Tecnica · Crittografia", cls:"CRYPTO",    rel:"Coppia pubblica/privata (RSA, Diffie-Hellman): cifra con la pubblica, decifra con la privata.", kw:["KEYPAIR"] },
  { n:"Hash",           fac:"host", cost:"S",  ty:"Tecnica · Integrità",  cls:"CRYPTO",      rel:"Funzione a senso unico → impronta a lunghezza fissa H(m); verifica l'integrità.", kw:["DIGEST"] },
  { n:"Digital Signature", fac:"host", cost:"S", ty:"Tecnica · Autenticità", cls:"CRYPTO",  rel:"[Hash] del messaggio cifrato con la chiave privata → prova origine e integrità ([KEYPAIR]).", kw:["KEYPAIR","DIGEST"] },
  { n:"Certificate",    fac:"host", cost:"S",  ty:"Oggetto · PKI",        cls:"CRYPTO",      rel:"Lega un'identità a una chiave pubblica, firmato da una CA fidata. Base di [TLS].", kw:["KEYPAIR","DIGEST"] },
  { n:"TLS",            fac:"edge", cost:"S",  ty:"Protocollo · Sicurezza", cls:"CRYPTO",    rel:"Cifra i flussi [TCP] (HTTPS): scambio chiavi con [Asymmetric Key], sessione con [Symmetric Key].", kw:["KEYPAIR","SYMKEY","TUNNEL"] },
  { n:"IPsec",          fac:"edge", cost:"S",  ty:"Protocollo · Sicurezza", cls:"CRYPTO",    rel:"[TUNNEL] cifrato tra due gateway: collega sottoreti [Private Range] attraverso Internet (VPN).", kw:["TUNNEL","SYMKEY"] }
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
  "Public IP":      { r:"Indirizzo globalmente univoco e instradabile su Internet, assegnato da IANA/RIR; è l'opposto degli spazi privati RFC1918.", g:"Carta che attraversa l'Edge senza traduzione; è il bersaglio della NAT.", c:"es. 8.8.8.8 (globalmente instradabile)" },

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
  "Subnet Scan":    { r:"Ricognizione che enumera gli indirizzi della host range di una sottorete (ping sweep ICMP o ARP scan) per individuare gli host attivi prima di un attacco.", g:"Carta recon: rivela le carte Host presenti in un blocco; per enumerarlo serve conoscerne rete e prefisso.", c:"nmap -sn 192.168.1.0/24" },

  "Firewall":       { r:"Apparato (o software) che filtra il traffico al confine fra zone secondo regole, in genere ACL su indirizzi/porte; separa la rete fidata da quella non fidata.", g:"Carta-barriera al confine: applica i filtri (ACL/Wildcard) sul traffico in transito.", c:"permit tcp any host 10.0.0.10 eq 443" },
  "OSI Model":      { r:"Modello di riferimento a 7 livelli (Applicazione, Presentazione, Sessione, Trasporto, Rete, Collegamento, Fisico); ogni livello serve quello superiore e dialoga col pari remoto.", g:"Schema-quadro: ogni carta protocollo agisce a un livello preciso.", c:"7=App · 4=Trasporto · 3=Rete · 2=Collegamento · 1=Fisico" },
  "TCP/IP Model":   { r:"Modello reale di Internet a 4 livelli: Applicazione, Trasporto, Internet, Accesso alla rete; mappa l'OSI in modo più snello.", g:"Versione operativa dello stack usata dalle carte di Internet.", c:"App · Trasporto · Internet · Accesso rete" },
  "Encapsulation":  { r:"Scendendo lo stack, ogni livello inserisce i dati superiori in una 'busta' con la propria intestazione; in ricezione avviene il decapsulamento.", g:"Trasforma una carta-dato nell'unità del livello inferiore.", c:"dato → segment → packet → frame → bit" },
  "PDU":            { r:"Protocol Data Unit: il nome dell'unità di dati per ciascun livello.", g:"Etichetta l'unità giusta a ogni livello dello stack.", c:"L4 segment · L3 packet/datagram · L2 frame · L1 bit" },

  "Multicast":      { r:"Classe D (224.0.0.0/4): indirizzi di gruppo per consegna uno-a-molti (streaming, routing). Unicast=1-a-1, broadcast=1-a-tutti, multicast=1-a-gruppo. Classe E (240/4) è sperimentale.", g:"Carta 'a gruppo': raggiunge più Host iscritti, non un singolo.", c:"224.0.0.0/4 · es. 224.0.0.9 (RIPv2)" },

  "Point-to-Point": { r:"Sottoreti minime per i collegamenti tra router: /30 offre 2 host utili (2²−2); /31 (RFC3021) usa entrambi gli indirizzi senza spreco; /32 è un singolo host.", g:"Blocco da 2 sole carte Host: il link diretto tra due Router.", c:"/30 → 4 indirizzi, 2 host utili" },

  "MAC Address":    { r:"Indirizzo fisico a 48 bit assegnato alla scheda di rete, univoco sul segmento; usato nelle intestazioni dei frame L2.", g:"Identità locale della carta Host sul segmento; serve all'inoltro L2.", c:"es. 00:1A:2B:3C:4D:5E (48 bit)" },
  "Frame":          { r:"Unità del livello di collegamento: incapsula un packet aggiungendo MAC sorgente/destinazione; non oltrepassa il segmento.", g:"La 'busta' L2 che porta un packet da un nodo all'altro del segmento.", c:"[MAC dst | MAC src | packet | FCS]" },
  "ARP":            { r:"Address Resolution Protocol: trova il MAC associato a un IP sul segmento locale inviando una richiesta in broadcast.", g:"Collega la carta IPv4 Address alla carta MAC Address per consegnare il frame.", c:"arp -a · who-has 192.168.1.1?" },
  "Switch":         { r:"Apparato L2 che inoltra ogni frame alla sola porta del MAC destinatario; impara le associazioni MAC↔porta. Ogni porta è un dominio di collisione separato.", g:"Consegna mirata tra Host; segmenta i domini di collisione.", c:"tabella MAC: MAC ↔ porta" },
  "Hub":            { r:"Ripetitore L1 che rigenera il segnale su tutte le porte: un unico dominio di collisione, soggetto a collisioni. Sostituito dallo switch.", g:"Effetto 'a tutti' sul segmento; inefficiente.", c:"1 hub = 1 dominio di collisione" },
  "Collision Domain": { r:"Insieme di dispositivi che condividono il mezzo trasmissivo: due trasmissioni contemporanee collidono. Lo switch lo riduce a una porta.", g:"Zona dove le trasmissioni si contendono il canale.", c:"hub: 1 dominio · switch: 1 per porta" },
  "Broadcast Domain": { r:"Insieme di dispositivi raggiunti da un broadcast di livello 2; coincide con la sottorete (o VLAN). Il router lo delimita.", g:"Quanto lontano arriva un 'a tutti' L2; finisce al Router.", c:"1 sottorete/VLAN = 1 dominio di broadcast" },

  "Router":         { r:"Apparato L3 che collega sottoreti diverse e inoltra i packet consultando la tabella di routing; delimita i domini di broadcast.", g:"Carta-snodo: muove i packet tra reti e applica il Longest Prefix Match.", c:"ip route · show ip route" },
  "Routing Table":  { r:"Elenco di rotte (rete/prefisso → next-hop o interfaccia) che il router consulta per ogni packet; si sceglie la più specifica.", g:"Le rotte in gioco; il match più lungo vince.", c:"10.0.0.0/8 via 192.0.2.1" },
  "Static Route":   { r:"Rotta inserita manualmente dall'amministratore: deterministica e leggera, ma non reagisce ai cambi di topologia.", g:"Rotta 'fissa' giocata a mano.", c:"ip route 10.2.0.0 255.255.0.0 192.0.2.1" },
  "Default Route":  { r:"Rotta 0.0.0.0/0: combacia con qualsiasi destinazione (prefisso più corto), usata quando nessun'altra rotta corrisponde.", g:"Uscita di riserva quando nessuna rotta più specifica combacia.", c:"ip route 0.0.0.0 0.0.0.0 <next-hop>" },
  "Routing Protocol": { r:"Protocollo che scambia automaticamente le rotte: RIP (metrica a hop), OSPF (link-state, area), BGP (tra Autonomous System su Internet).", g:"Popola la Routing Table senza intervento manuale.", c:"RIP=hop · OSPF=costo · BGP=policy" },
  "ICMP":           { r:"Protocollo di controllo/diagnostica L3: echo request/reply (ping), e messaggi di errore come TTL scaduto (usato da traceroute).", g:"Sonda lo stato del percorso e rivela gli hop.", c:"ping 8.8.8.8 · tracert <host>" },
  "TTL":            { r:"Campo dell'header IP: parte da un valore (es. 64/128) e cala di 1 a ogni hop; a 0 il packet è scartato, evitando i loop. Traceroute lo sfrutta.", g:"Contatore di vita del packet: limita gli hop.", c:"ping → TTL=128; ogni hop −1" },

  "TCP":            { r:"Trasporto affidabile e orientato alla connessione: handshake a 3 vie, numerazione dei byte, ACK, ritrasmissione, controllo di flusso e congestione.", g:"Flusso garantito tra due Socket; richiede l'handshake.", c:"SYN → SYN-ACK → ACK" },
  "UDP":            { r:"Trasporto senza connessione: nessuna garanzia di consegna né ordine, overhead minimo; adatto a traffico in tempo reale e DNS.", g:"Flusso leggero e veloce, senza garanzie.", c:"datagram: [porta src|porta dst|len|dati]" },
  "Segment":        { r:"Unità del livello di trasporto (TCP): incapsula i dati applicativi aggiungendo porte sorgente/destinazione e controllo.", g:"La 'busta' L4 che il livello rete trasformerà in packet.", c:"[porta src | porta dst | seq | dati]" },
  "Port":           { r:"Numero a 16 bit (0–65535) che identifica l'applicazione/servizio sul host; le porte note stanno sotto 1024.", g:"Distingue più flussi sullo stesso Host (anche nella PAT).", c:"80 HTTP · 443 HTTPS · 53 DNS · 22 SSH" },
  "Socket":         { r:"Estremo di comunicazione identificato dalla coppia indirizzo IP + porta; due socket definiscono una connessione.", g:"Punto d'aggancio di un flusso: IPv4 Address : Port.", c:"192.168.1.10:443" },

  "DNS":            { r:"Domain Name System: traduce i nomi di dominio in indirizzi IP tramite una gerarchia di server, via query (di solito su UDP/53).", g:"Carta-servizio: da nome a IPv4 Address.", c:"nslookup www.unibo.it → 137.204.x.x" },
  "DHCP":           { r:"Dynamic Host Configuration Protocol: assegna automaticamente a un host IP, maschera, gateway e DNS con lo scambio DORA (Discover, Offer, Request, Ack).", g:"Configura un Host appena entra in rete (vedi APIPA se manca).", c:"Discover → Offer → Request → Ack" },
  "HTTP":           { r:"HyperText Transfer Protocol: trasferisce le pagine Web (richiesta/risposta) su TCP, porta 80; con TLS diventa HTTPS sulla 443.", g:"Carta applicativa del Web, poggia su TCP.", c:"GET / HTTP/1.1 · 200 OK" },

  "Symmetric Key":  { r:"Crittografia a chiave segreta unica per cifrare e decifrare (DES, AES); molto veloce, ma la chiave va distribuita in modo sicuro.", g:"Cifra rapidamente una sessione; condivide il segreto.", c:"AES-128/256 · DES (obsoleto)" },
  "Asymmetric Key": { r:"Crittografia a coppia di chiavi: si cifra con la pubblica e si decifra con la privata (RSA, Diffie-Hellman). Niente segreto condiviso.", g:"Separa pubblico/privato — come Public IP ↔ Private Range, ma sulle chiavi.", c:"RSA-2048 · scambio Diffie-Hellman" },
  "Hash":           { r:"Funzione a senso unico che produce un'impronta a lunghezza fissa H(m); un minimo cambiamento di m ne stravolge l'output. Garantisce l'integrità.", g:"Impronta che verifica se una carta-messaggio è intatta.", c:"SHA-256(m) → 256 bit" },
  "Digital Signature": { r:"Firma digitale: si cifra l'hash del messaggio con la chiave privata; chi ha la pubblica verifica origine e integrità.", g:"Prova chi ha giocato la carta e che non sia stata alterata.", c:"firma = E_privata( Hash(m) )" },
  "Certificate":    { r:"Documento che lega un'identità a una chiave pubblica, firmato da una Certification Authority fidata (PKI); fonda la fiducia in TLS.", g:"Carta d'identità verificabile di una chiave pubblica.", c:"X.509 firmato dalla CA" },
  "TLS":            { r:"Transport Layer Security (ex SSL): cifra i flussi TCP (HTTPS, IMAP). Scambia le chiavi con la crittografia asimmetrica, poi usa la simmetrica per i dati.", g:"Avvolge un flusso TCP in un tunnel cifrato.", c:"HTTPS = HTTP su TLS (443)" },
  "IPsec":          { r:"Suite che crea tunnel cifrati e autenticati tra gateway (VPN site-to-site), collegando sottoreti private attraverso Internet.", g:"Tunnel che unisce due blocchi Private Range in sicurezza.", c:"10.1.0.0/24 ⇄ 10.2.0.0/24 (tunnel)" }
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
    ["2.5","169.254.0.0/16 (APIPA / link-local): autoconfigurazione in assenza di DHCP; valido solo sul segmento locale, non instradabile. 127.0.0.0/8 è il loopback (host stesso)."],
    ["2.6","Classe D 224.0.0.0/4 = multicast (consegna a un gruppo); classe E 240.0.0.0/4 = sperimentale. Trasmissione: unicast (1-a-1), broadcast (1-a-tutti), multicast (1-a-gruppo)."]
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
    ["4.4","VLSM: maschere variabili. Assegna prima i fabbisogni più grandi, poi i più piccoli, su blocchi contigui."],
    ["4.5","Sottoreti piccole: /30 = 2 host utili per i link punto-punto tra router; /31 (RFC3021) usa entrambi gli indirizzi; /32 = singolo host."]
  ]},
  { id:"5", title:"Aggregazione e supernetting", cls:"AGGREGATION", intro:"Ricucire blocchi contigui.", rules:[
    ["5.1","Supernetting: accorpa 2^s blocchi contigui accorciando il prefisso (/n−s). È l'inverso del subnetting."],
    ["5.2","Per aggregare, i blocchi devono essere contigui e allineati a una potenza di 2."],
    ["5.3","La route summarization riduce la dimensione della tabella di routing con un prefisso riassuntivo."]
  ]},
  { id:"6", title:"Inoltro e instradamento", cls:"FORWARDING", intro:"Locale o remoto?", rules:[
    ["6.1","L'host applica (AND) la propria maschera sia al proprio indirizzo sia alla destinazione e confronta i due Network ID: se coincidono → consegna diretta sulla LAN; altrimenti → invio al default gateway."],
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
  ]},
  { id:"10", title:"Modello a livelli e incapsulamento", cls:"STACK", intro:"Come la comunicazione è divisa in livelli.", rules:[
    ["10.1","Lo stack divide la comunicazione in livelli: ogni livello offre servizi a quello superiore e dialoga col livello pari del nodo remoto."],
    ["10.2","OSI ha 7 livelli (Applicazione, Presentazione, Sessione, Trasporto, Rete, Collegamento, Fisico); il modello TCP/IP ne usa 4 (Applicazione, Trasporto, Internet, Accesso alla rete)."],
    ["10.3","Incapsulamento: scendendo lo stack, ogni livello aggiunge la propria intestazione; salendo, la rimuove (decapsulamento)."],
    ["10.4","PDU per livello: segment (L4), packet/datagram (L3), frame (L2), bit (L1)."]
  ]},
  { id:"11", title:"Livello di collegamento (L2)", cls:"LINK", intro:"Indirizzamento fisico e dispositivi del segmento.", rules:[
    ["11.1","Il MAC address (48 bit) identifica la scheda di rete sul segmento; il frame L2 lo usa come sorgente e destinazione."],
    ["11.2","ARP risolve un indirizzo IP nel MAC corrispondente sul segmento locale (richiesta in broadcast)."],
    ["11.3","L'hub ripete su tutte le porte (un solo dominio di collisione); lo switch inoltra alla sola porta del MAC e impara le associazioni MAC↔porta."],
    ["11.4","Un dominio di broadcast coincide con la sottorete/VLAN ed è delimitato dal router."]
  ]},
  { id:"12", title:"Instradamento (L3)", cls:"ROUTING", intro:"Come i router muovono i packet tra reti.", rules:[
    ["12.1","Il router collega sottoreti diverse e instrada i packet consultando la tabella di routing (rete/prefisso → next-hop)."],
    ["12.2","Le rotte si configurano a mano (statiche) o si apprendono con protocolli: RIP (metrica a hop), OSPF (link-state), BGP (tra Autonomous System)."],
    ["12.3","La rotta di default 0.0.0.0/0 è l'ultima risorsa: prefisso più corto, combacia con tutto."],
    ["12.4","Il TTL cala di 1 a ogni hop; a 0 il packet è scartato (anti-loop). ICMP fornisce ping e traceroute."]
  ]},
  { id:"13", title:"Livello di trasporto (L4)", cls:"TRANSPORT", intro:"Affidabilità, porte e socket.", rules:[
    ["13.1","TCP offre connessione affidabile (handshake a 3 vie, ACK, ritrasmissione, controllo congestione); UDP è senza connessione e leggero."],
    ["13.2","La porta (0–65535) identifica l'applicazione; il socket è la coppia IP:porta."],
    ["13.3","Porte note: 80 HTTP, 443 HTTPS, 53 DNS, 67/68 DHCP, 22 SSH."]
  ]},
  { id:"14", title:"Livello applicativo (L7)", cls:"APPLICATION", intro:"I servizi che usano gli utenti.", rules:[
    ["14.1","DNS risolve i nomi in indirizzi IP tramite query gerarchiche (porta 53)."],
    ["14.2","DHCP assegna automaticamente IP, maschera, gateway e DNS (scambio DORA: Discover, Offer, Request, Ack)."],
    ["14.3","HTTP trasferisce ipertesti su TCP (porta 80; 443 con TLS = HTTPS)."]
  ]},
  { id:"15", title:"Crittografia e sicurezza", cls:"CRYPTO", intro:"Riservatezza, integrità, autenticità.", rules:[
    ["15.1","Crittografia simmetrica: un'unica chiave segreta (DES, AES), veloce ma con il problema della distribuzione della chiave."],
    ["15.2","Crittografia asimmetrica: chiave pubblica per cifrare, privata per decifrare (RSA, Diffie-Hellman)."],
    ["15.3","L'hash produce un'impronta a lunghezza fissa (integrità); la firma digitale cifra l'hash con la chiave privata (autenticità)."],
    ["15.4","Il certificato lega identità e chiave pubblica, firmato da una CA (PKI); è la base di TLS/HTTPS."],
    ["15.5","IPsec/VPN crea un tunnel cifrato tra gateway, collegando sottoreti private attraverso Internet."]
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
  "Wildcard Mask":"8.1", "ACL":"8.2", "IP Spoofing":"8.4", "Subnet Scan":"8.5", "Firewall":"8.2",
  "OSI Model":"10.2", "TCP/IP Model":"10.2", "Encapsulation":"10.3", "PDU":"10.4",
  "Multicast":"2.6", "Point-to-Point":"4.5",
  "MAC Address":"11.1", "Frame":"11.1", "ARP":"11.2", "Switch":"11.3", "Hub":"11.3",
  "Collision Domain":"11.3", "Broadcast Domain":"11.4",
  "Router":"12.1", "Routing Table":"12.1", "Static Route":"12.2", "Default Route":"12.3",
  "Routing Protocol":"12.2", "ICMP":"12.4", "TTL":"12.4",
  "TCP":"13.1", "UDP":"13.1", "Segment":"13.1", "Port":"13.2", "Socket":"13.2",
  "DNS":"14.1", "DHCP":"14.2", "HTTP":"14.3",
  "Symmetric Key":"15.1", "Asymmetric Key":"15.2", "Hash":"15.3", "Digital Signature":"15.3",
  "Certificate":"15.4", "TLS":"15.4", "IPsec":"15.5"
};

/* Rimandi keyword → regola del compendio */
const KW_REF = {
  BIT:"1.1", POWER2:"1.4", AND:"3.2", PREFIX:"3.1", NETID:"3.3", BROADCAST:"3.4",
  HOSTRANGE:"3.5", BORROW:"4.1", SPLIT:"4.2", AGGREGATE:"5.1", CONTIGUOUS:"5.2", PRIVATE:"2.3",
  ROUTE:"6.2", GATEWAY:"6.1", MATCH:"6.2", TRANSLATE:"7.1", WILDCARD:"8.1",
  LAYER:"10.1", ENCAP:"10.3", DECAP:"10.3", RESOLVE:"11.2", LEARN:"11.3", FLOOD:"11.3",
  HOP:"12.4", PORT:"13.2", HANDSHAKE:"13.1", RELIABLE:"13.1", QUERY:"14.1",
  DIGEST:"15.3", KEYPAIR:"15.2", SYMKEY:"15.1", XOR:"15.1", TUNNEL:"15.5", FILTER:"8.2"
};

/* Rimandi carta → esercizio svolto del compendio (cap. 9) */
const EX_REF = {
  "Borrow Bits":"9.1", "FLSM":"9.3", "VLSM":"9.5"
};

/* ---------------------------------------------------------------------
   FLOWS — diagrammi di flusso dei processi tecnici/di gioco (DAG).
   node.kind: start · op · dec (decisione) · end. node.card = rimando carta.
   edge: [da, a, etichetta?]
   --------------------------------------------------------------------- */
const FLOWS = [
  { id:"forwarding", title:"Inoltro di un pacchetto", intro:"Dal mittente a Internet: maschera, decisione locale/remoto, routing e NAT.",
    nodes:[
      {id:"s",   label:"Host invia",            kind:"start"},
      {id:"and", label:"Netmask (AND)",         kind:"op",  card:"Netmask"},
      {id:"nid", label:"Network ID",            kind:"op",  card:"Network ID"},
      {id:"d1",  label:"Dest. stessa rete?",    kind:"dec"},
      {id:"lan", label:"Consegna diretta (LAN)",kind:"end", card:"Host Range"},
      {id:"gw",  label:"Default Gateway",       kind:"op",  card:"Default Gateway"},
      {id:"lpm", label:"Longest Prefix Match",  kind:"op",  card:"Longest Prefix Match"},
      {id:"d2",  label:"Sorgente privata?",     kind:"dec"},
      {id:"nat", label:"NAT / PAT",             kind:"op",  card:"NAT"},
      {id:"net", label:"Internet",              kind:"end"}
    ],
    edges:[["s","and"],["and","nid"],["nid","d1"],["d1","lan","sì"],["d1","gw","no"],
           ["gw","lpm"],["lpm","d2"],["d2","nat","sì"],["d2","net","no"],["nat","net"]] },

  { id:"subnetting", title:"Subnetting di un blocco", intro:"Prendere host-bit in prestito e scegliere FLSM o VLSM secondo i fabbisogni.",
    nodes:[
      {id:"s",  label:"Blocco /n",            kind:"start"},
      {id:"bo", label:"Borrow Bits (+s)",     kind:"op",  card:"Borrow Bits"},
      {id:"sp", label:"2^s sottoreti",        kind:"op"},
      {id:"d",  label:"Fabbisogni uguali?",   kind:"dec"},
      {id:"fl", label:"FLSM (taglia unica)",  kind:"op",  card:"FLSM"},
      {id:"vl", label:"VLSM (su misura)",     kind:"op",  card:"VLSM"},
      {id:"hr", label:"Host Range per blocco",kind:"end", card:"Host Range"}
    ],
    edges:[["s","bo"],["bo","sp"],["sp","d"],["d","fl","sì"],["d","vl","no"],["fl","hr"],["vl","hr"]] },

  { id:"binary", title:"Dal binario alla maschera", intro:"Conversione, AND con la maschera e ricavo di rete, broadcast e range host.",
    nodes:[
      {id:"ip", label:"IPv4 Address",   kind:"start", card:"IPv4 Address"},
      {id:"pv", label:"Place Value (dec→bin)", kind:"op", card:"Place Value"},
      {id:"an", label:"AND con Netmask",kind:"op",  card:"Netmask"},
      {id:"ni", label:"Network ID",     kind:"op",  card:"Network ID"},
      {id:"bc", label:"Broadcast",      kind:"op",  card:"Broadcast"},
      {id:"hr", label:"Host Range",     kind:"end", card:"Host Range"}
    ],
    edges:[["ip","pv"],["pv","an"],["an","ni"],["an","bc"],["ni","hr"],["bc","hr"]] },

  { id:"acl", title:"Filtro di una ACL", intro:"Confronto con wildcard, prima riga che combacia, permit o deny.",
    nodes:[
      {id:"pk", label:"Pacchetto",            kind:"start"},
      {id:"wc", label:"Wildcard Mask (match)",kind:"op",  card:"Wildcard Mask"},
      {id:"ac", label:"ACL: prima riga utile",kind:"op",  card:"ACL"},
      {id:"d",  label:"Combacia?",            kind:"dec"},
      {id:"pm", label:"permit",               kind:"end"},
      {id:"dn", label:"deny (implicito)",     kind:"end"}
    ],
    edges:[["pk","wc"],["wc","ac"],["ac","d"],["d","pm","sì"],["d","dn","no"]] }
];

/* ---------------------------------------------------------------------
   APPS — applicazioni reali delle meccaniche (net/subnetting + crittografia).
   area: net · crypto · sec. refs = carte/keyword collegate (link al compendio).
   --------------------------------------------------------------------- */
const AREAS = {
  net:    "Reti & subnetting",
  crypto: "Crittografia — le stesse operazioni sui bit",
  sec:    "Sicurezza di rete (subnet + crittografia)"
};
const APPS = [
  /* --- NET / SUBNETTING --- */
  { id:"office", area:"net", title:"Rete di un ufficio (VLSM)",
    scenario:"Tre reparti da 50, 25 e 10 host: da un solo /24 servono blocchi su misura.",
    mech:"VLSM · Borrow Bits", real:"Si ordina per fabbisogno decrescente e si assegnano maschere variabili, evitando lo spreco di indirizzi.",
    c:"50→192.168.1.0/26 · 25→.64/27 · 10→.96/28", refs:["VLSM","Borrow Bits","Host Range"] },
  { id:"vpc", area:"net", title:"Pianificazione di una VPC cloud",
    scenario:"In AWS/Azure si assegna un blocco CIDR alla rete virtuale e lo si suddivide per zona.",
    mech:"CIDR · Subnetting", real:"Un /16 ampio lascia spazio alla crescita; le subnet /24 separano le availability zone.",
    c:"VPC 10.0.0.0/16 → 10.0.1.0/24, 10.0.2.0/24 …", refs:["CIDR","Borrow Bits","Private Range"] },
  { id:"bgp", area:"net", title:"Aggregazione delle rotte (ISP/BGP)",
    scenario:"Un ISP annuncia molte reti contigue ai peer riducendo la tabella globale.",
    mech:"Supernet · Summarization", real:"Più /24 contigui e allineati si annunciano come un solo prefisso riassuntivo.",
    c:"10.1.0.0/24 … 10.1.3.0/24 → 10.1.0.0/22", refs:["Supernet","Summarization"] },
  { id:"home", area:"net", title:"Condivisione della connessione di casa",
    scenario:"Molti dispositivi privati dietro un solo IP pubblico del provider.",
    mech:"PAT (NAT overload)", real:"Il router traduce gli indirizzi privati su un unico IP pubblico, distinguendo i flussi per porta sorgente.",
    c:"192.168.1.0/24 → 1 IP pubblico (PAT)", refs:["PAT","NAT","Private Range"] },

  /* --- CRITTOGRAFIA (ponte: operazioni sui bit) --- */
  { id:"bitmask", area:"crypto", title:"Bitmasking: estrarre campi con AND",
    scenario:"In molti protocolli si isolano flag o campi di un header con una maschera di bit.",
    mech:"AND — la stessa della Netmask", real:"L'AND bit-a-bit azzera i bit non voluti e conserva gli altri: identico al calcolo del Network ID, applicato a flag/campi.",
    c:"byte AND 00001111 → isola i 4 bit bassi", refs:["AND","Netmask","BIT"] },
  { id:"xor", area:"crypto", title:"Cifrario a flusso (XOR) — WEP",
    scenario:"Il WEP cifra ogni byte combinandolo con un keystream (dalla fonte: cᵢ = dᵢ XOR kᵢ).",
    mech:"XOR — famiglia di AND/NOT", real:"Stesso ragionamento bit-a-bit della maschera, con XOR al posto di AND; XOR è reversibile: dᵢ = cᵢ XOR kᵢ.",
    c:"d=1011 XOR k=0110 → c=1101", refs:["BIT","AND","Wildcard Mask"] },
  { id:"keylen", area:"crypto", title:"Lunghezza della chiave in bit",
    scenario:"La robustezza dipende dai bit di chiave: 40-bit (WEP, debole), 128-bit (AES), 2048-bit (RSA).",
    mech:"BIT · POWER2 (2^n)", real:"Con n bit di chiave lo spazio è 2^n: ogni bit raddoppia il costo della forza bruta — lo stesso 2^n di sottoreti e host.",
    c:"AES-128 → 2^128 chiavi possibili", refs:["BIT","POWER2"] },
  { id:"asym", area:"crypto", title:"Chiave pubblica e privata (RSA)",
    scenario:"Crittografia asimmetrica: chiave di cifratura pubblica, di decifratura privata.",
    mech:"Pubblico vs privato", real:"Separare ciò che è pubblico da ciò che è privato richiama il contrasto Public IP ↔ Private Range, qui applicato alle chiavi.",
    c:"RSA-2048: pubblica nota a tutti, privata segreta", refs:["Public IP","Private Range"] },

  /* --- SICUREZZA (subnet + crittografia) --- */
  { id:"fw", area:"sec", title:"Firewall: regola per un reparto",
    scenario:"Consentire solo la sottorete amministrazione verso un server.",
    mech:"Wildcard Mask · ACL", real:"La ACL confronta l'IP sorgente con la coppia indirizzo/wildcard (inverso della netmask) e applica permit/deny in ordine.",
    c:"access-list 10 permit 192.168.1.0 0.0.0.255", refs:["Wildcard Mask","ACL"] },
  { id:"vpn", area:"sec", title:"VPN site-to-site (IPsec)",
    scenario:"Collegare due sedi con sottoreti private attraverso Internet, in modo cifrato.",
    mech:"Subnet + crittografia", real:"Le sottoreti private definiscono il «traffico interessante» (chi parla con chi); IPsec cifra i pacchetti tra i gateway (come).",
    c:"10.1.0.0/24 ⇄ 10.2.0.0/24 (tunnel IPsec)", refs:["Private Range","NAT","ACL"] },
  { id:"urpf", area:"sec", title:"Anti-spoofing (BCP38 / uRPF)",
    scenario:"Scartare i pacchetti con indirizzo sorgente implausibile per l'interfaccia.",
    mech:"Controllo di sottorete · uRPF", real:"Il router verifica che la sorgente appartenga alla rete attesa: difende dall'IP spoofing.",
    c:"ip verify unicast source reachable-via rx", refs:["IP Spoofing","Network ID"] }
];

/* Esposizione globale (niente bundler: si apre da filesystem) */
if (typeof window !== "undefined") {
  Object.assign(window, { META, FAC, CLS, CLS_ORDER, SUBTYPES, KWCAT, KW, KW_INFO, CARDS, INFO, COMP, TERM_REF, KW_REF, EX_REF, FLOWS, APPS, AREAS });
}
if (typeof module !== "undefined") { module.exports = { META, FAC, CLS, CLS_ORDER, SUBTYPES, KWCAT, KW, KW_INFO, CARDS, INFO, COMP, TERM_REF, KW_REF, EX_REF, FLOWS, APPS, AREAS }; }
