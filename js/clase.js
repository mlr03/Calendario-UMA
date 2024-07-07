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

// ARRAY QUE REPRESENTA LAS DIFERENTES CLASES 
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


// PARA ALMACENAR LAS CLASES AÑADIDAS
localStorage.setItem('clases', JSON.stringify(clases)); 


// FUNCIÓN PARA APLICAR FILTROS
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



// FUNCIÓN PARA GENERAR EL HTML DE LAS CLASES MOSTRADAS
function generateHTMLForClases(clasesMostrados) {
    const dayColumns = {
        'Lunes': document.querySelector('[aria-label="lunes"]'),
        'Martes': document.querySelector('[aria-label="martes"]'),
        'Miércoles': document.querySelector('[aria-label="miercoles"]'),
        'Jueves': document.querySelector('[aria-label="jueves"]'),
        'Viernes': document.querySelector('[aria-label="viernes"]')
    };

    Object.values(dayColumns).forEach(column => {
        column.querySelectorAll('.time-slot').forEach(slot => {
            slot.innerHTML = '';
        });
    });

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


            classDiv.setAttribute('aria-label', `Clase de ${clase.nombre}`);
            classDiv.setAttribute('tabindex', '0');

           
             classDiv.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    mostrarDetallesClase(clase);
                }
            });

         
            classDiv.addEventListener('click', () => {
                mostrarDetallesClase(clase);
            });

            timeSlot.appendChild(classDiv);
        }
    });

    
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




// FUNCIÓN PARA MOSTRAR LOS DETALLES DE LAS CLASES
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
    <button class="close" onclick="closeModal()" tabindex="0" aria-label="Cerrar ventana">&times;</button>
    <button id="delete-class-button" tabindex='0' aria-label="Eliminar clase">Eliminar Clase</button>
    `;

    const classDetailsModal = document.getElementById('class-details-modal');
    classDetailsModal.style.display = 'block';
    classDetailsModal.setAttribute('tabindex', '0');
    classDetailsModal.focus();

    
    classDetailsModal.addEventListener('focusout', handleFocusOut);

    const deleteButton = document.getElementById('delete-class-button');


    deleteButton.addEventListener('click', () => {
        const modalEliminarClase = document.getElementById('myModalClase');
        const aceptarBtnEliminar = document.getElementById('aceptarBtnEliminar');
        const cancelarBtnEliminar = document.getElementById('cancelarBtnEliminar');


        classDetailsModal.style.display = 'none';
        modalEliminarClase.style.display = 'block';
        aceptarBtnEliminar.focus();


        modalEliminarClase.addEventListener('focusout', (event) => {
            if (!modalEliminarClase.contains(event.relatedTarget)) {
                aceptarBtnEliminar.focus();
            }
        });


        aceptarBtnEliminar.addEventListener('click', () => {
            eliminarClase(clase);
            
            modalEliminarClase.style.display = 'none';
        });


        cancelarBtnEliminar.addEventListener('click', () => {
            modalEliminarClase.style.display = 'none';
        });

  
        modalEliminarClase.addEventListener('click', (event) => {
            if (event.target === modalEliminarClase) {
                modalEliminarClase.style.display = 'none';
            }
        });
    });

    $('#modalDetallesClase').modal('show');
}



// FUNCIÓN ELIMINAR CLASE
function eliminarClase(clase) {

    const index = clases.findIndex(c => c.nombre === clase.nombre && c.dia === clase.dia && c.hora === clase.hora);
    const classDetailsModal = document.getElementById('class-details-modal');

    if (index !== -1) {
     
        clases.splice(index, 1);
        localStorage.setItem('clases', JSON.stringify(clases));
        aplicarFiltros();
        $('#modalDetallesClase').modal('hide');
    }
}



// FUNCIÓN PARA QUE AL  CERRAR EL MODAL DE "DETALLES CLASE" EL FOCO  SE MUEVA A LA SIGUIENTE FRANJA HORARIA
function closeModal(scheduleId) {
    const classDetailsModal = document.getElementById('class-details-modal');
    classDetailsModal.style.display = 'none';
    const currentSchedule = document.querySelector(`.time-slot[data-schedule-id="${scheduleId}"]`);
    const nextSchedule = document.querySelector(`.time-slot[data-schedule-id="${parseInt(scheduleId) + 1}"]`);

    if (nextSchedule) {
        nextSchedule.focus();
    } else {

        const firstSchedule = document.querySelector('.time-slot[data-schedule-id="1"]');
        if (firstSchedule) {
            firstSchedule.focus();
        }
    }
}



// FUNCIÓN PARA MANEJAR EL FOCO DEL MODAL DE "DETALLES CLASE"
function handleFocusOut(event) {
    const classDetailsModal = document.getElementById('class-details-modal');
    if (!classDetailsModal.contains(event.relatedTarget)) {
        document.getElementById('class-name').focus();
    }
}



// FUNCIÓN PARA MOSTRAR EL MODAL DE ERROR SI NO SE COMPELTAN LOS CAMPOS DE "AÑADIR CLASE"
function mostrarModal() {
    const modal = document.getElementById('myModal-error');
    modal.style.display = 'block';
    trapFocus(modal);
}


// FUNCIÓN PARA CERRAR EL MODAL DE ERROR SI NO SE COMPELTAN LOS CAMPOS DE "AÑADIR CLASE"
function closeModalEliminar() {
    const modal = document.getElementById('myModal-error');
    modal.style.display = 'none';
    releaseFocus();
}

 // FUNCIÓN PARA MOSTRAR EL MODAL DE ERROR SI EL GRADO ,CURSO Y GRUPO ESTÁ OCUPADO DE "AÑADIR CLASE"  
function mostrarModalExiste() {
    const modal = document.getElementById('myModal-error-existe');
    modal.style.display = 'block';
    trapFocus(modal);
}

// FUNCIÓN PARA CERRAR MODAL DE ERROR SI EL GRADO ,CURSO Y GRUPO ESTÁ OCUPADO DE "AÑADIR CLASE"  
function closeModalEliminarExiste() {
    const modal = document.getElementById('myModal-error-existe');
    modal.style.display = 'none';
    releaseFocus();
}

// ATRAPA EL FOCO EN LOS MODALES DE ERROR DE AÑADIR CLASE
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

// LIBERA EL FOCO DEL MODAL EN LOS MODALES DE ERROR DE AÑADIR CLASE
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


    if (nombre && dia && hora && grado && curso && grupo && tipo) {
        const claseExistente = clases.some(clase =>
            clase.dia === dia && clase.hora === hora && clase.grado === grado && clase.curso === curso && clase.grupo === grupo
        );

        if (claseExistente) {
            mostrarModalExiste();
        } else {
          
            const nuevaClase = new Clase(nombre, dia, hora, grado, curso, grupo, tipo);

            clases.push(nuevaClase);
            localStorage.setItem('clases', JSON.stringify(clases));

            aplicarFiltros();
        }
    } else {
        
        mostrarModal();
    }

    //LIMPIA EL FORMULARIO EN TODOS LOS CASOS
    document.getElementById('nombreClase').value = '';
    document.getElementById('diaClase').value = '';
    document.getElementById('horaClase').value = '';
    document.getElementById('gradoClase').value = '';
    document.getElementById('cursoClase').value = '';
    document.getElementById('grupoClase').value = '';
    document.getElementById('tipoClase').value = '';
}


document.addEventListener('DOMContentLoaded', () => {

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

        }else if(nombreClase === 'Proyectos y Legislación'){
            
            cursoClaseSelect.innerHTML = '<option value="4">4</option>'; // Solo el curso 4

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




    //FUNCIÓN DEL  MODAL DE ELIMINAR FILTROS
    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById("myModal");
        const btnEliminarFiltros = document.getElementById("eliminarFiltrosBtn");
        const btnAceptar = document.getElementById("aceptarBtn");
        const btnCancelar = document.getElementById("cancelarBtn");
        
        let previouslyFocusedElement;
    

        btnEliminarFiltros.onclick = function() {
            previouslyFocusedElement = document.activeElement;
            modal.style.display = "block";

            btnAceptar.focus();
            modal.addEventListener('keydown', trapFocus);
        }
    
      
        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    
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
    
  
        btnCancelar.onclick = function() {
            closeModal();
        }
    
    
        // FUNCIÓN PARA CERRAR EL MODAL DE DETALLES CLASE
        function closeModal() {
            modal.style.display = "none";
            if (previouslyFocusedElement) {
                previouslyFocusedElement.focus();
            }
            modal.removeEventListener('keydown', trapFocus);
        }
    
        //FUNCIÓN PARA MANTENER EL FOCO EN EL MODAL DE DETALLES CLASE
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
    
        const btnAplicarFiltros = document.getElementById('btnAplicarFiltros');
        btnAplicarFiltros.addEventListener('click', aplicarFiltros);
    
  
        generateHTMLForClases(clases);
    });

    