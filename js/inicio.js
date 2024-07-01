const ariaMessage = document.getElementById('ariaMessage');

document.getElementById('btnAplicarFiltros').addEventListener('click', function() {

    // Forzar reanudar la lectura del mensaje por el lector de pantalla
    ariaMessage.setAttribute('role', 'alert');
    ariaMessage.removeAttribute('role');
    ariaMessage.setAttribute('role', 'alert');
});

document.getElementById('btnEliminarFiltros').addEventListener('click', function() {

    // Abrir el modal de filtros

    var eliminarFiltrosModal = new bootstrap.Modal(document.getElementById('eliminarFiltrosModal'));
    eliminarFiltrosModal.show();
});

document.getElementById('confirmarEliminarFiltros').addEventListener('click', function() {

    // Actualizar el mensaje ARIA
    ariaMessage.textContent = 'Filtros eliminados';
    // Forzar reanudar la lectura del mensaje por el lector de pantalla
    ariaMessage.setAttribute('role', 'alert');
    ariaMessage.removeAttribute('role');
    ariaMessage.setAttribute('role', 'alert');

    // Cerrar el modal de filtros
    var eliminarFiltrosModal = bootstrap.Modal.getInstance(document.getElementById('eliminarFiltrosModal'));
    eliminarFiltrosModal.hide();

});

