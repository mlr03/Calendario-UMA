/* script.js */

document.addEventListener('DOMContentLoaded', function() {
    const coursesData = [
        { course: 'curso1', subjects: ['Matemáticas', 'Física', 'Química'] },
        { course: 'curso2', subjects: ['Historia', 'Literatura', 'Geografía'] },
        // Agrega más cursos y asignaturas según necesites
    ];

    const courseFilter = document.getElementById('courseFilter');
    const calendar = document.getElementById('calendar');
    const detailsModal = document.getElementById('detailsModal');
    const detailsContent = document.getElementById('detailsContent');
    const closeModal = document.querySelector('.close');

    function renderSubjects(course) {
        calendar.innerHTML = ''; // Limpiar el contenido previo del calendario

        coursesData.forEach(item => {
            if (course === 'todos' || item.course === course) {
                item.subjects.forEach(subject => {
                    const subjectElement = document.createElement('div');
                    subjectElement.classList.add('course');
                    subjectElement.textContent = subject;
                    subjectElement.addEventListener('click', () => {
                        showDetails(subject, item.course);
                    });
                    calendar.appendChild(subjectElement);
                });
            }
        });
    }

    function showDetails(subject, course) {
        detailsContent.innerHTML = `<h2>${subject}</h2><p>Detalles sobre la asignatura de ${subject} del ${course}.</p>`;
        detailsModal.style.display = 'block';
    }

    closeModal.addEventListener('click', function() {
        detailsModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === detailsModal) {
            detailsModal.style.display = 'none';
        }
    });

    courseFilter.addEventListener('change', function() {
        const selectedCourse = this.value;
        renderSubjects(selectedCourse);
    });

    renderSubjects('todos'); // Mostrar todas las asignaturas al cargar la página inicialmente
});
