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
html = html.replace(/diagramma\.html/g, "#diagrams").replace(/applicazioni\.html/g, "#applications");

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

/* 6) diagrammi (FLOWS) + applicazioni (APPS) embeddati */
const extraCss = `<style>
  #diagrams,#applications{margin-top:34px}
  #diagrams .flow{margin-top:18px;background:linear-gradient(180deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:14px;padding:14px 16px}
  #diagrams .flow h3{margin:0;color:var(--acc);font-size:1.02rem}
  #diagrams .flow .in{color:var(--mut);font-size:.86rem;margin:4px 0 8px}
  #diagrams svg{width:100%;height:auto;display:block}
  #diagrams .edge{fill:none;stroke:#46577d;stroke-width:1.6}
  #diagrams .elbl{fill:var(--mut);font-size:11px;font-family:var(--mono);text-anchor:middle}
  #diagrams .elbl-bg{fill:var(--panel2)}
  #diagrams .node text{font-size:12.5px;fill:var(--ink);text-anchor:middle;dominant-baseline:middle}
  #diagrams .node rect{stroke-width:1.5}
  #diagrams .node.start rect{fill:#0e2a2a;stroke:var(--acc)}
  #diagrams .node.op rect{fill:#12203f;stroke:var(--acc2)}
  #diagrams .node.dec rect{fill:#2a2410;stroke:#ffce5a}
  #diagrams .node.end rect{fill:#2a1218;stroke:#ff7a8a}
  #diagrams .leg{display:flex;gap:14px;flex-wrap:wrap;font-size:.8rem;color:var(--mut);margin:6px 0}
  #diagrams .leg i{width:12px;height:12px;border-radius:3px;display:inline-block;margin-right:5px;vertical-align:-1px}
  #applications .xarea{margin-top:20px}
  #applications .xareah{font-size:1rem;border-bottom:1px solid var(--line);padding-bottom:6px;color:var(--acc)}
  #applications .xgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px;margin-top:12px}
  #applications .xapp{background:linear-gradient(180deg,var(--panel),var(--panel2));border:1px solid var(--line);border-left:4px solid var(--acc2);border-radius:12px;padding:13px 14px}
  #applications .xapp.crypto{border-left-color:#c9a3ff}
  #applications .xapp.sec{border-left-color:#ff7a8a}
  #applications .xt{font-weight:650;margin-bottom:5px}
  #applications .xs,#applications .xr{font-size:.86rem;color:#cdd8f2}
  #applications .xl{font-family:var(--mono);font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--acc);margin-top:9px}
  #applications .xc{font-family:var(--mono);font-size:.8rem;background:#0a1124;border:1px solid var(--line);border-radius:8px;padding:6px 9px;color:#7ee0d6;white-space:pre-wrap;margin-top:4px}
  #applications .xrefs{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
  #applications .xref{font-family:var(--mono);font-size:.7rem;padding:2px 7px;border-radius:6px;border:1px solid var(--line);color:var(--mut)}
</style>`;
html = html.replace("</head>", extraCss + "\n</head>");

const extraSections = `  <section class="cls" id="diagrams">
    <h2>DIAGRAMMI <small>processi tecnici e di gioco</small></h2>
    <div class="leg"><span><i style="background:var(--acc)"></i>inizio</span><span><i style="background:var(--acc2)"></i>operazione</span><span><i style="background:#ffce5a"></i>decisione</span><span><i style="background:#ff7a8a"></i>esito</span></div>
    <div id="diag-body"></div>
  </section>
  <section class="cls" id="applications">
    <h2>APPLICAZIONI REALI <small>subnetting · crittografia · sicurezza</small></h2>
    <div id="apps-body"></div>
  </section>`;
html = html.replace("</main>", extraSections + "\n</main>");

const extraScript = `<script>
(function(){
  var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
  /* --- diagrammi --- */
  var db=document.getElementById("diag-body");
  if(db&&typeof FLOWS!=="undefined"){
    FLOWS.forEach(function(f){
      var box=document.createElement("section");box.className="flow";
      box.innerHTML='<h3>'+esc(f.title)+'</h3><div class="in">'+esc(f.intro)+'</div>';
      box.appendChild(renderFlow(f));db.appendChild(box);
    });
  }
  function renderFlow(flow){
    var nodes=flow.nodes,edges=flow.edges,adj={},indeg={};
    nodes.forEach(function(n){adj[n.id]=[];indeg[n.id]=0;});
    edges.forEach(function(e){adj[e[0]].push(e[1]);indeg[e[1]]++;});
    var q=nodes.filter(function(n){return indeg[n.id]===0;}).map(function(n){return n.id;}),order=[],ind=Object.assign({},indeg);
    while(q.length){var u=q.shift();order.push(u);adj[u].forEach(function(v){if(--ind[v]===0)q.push(v);});}
    var layer={};nodes.forEach(function(n){layer[n.id]=0;});
    order.forEach(function(u){adj[u].forEach(function(v){layer[v]=Math.max(layer[v],layer[u]+1);});});
    var layers={};nodes.forEach(function(n){(layers[layer[n.id]]=layers[layer[n.id]]||[]).push(n);});
    var maxL=Math.max.apply(null,Object.keys(layers).map(Number));
    var W=760,rowGap=96,nodeH=46,padY=22,H=padY*2+maxL*rowGap+nodeH,pos={};
    for(var l=0;l<=maxL;l++){var row=layers[l]||[],n=row.length;row.forEach(function(nd,i){pos[nd.id]={x:Math.round(W*(i+1)/(n+1)),y:padY+l*rowGap+nodeH/2};});}
    var refOf=function(nd){return (nd.card&&typeof TERM_REF!=="undefined"&&TERM_REF[nd.card])||null;};
    var s='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(flow.title)+'">';
    s+='<defs><marker id="arr-'+flow.id+'" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#46577d"/></marker></defs>';
    edges.forEach(function(e){var p=pos[e[0]],r=pos[e[1]],x1=p.x,y1=p.y+nodeH/2,x2=r.x,y2=r.y-nodeH/2,my=(y1+y2)/2;
      s+='<path class="edge" d="M'+x1+','+y1+' C'+x1+','+my+' '+x2+','+my+' '+x2+','+y2+'" marker-end="url(#arr-'+flow.id+')"/>';
      if(e[2]){var mx=(x1+x2)/2,w=e[2].length*7+8;s+='<rect class="elbl-bg" x="'+(mx-w/2)+'" y="'+(my-9)+'" width="'+w+'" height="16" rx="4"/><text class="elbl" x="'+mx+'" y="'+(my+1)+'">'+esc(e[2])+'</text>';}
    });
    nodes.forEach(function(nd){var p=pos[nd.id],w=Math.max(110,nd.label.length*7.3+26),x=p.x-w/2,y=p.y-nodeH/2,ref=refOf(nd);
      var tip=nd.card&&typeof INFO!=="undefined"&&INFO[nd.card]?INFO[nd.card].r:"";
      var inner='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+nodeH+'" rx="10"/><text x="'+p.x+'" y="'+p.y+'">'+esc(nd.label)+'</text>'+(tip?'<title>'+esc(tip)+'</title>':"");
      s+= ref?('<g class="node '+(nd.kind||"op")+'"><a href="#r'+ref+'">'+inner+'</a></g>'):('<g class="node '+(nd.kind||"op")+'">'+inner+'</g>');
    });
    s+='</svg>';var wrap=document.createElement("div");wrap.innerHTML=s;return wrap.firstChild;
  }
  /* --- applicazioni --- */
  function refChip(name){var ref=(typeof TERM_REF!=="undefined"&&TERM_REF[name])||(typeof KW_REF!=="undefined"&&KW_REF[name])||null;
    return ref?'<a class="xref" href="#r'+ref+'">'+esc(name)+'</a>':'<span class="xref">'+esc(name)+'</span>';}
  var ab=document.getElementById("apps-body");
  if(ab&&typeof APPS!=="undefined"){
    Object.keys(AREAS).forEach(function(area){
      var list=APPS.filter(function(a){return a.area===area;});if(!list.length)return;
      var sec=document.createElement("section");sec.className="xarea";
      sec.innerHTML='<h3 class="xareah">'+esc(AREAS[area])+'</h3>';
      var g=document.createElement("div");g.className="xgrid";
      list.forEach(function(a){var d=document.createElement("div");d.className="xapp "+area;
        d.innerHTML='<div class="xt">'+esc(a.title)+'</div><div class="xs">'+esc(a.scenario)+'</div>'+
          '<div class="xl">Meccanica</div><div class="xs">'+esc(a.mech)+'</div>'+
          '<div class="xl">Nel reale</div><div class="xr">'+esc(a.real)+'</div>'+
          (a.c?'<div class="xl">Esempio</div><div class="xc">'+esc(a.c)+'</div>':'')+
          '<div class="xrefs">'+(a.refs||[]).map(refChip).join('')+'</div>';
        g.appendChild(d);});
      sec.appendChild(g);ab.appendChild(sec);
    });
  }
})();
</script>`;
html = html.replace("</body>", extraScript + "\n</body>");

/* 7) titolo */
html = html.replace("<title>GROUND OF REACH — galleria</title>", "<title>GROUND OF REACH — standalone</title>");

const out = path.join(dir, "ground-of-reach-standalone.html");
fs.writeFileSync(out, html);
console.log("Scritto ground-of-reach-standalone.html (" + html.length + " byte)");
