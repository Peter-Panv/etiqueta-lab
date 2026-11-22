(() => {
  const mdn = "https://developer.mozilla.org/en-US/docs/";
  const bsDocs = "https://getbootstrap.com/docs/5.3/";
  const bsHref = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css";
  const bsLink = '<link href="' + bsHref + '" rel="stylesheet">';
  const bootstrap = (markup) => bsLink + "\n\n" + markup;
  const styled = (css, markup) => "<style>\n" + css + "\n</style>\n\n" + markup;
  const scripted = (markup, js) => markup + "\n\n<script>\n" + js + "\n</script>";
  const check = (label, test) => ({ label, test });
  const present = (selector) => (doc) => Boolean(doc.querySelector(selector));
  const scriptText = (doc) => [...doc.scripts].map((script) => script.textContent).join("\n");
  const usesBootstrap = (doc) => [...doc.querySelectorAll('link[rel~="stylesheet"]')].some(
    (link) => link.getAttribute("href") === bsHref
  );
  const hasBootstrap = check("La hoja de estilos de Bootstrap 5.3.8 está enlazada.", usesBootstrap);
  function rulesFor(doc) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync([...doc.querySelectorAll("style")].map((node) => node.textContent).join("\n"));
    return [...sheet.cssRules];
  }
  function cssValue(rules, selector, property) {
    let value = "";
    for (const rule of rules) {
      if (rule.selectorText?.split(/\s*,\s*/).includes(selector)) {
        value = rule.style.getPropertyValue(property).trim() || value;
      }
    }
    return value;
  }
  const css = (doc, selector, property) => cssValue(rulesFor(doc), selector, property);
  function behavior(label, heuristic) {
    return check(label, (doc, code, live) => {
      if (typeof live?.behavior === "boolean") return live.behavior;
      return heuristic(scriptText(doc), doc);
    });
  }

  const cssModule = {
    id: "css", title: "Diseño con CSS", icon: "layers", color: "violet",
    description: "Aplica estilos, distribuye elementos y adapta una página a distintas pantallas.",
    lessons: [
      {
        id: "css-selectores", title: "Selectores y clases", minutes: 8,
        concept: "Una regla CSS elige elementos mediante un selector y les asigna propiedades. Una clase permite dar el mismo aspecto a piezas distintas de la página.",
        explain: "En el ejemplo ambos párrafos son HTML válido. Solo el segundo coincide con .aviso porque tiene class=\"aviso\". Cambia el nombre de la clase en el HTML y observa qué texto pierde el color.",
        example: styled(`.aviso { color: darkgreen; font-weight: bold; }`, `<p>Los talleres abren a las ocho.</p>\n<p class="aviso">Quedan dos plazas.</p>`),
        task: "En la lista de cursos, destaca solo «HTML práctico». Dale la clase favorito y define en .favorito el color navy y el peso bold.",
        starter: styled(`/* Escribe aquí tu regla. */`, `<ul>\n  <li>HTML práctico</li>\n  <li>Fotografía</li>\n</ul>`),
        hints: ["La clase se escribe sin punto dentro del atributo class. El punto pertenece al selector CSS.", "Dentro de .favorito, usa las propiedades color y font-weight."],
        solution: styled(`.favorito {\n  color: navy;\n  font-weight: bold;\n}`, `<ul>\n  <li class="favorito">HTML práctico</li>\n  <li>Fotografía</li>\n</ul>`),
        checks: [
          check("Solo «HTML práctico» tiene la clase favorito.", (doc) => doc.querySelectorAll(".favorito").length === 1 && doc.querySelector("li.favorito")?.textContent.trim() === "HTML práctico"),
          check("La regla .favorito usa azul marino.", (doc) => /^(navy|#000080|rgb\(0,\s*0,\s*128\))$/i.test(css(doc, ".favorito", "color"))),
          check("La clase muestra el texto en negrita.", (doc) => /^(bold|700)$/i.test(css(doc, ".favorito", "font-weight")))
        ], source: mdn + "Learn_web_development/Core/Styling_basics/Basic_selectors"
      },
      {
        id: "css-modelo-caja", title: "El modelo de caja", minutes: 9,
        concept: "El contenido, su relleno, el borde y el margen forman la caja de un elemento. El relleno separa el texto de su borde y el margen deja espacio entre cajas.",
        explain: "Compara el color del fondo con el espacio exterior. Si cambias padding por margin, verás que el fondo ya no cubre esa franja. Con box-sizing: border-box el ancho declarado incluye relleno y borde.",
        example: styled(`.nota {\n  padding: 12px;\n  border: 2px solid teal;\n  margin: 8px;\n  background: honeydew;\n}`, `<p class="nota">Trae tu cuaderno.</p>`),
        task: "La credencial debe medir 220 px de ancho en total. En .credencial añade un relleno de 16 px por lado, un borde sólido de 2 px y box-sizing para conservar ese ancho.",
        starter: styled(`.credencial {\n  width: 220px;\n  background: lavender;\n}`, `<article class="credencial">Pase de visitante</article>`),
        hints: ["Para aplicar el mismo relleno a los cuatro lados, escribe una sola medida en padding.", "border: 2px solid indigo dibuja los cuatro bordes. El modelo de tamaño que los incluye se llama border-box."],
        solution: styled(`.credencial {\n  width: 220px;\n  padding: 16px;\n  border: 2px solid indigo;\n  box-sizing: border-box;\n  background: lavender;\n}`, `<article class="credencial">Pase de visitante</article>`),
        checks: [
          check("La credencial usa un ancho total de 220 px.", (doc) => present(".credencial")(doc) && css(doc, ".credencial", "width") === "220px" && css(doc, ".credencial", "box-sizing") === "border-box"),
          check("Cada lado tiene un relleno de 16 px.", (doc) => ["top", "right", "bottom", "left"].every((side) => css(doc, ".credencial", "padding-" + side) === "16px")),
          check("El borde sólido mide 2 px en todos los lados.", (doc) => ["top", "right", "bottom", "left"].every((side) => css(doc, ".credencial", "border-" + side + "-width") === "2px" && css(doc, ".credencial", "border-" + side + "-style") === "solid"))
        ], source: mdn + "Learn_web_development/Core/Styling_basics/Box_model"
      },
      {
        id: "css-flexbox", title: "Distribución con Flexbox", minutes: 10,
        concept: "Flexbox reparte los hijos directos de un contenedor sobre un eje. El contenedor decide la separación y si las piezas pueden saltar a otra línea.",
        explain: "En la barra del ejemplo, justify-content reparte el espacio sobrante entre sus extremos. Cambia space-between por center. Después prueba gap para separar elementos sin añadir márgenes individuales.",
        example: styled(`.barra {\n  display: flex;\n  justify-content: space-between;\n  background: aliceblue;\n  padding: 12px;\n}`, `<header class="barra"><strong>Taller</strong><span>En línea</span></header>`),
        task: "Organiza las tres etiquetas de .temas con Flexbox. Deja 12 px entre ellas y permite que continúen en otra línea si falta espacio.",
        starter: styled(`.temas span { padding: 8px; background: lavender; }`, `<div class="temas">\n  <span>HTML</span><span>CSS</span><span>JavaScript</span>\n</div>`),
        hints: ["Las tres propiedades se aplican a .temas, el elemento que contiene las etiquetas.", "Usa display: flex, gap y flex-wrap. El valor que permite el salto es wrap."],
        solution: styled(`.temas {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.temas span { padding: 8px; background: lavender; }`, `<div class="temas">\n  <span>HTML</span><span>CSS</span><span>JavaScript</span>\n</div>`),
        checks: [
          check("El contenedor de las tres etiquetas es flexible.", (doc) => doc.querySelectorAll(".temas > *").length >= 3 && /^(inline-)?flex$/.test(css(doc, ".temas", "display"))),
          check("El espacio entre filas y columnas es de 12 px.", (doc) => ["row-gap", "column-gap"].every((key) => css(doc, ".temas", key) === "12px")),
          check("Se permite el salto a otra fila.", (doc) => css(doc, ".temas", "flex-wrap") === "wrap")
        ], source: mdn + "Learn_web_development/Core/CSS_layout/Flexbox"
      },
      {
        id: "css-grid-adaptable", title: "Grid y consultas de medios", minutes: 13,
        concept: "Grid divide una zona en filas y columnas. La unidad fr reparte el espacio disponible. Una consulta @media permite cambiar la distribución al alcanzar un ancho.",
        explain: "El ejemplo empieza con una columna. A partir de 480 px se activa otra regla y las dos tarjetas quedan en la misma fila. El ancho que cuenta en el laboratorio es el del panel de vista previa.",
        example: styled(`.agenda { display: grid; gap: 8px; }\n.agenda article { padding: 10px; background: aliceblue; }\n@media (min-width: 480px) {\n  .agenda { grid-template-columns: 1fr 1fr; }\n}`, `<section class="agenda"><article>Lunes</article><article>Martes</article></section>`),
        task: "Convierte .catalogo en una cuadrícula. Conserva una columna en pantallas pequeñas y crea tres columnas iguales de 1fr desde 600 px con @media (min-width: 600px).",
        starter: styled(`.catalogo { gap: 8px; }\n.catalogo article { background: lavender; padding: 10px; }`, `<section class="catalogo">\n  <article>Álbum</article><article>Mapa</article><article>Cuaderno</article>\n</section>`),
        hints: ["En la regla base de .catalogo usa display: grid. Si no declaras columnas, estos artículos se apilan.", "Dentro de @media vuelve a seleccionar .catalogo. Puedes escribir repeat(3, 1fr) o 1fr 1fr 1fr."],
        solution: styled(`.catalogo { display: grid; gap: 8px; }\n.catalogo article { background: lavender; padding: 10px; }\n@media (min-width: 600px) {\n  .catalogo { grid-template-columns: repeat(3, 1fr); }\n}`, `<section class="catalogo">\n  <article>Álbum</article><article>Mapa</article><article>Cuaderno</article>\n</section>`),
        checks: [
          check("Hay tres artículos en la cuadrícula.", (doc) => doc.querySelectorAll(".catalogo > article").length === 3 && /^(inline-)?grid$/.test(css(doc, ".catalogo", "display"))),
          check("El diseño base conserva una columna.", (doc) => /^(|none|1fr|auto|100%|repeat\(1,\s*1fr\))$/.test(css(doc, ".catalogo", "grid-template-columns"))),
          check("Desde 600 px se definen tres columnas de 1fr.", (doc) => rulesFor(doc).some((rule) => /(?:min-width:\s*600px|width\s*>=\s*600px)/.test(rule.conditionText || "") && /^(repeat\(3,\s*1fr\)|1fr 1fr 1fr)$/.test(cssValue([...rule.cssRules], ".catalogo", "grid-template-columns"))))
        ], source: mdn + "Learn_web_development/Core/CSS_layout/Responsive_Design"
      },
      {
        id: "css-variables", title: "Un tema con variables", minutes: 9,
        concept: "Una propiedad personalizada guarda un valor que puedes reutilizar en varias reglas. Declárala con dos guiones y recupérala con var().",
        explain: "El ejemplo usa el mismo color para un título y para el borde de su sección. Cambia solo el valor de --acento. Declararlo en :root permite que los descendientes lo hereden.",
        example: styled(`:root { --acento: darkmagenta; }\nh2 { color: var(--acento); }\nsection { border-left: 4px solid var(--acento); padding-left: 12px; }`, `<section><h2>Cartelera</h2><p>Función a las siete.</p></section>`),
        task: "Crea la variable --marca en :root con el color teal. Úsala como color de texto de .titulo y color de fondo de .insignia.",
        starter: styled(`.insignia { padding: 4px 10px; color: white; }`, `<h2 class="titulo">Bitácora</h2>\n<span class="insignia">Edición semanal</span>`),
        hints: ["Escribe :root { --marca: teal; } para definir la variable.", "La lectura se escribe var(--marca). Usa color en el título y background-color en la insignia."],
        solution: styled(`:root { --marca: teal; }\n.titulo { color: var(--marca); }\n.insignia {\n  padding: 4px 10px;\n  color: white;\n  background-color: var(--marca);\n}`, `<h2 class="titulo">Bitácora</h2>\n<span class="insignia">Edición semanal</span>`),
        checks: [
          check("La variable --marca define el color teal en :root.", (doc) => /^(teal|#008080|rgb\(0,\s*128,\s*128\))$/i.test(css(doc, ":root", "--marca"))),
          check("El título toma su color de --marca.", (doc) => present(".titulo")(doc) && /var\(\s*--marca\b/.test(css(doc, ".titulo", "color"))),
          check("La insignia usa --marca para su fondo.", (doc) => present(".insignia")(doc) && /var\(\s*--marca\b/.test(css(doc, ".insignia", "background-color") || css(doc, ".insignia", "background")))
        ], source: mdn + "Web/CSS/Guides/Cascading_variables/Using_custom_properties"
      }
    ]
  };

  const bootstrapModule = {
    id: "bootstrap", title: "Bootstrap", icon: "grid", color: "blue",
    description: "Combina la cuadrícula, las utilidades y los componentes de Bootstrap 5.",
    lessons: [
      {
        id: "bs-utilidades", title: "Enlazar Bootstrap y usar utilidades", minutes: 8,
        concept: "Bootstrap distribuye una hoja de estilos con clases que puedes combinar. En una página completa, coloca el enlace a la hoja de estilos en head y las clases en los elementos de body.",
        explain: "En el ejemplo, p-3 añade relleno en los cuatro lados y rounded redondea las esquinas. La escala de espaciado usa tamaños predefinidos. Prueba p-1 y p-5 para comparar.",
        example: bootstrap(`<aside class="p-3 rounded bg-light border">\n  Consulta el horario de atención.\n</aside>`),
        task: "En el aviso de inscripción usa p-3 para relleno, rounded para las esquinas y text-bg-success para combinar un fondo de éxito con un color de texto legible.",
        starter: bootstrap(`<p>Inscripción confirmada.</p>`),
        hints: ["Un solo atributo class puede recibir varias clases separadas por espacios.", "Conserva el enlace y escribe las tres clases en el párrafo del aviso."],
        solution: bootstrap(`<p class="p-3 rounded text-bg-success">Inscripción confirmada.</p>`),
        checks: [hasBootstrap, check("El aviso usa el relleno y las esquinas solicitadas.", present("p.p-3.rounded")), check("El mismo aviso usa el esquema de éxito.", present("p.p-3.rounded.text-bg-success"))],
        source: bsDocs + "helpers/color-background/"
      },
      {
        id: "bs-columnas", title: "La cuadrícula de doce columnas", minutes: 10,
        concept: "Una fila de Bootstrap organiza columnas dentro de un contenedor. Las clases col-* expresan fracciones de doce. Un prefijo como md aplica el tamaño al alcanzar ese punto de ruptura.",
        explain: "Dos columnas col-6 se reparten una fila al 50 %. En cambio, combinar col-12 con col-md-6 permite apilar primero y repartir por mitades a partir de 768 px. El espacio g-2 pertenece a la fila.",
        example: bootstrap(`<div class="container">\n  <div class="row g-2">\n    <div class="col-6"><p class="bg-light p-2">Entrada</p></div>\n    <div class="col-6"><p class="bg-light p-2">Salida</p></div>\n  </div>\n</div>`),
        task: "Crea tres columnas dentro de la fila. Cada una debe ocupar todo el ancho en móvil y un tercio desde md. Usa col-12 y col-md-4 en cada columna.",
        starter: bootstrap(`<div class="container">\n  <div class="row g-2">\n    <div>Lectura</div>\n    <div>Práctica</div>\n    <div>Repaso</div>\n  </div>\n</div>`),
        hints: ["Un tercio de las doce columnas equivale a cuatro.", "Las clases de ancho van en los tres hijos directos de .row."],
        solution: bootstrap(`<div class="container">\n  <div class="row g-2">\n    <div class="col-12 col-md-4">Lectura</div>\n    <div class="col-12 col-md-4">Práctica</div>\n    <div class="col-12 col-md-4">Repaso</div>\n  </div>\n</div>`),
        checks: [hasBootstrap, check("Las tres columnas ocupan doce unidades en móvil.", (doc) => doc.querySelectorAll(".container .row > .col-12").length === 3), check("Las mismas tres columnas ocupan cuatro unidades desde md.", (doc) => doc.querySelectorAll(".container .row > .col-12.col-md-4").length === 3)],
        source: bsDocs + "layout/grid/"
      },
      {
        id: "bs-tarjetas", title: "Tarjetas de contenido", minutes: 10,
        concept: "Una tarjeta agrupa contenido relacionado. Bootstrap separa su contorno (.card) del relleno interior (.card-body). Tú eliges las etiquetas semánticas apropiadas.",
        explain: "El ejemplo usa article para una publicación independiente y h2 para el título. Observa cómo .card-body da espacio a los elementos interiores. Prueba a quitar esa clase y compara.",
        example: bootstrap(`<article class="card">\n  <div class="card-body">\n    <h2 class="card-title">Club de lectura</h2>\n    <p class="card-text">Encuentros cada viernes.</p>\n  </div>\n</article>`),
        task: "Construye una tarjeta para el taller de cerámica. Añade card al artículo, card-body al contenedor, card-title y card-text al contenido. Da al enlace las clases btn y btn-primary y conserva su destino.",
        starter: bootstrap(`<article>\n  <div>\n    <h2>Taller de cerámica</h2>\n    <p>Modela tu primera taza.</p>\n    <a href="#horarios">Ver horarios</a>\n  </div>\n</article>\n<section id="horarios"><h2>Horarios</h2><p>Sábado, 9:00</p></section>`),
        hints: ["Aplica las clases de tarjeta de afuera hacia adentro, sin cambiar las etiquetas.", "El enlace sigue siendo una etiqueta a con href; Bootstrap le da aspecto de botón."],
        solution: bootstrap(`<article class="card">\n  <div class="card-body">\n    <h2 class="card-title">Taller de cerámica</h2>\n    <p class="card-text">Modela tu primera taza.</p>\n    <a class="btn btn-primary" href="#horarios">Ver horarios</a>\n  </div>\n</article>\n<section id="horarios"><h2>Horarios</h2><p>Sábado, 9:00</p></section>`),
        checks: [hasBootstrap, check("El título y la descripción pertenecen al cuerpo de la tarjeta.", (doc) => present("article.card .card-body h2.card-title")(doc) && present("article.card .card-body p.card-text")(doc)), check("El enlace primario conduce a los horarios.", (doc) => present('article.card .card-body a.btn.btn-primary[href="#horarios"]')(doc) && present("#horarios")(doc))],
        source: bsDocs + "components/card/"
      },
      {
        id: "bs-formulario", title: "Un formulario con Bootstrap", minutes: 11,
        concept: "Bootstrap aporta estilos a las etiquetas y campos. HTML sigue definiendo qué dato admite el campo y cómo se relaciona con su etiqueta.",
        explain: "Al pulsar la etiqueta del ejemplo, el navegador coloca el foco en el campo porque for e id coinciden. El tipo email activa una comprobación de formato y required exige un valor antes del envío.",
        example: bootstrap(`<form class="p-3">\n  <label class="form-label" for="correo">Correo de contacto</label>\n  <input class="form-control" id="correo" type="email" required>\n  <button class="btn btn-primary mt-2">Comprobar</button>\n</form>`),
        task: "Prepara un formulario de cantidad. Vincula la etiqueta al campo unidades, aplica form-label y form-control, y exige un número de al menos 1. Da al botón de envío el estilo btn btn-success.",
        starter: bootstrap(`<form class="p-3">\n  <label>Unidades</label>\n  <input id="unidades" name="unidades">\n  <button type="submit">Confirmar</button>\n</form>`),
        hints: ["En label combina for=\"unidades\" con class=\"form-label\".", "El control necesita type=\"number\", min=\"1\" y required. Las clases del botón son independientes de su type."],
        solution: bootstrap(`<form class="p-3">\n  <label class="form-label" for="unidades">Unidades</label>\n  <input class="form-control" id="unidades" name="unidades" type="number" min="1" required>\n  <button type="submit" class="btn btn-success mt-2">Confirmar</button>\n</form>`),
        checks: [hasBootstrap, check("La etiqueta con estilo señala al campo de unidades.", (doc) => present('form label.form-label[for="unidades"]')(doc) && present("form #unidades.form-control")(doc)), check("La cantidad es obligatoria y comienza en uno.", present('form input#unidades[type="number"][min="1"][required]')), check("El formulario incluye un botón de envío con estilo de éxito.", present('form button[type="submit"].btn.btn-success, form button:not([type]).btn.btn-success'))],
        source: bsDocs + "forms/form-control/"
      }
    ]
  };

  const countMarkup = `<button type="button" id="sumar">Añadir una plaza</button>\n<p>Plazas reservadas: <output id="total">0</output></p>`;
  const workshopForm = `<form id="reserva">\n  <label for="curso">Taller</label>\n  <select id="curso" name="curso">\n    <option>Pintura</option><option>Robótica</option>\n  </select>\n  <button type="submit">Reservar</button>\n</form>\n<p id="respuesta" role="status"></p>`;
  const listMarkup = `<h2>Materiales</h2>\n<ul id="materiales"></ul>`;
  const jsModule = {
    id: "javascript", title: "HTML y JavaScript", icon: "bolt", color: "amber",
    description: "Conecta los controles del documento con eventos, formularios y datos.",
    lessons: [
      {
        id: "js-dom", title: "Encontrar y cambiar un elemento", minutes: 8,
        concept: "El navegador convierte el HTML en un árbol de objetos llamado DOM. Un script puede buscar un nodo con querySelector y modificar su texto con textContent.",
        explain: "El script del ejemplo está después del párrafo, por lo que el nodo ya existe cuando se ejecuta la búsqueda. Cambia el mensaje entre comillas y vuelve a ejecutar. Para cargar un archivo JavaScript desde head puedes usar un script externo con defer.",
        example: scripted(`<p id="saludo">Preparando saludo…</p>`, `const saludo = document.querySelector("#saludo");\nsaludo.textContent = "Bienvenido al taller";`),
        task: "El párrafo de estado empieza con «En espera». Usa JavaScript para que al cargar muestre «Catálogo listo». Conserva el texto inicial en el HTML y modifica el DOM en el script.",
        starter: scripted(`<p id="estado">En espera</p>`, `// Localiza el párrafo y actualiza su texto.`),
        hints: ["La búsqueda por id admite document.querySelector(\"#estado\") o document.getElementById(\"estado\").", "Asigna el texto pedido a la propiedad textContent del elemento encontrado."],
        solution: scripted(`<p id="estado">En espera</p>`, `const estado = document.querySelector("#estado");\nestado.textContent = "Catálogo listo";`),
        checks: [
          check("El HTML conserva el párrafo de espera.", (doc) => doc.querySelector("p#estado")?.textContent.trim() === "En espera"),
          check("El script localiza el nodo del estado.", (doc) => /(?:querySelector|getElementById)\s*\(\s*["'\x60]#?estado["'\x60]\s*\)/.test(scriptText(doc))),
          behavior("El estado cambia a «Catálogo listo» al cargar.", (js) => /textContent\s*=\s*["'\x60]Catálogo listo["'\x60]/.test(js))
        ],
        probe: () => document.querySelector("#estado")?.textContent.trim() === "Catálogo listo",
        source: mdn + "Web/API/Node/textContent"
      },
      {
        id: "js-eventos", title: "Un contador con eventos", minutes: 12,
        concept: "Un evento comunica que algo sucedió. Al registrar una función en el evento click, el navegador la ejecuta cada vez que se activa el botón, incluso desde el teclado.",
        explain: "En el ejemplo la escucha se instala una vez y el mensaje aparece al pulsar. Para llevar una cuenta entre clics, declara la variable fuera de la función y actualiza la cifra dentro de ella.",
        example: scripted(`<button type="button" id="encender">Encender luz</button>\n<p id="luz">Apagada</p>`, `const boton = document.querySelector("#encender");\nboton.addEventListener("click", () => {\n  document.querySelector("#luz").textContent = "Encendida";\n});`),
        task: "Haz funcionar el contador de plazas. Debe comenzar en 0 y aumentar en una unidad cada vez que se pulsa «Añadir una plaza». Púlsalo dos veces y comprueba que muestra 2.",
        starter: scripted(countMarkup, `let plazas = 0;\nconst boton = document.querySelector("#sumar");\nconst salida = document.querySelector("#total");\n// Conecta el botón con la cuenta.`),
        hints: ["Escucha click en el botón con addEventListener. Puedes escribir una función flecha: () => { ... }.", "Dentro de la función usa plazas += 1 y luego salida.textContent = plazas."],
        solution: scripted(countMarkup, `let plazas = 0;\nconst boton = document.querySelector("#sumar");\nconst salida = document.querySelector("#total");\nboton.addEventListener("click", () => {\n  plazas += 1;\n  salida.textContent = plazas;\n});`),
        checks: [
          check("Hay un botón para sumar y una salida que empieza en cero.", (doc) => present("button#sumar")(doc) && doc.querySelector("output#total")?.textContent.trim() === "0"),
          behavior("Dos clics consecutivos muestran primero 1 y luego 2.", (js) => /(?:addEventListener\s*\(\s*["']click["']|\.onclick\s*=)/.test(js) && /(?:\+\+|\+=\s*1|\+\s*1\b)/.test(js) && /\.(?:textContent|value|innerText)\s*=/.test(js))
        ],
        probe: () => {
          const btn = document.querySelector("#sumar");
          const total = document.querySelector("#total");
          if (!btn || !total) return false;
          btn.click();
          const first = total.textContent.trim();
          btn.click();
          return first === "1" && total.textContent.trim() === "2";
        },
        source: mdn + "Web/API/EventTarget/addEventListener"
      },
      {
        id: "js-formdata", title: "Leer datos de un formulario", minutes: 13,
        concept: "El evento submit reúne los envíos por botón y por teclado. Con FormData se leen los controles por su atributo name. preventDefault() permite mostrar una respuesta en la misma página.",
        explain: "Elige un turno y envía el ejemplo. El script recibe el evento, cancela la navegación y consulta el valor enviado. La región role=\"status\" comunica el cambio a quienes usan un lector de pantalla.",
        example: scripted(`<form id="turnos">\n  <label for="hora">Turno</label>\n  <select id="hora" name="hora"><option>Mañana</option><option>Tarde</option></select>\n  <button>Elegir</button>\n</form>\n<p id="aviso" role="status"></p>`, `const form = document.querySelector("#turnos");\nform.addEventListener("submit", (evento) => {\n  evento.preventDefault();\n  const hora = new FormData(form).get("hora");\n  document.querySelector("#aviso").textContent = "Turno: " + hora;\n});`),
        task: "Conecta el formulario de reserva. Al enviarlo, evita la navegación, lee curso mediante FormData y muestra «Reserva: Pintura» o «Reserva: Robótica» según la elección.",
        starter: scripted(workshopForm, `const form = document.querySelector("#reserva");\nconst salida = document.querySelector("#respuesta");\n// Atiende el envío y muestra el taller elegido.`),
        hints: ["Conecta form.addEventListener(\"submit\", ...) y usa evento.preventDefault() al inicio de la función.", "La consulta new FormData(form).get(\"curso\") devuelve el valor de la opción seleccionada."],
        solution: scripted(workshopForm, `const form = document.querySelector("#reserva");\nconst salida = document.querySelector("#respuesta");\nform.addEventListener("submit", (evento) => {\n  evento.preventDefault();\n  const curso = new FormData(form).get("curso");\n  salida.textContent = "Reserva: " + curso;\n});`),
        checks: [
          check("El formulario conserva el selector y la región de estado.", (doc) => doc.querySelectorAll('#reserva select[name="curso"] option').length >= 2 && present('#respuesta[role="status"]')(doc)),
          check("JavaScript lee el curso mediante FormData.", (doc) => /new\s+FormData\s*\(/.test(scriptText(doc)) && /\.get\s*\(\s*["']curso["']\s*\)/.test(scriptText(doc))),
          behavior("Cada elección produce su propia confirmación sin navegar.", (js) => /preventDefault\s*\(/.test(js) && /["'\x60]Reserva: /.test(js) && /(?:textContent|innerText)\s*=/.test(js))
        ],
        probe: () => {
          const form = document.querySelector("#reserva");
          const select = form?.querySelector("select");
          const status = document.querySelector("#respuesta");
          if (!select || !status) return false;
          return ["Pintura", "Robótica"].every((value) => {
            select.value = value;
            const event = new Event("submit", { bubbles: true, cancelable: true });
            form.dispatchEvent(event);
            return event.defaultPrevented && status.textContent.trim() === "Reserva: " + value;
          });
        },
        source: mdn + "Web/API/FormData/FormData"
      },
      {
        id: "js-listas", title: "Convertir datos en una lista", minutes: 13,
        concept: "Puedes construir elementos HTML a partir de los datos de un arreglo. createElement crea el nodo y append lo inserta en la página. textContent coloca cada valor como texto.",
        explain: "En el ejemplo, el recorrido crea un li por cada día. Añade un día al arreglo y observa que aparece automáticamente. Crear un li nuevo en cada vuelta permite que todos queden en la lista.",
        example: scripted(`<h2>Sesiones</h2>\n<ul id="sesiones"></ul>`, `const dias = ["Lunes", "Jueves"];\nconst lista = document.querySelector("#sesiones");\nfor (const dia of dias) {\n  const item = document.createElement("li");\n  item.textContent = dia;\n  lista.append(item);\n}`),
        task: "Recorre el arreglo de materiales y genera un li por dato dentro de #materiales. Conserva el orden «Papel», «Tinta», «Regla» y deja la lista inicial vacía en el HTML.",
        starter: scripted(listMarkup, `const materiales = ["Papel", "Tinta", "Regla"];\nconst lista = document.querySelector("#materiales");\n// Genera los elementos de la lista.`),
        hints: ["Usa for...of o forEach para recibir cada material por separado.", "En cada vuelta crea un li, asigna su textContent e insértalo en lista con append o appendChild."],
        solution: scripted(listMarkup, `const materiales = ["Papel", "Tinta", "Regla"];\nconst lista = document.querySelector("#materiales");\nfor (const material of materiales) {\n  const item = document.createElement("li");\n  item.textContent = material;\n  lista.append(item);\n}`),
        checks: [
          check("La lista del HTML empieza vacía.", (doc) => present("ul#materiales")(doc) && doc.querySelectorAll("#materiales > li").length === 0),
          check("El script crea elementos li con createElement.", (doc) => /createElement\s*\(\s*["']li["']\s*\)/i.test(scriptText(doc))),
          behavior("Al ejecutar aparecen los tres materiales en su orden.", (js) => /\bfor\s*\(|\.forEach\s*\(|\.map\s*\(/.test(js) && /\.append(?:Child)?\s*\(/.test(js) && /\.textContent\s*=/.test(js))
        ],
        probe: () => [...document.querySelectorAll("#materiales > li")].map((item) => item.textContent.trim()).join("|") === "Papel|Tinta|Regla",
        source: mdn + "Web/API/Document/createElement"
      }
    ]
  };

  const templateMarkup = `<template id="ficha">\n  <article><h2></h2><p>Plazas limitadas.</p></article>\n</template>\n<main id="cartelera"></main>`;
  const componentMarkup = `<template id="plantilla">\n  <style>strong { color: teal; }</style>\n  <strong><slot></slot></strong>\n</template>\n<tema-curso>HTML</tema-curso>\n<tema-curso>CSS</tema-curso>`;
  const platformModule = {
    id: "plataforma", title: "Plataforma web moderna", icon: "orbit", color: "mint",
    description: "Crea interacciones nativas, plantillas y componentes web reutilizables.",
    lessons: [
      {
        id: "web-popover", title: "Ayuda contextual con popover", minutes: 9,
        concept: "Popover permite mostrar información temporal sobre el resto de la interfaz. Un botón puede abrir o cerrar el panel mediante atributos HTML.",
        explain: "En el ejemplo popovertarget coincide con el id del panel, sin almohadilla. Abre la ayuda y pulsa Escape o haz clic fuera para cerrarla. El resto de la página sigue disponible mientras se muestra.",
        example: `<button type="button" popovertarget="glosario">¿Qué es un píxel?</button>\n<aside id="glosario" popover>\n  Unidad de referencia usada en CSS.\n</aside>`,
        task: "Haz que «Ver requisitos» abra el aviso #requisitos usando popovertarget y popover. Añade también un botón «Cerrar» dentro del aviso que lo oculte con popovertargetaction.",
        starter: `<button type="button">Ver requisitos</button>\n<aside id="requisitos">\n  <p>Trae un cuaderno y un lápiz.</p>\n</aside>`,
        hints: ["Añade popover al aside y popovertarget=\"requisitos\" al botón que lo abre.", "El botón interior usa el mismo popovertarget y popovertargetaction=\"hide\"."],
        solution: `<button type="button" popovertarget="requisitos">Ver requisitos</button>\n<aside id="requisitos" popover>\n  <p>Trae un cuaderno y un lápiz.</p>\n  <button type="button" popovertarget="requisitos" popovertargetaction="hide">Cerrar</button>\n</aside>`,
        checks: [
          check("El aviso se declara como popover.", present("aside#requisitos[popover]")),
          check("Un botón externo abre el panel correcto.", (doc) => [...doc.querySelectorAll('button[popovertarget="requisitos"]')].some((button) => !button.closest("#requisitos") && ["toggle", "show"].includes(button.getAttribute("popovertargetaction") || "toggle") && button.textContent.trim())),
          check("Un botón con nombre permite cerrar el aviso.", (doc) => Boolean(doc.querySelector('#requisitos button[popovertarget="requisitos"][popovertargetaction="hide"]')?.textContent.trim()))
        ], source: mdn + "Web/HTML/Reference/Global_attributes/popover"
      },
      {
        id: "web-dialogo", title: "Diálogos y foco", minutes: 11,
        concept: "El elemento dialog representa una ventana de diálogo. showModal() la abre por encima de la página y limita la interacción al diálogo mientras esté abierto.",
        explain: "Abre el ejemplo con el teclado y ciérralo con Escape o con su botón. El formulario interno usa method=\"dialog\" para cerrar. Un nombre accesible asociado al título comunica de qué trata la ventana.",
        example: scripted(`<button id="abrir">Ver condiciones</button>\n<dialog id="condiciones" aria-labelledby="titulo">\n  <h2 id="titulo">Condiciones</h2>\n  <p>La visita dura una hora.</p>\n  <form method="dialog"><button>Cerrar</button></form>\n</dialog>`, `document.querySelector("#abrir").addEventListener("click", () => {\n  document.querySelector("#condiciones").showModal();\n});`),
        task: "Completa la ficha de horario. El botón ya ejecuta showModal() sobre #horario. Añade un dialog con ese id, enlázalo al h2 «Horario» con aria-labelledby y permite cerrarlo con un formulario method=\"dialog\".",
        starter: scripted(`<button id="ver">Ver horario</button>\n<!-- Construye el diálogo aquí. -->`, `document.querySelector("#ver").addEventListener("click", () => {\n  document.querySelector("#horario").showModal();\n});`),
        hints: ["Agrupa el título, el horario y el botón de cierre dentro de <dialog id=\"horario\">.", "Si el h2 tiene id=\"titulo\", el dialog lleva aria-labelledby=\"titulo\". Dentro del form usa un button de envío."],
        solution: scripted(`<button id="ver">Ver horario</button>\n<dialog id="horario" aria-labelledby="titulo">\n  <h2 id="titulo">Horario</h2>\n  <p>Viernes de 14:00 a 16:00.</p>\n  <form method="dialog"><button>Cerrar</button></form>\n</dialog>`, `document.querySelector("#ver").addEventListener("click", () => {\n  document.querySelector("#horario").showModal();\n});`),
        checks: [
          check("El diálogo obtiene su nombre del h2 «Horario».", (doc) => {
            const dialog = doc.querySelector("dialog#horario");
            const title = doc.getElementById(dialog?.getAttribute("aria-labelledby") || "");
            return Boolean(title?.matches("h2") && dialog.contains(title) && title.textContent.trim().toLowerCase() === "horario");
          }),
          check("El diálogo incluye un control de cierre.", (doc) => Boolean(doc.querySelector('#horario form[method="dialog"] button:not([type]), #horario form[method="dialog"] button[type="submit"]')?.textContent.trim())),
          behavior("El botón abre el horario como diálogo modal.", (js, doc) => present("button#ver")(doc) && present("dialog#horario")(doc) && /showModal\s*\(\s*\)/.test(js))
        ],
        probe: () => {
          const dialog = document.querySelector("dialog#horario");
          const btn = document.querySelector("button#ver");
          if (!dialog || !btn) return false;
          btn.click();
          return dialog.open && dialog.matches(":modal");
        }, source: mdn + "Web/HTML/Reference/Elements/dialog"
      },
      {
        id: "web-template", title: "Reutilizar un fragmento con template", minutes: 12,
        concept: "El contenido de template se mantiene fuera de la página visible hasta que se clona e inserta. Su propiedad content expone un fragmento con los nodos de la plantilla.",
        explain: "Observa que el ejemplo muestra una sola nota aunque su forma aparece también dentro de template. cloneNode(true) copia todo el contenido. Usa la copia para escribir el texto antes de insertarla.",
        example: scripted(`<template id="nota"><p><strong></strong></p></template>\n<section id="muro"></section>`, `const plantilla = document.querySelector("#nota");\nconst copia = plantilla.content.cloneNode(true);\ncopia.querySelector("strong").textContent = "Entregar el viernes";\ndocument.querySelector("#muro").append(copia);`),
        task: "Crea dos fichas a partir de #ficha dentro de #cartelera. Usa una copia independiente por curso y asigna los títulos «Dibujo» y «Fotografía» en ese orden.",
        starter: scripted(templateMarkup, `const cursos = ["Dibujo", "Fotografía"];\nconst plantilla = document.querySelector("#ficha");\nconst cartelera = document.querySelector("#cartelera");\n// Genera una ficha por curso.`),
        hints: ["Recorre cursos y clona plantilla.content con cloneNode(true) en cada vuelta.", "Busca h2 dentro de la copia, escribe el título e inserta la copia con cartelera.append(copia)."],
        solution: scripted(templateMarkup, `const cursos = ["Dibujo", "Fotografía"];\nconst plantilla = document.querySelector("#ficha");\nconst cartelera = document.querySelector("#cartelera");\nfor (const curso of cursos) {\n  const copia = plantilla.content.cloneNode(true);\n  copia.querySelector("h2").textContent = curso;\n  cartelera.append(copia);\n}`),
        checks: [
          check("La plantilla contiene una ficha con título.", (doc) => Boolean(doc.querySelector("template#ficha")?.content.querySelector("article h2"))),
          check("El código clona el contenido de la plantilla.", (doc) => /\.content\b/.test(scriptText(doc)) && /cloneNode\s*\(\s*true\s*\)/.test(scriptText(doc))),
          behavior("La cartelera muestra dos fichas con los títulos correctos.", (js) => /\.append(?:Child)?\s*\(/.test(js) && /\.textContent\s*=/.test(js) && /\bfor\s*\(|\.forEach\s*\(|\.map\s*\(/.test(js))
        ],
        probe: () => [...document.querySelectorAll("#cartelera > article h2")].map((el) => el.textContent.trim()).join("|") === "Dibujo|Fotografía",
        source: mdn + "Web/HTML/Reference/Elements/template"
      },
      {
        id: "web-componentes", title: "Componentes web y slots", minutes: 15,
        concept: "Puedes registrar una etiqueta propia con customElements.define(). Una clase que extiende HTMLElement define su comportamiento. El guion del nombre distingue las etiquetas personalizadas.",
        explain: "El ejemplo adjunta un árbol de sombra para alojar la presentación del componente. El slot muestra el texto que escribiste entre sus etiquetas. Si el elemento se conecta otra vez, la comprobación de shadowRoot evita crearlo dos veces.",
        example: scripted(`<marca-nota>Nuevo</marca-nota>\n<marca-nota>Revisado</marca-nota>`, `class MarcaNota extends HTMLElement {\n  connectedCallback() {\n    if (this.shadowRoot) return;\n    const raiz = this.attachShadow({ mode: "open" });\n    raiz.innerHTML = "<mark><slot></slot></mark>";\n  }\n}\ncustomElements.define("marca-nota", MarcaNota);`),
        task: "Registra la etiqueta tema-curso. Al conectarse cada instancia, crea su sombra abierta e inserta una copia de #plantilla. Comprueba que «HTML» y «CSS» aparecen en color teal mediante el slot.",
        starter: scripted(componentMarkup, `class TemaCurso extends HTMLElement {\n  connectedCallback() {\n    if (this.shadowRoot) return;\n    // Crea la raíz de sombra y añade la plantilla.\n  }\n}\n// Registra la etiqueta.`),
        hints: ["this.attachShadow({ mode: \"open\" }) devuelve el nodo donde puedes insertar la copia.", "Clona document.querySelector(\"#plantilla\").content y llama a customElements.define(\"tema-curso\", TemaCurso) fuera de la clase."],
        solution: scripted(componentMarkup, `class TemaCurso extends HTMLElement {\n  connectedCallback() {\n    if (this.shadowRoot) return;\n    const raiz = this.attachShadow({ mode: "open" });\n    const plantilla = document.querySelector("#plantilla");\n    raiz.append(plantilla.content.cloneNode(true));\n  }\n}\ncustomElements.define("tema-curso", TemaCurso);`),
        checks: [
          check("La plantilla ofrece un slot y la página incluye dos instancias.", (doc) => Boolean(doc.querySelector("template#plantilla")?.content.querySelector("strong slot")) && doc.querySelectorAll("tema-curso").length === 2),
          check("Se registra la etiqueta tema-curso.", (doc) => /customElements\.define\s*\(\s*["']tema-curso["']\s*,/.test(scriptText(doc))),
          behavior("Las dos sombras proyectan el texto de cada componente.", (js) => /attachShadow\s*\(/.test(js) && /cloneNode\s*\(\s*true\s*\)/.test(js) && /\.append(?:Child)?\s*\(/.test(js))
        ],
        probe: () => {
          const hosts = [...document.querySelectorAll("tema-curso")];
          const labels = hosts.map((host) => {
            const slot = host.shadowRoot?.querySelector("strong slot");
            return slot?.assignedNodes().map((node) => node.textContent).join("").trim();
          });
          return labels.join("|") === "HTML|CSS";
        }, source: mdn + "Web/API/Web_components/Using_templates_and_slots"
      },
      {
        id: "web-proyecto-taller", title: "Proyecto final · Agenda de talleres", minutes: 22,
        concept: "Una ficha de evento combina la estructura semántica, una fecha interpretable, estilos y ayuda contextual. Cada pieza resuelve una necesidad concreta de la persona que consulta la agenda.",
        explain: "Explora la ficha de muestra. El elemento time guarda la fecha en formato ISO aunque el texto visible sea natural. details expone información adicional con teclado. El reto añade una interacción independiente para consultar los materiales.",
        example: styled(`.evento { border: 1px solid teal; border-radius: 12px; padding: 16px; }`, `<main>\n  <h1>Agenda del centro</h1>\n  <article class="evento">\n    <h2>Fotografía de paisaje</h2>\n    <time datetime="2026-06-12">12 de junio de 2026</time>\n    <details><summary>Programa</summary><p>Luz, encuadre y práctica.</p></details>\n  </article>\n</main>`),
        task: "Crea la ficha de «Encuadernación» dentro de main. Usa h1 para la agenda, h2 para el taller y time con datetime 2026-09-18. En .evento aplica al menos 12 px de relleno. Añade un details con su programa y un botón que abra un popover con los materiales.",
        starter: styled(`.evento { border: 1px solid teal; border-radius: 12px; }`, `<main>\n  <h1>Agenda de talleres</h1>\n  <article class="evento">\n    <!-- Añade la ficha de Encuadernación. -->\n  </article>\n</main>`),
        hints: ["Comienza por el título y la fecha. Escribe en datetime el valor ISO y entre las etiquetas time una fecha legible.", "Dentro de details, usa summary para el control y un párrafo para describir el programa.", "Añade un botón con popovertarget=\"materiales\" y un bloque con id=\"materiales\" y popover. Incluye la lista o el texto de los materiales."],
        solution: styled(`.evento {\n  border: 1px solid teal;\n  border-radius: 12px;\n  padding: 16px;\n}`, `<main>\n  <h1>Agenda de talleres</h1>\n  <article class="evento">\n    <h2>Encuadernación</h2>\n    <time datetime="2026-09-18">18 de septiembre de 2026</time>\n    <details>\n      <summary>Programa</summary>\n      <p>Preparar los pliegos y coser el cuaderno.</p>\n    </details>\n    <button type="button" popovertarget="materiales">Ver materiales</button>\n    <aside id="materiales" popover>Papel, cartón e hilo.</aside>\n  </article>\n</main>`),
        checks: [
          check("La agenda tiene título y una ficha de «Encuadernación».", (doc) => Boolean(doc.querySelector("main h1")?.textContent.trim() && doc.querySelector("main article.evento h2")?.textContent.trim().toLowerCase() === "encuadernación")),
          check("La ficha muestra una fecha legible con su valor ISO.", (doc) => Boolean(doc.querySelector('.evento time[datetime="2026-09-18"]')?.textContent.trim())),
          check("El relleno es de al menos 12 px en los cuatro lados.", (doc) => ["top", "right", "bottom", "left"].every((side) => {
            const value = css(doc, ".evento", "padding-" + side);
            return /^\d+(?:\.\d+)?px$/.test(value) && parseFloat(value) >= 12;
          })),
          check("El programa puede desplegarse y contiene una descripción.", (doc) => {
            const details = doc.querySelector(".evento details");
            const summary = details?.querySelector("summary");
            return Boolean(summary?.textContent.trim() && details.textContent.replace(summary.textContent, "").trim());
          }),
          check("Un botón de la ficha abre un popover con contenido.", (doc) => [...doc.querySelectorAll(".evento button[popovertarget]")].some((button) => {
            const target = doc.getElementById(button.getAttribute("popovertarget"));
            return target?.hasAttribute("popover") && target.textContent.trim() && button.textContent.trim() && ["toggle", "show"].includes(button.getAttribute("popovertargetaction") || "toggle");
          }))
        ], source: mdn + "Web/API/Popover_API/Using"
      }
    ]
  };

  window.COURSE.push(cssModule, bootstrapModule, jsModule, platformModule);
})();
