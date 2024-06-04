const librosNuevosContainer = document.querySelector('#libros-nuevos .libros-container');
const librosTerrorContainer = document.querySelector('#libros-terror .libros-container');
const librosInfantilesContainer = document.querySelector('#libros-infantiles .libros-container');
const librosCienciaContainer = document.querySelector('#libros-ciencia .libros-container');

async function obtenerLibrosNuevos() {
    try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=new+books&maxResults=20');
        if (!response.ok) {
            throw new Error('No se pudo obtener la información de los libros');
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        return [];
    }
}

async function obtenerLibrosTerror() {
    try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:horror&maxResults=5');
        if (!response.ok) {
            throw new Error('No se pudo obtener la información de los libros');
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error al obtener los libros de terror:', error);
        return [];
    }
}

async function obtenerLibrosInfantiles() {
    try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:children&orderBy=relevance&maxResults=5');
        if (!response.ok) {
            throw new Error('No se pudo obtener la información de los libros');
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error al obtener los libros de terror:', error);
        return [];
    }
}

async function obtenerLibrosCiencia() {
    try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:science&orderBy=relevance&maxResults=5');
        if (!response.ok) {
            throw new Error('No se pudo obtener la información de los libros');
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error al obtener los libros de terror:', error);
        return [];
    }
}

function mostrarLibros(libros, container) {
    container.innerHTML = '';
    libros.forEach((libro, index) => {
        const divLibro = document.createElement('div');
        divLibro.classList.add('libro');
        const imagen = document.createElement('img');
        imagen.src = libro.volumeInfo.imageLinks.thumbnail;
        imagen.alt = libro.volumeInfo.title;
        const parrafo = document.createElement('p');
        parrafo.textContent = `${libro.volumeInfo.title} - ${libro.volumeInfo.authors ? libro.volumeInfo.authors.join(', ') : 'Autor desconocido'}`;
        divLibro.appendChild(imagen);
        divLibro.appendChild(parrafo);
        container.appendChild(divLibro);
    });
}

async function iniciar() {
    const librosNuevos = await obtenerLibrosNuevos();
    mostrarLibros(librosNuevos, librosNuevosContainer);

    const librosTerror = await obtenerLibrosTerror();
    mostrarLibros(librosTerror, librosTerrorContainer);

    const librosInfantiles = await obtenerLibrosInfantiles();
    mostrarLibros(librosInfantiles, librosInfantilesContainer);

    const librosCiencia = await obtenerLibrosCiencia();
    mostrarLibros(librosCiencia, librosCienciaContainer);
}

iniciar();
