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
    new Clase('Tecnologías Web', 'Martes', '10:45', 'Software', 3, 'A', 'Práctica'),
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
    new Clase('Matemática Discreta', 'Miércoles', '12:45', 'Informática',1 , 'B', 'Prueba'),
    new Clase('Gestión de la Información', 'Martes', '08:45', 'Software',3 , 'B', 'Práctica'),
    new Clase('Análisis y Diseño de Algoritmos', 'Viernes', '08:45', 'Software',2 , 'A', 'Teórica'),
    new Clase('Sistemas Operativos', 'Lunes', '08:45', 'Software',2 , 'A', 'Práctica'),
    


];

localStorage.setItem('clases', JSON.stringify(clases));

// Función para aplicar los filtros
function aplicarFiltros() {
    const filtroGrado = document.getElementById("filtroGrado").value.toLowerCase();
    const filtroCurso = parseInt(document.getElementById("filtroCurso").value);
    const filtroGrupo = document.getElementById("filtroGrupo").value.toLowerCase();
    const filtroTipo = document.getElementById("filtroTipo").value.toLowerCase();
    const filtroNombre = document.getElementById("filtroNombre").value.toLowerCase();

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
    <button id="delete-class-button" tabindex='0' aria-label="Eliminar clase">Eliminar Clase</button>
    `;

    const classDetailsModal = document.getElementById('class-details-modal');
    classDetailsModal.style.display = 'block';
    classDetailsModal.setAttribute('tabindex', '0');
    classDetailsModal.focus();

    // Añadir un evento focusout para mantener el foco dentro del modal
    classDetailsModal.addEventListener('focusout', handleFocusOut);

    const deleteButton = document.getElementById('delete-class-button');

    // Añadir el manejador de eventos para el botón de eliminar
    deleteButton.addEventListener('click', () => {
        const modalEliminarClase = document.getElementById('myModalClase');
        const aceptarBtnEliminar = document.getElementById('aceptarBtnEliminar');
        const cancelarBtnEliminar = document.getElementById('cancelarBtnEliminar');

        // Mueve el foco al modal de eliminar clase
        classDetailsModal.style.display = 'none';
        modalEliminarClase.style.display = 'block';
        aceptarBtnEliminar.focus();

        // Añadir eventos para evitar que el foco salga del modal de eliminar clase
        modalEliminarClase.addEventListener('focusout', (event) => {
            if (!modalEliminarClase.contains(event.relatedTarget)) {
                aceptarBtnEliminar.focus();
            }
        });

        // Acción al hacer clic en Aceptar
        aceptarBtnEliminar.addEventListener('click', () => {
            eliminarClase(clase);
            // Cierra el modal de confirmación
            modalEliminarClase.style.display = 'none';
        });

        // Cierra el modal de confirmación al hacer clic en Cancelar
        cancelarBtnEliminar.addEventListener('click', () => {
            modalEliminarClase.style.display = 'none';
        });

        // Cierra el modal de confirmación al hacer clic fuera del contenido
        modalEliminarClase.addEventListener('click', (event) => {
            if (event.target === modalEliminarClase) {
                modalEliminarClase.style.display = 'none';
            }
        });
    });

    $('#modalDetallesClase').modal('show');
}

// Función ELIMINAR CLASE
function eliminarClase(clase) {
    // Encuentra el índice de la clase en el array
    const index = clases.findIndex(c => c.nombre === clase.nombre && c.dia === clase.dia && c.hora === clase.hora);
    const classDetailsModal = document.getElementById('class-details-modal');

    if (index !== -1) {
        // Elimina la clase del array
        clases.splice(index, 1);
        
        // Actualiza el localStorage
        localStorage.setItem('clases', JSON.stringify(clases));

        // Vuelve a aplicar los filtros para actualizar la vista
        aplicarFiltros();

        // Cierra el modal de detalles de clase
        $('#modalDetallesClase').modal('hide');
    }
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



// Función para mostrar el modal de error si no se completan todos los campos
function mostrarModal() {
    const modal = document.getElementById('myModal-error');
    modal.style.display = 'block';
    trapFocus(modal);
}

// Función para cerrar el modal de error si no se completan todos los campos
function closeModalEliminar() {
    const modal = document.getElementById('myModal-error');
    modal.style.display = 'none';
    releaseFocus();
}

// Función para mostrar el modal de error si el grado, grupo y curso está ocupado
function mostrarModalExiste() {
    const modal = document.getElementById('myModal-error-existe');
    modal.style.display = 'block';
    trapFocus(modal);
}

// Función para cerrar el modal de error si el grado, grupo y curso está ocupado
function closeModalEliminarExiste() {
    const modal = document.getElementById('myModal-error-existe');
    modal.style.display = 'none';
    releaseFocus();
}

// Atrapar el foco dentro del modal
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', function(event) {
        const isTabPressed = (event.key === 'Tab' || event.keyCode === 9);
        if (!isTabPressed) {
            return;
        }

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    });

    firstElement.focus();
}

// Liberar el foco cuando se cierra el modal
function releaseFocus() {
    document.removeEventListener('keydown', trapFocus);
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
            mostrarModalExiste();
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
        // Muestra el modal de error si los campos no están completos
        mostrarModal();
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




    //Función del MODAL DE ELIMINAR FILTROS

    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById("myModal");
        const btnEliminarFiltros = document.getElementById("eliminarFiltrosBtn");
        const btnAceptar = document.getElementById("aceptarBtn");
        const btnCancelar = document.getElementById("cancelarBtn");
        
        let previouslyFocusedElement;
    
        // Mostrar el modal al hacer clic en el botón de eliminar filtros
        btnEliminarFiltros.onclick = function() {
            previouslyFocusedElement = document.activeElement;
            modal.style.display = "block";
            // Foco en el primer elemento del modal
            btnAceptar.focus();
            // Añadir evento para gestionar el enfoque dentro del modal
            modal.addEventListener('keydown', trapFocus);
        }
    
        // Cerrar el modal al hacer clic fuera del contenido del modal
        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    
        // Eliminar filtros y cerrar el modal al hacer clic en "Aceptar"
        btnAceptar.onclick = function() {
            // Lógica para eliminar los filtros
            document.getElementById("filtroGrado").value = '';
            document.getElementById("filtroCurso").value = '';
            document.getElementById("filtroGrupo").value = '';
            document.getElementById("filtroTipo").value = '';
            document.getElementById("filtroNombre").value = '';
            aplicarFiltros();
            closeModal();
        }
    
        // Cerrar el modal al hacer clic en "Cancelar"
        btnCancelar.onclick = function() {
            closeModal();
        }
    
        // Cerrar el modal al presionar la tecla ESC
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    
        // Función para cerrar el modal y restaurar el enfoque previo
        function closeModal() {
            modal.style.display = "none";
            // Restaurar el foco en el elemento que estaba enfocado antes de mostrar el modal
            if (previouslyFocusedElement) {
                previouslyFocusedElement.focus();
            }
            // Eliminar el evento de trampa de enfoque
            modal.removeEventListener('keydown', trapFocus);
        }
    
        // Función para mantener el enfoque dentro del modal
        function trapFocus(event) {
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
    
            if (event.key === 'Tab') {
                if (event.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        }
    
        // Lógica existente para aplicar filtros
        const btnAplicarFiltros = document.getElementById('btnAplicarFiltros');
        btnAplicarFiltros.addEventListener('click', aplicarFiltros);
    
        // Llamar a generateHTMLForClases al cargar la página
        generateHTMLForClases(clases);
    });
    