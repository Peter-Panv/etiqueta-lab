(() => {
  'use strict';
  const mdn = 'https://developer.mozilla.org/en-US/docs/';
  const bootstrap = 'https://getbootstrap.com/docs/5.3/';
  const java = 'https://dev.java/learn/';
  // Cada opción indica cuándo funciona y, en lo posible, qué valor se puede usar.
  const htmlOptions = {
    html:[['lang="es"','Declara el idioma. Usa en para inglés o es-HN si importa la variante regional.'],['dir="ltr | rtl | auto"','De izquierda a derecha, de derecha a izquierda o deducida del texto.']],
    head:[['<title>','Nombre de la pestaña.'],['<meta>','Codificación, descripción y configuración móvil.'],['<link> / <style>','Hojas externas o reglas CSS incluidas.']],
    title:[['Texto del título','Escribe un título específico para cada página. Solo admite texto.']],
    meta:[['charset="utf-8"','Codificación del documento.'],['name="viewport" content="width=device-width, initial-scale=1"','Ajusta la vista al ancho del dispositivo.'],['name="description" content="…"','Resume el contenido de la página.']],
    link:[['rel="stylesheet | icon | preload"','Define la relación con una hoja de estilos, icono o recurso que se debe cargar antes.'],['href="estilo.css"','Ubicación del recurso.'],['media="(min-width: 768px)"','Aplica la hoja cuando se cumple la condición.']],
    body:[['class / id','Permiten identificar o estilizar el contenido visible.'],['style','Acepta declaraciones CSS como margin: 0. Para varias reglas, usa una hoja CSS.']],
    style:[['media="print"','Aplica las reglas solo al imprimir.'],['selector { propiedad: valor; }','Define qué elementos reciben cada estilo.']],
    script:[['src="app.js"','Carga código de un archivo.'],['defer','Ejecuta un script clásico externo después de leer el HTML y conserva el orden.'],['async','Ejecuta el script externo cuando termina de descargarse. El orden puede variar.'],['type="module"','Activa import y export. Los módulos se difieren de forma predeterminada.']],
    nav:[['aria-label="Principal"','Identifica la navegación cuando hay más de una.'],['<a href="#agenda">','Agrega un enlace a una sección o a otra página.']],
    section:[['aria-labelledby="horario-titulo"','Usa como nombre el texto del encabezado con ese id.'],['id="horario"','Habilita un destino para los enlaces a la sección.']],
    div:[['class="tarjeta"','Conecta la caja con el selector CSS .tarjeta.'],['display: flex | grid','Distribuye sus hijos por filas, columnas o cuadrícula mediante CSS.']],
    h1:[['<h1>…</h1> a <h6>…</h6>','El nivel indica la jerarquía. Usa CSS para ajustar tamaño, color y alineación.']],
    p:[['text-align: left | center | right','Alinea el texto. Configúralo con CSS.'],['line-height: 1.6','Controla la distancia entre líneas de texto.']],
    a:[['href="#horario | pagina.html | https://…"','Puede llevar a una sección, una ruta relativa o un sitio externo.'],['target="_self | _blank"','Abre en la pestaña actual o en una nueva.'],['rel="noopener"','Evita que la nueva pestaña acceda a la que la abrió.'],['download','Solicita descargar el recurso si se cumplen las restricciones del navegador.']],
    em:[['Contenido dentro de <em>','Coloca solo el fragmento que necesita énfasis. Admite clases y otros atributos globales.']],
    strong:[['Contenido dentro de <strong>','Marca el texto de especial importancia. Puedes modificar su aspecto con CSS.']],
    span:[['lang="en"','Indica un cambio de idioma dentro de una frase.'],['class="aviso"','Permite aplicar estilos solo al fragmento marcado.']],
    br:[['<br>','Salto de línea dentro de un texto. Es una etiqueta vacía, sin cierre.']],
    hr:[['<hr>','Separación temática. Usa border o margin en CSS para cambiar su apariencia.']],
    blockquote:[['cite="https://…"','Identifica la fuente de la cita con una URL. Añade una atribución visible en el texto.']],
    code:[['&lt; / &gt; / &amp;','Escribe literalmente los caracteres <, > y & en el HTML.'],['<pre><code>…</code></pre>','Combina ambos elementos para un bloque de código.']],
    pre:[['white-space: pre | pre-wrap','Conserva sangría. pre-wrap permite ajustar las líneas al ancho.']],
    time:[['datetime="2026-11-22"','Representa una fecha en formato año-mes-día.'],['datetime="15:30"','Representa una hora local.'],['datetime="PT30M"','Representa una duración de 30 minutos.']],
    ul:[['list-style-type: disc | circle | square | none','Cambia las viñetas con CSS.']],
    ol:[['type="1 | a | A | i | I"','Usa números, letras o números romanos.'],['start="4"','Comienza en el cuarto valor de la secuencia.'],['reversed','Invierte el orden de la numeración.']],
    li:[['value="5"','Dentro de ol, establece la numeración de esta entrada.']],
    dl:[['<dt> / <dd>','Usa dt para el término y dd para su descripción.']],
    table:[['<caption> / <thead> / <tbody> / <tfoot>','Organizan título, encabezados, datos y pie.'],['border-collapse: collapse | separate','Combina o separa los bordes de celdas con CSS.']],
    caption:[['caption-side: top | bottom','Coloca el título arriba o abajo de la tabla con CSS.']],
    thead:[['<tr> con <th scope="col">','Agrupa las filas que identifican las columnas.']],
    tbody:[['Uno o más <tr>','Cada fila puede contener celdas de datos o encabezados de fila.']],
    tr:[['<th> / <td>','Incluye encabezados o celdas de datos en la fila.']],
    th:[['scope="row | col | rowgroup | colgroup"','Indica a qué celdas da nombre el encabezado.'],['colspan / rowspan','Indica cuántas columnas o filas abarca.']],
    td:[['colspan="2" / rowspan="2"','Extiende una celda a dos columnas o dos filas.'],['headers="producto precio"','Asocia la celda con los ids de encabezados de una tabla compleja.']],
    img:[['src="foto.jpg"','Ruta al archivo.'],['alt="Paisaje" / alt=""','Describe la función de una imagen informativa. Usa un valor vacío para una decorativa.'],['width / height','Reserva espacio con dimensiones intrínsecas. Usa max-width: 100% en CSS para ajustarla.'],['loading="lazy | eager"','Retrasa la carga de una imagen fuera de pantalla o solicita cargarla de inmediato.'],['srcset / sizes','Ofrece versiones según resolución y ancho disponible.']],
    figure:[['<figcaption>','Coloca el pie como primer o último hijo de figure.']],
    figcaption:[['Texto o enlaces','Explica la figura. Usa text-align en CSS para alinear el pie.']],
    picture:[['<source media="(min-width: 800px)" srcset="grande.jpg">','Selecciona un recurso por ancho, tipo de archivo o resolución.'],['<img> final','Define la imagen de respaldo y su texto alternativo.']],
    source:[['srcset / media / type','Usa estos atributos dentro de picture.'],['src / type','Usa estos atributos para audio o video.']],
    audio:[['controls','Muestra controles de reproducción.'],['loop / muted','Repite o comienza silenciado.'],['preload="none | metadata | auto"','Sugiere cuánto descargar antes de reproducir.']],
    video:[['controls / muted / loop / playsinline','Muestra controles, silencia, repite o permite reproducir dentro de la página.'],['poster="portada.jpg"','Muestra una imagen antes de reproducir.'],['width / height','Indica las dimensiones en píxeles.'],['<track>','Agrega subtítulos u otras pistas de texto.']],
    track:[['kind="captions | subtitles | descriptions | chapters | metadata"','Declara el propósito de la pista.'],['src / srclang / label','Archivo WebVTT, idioma y nombre que aparece en el reproductor.'],['default','Propone esa pista como opción inicial si corresponde.']],
    iframe:[['src / srcdoc','Carga una URL o un fragmento HTML.'],['title','Describe el contenido del marco.'],['loading="lazy"','Puede retrasar la carga de marcos alejados del área visible.'],['sandbox','Restringe las capacidades del marco y permite habilitar las que necesites.']],
    form:[['method="get | post | dialog"','Usa GET para búsquedas, POST para enviar datos al servidor o dialog para cerrar un diálogo.'],['action="/buscar"','Define el destino del envío.'],['enctype="multipart/form-data"','Úsalo con POST para enviar archivos.'],['autocomplete="on | off"','Sugiere si se deben ofrecer datos previamente guardados.']],
    label:[['for="correo"','Vincula la etiqueta al control mediante su id.'],['<label>…<input>…</label>','También puedes colocar el control dentro de la etiqueta.']],
    input:[['type="text | email | password | number | date | checkbox | radio | file | range"','Elige el control y sus reglas básicas según el dato.'],['name / value','Identifican el dato y su valor.'],['required / disabled / readonly','Exige completarlo, deshabilita el control o deja su valor solo para lectura cuando se admite.'],['min / max / step','Delimitan números, rangos o fechas.'],['minlength / maxlength / pattern','Validan longitud y formato de tipos de entrada de texto compatibles.'],['checked / multiple / accept','Configura casillas o radios, selección múltiple o tipos de archivo, según el tipo.']],
    button:[['type="button | submit | reset"','Realiza una acción local, envía o restablece el formulario.'],['disabled','Impide activar el botón.'],['name / value','Identifican el botón que inició el envío del formulario.']],
    fieldset:[['disabled','Deshabilita los controles descendientes, con excepción de los que estén en su primer legend.'],['<legend>','Da nombre al grupo.']],
    legend:[['Primer hijo del fieldset','Describe con pocas palabras el propósito del grupo.']],
    select:[['name / required','Identifica el dato y puede exigir una elección.'],['multiple / size','Permite elegir varias opciones o cambia cuántas se ven.']],
    option:[['value="am"','Valor recibido al enviar.'],['selected / disabled','Preselecciona o deshabilita la opción.']],
    textarea:[['rows / cols','Indican el tamaño visible en líneas y caracteres.'],['name / required / maxlength','Identifican el dato y permiten validar contenido y longitud.'],['Texto entre las etiquetas','Valor inicial del campo.']],
    output:[['for="precio cantidad"','Relaciona el resultado con uno o más controles por id.'],['value','En JavaScript cambia el resultado mostrado.']],
    progress:[['max="10" / value="4"','Indica cuatro tareas completadas de diez. Para progreso indeterminado, omite value.']],
    details:[['open','Muestra el contenido al cargar.'],['name="preguntas"','Agrupa detalles que se abren de forma exclusiva en navegadores compatibles.']],
    summary:[['Primer hijo de <details>','Es el título interactivo del bloque.']],
    dialog:[['showModal() / show()','Abre el diálogo como modal o como no modal.'],['close() / <form method="dialog">','Cierra el diálogo.'],['aria-labelledby','Vincula el diálogo a su encabezado visible.']],
    template:[['.content.cloneNode(true)','Clona la estructura interna para insertarla con JavaScript.']],
    slot:[['name="titulo"','Recibe contenido con slot="titulo". El slot sin nombre recibe contenido sin asignación.'],['Texto dentro de <slot>','Sirve de respaldo cuando el componente no recibe contenido para la ranura.']]
  };
  const elements = window.REFERENCE.map(([group,term,description,example,slug]) => ({
    family:'HTML', group, term:'<'+term+'>', description, example,
    syntax:example, options:htmlOptions[term] || [
      ['id="seccion" / class="destacado"','Identifica el elemento para enlazarlo o aplicarle reglas CSS.'],
      ['lang="es" / title="Información adicional"','Define el idioma del contenido o añade información complementaria.']
    ],
    source:mdn+'Web/HTML/Reference/Elements/'+(slug||term)
  }));
  const cards = [...window.LAB_TAGS,...window.LAB_EXTRAS];
  const solved = card => card.pattern.replace(/⟦([^⟦⟧]+)⟧/,'$1');
  const htmlDemos=new Map(window.LAB_TAGS.map(card=>[card.term,solved(card)]));
  for(const card of elements)card.demo=htmlDemos.get(card.term);
  const attributes = window.LAB_EXTRAS.filter(card=>card.family==='Atributos').map(card=>({
    family:'HTML',group:'Atributos',term:card.term,description:card.description,syntax:solved(card),
    options:[[card.title,card.hint]], source:card.source,demo:solved(card)
  }));
  const css = (term, group, description, syntax, options, demo, path=term) =>
    ({family:'CSS',term,group,description,syntax,options,demo,source:mdn+'Web/CSS/Reference/'+(path.includes('/')?path:'Properties/'+path)});
  const bs = (term,group,description,syntax,options,demo,path,script=false) =>
    ({family:'Bootstrap',term,group,description,syntax,options,demo,source:bootstrap+path,script});
  const js = (term,group,description,syntax,options,demo,path) =>
    ({family:'JavaScript',term,group,description,syntax,options,demo,source:mdn+path});
  const j = (term,group,description,syntax,options,path) =>
    ({family:'Java',term,group,description,syntax,options,source:java+path});
  const gridBox = rules => '<style>\n  .zona { min-height: 95px; border: 2px dashed #689d7c; background: #edf7ef; '+rules+' }\n  .pieza { background: #246147; color: white; padding: 10px; border-radius: 5px; }\n</style>\n<div class="zona"><span class="pieza">Elemento</span></div>';
  const cssEntries = [
    css('text-align','Alineación','Alinea texto, enlaces e imágenes en línea dentro de una caja. Aplícala al contenedor.','p { text-align: center; }',
      [['left | center | right','Alinea a la izquierda, al centro o a la derecha.'],['start | end','Sigue la dirección del idioma. En español, start es izquierda y end es derecha.'],['justify','Reparte espacio para alinear ambos bordes del párrafo.']],
      '<style>p { padding:.6rem; background:#edf7ef; text-align: center; }</style>\n<p>Texto centrado en el párrafo</p>'),
    css('margin-inline: auto','Alineación','Centra horizontalmente la caja de un bloque que tiene un ancho menor al espacio disponible.','main { width: min(90%, 420px); margin-inline: auto; }',
      [['auto','Reparte el espacio libre entre ambos márgenes en línea.'],['margin-inline-start / margin-inline-end','Ajusta cada extremo en línea por separado.']],
      gridBox('width: min(75%, 280px); margin-inline: auto;'), 'margin-inline'),
    css('justify-content','Alineación','Distribuye los elementos de Flexbox sobre el eje principal. Con flex-direction: row es el eje horizontal.','nav { display: flex; justify-content: center; }',
      [['flex-start | center | flex-end','Agrupa los elementos al inicio, al centro o al final del eje principal.'],['space-between | space-around | space-evenly','Distribuye el espacio entre ellos y, según el valor, en los bordes.']],
      gridBox('display: flex; align-items: flex-start; justify-content: center;')),
    css('align-items','Alineación','Alinea los hijos sobre el eje transversal de Flexbox. En una fila horizontal, este eje es vertical.','section { display: flex; align-items: center; }',
      [['flex-start | center | flex-end','Coloca los hijos arriba, al centro o abajo cuando el eje transversal es vertical.'],['stretch','Estira los elementos cuyo tamaño en ese eje es automático.'],['baseline','Alinea los elementos según su línea de base.']],
      gridBox('display: flex; align-items: center;')),
    css('place-items','Alineación','Combina align-items y justify-items. En Grid permite centrar una pieza en los dos ejes.','.zona { display: grid; place-items: center; }',
      [['center','Centra el elemento en su área de cuadrícula.'],['start end','Alinea al inicio vertical y al final horizontal en la escritura habitual.'],['end start','Alinea al final vertical y al inicio horizontal.']],
      gridBox('display: grid; place-items: center;')),
    css('position','Posición','Determina desde dónde se colocará una caja y cómo se comporta al desplazarse.','.marco { position: relative; }\n.sello { position: absolute; top: 8px; right: 8px; }',
      [['static','Posición normal del documento. Los desplazamientos top, right, bottom y left no se aplican.'],['relative','Conserva el espacio original y permite desplazar la caja. También sirve de referencia a un hijo absoluto.'],['absolute','Saca la caja del flujo. Normalmente, usa como referencia el ancestro posicionado más cercano.'],['fixed','En el caso habitual se coloca respecto a la ventana.'],['sticky','Se mantiene en el flujo hasta alcanzar un umbral de desplazamiento, por ejemplo top: 0.']],
      gridBox('position: relative;')+'<style>.pieza { position: absolute; top:8px; right:8px; }</style>'),
    ...['top','right','bottom','left'].map((side,i)=>{
      const names=['superior','derecho','inferior','izquierdo'];
      return css(side,'Posición','Ajusta la distancia respecto al borde '+names[i]+' en una caja posicionada. Si position es relative, desplaza desde la posición normal.',
        '.pieza { position: absolute; '+side+': 8px; }',
        [['0','Alinea al borde correspondiente.'],['8px | 1rem | 25%','Usa una longitud o un porcentaje. En posición absoluta, los porcentajes se calculan a partir del tamaño del contenedor en ese eje.'],['auto','Deja que el algoritmo de posicionamiento calcule el desplazamiento.']],
        gridBox('position: relative;')+'<style>.pieza { position:absolute; '+side+':8px; }</style>');
    }),
    css('inset','Posición','Abrevia top, right, bottom y left en ese orden.','.capa { position: absolute; inset: 0; }',
      [['0','Fija los cuatro bordes a su contenedor.'],['8px 12px','Aplica 8 px a arriba y abajo, 12 px a izquierda y derecha.'],['auto 0 0 auto','Fija los bordes inferior y derecho.']],
      gridBox('position: relative;')+'<style>.pieza{position:absolute; inset:auto 0 0 auto;}</style>'),
    css('transform / translate()','Posición','Mueve, gira o escala el elemento después de que se calcula su caja.','.pieza { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }',
      [['translate(x, y)','Desplaza la caja. En translate(), los porcentajes se calculan sobre el tamaño de la propia caja.'],['rotate(15deg)','Gira la caja.'],['scale(.9)','Reduce la caja al 90 %.']],
      gridBox('position: relative;')+'<style>.pieza{position:absolute; top:50%; left:50%;transform:translate(-50%,-50%);}</style>', 'transform'),
    css('z-index','Posición','Ordena cajas que se superponen dentro del mismo contexto de apilamiento.','.aviso { position: relative; z-index: 2; }',
      [['auto','Usa el orden de apilamiento que corresponda.'],['-1 | 0 | 1 | 2','Ajusta el nivel. Los hijos no saltan entre contextos creados por sus padres.']]),
    css('display','Distribución','Define cómo se genera la caja y cómo coloca sus hijos.','.lista { display: flex; }',
      [['block | inline | inline-block','Bloque, integrado en la línea o caja en línea con dimensiones.'],['flex | grid','Activa Flexbox o Grid.'],['none','Quita el elemento de la distribución y normalmente también de la navegación accesible.']],
      gridBox('display:flex; place-content:center;')),
    css('flex-direction','Distribución','Selecciona la orientación del eje principal.','.items { display: flex; flex-direction: column; }',
      [['row | row-reverse','Coloca los elementos en fila, en dirección normal o inversa.'],['column | column-reverse','Coloca los elementos en columna, en dirección normal o inversa.']]),
    css('flex-wrap','Distribución','Permite crear nuevas líneas al faltar espacio.','.fila { display: flex; flex-wrap: wrap; }',
      [['nowrap','Mantiene una sola línea.'],['wrap','Permite varias líneas.'],['wrap-reverse','Invierte el sentido en que se apilan las líneas.']]),
    css('grid-template-columns','Distribución','Establece el número y el tamaño de las columnas de una cuadrícula.','.mosaico { display: grid; grid-template-columns: repeat(3, 1fr); }',
      [['1fr 2fr','Divide el espacio restante en proporción uno a dos.'],['repeat(3, 1fr)','Crea tres columnas con la misma fracción.'],['repeat(auto-fit, minmax(160px, 1fr))','Ajusta cuántas columnas caben según su anchura mínima.']],
      '<style>section{display:grid;grid-template-columns:repeat(3,1fr);gap:8px} b{padding:10px;background:lightgreen}</style>\n<section><b>Uno</b><b>Dos</b><b>Tres</b></section>'),
    css('gap','Distribución','Separa filas y columnas sin introducir espacio exterior en la caja.','.fila { display: flex; gap: 12px; }',
      [['12px','Misma separación en ambos ejes.'],['8px 16px','Primero entre filas, después entre columnas.']]),
    css('margin','Medidas y espacios','Define el espacio por fuera del borde.','.caja { margin: 12px 24px; }',
      [['12px','Todos los lados.'],['12px 24px','Primero arriba y abajo. Luego derecha e izquierda.'],['8px 12px 16px 20px','Arriba, derecha, abajo e izquierda.'],['margin-top / margin-right / margin-bottom / margin-left','Modifica un solo lado.']]),
    css('padding','Medidas y espacios','Crea espacio entre el contenido y el borde.','.caja { padding: 8px 14px; }',
      [['8px','Aplica el mismo relleno en todos los lados.'],['8px 14px','Separa los valores vertical y horizontal.'],['padding-top / padding-right / padding-bottom / padding-left','Modifica un lado individual.']]),
    css('width / max-width','Medidas y espacios','Controla el ancho y su límite para que la caja se adapte al área disponible.','img { width: 100%; max-width: 420px; height: auto; }',
      [['auto | 240px | 80%','Usa el ajuste automático, una longitud fija o un porcentaje.'],['max-width: 100%','Evita que el ancho exceda el contenedor en casos habituales.']],null,'width'),
    css('box-sizing','Medidas y espacios','Define si width y height incluyen el relleno y el borde.','* { box-sizing: border-box; }',
      [['content-box','El ancho y alto se aplican al contenido.'],['border-box','Incluye el borde y el relleno en la medida indicada.']]),
    css('color / background-color','Apariencia','Aplica color al texto o al fondo de la caja.','.aviso { color: #17452d; background-color: #dff6ea; }',
      [['rebeccapurple | #225544 | rgb(34 85 68)','Usa un nombre, hexadecimal o una función de color.'],['transparent','Permite ver lo que hay detrás del fondo.']],null,'background-color'),
    css('border / border-radius','Apariencia','Dibuja un borde y redondea las esquinas.','.tarjeta { border: 1px solid #265641; border-radius: 12px; }',
      [['solid | dashed | dotted','Define un borde continuo, segmentado o punteado.'],['0 | 12px | 50%','Controla el radio. En una caja cuadrada, 50 % forma un círculo.']],null,'border-radius'),
    css('font-size / font-weight','Apariencia','Ajusta el tamaño y el grosor del texto.','h2 { font-size: 1.5rem; font-weight: 700; }',
      [['1rem | 18px | 120%','Define el tamaño por raíz, píxeles o tamaño heredado.'],['normal | bold | 400 | 700','Define el grosor según los pesos disponibles en la fuente.']],null,'font-size'),
    css('overflow','Apariencia','Controla lo que sucede si el contenido se sale de la caja.','.panel { max-height: 150px; overflow: auto; }',
      [['visible | hidden | auto | scroll','Muestra, recorta, desplaza si hace falta o ofrece desplazamiento.'],['overflow-x / overflow-y','Controla cada eje por separado.']]),
    css('object-fit / object-position','Apariencia','Ajusta una imagen o un video dentro de una caja con dimensiones definidas.','img { width: 200px; height: 120px; object-fit: cover; object-position: top right; }',
      [['cover | contain | fill','Llena recortando, muestra el recurso completo o lo estira.'],['center | top right | 30% 70%','Coloca el motivo dentro del espacio visible.']],
      '<style>img{width:200px;height:120px;max-width:none;object-fit:cover;object-position:top right}</style>\n<img src="assets/paisaje.svg" alt="Paisaje de montaña">','object-fit'),
    css('.clase / #id / :hover','Selectores','Selecciona por clase, identificador o estado.','.aviso:hover, .aviso:focus-visible { background: gold; }',
      [['.aviso','Selecciona elementos con class="aviso".'],['#inicio','Selecciona el elemento con id="inicio".'],[':hover | :focus-visible','Detecta el puntero encima o un foco que debe mostrarse.']],null,'Selectors/Class_selectors'),
    css('@media','Diseño adaptable','Activa reglas según características del dispositivo o de la vista.','@media (min-width: 768px) { .tarjetas { display: flex; } }',
      [['min-width | max-width','Aplica las reglas a partir de un ancho o hasta un ancho.'],['prefers-reduced-motion: reduce','Adapta el movimiento según la preferencia del visitante.']],null,'At-rules/@media')
  ];
  window.REFERENCIA_DATA_PARTS={elements,attributes,cards,cssEntries,bs,js,j,mdn,bootstrap,java};
})();
