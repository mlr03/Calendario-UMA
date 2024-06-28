// script.js

document.addEventListener('DOMContentLoaded', () => {
    const subjects = [
        { id: 1, name: 'Asignatura 1', course: 'course1', details: 'Detalles de la Asignatura 1' },
        { id: 2, name: 'Asignatura 2', course: 'course1', details: 'Detalles de la Asignatura 2' },
        { id: 3, name: 'Asignatura 3', course: 'course2', details: 'Detalles de la Asignatura 3' },
        // Agrega más asignaturas según sea necesario
    ];

    const filter = document.getElementById('course-filter');
    const calendarContainer = document.getElementById('calendar-container');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-details');
    const closeModal = document.getElementsByClassName('close')[0];

    function renderSubjects(course) {
        calendarContainer.innerHTML = '';
        const filteredSubjects = course === 'all' ? subjects : subjects.filter(subject => subject.course === course);
        filteredSubjects.forEach(subject => {
            const subjectElement = document.createElement('div');
            subjectElement.className = 'subject';
            subjectElement.innerText = subject.name;
            subjectElement.onclick = () => showDetails(subject);
            calendarContainer.appendChild(subjectElement);
        });
    }

    function showDetails(subject) {
        modalContent.innerText = subject.details;
        modal.style.display = 'block';
    }

    filter.onchange = () => {
        renderSubjects(filter.value);
    };

    closeModal.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    renderSubjects('all');
});
