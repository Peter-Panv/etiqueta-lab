(() => {
  'use strict';

  const bs = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/';
  const cssLink = '<link rel="stylesheet" href="'+bs+'css/bootstrap.min.css">';
  const bundle = '<script src="'+bs+'js/bootstrap.bundle.min.js"></script>';
  const indent = (text, spaces=2) => text.split('\n').map(line=>line ? ' '.repeat(spaces)+line : line).join('\n');
  const htmlSource = tag => 'https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/'+tag;
  const bsSource = path => 'https://getbootstrap.com/docs/5.3/'+path;
  const structures = [
    {
      id:'nav-html', label:'Menú HTML', title:'Navegación con enlaces', family:'HTML',
      intro:'Empieza con un menú que funciona solo con HTML. Los enlaces llevan a secciones de la misma página.',
      steps:[
        ['<nav>','Agrupa los enlaces importantes. aria-label da nombre al menú cuando alguien navega con un lector de pantalla.'],
        ['<ul> → <li> → <a>','La lista contiene un elemento por opción. En cada <li> va el enlace que la persona puede pulsar.'],
        ['href="#cursos" → id="cursos"','El enlace apunta al id de la sección. El signo # se escribe en href. Escribe el id una sola vez en la página.']
      ],
      checks:'Pulsa «Cursos» para saltar a la sección que tiene id="cursos".',
      markup:'<nav aria-label="Principal">\n  <ul>\n    <li><a href="#inicio">Inicio</a></li>\n    <li><a href="#cursos">Cursos</a></li>\n  </ul>\n</nav>\n\n<main>\n  <h1 id="inicio">Mi escuela virtual</h1>\n  <p>Elige un curso y practica a tu ritmo.</p>\n  <section id="cursos">\n    <h2>Cursos</h2>\n    <p>HTML desde cero.</p>\n  </section>\n</main>',
      related:['HTML|<nav>','HTML|<a>','HTML|id','HTML|href'],
      source:htmlSource('nav')
    },
    {
      id:'nav-bootstrap', label:'Navbar de Bootstrap', title:'Navbar adaptable con menú plegable', family:'Bootstrap',
      intro:'Esta barra combina HTML para organizar los enlaces, CSS de Bootstrap para el diseño y su paquete JavaScript para abrir y cerrar el menú.',
      steps:[
        ['CSS en <head> · JavaScript al final de <body>','La hoja de estilos da apariencia y controla el cambio de ancho. El paquete bootstrap.bundle.min.js hace funcionar el botón. Abre «Ver documento completo» para ver dónde va cada recurso.'],
        ['.navbar → .container-fluid','Pon navbar en <nav>. El contenedor interno organiza la marca, el botón y el panel. navbar-expand-sm muestra los enlaces desde 576 px.'],
        ['.navbar-toggler → #menu-principal','Crea un <button>. data-bs-toggle="collapse" activa el plegado. data-bs-target="#menu-principal" y aria-controls="menu-principal" apuntan al id del panel.'],
        ['.collapse.navbar-collapse → .navbar-nav → .nav-item → .nav-link','El panel agrupa los enlaces. Coloca navbar-nav en <ul>, nav-item en cada <li> y nav-link en cada <a>.']
      ],
      checks:'En «Estrecha», pulsa «Abrir o cerrar menú» y comprueba que aparecen los enlaces. En «Amplia», los enlaces aparecen directamente.',
      width:true,
      height:235,
      bundle:true,
      markup:'<nav class="navbar navbar-expand-sm bg-body-tertiary" aria-label="Principal">\n  <div class="container-fluid">\n    <a class="navbar-brand" href="#inicio">Mi escuela</a>\n\n    <button class="navbar-toggler" type="button"\n      data-bs-toggle="collapse" data-bs-target="#menu-principal"\n      aria-controls="menu-principal" aria-expanded="false"\n      aria-label="Abrir o cerrar menú">\n      <span class="navbar-toggler-icon"></span>\n    </button>\n\n    <div class="collapse navbar-collapse" id="menu-principal">\n      <ul class="navbar-nav">\n        <li class="nav-item"><a class="nav-link" href="#inicio">Inicio</a></li>\n        <li class="nav-item"><a class="nav-link" href="#cursos">Cursos</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>\n\n<main class="container-fluid py-3">\n  <h1 class="h4" id="inicio">Mi escuela virtual</h1>\n  <h2 class="h6" id="cursos">Cursos</h2>\n  <p>HTML desde cero.</p>\n</main>',
      related:['Bootstrap|.navbar','Bootstrap|.collapse / data-bs-toggle','HTML|<nav>','HTML|<button>'],
      source:bsSource('components/navbar/')
    },
    {
      id:'lista', label:'Listas', title:'Listas y listas anidadas', family:'HTML',
      intro:'Usa <ul> para agrupar opciones sin orden y <ol> para una secuencia de pasos.',
      steps:[
        ['<ol> / <ul>','Elige una lista numerada o con viñetas según si importa el orden.'],
        ['<li>','Pon cada elemento en su propio <li> dentro de la lista.'],
        ['<li> → <ul> → <li>','Para una lista anidada, colócala dentro del <li> al que pertenece.']
      ],
      checks:'Observa los números de los pasos y las viñetas de los archivos.',
      markup:'<ol>\n  <li>Abre tu editor.</li>\n  <li>Crea los archivos del proyecto.\n    <ul>\n      <li>index.html</li>\n      <li>estilo.css</li>\n    </ul>\n  </li>\n  <li>Abre index.html en el navegador.</li>\n</ol>',
      related:['HTML|<ul>','HTML|<ol>','HTML|<li>'],
      source:htmlSource('li')
    },
    {
      id:'formulario', label:'Formularios', title:'Formulario, etiquetas y validación', family:'HTML',
      intro:'Un formulario agrupa los campos y el botón. Primero revisa la validación del navegador. El script del ejemplo solo muestra una confirmación local.',
      steps:[
        ['<form> → <button type="submit">','Coloca los controles dentro del formulario. Al pulsar Enviar, se inicia la validación.'],
        ['<label for="correo"> → <input id="correo">','Al pulsar la etiqueta, se enfoca el campo con el mismo id. El atributo name identifica el dato al enviarlo.'],
        ['type="email" · required','Elige el tipo de dato y exige completarlo. Para un envío real, configura action y method y prepara el servidor que recibirá los datos.']
      ],
      checks:'Pulsa «Enviar» con el campo vacío. Luego escribe un correo de ejemplo, como nombre@example.com, y vuelve a pulsarlo.',
      markup:'<form id="registro">\n  <label for="correo">Correo electrónico</label>\n  <input id="correo" name="correo" type="email" required>\n  <button type="submit">Enviar</button>\n</form>\n<p id="estado" role="status"></p>\n\n<script>\n  document.querySelector("#registro").addEventListener("submit", (evento) => {\n    evento.preventDefault();\n    document.querySelector("#estado").textContent = "Correo válido. Prueba completada.";\n  });\n</script>',
      related:['HTML|<form>','HTML|<label>','HTML|<input>','HTML|<button>'],
      source:htmlSource('form')
    },
    {
      id:'tabla', label:'Tablas', title:'Tabla con encabezados y datos', family:'HTML',
      intro:'Parte de una tabla de inventario. Cada fila agrupa celdas y cada encabezado explica qué significa su columna.',
      steps:[
        ['<table> → <caption>','Abre la tabla y ponle un título visible.'],
        ['<thead> → <tr> → <th scope="col">','Agrupa la fila de encabezados. scope="col" relaciona cada encabezado con su columna.'],
        ['<tbody> → <tr> → <td>','Agrupa las filas de datos. Mantén el mismo orden de columnas en cada fila.']
      ],
      checks:'Lee cada fila de izquierda a derecha. El segundo dato de cada fila corresponde a «Unidades».',
      markup:'<style>\n  th, td { padding: 6px 14px; border: 1px solid #8ca99a; }\n  table { border-collapse: collapse; }\n  caption { margin-bottom: 8px; }\n</style>\n<table>\n  <caption>Inventario del taller</caption>\n  <thead>\n    <tr><th scope="col">Producto</th><th scope="col">Unidades</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Cuaderno</td><td>12</td></tr>\n    <tr><td>Lápiz</td><td>24</td></tr>\n  </tbody>\n</table>',
      related:['HTML|<table>','HTML|<tr>','HTML|<th>','HTML|<td>'],
      source:htmlSource('table')
    },
    {
      id:'imagen', label:'Imágenes adaptables', title:'Imágenes con <picture>', family:'HTML',
      intro:'Una misma foto puede tener un encuadre amplio y otro cercano. El navegador elige el recurso según el ancho de la vista.',
      steps:[
        ['<picture> → <source>','Coloca primero las variantes. media limita cuándo se usa una variante y srcset indica su archivo.'],
        ['<img src="…" alt="…">','Coloca una imagen al final. Su src sirve de respaldo y su alt describe el contenido en ambas variantes.']
      ],
      checks:'Cambia entre «Estrecha» y «Amplia» para ver el recorte de cerca y el panorama.',
      width:true,height:240,
      markup:'<picture>\n  <source media="(max-width: 480px)" srcset="assets/paisaje-cerca.svg">\n  <img src="assets/paisaje.svg" alt="Río entre montañas verdes">\n</picture>',
      related:['HTML|<picture>','HTML|<source>','HTML|<img>'],
      source:htmlSource('picture')
    },
    {
      id:'detalles', label:'Desplegables', title:'Sección desplegable con <details>', family:'HTML',
      intro:'Puedes mostrar y ocultar una respuesta con el comportamiento nativo del navegador.',
      steps:[
        ['<details>','Agrupa la pregunta y su respuesta. El atributo open hace que empiece abierto.'],
        ['<summary>','Ponlo como primer hijo. Es el título que el usuario pulsa.'],
        ['Contenido después de <summary>','Agrega un párrafo, lista u otro contenido que aparezca al expandir.']
      ],
      checks:'Pulsa la pregunta en el ejemplo para abrirla y cerrarla.',
      markup:'<details>\n  <summary>¿Qué necesito para empezar?</summary>\n  <p>Un editor de texto y un navegador.</p>\n</details>',
      related:['HTML|<details>','HTML|<summary>'],
      source:htmlSource('details')
    },
    {
      id:'rejilla', label:'Cuadrícula de Bootstrap', title:'Cuadrícula adaptable de Bootstrap', family:'Bootstrap',
      intro:'Esta estructura organiza tarjetas en filas. Solo necesitas la hoja de estilos de Bootstrap.',
      steps:[
        ['.container → .row','El contenedor enmarca el diseño y row agrupa las columnas. La clase g-2 ajusta la separación.'],
        ['.col-12 .col-sm-6','Cada columna ocupa toda la fila al inicio y la mitad desde 576 px. Añade tus tarjetas dentro de las columnas.']
      ],
      checks:'Cambia el ancho de la vista. Las dos tarjetas se apilan en «Estrecha» y comparten una fila en «Amplia».',
      width:true,height:185,
      markup:'<div class="container py-2">\n  <div class="row g-2">\n    <div class="col-12 col-sm-6">\n      <article class="p-3 bg-primary-subtle">Curso de HTML</article>\n    </div>\n    <div class="col-12 col-sm-6">\n      <article class="p-3 bg-success-subtle">Curso de CSS</article>\n    </div>\n  </div>\n</div>',
      related:['Bootstrap|.container / .row / .col-*','Bootstrap|.g-* / .gx-* / .gy-*'],
      source:bsSource('layout/grid/')
    }
  ];
  function documentFor(structure) {
    const head = structure.family==='Bootstrap' ? '\n  '+cssLink : '';
    const script = structure.bundle ? '\n\n  '+bundle : '';
    return '<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>'+structure.title.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</title>'+head+
      '\n</head>\n<body>\n'+indent(structure.markup)+script+'\n</body>\n</html>';
  }
  const guide=window.REFERENCIA_GUIA;
  const byStructure=new Map(structures.map(structure=>[structure.id,structure]));
  const exampleNav=byStructure.get('nav-bootstrap');
  guide.entries.push({
    family:'Bootstrap',group:'Componentes',term:'.navbar',
    description:'Barra de navegación adaptable con marca, enlaces y un menú plegable. Sus clases funcionan juntas.',
    syntax:'<nav class="navbar navbar-expand-sm">…</nav>',
    options:[
      ['navbar-expand-sm | navbar-expand-md | navbar-expand-lg','Muestra los enlaces desde 576, 768 o 992 px. Por debajo se usa el botón.'],
      ['navbar-toggler · data-bs-target · aria-controls','El botón apunta al id del panel plegable. Carga el JavaScript de Bootstrap para que funcione.'],
      ['collapse navbar-collapse · navbar-nav · nav-item · nav-link','Contenedor plegable, lista de enlaces, elementos de la lista y enlaces.'],
      ['navbar-brand · container-fluid','Estilo de marca y contenedor de ancho completo.']
    ],
    source:exampleNav.source,structure:exampleNav.id
  });
  const contextualGroups = {
    'nav-html':['HTML|<nav>','HTML|<a>','HTML|href','HTML|id'],
    lista:['HTML|<ul>','HTML|<ol>','HTML|<li>'],
    formulario:['HTML|<form>','HTML|<label>','HTML|<input>','HTML|<button>','HTML|<fieldset>','HTML|<legend>','HTML|<select>','HTML|<option>','HTML|<textarea>','HTML|for','HTML|required'],
    tabla:['HTML|<table>','HTML|<caption>','HTML|<thead>','HTML|<tbody>','HTML|<tr>','HTML|<th>','HTML|<td>'],
    imagen:['HTML|<img>','HTML|<picture>','HTML|<source>'],
    detalles:['HTML|<details>','HTML|<summary>'],
    rejilla:['Bootstrap|.container / .row / .col-*','Bootstrap|.row','Bootstrap|.col-6','Bootstrap|.g-* / .gx-* / .gy-*'],
    'nav-bootstrap':['Bootstrap|.collapse / data-bs-toggle']
  };
  const structuredEntries=new Map(Object.entries(contextualGroups).flatMap(([id,keys])=>keys.map(key=>[key,id])));
  const needsContext = {
    'HTML|<tr>':'Coloca la fila dentro de <thead>, <tbody> o <tfoot>. Admite <th> y <td>.',
    'HTML|<th>':'Va dentro de <tr> y da nombre a otras celdas.',
    'HTML|<td>':'Va dentro de <tr>. Su posición indica a qué columna pertenece.',
    'HTML|<thead>':'Va dentro de <table> y agrupa filas <tr>.',
    'HTML|<tbody>':'Va dentro de <table> y agrupa filas <tr>.',
    'HTML|<li>':'Ponlo dentro de <ul>, <ol> o <menu>.',
    'HTML|<source>':'Dentro de <picture>, pon las alternativas <source> antes de <img>. También se usa como hijo de <audio> y <video>.',
    'HTML|<option>':'Ponlo dentro de <select>, <optgroup> o <datalist>, según el tipo de control.',
    'HTML|<legend>':'Va como primer hijo de <fieldset>.',
    'HTML|<summary>':'Va como primer hijo de <details>. Es el control que abre y cierra el bloque.',
    'HTML|<label>':'Vincúlalo con un campo. for debe coincidir con el id del control, o bien pon el control dentro de <label>.',
    'Bootstrap|.row':'Úsala dentro de un contenedor. Coloca las clases col-* en sus hijos directos.',
    'Bootstrap|.col-6':'Colócala en un hijo directo de .row. La columna ocupa la mitad del ancho.',
    'Bootstrap|.navbar':'Necesitas el contenedor, el botón conectado al panel, la lista de enlaces y el CSS y JavaScript de Bootstrap.'
  };
  for(const entry of guide.entries){
    const key=entry.family+'|'+entry.term;
    entry.structure ||= structuredEntries.get(key);
    entry.context = needsContext[key];
  }
  window.GuiaEstructuras=Object.freeze({structures,byStructure,documentFor});
})();
