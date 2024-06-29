document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    loadClassesFromStorage(); // Cargar clases almacenadas al cargar la página
});

const defaultClasses = [
    { id: generateId(), name: 'Matemáticas I', grado: 'Ing. Informática', curso: '1º', grupo: 'A', tipo: 'Teórica', day: 'Martes', time: '08:45' },
    { id: generateId(), name: 'Proyectos y Legislación', grado: 'Ing. Informática', curso: '4º', grupo: 'C', tipo: 'Práctica', day: 'Lunes', time: '10:45' },
    { id: generateId(), name: 'Física I', grado: 'Ing. Software', curso: '1º', grupo: 'A', tipo: 'Teórica', day: 'Miércoles', time: '08:45' },
    { id: generateId(), name: 'Álgebra', grado: 'Ing. Informática', curso: '1º', grupo: 'B', tipo: 'Práctica', day: 'Jueves', time: '10:45' },
    { id: generateId(), name: 'Estructuras de Datos', grado: 'Ing.Computadores', curso: '2º', grupo: 'C', tipo: 'Teórica', day: 'Viernes', time: '12:45' },


    { id: generateId(), name: 'Interfaces de Usuario', grado: 'Ing. Software', curso: '3º', grupo: 'A', tipo: 'Teórica', day: 'Lunes', time: '10:45' },
    { id: generateId(), name: 'Programación I', grado: 'Ing. Informática', curso: '1º', grupo: 'A', tipo: 'Práctica', day: 'Lunes', time: '12:45' },
    { id: generateId(), name: 'Física I', grado: 'Ing. Computadores', curso: '1º', grupo: 'A', tipo: 'Teórica', day: 'Viernes', time: '08:45' },
    { id: generateId(), name: 'Interfaces de Usuario', grado: 'Ing. Software', curso: '3º', grupo: 'B', tipo: 'Práctica', day: 'Miércoles', time: '10:45' },
    { id: generateId(), name: 'Estructuras de Datos', grado: 'Ing. Computadores', curso: '2º', grupo: 'C', tipo: 'Teórica', day: 'Martes', time: '12:45' }
];

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Limpiar el calendario antes de generar

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    days.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('day-column');
        dayColumn.innerHTML = `
            <h3>${day}</h3>
            <div class="time-slot" data-slot-id="08:45">08:45 - 10:30</div>
            <div class="time-slot" data-slot-id="10:45">10:45 - 12:30</div>
            <div class="time-slot" data-slot-id="12:45">12:45 - 14:30</div>
        `;
        calendar.appendChild(dayColumn);
    });

    // Añadir las asignaturas fijas al calendario
    defaultClasses.forEach(addClassToCalendar);
}

function addClassToCalendar(classInfo) {
    const dayColumn = Array.from(document.querySelectorAll('.day-column'))
        .find(column => column.querySelector('h3').textContent === classInfo.day);

    const timeSlot = Array.from(dayColumn.querySelectorAll('.time-slot'))
        .find(slot => slot.dataset.slotId === classInfo.time);

    // Crear un div para la clase con solo el nombre de la asignatura
    const classDiv = document.createElement('div');
    classDiv.classList.add('class');
    classDiv.textContent = classInfo.name;
    classDiv.dataset.details = JSON.stringify(classInfo);
    classDiv.onclick = () => openModal(classDiv); // Asignar función al hacer clic

    timeSlot.appendChild(classDiv);
}

function openModal(selectedClassDiv) {
    const modal = document.getElementById('class-details-modal');
    const detailsDiv = document.getElementById('class-details');

    // Quitar la clase 'selected' de cualquier otra clase seleccionada
    document.querySelectorAll('.class').forEach(classDiv => {
        classDiv.classList.remove('selected');
    });

    selectedClassDiv.classList.add('selected'); // Marcar la clase como seleccionada

    const classInfo = JSON.parse(selectedClassDiv.dataset.details);

    detailsDiv.innerHTML = `
        <h2>${classInfo.name}</h2>
        <p><strong>Grado:</strong> ${classInfo.grado}</p>
        <p><strong>Curso:</strong> ${classInfo.curso}</p>
        <p><strong>Grupo:</strong> ${classInfo.grupo}</p>
        <p><strong>Tipo:</strong> ${classInfo.tipo}</p>
        <p><strong>Día:</strong> ${classInfo.day}</p>
        <p><strong>Hora:</strong> ${classInfo.time}</p>
    `;

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('class-details-modal');
    modal.style.display = 'none';
}

function clearForm() {
    // Limpiar todos los campos del formulario
    document.getElementById('new-class-name').value = '';
    document.getElementById('new-class-grado').value = 'Grado 1';
    document.getElementById('new-class-curso').value = 'Curso 1';
    document.getElementById('new-class-grupo').value = 'A';
    document.getElementById('new-class-tipo').value = 'Teórica';
    document.getElementById('new-class-day').value = 'Lunes';
    document.getElementById('new-class-time').value = '08:45';
}

function addClass() {
    const name = document.getElementById('new-class-name').value;
    const grado = document.getElementById('new-class-grado').value;
    const curso = document.getElementById('new-class-curso').value;
    const grupo = document.getElementById('new-class-grupo').value;
    const tipo = document.getElementById('new-class-tipo').value;
    const day = document.getElementById('new-class-day').value;
    const time = document.getElementById('new-class-time').value;

    // Validar que la hora de inicio coincida con las franjas horarias permitidas
    const validTimes = ['08:45', '10:45', '12:45'];
    if (!validTimes.includes(time)) {
        alert('Hora inválida. Las horas de inicio permitidas son: 08:45, 10:45, 12:45.');
        return;
    }

    const newClass = { id: generateId(), name, grado, curso, grupo, tipo, day, time };
    addClassToCalendar(newClass);
    saveClassToStorage(newClass); // Guardar la nueva clase en localStorage
    clearForm(); // Limpiar el formulario después de añadir una clase
}

function saveClassToStorage(newClass) {
    let classes = JSON.parse(localStorage.getItem('classes')) || [];
    classes.push(newClass);
    localStorage.setItem('classes', JSON.stringify(classes));
}

function loadClassesFromStorage() {
    const classes = JSON.parse(localStorage.getItem('classes')) || [];
    classes.forEach(addClassToCalendar);
}

function deleteSelectedClass() {
    const selectedClass = document.querySelector('.class.selected');
    if (selectedClass) {
        const classInfo = JSON.parse(selectedClass.dataset.details);
        deleteClass(classInfo.id);
        selectedClass.remove(); // Quitar visualmente la clase seleccionada
        closeModal(); // Cerrar el modal después de eliminar la clase
    } else {
        alert('Selecciona una clase para eliminarla.');
    }
}

function deleteClass(classId) {
    let classes = JSON.parse(localStorage.getItem('classes')) || [];
    classes = classes.filter(c => c.id !== classId);
    localStorage.setItem('classes', JSON.stringify(classes));
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9); // Generar un ID único aleatorio
}

function applyFilters() {
    const grado = document.getElementById('grado').value;
    const curso = document.getElementById('curso').value;
    const grupo = document.getElementById('grupo').value;
    const tipo = document.getElementById('tipo').value;
    const keyword = document.getElementById('keyword').value.toLowerCase();

    const classes = JSON.parse(localStorage.getItem('classes')) || [];

    // Filtrar clases según los criterios seleccionados
    const filteredClasses = classes.filter(c => {
        return (grado === '' || c.grado === grado) &&
               (curso === '' || c.curso === curso) &&
               (grupo === '' || c.grupo === grupo) &&
               (tipo === '' || c.tipo === tipo) &&
               (keyword === '' || c.name.toLowerCase().includes(keyword));
    });

    // Limpiar el calendario y volver a generar la estructura base
    generateCalendar();

    // Añadir las clases filtradas al calendario
    filteredClasses.forEach(addClassToCalendar);
}
