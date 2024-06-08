document.addEventListener("DOMContentLoaded", function() {
    var userIcon = document.getElementById("user-icon");
    var userMenu = document.querySelector(".user-menu");

    userIcon.addEventListener("click", function(event) {
        // Si el submenú está activo, lo desactiva; si no, lo activa
        userMenu.classList.toggle("active");
        event.stopPropagation(); // Evita que el clic se propague a los elementos padre
    });

    // Cierra el submenú si se hace clic en cualquier lugar fuera de él
    document.addEventListener("click", function(event) {
        var isClickInside = userIcon.contains(event.target) || userMenu.contains(event.target);
        if (!isClickInside) {
            userMenu.classList.remove("active");
        }
    });
});