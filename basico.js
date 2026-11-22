(() => {
  'use strict';

  const reference = 'https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/';
  const htmlGuide = 'https://developer.mozilla.org/es/docs/Learn_web_development/Core/Structuring_content';
  const wai = 'https://www.w3.org/WAI/tutorials/';
  const check = (label, test) => ({ label, test });
  const has = (label, selector) => check(label, doc => !!doc.querySelector(selector));
  const textOf = node => (node?.textContent || '').trim().replace(/\s+/g, ' ');
  const normal = value => value.toLocaleLowerCase('es');
  const matchesText = (node, value) => normal(textOf(node)) === normal(value);
  const named = (label, selector, value) => check(label, doc =>
    Array.from(doc.querySelectorAll(selector)).some(node => matchesText(node, value)));
  const filled = (label, selector, count = 1) => check(label, doc =>
    Array.from(doc.querySelectorAll(selector)).filter(node => textOf(node).length > 0).length >= count);
  const labeled = (doc, selector) => {
    const input = doc.querySelector(selector);
    return !!input && Array.from(input.labels || []).some(label => textOf(label).length > 0);
  };
  const landscape = 'assets/paisaje.svg';
  const closeup = 'assets/paisaje-cerca.svg';
  const audio = 'assets/tono.wav';
  const video = 'https://developer.mozilla.org/shared-assets/videos/flower.mp4';
  const captions = 'assets/subtitulos.vtt';

  const fundamentos = {
    id: 'fundamentos', title: 'Fundamentos de HTML', icon: 'code', color: 'mint',
    description: 'Escribe tu primera página y conecta sus partes con enlaces.',
    lessons: [
      {
        id: 'primeras-etiquetas', title: 'Tus primeras etiquetas', minutes: 5,
        concept: 'HTML le dice al navegador qué representa cada parte de una página. Un h1 presenta el título principal y un p agrupa una idea en un párrafo. El texto entre las etiquetas es lo que leerá quien visite la página.',
        explain: 'En el ejemplo, cambia «Mi cuaderno» por tu propio título y observa la vista previa. La barra de </h1> marca el final del título. Escribe el párrafo después de ese cierre para que ambas piezas queden separadas.',
        example: `<h1>Mi cuaderno</h1>
<p>Aquí guardo lo que aprendo.</p>`,
        task: 'Presenta una página de proyectos. Escribe «Mis proyectos» como título principal y añade debajo un párrafo con algo que te gustaría construir.',
        starter: '<!-- Escribe aquí tu título y tu párrafo. -->',
        hints: ['Rodea el título con <h1> y </h1>.', 'Después del título, escribe una frase entre <p> y </p>.'],
        solution: `<h1>Mis proyectos</h1>
<p>Quiero construir una página para compartir mis recetas.</p>`,
        checks: [
          named('Hay un h1 con el texto «Mis proyectos».', 'h1', 'Mis proyectos'),
          check('Después del título aparece un párrafo con texto.', d => Array.from(d.querySelectorAll('h1 ~ p')).some(p => textOf(p).length > 0))
        ], source: reference + 'Heading_Elements'
      },
      {
        id: 'anidacion-y-atributos', title: 'Anidación y atributos', minutes: 6,
        concept: 'Puedes colocar un elemento dentro de otro. En un párrafo, strong identifica una parte importante de la frase. Los elementos se cierran desde el más interno hacia afuera, igual que al cerrar paréntesis.',
        explain: 'Un atributo se escribe en la etiqueta de apertura. Aquí lang indica el idioma de una expresión concreta para que un lector de pantalla pueda ajustar la pronunciación. Cambia la palabra inglesa por otra y conserva el atributo en el elemento que la contiene.',
        example: `<p>Guarda una <strong>copia de seguridad</strong>.</p>
<p>En inglés se llama <span lang="en">backup</span>.</p>`,
        task: 'Escribe un párrafo sobre una tarea importante. Marca una parte con strong y encierra el término inglés «deadline» en un span con su idioma.',
        starter: '<p>Recuerda revisar la fecha de entrega. En inglés se llama deadline.</p>',
        hints: ['Abre y cierra strong dentro del párrafo.', 'El código de idioma inglés es en y se declara con lang.'],
        solution: '<p>Recuerda <strong>revisar la fecha de entrega</strong>. En inglés se llama <span lang="en">deadline</span>.</p>',
        checks: [filled('El párrafo contiene un strong con texto.', 'p strong'), named('Un span dentro del párrafo identifica «deadline» en inglés.', 'p span[lang|="en" i]', 'deadline')],
        source: reference + 'span'
      },
      {
        id: 'documento-html', title: 'El documento completo', minutes: 8,
        concept: 'Un archivo HTML completo empieza con <!doctype html>. El elemento html contiene head y body. En head van datos sobre la página, como su título de pestaña. En body va lo que se ve dentro de la ventana.',
        explain: 'Compara title con h1. Aunque puedan tener el mismo texto, el navegador los muestra en lugares diferentes. En un archivo independiente, guárdalo como index.html y ábrelo para ver el título en la pestaña.',
        example: `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Bitácora de campo</title>
  </head>
  <body>
    <h1>Excursión de hoy</h1>
  </body>
</html>`,
        task: 'Construye el documento completo de una biblioteca. Declara el idioma español y UTF-8. Usa «Biblioteca» en la pestaña y «Libros recomendados» como encabezado visible.',
        starter: '<!-- Construye el documento desde la declaración inicial. -->',
        hints: ['Después del doctype escribe <html lang="es">. Dentro coloca head y body.', 'Pon meta y title en el head. Escribe el h1 en el body.'],
        solution: `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Biblioteca</title>
  </head>
  <body>
    <h1>Libros recomendados</h1>
  </body>
</html>`,
        checks: [
          check('El documento declara HTML y su idioma español.', d => d.doctype?.name === 'html' && /^es(-|$)/i.test(d.documentElement.lang)),
          check('El código incluye head y body explícitos.', (d, code) => /<head(?:\s[^>]*)?>/i.test(code) && /<body(?:\s[^>]*)?>/i.test(code)),
          has('El head declara la codificación UTF-8.', 'head meta[charset="utf-8" i]'),
          named('El título de pestaña dice «Biblioteca».', 'head title', 'Biblioteca'),
          named('El h1 visible dice «Libros recomendados».', 'body h1', 'Libros recomendados')
        ], source: htmlGuide
      },
      {
        id: 'metadatos-moviles', title: 'Metadatos y pantallas móviles', minutes: 6,
        concept: 'Los metadatos describen el documento. La etiqueta meta con name="description" ofrece un resumen que un buscador puede usar en sus resultados. La de viewport indica cómo adaptar el área de dibujo al ancho del dispositivo.',
        explain: 'Estos cambios pertenecen al head y normalmente no producen texto visible en la vista previa. width=device-width usa el ancho del dispositivo y initial-scale=1 parte de una escala inicial de uno. El usuario conserva la posibilidad de ampliar.',
        example: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="description" content="Un calendario de caminatas por el bosque.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Caminatas</title>
</head>
<body><h1>Próximas caminatas</h1></body>
</html>`,
        task: 'Completa el head de un recetario con una descripción propia y un viewport que use el ancho real del dispositivo y escala inicial 1.',
        starter: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Recetario</title>
</head>
<body><h1>Recetario de casa</h1></body>
</html>`,
        hints: ['Escribe dos etiquetas meta. Cada una necesita name y content.', 'En el viewport separa width=device-width e initial-scale=1 con una coma.'],
        solution: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Recetario</title>
  <meta name="description" content="Recetas caseras con ingredientes de temporada.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body><h1>Recetario de casa</h1></body>
</html>`,
        checks: [
          check('El head contiene una descripción con texto.', d => !!d.querySelector('head meta[name="description" i]')?.content.trim()),
          check('El viewport incluye ancho del dispositivo y escala inicial 1.', d => {
            const value = d.querySelector('head meta[name="viewport" i]')?.content || '';
            return /(?:^|,)\s*width\s*=\s*device-width\s*(?:,|$)/i.test(value) && /(?:^|,)\s*initial-scale\s*=\s*1(?:\.0+)?\s*(?:,|$)/i.test(value);
          })
        ], source: reference + 'meta'
      },
      {
        id: 'enlaces-y-rutas', title: 'Enlaces y rutas', minutes: 7,
        concept: 'Un enlace combina un destino en href y un texto que anticipa adónde lleva. Una URL absoluta incluye el protocolo y el dominio. Una ruta relativa parte de la ubicación del documento, de modo que puedes mover el proyecto completo y mantener sus enlaces internos.',
        explain: 'En el ejemplo, un enlace apunta al archivo dentro de assets y otro a un sitio externo. El prefijo ./ significa «esta carpeta» y ../ significa «un nivel arriba». Evita usar rutas de tu disco personal, que solo existen en tu equipo.',
        example: `<p><a href="./assets/paisaje.svg">Abrir la ilustración del paisaje</a></p>
<p><a href="https://www.w3.org/">Visitar el W3C</a></p>`,
        task: 'Prepara dos enlaces para un centro de recursos. Uno debe abrir assets/tono.wav mediante una ruta relativa y otro debe abrir https://developer.mozilla.org/ con un texto descriptivo.',
        starter: '<h1>Centro de recursos</h1>',
        hints: ['Cada destino necesita su propio elemento a con href.', 'Puedes usar «Escuchar el tono de muestra» y «Consultar MDN» como textos.'],
        solution: `<h1>Centro de recursos</h1>
<p><a href="assets/tono.wav">Escuchar el tono de muestra</a></p>
<p><a href="https://developer.mozilla.org/">Consultar MDN</a></p>`,
        checks: [
          check('Un enlace con texto usa la ruta relativa del audio.', d => Array.from(d.querySelectorAll('a[href]')).some(a => /^(?:\.\/)?assets\/tono\.wav$/.test(a.getAttribute('href')) && !!textOf(a))),
          check('Otro enlace con texto apunta al sitio de MDN por HTTPS.', d => Array.from(d.querySelectorAll('a[href]')).some(a => /^https:\/\/developer\.mozilla\.org\/?$/i.test(a.getAttribute('href')) && !!textOf(a)))
        ], source: reference + 'a'
      },
      {
        id: 'saltos-en-la-pagina', title: 'Saltar a una sección', minutes: 5,
        concept: 'El atributo id identifica un elemento dentro de la página y debe ser único. Al colocar ese identificador después de # en href, el enlace dirige al visitante a ese punto del documento.',
        explain: 'Observa cómo el enlace del ejemplo y el encabezado comparten la palabra materiales. El signo # solo aparece en el destino del enlace. Un índice de artículos o una pregunta frecuente pueden enlazarse de la misma manera.',
        example: `<a href="#materiales">Ir a materiales</a>
<h1>Montar una estantería</h1>
<p>Antes de empezar, prepara la mesa.</p>
<h2 id="materiales">Materiales</h2>
<p>Tablones, tornillos y una llave.</p>`,
        task: 'Crea un acceso a «Horarios». Usa #horarios en un enlace con texto y asigna ese identificador a un h2 titulado «Horarios».',
        starter: '<h1>Agenda del taller</h1>',
        hints: ['Prueba con <a href="#horarios">Ver horarios</a>.', 'El elemento de llegada necesita id="horarios" sin el signo #.'],
        solution: `<h1>Agenda del taller</h1>
<a href="#horarios">Ver horarios</a>
<h2 id="horarios">Horarios</h2>
<p>El taller comienza a las nueve.</p>`,
        checks: [filled('Hay un enlace a #horarios con texto.', 'a[href="#horarios"]'), named('El destino es un h2 llamado «Horarios».', 'h2[id="horarios"]', 'Horarios'), check('El identificador aparece una sola vez.', d => d.querySelectorAll('[id="horarios"]').length === 1)],
        source: reference + 'a'
      }
    ]
  };

  const contenido = {
    id: 'contenido', title: 'Contenido y semántica', icon: 'layout', color: 'blue',
    description: 'Organiza textos, listas y secciones para personas y lectores de pantalla.',
    lessons: [
      {
        id: 'jerarquia-de-titulos', title: 'Jerarquía de títulos', minutes: 6,
        concept: 'La secuencia h1, h2 y h3 expresa niveles de una estructura. Un h1 anuncia el tema de la página, un h2 introduce una sección principal y un h3 abre una subsección dentro de ella. Esta jerarquía también facilita recorrer el contenido con un lector de pantalla.',
        explain: 'Lee únicamente los encabezados del ejemplo. Juntos forman un índice comprensible. Si quieres cambiar el tamaño de las letras, usa CSS y conserva el nivel que corresponde al contenido.',
        example: `<h1>Huerto escolar</h1>
<section>
  <h2>Siembra de primavera</h2>
  <h3>Preparar el suelo</h3>
  <p>Retira piedras y añade compost.</p>
</section>`,
        task: 'Crea el índice de un curso. Coloca «Fotografía» en el nivel principal, «Iluminación» como sección y «Luz natural» como subsección.',
        starter: '<!-- Dale a cada título su nivel. -->',
        hints: ['El título de la página utiliza h1.', 'La sección usa h2 y su subsección usa h3. Sigue ese orden.'],
        solution: `<h1>Fotografía</h1>
<section>
  <h2>Iluminación</h2>
  <h3>Luz natural</h3>
  <p>Busca una ventana y compara las sombras.</p>
</section>`,
        checks: [named('Fotografía es el h1.', 'h1', 'Fotografía'), named('Iluminación es un h2.', 'h2', 'Iluminación'), named('Luz natural es un h3.', 'h3', 'Luz natural'), check('Los tres niveles aparecen en orden.', d => {
          const headings = Array.from(d.querySelectorAll('h1,h2,h3')).map(e => e.tagName);
          return headings.join(' ').includes('H1 H2 H3');
        })], source: wai + 'page-structure/headings/'
      },
      {
        id: 'listas-de-pasos', title: 'Listas y secuencias', minutes: 6,
        concept: 'Usa ul para una colección en la que el orden es intercambiable y ol cuando los pasos deben seguir una secuencia. En ambos casos, cada elemento de la lista se escribe dentro de li.',
        explain: 'Prueba a intercambiar dos ingredientes del ejemplo y después dos pasos. Solo uno de los cambios altera el procedimiento. Si una lista necesita subpuntos, coloca la lista interna dentro del li al que pertenece.',
        example: `<h2>Ingredientes</h2>
<ul>
  <li>Agua</li>
  <li>Café molido</li>
</ul>
<h2>Preparación</h2>
<ol>
  <li>Calienta el agua.</li>
  <li>Vierte el agua sobre el café.</li>
</ol>`,
        task: 'Escribe una guía para plantar una semilla. Crea una lista de al menos dos materiales y otra lista ordenada con tres o más pasos.',
        starter: '<h1>Plantar una semilla</h1>\n<h2>Materiales</h2>\n\n<h2>Pasos</h2>',
        hints: ['Para los materiales, usa ul con un li por material.', 'Para la secuencia, usa ol con un li por paso.'],
        solution: `<h1>Plantar una semilla</h1>
<h2>Materiales</h2>
<ul><li>Maceta</li><li>Tierra</li><li>Semilla</li></ul>
<h2>Pasos</h2>
<ol>
  <li>Llena la maceta con tierra.</li>
  <li>Entierra la semilla.</li>
  <li>Riega con un poco de agua.</li>
</ol>`,
        checks: [check('Una misma ul contiene al menos dos materiales.', d => Array.from(d.querySelectorAll('ul')).some(list => Array.from(list.children).filter(el => el.tagName === 'LI' && textOf(el)).length >= 2)), check('Una misma ol contiene tres pasos con texto.', d => Array.from(d.querySelectorAll('ol')).some(list => Array.from(list.children).filter(el => el.tagName === 'LI' && textOf(el)).length >= 3))],
        source: reference + 'ol'
      },
      {
        id: 'terminos-y-definiciones', title: 'Glosarios y definiciones', minutes: 5,
        concept: 'Una lista de descripciones dl agrupa términos y sus explicaciones. Cada dt introduce el término y cada dd aporta su descripción. Esta estructura funciona para glosarios, pares de propiedades y datos de una ficha.',
        explain: 'Observa que el nombre y la explicación son elementos hermanos. Si quieres añadir otro significado al mismo término, puedes escribir un segundo dd antes del siguiente dt.',
        example: `<dl>
  <dt>Etiqueta</dt>
  <dd>Marca que delimita o introduce un elemento HTML.</dd>
  <dt>Atributo</dt>
  <dd>Dato que configura un elemento.</dd>
</dl>`,
        task: 'Construye un glosario de dos entradas. Usa «HTML» y «CSS» como términos y explica con tus palabras para qué sirve cada uno.',
        starter: '<h2>Glosario web</h2>\n<dl>\n  <!-- Añade tus términos y explicaciones. -->\n</dl>',
        hints: ['Escribe un dt para cada término.', 'Coloca un dd con su explicación justo después de cada dt.'],
        solution: `<h2>Glosario web</h2>
<dl>
  <dt>HTML</dt>
  <dd>Define la estructura de un documento.</dd>
  <dt>CSS</dt>
  <dd>Controla la presentación de sus elementos.</dd>
</dl>`,
        checks: ['HTML','CSS'].map(term => check('El término ' + term + ' tiene su propia definición.', d =>
          Array.from(d.querySelectorAll('dl dt')).some(dt => matchesText(dt, term) && dt.nextElementSibling?.tagName === 'DD' && !!textOf(dt.nextElementSibling)))),
        source: reference + 'dl'
      },
      {
        id: 'regiones-de-pagina', title: 'Regiones de una página', minutes: 8,
        concept: 'Los elementos semánticos identifican la función de cada región. header presenta una página o sección, nav agrupa enlaces de navegación, main contiene el contenido principal y footer incluye información de cierre.',
        explain: 'En el ejemplo hay un único main visible. Síguelo desde el enlace del menú hasta el encabezado de destino. Un lector de pantalla también puede saltar directamente a regiones de navegación y contenido principal.',
        example: `<header><h1>Club de lectura</h1></header>
<nav><a href="#encuentros">Encuentros</a></nav>
<main>
  <h2 id="encuentros">Encuentros del mes</h2>
  <p>Nos reunimos el primer viernes.</p>
</main>
<footer>Biblioteca del barrio</footer>`,
        task: 'Organiza una página para un museo. Incluye un h1 dentro de header, un nav con enlace a #salas, un único main con un h2 de destino y un footer con texto.',
        starter: '<!-- Organiza la página del museo en regiones. -->',
        hints: ['El enlace del nav lleva href="#salas" y el h2 del main lleva id="salas".', 'Escribe el nombre del museo en header y algún dato de cierre en footer.'],
        solution: `<header><h1>Museo de historia</h1></header>
<nav><a href="#salas">Recorrer las salas</a></nav>
<main>
  <h2 id="salas">Salas del museo</h2>
  <p>La primera sala presenta herramientas antiguas.</p>
</main>
<footer>Entrada por la plaza central.</footer>`,
        checks: [filled('Header contiene un h1 con texto.', 'header h1'), filled('Nav contiene un enlace a #salas.', 'nav a[href="#salas"]'), check('Existe un único main con el h2 de destino.', d => d.querySelectorAll('main').length === 1 && !!textOf(d.querySelector('main h2#salas'))), filled('El footer contiene información de cierre.', 'footer')],
        source: wai + 'page-structure/regions/'
      },
      {
        id: 'articulos-y-fechas', title: 'Artículos, secciones y fechas', minutes: 7,
        concept: 'Un article representa una pieza que se podría compartir por separado, como una noticia o reseña. Una section agrupa contenido sobre un tema. Dentro de un artículo, time permite mostrar una fecha legible y registrar su valor preciso en datetime.',
        explain: 'La noticia del ejemplo puede aparecer sola o en un listado. Cambia la fecha visible y ajusta el valor datetime con año, mes y día. Así se conserva tanto la lectura natural como el valor que pueden interpretar las aplicaciones.',
        example: `<section>
  <h1>Noticias del club</h1>
  <article>
    <h2>Abre el taller de dibujo</h2>
    <time datetime="2026-05-12">12 de mayo de 2026</time>
    <p>Habrá materiales para principiantes.</p>
  </article>
</section>`,
        task: 'Redacta una noticia breve para el 4 de junio de 2026. Usa article con un h2, un párrafo y una fecha legible marcada con time y su valor de calendario.',
        starter: '<article>\n  <!-- Publica aquí tu noticia. -->\n</article>',
        hints: ['El formato de datetime es AAAA-MM-DD.', 'Coloca el titular, la fecha y el párrafo dentro del artículo.'],
        solution: `<article>
  <h2>Se inaugura la biblioteca</h2>
  <time datetime="2026-06-04">4 de junio de 2026</time>
  <p>El catálogo inicial reúne cien libros.</p>
</article>`,
        checks: [filled('El artículo tiene un titular h2.', 'article h2'), filled('El artículo tiene un párrafo.', 'article p'), filled('La fecha usa el valor 2026-06-04 y muestra texto.', 'article time[datetime="2026-06-04"]')],
        source: reference + 'article'
      },
      {
        id: 'detalles-desplegables', title: 'Preguntas desplegables', minutes: 6,
        concept: 'El navegador ya incorpora un control que se abre y se cierra. details contiene el contenido y su primer hijo summary proporciona el texto que el visitante activa con el ratón o el teclado.',
        explain: 'Activa la pregunta del ejemplo y vuelve a cerrarla. Añadir open a details la muestra abierta al cargar. En un conjunto de preguntas frecuentes, cada respuesta puede tener su propio desplegable.',
        example: `<details>
  <summary>¿Necesito experiencia?</summary>
  <p>Puedes empezar desde cero.</p>
</details>`,
        task: 'Crea una pregunta frecuente sobre horarios que se vea abierta al cargar. La pregunta debe estar en summary y la respuesta en un párrafo dentro de details.',
        starter: '<h2>Preguntas frecuentes</h2>',
        hints: ['Empieza con <details open>.', 'Escribe summary antes del párrafo y cierra el details al final.'],
        solution: `<h2>Preguntas frecuentes</h2>
<details open>
  <summary>¿Cuál es el horario?</summary>
  <p>Abrimos de ocho a cuatro.</p>
</details>`,
        checks: [filled('El primer elemento de un details abierto es una pregunta.', 'details[open] > summary:first-child'), filled('El desplegable contiene la respuesta después de summary.', 'details[open] > summary ~ p')],
        source: reference + 'details'
      }
    ]
  };

  const multimedia = {
    id: 'multimedia', title: 'Multimedia y tablas', icon: 'image', color: 'amber',
    description: 'Integra imágenes, sonido, video y tablas que se puedan explorar.',
    lessons: [
      {
        id: 'imagenes-y-texto-alternativo', title: 'Imágenes y texto alternativo', minutes: 7,
        concept: 'En una imagen, src identifica el archivo y alt comunica la información que aporta en ese contexto. Una ilustración informativa necesita una alternativa útil. Para una imagen puramente decorativa, escribe alt="" para que los lectores de pantalla puedan omitirla.',
        explain: 'El elemento img es vacío y se escribe sin etiqueta de cierre. Prueba a cambiar temporalmente el nombre del archivo en el ejemplo. El navegador puede mostrar el texto alternativo cuando la imagen no carga.',
        example: `<h2>Escucha los avisos</h2>
<img width="240" src="${landscape}" alt="">
<p>El paisaje de fondo decora esta ficha de audio.</p>`,
        task: 'Inserta assets/paisaje.svg como ilustración informativa del recorrido. Escribe un alt que comunique lo que se ve y usa un ancho de 320 píxeles.',
        starter: '<h2>Vista del recorrido</h2>',
        hints: ['El archivo se declara en src y la descripción en alt.', 'Usa width="320", sin escribir px en este atributo HTML.'],
        solution: `<h2>Vista del recorrido</h2>
<img src="${landscape}" width="320"
     alt="Paisaje montañoso que rodea el recorrido">`,
        checks: [
          has('La imagen carga el archivo del paisaje.', 'img[src$="assets/paisaje.svg"]'),
          check('La misma imagen tiene una descripción no vacía.', d => !!d.querySelector('img[src$="assets/paisaje.svg"]')?.alt.trim()),
          has('El ancho se establece en 320.', 'img[src$="assets/paisaje.svg"][width="320"]')
        ], source: wai + 'images/'
      },
      {
        id: 'figuras-y-pies', title: 'Figuras con pie de imagen', minutes: 5,
        concept: 'Figure agrupa una ilustración, un ejemplo de código u otro contenido que forma una unidad. Figcaption añade un pie visible para todas las personas y se coloca al principio o al final de la figura.',
        explain: 'El pie puede explicar el contexto o indicar la fuente. El alt de una imagen cumple otra función, comunicar la información visual necesaria. Evita repetir literalmente el mismo texto en ambos cuando puedas aportar contexto adicional.',
        example: `<figure>
  <pre><code>&lt;p&gt;Hola&lt;/p&gt;</code></pre>
  <figcaption>Un párrafo en su forma más sencilla.</figcaption>
</figure>`,
        task: 'Crea una figure que contenga la imagen assets/paisaje.svg con alt y un figcaption visible que explique en qué parte del paseo se observa ese paisaje.',
        starter: '<h2>Cuaderno del paseo</h2>',
        hints: ['Coloca la imagen y el figcaption dentro del mismo figure.', 'Escribe en alt una descripción breve y en el pie una observación del recorrido.'],
        solution: `<h2>Cuaderno del paseo</h2>
<figure>
  <img src="${landscape}" width="320" alt="Montañas del recorrido">
  <figcaption>Esta vista aparece al terminar la primera subida.</figcaption>
</figure>`,
        checks: [check('Hay una figura con el paisaje y su alternativa.', d => Array.from(d.querySelectorAll('figure > img[src$="assets/paisaje.svg"]')).some(im => im.alt.trim().length > 0)), check('La misma figura incluye un pie con texto.', d => Array.from(d.querySelectorAll('figure')).some(f => f.querySelector('img[src$="assets/paisaje.svg"]') && !!textOf(f.querySelector(':scope > figcaption'))))],
        source: reference + 'figure'
      },
      {
        id: 'imagenes-adaptables', title: 'Imágenes que se adaptan', minutes: 8,
        concept: 'Picture permite ofrecer distintas versiones de una imagen. El navegador recorre los source en orden, elige la primera opción compatible cuya condición media se cumpla y usa img como opción de respaldo.',
        explain: 'Aquí el encuadre cambia según el ancho de la vista previa. En el source, la ruta se indica con srcset. El alt permanece en img y debe servir para todos los encuadres. Prueba distintos anchos para observar la elección.',
        example: `<picture>
  <source media="(max-width: 480px)" srcset="${closeup}">
  <img src="${landscape}" width="320" alt="El paisaje de la ruta">
</picture>`,
        task: 'Invierte la selección. Usa el paisaje general en un source para vistas de 600 px o más y usa paisaje-cerca.svg en el img de respaldo para pantallas más estrechas. Añade un alt informativo.',
        starter: '<picture>\n  <!-- Añade la fuente condicional y la imagen de respaldo. -->\n</picture>',
        hints: ['Para el umbral superior escribe media="(min-width: 600px)".', 'El source con srcset va antes del img con src y alt.'],
        solution: `<picture>
  <source media="(min-width: 600px)" srcset="${landscape}">
  <img src="${closeup}" width="320" alt="Paisaje de montaña del recorrido">
</picture>`,
        checks: [check('El source del paisaje usa un ancho mínimo de 600 px.', d => Array.from(d.querySelectorAll('picture > source[srcset$="assets/paisaje.svg"]')).some(s => /\(\s*min-width\s*:\s*600px\s*\)/i.test(s.media) || /\(\s*width\s*>=\s*600px\s*\)/i.test(s.media))), check('Después del source aparece el encuadre cercano con su alt.', d => Array.from(d.querySelectorAll('picture > source ~ img[src$="assets/paisaje-cerca.svg"]')).some(im => im.alt.trim().length > 0))],
        source: reference + 'picture'
      },
      {
        id: 'audio-y-controles', title: 'Reproductores de audio', minutes: 6,
        concept: 'Audio añade un reproductor. Con controls, el navegador muestra botones de reproducción y volumen. Dentro de audio puedes declarar uno o varios source e indicar con type qué formato ofrece cada uno.',
        explain: 'Pulsa reproducir para oír el tono de muestra. preload="metadata" sugiere cargar primero datos como la duración. Si publicas una entrevista o un aviso hablado, acompaña el reproductor con una transcripción que también pueda leerse.',
        example: `<h2>Prueba de sonido</h2>
<audio controls src="${audio}"></audio>
<p>Se escucha un tono breve.</p>`,
        task: 'Crea un reproductor con controles y preload="metadata". Coloca assets/tono.wav dentro de un source con su tipo audio/wav y añade un párrafo que describa el sonido.',
        starter: '<h2>Señal de inicio</h2>',
        hints: ['Audio contiene el source; en este ejercicio la ruta va en el source.', 'Debajo del reproductor, describe en un párrafo lo que se escucha.'],
        solution: `<h2>Señal de inicio</h2>
<audio controls preload="metadata">
  <source src="${audio}" type="audio/wav">
</audio>
<p>Un tono breve anuncia que la actividad va a comenzar.</p>`,
        checks: [has('El reproductor muestra controles y precarga metadatos.', 'audio[controls][preload="metadata"]'), has('El reproductor contiene la fuente WAV y su tipo.', 'audio[controls] > source[src$="assets/tono.wav"][type="audio/wav" i]'), filled('Un párrafo describe el sonido.', 'p')],
        source: reference + 'audio'
      },
      {
        id: 'video-y-pistas', title: 'Video y pistas de texto', minutes: 8,
        concept: 'Video puede incluir controles nativos y distintas fuentes. Track asocia una pista de texto sincronizado en formato WebVTT. kind="captions" sirve para subtítulos accesibles que recogen también sonidos relevantes. srclang identifica el idioma y label da nombre a la opción del menú.',
        explain: 'El clip del ejemplo se carga desde MDN y necesita internet. Prueba los controles y observa la imagen de portada antes de reproducirlo. Cuando el contenido procede de otro origen, el servidor debe permitir su uso con CORS si utilizas crossorigin.',
        example: `<video controls width="320" preload="none" poster="${landscape}">
  <source src="${video}" type="video/mp4">
</video>`,
        task: 'Completa el reproductor con una pista en español para assets/subtitulos.vtt. Usa kind="captions", srclang="es", label="Español" y actívala por defecto.',
        starter: `<video controls crossorigin="anonymous" width="320" preload="none">
  <source src="${video}" type="video/mp4">
  <!-- Añade aquí tu pista de texto. -->
</video>`,
        hints: ['Escribe un track dentro del video y coloca la ruta VTT en src.', 'default es un atributo booleano. Basta con escribir su nombre.'],
        solution: `<video controls crossorigin="anonymous" width="320" preload="none">
  <source src="${video}" type="video/mp4">
  <track kind="captions" src="${captions}" srclang="es" label="Español" default>
</video>`,
        checks: [has('El video tiene una pista de captions con el archivo VTT.', 'video[controls] > track[kind="captions" i][src$="assets/subtitulos.vtt"]'), has('La pista indica español y está activa por defecto.', 'video > track[src$="assets/subtitulos.vtt"][srclang="es" i][label="Español" i][default]')],
        source: reference + 'track'
      },
      {
        id: 'tablas-accesibles', title: 'Tablas de datos accesibles', minutes: 9,
        concept: 'Una tabla organiza datos que se relacionan por filas y columnas. Caption explica el tema, tr abre cada fila, th identifica un encabezado y td guarda un dato. Con scope="col", un encabezado se asocia a los datos de su columna.',
        explain: 'Lee una cifra del ejemplo e identifica qué encabezado le da sentido. Thead y tbody agrupan las filas de cabecera y datos. Una tabla bien marcada permite a un lector de pantalla anunciar la columna al recorrer cada celda.',
        example: `<table>
  <caption>Temperaturas del huerto</caption>
  <thead><tr><th scope="col">Día</th><th scope="col">Temperatura</th></tr></thead>
  <tbody>
    <tr><td>Lunes</td><td>22 °C</td></tr>
    <tr><td>Martes</td><td>24 °C</td></tr>
  </tbody>
</table>`,
        task: 'Crea un inventario con caption. En thead incluye las columnas «Artículo» y «Stock» con scope. En tbody registra dos o más filas con un nombre y su cantidad.',
        starter: '<table>\n  <!-- Describe el inventario y agrega cabeceras y filas. -->\n</table>',
        hints: ['Coloca los dos th con scope="col" dentro de un tr del thead.', 'Dentro de tbody, crea un tr por artículo y un td por dato.'],
        solution: `<table>
  <caption>Inventario del taller</caption>
  <thead>
    <tr><th scope="col">Artículo</th><th scope="col">Stock</th></tr>
  </thead>
  <tbody>
    <tr><td>Cable USB</td><td>12</td></tr>
    <tr><td>Adaptador</td><td>5</td></tr>
  </tbody>
</table>`,
        checks: [filled('La tabla tiene un caption con texto.', 'table > caption'), named('Artículo es un encabezado de columna en thead.', 'thead th[scope="col"]', 'Artículo'), named('Stock es un encabezado de columna en thead.', 'thead th[scope="col"]', 'Stock'), check('Dos filas de datos contienen un artículo y una cantidad.', d => Array.from(d.querySelectorAll('table tbody')).some(body => Array.from(body.rows).filter(row => row.cells.length >= 2 && textOf(row.cells[0]) && /^\d+$/.test(textOf(row.cells[1]))).length >= 2))],
        source: wai + 'tables/one-header/'
      }
    ]
  };

  const formularios = {
    id: 'formularios', title: 'Formularios accesibles', icon: 'form', color: 'violet',
    description: 'Diseña campos, agrupa opciones y comprueba datos con HTML.',
    lessons: [
      {
        id: 'etiquetas-de-formulario', title: 'Un campo con nombre', minutes: 7,
        concept: 'Un label dice qué dato se espera. Si su atributo for coincide con el id de un control, pulsar la etiqueta enfoca el campo. El atributo name determina la clave con la que se identifica el valor al construir los datos del formulario.',
        explain: 'Prueba a pulsar «Ciudad» en el ejemplo. El texto de una etiqueta permanece visible al escribir. El placeholder puede dar una muestra del formato, pero desaparece al introducir contenido y por sí solo deja al campo sin una etiqueta persistente.',
        example: `<form>
  <label for="ciudad">Ciudad</label>
  <input id="ciudad" name="ciudad" type="text">
</form>`,
        task: 'Crea un campo de texto para un apodo. Su id y su name deben ser apodo. Asócialo con una etiqueta visible «Apodo» usando for y comprueba que pulsarla enfoca el campo.',
        starter: '<form>\n  <!-- Coloca la etiqueta y el campo. -->\n</form>',
        hints: ['Escribe <label for="apodo">Apodo</label>.', 'El input necesita id="apodo", name="apodo" y type="text".'],
        solution: `<form>
  <label for="apodo">Apodo</label>
  <input id="apodo" name="apodo" type="text">
</form>`,
        checks: [check('Hay un campo de texto con id y name apodo.', d => d.querySelector('form input#apodo[name="apodo"]')?.type === 'text'), named('Su etiqueta visible dice «Apodo» y apunta al id.', 'form label[for="apodo"]', 'Apodo')],
        source: wai + 'forms/labels/'
      },
      {
        id: 'tipos-y-obligatorios', title: 'Tipos de entrada y campos obligatorios', minutes: 7,
        concept: 'Cada tipo de input comunica qué clase de dato se espera. Email activa la comprobación básica de formato y number admite límites numéricos. El atributo required marca un campo como obligatorio y participa en la validación nativa al enviar el formulario.',
        explain: 'En el ejemplo, intenta enviar un número fuera del intervalo para observar el mensaje del navegador. La validación en el cliente facilita la corrección inmediata. Si en un proyecto real recibes datos en un servidor, también necesitas validarlos allí.',
        example: `<form>
  <label for="plazas">Número de plazas (1 a 4)</label>
  <input id="plazas" name="plazas" type="number" min="1" max="4" required>
  <button type="submit">Reservar</button>
</form>`,
        task: 'Prepara un formulario de suscripción. Incluye un campo de correo llamado correo, con etiqueta visible y obligatorio, y un botón de envío. Prueba con un valor sin arroba.',
        starter: '<form>\n  <!-- Añade el correo y el botón. -->\n</form>',
        hints: ['Usa <input type="email" name="correo" ... required>.', 'Une el label al control con for e id, o rodea el control con el label.'],
        solution: `<form>
  <label for="correo">Correo electrónico (obligatorio)</label>
  <input id="correo" name="correo" type="email" required>
  <button type="submit">Suscribirme</button>
</form>`,
        checks: [has('El campo correo usa email y es obligatorio.', 'form input[name="correo"][type="email" i][required]'), check('El correo está asociado a una etiqueta visible.', d => labeled(d, 'form input[name="correo"][type="email" i]')), check('El formulario tiene un botón de envío con nombre.', d => Array.from(d.querySelectorAll('form button,form input[type="submit" i]')).some(el => el.type === 'submit' && !!(textOf(el) || el.value)))],
        source: 'https://developer.mozilla.org/es/docs/Learn_web_development/Extensions/Forms/Form_validation'
      },
      {
        id: 'opciones-agrupadas', title: 'Radios, casillas y grupos', minutes: 8,
        concept: 'Varios controles radio con el mismo name permiten elegir una sola opción. Los checkbox son independientes y admiten varias selecciones. Fieldset reúne controles relacionados y legend expresa la pregunta común para el grupo.',
        explain: 'Prueba a activar varias preferencias del ejemplo. Después piensa qué cambiaría si la persona tuviera que elegir un único turno. En ese caso todos los radios compartirían name, pero cada uno enviaría un value distinto.',
        example: `<fieldset>
  <legend>Temas de interés</legend>
  <label><input type="checkbox" name="tema" value="arte"> Arte</label>
  <label><input type="checkbox" name="tema" value="ciencia"> Ciencia</label>
</fieldset>`,
        task: 'Crea un grupo de turnos con legend y dos opciones radio, ambas con name="turno". Usa los valores manana y tarde, y escribe una etiqueta visible para cada opción.',
        starter: '<form>\n  <!-- Solo se puede elegir un turno. -->\n</form>',
        hints: ['Dentro del fieldset, escribe un legend con la pregunta.', 'Puedes envolver cada radio junto a su texto dentro de un label.'],
        solution: `<form>
  <fieldset>
    <legend>Elige tu turno</legend>
    <label><input type="radio" name="turno" value="manana"> Mañana</label>
    <label><input type="radio" name="turno" value="tarde"> Tarde</label>
  </fieldset>
</form>`,
        checks: [filled('El fieldset tiene un legend con texto.', 'form fieldset > legend'), check('Ambos turnos son radios del mismo fieldset.', d => Array.from(d.querySelectorAll('form fieldset')).some(f => ['manana','tarde'].every(v => f.querySelector('input[type="radio"][name="turno"][value="' + v + '"]')))), check('Cada radio tiene una etiqueta visible.', d => ['manana','tarde'].every(v => labeled(d, 'form fieldset input[type="radio"][name="turno"][value="' + v + '"]')))],
        source: wai + 'forms/grouping/'
      },
      {
        id: 'seleccion-y-texto', title: 'Selección y texto de varias líneas', minutes: 7,
        concept: 'Select presenta una lista compacta de opciones. Cada option tiene un texto visible y puede enviar un valor distinto. Textarea admite varias líneas, por lo que es apropiado para comentarios. El atributo rows define cuántas filas se muestran inicialmente.',
        explain: 'En el ejemplo, el texto mostrado a la persona es «Presencial» y el valor enviado es sede. Prueba a añadir una tercera modalidad. Para comenzar un textarea vacío, mantén sus etiquetas de apertura y cierre sin texto entre ellas.',
        example: `<label for="modalidad">Modalidad</label>
<select id="modalidad" name="modalidad">
  <option value="sede">Presencial</option>
  <option value="remota">En línea</option>
</select>`,
        task: 'Crea una encuesta con un select llamado nivel y al menos dos opciones con valores diferentes. Añade un textarea llamado comentario con cuatro filas y una etiqueta visible para cada control.',
        starter: '<form>\n  <!-- Añade ambos controles de la encuesta. -->\n</form>',
        hints: ['Usa un id diferente por control y enlaza cada label con el suyo.', 'Para el comentario escribe <textarea name="comentario" rows="4" ...></textarea>.'],
        solution: `<form>
  <label for="nivel">Nivel actual</label>
  <select id="nivel" name="nivel">
    <option value="inicial">Inicial</option>
    <option value="medio">Intermedio</option>
  </select>
  <label for="comentario">Comentario</label>
  <textarea id="comentario" name="comentario" rows="4"></textarea>
</form>`,
        checks: [check('El selector nivel ofrece dos o más valores diferentes con texto.', d => new Set(Array.from(d.querySelectorAll('form select[name="nivel"] option')).filter(o => textOf(o) && o.value).map(o => o.value)).size >= 2), has('Hay un textarea comentario con cuatro filas.', 'form textarea[name="comentario"][rows="4"]'), check('Los dos controles tienen etiquetas visibles.', d => labeled(d, 'form select[name="nivel"]') && labeled(d, 'form textarea[name="comentario"]'))],
        source: reference + 'select'
      },
      {
        id: 'instrucciones-y-patrones', title: 'Ayudas y reglas de formato', minutes: 8,
        concept: 'Con aria-describedby puedes asociar una ayuda visible a su campo. El label identifica el dato y la descripción explica cómo completarlo. En ciertos tipos de input, pattern expresa una regla que debe cumplir el valor entero.',
        explain: 'En el ejemplo, [0-9]{3} exige exactamente tres dígitos. Un campo opcional vacío sigue siendo válido con pattern, así que usa required cuando sea indispensable. Escribe también una instrucción comprensible para quienes no conozcan la notación del patrón.',
        example: `<form>
  <label for="codigo">Código de estante</label>
  <p id="ayuda">Escribe tres dígitos, por ejemplo 035.</p>
  <input id="codigo" name="codigo" pattern="[0-9]{3}" required
         aria-describedby="ayuda">
  <button type="submit">Comprobar</button>
</form>`,
        task: 'Crea un campo de texto obligatorio llamado pin que acepte exactamente cuatro dígitos. Asocia un label y una ayuda visible mediante aria-describedby. Comprueba formatos como 0072 y 12345.',
        starter: '<form>\n  <!-- Describe y valida el PIN. -->\n  <button type="submit">Comprobar</button>\n</form>',
        hints: ['Puedes partir del patrón del ejemplo y cambiar la cantidad a cuatro.', 'El valor de aria-describedby debe coincidir con el id del texto de ayuda.'],
        solution: `<form>
  <label for="pin">PIN de la actividad</label>
  <p id="formato">Escribe cuatro dígitos, por ejemplo 0072.</p>
  <input id="pin" type="text" name="pin" inputmode="numeric"
         pattern="[0-9]{4}" aria-describedby="formato" required>
  <button type="submit">Comprobar</button>
</form>`,
        checks: [
          check('El campo de texto es obligatorio y tiene etiqueta.', d => {
            const pin = d.querySelector('form input[name="pin"]');
            return pin?.type === 'text' && pin.required && labeled(d, 'form input[name="pin"]');
          }),
          check('El patrón acepta cuatro dígitos y descarta otros formatos.', d => {
            const pattern = d.querySelector('form input[name="pin"]')?.pattern;
            if (!pattern) return false;
            try {
              const rule = new RegExp('^(?:' + pattern + ')$', 'u');
              return ['0072','1234','9981'].every(v => rule.test(v)) && ['123','12345','12a3',''].every(v => !rule.test(v));
            } catch { return false; }
          }),
          check('El campo referencia un texto de ayuda existente.', d => (d.querySelector('form input[name="pin"]')?.getAttribute('aria-describedby') || '').split(/\s+/).some(id => id && textOf(d.getElementById(id))))
        ], source: reference + 'input'
      },
      {
        id: 'proyecto-buscador', title: 'Proyecto · Buscador de catálogo', minutes: 10,
        concept: 'Al enviar un formulario con GET, el navegador toma los controles con name y construye una consulta en la URL. Es adecuado para búsquedas que se puedan guardar o compartir. Con POST, los datos viajan en el cuerpo de la solicitud, un modelo habitual para crear registros.',
        explain: 'Imagina que el servidor recibe la consulta q=novela. El nombre procede del atributo name y el valor procede de lo que la persona escribió. En GitHub Pages puedes publicar la interfaz del buscador. Para resolver una búsqueda allí, puedes programarla en JavaScript o enviarla a un servicio que procese la consulta.',
        example: `<form method="get" action="https://developer.mozilla.org/es/search">
  <label for="termino">Buscar en MDN</label>
  <input type="search" id="termino" name="q">
  <button type="submit">Buscar en MDN</button>
</form>`,
        task: 'Diseña la interfaz de búsqueda del catálogo. Declara method="get", un campo search obligatorio llamado q, un select llamado categoria con dos categorías distintas, etiquetas asociadas y un botón de envío con texto. Aquí evaluarás el formulario antes de conectarlo a datos.',
        starter: '<h1>Catálogo de la biblioteca</h1>\n<form>\n  <!-- Diseña el buscador y sus filtros. -->\n</form>',
        hints: ['Enlaza un label con el input y otro con el select. Revisa que cada campo tenga name.', 'Pon las option dentro del select y termina con <button type="submit">Buscar</button>.'],
        solution: `<h1>Catálogo de la biblioteca</h1>
<form method="get">
  <label for="q">Título o autor</label>
  <input type="search" id="q" name="q" required>
  <label for="categoria">Categoría</label>
  <select id="categoria" name="categoria">
    <option value="novela">Novela</option>
    <option value="ciencia">Ciencia</option>
  </select>
  <button type="submit">Buscar en el catálogo</button>
</form>`,
        checks: [
          has('El formulario declara GET y contiene una búsqueda q obligatoria.', 'form[method="get" i] input[type="search" i][name="q"][required]'),
          check('El filtro categoria ofrece dos valores diferentes.', d => new Set(Array.from(d.querySelectorAll('form[method="get" i] select[name="categoria"] option')).filter(o => o.value && textOf(o)).map(o => o.value)).size >= 2),
          check('La búsqueda y el filtro tienen etiquetas visibles.', d => labeled(d, 'form[method="get" i] input[name="q"]') && labeled(d, 'form[method="get" i] select[name="categoria"]')),
          check('Un botón con texto permite enviar la búsqueda.', d => Array.from(d.querySelectorAll('form[method="get" i] button')).some(b => b.type === 'submit' && !!textOf(b)))
        ], source: reference + 'form'
      }
    ]
  };

  window.COURSE.push(fundamentos, contenido, multimedia, formularios);
})();
