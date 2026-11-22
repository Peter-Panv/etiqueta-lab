(() => {
  'use strict';
  const {entries,topics,familyGroups}=window.REFERENCIA_GUIA;
  const bsBase='https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/';
  const htmlEscape=text=>String(text).replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  const normalize=text=>text.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const key=entry=>entry.family+'|'+entry.term;
  const entryIndex=new Map(entries.map(entry=>[key(entry),entry]));
  const searchIndex=new Map(entries.map(entry=>[
    entry,normalize([entry.family,entry.term,entry.group,entry.description,entry.syntax,entry.options.flat().join(' ')].join(' '))
  ]));
  const languages={...familyGroups, '':'Todos'};
  const order=['','HTML','CSS','Bootstrap','JavaScript','Java'];
  const topicWidth='min-height:105px';
  const topicWord='Contenido';
  const styleBlock=rules=>'<style>\n'+rules+'\n</style>';
  const link=()=>'<link rel="stylesheet" href="'+bsBase+'css/bootstrap.min.css">\n\n';
  function topicCode(topic,tech,i){
    const [,css,bs]=topic.choices[i];
    if(tech==='Bootstrap'){
      if(topic.id==='texto')return '<p class="border p-2 '+bs+'">Texto de ejemplo</p>';
      const base=topic.id==='posicion'?'position-relative':bs;
      const item=topic.id==='posicion'?' position-absolute '+bs:'';
      return '<div class="'+base+' border bg-light" style="'+topicWidth+'">\n  <span class="badge text-bg-success'+item+'">'+topicWord+'</span>\n</div>';
    }
    if(topic.id==='texto'){
      return styleBlock('p {\n  border: 1px solid #91a99b;\n  padding: .5rem;\n  '+css+'\n}')+'\n<p>Texto de ejemplo</p>';
    }
    const common='.zona {\n  min-height: 105px;\n  border: 1px solid #91a99b;\n  background: #edf7ef;\n  ';
    const piece='.pieza {\n  background: #246147;\n  color: white;\n  padding: .35rem .6rem;\n  border-radius: .25rem;';
    const rules=topic.id==='posicion'?common+'position: relative;\n}\n'+piece+'\n  position: absolute;\n  '+css+'\n}':common+css+'\n}\n'+piece+'\n}';
    return styleBlock(rules)+'\n<div class="zona">\n  <span class="pieza">'+topicWord+'</span>\n</div>';
  }
  function sample(entry){
    if(!entry.demo)return null;
    const before=entry.family==='Bootstrap'?link():'';
    const after=entry.script?'\n<script src="'+bsBase+'js/bootstrap.bundle.min.js"></script>':'';
    return before+entry.demo+after;
  }
  const labLink=id=>'#laboratorio/referencia/'+encodeURIComponent(id);
  function example(id) {
    const entry=entryIndex.get(id);
    if(entry?.demo)return {id:'ref:'+id,term:entry.term,code:sample(entry)};
    const [kind,name,tech,value]=id.split('|');
    const topic=topics.find(t=>t.id===name);
    const i=Number(value);
    if(kind==='tema'&&topic&&['CSS','Bootstrap'].includes(tech)&&value!==''&&topic.choices[i]){
      return {id:'ref:'+id,term:topic.title+' · '+topic.choices[i][0],code:(tech==='Bootstrap'?link():'')+topicCode(topic,tech,i)};
    }
    return null;
  }
  const snippet=text=>'<pre class="ref-code"><code>'+htmlEscape(text)+'</code></pre>';
  const frame=title=>'<iframe class="ref-frame" title="'+htmlEscape(title)+'" sandbox="allow-scripts allow-forms" referrerpolicy="no-referrer"></iframe>';
  function layout(){
    return '<section class="ref-try panel" aria-labelledby="ref-try-title"><div class="ref-demo-top"><div><h2 id="ref-try-title">Centrar, alinear y posicionar</h2><p>Elige una opción para ver qué código cambia y cómo se mueve el contenido.</p></div>'+
      '<label for="ref-engine">Tecnología<select id="ref-engine"><option>CSS</option><option>Bootstrap</option></select></label></div>'+
      '<div id="ref-topics" class="ref-topic-tabs">'+topics.map((t,i)=>'<button class="filter" aria-pressed="'+String(i===0)+'" type="button" data-topic="'+t.id+'">'+t.title+'</button>').join('')+'</div><div id="ref-topic"></div></section>'+
      '<section class="ref-catalog" aria-labelledby="catalog-title"><h2 id="catalog-title" class="block-title">Sintaxis y valores</h2>'+
      '<div class="ref-tech filters" aria-label="Tecnología del catálogo">'+order.map(f=>'<button class="filter" type="button" data-family="'+f+'" aria-pressed="'+String(!f)+'">'+languages[f]+'</button>').join('')+'</div>'+
      '<div class="ref-controls"><label for="ref-search">Buscar etiquetas, propiedades o clases<input id="ref-search" type="search" placeholder="Ej. top, centrar, btn-primary" autocomplete="off"></label>'+
      '<label for="ref-category">Tema<select id="ref-category"></select></label></div>'+
      '<p id="ref-count" class="ref-count" role="status"></p><div id="ref-items" class="ref-list"></div>'+
      '<button type="button" class="btn ref-more" id="ref-more">Mostrar más fichas</button></section>';
  }
  function card(entry){
    const index=entries.indexOf(entry);
    const note=entry.family==='Java'?'<p class="ref-note">Ejecuta el código con el JDK en una terminal o en tu IDE.</p>':'';
    const action=entry.demo?'<button type="button" class="btn small" data-demo="'+index+'" aria-expanded="false">Probar aquí</button>'+
        '<a class="btn small" href="'+labLink(key(entry))+'">Abrir en laboratorio</a>':'';
    return '<article class="panel ref-entry"><p class="ref-meta">'+htmlEscape(languages[entry.family])+' / '+htmlEscape(entry.group)+'</p>'+
      '<h3><code>'+htmlEscape(entry.term)+'</code></h3><p>'+htmlEscape(entry.description)+'</p>'+
      snippet(entry.syntax)+'<details><summary>Opciones de uso <span>'+entry.options.length+'</span></summary><dl>'+
      entry.options.map(([value,meaning])=>'<div><dt><code>'+htmlEscape(value)+'</code></dt><dd>'+htmlEscape(meaning)+'</dd></div>').join('')+
      '</dl></details>'+note+'<div class="ref-entry-actions">'+action+'<a href="'+htmlEscape(entry.source)+'" target="_blank" rel="noopener">Documentación oficial</a></div>'+
      (entry.demo?'<div class="ref-inline" hidden></div>':'')+'</article>';
  }
  function mount(root){
    const get=id=>root.querySelector('#'+id);
    const engine=get('ref-engine'),topicView=get('ref-topic'),topicButtons=get('ref-topics');
    const groups=get('ref-category'),query=get('ref-search'),catalog=get('ref-items'),more=get('ref-more');
    const tabs=[...root.querySelectorAll('[data-family]')];
    let topic=topics[0],choice=1,active='',pageSize=16,limit=pageSize,matches=[];
    function setFrame(el, code){el.srcdoc=window.EtiquetaMotor.previewDocument(code);}
    function drawTopic(){
      const tech=engine.value;
      topicView.innerHTML='<p class="ref-topic-caption">'+htmlEscape(topic.description)+'</p>'+
        '<div class="ref-choices"><label for="ref-variant">Resultado</label><select id="ref-variant">'+topic.choices.map(([name],i)=>'<option value="'+i+'"'+(i===choice?' selected':'')+'>'+htmlEscape(name)+'</option>').join('')+'</select></div>'+
        '<div class="ref-demo-grid"><div class="ref-demo-result"><p>Vista previa</p>'+frame('Vista previa de '+topic.title)+'</div>'+
        '<div><p class="ref-demo-label">Código</p>'+snippet(topicCode(topic,tech,choice))+'</div></div>'+
        '<div class="ref-entry-actions"><a class="btn small dark" href="'+labLink('tema|'+topic.id+'|'+tech+'|'+choice)+'">Abrir en laboratorio</a>'+
        '<button type="button" class="btn small" id="ref-related">Ver opciones de '+htmlEscape(tech)+'</button></div>';
      setFrame(topicView.querySelector('iframe'),example('tema|'+topic.id+'|'+tech+'|'+choice).code);
      get('ref-variant').onchange=e=>{
        choice=Number(e.target.value);drawTopic();get('ref-variant').focus();
      };
      get('ref-related').onclick=()=>{
        query.value='';setFamily(tech,topic.group);
        const title=get('catalog-title');title.tabIndex=-1;title.focus();title.scrollIntoView({block:'start'});
      };
    }
    engine.onchange=drawTopic;
    topicButtons.onclick=e=>{
      const button=e.target.closest('[data-topic]');if(!button||button.dataset.topic===topic.id)return;
      topic=topics.find(item=>item.id===button.dataset.topic);
      choice=topic.id==='posicion'?0:1;
      for(const t of topicButtons.querySelectorAll('button'))t.setAttribute('aria-pressed',String(t===button));
      drawTopic();
    };
    function setFamily(family,group=''){
      active=family;
      for(const t of tabs)t.setAttribute('aria-pressed',String(t.dataset.family===family));
      const values=[...new Set(entries.filter(entry=>!active||entry.family===active).map(entry=>entry.group))].sort((a,b)=>a.localeCompare(b,'es'));
      groups.innerHTML='<option value="">Todos los temas</option>'+values.map(g=>'<option>'+htmlEscape(g)+'</option>').join('');
      groups.value=values.includes(group)?group:'';
      refresh();
    }
    function refresh(){
      limit=pageSize;
      const typed=normalize(query.value.trim());
      const terms=typed.split(/\s+/).filter(Boolean);
      matches=entries.filter(entry=>(!active||entry.family===active)&&(!groups.value||entry.group===groups.value)&&terms.every(word=>searchIndex.get(entry).includes(word)));
      if(typed)matches.sort((a,b)=>rank(a,typed)-rank(b,typed));
      catalog.innerHTML=matches.length?matches.slice(0,limit).map(card).join(''):'<p class="panel ref-empty">No encontramos coincidencias. Prueba con otro término o tema.</p>';
      count();
    }
    function rank(entry,typed){
      const term=normalize(entry.term);
      if(term===typed||term==='<'+typed+'>'||term==='.'+typed)return 0;
      return term.includes(typed)?1:2;
    }
    function count(){
      get('ref-count').textContent=matches.length===1?'1 ficha':matches.length+' fichas';
      more.hidden=matches.length<=limit;
    }
    more.onclick=()=>{
      const previous=limit;limit+=pageSize;
      catalog.insertAdjacentHTML('beforeend',matches.slice(previous,limit).map(card).join(''));
      count();
      const first=catalog.children[previous]?.querySelector('h3');
      if(first){first.tabIndex=-1;first.focus();}
    };
    catalog.onclick=e=>{
      const button=e.target.closest('[data-demo]');if(!button)return;
      const demo=button.closest('article').querySelector('.ref-inline');
      const open=demo.hidden;
      button.textContent=open?'Ocultar vista previa':'Probar aquí';
      button.setAttribute('aria-expanded',String(open));demo.hidden=!open;
      if(open){
        const entry=entries[Number(button.dataset.demo)];
        demo.innerHTML=frame('Ejemplo de '+entry.term);
        setFrame(demo.querySelector('iframe'),sample(entry));
      }else{demo.replaceChildren();}
    };
    tabs.forEach(button=>button.onclick=()=>setFamily(button.dataset.family));
    query.oninput=refresh;groups.onchange=refresh;
    drawTopic();setFamily('');
  }
  window.GuiaReferencia=Object.freeze({layout,mount,example});
})();
