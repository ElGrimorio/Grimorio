// 1. Obtener el ID del artículo desde la URL (ej: articulo.html?id=aries)
const urlParams = new URLSearchParams(window.location.search);
const artId = urlParams.get('id');

// 2. Buscar los datos en la biblioteca (definida en datos.js)
const datos = biblioteca[artId];

if (datos) {
    // Rellenar la página con la información básica
    document.title = `${datos.titulo} | El Grimorio`;

        // Rellenar datos extras
    if(document.getElementById('art-casa')) document.getElementById('art-casa').innerText = datos.casa || "No definida";
    if(document.getElementById('art-numero')) document.getElementById('art-numero').innerText = datos.numerologia || "N/A";
    if(document.getElementById('art-rango')) document.getElementById('art-rango').innerText = datos.rango || "Consultar efemérides";
    if(document.getElementById('art-rasgos')) document.getElementById('art-rasgos').innerText = datos.personalidad || "Varios";
    
    
    // Usamos comprobación de existencia (el operador ?) para evitar errores si falta un ID en el HTML
    if(document.getElementById('art-titulo')) document.getElementById('art-titulo').innerText = datos.titulo;
    if(document.getElementById('art-breadcrumb')) document.getElementById('art-breadcrumb').innerText = datos.breadcrumb;
    if(document.getElementById('art-fecha')) document.getElementById('art-fecha').innerText = `Última actualización: ${datos.fecha}`;
    
    // Rellenar la Infobox
    if (datos.infobox) {
        if(document.getElementById('info-header')) document.getElementById('info-header').innerText = datos.infobox.header;
        if(document.getElementById('info-img')) document.getElementById('info-img').src = datos.infobox.imagen;
        
        // Mapeo de valores de la infobox
        if(document.getElementById('val-1')) document.getElementById('val-1').innerText = datos.infobox.val1 || "N/A";
        if(document.getElementById('val-2')) document.getElementById('val-2').innerText = datos.infobox.val2 || "N/A";
        if(document.getElementById('val-3')) document.getElementById('val-3').innerText = datos.infobox.val3 || "N/A";
        if(document.getElementById('val-4')) document.getElementById('val-4').innerText = datos.infobox.val4 || "N/A";
    }

    // Rellenar Cuerpo (Introducción + Contenido)
    const contenedorCuerpo = document.getElementById('art-cuerpo');
    if (contenedorCuerpo) {
        contenedorCuerpo.innerHTML = `<p class="intro">${datos.introduccion}</p>${datos.cuerpo}`;
    }
    
    // Rellenar la Cita (Quote)
    const quoteBox = document.getElementById('art-quote-box');
    if (quoteBox) {
        if (datos.quote) {
            quoteBox.style.display = 'block';
            if(document.getElementById('art-quote-texto')) document.getElementById('art-quote-texto').innerText = `"${datos.quote}"`;
            if(document.getElementById('art-quote-autor')) document.getElementById('art-quote-autor').innerText = datos.autor_quote;
        } else {
            quoteBox.style.display = 'none';
        }
    }
} else {
    // Si el ID no existe o la URL está mal
    if(document.getElementById('art-titulo')) document.getElementById('art-titulo').innerText = "Conocimiento no hallado";
    if(document.getElementById('art-cuerpo')) document.getElementById('art-cuerpo').innerHTML = "<p>El tomo que buscas no se encuentra en estos registros.</p>";
            }
