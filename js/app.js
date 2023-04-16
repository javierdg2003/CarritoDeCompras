// Seleccionar todos los botones de "Agregar al carrito"
const botones = document.querySelectorAll('.agregar-carrito');

// Recorrer todos los botones y agregar un evento click a cada uno
botones.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});

// Función para agregar un producto al carrito
function agregarAlCarrito(evento) {
    // Prevenir el comportamiento predeterminado del botón
    evento.preventDefault();

    // Obtener el botón que fue clickeado
    const boton = evento.target;

    // Obtener el id del producto que se quiere agregar al carrito
    const idProducto = boton.dataset.id;

    // Obtener la información del producto (nombre, precio, imagen, etc.) del HTML
    const nombreProducto = boton.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    const precioProducto = boton.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    const imagenProducto = boton.parentElement.parentElement.previousElementSibling ? boton.parentElement.parentElement.previousElementSibling.src : null;

    // Crear un objeto con la información del producto
    const producto = {
        id: idProducto,
        nombre: nombreProducto,
        precio: precioProducto,
        imagen: imagenProducto,
        cantidad: 1
    };

    // Agregar el producto al carrito
    agregarProductoAlCarrito(producto);
}

// Función para agregar un producto al carrito en el DOM
function agregarProductoAlCarrito(producto) {
    // Seleccionar la tabla donde se mostrará el carrito
    const tablaCarrito = document.querySelector('#lista-carrito tbody');

    // Crear una fila para el producto
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td><img src="${producto.imagen}" width=100></td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td><a href="#" class="borrar-producto" data-id="${producto.id}">X</a></td>
    `;

    // Agregar la fila al final de la tabla
    tablaCarrito.appendChild(fila);

    // Actualizar la cantidad de productos en el carrito en el ícono del carrito
    actualizarCantidadCarrito();
}

// Función para actualizar la cantidad de productos en el carrito en el ícono del carrito
function actualizarCantidadCarrito() {
    // Seleccionar el elemento donde se mostrará la cantidad de productos en el carrito
    const cantidadCarrito = document.querySelector('#cantidad-carrito');

    // Verificar si el elemento existe en el HTML
    if (cantidadCarrito) {
        // Obtener la cantidad de filas (productos) en la tabla del carrito
        const filas = document.querySelectorAll('#lista-carrito tbody tr');
        let cantidad = 0;
        filas.forEach(fila => {
            cantidad += parseInt(fila.querySelector('td:nth-child(4)').textContent);
        });

        // Mostrar la cantidad de productos en el carrito
        cantidadCarrito.textContent = cantidad;
    }
}

// VACIAR CARRITO //

// Seleccionar el botón de "Vaciar carrito"
const botonVaciarCarrito = document.querySelector('#vaciar-carrito');

// Agregar un evento click al botón de "Vaciar carrito"
botonVaciarCarrito.addEventListener('click', vaciarCarrito);

// Función para vaciar el carrito
function vaciarCarrito() {
    // Seleccionar la tabla donde se muestra el carrito
    const tablaCarrito = document.querySelector('#lista-carrito tbody');

    // Vaciar la tabla
    tablaCarrito.innerHTML = '';

    // Actualizar la cantidad de productos en el carrito en el ícono del carrito
    actualizarCantidadCarrito();
}



const botonesBorrar = document.querySelectorAll('.borrar-producto');

botonesBorrar.forEach(boton => {
  boton.addEventListener('click', borrarProductoDelCarrito);
});

function borrarProductoDelCarrito(evento) {
  // Prevenir el comportamiento predeterminado del botón
  evento.preventDefault();

  // Obtener el botón que fue clickeado
  const boton = evento.target;

  // Obtener el id del producto que se quiere borrar del carrito
  const idProducto = boton.dataset.id;

  // Buscar la fila del producto en el carrito
  const filaProducto = boton.closest('tr');

  // Eliminar la fila del producto del carrito
  filaProducto.remove();

  // Actualizar la cantidad de productos en el carrito en el ícono del carrito
  actualizarCantidadCarrito();
}
