// 
//      mostrarProductos()
//

function mostrarProductos() {


    const thNombre = document.getElementById('Nombre');
    thNombre.addEventListener('click', () => {
        ordenarProductoPorNombre();
    });

    const thStock = document.getElementById('Stock');
    thStock.addEventListener('click', () => {
        ordenarProductoPorStock();
    });

    const thPrecio = document.getElementById('Precio'); // Suponiendo que se use este ID
    thPrecio.addEventListener('click', () => {
        ordenarProductoPorPrecio();
    });

    const thTipo = document.getElementById('Tipo'); // Suponiendo que se use este ID
    thTipo.addEventListener('click', () => {
        ordenarProductoPorTipo();
    });

    fetch('../api/listaproductos.php')
    .then(response => response.json())
    .then(data => {
        const listadoProductos = document.getElementById('listado-Productos');


        listadoProductos.innerHTML = '';


        data.forEach(producto => {
                const fila = document.createElement('tr');

                const nombre = document.createElement('td');
                nombre.textContent = producto.nombre;
                fila.appendChild(nombre);


                const pose_x = document.createElement('td');
                pose_x.textContent = producto.pose_x;
                fila.appendChild(pose_x);

                const pose_y = document.createElement('td');
                pose_y.textContent = producto.pose_y;
                fila.appendChild(pose_y);

                
                const pose_w = document.createElement('td');
                pose_w.textContent = producto.pose_w;
                fila.appendChild(pose_w);

                const stock = document.createElement('td');
                stock.textContent = producto.stock;
                fila.appendChild(stock);

                const precio = document.createElement('td');
                precio.textContent = producto.precio;
                fila.appendChild(precio);

                const tipo = document.createElement('td');
                tipo.textContent = producto.tipo;
                fila.appendChild(tipo);


                const acciones = document.createElement('td');

                const editar = document.createElement('a');
                editar.href = '#';
                editar.textContent = 'Editar';
                editar.addEventListener('click',() => editarProducto(producto.id_producto,producto.nombre))

                const eliminar = document.createElement('a');
                eliminar.href = '#';
                eliminar.textContent = 'Eliminar';
                eliminar.addEventListener('click', () => eliminarProducto(producto.id_producto,producto.nombre,producto.foto));
                acciones.appendChild(editar)
         
                acciones.appendChild(eliminar);

                fila.appendChild(acciones);

                listadoProductos.appendChild(fila);

        });
    })
    .catch(error => console.error('Hubo un error:', error));
}

function filtrarProductos() {
    const valorBusqueda = document.getElementById('buscador').value.toLowerCase();
    const filasProductos = document.querySelectorAll('#listado-Productos tr');

    filasProductos.forEach(fila => {
        const nombre = fila.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const tipo = fila.querySelector('td:nth-child(7)').textContent.toLowerCase();

        if (nombre.includes(valorBusqueda) || tipo.includes(valorBusqueda)) {
            fila.style.display = 'table-row';
        } else {
            fila.style.display = 'none';
        }
    });
}

function eliminarProducto(id_producto, nombre, foto) {
    if (confirm('¿Estás seguro de que quieres eliminar a ' + nombre + '?')) {
        fetch(`../api/eliminarproducto.php?id_producto=${id_producto}&foto=${foto}`, { method: 'DELETE' })
            .then(() => {
                alert("El producto se eliminó correctamente");
                mostrarProductos();
            })
            .catch(error => alert('Error: ' + "Error al eliminar el producto"), error);
    }
}

function editarProducto(id_producto, nombre) {
    if (confirm('¿Estás seguro de que quieres editar a ' + nombre + '?')) {
        window.location.href = "../html/editarproducto.html?id_producto=" + id_producto;
    }
}



let estadoOrdenNombre = 'ascendente'; // Estado actual del orden de nombre

function ordenarProductoPorNombre() {
    const filaProductos = Array.from(document.querySelectorAll('#listado-Productos tr'));

    filaProductos.sort((filaA, filaB) => {
        const nombreA = filaA.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const nombreB = filaB.querySelector('td:nth-child(1)').textContent.toLowerCase();

        if (nombreA === nombreB) {
            return 0;
        } else if (estadoOrdenNombre === 'ascendente') {
            return nombreA < nombreB ? -1 : 1;
        } else {
            return nombreA > nombreB ? -1 : 1;
        }
    });

    const listadoProductos = document.getElementById('listado-Productos');
    filaProductos.forEach(fila => {
        listadoProductos.appendChild(fila);
    });

    // Cambiar el estado de orden actual de nombre
    estadoOrdenNombre = estadoOrdenNombre === 'ascendente' ? 'descendente' : 'ascendente';
}


let estadoOrdenStock = 'ascendente'; // Estado actual del orden de nombre

function ordenarProductoPorStock() {
    const filaProductos = Array.from(document.querySelectorAll('#listado-Productos tr'));

    filaProductos.sort((filaA, filaB) => {
        const nombreA = filaA.querySelector('td:nth-child(5)').textContent.toLowerCase();
        const nombreB = filaB.querySelector('td:nth-child(5)').textContent.toLowerCase();

        if (nombreA === nombreB) {
            return 0;
        } else if (estadoOrdenNombre === 'ascendente') {
            return nombreA < nombreB ? -1 : 1;
        } else {
            return nombreA > nombreB ? -1 : 1;
        }
    });

    const listadoProductos = document.getElementById('listado-Productos');
    filaProductos.forEach(fila => {
        listadoProductos.appendChild(fila);
    });

    // Cambiar el estado de orden actual de nombre
    estadoOrdenNombre = estadoOrdenNombre === 'ascendente' ? 'descendente' : 'ascendente';
}

let estadoOrdenPrecio = 'ascendente'; // Estado actual del orden de nombre

function ordenarProductoPorPrecio() {
    const filaProductos = Array.from(document.querySelectorAll('#listado-Productos tr'));

    filaProductos.sort((filaA, filaB) => {
        const nombreA = filaA.querySelector('td:nth-child(6)').textContent.toLowerCase();
        const nombreB = filaB.querySelector('td:nth-child(6)').textContent.toLowerCase();

        if (nombreA === nombreB) {
            return 0;
        } else if (estadoOrdenNombre === 'ascendente') {
            return nombreA < nombreB ? -1 : 1;
        } else {
            return nombreA > nombreB ? -1 : 1;
        }
    });

    const listadoProductos = document.getElementById('listado-Productos');
    filaProductos.forEach(fila => {
        listadoProductos.appendChild(fila);
    });

    // Cambiar el estado de orden actual de nombre
    estadoOrdenNombre = estadoOrdenNombre === 'ascendente' ? 'descendente' : 'ascendente';
}


let estadoOrdenTipo = 'ascendente'; // Estado actual del orden de nombre

function ordenarProductoPorTipo() {
    const filaProductos = Array.from(document.querySelectorAll('#listado-Productos tr'));

    filaProductos.sort((filaA, filaB) => {
        const nombreA = filaA.querySelector('td:nth-child(7)').textContent.toLowerCase();
        const nombreB = filaB.querySelector('td:nth-child(7)').textContent.toLowerCase();

        if (nombreA === nombreB) {
            return 0;
        } else if (estadoOrdenNombre === 'ascendente') {
            return nombreA < nombreB ? -1 : 1;
        } else {
            return nombreA > nombreB ? -1 : 1;
        }
    });

    const listadoProductos = document.getElementById('listado-Productos');
    filaProductos.forEach(fila => {
        listadoProductos.appendChild(fila);
    });

    // Cambiar el estado de orden actual de nombre
    estadoOrdenNombre = estadoOrdenNombre === 'ascendente' ? 'descendente' : 'ascendente';
}

mostrarProductos()