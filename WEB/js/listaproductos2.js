function mostrarProductos() {
    fetch('../api/listaproductos.php')
        .then(response => response.json())
        .then(data => {
            const productos = data;
            const contenedorb =  document.getElementById('menus-container-burger') 
            const contenedord =document.getElementById('menus-container-drink');
            contenedorb.innerHTML = '';
            contenedord.innerHTML = '' // Limpiar el contenedor antes de agregar nuevos productos

            productos.forEach(function (producto) {
                if (producto.stock >0) { // Filtrar los productos según el tipo y el término de búsqueda
                    var menuDiv = document.createElement('div');
                    menuDiv.classList.add('menu');
                    var nombreClase = producto.nombre.replace(/\s+/g, '_');
                    menuDiv.classList.add(nombreClase); // Asignar la clase según el nombre del producto
                    menuDiv.setAttribute('data-menu', producto.nombre); // Asignar el atributo data-menu

                    // Crear un elemento img para la imagen del producto
                    var img = document.createElement('img');
                    img.src = producto.foto; // Asignar la ruta de la imagen
                    img.alt = producto.nombre; // Asignar el texto alternativo

                    // Crear un elemento h2 para el precio del producto
                    var price = document.createElement('h2');
                    price.classList.add('price');
                    price.textContent = producto.precio + '€'; // Asignar el precio

                    // Crear un elemento div con la clase "desc-item" para la descripción del producto
                    var descItemDiv = document.createElement('div');
                    descItemDiv.classList.add('desc-item');

                    // Crear un elemento h3 para el nombre del producto
                    var h3 = document.createElement('h3');
                    h3.textContent = producto.nombre;

                    // Crear un elemento p para la descripción del producto
                    var p = document.createElement('p');
                    p.textContent = producto.descripcion;

                    // Crear un elemento button para agregar el producto
                    var button = document.createElement('button');
                    button.type = 'button';
                    button.innerHTML = '&#43;';

                    // Agregar los elementos creados al menú
                    descItemDiv.appendChild(h3);
                    descItemDiv.appendChild(p);
                    menuDiv.appendChild(img);
                    menuDiv.appendChild(price);
                    menuDiv.appendChild(descItemDiv);
                    menuDiv.appendChild(button);
                    if(producto.tipo == "comida")
                    contenedorb.appendChild(menuDiv);
                    else
                    contenedord.appendChild(menuDiv)
                }
            });
        })
        .catch(error => console.error('Hubo un error:', error));
}

/*document.getElementById('search-input').addEventListener('input', function() {
    const searchTerm = this.value;
    mostrarProductos('comida', searchTerm);
    mostrarProductos('bebida', searchTerm);
});

window.onload = function () {
    mostrarProductos('comida');
    mostrarProductos('bebida');
}*/
document.getElementById('search-input').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase(); // Obtener el término de búsqueda y convertirlo a minúsculas
    const allMenus = document.querySelectorAll('.menu'); // Obtener todos los elementos con la clase 'menu'

    allMenus.forEach(menu => {
        const productName = menu.dataset.menu.toLowerCase(); // Obtener el nombre del producto y convertirlo a minúsculas
        const isVisible = productName.includes(searchTerm); // Verificar si el término de búsqueda está incluido en el nombre del producto

        // Mostrar u ocultar el menú según si coincide con el término de búsqueda
        menu.style.display = isVisible ? 'block' : 'none';
    });
});

mostrarProductos()
