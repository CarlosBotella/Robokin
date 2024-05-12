// Obtén los botones por su ID
const cuentaButton = document.getElementById('cuentaButton');
const adminButton = document.getElementById('adminButton');
const mesaButton = document.getElementById('mesaButton');

// Agrega un evento de clic a cada botón
cuentaButton.addEventListener('click', function() {
    window.location.href = 'login.html'; // Redirige a login.html
});

adminButton.addEventListener('click', function() {
    window.location.href = 'admin.html'; // Redirige a admin.html
});

mesaButton.addEventListener('click', function() {
    window.location.href = 'mesa.html'; // Redirige a mesa.html
});
