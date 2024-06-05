document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModalButton = document.querySelector('.close');

    searchButton.addEventListener('click', () => {
        let query = searchInput.value.trim(); // Recortar espacios en blanco al principio y al final
        if (query !== '') {
            query = encodeURIComponent(query); // Codificar las palabras de búsqueda
            fetchBooks(query);
        }
    });

    function fetchBooks(query) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información de los libros');
                }
                return response.json();
            })
            .then(data => {
                displayResults(data.items);
                showModal();
            })
            .catch(error => {
                console.error('Error al obtener los libros:', error);
            });
    }

    function displayResults(books) {
        const librosContainer = document.querySelector('.libros-container-search');
        librosContainer.innerHTML = '';
        books.forEach(book => {
            const divLibro = document.createElement('div');
            divLibro.classList.add('libro');
            const imagen = document.createElement('img');
            imagen.src = book.volumeInfo.imageLinks.thumbnail;
            imagen.alt = book.volumeInfo.title;
            const parrafo = document.createElement('p');
            parrafo.textContent = `${book.volumeInfo.title} - ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconocido'}`;
            divLibro.appendChild(imagen);
            divLibro.appendChild(parrafo);
            librosContainer.appendChild(divLibro);
        });
    }

    function showModal() {
        modal.style.display = 'block';
    }

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
