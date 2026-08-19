/* In-browser editing. Add ?edit=1 to any page URL. Nothing is sent anywhere;
   changes live in the browser until you click Save, which downloads the page. */
(function(){
if(!/[?&]edit=1/.test(location.search))return;
var SEL='main h1,main h2,main h3,main h4,main p,main li,main dd,main dt,main figcaption,main .mstep,main .mout,main .n,main .yr,main .cl,footer h5,footer p';
var nodes=[],dirty=false;
function start(){
 document.body.classList.add('editing');
 document.querySelectorAll(SEL).forEach(function(e){
  if(e.closest('#edbar'))return;
  e.setAttribute('contenteditable','true');
  e.setAttribute('spellcheck','true');
  nodes.push(e);
 });
 document.addEventListener('input',function(){dirty=true;count();},true);
 bar();count();
 window.addEventListener('beforeunload',function(ev){ if(dirty){ev.preventDefault();ev.returnValue='';} });
}
function count(){
 var c=document.getElementById('ed-count');
 if(c)c.textContent=nodes.length+' editable blocks'+(dirty?' · unsaved changes':'');
}
function bar(){
 var d=document.createElement('div'); d.id='edbar';
 d.innerHTML='<b>EDIT MODE</b><span id="ed-count"></span>'+
   '<span style="flex:1"></span>'+
   '<button id="ed-save" type="button">Save &amp; Download Page</button>'+
   '<button id="ed-exit" class="ghost" type="button">Exit</button>';
 document.body.appendChild(d);
 document.getElementById('ed-save').addEventListener('click',save);
 document.getElementById('ed-exit').addEventListener('click',function(){
  dirty=false; location.href=location.pathname;
 });
}
function save(){
 var doc=document.documentElement.cloneNode(true);
 doc.querySelectorAll('[contenteditable]').forEach(function(e){
  e.removeAttribute('contenteditable'); e.removeAttribute('spellcheck');
 });
 var b=doc.querySelector('#edbar'); if(b)b.remove();
 var body=doc.querySelector('body'); if(body)body.classList.remove('editing');
 doc.querySelectorAll('script[src*="edit.js"]').forEach(function(s){}); // keep edit.js for next time
 var html='<!DOCTYPE html>\n'+doc.outerHTML;
 var name=(location.pathname.split('/').pop()||'index.html');
 if(!/\.html$/.test(name))name='index.html';
 var a=document.createElement('a');
 a.href=URL.createObjectURL(new Blob([html],{type:'text/html'}));
 a.download=name; document.body.appendChild(a); a.click(); a.remove();
 dirty=false; count();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start); else start();
})();
