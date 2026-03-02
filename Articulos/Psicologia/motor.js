// 1. Obtener el ID del artículo desde la URL (ej: articulo.html?id=el-tarot)
const urlParams = new URLSearchParams(window.location.search);
const artId = urlParams.get('id');

// 2. Buscar los datos en nuestra biblioteca
const datos = biblioteca[artId];

if (datos) {
    // Rellenar la página con la información
    document.title = `${datos.titulo} | El Grimorio`;
    document.getElementById('art-titulo').innerText = datos.titulo;
    document.getElementById('art-breadcrumb').innerText = datos.breadcrumb;
    document.getElementById('art-fecha').innerText = `Última actualización: ${datos.fecha}`;
    
    // Infobox
    document.getElementById('info-header').innerText = datos.infobox.header;
    document.getElementById('info-img').src = datos.infobox.imagen;
    document.getElementById('val-1').innerText = datos.infobox.val1;
    document.getElementById('val-2').innerText = datos.infobox.val2;
    document.getElementById('val-3').innerText = datos.infobox.val3;
    document.getElementById('val-4').innerText = datos.infobox.val4;

    // Cuerpo y Quote
    document.getElementById('art-cuerpo').innerHTML = `<p class="intro">${datos.introduccion}</p>${datos.cuerpo}`;
    
    if (datos.quote) {
        document.getElementById('art-quote-box').style.display = 'block';
        document.getElementById('art-quote-texto').innerText = `"${datos.quote}"`;
        document.getElementById('art-quote-autor').innerText = datos.autor_quote;
    }
} else {
    document.getElementById('art-titulo').innerText = "Artículo no encontrado";
}
