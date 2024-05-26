function confirmar(){
    $(document).ready(async function () {
        var nombre = document.getElementById("nombre").value
        var pose_x = document.getElementById("pose_x").value
        var pose_y = document.getElementById("pose_y").value
        var pose_w = document.getElementById("pose_w").value
        var stock = document.getElementById("stock").value
        var precio = document.getElementById("precio").value
        var tipo = document.getElementById("tipo").value
        var descripcion = document.getElementById("descripcion").value

        var id_producto = getParameterByName('id_producto')

        actualizar_producto2(id_producto,nombre,pose_x,pose_y,pose_w,stock,precio,tipo,descripcion)
        .then(() => {
            alert("El producto se ha actualizado correctamente.");
            window.location.href = "listaproductos.html";
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un error al actualizar el producto. Por favor, inténtalo de nuevo.");
        });
    });
}

async function mostrar_producto()
{
    $(document).ready(async function () {
        var nombre = document.getElementById("nombre")
        var pose_x = document.getElementById("pose_x")
        var pose_y = document.getElementById("pose_y")
        var pose_w = document.getElementById("pose_w")
        var stock = document.getElementById("stock")
        var precio = document.getElementById("precio")
        var tipo = document.getElementById("tipo")
        var descripcion = document.getElementById("descripcion")

        var id_producto = getParameterByName('id_producto')

        try {
            var producto = await recuperar_producto2(id_producto);

            nombre.value = producto.nombre;
            pose_x.value = producto.pose_x;
            pose_y.value = producto.pose_y;
            pose_w.value = producto.pose_w;
            stock.value = producto.stock;
            precio.value = producto.precio;
            tipo.value = producto.tipo;
            descripcion.value = producto.descripcion;
        } catch (error) {
            console.error('Error al recuperar el producto:', error);
        }
    



    })
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

mostrar_producto()