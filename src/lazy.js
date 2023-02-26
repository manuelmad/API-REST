// Función que recibe el array de divs cargados y filtra aquellos cuyo valor de isIntersecting es true para aplicarles la función de cargar imagen
const observer = new IntersectionObserver((entries) => {
    entries.filter(isIntersecting).forEach(loadImage);
});

// Función para verificar que el div coincide con el viewport del usuario
const isIntersecting = (entry) => {
    return entry.isIntersecting;
}

// Función que  cambia el atributo de la etiqueta img de data-src por src, manteniendo el mismo valor
const loadImage = (entry) => {
    const container = entry.target;
    const imagen = container.firstChild;
    const url = imagen.dataset.src;
    imagen.src = url;
    console.log("img");
    observer.unobserve(container); // Deja de obsevar al div para que al pasar varias veces sobre él no se ejecute la función de nuevo.
}

// Función que aplica el método observe a los divs cargados, es decir, a los resultantes de la instancia del IntersectionObserver
const registerImage = (image) => {
    observer.observe(image);
}