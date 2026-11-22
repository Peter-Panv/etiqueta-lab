(() => {
  'use strict';
  const {elements,attributes,cards,cssEntries,bs,js,j,mdn,bootstrap}=window.REFERENCIA_DATA_PARTS;
  const bootstrapEntries=[
    bs('.text-start / .text-center / .text-end','Alineación','Alinea el texto en el inicio, centro o final del bloque. En español, start corresponde a la izquierda y end a la derecha.','<p class="text-center text-md-end">Hola</p>',
      [['text-start | text-center | text-end','Inicio, centro o final en cualquier ancho.'],['text-md-end','Alinea al final a partir de 768 px. Puedes combinarla con text-center como ajuste inicial.']],
      '<p class="text-start">Inicio</p>\n<p class="text-center">Centro</p>\n<p class="text-end">Final</p>','utilities/text/'),
    bs('.justify-content-*','Alineación','Distribuye los hijos por el eje principal de un contenedor d-flex. En una fila normal, es el eje horizontal.','<div class="d-flex justify-content-center"><button type="button">Guardar</button></div>',
      [['justify-content-start | -center | -end','Agrupa los hijos al inicio, al centro o al final del eje.'],['justify-content-between | -around | -evenly','Reparte el espacio libre de distintas maneras.']],
      '<div class="d-flex justify-content-center gap-2 p-3 border"><span>A</span><span>B</span></div>','utilities/flex/#justify-content'),
    bs('.align-items-*','Alineación','Alinea los hijos de d-flex en el eje transversal. En una fila habitual, regula su posición vertical.','<div class="d-flex align-items-center" style="height: 6rem">…</div>',
      [['align-items-start | -center | -end','Coloca arriba, al centro o abajo en una fila horizontal.'],['align-items-baseline | -stretch','Alinea líneas de texto o estira los ítems de tamaño automático.'],['align-self-end','Alinea solo el elemento que lleva esa clase.']],
      '<div class="d-flex align-items-center border p-2" style="height: 6rem"><span>Centro vertical</span></div>','utilities/flex/#align-items'),
    bs('.mx-auto','Alineación','Centra horizontalmente un bloque con ancho inferior al del contenedor.','<div class="w-50 mx-auto p-2 border">Bloque centrado</div>',
      [['mx-auto','Márgenes horizontales automáticos.'],['ms-auto | me-auto','Deja margen libre al inicio o al final.'],['mx-md-auto','Aplica el ajuste automático desde el punto de corte md.']],
      '<div class="w-50 mx-auto p-2 border bg-light">Bloque centrado</div>','utilities/spacing/#horizontal-centering'),
    bs('.position-*','Posición','Define el tipo de posicionamiento. Un padre position-relative suele servir como referencia para hijos position-absolute.','<div class="position-relative"><span class="position-absolute top-0 end-0">Nuevo</span></div>',
      [['position-static | -relative','Ubicación normal o relativa.'],['position-absolute | -fixed | -sticky','Coloca la caja fuera del flujo o haz que se mantenga visible al desplazarse.'],['fixed-top | sticky-top','Utilidades para fijar o pegar un elemento arriba.']],
      '<div class="position-relative border" style="height: 6rem"><span class="position-absolute top-0 end-0 badge text-bg-primary">Nuevo</span></div>','utilities/position/'),
    bs('.top-* / .bottom-* / .start-* / .end-*','Posición','Mueve un elemento posicionado con valores predefinidos. En español, start es izquierda y end es derecha.','<span class="position-absolute bottom-0 start-0">Abajo a la izquierda</span>',
      [['top-0 | bottom-0 | start-0 | end-0','Ancla la caja a uno de los bordes.'],['top-50 | start-50','Mueve el borde del elemento a la mitad del contenedor.'],['0 | 50 | 100','Valores incluidos por defecto. Las utilidades indican porcentajes cuando el valor no es cero.']],
      '<div class="position-relative border" style="height: 6rem"><span class="position-absolute bottom-0 start-0 p-2 bg-light">Abajo a la izquierda</span></div>','utilities/position/#arrange-elements'),
    bs('.translate-middle','Posición','Compensa la mitad del tamaño propio de la caja. Úsala con top-50 y start-50 para centrarla.','<span class="position-absolute top-50 start-50 translate-middle">Centro</span>',
      [['translate-middle','Compensa en ambos ejes.'],['translate-middle-x | translate-middle-y','Compensa solo en el eje horizontal o vertical.']],
      '<div class="position-relative border" style="height: 6rem"><span class="position-absolute top-50 start-50 translate-middle badge text-bg-success">Centro</span></div>','utilities/position/#center-elements'),
    bs('.container / .row / .col-*','Cuadrícula','Usa una fila de doce columnas dentro de un contenedor. Las clases adaptables se activan a partir del punto de corte.','<div class="container"><div class="row"><div class="col-12 col-md-6">A</div><div class="col-12 col-md-6">B</div></div></div>',
      [['container | container-fluid','Anchos máximos adaptables o ancho completo.'],['col | col-6 | col-auto','Reparto automático, media fila o ancho del contenido.'],['col-12 col-md-6 col-lg-4','Ancho completo, media fila y un tercio según el tamaño.'],['sm 576 · md 768 · lg 992 · xl 1200 · xxl 1400','Puntos de corte predeterminados en píxeles.']],
      '<div class="container"><div class="row g-2"><div class="col-6"><div class="p-2 bg-success-subtle">Mitad</div></div><div class="col-6"><div class="p-2 bg-primary-subtle">Mitad</div></div></div></div>','layout/grid/'),
    bs('.g-* / .gx-* / .gy-*','Cuadrícula','Modifica la separación de las columnas y filas de Bootstrap. Estas clases se aplican a row.','<div class="row gx-3 gy-2">…</div>',
      [['g-0','Elimina la separación de la cuadrícula.'],['gx-3 | gy-2','Controla la separación horizontal o vertical.'],['g-md-4','Cambia la separación desde el punto de corte md.']],null,'layout/gutters/'),
    bs('.m-* / .p-* / .gap-*','Espaciado','Agrega margen exterior, relleno interior o separación entre hijos.','<div class="d-flex gap-2 mt-3 px-4">…</div>',
      [['m | p','Margen o padding.'],['t | b | s | e | x | y','Arriba, abajo, inicio, final, horizontal o vertical. Omite la letra para los cuatro lados.'],['0 | 1 | 2 | 3 | 4 | 5','Escala predeterminada de espacio. m admite además auto.'],['mt-md-3 | px-2','Margen superior desde md o relleno horizontal en cualquier ancho.']],
      '<div class="d-flex gap-2 p-3 border"><span class="bg-light px-3">A</span><span class="bg-light px-3">B</span></div>','utilities/spacing/'),
    bs('.d-*','Distribución','Controla el modo de distribución y la visibilidad por ancho.','<div class="d-none d-md-flex">Visible desde md</div>',
      [['d-block | d-inline | d-flex | d-grid','Bloque, en línea, Flexbox o Grid.'],['d-none','Oculta la caja.'],['d-none d-lg-block','Se muestra como bloque desde 992 px.']],null,'utilities/display/'),
    bs('.btn / .btn-*','Componentes','Da estilo de botón. Usa btn como base y una clase de variante adicional.','<button type="button" class="btn btn-outline-primary btn-sm">Guardar</button>',
      [['btn-primary | btn-secondary | btn-danger','Acción principal, secundaria o peligrosa.'],['btn-outline-primary','Variante con contorno.'],['btn-sm | btn-lg','Tamaño pequeño o grande.'],['disabled','Atributo que deshabilita un elemento button.']],
      '<button type="button" class="btn btn-primary">Principal</button>\n<button type="button" class="btn btn-outline-primary btn-sm">Con contorno</button>','components/buttons/'),
    bs('.alert-*','Componentes','Resalta mensajes con una clase base alert y una variante según el propósito.','<div class="alert alert-success" role="alert">Guardado</div>',
      [['alert-success | alert-warning | alert-danger','Confirmación, precaución o error. Agrega texto que explique el estado.'],['alert-dismissible','Permite incluir un botón de cierre. La acción de cerrar requiere el JavaScript de Bootstrap.']],
      '<div class="alert alert-success" role="alert">Inventario guardado.</div>','components/alerts/'),
    bs('.card / .card-body','Componentes','Agrupa una ficha de contenido con estructura y estilos reutilizables.','<article class="card"><div class="card-body"><h2 class="card-title">Cuaderno</h2><p class="card-text">12 unidades</p></div></article>',
      [['card-header | card-footer','Secciones superior e inferior.'],['card-img-top','Imagen que encabeza la tarjeta.'],['card-title | card-text','Título y texto principales.']],
      '<article class="card" style="max-width: 18rem"><div class="card-body"><h2 class="card-title h5">Cuaderno</h2><p class="card-text">12 unidades</p></div></article>','components/card/'),
    bs('.collapse / data-bs-toggle','Componentes','Abre y cierra una sección. El atributo data-bs-target del botón apunta al id del panel. Requiere el paquete JavaScript de Bootstrap.','<button type="button" data-bs-toggle="collapse" data-bs-target="#panel" aria-controls="panel" aria-expanded="false">Ver</button>\n<div class="collapse" id="panel">Contenido</div>',
      [['collapse','Prepara el panel que se mostrará o se ocultará.'],['collapse show','Comienza con el panel abierto. Ajusta también aria-expanded.'],['data-bs-target="#panel"','Selecciona el elemento que se controla.']],
      '<button type="button" class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#panel" aria-controls="panel" aria-expanded="false">Ver</button>\n<div class="collapse" id="panel"><p class="p-2 mt-2 border">Contenido del panel</p></div>','components/collapse/',true),
    bs('.form-control / .form-select','Formularios','Aplica estilos de Bootstrap a los campos de formulario.','<label for="correo" class="form-label">Correo</label><input id="correo" type="email" class="form-control">',
      [['form-control | form-select','Input o textarea de texto, y lista select.'],['form-control-sm | form-control-lg','Cambia el tamaño del campo.'],['form-check-input | form-check-label','Usa estas clases con casillas y botones de opción.']],
      '<label for="correo" class="form-label">Correo</label>\n<input id="correo" type="email" class="form-control" placeholder="ejemplo@correo.com">','forms/overview/'),
    bs('.text-bg-* / .bg-*','Apariencia','Aplica un color de fondo, o un fondo con color de texto combinado.','<span class="badge text-bg-success">Disponible</span>',
      [['text-bg-primary | text-bg-success | text-bg-danger','Usa variantes del tema con color de texto.'],['bg-light | bg-dark','Aplica solo el fondo.'],['bg-opacity-25','Reduce la opacidad en utilidades de fondo compatibles.']],
      '<span class="badge text-bg-success">Disponible</span> <span class="badge text-bg-danger">Agotado</span>','helpers/color-background/')
  ];
  const jsEntries=[
    js('querySelector() / querySelectorAll()','DOM','Busca uno o varios elementos con selectores CSS.','const total = document.querySelector("#total");\nconst filas = document.querySelectorAll(".fila");',
      [['"#total" | ".fila" | "button"','Selecciona por id, clase o etiqueta.'],['querySelector()','Devuelve el primer elemento o null.'],['querySelectorAll()','Devuelve una lista estática. Puedes recorrerla con forEach().']],
      '<p id="total">Cargando</p>\n<script>document.querySelector("#total").textContent = "12 unidades";</script>','API/Document/querySelector'),
    js('textContent / value','DOM','Lee o cambia el texto de un elemento y el valor actual de un campo.','const dato = document.querySelector("input").value;\ndocument.querySelector("output").textContent = dato;',
      [['textContent','Escribe texto sin interpretarlo como HTML.'],['value','Lee el contenido actual de input o select.'],['valueAsNumber','Obtiene un número en controles compatibles o NaN si no hay un valor válido.']],
      '<label>Nombre <input id="dato"></label>\n<output id="salida"></output>\n<script>document.querySelector("#dato").addEventListener("input", e => { document.querySelector("#salida").textContent = "Hola, " + e.target.value; });</script>','API/Node/textContent'),
    js('classList','DOM','Añade o quita clases sin reemplazar toda la lista de clases del elemento.','document.querySelector("#aviso").classList.toggle("visible");',
      [['add("visible") | remove("visible")','Añade o quita una clase.'],['toggle("visible")','Alterna el estado. Con un segundo argumento true o false puedes forzar el resultado.'],['contains("visible")','Comprueba si existe la clase.']],
      '<style>.visible { background: #ffd971; }</style>\n<button id="cambiar">Resaltar</button><p id="aviso">Inventario actualizado</p>\n<script>document.querySelector("#cambiar").onclick=()=>document.querySelector("#aviso").classList.toggle("visible");</script>','API/Element/classList'),
    js('addEventListener()','Eventos','Ejecuta una función cuando ocurre un evento en el elemento.','boton.addEventListener("click", evento => {\n  console.log(evento.currentTarget);\n});',
      [['"click" | "input" | "change" | "submit"','Activación, edición en curso, confirmación de un cambio o envío.'],['event.target | event.currentTarget','Objeto que originó el evento o elemento al que agregaste el listener.'],['{ once: true }','Ejecuta el controlador como máximo una vez.'],['event.preventDefault()','Cancela la acción predeterminada de un evento cancelable.']],
      '<button id="abrir">Avisar</button><p id="estado" aria-live="polite"></p>\n<script>document.querySelector("#abrir").addEventListener("click",()=>{document.querySelector("#estado").textContent="¡Botón activado!";});</script>','API/EventTarget/addEventListener'),
    js('createElement() / append()','DOM','Crea y agrega elementos para mostrar datos.','const item = document.createElement("li");\nitem.textContent = "Cuaderno";\ndocument.querySelector("ul").append(item);',
      [['createElement("li")','Crea el elemento en memoria.'],['append(item) | prepend(item)','Inserta al final o al principio del padre.'],['item.remove()','Retira el elemento del documento.']],
      '<ul></ul>\n<script>for(const nombre of ["Cuaderno","Lápiz"]){const item=document.createElement("li");item.textContent=nombre;document.querySelector("ul").append(item);}</script>','API/Document/createElement'),
    js('const / let','Fundamentos','Declara nombres para guardar datos dentro del bloque actual.','const precio = 120;\nlet cantidad = 2;\ncantidad += 1;',
      [['const','Úsala cuando la variable no volverá a asignarse. El contenido de un objeto asignado a const sí puede cambiar.'],['let','Permite asignar otro valor durante la ejecución.']],
      '<output></output><script>const precio=120;let cantidad=2;cantidad+=1;document.querySelector("output").textContent=precio*cantidad;</script>','Web/JavaScript/Reference/Statements/const'),
    js('if / else','Fundamentos','Elige qué instrucciones se ejecutan según una condición.','if (stock > 0) {\n  estado.textContent = "Disponible";\n} else {\n  estado.textContent = "Agotado";\n}',
      [['=== | !==','Compara igualdad o desigualdad estricta.'],['> | < | >= | <=','Compara valores en orden.'],['&& | || | !','Combina condiciones y aplica negación.']],
      '<output></output><script>const stock=12;document.querySelector("output").textContent=stock>0?"Disponible":"Agotado";</script>','Web/JavaScript/Reference/Statements/if...else'),
    js('function / =>','Fundamentos','Agrupa instrucciones que puedes llamar varias veces.','function total(precio, cantidad = 1) {\n  return precio * cantidad;\n}\nconst duplicar = n => n * 2;',
      [['parametro = valor','Usa un valor predeterminado cuando falte ese argumento o sea undefined.'],['return','Devuelve un resultado a quien llamó a la función.'],['n => n * 2','Forma breve para una función que devuelve una expresión.']],null,'Web/JavaScript/Reference/Functions'),
    js('for / for...of','Colecciones','Repite una operación para varios valores.','for (const producto of productos) {\n  console.log(producto);\n}',
      [['for (let i = 0; i < 3; i++)','Repite según un índice y una condición.'],['for (const valor of lista)','Recorre los valores de un objeto iterable.'],['break | continue','Sale del bucle o pasa a la siguiente vuelta.']],null,'Web/JavaScript/Reference/Statements/for...of'),
    js('map() / filter() / find()','Colecciones','Transforma, filtra o busca datos de un arreglo.','const disponibles = productos.filter(p => p.stock > 0);\nconst nombres = disponibles.map(p => p.nombre);',
      [['map(fn)','Devuelve un nuevo arreglo con el resultado de transformar cada valor.'],['filter(fn)','Conserva los valores que cumplen la condición.'],['find(fn)','Devuelve el primer valor que cumple la condición o undefined.']],
      '<ul></ul><script>const productos=[{nombre:"Regla",stock:5},{nombre:"Tinta",stock:0}];for(const p of productos.filter(p=>p.stock>0)){const li=document.createElement("li");li.textContent=p.nombre;document.querySelector("ul").append(li);}</script>','Web/JavaScript/Reference/Global_Objects/Array'),
    js('FormData','Formularios','Lee los datos de un formulario por el nombre de sus controles.','form.addEventListener("submit", e => {\n  e.preventDefault();\n  const datos = new FormData(form);\n  resultado.textContent = datos.get("nombre");\n});',
      [['new FormData(form)','Toma una instantánea de los campos que se enviarían.'],['get(nombre) | getAll(nombre)','Lee un valor o todos los que tienen ese nombre.'],['set(nombre, valor) | append(nombre, valor)','Reemplaza un dato o añade otro.']],
      '<form><label>Nombre <input name="nombre" required></label><button>Mostrar</button></form><output></output>\n<script>document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();document.querySelector("output").textContent=new FormData(e.currentTarget).get("nombre");});</script>','API/FormData'),
    js('async / await','Asincronía','Espera la resolución de una promesa dentro de una función asíncrona o un módulo.','async function cargar(url) {\n  const respuesta = await fetch(url);\n  if (!respuesta.ok) throw new Error("Error HTTP " + respuesta.status);\n  return respuesta.json();\n}',
      [['await fetch(url)','Espera la respuesta. Un error HTTP sigue llegando como respuesta en muchos casos, por eso se verifica ok.'],['try / catch','Permite manejar una promesa rechazada alrededor de await.'],['Promise.all([...])','Espera varias operaciones y rechaza si alguna de ellas falla.']],null,'Web/JavaScript/Reference/Statements/async_function')
  ];
  const javaEntries=[
    j('public static void main','Fundamentos','Punto de entrada de un programa Java. Guarda la clase pública del ejemplo como Main.java.','public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hola desde Java");\n    }\n}',
      [['javac Main.java','Compila con el JDK.'],['java Main','Ejecuta la clase compilada.'],['String[] args','Recibe los argumentos de línea de comandos.']],'getting-started/'),
    j('int / double / boolean / String','Fundamentos','Declara variables con un tipo explícito.','int stock = 12;\ndouble precio = 19.75;\nboolean disponible = true;\nString nombre = "Cuaderno";',
      [['int | long','Números enteros de 32 o 64 bits.'],['float | double','Números de punto flotante.'],['boolean','true o false.'],['String','Objeto de texto, con S mayúscula.']],'language-basics/variables/'),
    j('if / else / switch','Control de flujo','Elige qué bloque ejecutar según una condición o un valor.','if (stock > 0) {\n    System.out.println("Disponible");\n} else {\n    System.out.println("Agotado");\n}',
      [['if / else if / else','Evalúa condiciones en orden.'],['switch / case / default','Agrupa decisiones por valores de una expresión.'],['texto.equals("sí")','Compara el contenido de cadenas.']],'language-basics/controlling-flow/'),
    j('for / while','Control de flujo','Repite operaciones sobre índices, condiciones o colecciones.','for (int i = 0; i < 3; i++) {\n    System.out.println(i);\n}',
      [['while (condicion)','Comprueba la condición antes de repetir.'],['for (String nombre : nombres)','Recorre elementos de un arreglo o un iterable.'],['break | continue','Termina el bucle o salta la vuelta actual.']],'language-basics/controlling-flow/'),
    j('class / new','Clases y objetos','Una clase declara el estado y el comportamiento de sus objetos.','class Producto {\n    private final String nombre;\n    Producto(String nombre) { this.nombre = nombre; }\n    public String getNombre() { return nombre; }\n}\n// Dentro de un método puedes escribir\n// Producto p = new Producto("Cuaderno");',
      [['private | public','Limita el acceso a la clase o expone una operación.'],['new Producto(...)','Construye una instancia.'],['static','Declara un miembro que pertenece a la clase.']],'classes-objects/'),
    j('List / ArrayList','Colecciones','Guarda una secuencia de valores y accede a ellos por índice.','import java.util.ArrayList;\nimport java.util.List;\n// Dentro de un método:\n// List<String> productos = new ArrayList<>();\n// productos.add("Cuaderno");',
      [['add(valor)','Agrega un elemento a una lista modificable.'],['get(i) | size()','Lee por índice desde cero o consulta el tamaño.'],['List.of(...)','Crea una lista que no se puede modificar.']],'api/collections-framework/'),
    j('try / catch / finally','Errores','Maneja excepciones alrededor de operaciones que pueden fallar.','try {\n    int stock = Integer.parseInt("12");\n    System.out.println(stock);\n} catch (NumberFormatException e) {\n    System.out.println("Escribe un número entero.");\n}',
      [['try','Contiene la operación que puede fallar.'],['catch (Tipo e)','Captura el tipo de excepción indicado.'],['finally','Se utiliza para ejecutar código al salir normalmente o por excepción.'],['try con recursos','Cierra automáticamente recursos compatibles.']],'exceptions/')
  ];
  const entries=[...elements,...attributes,...cssEntries,...bootstrapEntries,...jsEntries,...javaEntries];
  const familyGroups={HTML:'HTML',CSS:'CSS',Bootstrap:'Bootstrap 5.3',JavaScript:'JavaScript',Java:'Java'};
  const topics=[
    {id:'texto',title:'Alinear texto',group:'Alineación',description:'Modifica la alineación dentro del párrafo.',css:'text-align',bs:'.text-start / .text-center / .text-end',choices:[
      ['Izquierda','text-align: left;', 'text-start'],['Centro','text-align: center;', 'text-center'],['Derecha','text-align: right;', 'text-end']
    ]},
    {id:'caja',title:'Centrar una caja',group:'Alineación',description:'Distingue centrar la caja horizontalmente de centrarla en ambos ejes.',css:'place-items',bs:'.justify-content-*',choices:[
      ['Ambos ejes','display: grid;\n  place-items: center;','d-flex justify-content-center align-items-center'],
      ['Solo horizontal','display: flex;\n  justify-content: center;\n  align-items: flex-start;','d-flex justify-content-center align-items-start'],
      ['Solo vertical','display: flex;\n  align-items: center;','d-flex align-items-center']
    ]},
    {id:'posicion',title:'Posicionar en un borde',group:'Posición',description:'El contenedor sirve de referencia para colocar el elemento en un borde, una esquina o el centro.',css:'position',bs:'.position-*',choices:[
      ['Arriba izquierda','top: 0;\n  left: 0;','top-0 start-0'],
      ['Arriba derecha','top: 0;\n  right: 0;','top-0 end-0'],
      ['Abajo izquierda','bottom: 0;\n  left: 0;','bottom-0 start-0'],
      ['Abajo derecha','bottom: 0;\n  right: 0;','bottom-0 end-0'],
      ['Centro','top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);','top-50 start-50 translate-middle'],
      ['Arriba al centro','top: 0;\n  left: 50%;\n  transform: translateX(-50%);','top-0 start-50 translate-middle-x'],
      ['Centro a la izquierda','top: 50%;\n  left: 0;\n  transform: translateY(-50%);','top-50 start-0 translate-middle-y'],
      ['Centro a la derecha','top: 50%;\n  right: 0;\n  transform: translateY(-50%);','top-50 end-0 translate-middle-y'],
      ['Abajo al centro','bottom: 0;\n  left: 50%;\n  transform: translateX(-50%);','bottom-0 start-50 translate-middle-x']
    ]}
  ];
  // Usa fichas existentes para cubrir clases y atributos interactivos sin duplicar ejemplos.
  const known=new Set(entries.map(card=>card.family+'|'+card.term));
  for(const card of cards.filter(card=>['CSS','Bootstrap','JavaScript'].includes(card.family))){
    if(known.has(card.family+'|'+card.term))continue;
    const example=card.pattern.replace(/⟦([^⟦⟧]+)⟧/,'$1');
    entries.push({...card,syntax:example,demo:example,options:[[card.title,card.hint]]});
  }
  window.REFERENCIA_GUIA={entries,topics,familyGroups,mdn,bootstrap};
})();
