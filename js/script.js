/* script.js */

document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
});

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    days.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('day-column');
        dayColumn.innerHTML = `<h3>${day}</h3>`;
        calendar.appendChild(dayColumn);
    });

    // Cargar las clases iniciales (esto debería venir de una base de datos o similar)
    const initialClasses = [
        { name: 'Matemáticas', grado: 'Grado 1', curso: 'Curso 1', grupo: 'A', tipo: 'Teórica', day: 'Lunes', time: '08:00' },
        { name: 'Física', grado: 'Grado 1', curso: 'Curso 1', grupo: 'B', tipo: 'Práctica', day: 'Martes', time: '10:00' }
    ];

    initialClasses.forEach(addClassToCalendar);
}

function addClassToCalendar(classInfo) {
    const dayColumn = Array.from(document.querySelectorAll('.day-column'))
        .find(column => column.querySelector('h3').textContent === classInfo.day);
    
    const classDiv = document.createElement('div');
    classDiv.classList.add('class');
    classDiv.textContent = `${classInfo.time} - ${classInfo.name}`;
    classDiv.dataset.details = JSON.stringify(classInfo);
    classDiv.onclick = () => showClassDetails(classInfo);
    
    dayColumn.appendChild(classDiv);
}

function showClassDetails(classInfo) {
    const detailsDiv = document.getElementById('class-details');
    detailsDiv.innerHTML = `
        <h2>${classInfo.name}</h2>
        <p><strong>Grado:</strong> ${classInfo.grado}</p>
        <p><strong>Curso:</strong> ${classInfo.curso}</p>
        <p><strong>Grupo:</strong> ${classInfo.grupo}</p>
        <p><strong>Tipo:</strong> ${classInfo.tipo}</p>
        <p><strong>Día:</strong> ${classInfo.day}</p>
        <p><strong>Hora:</strong> ${classInfo.time}</p>
    `;
}

function applyFilters() {
    const grado = document.getElementById('grado').value.toLowerCase();
    const curso = document.getElementById('curso').value.toLowerCase();
    const grupo = document.getElementById('grupo').value.toLowerCase();
    const tipo = document.getElementById('tipo').value.toLowerCase();
    const keyword = document.getElementById('keyword').value.toLowerCase();

    document.querySelectorAll('.class').forEach(classDiv => {
        const classInfo = JSON.parse(classDiv.dataset.details);
        const matches = (!grado || classInfo.grado.toLowerCase() === grado)
            && (!curso || classInfo.curso.toLowerCase() === curso)
            && (!grupo || classInfo.grupo.toLowerCase() === grupo)
            && (!tipo || classInfo.tipo.toLowerCase() === tipo)
            && (!keyword || classInfo.name.toLowerCase().includes(keyword));
        
        classDiv.style.display = matches ? '' : 'none';
    });
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

    const newClass = { name, grado, curso, grupo, tipo, day, time };
    addClassToCalendar(newClass);
    hideAddClassForm();
}

