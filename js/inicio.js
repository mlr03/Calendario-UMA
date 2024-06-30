// Variables para almacenar elementos del DOM
const filters = {
    grado: document.getElementById('grado'),
    curso: document.getElementById('curso'),
    grupo: document.getElementById('grupo'),
    tipo: document.getElementById('tipo'),
    keyword: document.getElementById('keyword')
};

const dayColumns = {
    Lunes: document.querySelector('[aria-labelledby="lunes-heading"]'),
    Martes: document.querySelector('[aria-labelledby="martes-heading"]'),
    Miércoles: document.querySelector('[aria-labelledby="miercoles-heading"]'),
    Jueves: document.querySelector('[aria-labelledby="jueves-heading"]'),
    Viernes: document.querySelector('[aria-labelledby="viernes-heading"]')
};

const classDetailsModal = document.getElementById('class-details-modal');
const classDetailsDiv = document.getElementById('class-details');

// Variable para almacenar la clase seleccionada
let selectedClass = null;

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar todas las clases y luego aplicar filtros al cargar la página
    mostrarClases();

    // Evento para aplicar los filtros solo cuando se haga clic en el botón de filtros
    document.querySelector('#filters button').addEventListener('click', () => {
        mostrarClases(); // Mostrar todas las clases antes de aplicar filtros
        applyFilters();  // Luego aplicar los filtros
    });

    // Evento para cerrar el modal
    document.querySelector('.close').addEventListener('click', closeModal);

    // Cierra el modal cuando se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === classDetailsModal) {
            closeModal();
        }
    });

    // Añadir evento al botón de eliminar clase
    document.querySelector('#class-details-modal button').addEventListener('click', deleteSelectedClass);
});

// Función para mostrar todas las clases en el calendario
function mostrarClases() {
    // Vacía las franjas horarias del calendario antes de agregar nuevas clases
    Object.values(dayColumns).forEach(column => {
        column.querySelectorAll('.class').forEach(el => el.remove());
    });

    // Mostrar todas las clases primero
    clases.forEach(clase => {
        const timeSlot = [...dayColumns[clase.Dia].querySelectorAll('.time-slot')].find(slot => slot.getAttribute('aria-label').startsWith(clase.Hora));

        if (timeSlot) {
            const classDiv = document.createElement('div');
            classDiv.classList.add('class');
            classDiv.textContent = clase.Nombre;
            classDiv.dataset.grado = clase.Grado;
            classDiv.dataset.curso = clase.Curso;
            classDiv.dataset.grupo = clase.Grupo;
            classDiv.dataset.tipo = clase.Tipo;
            classDiv.dataset.nombre = clase.Nombre;
            classDiv.dataset.dia = clase.Dia;
            classDiv.dataset.hora = clase.Hora;

            // Añade un evento de clic a cada clase para mostrar los detalles en el modal
            classDiv.addEventListener('click', () => {
                mostrarDetallesClase(clase);
            });

            // Añade la clase a la franja horaria correspondiente
            timeSlot.appendChild(classDiv);
        }
    });
}

// Función para aplicar los filtros a las clases
function applyFilters() {
    const gradoFilter = filters.grado.value;
    const cursoFilter = filters.curso.value;
    const grupoFilter = filters.grupo.value;
    const tipoFilter = filters.tipo.value;
    const keywordFilter = filters.keyword.value.toLowerCase();

    // Filtrar clases en el calendario
    Object.values(dayColumns).forEach(column => {
        column.querySelectorAll('.class').forEach(classDiv => {
            // Obtener valores de datos de la clase
            const grado = classDiv.dataset.grado;
            const curso = classDiv.dataset.curso;
            const grupo = classDiv.dataset.grupo;
            const tipo = classDiv.dataset.tipo;
            const nombre = classDiv.dataset.nombre.toLowerCase();

            // Aplicar filtros
            const matchesGrado = gradoFilter ? grado === gradoFilter : true;
            const matchesCurso = cursoFilter ? curso === cursoFilter : true;
            const matchesGrupo = grupoFilter ? grupo === grupoFilter : true;
            const matchesTipo = tipoFilter ? tipo === tipoFilter : true;
            const matchesKeyword = keywordFilter ? nombre.includes(keywordFilter) : true;

            // Mostrar u ocultar la clase según si cumple con todos los filtros
            if (matchesGrado && matchesCurso && matchesGrupo && matchesTipo && matchesKeyword) {
                classDiv.style.display = ''; // Mostrar la clase
            } else {
                classDiv.style.display = 'none'; // Ocultar la clase
            }
        });
    });
}

// Función para mostrar los detalles de una clase en el modal
function mostrarDetallesClase(clase) {
    selectedClass = clase; // Almacena la clase seleccionada
    classDetailsDiv.innerHTML = `
        <h3>${clase.Nombre}</h3>
        <p><strong>Día:</strong> ${clase.Dia}</p>
        <p><strong>Hora:</strong> ${clase.Hora}</p>
        <p><strong>Grado:</strong> ${clase.Grado}</p>
        <p><strong>Curso:</strong> ${clase.Curso}</p>
        <p><strong>Grupo:</strong> ${clase.Grupo}</p>
        <p><strong>Tipo:</strong> ${clase.Tipo}</p>
    `;

    // Mostrar el modal
    classDetailsModal.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    classDetailsModal.style.display = 'none';
    selectedClass = null; // Limpiar la clase seleccionada al cerrar el modal
}

// Función para eliminar la clase seleccionada
function deleteSelectedClass() {
    if (!selectedClass) return; // No hacer nada si no hay clase seleccionada

    const index = clases.findIndex(clase => (
        clase.Nombre === selectedClass.Nombre &&
        clase.Dia === selectedClass.Dia &&
        clase.Hora === selectedClass.Hora
    ));

    if (index !== -1) {
        clases.splice(index, 1);
        mostrarClases(); // Actualiza la vista después de eliminar la clase
    }
}

