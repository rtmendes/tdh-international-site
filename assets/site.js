/* theme */
(function(){
var root=document.documentElement,KEY='tdh-theme',btn=document.getElementById('theme-toggle');
function label(){var t=root.getAttribute('data-theme')==='light';
 if(!btn)return; btn.setAttribute('aria-pressed',String(t));
 btn.setAttribute('aria-label',t?'Switch to dark mode':'Switch to light mode');
 var l=btn.querySelector('.theme-label'); if(l)l.textContent=t?'Dark':'Light';}
label();
if(btn)btn.addEventListener('click',function(){
 var n=root.getAttribute('data-theme')==='light'?'dark':'light';
 root.setAttribute('data-theme',n); label();
 try{localStorage.setItem(KEY,n);}catch(e){}
});
})();
/* nav: dropdowns + mobile */
(function(){
var burger=document.querySelector('.navburger'),links=document.querySelector('.navlinks');
if(burger&&links)burger.addEventListener('click',function(){
 links.classList.toggle('open');
 burger.setAttribute('aria-expanded',String(links.classList.contains('open')));
});
document.querySelectorAll('.nav-drop').forEach(function(d){
 var b=d.querySelector('button');
 b.addEventListener('click',function(e){
  e.stopPropagation();
  var open=d.dataset.open==='true';
  document.querySelectorAll('.nav-drop').forEach(function(o){o.dataset.open='false';o.querySelector('button').setAttribute('aria-expanded','false');});
  d.dataset.open=String(!open); b.setAttribute('aria-expanded',String(!open));
 });
});
document.addEventListener('click',function(e){
 if(e.target.closest('.nav-drop'))return;
 document.querySelectorAll('.nav-drop').forEach(function(o){o.dataset.open='false';o.querySelector('button').setAttribute('aria-expanded','false');});
});
document.addEventListener('keydown',function(e){ if(e.key==='Escape')
 document.querySelectorAll('.nav-drop').forEach(function(o){o.dataset.open='false';});});
})();
/* qualifier */
(function(){
var st={p139:null,aip:null},out=document.getElementById('qz-out');
if(!out)return;
document.querySelectorAll('.qz-opts').forEach(function(g){
 g.addEventListener('click',function(e){
  var b=e.target.closest('button'); if(!b)return;
  g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false');});
  b.setAttribute('aria-pressed','true'); st[g.dataset.q]=b.dataset.v; render();
 });
});
function render(){
 if(!st.p139||!st.aip)return;
 var cert=st.p139==='yes',h='';
 h+='<h4>'+(cert?'You are likely a Part&nbsp;139 certificated airport.':st.p139==='unsure'?'You may or may not be Part&nbsp;139 &mdash; worth confirming.':'You are almost certainly not Part&nbsp;139 certificated.')+'</h4>';
 h+='<p>Part&nbsp;139 applies to airports serving scheduled passenger operations in aircraft configured for more than 9 seats (and unscheduled operations at 31+ seats). That one fact changes which of the following are requirements rather than recommended guidance.</p><ul>';
 h+=cert?'<li><strong>Wildlife hazard assessment is a requirement</strong>, triggered by defined strike events under 14&nbsp;CFR&nbsp;&sect;&nbsp;139.337.</li>'
        :'<li><strong>Wildlife hazard work is recommended guidance</strong> tied to federal funding &mdash; not a Part&nbsp;139 mandate. Anyone telling you it is required at a GA field is overstating it.</li>';
 if(st.aip==='yes'){
  h+='<li><strong>Grant Assurance 29 applies:</strong> keep a current ALP, and do not permit alterations conflicting with the approved plan.</li>';
  h+='<li><strong>Grant Assurance 21 applies:</strong> compatible land use &mdash; and it reaches sponsors holding no land-use authority of their own.</li>';
  h+='<li><strong>Your entitlement funds have a clock:</strong> the fiscal year apportioned plus the three following years for nonprimary and nonhub primary airports, then they revert.</li>';
  h+='<li><strong>A third party can raise non-compliance</strong> under 14&nbsp;CFR&nbsp;Part&nbsp;16 &mdash; a tenant, an FBO, or a neighbour.</li>';
 } else if(st.aip==='no'){
  h+='<li>Without federal grant obligations the assurance-driven requirements above largely do not bind you &mdash; but an accurate ALP still governs what you can build, and becomes mandatory the moment you accept AIP funding.</li>';
 } else {
  h+='<li>Establishing whether you hold live grant obligations is the first thing to settle. Grant agreements bind a sponsor for the useful life of the funded facilities, up to 20 years &mdash; so a grant accepted long ago may still be in force.</li>';
 }
 h+='</ul><p class="qz-cite">Indicative only, from published FAA sources &mdash; confirm applicability with your FAA Airports District Office. Sources: <a href="https://www.ecfr.gov/current/title-14/chapter-I/subchapter-G/part-139" target="_blank" rel="noopener">14 CFR Part 139</a> &middot; <a href="https://www.faa.gov/airports/aip/grant_assurances/assurances-airport-sponsors-2025" target="_blank" rel="noopener">Sponsor Assurances 4/2025</a></p>';
 out.innerHTML=h;
}
})();
/* local-match calculator */
(function(){
var i=document.getElementById('calc-in'),o=document.getElementById('calc-out');
if(!i||!o)return;
function money(n){return '$'+Math.round(n).toLocaleString('en-US');}
function run(){
 var v=parseFloat((i.value||'').replace(/[^0-9.]/g,''))||0;
 o.innerHTML='<div class="calc-fig"><span class="k">Your share at 95% federal</span><span class="v">'+money(v*0.05)+'</span></div>'+
             '<div class="calc-fig"><span class="k">Your share at 90% federal</span><span class="v">'+money(v*0.10)+'</span></div>';
}
i.addEventListener('input',run);
i.addEventListener('blur',function(){var v=parseFloat((i.value||'').replace(/[^0-9.]/g,''))||0;i.value=v?v.toLocaleString('en-US'):'';});
run();
})();
/* client case-study modal */
(function(){
var m=document.getElementById('case-modal'); if(!m||!window.TDH_CASES)return;
var t=document.getElementById('case-title'),c=document.getElementById('case-client'),
    b=document.getElementById('case-body'),x=document.getElementById('case-close'),last=null;
function open(k){
 var d=window.TDH_CASES[k]; if(!d)return;
 last=document.activeElement;
 t.innerHTML=d.t; c.innerHTML=d.c;
 var s=d.img?('<figure class="mimg"><img src="assets/'+d.img+'" alt="'+d.alt+'"><figcaption>Representative view of the project area &mdash; illustrative rendering, not a site photograph.</figcaption></figure>'):'';
 s+='<div class="mstat">'+d.stats.map(function(p){return '<div class="s"><span class="v">'+p[0]+'</span><span class="k">'+p[1]+'</span></div>';}).join('')+'</div>';
 s+='<div class="ba"><div class="b"><h4>Before</h4><p>'+d.before+'</p></div><div class="a"><h4>After</h4><p>'+d.after+'</p></div></div>';
 s+='<p class="mrole"><strong>TDH’s role:</strong> '+d.role+'</p>';
 s+='<p class="msrc">Sources: '+d.src+'</p>';
 b.innerHTML=s; m.classList.add('show'); document.body.style.overflow='hidden'; x.focus();
}
function close(){m.classList.remove('show');document.body.style.overflow='';if(last)last.focus();}
document.addEventListener('click',function(e){
 var cell=e.target.closest('.logo-cell[data-case]');
 if(cell){open(cell.dataset.case);return;}
 if(e.target===m)close();
});
x.addEventListener('click',close);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('show'))close();});
})();
