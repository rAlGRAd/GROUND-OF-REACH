/* =====================================================================
   build-standalone.js — GROUND OF REACH
   Genera ground-of-reach-standalone.html: un UNICO file con
   galleria + glossario + compendio, comodo da condividere.
   Inlina data.js e riscrive i rimandi compendio.html#rX.Y in àncore interne.
   Uso:  node build-standalone.js
   ===================================================================== */
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const read = f => fs.readFileSync(path.join(dir, f), "utf8");

let html = read("index.html");
const data = read("data.js");

/* 1) inlina data.js */
if (!/<script src="data\.js"><\/script>/.test(html)) {
  console.error("ERRORE: tag <script src=\"data.js\"> non trovato in index.html");
  process.exit(1);
}
html = html.replace(/<script src="data\.js"><\/script>/, "<script>\n" + data + "\n</script>");

/* 2) rimandi al compendio → àncore interne (prima #r…, poi il link nudo) */
html = html.replace(/compendio\.html#r/g, "#r").replace(/compendio\.html/g, "#compendium");

/* 3) stile del compendio embeddato */
const compCss = `<style>
  #compendium{margin-top:34px}
  #compendium .ch-t{margin-top:22px;color:var(--acc);font-weight:600;font-size:.98rem;border-bottom:1px solid var(--line);padding-bottom:6px;scroll-margin-top:14px}
  #compendium .crule{display:flex;gap:12px;padding:8px 10px;border-radius:8px;scroll-margin-top:14px;font-size:.9rem}
  #compendium .crule:target{background:#16223f;outline:1px solid var(--acc)}
  #compendium .crid{font-family:var(--mono);color:var(--acc2);font-weight:700;white-space:nowrap}
  #compendium .crule b{color:var(--ink)}
  #compendium code{font-family:var(--mono);font-size:.85em;background:#0a1124;border:1px solid var(--line);border-radius:5px;padding:1px 5px;color:var(--acc)}
  @media print{#compendium code{background:#fff;color:#111;border-color:#999}#compendium .ch-t{color:#111;border-color:#999}}
</style>`;
html = html.replace("</head>", compCss + "\n</head>");

/* 4) contenitore del compendio in fondo a main */
const compSection = `  <section class="cls" id="compendium">
    <h2>COMPENDIO <small>processi delle reti IPv4 in ordine reale</small></h2>
    <div id="comp-body"></div>
  </section>`;
html = html.replace("</main>", compSection + "\n</main>");

/* 5) render del compendio da COMP (globale, definito da data.js inlinato) */
const compScript = `<script>
(function(){
  var b=document.getElementById("comp-body");
  if(!b||typeof COMP==="undefined")return;
  COMP.forEach(function(ch){
    var h=document.createElement("div");h.className="ch-t";h.id="c"+ch.id;
    h.textContent=ch.id+". "+ch.title;b.appendChild(h);
    ch.rules.forEach(function(r){
      var d=document.createElement("div");d.className="crule";d.id="r"+r[0];
      d.innerHTML='<span class="crid">'+r[0]+'</span><span>'+r[1]+'</span>';
      b.appendChild(d);
    });
  });
  if(location.hash){var t=document.getElementById(location.hash.slice(1));if(t)t.scrollIntoView();}
})();
</script>`;
html = html.replace("</body>", compScript + "\n</body>");

/* 6) titolo */
html = html.replace("<title>GROUND OF REACH — galleria</title>", "<title>GROUND OF REACH — standalone</title>");

const out = path.join(dir, "ground-of-reach-standalone.html");
fs.writeFileSync(out, html);
console.log("Scritto ground-of-reach-standalone.html (" + html.length + " byte)");
