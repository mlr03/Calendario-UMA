// Define la clase Clase
class Clase {
    constructor(nombre, dia, hora, grado, curso, grupo, tipo) {
        this.nombre = nombre;
        this.dia = dia;
        this.hora = hora;
        this.grado = grado;
        this.curso = curso;
        this.grupo = grupo;
        this.tipo = tipo;
    }
}

// Array de objetos que representan las diferentes clases
const clases = [
    new Clase('Matematica Discreta', 'Lunes', '08:45', 'Informatica', 1, 'B', 'Teórica'),
    new Clase('Tecnologias Web', 'Martes', '10:45', 'Software', 3, 'A', 'Práctica'),
    new Clase('Estructura de Computadores', 'Lunes', '08:45', 'Computadores', 2, 'C', 'Práctica'),
    new Clase('Interfaces de Usuario', 'Jueves', '08:45', 'Software', 3, 'A', 'Práctica'),
    new Clase('Organización Empresarial', 'Viernes', '12:45', 'Informatica', 1, 'A', 'Teórica'),
    new Clase('Proyectos y Legislación', 'Miércoles', '08:45', 'Computadores', 4, 'B', 'Prueba'),
    new Clase('Análisis y Diseño de Algoritmos', 'Viernes', '08:45', 'Informatica', 2, 'B', 'Teórica'),
    new Clase('Gestión de la Información', 'Martes', '12:45', 'Software', 3, 'A', 'Práctica'),
    new Clase('Sistemas Operativos', 'Viernes', '10:45', 'Computadores', 2, 'C', 'Prueba'),
    new Clase('Interfaces de Usuario', 'Miércoles', '08:45', 'Software', 3, 'A', 'Práctica'),
];

localStorage.setItem('clases', JSON.stringify(clases));

// Función para aplicar los filtros
function aplicarFiltros() {
    const filtroGrado = document.getElementById("grado").value.toLowerCase();
    const filtroCurso = parseInt(document.getElementById("curso").value);
    const filtroGrupo = document.getElementById("grupo").value.toLowerCase();
    const filtroTipo = document.getElementById("tipo").value.toLowerCase();
    const filtroNombre = document.getElementById("keyword").value.toLowerCase();

    const clasesFiltrados = clases.filter(clase => {
        const gradoMatch = filtroGrado === "" || clase.grado.toLowerCase() === filtroGrado;
        const cursoMatch = isNaN(filtroCurso) || clase.curso === filtroCurso;
        const grupoMatch = filtroGrupo === "" || clase.grupo.toLowerCase() === filtroGrupo;
        const tipoMatch = filtroTipo === "" || clase.tipo.toLowerCase() === filtroTipo;
        const nombreMatch = filtroNombre === "" || clase.nombre.toLowerCase().includes(filtroNombre);

        return gradoMatch && cursoMatch && grupoMatch && tipoMatch && nombreMatch;
    });

    generateHTMLForClases(clasesFiltrados);
}

// Función para generar el HTML para las clases mostradas
function generateHTMLForClases(clasesMostrados) {
    const dayColumns = {
        'Lunes': document.querySelector('[aria-labelledby="lunes-heading"]'),
        'Martes': document.querySelector('[aria-labelledby="martes-heading"]'),
        'Miércoles': document.querySelector('[aria-labelledby="miercoles-heading"]'),
        'Jueves': document.querySelector('[aria-labelledby="jueves-heading"]'),
        'Viernes': document.querySelector('[aria-labelledby="viernes-heading"]')
    };

    // Limpiar el contenido actual de las columnas
    Object.values(dayColumns).forEach(column => {
        column.querySelectorAll('.time-slot').forEach(slot => {
            slot.innerHTML = '';
        });
    });

    clasesMostrados.forEach(clase => {
        const timeSlot = [...dayColumns[clase.dia].querySelectorAll('.time-slot')].find(slot => slot.getAttribute('aria-label').startsWith(clase.hora));

        if (timeSlot) {
            const classDiv = document.createElement('div');
            classDiv.classList.add('class');
            classDiv.textContent = clase.nombre;
            classDiv.dataset.grado = clase.grado;
            classDiv.dataset.curso = clase.curso;
            classDiv.dataset.grupo = clase.grupo;
            classDiv.dataset.tipo = clase.tipo;
            classDiv.dataset.nombre = clase.nombre;
            classDiv.dataset.dia = clase.dia;
            classDiv.dataset.hora = clase.hora;

            // Añade un evento de clic a cada clase para mostrar los detalles en el modal
            classDiv.addEventListener('click', () => {
                mostrarDetallesClase(clase);
            });

            // Añade la clase a la franja horaria correspondiente
            timeSlot.appendChild(classDiv);
        }
    });

    const totalClasesCount = document.getElementById("totalClasesCount");
    totalClasesCount.textContent = clasesMostrados.length;
}

// Función para manejar la confirmación de eliminar filtros
function handleConfirmarEliminarFiltros() {
    eliminarFiltros();
    const eliminarFiltrosModal = new bootstrap.Modal(document.getElementById('eliminarFiltrosModal'));
    eliminarFiltrosModal.hide();
}

// Función para eliminar todos los filtros y mostrar todas las asignaturas
function eliminarFiltros() {
    document.getElementById("grado").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("grupo").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("keyword").value = "";

    // Mostrar todas las asignaturas
    generateHTMLForClases(clases);
}

// Función para mostrar los detalles de una clase
function mostrarDetallesClase(clase) {
    const classDetails = document.getElementById('class-details');
    classDetails.innerHTML = `
        <h2>${clase.nombre}</h2>
        <p><strong>Grado:</strong> ${clase.grado}</p>
        <p><strong>Curso:</strong> ${clase.curso}</p>
        <p><strong>Grupo:</strong> ${clase.grupo}</p>
        <p><strong>Tipo:</strong> ${clase.tipo}</p>
        <p><strong>Día:</strong> ${clase.dia}</p>
        <p><strong>Hora:</strong> ${clase.hora}</p>
    `;

    const classDetailsModal = document.getElementById('class-details-modal');
    classDetailsModal.style.display = 'block';
}

// Función para cerrar el modal de detalles de clase
function closeModal() {
    const classDetailsModal = document.getElementById('class-details-modal');
    classDetailsModal.style.display = 'none';
}



// Evento DOMContentLoaded para inicializar eventos
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar todas las clases al cargar
    generateHTMLForClases(clases);

    const btnAplicarFiltros = document.getElementById('btnAplicarFiltros');
    btnAplicarFiltros.addEventListener('click', aplicarFiltros);


});
