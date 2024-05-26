async function pagar() {
    $(document).ready(async function () {
        const totalText = document.getElementById("total2").textContent;
        const total = parseFloat(totalText.replace('€', ''));
        const fecha = obtenerFechaFormateada();
        const mesa = getParameterByName('nmesa');
        const robot = Math.floor(Math.random() * 2) + 1;

        try {
            // Esperar a que se resuelva la lista de IDs de productos con detalles
            const productosDetalles = await obtenerIDsProductosEnCesta();
            let haySuficienteStock = true;
            for (const producto of productosDetalles) {
                // Calcula el nuevo stock restando la cantidad del producto del stock actual
                const nuevoStock = producto.stock - producto.cantidad;
                // Si el nuevo stock es menor que 0, no hay suficiente stock
                if (nuevoStock < 0) {
                    haySuficienteStock = false;
                    break; // Sal del bucle tan pronto como encuentres un producto con stock insuficiente
                }
            }

            if (haySuficienteStock) {
                // Guardar el pedido principal
                const idPedido = await guardar_pedido(mesa, robot, total, fecha);
             

                // Guardar cada producto en el pedido con detalles
                for (const producto of productosDetalles) {
                    await guardar_pedido_producto(idPedido, producto.id_producto, producto.cantidad);
                    await actualizar_producto(producto.id_producto, producto.stock-producto.cantidad);

                }
                alert("El pedido se realizo correctamente")
                window.location.reload()
            }else
            {
                alert("No se puede realizar el pedido porque no queda suficiente stock")
            }



            // Aquí puedes manejar los datos como desees
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

function obtenerFechaFormateada() {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');
    const seconds = String(fecha.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function obtenerProductosEnCesta() {
    const productos = [];
    const orderItems = document.querySelectorAll('.order-item');
    orderItems.forEach(orderItem => {
        const nombreProducto = orderItem.querySelector('.details h5').textContent;
        const cantidadProducto = parseInt(orderItem.querySelector('.details small').textContent);
        productos.push({
            nombre: nombreProducto,
            cantidad: cantidadProducto
        });
    });
    return productos;
}

async function obtenerIDsProductosEnCesta() {
    try {
        // Obtener la lista de productos en la cesta
        const productosEnCesta = obtenerProductosEnCesta();

        // Array para almacenar los productos con ID y cantidad
        const productosConDetalles = [];

        // Recorrer cada producto y recuperar su ID
        for (const producto of productosEnCesta) {
            const data = await recuperar_producto(producto.nombre);
            productosConDetalles.push({
                id_producto: data.id_producto,
                stock: data.stock,
                cantidad: producto.cantidad
            });
        }

        return productosConDetalles;
    } catch (error) {
        console.error('Error al obtener los detalles de los productos:', error);
        // Manejar el error apropiadamente
        return [];
    }
}
