document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    loadClassesFromStorage(); // Cargar clases almacenadas al cargar la página
});

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    
    // Limpiar el contenido previo del calendario si es necesario
    calendar.innerHTML = '';

    daysOfWeek.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('day-column');
        dayColumn.innerHTML = `<h3>${day}</h3>`;
        calendar.appendChild(dayColumn);
    });
}



function addClassToCalendar(classInfo) {
    const dayColumn = Array.from(document.querySelectorAll('.day-column'))
        .find(column => column.querySelector('h3').textContent === classInfo.day);
    
    const classDiv = document.createElement('div');
    classDiv.classList.add('class');
    classDiv.textContent = `${classInfo.time} - ${classInfo.name}`;
    classDiv.dataset.details = JSON.stringify(classInfo);
    classDiv.onclick = () => openModal(classDiv); // Asignar función al hacer clic
    
    dayColumn.appendChild(classDiv);
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

function showAddClassForm() {
    document.getElementById('add-class-form').style.display = 'block';
}

function hideAddClassForm() {
    document.getElementById('add-class-form').style.display = 'none';
}

function addClass() {
    const name = document.getElementById('new-class-name').value;
    const grado = document.getElementById('new-class-grado').value;
    const curso = document.getElementById('new-class-curso').value;
    const grupo = document.getElementById('new-class-grupo').value;
    const tipo = document.getElementById('new-class-tipo').value;
    const day = document.getElementById('new-class-day').value;
    const time = document.getElementById('new-class-time').value;

    const newClass = { id: generateId(), name, grado, curso, grupo, tipo, day, time };

    // Buscar el día correspondiente en el calendario
    const dayColumn = Array.from(document.querySelectorAll('.day-column'))
        .find(column => column.querySelector('h3').textContent === day);

    if (!dayColumn) {
        console.error(`No se encontró la columna para el día ${day}`);
        return;
    }

    // Crear el div de la clase
    const classDiv = document.createElement('div');
    classDiv.classList.add('class');
    classDiv.textContent = `${time} - ${name}`;
    classDiv.dataset.details = JSON.stringify(newClass);
    classDiv.onclick = () => openModal(classDiv); // Asignar función al hacer clic

    // Asignar a la franja horaria correspondiente
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('time-slot');
    slotDiv.textContent = timeSlots[time];
    slotDiv.appendChild(classDiv);

    // Verificar si ya hay clases para ese día y franja horaria
    let existingSlot = dayColumn.querySelector(`.time-slot[data-time="${time}"]`);
    if (!existingSlot) {
        existingSlot = document.createElement('div');
        existingSlot.classList.add('time-slot');
        existingSlot.dataset.time = time;
        dayColumn.appendChild(existingSlot);
    }

    existingSlot.appendChild(classDiv);

    saveClassToStorage(newClass); // Guardar la nueva clase en localStorage
    hideAddClassForm();
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

const timeSlots = {
    '08:45': '08:45 a 10:30',
    '10:30': '10:45 a 12:30',
    '12:45': '12:45 a 14:30'
};
