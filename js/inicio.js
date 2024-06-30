const ariaMessage = document.getElementById('ariaMessage');

document.getElementById('btnAplicarFiltros').addEventListener('click', function() {

    // Forzar reanudar la lectura del mensaje por el lector de pantalla
    ariaMessage.setAttribute('role', 'alert');
    ariaMessage.removeAttribute('role');
    ariaMessage.setAttribute('role', 'alert');
});


