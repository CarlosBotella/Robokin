function mostrarPedidosLista() {
    let estadoOrdenMesa = 'ascendente';
    let estadoOrdenRobot = 'ascendente';
    let estadoOrdenTotal = 'ascendente';
    let estadoOrdenFecha = 'ascendente';
    let estadoOrdenNumero = 'ascendente';

    function ordenarProductoPorMesa() {
        const filaPedidos = Array.from(document.querySelectorAll('#listado-Pedidos tr'));

        filaPedidos.sort((filaA, filaB) => {
            const mesaA = filaA.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const mesaB = filaB.querySelector('td:nth-child(2)').textContent.toLowerCase();

            if (mesaA === mesaB) {
                return 0;
            } else if (estadoOrdenMesa === 'ascendente') {
                return mesaA < mesaB ? -1 : 1;
            } else {
                return mesaA > mesaB ? -1 : 1;
            }
        });

        const listadoPedidos = document.getElementById('listado-Pedidos');
        filaPedidos.forEach(fila => {
            listadoPedidos.appendChild(fila);
        });

        estadoOrdenMesa = estadoOrdenMesa === 'ascendente' ? 'descendente' : 'ascendente';
    }

    function ordenarProductoPorRobot() {
        const filaPedidos = Array.from(document.querySelectorAll('#listado-Pedidos tr'));

        filaPedidos.sort((filaA, filaB) => {
            const robotA = filaA.querySelector('td:nth-child(3)').textContent.toLowerCase();
            const robotB = filaB.querySelector('td:nth-child(3)').textContent.toLowerCase();

            if (robotA === robotB) {
                return 0;
            } else if (estadoOrdenRobot === 'ascendente') {
                return robotA < robotB ? -1 : 1;
            } else {
                return robotA > robotB ? -1 : 1;
            }
        });

        const listadoPedidos = document.getElementById('listado-Pedidos');
        filaPedidos.forEach(fila => {
            listadoPedidos.appendChild(fila);
        });

        estadoOrdenRobot = estadoOrdenRobot === 'ascendente' ? 'descendente' : 'ascendente';
    }

    function ordenarProductoPorTotal() {
        const filaPedidos = Array.from(document.querySelectorAll('#listado-Pedidos tr'));
    
        filaPedidos.sort((filaA, filaB) => {
            const totalA = parseFloat(filaA.querySelector('td:nth-child(4)').textContent);
            const totalB = parseFloat(filaB.querySelector('td:nth-child(4)').textContent);
    
            if (totalA === totalB) {
                return 0;
            } else if (estadoOrdenTotal === 'ascendente') {
                return totalA < totalB ? -1 : 1;
            } else {
                return totalA > totalB ? -1 : 1;
            }
        });
    
        const listadoPedidos = document.getElementById('listado-Pedidos');
        filaPedidos.forEach(fila => {
            listadoPedidos.appendChild(fila);
        });
    
        estadoOrdenTotal = estadoOrdenTotal === 'ascendente' ? 'descendente' : 'ascendente';
    }
    

    function ordenarProductoPorFecha() {
        const filaPedidos = Array.from(document.querySelectorAll('#listado-Pedidos tr'));

        filaPedidos.sort((filaA, filaB) => {
            const fechaA = filaA.querySelector('td:nth-child(5)').textContent.toLowerCase();
            const fechaB = filaB.querySelector('td:nth-child(5)').textContent.toLowerCase();

            if (fechaA === fechaB) {
                return 0;
            } else if (estadoOrdenFecha === 'ascendente') {
                return fechaA < fechaB ? -1 : 1;
            } else {
                return fechaA > fechaB ? -1 : 1;
            }
        });

        const listadoPedidos = document.getElementById('listado-Pedidos');
        filaPedidos.forEach(fila => {
            listadoPedidos.appendChild(fila);
        });

        estadoOrdenFecha = estadoOrdenFecha === 'ascendente' ? 'descendente' : 'ascendente';
    }

    function ordenarProductoPorNumero() {
        const filaPedidos = Array.from(document.querySelectorAll('#listado-Pedidos tr'));
    
        filaPedidos.sort((filaA, filaB) => {
            const numeroA = parseInt(filaA.querySelector('td:nth-child(1)').textContent, 10);
            const numeroB = parseInt(filaB.querySelector('td:nth-child(1)').textContent, 10);
    
            if (numeroA === numeroB) {
                return 0;
            } else if (estadoOrdenNumero === 'ascendente') {
                return numeroA < numeroB ? -1 : 1;
            } else {
                return numeroA > numeroB ? -1 : 1;
            }
        });
    
        const listadoPedidos = document.getElementById('listado-Pedidos');
        filaPedidos.forEach(fila => {
            listadoPedidos.appendChild(fila);
        });
    
        estadoOrdenNumero = estadoOrdenNumero === 'ascendente' ? 'descendente' : 'ascendente';
    }
    

    document.getElementById('Mesa').addEventListener('click', ordenarProductoPorMesa);
    document.getElementById('Robot').addEventListener('click', ordenarProductoPorRobot);
    document.getElementById('Total').addEventListener('click', ordenarProductoPorTotal);
    document.getElementById('Fecha').addEventListener('click', ordenarProductoPorFecha);
    document.getElementById('Numero').addEventListener('click', ordenarProductoPorNumero);

    fetch('../api/listapedidos.php')
        .then(response => response.json())
        .then(data => {
            const listadoPedidos = document.getElementById('listado-Pedidos');
            listadoPedidos.innerHTML = '';

            data.forEach(pedido => {
                const p = recuperarProductos(pedido.id_pedido);
                const fila = document.createElement('tr');

                const numero = document.createElement('td');
                numero.textContent = pedido.id_pedido;
                fila.appendChild(numero);

                const id_mesa = document.createElement('td');
                id_mesa.textContent = pedido.id_mesa;
                fila.appendChild(id_mesa);

                const id_robot = document.createElement('td');
                id_robot.textContent = pedido.id_robot;
                fila.appendChild(id_robot);

                const total = document.createElement('td');
                total.textContent = pedido.total;
                fila.appendChild(total);

                const fecha = document.createElement('td');
                fecha.textContent = pedido.fecha;
                fila.appendChild(fecha);

                p.then(productos => {
                    const productoTd = document.createElement('td');
                    productos.forEach(producto => {
                        const productoInfo = document.createElement('div');
                        productoInfo.textContent = `${producto.nombre} (Cantidad: ${producto.cantidad})`;
                        productoTd.appendChild(productoInfo);
                    });
                    fila.appendChild(productoTd);
                }).catch(error => {
                    console.error('Error al recuperar los productos:', error);
                });

                listadoPedidos.appendChild(fila);
            });
        })
        .catch(error => console.error('Hubo un error:', error));
}

function filtrarPedidos() {
    const valorBusqueda = document.getElementById('buscador').value.toLowerCase();
    const filasPedidos = document.querySelectorAll('#listado-Pedidos tr');

    filasPedidos.forEach(fila => {
        let encontrado = false;
        const celdasProductos = fila.querySelectorAll('td:nth-child(6) div');
        const fecha = fila.querySelector('td:nth-child(5)').textContent.toLowerCase();

        celdasProductos.forEach(celdaProducto => {
            const nombreProducto = celdaProducto.textContent.toLowerCase();
            if (nombreProducto.includes(valorBusqueda)) {
                encontrado = true;
            }
        });

        if (fecha.includes(valorBusqueda)) {
            encontrado = true;
        }

        if (encontrado) {
            fila.style.display = 'table-row';
        } else {
            fila.style.display = 'none';
        }
    });
}

async function recuperarProductos(id_pedido) {
    var productosDetallados = [];
    try {
        var productos = await recuperar_productos_pedido(id_pedido);

        for (const producto of productos) {
            var p2 = await recuperar_producto2(parseInt(producto.id_producto));
            productosDetallados.push({
                nombre: p2.nombre,
                cantidad: producto.cantidad
            });
        }
        return productosDetallados;
    } catch (error) {
        console.error('Error al recuperar los productos:', error);
    }
}

mostrarPedidosLista();
