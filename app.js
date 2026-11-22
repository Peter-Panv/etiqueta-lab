(() => {
  'use strict';
  const modules = window.COURSE;
  const lessons = modules.flatMap(m => m.lessons);
  const byId = new Map(lessons.map(l => [l.id,l]));
  const host = document.querySelector('main');
  const nav = document.querySelector('nav');
  const menu = document.querySelector('.menu-toggle');
  const paths = {
    menu:'M3 6h18M3 12h18M3 18h18', chart:'M4 20V13h3v7zM10.5 20V8h3v12zM17 20V3h3v17z',
    play:'M7 4l13 8-13 8z', code:'M7 7l-5 5 5 5m10-10 5 5-5 5M14 4l-4 16',
    layers:'M12 3 2 8l10 5 10-5-10-5zM2 12l10 5 10-5M2 16l10 5 10-5',
    book:'M3 4.5q5-2 9 1 4-3 9-1V19q-5-2-9 1-4-3-9-1zM12 5.5V20',
    layout:'M3 4h18v16H3zM3 9h18M10 9v11', flask:'M9 3h6m-5 0v6l-6 10a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2L14 9V3M7 15h10',
    clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM12 7v5l3 2', chevron:'m9 5 7 7-7 7',
    image:'M3 4h18v16H3zM4 17l5-6 4 4 3-3 5 5M15 8h.01', form:'M6 3h12v18H6zM9 8h6M9 12h6M9 16h3',
    grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', bolt:'M14 2 4 14h7l-1 8 10-13h-7z',
    orbit:'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 4c4 4-13 19-18 16S17 0 21 4z',
    check:'m4 12 5 5L20 6', file:'M5 3h9l5 5v13H5zM14 3v6h5', eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
    external:'M13 3h8v8M21 3 10 14M9 5H4v15h15v-5', list:'M8 6h13M8 12h13M8 18h13M3 6h.1M3 12h.1M3 18h.1',
    bulb:'M8 17c0-3-3-4-3-8a7 7 0 0 1 14 0c0 4-3 5-3 8zM9 21h6', download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
    terminal:'M3 4h18v16H3zM6 9l3 3-3 3m6 0h4', target:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z'
  };
  const icon = (name) => '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="'+(paths[name] || paths.code)+'"/></svg>';
  document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const num = n => String(n).padStart(2,'0');
  const doneKey='etiquetalab:curso:v1';
  function read(key,fallback) { try { const s=localStorage.getItem(key);return s===null?fallback:JSON.parse(s); } catch {return fallback;} }
  let storageFailed=false;
  function save(key,value) {try {localStorage.setItem(key,JSON.stringify(value));}catch{storageFailed=true;}}
  const saved=read(doneKey,{});
  const done = new Set((Array.isArray(saved?.done)?saved.done:[]).filter(id=>byId.has(id)));
  let last=byId.has(saved?.last)?saved.last:null;
  const update=()=>save(doneKey,{done:[...done],last});
  const draftKey=(l,mode)=>'etiquetalab:borrador:'+mode+':'+l.id;
  const nextUp=()=>lessons.find(l=>!done.has(l.id))||lessons[0];
  const resume=()=>last&&!done.has(last)?byId.get(last):nextUp();
  const modOf=l=>modules.find(m=>m.lessons.includes(l));
  const level=m=>modules.indexOf(m)<4?'HTML':'Integración';
  const mNumber=m=>num(modules.indexOf(m)+1);
  const modDone=m=>m.lessons.filter(l=>done.has(l.id)).length;
  const lessonLink=l=>'#leccion/'+l.id;
  const btn=(url,label,kind='',ic='')=>'<a class="btn '+kind+'" href="'+url+'">'+(ic?icon(ic):'')+esc(label)+'</a>';
  const link=(url,label,ic='chevron')=>'<a class="textlink" href="'+url+'">'+esc(label)+' '+icon(ic)+'</a>';
  const crumbs=(parent,here)=>'<div class="crumb"><a href="#inicio">Inicio</a> / '+(parent?'<a href="'+parent[0]+'">'+esc(parent[1])+'</a> / ':'')+'<span>'+esc(here)+'</span></div>';
  const head=(k,title,desc)=>'<div class="pagehead"><p class="kicker">'+esc(k)+'</p><h1>'+esc(title)+'</h1>'+(desc?'<p class="lede">'+esc(desc)+'</p>':'')+'</div>';
  const meter=p=>'<div class="meter" aria-hidden="true"><i style="width:'+p+'%"></i></div>';
  function art(m){
    const symbols={formularios:'[ + ]',css:'{ }',bootstrap:'B',javascript:'JS',plataforma:'&lt;x&gt;'};
    const forms={
      fundamentos:'<div class="miniwin tile"><div class="minitop"><i></i><i></i><i></i></div><div class="minibody"><b>&lt;/&gt;</b><span class="minilines"></span></div></div><span class="tiny-tag">.html</span>',
      contenido:'<div class="diagram"><b class="d1 tile">&lt;main&gt;</b><b class="d2 tile">&lt;nav&gt;</b><b class="d3 tile">&lt;article&gt;</b></div>',
      multimedia:'<div class="picture tile"></div><span class="tiny-tag">&lt;img&gt;</span>'
    };
    return '<div aria-hidden="true" class="cover '+esc(m.color)+'">'+(forms[m.id]||'<span class="tile symbol">'+symbols[m.id]+'</span>')+'</div>';
  }
  function card(m){return '<a class="card" href="#modulo/'+m.id+'">'+art(m)+'<div class="cardbody"><span class="mod-num">MÓDULO '+mNumber(m)+'</span><h3>'+esc(m.title)+'</h3><p>'+esc(m.description)+'</p><div class="cardfoot"><span>'+icon('book')+' '+m.lessons.length+' lecciones</span><span class="level">'+level(m)+'</span></div></div></a>';}
  function stats(){return '<div class="stats">'+[[modules.length+' módulos','Ruta de estudio','layers'],[lessons.length+' lecciones','Con ejemplos editables','book'],[lessons.length+' ejercicios','Con pistas y corrección','terminal']].map(([title,sub,ic])=>'<div class="stat"><span class="stat-icon">'+icon(ic)+'</span><div><strong>'+title+'</strong><small>'+sub+'</small></div></div>').join('')+'</div>';}
  function home(){
    return '<section class="hero"><div class="hero-copy"><div class="eyebrow">CURSO INTERACTIVO DE HTML</div><h1>Aprende HTML<br><em>línea por línea.</em></h1><p>Construye páginas web desde cero. Edita ejemplos, resuelve retos y mira cómo cobra vida tu código.</p><div class="actions">'+btn(lessonLink(resume()),last?'Continuar aprendiendo':'Empezar a aprender','primary','play')+btn('#laboratorio','Abrir laboratorio','glass','terminal')+'</div></div><div class="hero-art" aria-hidden="true"><div class="rig"><div class="slab back"></div><div class="slab mid"></div><div class="slab front"><b>&lt;/&gt;</b></div><span class="art-chip chip-a">&lt;html&gt;</span><span class="art-chip chip-b">&lt;body&gt;</span><i class="spark sp1">+</i><i class="spark sp2">+</i><i class="spark sp3">+</i></div></div></section>'+stats()+
      '<section><div class="section-head"><div><p class="kicker">EL TEMARIO</p><h2>Ruta de aprendizaje</h2><p>Empieza por los fundamentos y avanza a tu ritmo.</p></div>'+link('#ruta','Ver ruta completa','list')+'</div><div class="cards">'+modules.slice(0,3).map(card).join('')+'</div></section><aside class="home-lab"><span class="square">'+icon('flask')+'</span><div><h3>Laboratorio libre</h3><p>Prueba una idea en HTML, CSS o JavaScript y descarga tu página.</p></div>'+link('#laboratorio','Abrir editor','code')+'</aside>';
  }
  function routePage(filter='Todos'){
    return head('TEMARIO','Ruta de estudio','Ocho módulos para pasar de tus primeras etiquetas a una aplicación web interactiva.')+
      '<div class="filters" aria-label="Filtrar módulos">'+['Todos','HTML','Integraciones'].map(t=>'<button data-filter="'+t+'" class="filter '+(filter===t?'active':'')+'" aria-pressed="'+(filter===t)+'">'+t+'</button>').join('')+'</div><div class="cards">'+modules.filter(m=>filter==='Todos'||(filter==='HTML')===(level(m)==='HTML')).map(card).join('')+'</div>';
  }
  function row(l,i){return '<a class="lesson-row" href="'+lessonLink(l)+'"><span class="counter">'+(done.has(l.id)?icon('check'):num(i+1))+'</span><span><strong>'+esc(l.title)+'</strong></span><span class="row-end">'+icon('clock')+l.minutes+' min '+icon('chevron')+'</span></a>';}
  function side(m,current){
    return '<aside class="panel"><h2 class="side-title">'+esc(m.title)+'</h2><p class="muted">'+modDone(m)+' de '+m.lessons.length+' completadas</p>'+meter(100*modDone(m)/m.lessons.length)+'<div class="side-nav">'+m.lessons.map(l=>'<a href="'+lessonLink(l)+'" class="'+(l===current?'active':'')+'">'+icon(done.has(l.id)?'check':'file')+esc(l.title)+'</a>').join('')+'</div></aside>';
  }
  function modulePage(m){
    const first=m.lessons.find(l=>!done.has(l.id))||m.lessons[0];
    return crumbs(['#ruta','Ruta de estudio'],m.title)+head('MÓDULO '+mNumber(m),m.title,m.description)+'<div class="module-layout"><div class="rows">'+m.lessons.map(row).join('')+'</div><aside class="panel"><h2 class="side-title">Tu avance</h2><p>'+modDone(m)+' de '+m.lessons.length+' lecciones</p>'+meter(100*modDone(m)/m.lessons.length)+btn(lessonLink(first),'Abrir lección','dark','book')+'</aside></div>';
  }
  const editor = (value,label='index.html')=>'<div class="editor"><div class="editor-head">'+icon('code')+'<label for="editor" class="file-label">'+esc(label)+'</label></div><textarea id="editor" aria-label="Editor de código" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off">'+esc(value)+'</textarea></div>';
  const preview = ()=>'<div class="preview"><div class="preview-head">'+icon('eye')+' Vista previa</div><iframe id="vista" sandbox="allow-scripts allow-forms" title="Resultado de tu código" referrerpolicy="no-referrer"></iframe></div>';
  function lessonPage(l,mode) {
    const m=modOf(l),example=mode==='ejemplo';
    const current=read(draftKey(l,mode),example?l.example:l.starter);
    const tabs='<div class="tabs" aria-label="Modo de la lección">'+['ejemplo','ejercicio'].map((key,i)=>'<button data-mode="'+key+'" class="'+(mode===key?'active':'')+'" aria-pressed="'+(mode===key)+'">'+icon(i?'target':'book')+' '+(i?'Ejercicio guiado':'Ejemplo explicado')+'</button>').join('')+'</div>';
    const body=example?'<section class="prose"><h2>Cómo funciona</h2><p>'+esc(l.concept)+'</p><p>'+esc(l.explain)+'</p></section>':'<section class="task"><h2>Tu reto</h2><p>'+esc(l.task)+'</p></section>';
    const buttons=example?'<div class="editor-actions"><button data-mode="ejercicio" class="btn dark">'+icon('target')+' Resolver el ejercicio</button></div>':'<div class="editor-actions"><button id="check" class="btn dark">'+icon('check')+' Comprobar ejercicio</button><button id="hint" class="btn">'+icon('bulb')+' Ver pista</button></div><div id="hints" aria-live="polite"></div><div id="feedback" class="feedback" aria-live="polite"></div><details class="solution"><summary>Consultar una solución</summary><pre><code>'+esc(l.solution)+'</code></pre></details>';
    return crumbs(['#modulo/'+m.id,m.title],l.title)+head('LECCIÓN '+num(m.lessons.indexOf(l)+1)+' / '+num(m.lessons.length)+'  ·  '+l.minutes+' MIN',l.title,'')+'<div class="study-layout"><section class="panel">'+tabs+body+editor(current)+preview()+buttons+'<a class="textlink source" target="_blank" rel="noopener" href="'+esc(l.source)+'">Documentación de referencia '+icon('external')+'</a></section>'+side(m,l)+'</div>';
  }
  const labInitial='<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mi laboratorio</title>\n  <style>\n    body { font-family: system-ui; padding: 1rem; }\n    h1 { color: seagreen; }\n  </style>\n</head>\n<body>\n  <h1>¡Hola, mundo!</h1>\n  <p>Esta es mi primera página.</p>\n</body>\n</html>';
  function laboratory(){
    const workspace='<div class="lab-grid">'+editor(read('etiquetalab:lab',labInitial))+preview()+'</div><div class="editor-actions"><button class="btn dark" id="run">'+icon('play')+' Ejecutar de nuevo</button><button class="btn" id="download">'+icon('download')+' Descargar HTML</button></div><p class="status-msg" id="lab-status" role="status">Tu borrador se guarda en este navegador.</p>';
    return head('PRÁCTICA LIBRE','Laboratorio de código','Busca una etiqueta o una clase, completa la parte que falta y prueba el resultado en la vista previa.')+window.BibliotecaLab.layout(workspace,icon);
  }
  const normalize=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
  function refItems(q='',cat='Todas'){
    const entries=window.REFERENCE.filter(r=>(cat==='Todas'||r[0]===cat)&&normalize(r.slice(0,4).join(' ')).includes(normalize(q)));
    return entries.length?entries.map(([c,t,d,ex,slug])=>'<article class="panel ref-row"><span class="mod-num">'+esc(c)+'</span><h2><code>&lt;'+esc(t)+'&gt;</code></h2><p>'+esc(d)+'</p><pre>'+esc(ex)+'</pre><a href="https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/'+(slug||t)+'" target="_blank" rel="noopener">Consultar en MDN '+icon('external')+'</a></article>').join(''):'<p class="solo">No hay coincidencias. Prueba con otra etiqueta o categoría.</p>';
  }
  function reference(){
    const cats=['Todas',...new Set(window.REFERENCE.map(r=>r[0]))];
    return head('GUÍA DE CONSULTA','Referencia HTML',window.REFERENCE.length+' fichas con el uso y un ejemplo de cada elemento. Busca por etiqueta, función o categoría.')+'<label for="query" class="file-label">Buscar una etiqueta</label><br><input id="query" type="search" class="search" placeholder="Ej. form, imagen, encabezado"><div class="filters">'+cats.map((c,i)=>'<button class="filter '+(!i?'active':'')+'" aria-pressed="'+(!i)+'" data-cat="'+esc(c)+'">'+esc(c)+'</button>').join('')+'</div><div id="refs" class="ref-list">'+refItems()+'</div>';
  }
  function progress(){
    let pct=Math.round(done.size*100/lessons.length);
    return head('SEGUIMIENTO','Mi progreso','Tu avance y tus borradores se guardan en este navegador.')+'<section class="panel"><div class="progress-number">'+pct+' %</div><p>'+done.size+' de '+lessons.length+' ejercicios completados</p>'+meter(pct)+btn(lessonLink(resume()),done.size===lessons.length?'Repasar una lección':last?'Retomar mi lección':'Comenzar la primera lección','dark','play')+'</section><div class="progress-cards">'+modules.map(m=>'<a class="panel" href="#modulo/'+m.id+'"><p class="kicker">MÓDULO '+mNumber(m)+'</p><h2>'+esc(m.title)+'</h2>'+meter(modDone(m)*100/m.lessons.length)+'<p class="muted">'+modDone(m)+' de '+m.lessons.length+' completadas</p></a>').join('')+'</div>';
  }
  const {previewDocument,behaviorTest}=window.EtiquetaMotor;
  function activeEditor(key){
    const area=document.getElementById('editor'),frame=document.getElementById('vista');
    let timer;
    const run=()=>{if(frame.isConnected)frame.srcdoc=previewDocument(area.value);};
    area.addEventListener('input',()=>{save(area.dataset.draftKey||key,area.value);clearTimeout(timer);timer=setTimeout(run,300);if(storageFailed&&document.querySelector('#lab-status'))document.querySelector('#lab-status').textContent='El almacenamiento está lleno o desactivado. Descarga el HTML para conservarlo.';});
    run();
    return {area,run};
  }
  function wireLaboratory() {
    const {area,run}=activeEditor('etiquetalab:lab');
    window.BibliotecaLab.mount({root:host,area,run,read,save,initial:labInitial,icon});
    document.getElementById('run').onclick=()=>{
      run();
      document.getElementById('lab-status').textContent='Vista previa actualizada.';
    };
    document.getElementById('download').onclick=()=>{
      const practice=area.dataset.draftKey?.startsWith('etiquetalab:lab:ficha:');
      const code=practice?window.BibliotecaLab.exportPractice(area.value):area.value;
      const url=URL.createObjectURL(new Blob([code],{type:'text/html;charset=utf-8'}));
      const a=document.createElement('a');
      a.href=url;a.download=practice?'mi-practica.html':'mi-pagina.html';a.click();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
    };
  }
  function wireLesson(l,mode){
    const {area}=activeEditor(draftKey(l,mode));
    host.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{const newMode=b.dataset.mode;if(mode!==newMode)location.hash='leccion/'+l.id+(newMode==='ejercicio'?'/ejercicio':'');});
    if(mode==='ejemplo')return;
    let hints=0;
    const hint=document.getElementById('hint'),feedback=document.getElementById('feedback'),check=document.getElementById('check');
    hint.onclick=()=>{hints++;document.getElementById('hints').innerHTML='<div class="hintbox"><strong>Pistas</strong><ol>'+l.hints.slice(0,hints).map(h=>'<li>'+esc(h)+'</li>').join('')+'</ol></div>';hint.textContent=hints<l.hints.length?'Ver otra pista':'Todas las pistas visibles';hint.disabled=hints>=l.hints.length;};
    area.addEventListener('input',()=>{feedback.textContent='';});
    check.onclick=async()=>{
      const code=area.value;check.disabled=true;feedback.textContent='Comprobando…';
      const doc=new DOMParser().parseFromString(code,'text/html');
      const live=l.probe?await behaviorTest(l,code):undefined;
      check.disabled=false;if(!feedback.isConnected||code!==area.value)return;
      const results=l.checks.map(c=>{let ok=false;try{ok=Boolean(c.test(doc,code,live));}catch{}return [c.label,ok];});
      const passed=results.every(r=>r[1]);const next=lessons[lessons.indexOf(l)+1];
      if(passed){done.add(l.id);update();const sidebar=host.querySelector('aside');if(sidebar)sidebar.outerHTML=side(modOf(l),l);}
      feedback.innerHTML='<div class="feedback-box"><h3>'+(passed?'¡Ejercicio completado!':results.filter(r=>r[1]).length+' de '+results.length+' objetivos cumplidos')+'</h3><ul>'+results.map(([label,ok])=>'<li class="'+(ok?'good':'pending')+'">'+(ok?'✓ Cumplido. ':'Pendiente. ')+esc(label)+'</li>').join('')+'</ul>'+(passed?'<div class="actions">'+btn(next?lessonLink(next):'#progreso',next?'Siguiente lección':'Ver mi progreso','dark small')+'</div>':'')+'</div>';
    };
  }
  let lastRoute='';
  function render(){
    const [path='inicio',id,step]=location.hash.replace(/^#\/?/,'').split('/');
    const l=byId.get(id),m=modules.find(item=>item.id===id);
    let view=path||'inicio';
    if(view==='leccion'&&!l||view==='modulo'&&!m||!['inicio','ruta','laboratorio','referencia','progreso','modulo','leccion'].includes(view))view='inicio';
    nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir navegación');
    document.querySelectorAll('[data-nav]').forEach(a=>{const current=a.dataset.nav===((view==='leccion'||view==='modulo')?'ruta':view);a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    if(view==='leccion'){last=l.id;update();const mode=step==='ejercicio'?'ejercicio':'ejemplo';host.innerHTML=lessonPage(l,mode);wireLesson(l,mode);}
    else if(view==='modulo')host.innerHTML=modulePage(m);
    else if(view==='ruta'){host.innerHTML=routePage();host.onclick=routeFilter;}
    else if(view==='referencia'){host.innerHTML=reference();let cat='Todas';const q=document.getElementById('query'),out=document.getElementById('refs');const refresh=()=>out.innerHTML=refItems(q.value,cat);q.oninput=refresh;host.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{cat=b.dataset.cat;host.querySelectorAll('[data-cat]').forEach(c=>{c.classList.toggle('active',c===b);c.setAttribute('aria-pressed',String(c===b));});refresh();});}
    else if(view==='laboratorio'){host.innerHTML=laboratory();wireLaboratory();}
    else if(view==='progreso')host.innerHTML=progress();
    else host.innerHTML=home();
    if(view!=='ruta')host.onclick=null;
    function routeFilter(e){const b=e.target.closest('[data-filter]');if(b){host.innerHTML=routePage(b.dataset.filter);host.querySelector('.filter.active')?.focus();}}
    document.title=(host.querySelector('h1')?.textContent||'Aprende HTML')+' · EtiquetaLab';
    const here=location.hash;if(lastRoute!==here){if(lastRoute)host.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}lastRoute=here;
  }
  menu.onclick=()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'Cerrar navegación':'Abrir navegación');};
  document.querySelector('.skip').onclick=e=>{e.preventDefault();host.focus();};
  window.addEventListener('hashchange',render);render();
})();
