(() => {
  'use strict';
  const labels = {HTML:'Etiquetas HTML', Atributos:'Atributos HTML', CSS:'Clases y reglas CSS', Bootstrap:'Clases de Bootstrap', JavaScript:'JavaScript y DOM'};
  const familyTip = {
    HTML:'Una etiqueta indica qué representa el contenido que la rodea.',
    Atributos:'Un atributo se escribe en la etiqueta de apertura y configura ese elemento.',
    CSS:'Tú eliges el nombre de una clase. En HTML escribes class="destacado" y en CSS seleccionas .destacado.',
    Bootstrap:'Bootstrap ya define estas clases. Combínalas en el atributo class, separadas por espacios.',
    JavaScript:'Un selector encuentra el elemento y una instrucción cambia lo que ocurre en la página.'
  };
  const blank = '____';
  const marker = /⟦([^⟦⟧]+)⟧/;
  const bootstrapURL = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css';
  const personal = 'etiquetalab:lab';
  const uiStorage = 'etiquetalab:biblioteca:v1';
  const cards = [...window.LAB_TAGS, ...window.LAB_EXTRAS].map(card => ({...card, id:card.family+'|'+card.term}));
  const lookup = new Map(cards.map(card => [card.id,card]));
  const keyFor = card => personal+':ficha:'+card.id;
  const norm = text => text.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const groupSymbol = {HTML:'<>', Atributos:'@', CSS:'{ }', Bootstrap:'B', JavaScript:'JS'};
  const words = card => norm([card.term,card.family,labels[card.family],card.group,card.title,card.description,card.task].join(' '));
  const library = new Map(cards.map(card => [card.id,words(card)]));
  const esc = str => String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function snippet(card, completed) {
    const value = card.pattern.replace(marker, (_,answer)=>completed ? answer : blank);
    return card.family==='Bootstrap' ? '<link rel="stylesheet" href="'+bootstrapURL+'">\n\n'+value : value;
  }
  function highlight(pattern) {
    const match = pattern.match(marker);
    return esc(pattern.slice(0,match.index))+'<mark aria-label="parte que debes completar">'+blank+'</mark>'+esc(pattern.slice(match.index+match[0].length));
  }
  function layout(workspace, icon) {
    const groups = Object.entries(labels).map(([value,label])=>'<option value="'+esc(value)+'">'+esc(label)+'</option>').join('');
    return '<div class="workshop"><aside class="library-browser"><details id="lib-browser" open><summary><span class="lib-book">'+icon('book')+'</span><span>Biblioteca de código</span><span class="lib-caret">'+icon('chevron')+'</span></summary>'+
      '<div class="lib-controls"><label for="lib-q">Buscar fichas</label><input type="search" id="lib-q" placeholder="Ej. enlace, botón, .tarjeta" autocomplete="off">'+
      '<label for="lib-family">Tipo de código</label><select id="lib-family"><option value="">Toda la biblioteca</option>'+groups+'</select>'+
      '<label for="lib-group">Tema</label><select id="lib-group"></select></div><p class="lib-count" id="lib-count" role="status"></p><div class="lib-list" id="lib-list" aria-label="Fichas de la biblioteca"></div></details></aside>'+
      '<div class="lab-desk"><section class="lib-card" id="lib-card" aria-label="Ficha seleccionada"></section>'+
      '<div class="desk-mode"><span id="lab-current">Mi página</span><button type="button" id="lab-return" hidden>Volver a mi página</button></div>'+workspace+'</div></div>';
  }
  function mount({root,area,run,read,save,initial,icon,example,closeExample}) {
    const get = id => root.querySelector('#'+id);
    const panel=get('lib-browser'),query=get('lib-q'),family=get('lib-family'),group=get('lib-group'),list=get('lib-list'),detail=get('lib-card');
    const pageButton=get('lab-return'),status=get('lab-status');
    const saved=read(uiStorage,{}) || {};
    const memory=new Map([[personal,area.value]]);
    let active=null,selected=lookup.get(saved.selected)||cards[0];
    let visible=[];
    if(Object.hasOwn(labels,saved.family)) family.value=saved.family;
    query.value=typeof saved.query==='string'?saved.query:'';
    const compact=()=>matchMedia('(max-width: 740px)').matches;
    panel.open=!compact();
    function persist(){save(uiStorage,{family:family.value,group:group.value,query:query.value,selected:selected?.id,active:active?.id});}
    function topics(value='') {
      const pool=cards.filter(card=>!family.value||card.family===family.value);
      const topics=[...new Set(pool.map(card=>card.group))].sort((a,b)=>a.localeCompare(b,'es'));
      group.innerHTML='<option value="">Todos los temas</option>'+topics.map(t=>'<option value="'+esc(t)+'">'+esc(t)+'</option>').join('');
      group.value=topics.includes(value)?value:'';
    }
    function drawDetail() {
      if(!selected){detail.innerHTML='<h2>Sin coincidencias</h2><p>Prueba con otra palabra o amplía los filtros.</p><button type="button" class="btn small" data-do="clear">Limpiar búsqueda y filtros</button>';return;}
      const c=selected;
      detail.innerHTML='<div class="lib-breadcrumb">'+esc(labels[c.family])+' <span>/</span> '+esc(c.group)+'</div>'+
        '<div class="lib-card-title"><code>'+esc(c.term)+'</code><h2>'+esc(c.title)+'</h2></div><p>'+esc(c.description)+'</p>'+
        '<div class="lib-sample"><pre aria-label="Plantilla con un hueco"><code>'+highlight(c.pattern)+'</code></pre></div>'+
        '<p class="lib-task"><strong>Tu turno.</strong> '+esc(c.task)+'</p>'+
        '<div class="lib-actions"><button type="button" class="btn dark small" data-do="practice">'+icon('code')+' Practicar en el editor</button>'+
        '<button type="button" class="btn small" data-do="hint" aria-controls="lib-hint" aria-expanded="false">'+icon('bulb')+' Ver pista</button>'+
        '<button type="button" class="lib-plain" data-do="example" aria-controls="lib-example" aria-expanded="false">Ver ejemplo resuelto</button></div>'+
        '<div id="lib-hint" class="lib-hint" hidden><p>'+esc(c.hint)+'</p><p>'+esc(familyTip[c.family])+'</p></div>'+
        '<div id="lib-example" class="lib-example" hidden><pre><code>'+esc(snippet(c,true))+'</code></pre><div><button type="button" class="lib-plain" data-do="copy">Copiar ejemplo</button> <a target="_blank" rel="noopener" href="'+esc(c.source)+'">Ver documentación '+icon('external')+'</a></div><p class="copy-status" role="status"></p></div>';
    }
    function drawList() {
      const terms=norm(query.value.trim()).split(/\s+/).filter(Boolean);
      visible=cards.filter(c=>(!family.value||c.family===family.value)&&(!group.value||c.group===group.value)&&terms.every(t=>library.get(c.id).includes(t)));
      if(!visible.includes(selected)) selected=visible[0]||null;
      get('lib-count').textContent=visible.length===1?'1 ficha':visible.length+' fichas';
      list.innerHTML=visible.map(c=>'<button type="button" data-entry="'+esc(c.id)+'" aria-pressed="'+(c===selected)+'"><span class="lib-glyph glyph-'+c.family.toLowerCase()+'" aria-hidden="true">'+esc(groupSymbol[c.family])+'</span><span><code>'+esc(c.term)+'</code><small>'+esc(c.title)+'</small></span></button>').join('');
      drawDetail();
    }
    function switchEditor(card, focus=false) {
      memory.set(area.dataset.draftKey||personal,area.value);
      if(active===example&&example&&card!==example)closeExample();
      active=card;
      const key=card?keyFor(card):personal;
      area.dataset.draftKey=key;
      const fallback=card?.code??(card?snippet(card,false):initial);
      area.value=memory.has(key)?memory.get(key):read(key,fallback);
      memory.set(key,area.value);
      get('lab-current').textContent=card?(card.code?'Referencia · ':'Práctica · ')+card.term:'Mi página';
      pageButton.hidden=!card;
      status.textContent=card?'Esta práctica tiene su propio borrador.':'Tu borrador se guarda en este navegador.';
      run();
      if(focus){
        const pos=card?area.value.indexOf(blank):-1;
        if(pos>=0)area.setSelectionRange(pos,pos+blank.length);
        area.focus();
        area.scrollIntoView({block:'nearest'});
      }
      persist();
    }
    area.addEventListener('input',()=>memory.set(area.dataset.draftKey||personal,area.value));
    pageButton.onclick=()=>switchEditor(null,true);
    list.addEventListener('click',e=>{
      const button=e.target.closest('[data-entry]');if(!button)return;
      selected=lookup.get(button.dataset.entry);
      for(const item of list.querySelectorAll('[data-entry]'))item.setAttribute('aria-pressed',String(item===button));
      drawDetail();persist();
      if(compact()){panel.open=false;detail.querySelector('h2').tabIndex=-1;detail.querySelector('h2').focus({preventScroll:true});detail.scrollIntoView({block:'nearest'});}
    });
    const refresh=()=>{drawList();list.scrollTop=0;persist();};
    family.onchange=()=>{topics();refresh();};group.onchange=refresh;query.oninput=refresh;
    detail.addEventListener('click',async e=>{
      const b=e.target.closest('[data-do]');if(!b)return;
      const action=b.dataset.do;
      if(action==='clear'){query.value='';family.value='';topics();refresh();return;}
      if(action==='practice'){switchEditor(selected,true);return;}
      if(action==='copy'){
        const message=detail.querySelector('.copy-status');
        try{await navigator.clipboard.writeText(snippet(selected,true));message.textContent='Ejemplo copiado.';}
        catch{const range=document.createRange();range.selectNodeContents(detail.querySelector('#lib-example code'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);message.textContent='Código seleccionado. Usa la opción Copiar de tu navegador.';}
        return;
      }
      const target=get(action==='hint'?'lib-hint':'lib-example');
      target.hidden=!target.hidden;b.setAttribute('aria-expanded',String(!target.hidden));
      b.textContent=action==='hint'?(target.hidden?'Ver pista':'Ocultar pista'):(target.hidden?'Ver ejemplo resuelto':'Ocultar ejemplo');
    });
    topics(saved.group);drawList();
    if(example){
      switchEditor(example);
      detail.innerHTML='<div class="lib-card-title"><h2>'+esc(example.term)+'</h2></div>'+
        '<p>Modifica el ejemplo y observa el resultado en la vista previa.</p>'+
        '<div class="lib-actions"><a class="btn small" href="#referencia">Volver a Referencia</a></div>';
    }
    else if(lookup.has(saved.active))switchEditor(lookup.get(saved.active));
  }
  function exportPractice(code) {
    const doc=new DOMParser().parseFromString(code,'text/html');
    if(!doc.documentElement.lang)doc.documentElement.lang='es';
    if(!doc.querySelector('meta[charset]')){
      const charset=doc.createElement('meta');charset.setAttribute('charset','utf-8');doc.head.prepend(charset);
    }
    if(!doc.title)doc.title='Práctica de EtiquetaLab';
    const base=new URL('./',location.href);
    for(const tag of doc.querySelectorAll('[src],[href],[srcset]')){
      for(const attr of ['src','href','srcset']){
        const value=tag.getAttribute(attr);
        if(value?.startsWith('assets/')&&!/[\s,]/.test(value))tag.setAttribute(attr,new URL(value,base).href);
      }
    }
    return '<!doctype html>\n'+doc.documentElement.outerHTML;
  }
  window.BibliotecaLab=Object.freeze({layout,mount,exportPractice});
})();
