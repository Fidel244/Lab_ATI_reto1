
function loadJSON(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        console.log("Estado de la solicitud JSON:", xhr.status); 

        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                callback(data); 
            } catch (e) {
                console.error("Error al parsear el contenido JSON:", e);
            }
        } else {
            console.error(`Error al cargar los datos del JSON desde: ${url}. Código: ${xhr.status}`); 
        }
    };
    
    xhr.onerror = function() {
        console.error('Error de red al intentar cargar el archivo JSON.');
    };

    xhr.send();
}

function renderizarPerfiles(perfiles) {
    const listaContenedor = document.getElementById('lista_estudiantes');
    console.log("Contenedor encontrado:", listaContenedor); 
    console.log("Datos cargados (perfiles):", perfiles); 

    if (!listaContenedor || !Array.isArray(perfiles)) {
        console.error('No se encontró el contenedor de lista o los datos son inválidos.');
        return;
    }
    if (!listaContenedor || !Array.isArray(perfiles)) {
        console.error('No se encontró el contenedor de lista o los datos son inválidos.');
        return;
    }

    listaContenedor.innerHTML = ''; 

    perfiles.forEach(perfil => {

        const listItem = document.createElement('li');
        const img = document.createElement('img');
        const rutaImagen = perfil.imagen.replace(/\\/g, '/'); 
        
        img.src = rutaImagen;

        if (perfil.nombre.includes('Fidel Serpa')) { 
            img.id = 'fidel';
        }

        const parrafo = document.createElement('p');
        parrafo.textContent = `${perfil.nombre} (C.I.: ${perfil.ci})`;
        listItem.appendChild(img);
        listItem.appendChild(parrafo);
        listaContenedor.appendChild(listItem);
    });

    console.log(` Se han renderizado ${perfiles.length} perfiles dinámicamente.`);
}

document.addEventListener('DOMContentLoaded', () => {
    loadJSON('datos/index.json', renderizarPerfiles);
});