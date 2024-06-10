document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto
    
    // Obtener valores del formulario
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // Verificar credenciales
    if ((email === 'admin@cloudbook.com' && password === 'admin') || (email === 'emmanuel.haro@cloudbook.com' && password === '12345')) {
        if (email === 'admin@cloudbook.com') {
            window.location.replace('admin.html'); // Redirigir al administrador a admin.html
        } else {
            window.location.replace('inicio.html'); // Redirigir al usuario normal a inicio.html
        }
    } else {
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
});