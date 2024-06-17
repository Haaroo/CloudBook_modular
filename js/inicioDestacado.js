const librosDestacadoContainer = document.querySelector('#libros-destacado .libro-container-destacado');
const librosNovedadContainer = document.querySelector('#libros-novedades .libro-container-novedades');
const librosAutoresContainer = document.querySelector('#libros-autores .libro-container-autores');


//Funcion para obtener los libros destacados del modulo de Inicio
async function obtenerLibrosDestacado() {
    try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:psychology&orderBy=relevance&maxResults=5');
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

//Funcion para obtener los libros de novedad del modulo de Inicio
async function obtenerLibrosNovedad() {
    try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:history+mexican&orderBy=relevance&maxResults=5');
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

//Funcion para obtener los libros de autores del modulo de Inicio
async function obtenerLibrosAutores() {
    try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:engineering&orderBy=relevance&maxResults=5')
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
        imagen.addEventListener('click', function() {
            abrirPaginaDetalle(libro.volumeInfo.previewLink);
        });
        const parrafo = document.createElement('p');
        parrafo.textContent = `${libro.volumeInfo.title} - ${libro.volumeInfo.authors ? libro.volumeInfo.authors.join(', ') : 'Autor desconocido'}`;
        divLibro.appendChild(imagen);
        divLibro.appendChild(parrafo);
        container.appendChild(divLibro);
    });
}

async function iniciar() {
    const librosDestacados = await obtenerLibrosDestacado();
    mostrarLibros(librosDestacados, librosDestacadoContainer);

    const librosNovedad = await obtenerLibrosNovedad();
    mostrarLibros(librosNovedad, librosNovedadContainer);

    const librosAutores = await obtenerLibrosAutores();
    mostrarLibros(librosAutores, librosAutoresContainer);
}

function mostrarModal(libro) {
    // Crear la estructura de la modal
    const modal = document.createElement('div');
    modal.classList.add('modalMostrar');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-contentMostrar');

    const closeModal = document.createElement('span');
    closeModal.classList.add('close-buttonMostrar');
    closeModal.innerHTML = '&times;';
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });

    const titulo = document.createElement('h2');
    titulo.textContent = libro.volumeInfo.title;

    const autor = document.createElement('p');
    autor.textContent = `Autor: ${libro.volumeInfo.authors ? libro.volumeInfo.authors.join(', ') : 'Autor desconocido'}`;

    const genero = document.createElement('p');
    genero.textContent = `Género: ${libro.volumeInfo.categories ? libro.volumeInfo.categories.join(', ') : 'Género desconocido'}`;

    const fechaPublicacion = document.createElement('p');
    fechaPublicacion.textContent = `Fecha de publicación: ${libro.volumeInfo.publishedDate || 'Fecha desconocida'}`;

    const descripcion = document.createElement('p');
    descripcion.textContent = libro.volumeInfo.description || 'Descripción no disponible';

    const previewLink = document.createElement('a');
    previewLink.href = libro.volumeInfo.previewLink;
    previewLink.textContent = 'Ver más';
    previewLink.target = '_blank';

    // Botón para abrir el formulario de "Información de préstamo"
    const openFormButton = document.createElement('button');
    const p = document.createElement('p');
    openFormButton.textContent = 'Solicitar Préstamo';
    openFormButton.addEventListener('click', function() {
        mostrarFormularioPrestamo(libro);
    });

    modalContent.appendChild(closeModal);
    modalContent.appendChild(titulo);
    modalContent.appendChild(autor);
    modalContent.appendChild(genero);
    modalContent.appendChild(fechaPublicacion);
    modalContent.appendChild(descripcion);
    modalContent.appendChild(previewLink);
    modalContent.appendChild(p);
    modalContent.appendChild(openFormButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    // Mostrar la modal
    modal.style.display = 'block';
}

function mostrarFormularioPrestamo(libro) {
    // Crear la estructura de la modal para el formulario de préstamo
    const modalForm = document.createElement('div');
    modalForm.classList.add('modalMostrar');

    const modalFormContent = document.createElement('div');
    modalFormContent.classList.add('modal-contentMostrar');

    const closeFormModal = document.createElement('span');
    closeFormModal.classList.add('close-buttonMostrar');
    closeFormModal.innerHTML = '&times;';
    closeFormModal.addEventListener('click', function() {
        modalForm.style.display = 'none';
        document.body.removeChild(modalForm);
    });

    const form = document.createElement('form');
    form.innerHTML = `
        <h3>Información de préstamo</h3>
        <label>Nombre del libro solicitado: ${libro.volumeInfo.title}</label><br>
        <label>Nombre del autor del libro: ${libro.volumeInfo.authors ? libro.volumeInfo.authors.join(', ') : 'Autor desconocido'}</label><br>
        <label>Género del libro: ${libro.volumeInfo.categories ? libro.volumeInfo.categories.join(', ') : 'Género desconocido'}</label><br>
        <label>Fecha de publicación del libro: ${libro.volumeInfo.publishedDate || 'Fecha desconocida'}</label><br>
        <label>Resumen del libro: ${libro.volumeInfo.description || 'Descripción no disponible'}</label><br><br>

        <label for="nombrePrestatario">Nombre completo del prestatario:</label><br>
        <input type="text" id="nombrePrestatario" name="nombrePrestatario"><br><br>

        <label for="idPrestatario">Número de identificación:</label><br>
        <input type="text" id="idPrestatario" name="idPrestatario"><br><br>

        <label for="tituloPrestamo">Título del libro:</label><br>
        <input type="text" id="tituloPrestamo" name="tituloPrestamo" value="${libro.volumeInfo.title}" readonly><br><br>

        <label for="fechaPrestamo">Fecha de préstamo:</label><br>
        <input type="date" id="fechaPrestamo" name="fechaPrestamo"><br><br>

        <label for="fechaDevolucion">Fecha de devolución:</label><br>
        <input type="date" id="fechaDevolucion" name="fechaDevolucion"><br><br>

        <label for="contactoPrestatario">Numero de contacto:</label><br>
        <input type="tel" id="contactoPrestatario" name="contactoPrestatario"><br><br>

        <button type="submit">Enviar</button>
    `;
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Solicitud enviada correctamente');
        modalForm.style.display = 'none';
        document.body.removeChild(modalForm);
        window.location.href = 'inicio.html';
    });
    
    modalFormContent.appendChild(closeFormModal);
    modalFormContent.appendChild(form);
    modalForm.appendChild(modalFormContent);

    document.body.appendChild(modalForm);

    // Mostrar la modal del formulario de préstamo
    modalForm.style.display = 'block';
}

function mostrarLibros(libros, container) {
    container.innerHTML = '';
    libros.forEach((libro, index) => {
        const divLibro = document.createElement('div');
        
        divLibro.classList.add('libro');
        const imagen = document.createElement('img');
        imagen.src = libro.volumeInfo.imageLinks.thumbnail;
        imagen.alt = libro.volumeInfo.title;
        imagen.addEventListener('click', function() {
            //abrirPaginaDetalle(libro.volumeInfo.previewLink);
            mostrarModal(libro);
        });
        const parrafo = document.createElement('p');
        parrafo.textContent = `${libro.volumeInfo.title} - ${libro.volumeInfo.authors ? libro.volumeInfo.authors.join(', ') : 'Autor desconocido'}`;
        divLibro.appendChild(imagen);
        divLibro.appendChild(parrafo);
        container.appendChild(divLibro);
    });
}

iniciar();
