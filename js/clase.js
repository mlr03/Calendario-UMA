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
    new Clase('Matemática Discreta', 'Jueves', '08:45', 'Informática', 1, 'B', 'Teórica'),
    new Clase('Tecnologias Web', 'Martes', '10:45', 'Software', 3, 'A', 'Práctica'),
    new Clase('Estructuras de Computadores', 'Lunes', '08:45', 'Computadores', 2, 'C', 'Práctica'),
    new Clase('Interfaces de Usuario', 'Jueves', '08:45', 'Software', 3, 'A', 'Práctica'),
    new Clase('Organización Empresarial', 'Viernes', '12:45', 'Informática', 1, 'A', 'Teórica'),
    new Clase('Proyectos y Legislación', 'Miércoles', '08:45', 'Computadores', 4, 'B', 'Prueba'),
    new Clase('Análisis y Diseño de Algoritmos', 'Viernes', '08:45', 'Informática', 2, 'B', 'Teórica'),
    new Clase('Gestión de la Información', 'Martes', '12:45', 'Software', 3, 'A', 'Práctica'),
    new Clase('Sistemas Operativos', 'Viernes', '10:45', 'Computadores', 2, 'C', 'Prueba'),
    new Clase('Interfaces de Usuario', 'Miércoles', '08:45', 'Software', 3, 'A', 'Práctica'),
    new Clase('Sistemas Inteligentes', 'Jueves', '12:45', 'Computadores', 2, 'C', 'Prueba'),
    new Clase('Redes y Sistemas distribuidos', 'Martes', '08:45', 'Software', 2, 'A', 'Teórica'),
    new Clase('Mantenimiento', 'Lunes', '12:45', 'Software', 3, 'A', 'Práctica'),
    new Clase('Métodos estadísticos', 'Miércoles', '10:45', 'Software', 1, 'A', 'Práctica'),
    new Clase('Tecnología de Computadores', 'Jueves', '10:45', 'Informática', 1, 'A', 'Práctica'),
    new Clase('Métodos estadísticos', 'Lunes', '10:45', 'Software', 1, 'B', 'Teoría'),
    new Clase('Programación Concurrente', 'Miércoles', '12:45', 'Computadores',2 , 'A', 'Teórica'),
    new Clase('Organización Empresarial', 'Miércoles', '08:45', 'Software',2 , 'B', 'Teórica'),
    new Clase('Estructuras Algebráicas', 'Jueves', '12:45', 'Computadores',1 , 'A', 'Teórica'),
    new Clase('Estructuras Algebráicas', 'Lunes', '12:45', 'Informática',1 , 'B', 'Teórica'),
    new Clase('Interfaces de Usuario', 'Martes', '12:45', 'Software',3 , 'A', 'Teórica'),
    new Clase('Sistemas Inteligentes', 'Viernes', '12:45', 'Software',2 , 'B', 'Teórica'),
    new Clase('Matematica Discreta', 'Miércoles', '12:45', 'Informática',1 , 'B', 'Prueba'),
    new Clase('Gestión de la Información', 'Martes', '08:45', 'Software',3 , 'B', 'Práctica'),
    new Clase('Análisis y Diseño de Algoritmos', 'Viernes', '08:45', 'Software',2 , 'A', 'Teórica'),
    new Clase('Sistemas Operativos', 'Lunes', '08:45', 'Software',2 , 'A', 'Práctica'),
    


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

    // Limpiar mensajes de no hay clases
    Object.values(dayColumns).forEach(column => {
        column.querySelectorAll('.no-clases').forEach(message => {
            message.remove();
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

            // Añade atributos ARIA para cada clase
            classDiv.setAttribute('aria-label', `Clase de ${clase.nombre}`);
            classDiv.setAttribute('tabindex', '0');

            // Añade un evento de clic a cada clase para mostrar los detalles en el modal
            classDiv.addEventListener('click', () => {
                mostrarDetallesClase(clase);
            });

            // Añade la clase a la franja horaria correspondiente
            timeSlot.appendChild(classDiv);
        }
    });

    // Añadir mensaje "No hay clases en la franja actual" si no hay clases en una franja
    Object.values(dayColumns).forEach(column => {
        column.querySelectorAll('.time-slot').forEach(slot => {
            if (!slot.querySelector('.class')) {
                const noClasesMessage = document.createElement('div');
                noClasesMessage.classList.add('no-clases');
                noClasesMessage.textContent = 'No hay clases en la franja actual';
                noClasesMessage.setAttribute('tabindex', '0');
                slot.appendChild(noClasesMessage);
            }
        });
    });

    const totalClasesCount = document.getElementById("totalClasesCount");
    totalClasesCount.textContent = clasesMostrados.length;
}







// Función para mostrar los detalles de una clase
function mostrarDetallesClase(clase) {
    const classDetails = document.getElementById('class-details');
    classDetails.innerHTML = `
    <h2 id="class-name" tabindex='0' aria-label="Nombre de la clase: ${clase.nombre}">${clase.nombre}</h2>
    <p tabindex='0' aria-label="Grado: ${clase.grado}"><strong>Grado:</strong> ${clase.grado}</p>
    <p tabindex='0' aria-label="Curso: ${clase.curso}"><strong>Curso:</strong> ${clase.curso}</p>
    <p tabindex='0' aria-label="Grupo: ${clase.grupo}"><strong>Grupo:</strong> ${clase.grupo}</p>
    <p tabindex='0' aria-label="Tipo: ${clase.tipo}"><strong>Tipo:</strong> ${clase.tipo}</p>
    <p tabindex='0' aria-label="Día: ${clase.dia}"><strong>Día:</strong> ${clase.dia}</p>
    <p tabindex='0' aria-label="Hora: ${clase.hora}"><strong>Hora:</strong> ${clase.hora}</p>
    <span class="close" onclick="closeModal()" tabindex="0" aria-label="Cerrar ventana">&times;</span>
    `;

    const classDetailsModal = document.getElementById('class-details-modal');
    classDetailsModal.style.display = 'block';
    classDetailsModal.setAttribute('tabindex', '0');
    classDetailsModal.focus();

    // Añadir un evento focusout para mantener el foco dentro del modal
    classDetailsModal.addEventListener('focusout', handleFocusOut);
}



// Función para cerrar el modal y mover el foco a la siguiente franja horaria
function closeModal(scheduleId) {
    const classDetailsModal = document.getElementById('class-details-modal');
    classDetailsModal.style.display = 'none';

    // Mover el foco a la siguiente franja horaria
    const currentSchedule = document.querySelector(`.time-slot[data-schedule-id="${scheduleId}"]`);
    const nextSchedule = document.querySelector(`.time-slot[data-schedule-id="${parseInt(scheduleId) + 1}"]`);

    if (nextSchedule) {
        nextSchedule.focus();
    } else {
        // Si no hay siguiente franja horaria, volver a la primera
        const firstSchedule = document.querySelector('.time-slot[data-schedule-id="1"]');
        if (firstSchedule) {
            firstSchedule.focus();
        }
    }
}










// Manejar focusout del modal
function handleFocusOut(event) {
    const classDetailsModal = document.getElementById('class-details-modal');
    if (!classDetailsModal.contains(event.relatedTarget)) {
        document.getElementById('class-name').focus();
    }
}





// FUNCIÓN PARA AÑADIR UNA NUEVA CLASE
function agregarClase() {
    const nombre = document.getElementById('nombreClase').value;
    const dia = document.getElementById('diaClase').value;
    const hora = document.getElementById('horaClase').value;
    const grado = document.getElementById('gradoClase').value;
    const curso = parseInt(document.getElementById('cursoClase').value);
    const grupo = document.getElementById('grupoClase').value;
    const tipo = document.getElementById('tipoClase').value;

    // Verifica si todos los campos están completos
    if (nombre && dia && hora && grado && curso && grupo && tipo) {
        // Comprueba si ya existe una clase en el mismo día, hora, grado, curso y grupo
        const claseExistente = clases.some(clase =>
            clase.dia === dia && clase.hora === hora && clase.grado === grado && clase.curso === curso && clase.grupo === grupo
        );

        if (claseExistente) {
            // Muestra un mensaje de error si ya existe una clase en esa franja horaria
            alert('Ya existe una clase en esta franja horaria para el mismo grado, curso y grupo.');
        } else {
            // Crea una nueva instancia de la clase Clase
            const nuevaClase = new Clase(nombre, dia, hora, grado, curso, grupo, tipo);

            // Añadir la nueva clase al array y al localStorage
            clases.push(nuevaClase);
            localStorage.setItem('clases', JSON.stringify(clases));

            // Aplicar filtros y actualizar la vista del calendario
            aplicarFiltros();
        }
    } else {
        alert('Por favor, complete todos los campos requeridos.');
    }

    // Limpiar el formulario en todos los casos

    document.getElementById('nombreClase').value = '';
    document.getElementById('diaClase').value = '';
    document.getElementById('horaClase').value = '';
    document.getElementById('gradoClase').value = '';
    document.getElementById('cursoClase').value = '';
    document.getElementById('grupoClase').value = '';
    document.getElementById('tipoClase').value = '';

}


// Llamar a generateHTMLForClases al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar todas las clases al cargar
    generateHTMLForClases(clases);

    // CAMBIOS DE LOS DESPLEGABLES EN AÑADIR CLASE SEGÚN GRADO Y CURSO
    const nombreClaseSelect = document.getElementById('nombreClase');
    const cursoClaseSelect = document.getElementById('cursoClase');
    const gradoClaseSelect = document.getElementById('gradoClase');
    const grupoClaseSelect = document.getElementById('grupoClase');

    nombreClaseSelect.addEventListener('change', () => {
        const nombreClase = nombreClaseSelect.value;
        if (nombreClase === 'Matemática Discreta' || nombreClase === 'Estructuras Algebráicas' || nombreClase === 'Organización Empresarial' || nombreClase === 'Tecnología de Computadores') {
            cursoClaseSelect.innerHTML = '<option value="1">1</option>'; // Solo el curso 1
            gradoClaseSelect.innerHTML =`
            <option value="">Grado</option>
            <option value="Informática">Informática</option>
            <option value="Software">Software</option>
            <option value="Computadores">Computadores</option>
        `
            grupoClaseSelect.innerHTML = `
            <option value="">Grupo</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
    `


        }else if (nombreClase === 'Redes y Sistemas distribuidos' || nombreClase === 'Análisis y Diseño de Algorítmos' || nombreClase === 'Sistemas Inteligentes' || nombreClase === 'Sistemas Operativos' || nombreClase === 'Estructuras de Computadores'){
            cursoClaseSelect.innerHTML = '<option value="2">2</option>'; // Solo el curso 2
            gradoClaseSelect.innerHTML =`
            <option value="">Grado</option>
            <option value="Informática">Informática</option>
            <option value="Software">Software</option>
            <option value="Computadores">Computadores</option>
        `
            grupoClaseSelect.innerHTML = `
            <option value="">Grupo</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
    `

        }else if(nombreClase === 'Interfaces de Usuario'|| nombreClase === 'Gestión de la Información' || nombreClase ==='Tecnologías Web' || nombreClase === 'Mantenimiento' ){
            cursoClaseSelect.innerHTML = '<option value="3">3</option>'; // Solo el curso 3
            gradoClaseSelect.innerHTML = '<option value="Software">Software</option>';
            grupoClaseSelect.innerHTML = '<option value="A">A</option>';

        }else if(clases.push(nuevaClase)){


            cursoClaseSelect.innerHTML = `
            <option value="">Curso</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            `
            
            gradoClaseSelect.innerHTML =`
            <option value="">Grado</option>
            <option value="Informática">Informática</option>
            <option value="Software">Software</option>
            <option value="Computadores">Computadores</option>
        `

            grupoClaseSelect.innerHTML = `
            <option value="">Grupo</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        `



        } else {

            cursoClaseSelect.innerHTML = `
                <option value="">Curso</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            `
            
             gradoClaseSelect.innerHTML =`
             <option value="">Grado</option>
             <option value="Informática">Informática</option>
             <option value="Software">Software</option>
             <option value="Computadores">Computadores</option>
         `

            grupoClaseSelect.innerHTML = `
            <option value="">Grupo</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        `
            ; 
        }
    });



    
    });



    //MODAL DE ELIMINAR FILTROS Y MENSAJE

    document.addEventListener('DOMContentLoaded', () => {
        
        const modal = document.getElementById("myModal");
        const btnEliminarFiltros = document.getElementById("eliminarFiltrosBtn");
        const spanClose = document.getElementsByClassName("close")[0];
        const btnAceptar = document.getElementById("aceptarBtn");
        const btnCancelar = document.getElementById("cancelarBtn");
    
        // Mostrar el modal al hacer clic en el botón de eliminar filtros
        btnEliminarFiltros.onclick = function() {
            modal.style.display = "block";
        }
    
        // Cerrar el modal al hacer clic fuera del contenido del modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    
        // Eliminar filtros y cerrar el modal al hacer clic en "Aceptar"
        btnAceptar.onclick = function() {
            // Lógica para eliminar los filtros
            document.getElementById("grado").value = '';
            document.getElementById("curso").value = '';
            document.getElementById("grupo").value = '';
            document.getElementById("tipo").value = '';
            document.getElementById("keyword").value = '';
            aplicarFiltros();
            modal.style.display = "none";
        }
    
        // Cerrar el modal al hacer clic en "Cancelar"
        btnCancelar.onclick = function() {
            modal.style.display = "none";
        }
    
        // Lógica existente para aplicar filtros
        const btnAplicarFiltros = document.getElementById('btnAplicarFiltros');
        btnAplicarFiltros.addEventListener('click', aplicarFiltros);
    
        // Llamar a generateHTMLForClases al cargar la página
        generateHTMLForClases(clases);
    
    });
    

