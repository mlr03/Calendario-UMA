/* script.js */
document.addEventListener('DOMContentLoaded', function() {
    const coursesData = [
        { course: 'curso1', subjects: ['Matemáticas', 'Física', 'Química'] },
        { course: 'curso2', subjects: ['Historia', 'Literatura', 'Geografía'] },
        // Agrega más cursos y asignaturas según necesites
    ];

    const courseFilter = document.getElementById('courseFilter');
    const calendar = document.getElementById('calendar');

    function renderSubjects(course) {
        calendar.innerHTML = ''; // Limpiar el contenido previo del calendario

        coursesData.forEach(item => {
            if (course === 'todos' || item.course === course) {
                item.subjects.forEach(subject => {
                    const subjectElement = document.createElement('div');
                    subjectElement.classList.add('course');
                    subjectElement.textContent = subject;
                    subjectElement.addEventListener('click', () => {
                        alert(`Detalles de ${subject} del ${item.course}`);
                    
                    });
                    calendar.appendChild(subjectElement);
                });
            }
        });
    }

    courseFilter.addEventListener('change', function() {
        const selectedCourse = this.value;
        renderSubjects(selectedCourse);
    });

    renderSubjects('todos'); // Mostrar todas las asignaturas al cargar la página inicialmente
});