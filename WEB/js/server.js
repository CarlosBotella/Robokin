//-----------------------------------------------------------------------------------
//                                    SERVER
//-----------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------
//                                    PRODUCTO
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
//   nombre: TEXT, pose_x: N, pose_y: N, pose_w: N, stock: N, precio: N ----> guardar_producto() 
//-------------------------------------------------------------------------------------------------
async function guardar_producto(nombre,pose_x,pose_y,pose_w,stock,precio){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/guardarproducto.php',
            type: 'POST',
            data: {nombre: nombre, pose_x: pose_x, pose_y: pose_y, pose_w: pose_w, stock: stock, precio: precio},
            dataType: 'json',
            success: async function (data) {
                alert("El producto se creo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//-------------------------------------------------------------------------------------------------------------------------------------
//  nombre: TEXT --> recuperar_producto() ---> id_producto: N, nombre: TEXT, pose_x: N, pose_y: N, pose_w: N, stock: N, precio: N
//-------------------------------------------------------------------------------------------------------------------------------------
async function recuperar_producto(nombre){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/recuperarproducto.php',
            type: 'GET',
            data: {nombre: nombre},
            dataType: 'json',
            success: async function (data) {
                console.log(data)
                var id_producto = data.id_producto
                var nombre = data.nombre
                var pose_x = data.pos_x
                var pose_y = data.pose_y
                var pose_w = data.pose_w
                var stock = data.stock
                var precio = data.precio
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//---------------------------------------------------------------------------------------------------
//   nombre: TEXT, pose_x: N, pose_y: N, pose_w: N, stock: N, precio: N ----> actualizar_producto() 
//---------------------------------------------------------------------------------------------------

async function actualizar_producto(nombre,pose_x,pose_y,pose_w,stock,precio){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/actualizarproducto.php',
            type: 'POST',
            data: {nombre: nombre, pose_x: pose_x, pose_y: pose_y, pose_w: pose_w, stock: stock, precio: precio},
            dataType: 'json',
            success: async function (data) {
                alert("El producto se actualizo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}



//-----------------------------------------------------------------------------------
//                                    MESA
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
//   nombre: TEXT, pose_x: N, pose_y: N ----> guardar_mesa() 
//-------------------------------------------------------------------------------------------------
async function guardar_mesa(nombre,pose_x,pose_y){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/guardarmesa.php',
            type: 'POST',
            data: {nombre: nombre, pose_x: pose_x, pose_y: pose_y},
            dataType: 'json',
            success: async function (data) {
                alert("La mesa se creo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//-------------------------------------------------------------------------------------------------------------------------------------
//  nombre: TEXT --> recuperar_mesa() ---> id_mesa: N, nombre: TEXT, pose_x: N, pose_y: N
//-------------------------------------------------------------------------------------------------------------------------------------
async function recuperar_mesa(nombre){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/recuperarmesa.php',
            type: 'GET',
            data: {nombre: nombre},
            dataType: 'json',
            success: async function (data) {
                console.log(data)
                var id_mesa = data.id_mesa
                var nombre = data.nombre
                var pose_x = data.pos_x
                var pose_y = data.pose_y
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//---------------------------------------------------------------------------------------------------
//   nombre: TEXT, pose_x: N, pose_y: N ----> actualizar_mesa() 
//---------------------------------------------------------------------------------------------------
async function actualizar_mesa(nombre,pose_x,pose_y){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/actualizarmesa.php',
            type: 'POST',
            data: {nombre: nombre, pose_x: pose_x, pose_y: pose_y},
            dataType: 'json',
            success: async function (data) {
                alert("La mesa se actualizo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//-----------------------------------------------------------------------------------
//                                    Robot
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
//   pose_x: N, pose_y: N, pose_w: N, estado: TEXT ----> guardar_robot() 
//-------------------------------------------------------------------------------------------------
async function guardar_robot(pose_x,pose_y,pose_w /*, estado */){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/guardarrobot.php',
            type: 'POST',
            data: {pose_x: pose_x, pose_y: pose_y, pose_w: pose_w, estado: "apagado"},
            dataType: 'json',
            success: async function (data) {
                alert("El robot se creo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//-------------------------------------------------------------------------------------------------------------------------------------
//  id_robot: N --> recuperar_robot() ---> id_robot: N, pose_x: N, pose_y: N, pose_w: N, estado: TEXT
//-------------------------------------------------------------------------------------------------------------------------------------
async function recuperar_robot(id_robot){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/recuperarrobot.php',
            type: 'GET',
            data: {id_robot: id_robot},
            dataType: 'json',
            success: async function (data) {
                console.log(data)
                var id_robot = data.id_mesa
                var pose_x = data.pos_x
                var pose_y = data.pose_y
                var pose_w = data.pose_y
                var estado = data.estado
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//---------------------------------------------------------------------------------------------------
//   nombre: TEXT, pose_x: N, pose_y: N ----> actualizar_robot() 
//---------------------------------------------------------------------------------------------------
async function actualizar_robot(pose_x,pose_y,pose_w,estado){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/actualizarrobot.php',
            type: 'POST',
            data: {pose_x: pose_x, pose_y: pose_y, pose_w: pose_w, estado: estado},
            dataType: 'json',
            success: async function (data) {
                alert("El robot se actualizo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//-----------------------------------------------------------------------------------
//                                    Pedido
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
//   id_robot: N, id_mesa: N, total: N ----> guardar_pedido() 
//-------------------------------------------------------------------------------------------------
async function guardar_pedido(id_robot,id_mesa,total){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/guardarpedido.php',
            type: 'POST',
            data: {id_robot: id_robot, id_mesa: id_mesa, total: total},
            dataType: 'json',
            success: async function (data) {
                alert("El pedido se creo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//-------------------------------------------------------------------------------------------------------------------------------------
//  id_pedido: N --> recuperar_pedido() ---> id_pedido: N, id_robot: N, id_mesa: N, total: N
//-------------------------------------------------------------------------------------------------------------------------------------
async function recuperar_pedido(nombre){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/recuperarpedido.php',
            type: 'GET',
            data: {id_pedido: id_pedido},
            dataType: 'json',
            success: async function (data) {
                console.log(data)
                var id_pedido = data.id_pedido
                var id_robot = data.id_robot
                var id_mesa = data.id_mesa
                var total = data.total
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//---------------------------------------------------------------------------------------------------
//   id_robot: N, id_mesa: N, total: N ----> actualizar_pedido() 
//---------------------------------------------------------------------------------------------------
async function actualizar_pedido(id_robot,id_mesa,total){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/actualizarpedido.php',
            type: 'POST',
            data: {id_robot: id_robot, id_mesa: id_mesa, total: total},
            dataType: 'json',
            success: async function (data) {
                alert("El pedido se actualizo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//-----------------------------------------------------------------------------------
//                                    Pedido_Producto
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
//   id_robot: N, id_mesa: N, total: N ----> guardar_pedido() 
//-------------------------------------------------------------------------------------------------
async function guardar_pedido_producto(id_pedido,id_producto){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/guardarpedidoproducto.php',
            type: 'POST',
            data: {id_pedido: id_pedido, id_producto: id_producto},
            dataType: 'json',
            success: async function (data) {
                alert("El pedidoproduvto se creo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//-------------------------------------------------------------------------------------------------------------------------------------
//  id_pedido: N --> recuperar_pedido_producto() ---> id_pedido: N, id_producto: N
//-------------------------------------------------------------------------------------------------------------------------------------
async function recuperar_pedido_producto(id_pedido){
    $(document).ready(async function(){
        $.ajax({
            url: '../api/recuperarpedidoproducto.php',
            type: 'GET',
            data: {id_pedido: id_pedido},
            dataType: 'json',
            success: async function (data) {
                console.log(data)
                var id_pedido = data.id_pedido
                var id_producto = data.id_producto
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}
