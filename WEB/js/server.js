//-----------------------------------------------------------------------------------
//                                    SERVER
//-----------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------
//                                    USUARIO
//-----------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
//   nombre: TEXT, email: TEXT, contrasenya: TEXT, telefono: N ----> guardar_usuario() 
//-------------------------------------------------------------------------------------------------
async function guardar_usuario(email, contrasenya, nombre, telefono) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/guardarusuario.php',
            type: 'POST',
            data: { nombre: nombre, email: email, contrasenya: contrasenya, telefono: telefono },
            dataType: 'json',
            success: async function (data) {
                alert("El usuario se creo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//----------------------------------------------------------------------------------------------------------
//   nombre: TEXT, ---> recuperar_usuario() --> nombre: TEXT, email: TEXT, contrasenya: TEXT, telefono: N 
//----------------------------------------------------------------------------------------------------------
async function guardar_usuario(email) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/recuperarusuario.php',
            type: 'GET',
            data: { email: email },
            dataType: 'json',
            success: async function (data) {
                console.log(data)
                var email = data.email
                var nombre = data.nombre
                var contrasenya = data.contrasenya
                var telefono = data.telefono
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//---------------------------------------------------------------------------------------------------
//   email: TEXT, contrasenya: TEXT, nombre: TEXT, telefono: N ----> actualizar_usuario() 
//---------------------------------------------------------------------------------------------------
async function actualizar_usuario(email, contrasenya, nombre, telefono) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/actualizarusuario.php',
            type: 'POST',
            data: { email: email, contrasenya: contrasenya, nombre: nombre, telefono: telefono },
            dataType: 'json',
            success: async function (data) {
                alert("El usuario se actualizo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//-----------------------------------------------------------------------------------
//                                    PRODUCTO
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
//   nombre: TEXT, pose_x: N, pose_y: N, pose_w: N, stock: N, precio: N, tipo: TEXT ----> guardar_producto() 
//-------------------------------------------------------------------------------------------------
async function guardar_producto() {
    $(document).ready(async function () {
        var formData = new FormData(); // Crear un objeto FormData

        // Agregar los datos del formulario al objeto FormData
        formData.append('nombre', document.getElementById("nombre").value);
        formData.append('stock', document.getElementById("stock").value);
        formData.append('precio', document.getElementById("precio").value);
        formData.append('tipo', document.getElementById("tipo").value);
        formData.append('pose_x', -3.73274);
        formData.append('pose_y', 0.28519);
        formData.append('pose_w', 1);
        formData.append('descripcion', document.getElementById("descripcion").value);

        // Agregar el archivo de imagen al objeto FormData
        var foto = document.getElementById("foto").files[0];
        formData.append('foto', foto);

        $.ajax({
            url: '../api/guardarproducto.php',
            type: 'POST',
            data: formData, // Enviar el objeto FormData en lugar de un objeto plano
            contentType: false, // Importante: desactivar el contentType
            processData: false, // Importante: desactivar el processData
            dataType: 'json',
            success: async function (data) {
                alert("El producto se creó correctamente");
                window.location.href = "listaproductos.html";
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments);
            }
        });
    });
}

//-------------------------------------------------------------------------------------------------------------------------------------
//  nombre: TEXT --> recuperar_producto() ---> id_producto: N, nombre: TEXT, pose_x: N, pose_y: N, pose_w: N, stock: N, precio: N, tipo: TEXT
//-------------------------------------------------------------------------------------------------------------------------------------
async function recuperar_producto(nombre) {
    return new Promise((resolve, reject) => {
        $(document).ready(function () {
            $.ajax({
                url: '../api/recuperarproducto.php',
                type: 'GET',
                data: { nombre: nombre },
                dataType: 'json',
                success: function (data) {
                    resolve(data); // Resuelve la promesa con los datos recibidos
                },
                error: function () {
                    reject('Error al obtener los datos del producto.'); // Rechaza la promesa con un mensaje de error
                }
            })
        })
    });
}

//-------------------------------------------------------------------------------------------------------------------------------------
//  nombre: TEXT --> recuperar_producto() ---> id_producto: N, nombre: TEXT, pose_x: N, pose_y: N, pose_w: N, stock: N, precio: N, tipo: TEXT
//-------------------------------------------------------------------------------------------------------------------------------------
async function recuperar_producto2(id_producto) {
    return new Promise((resolve, reject) => {
        $(document).ready(function () {
            $.ajax({
                url: '../api/recuperarproducto2.php',
                type: 'GET',
                data: { id_producto: id_producto },
                dataType: 'json',
                success: function (data) {
                    resolve(data); // Resuelve la promesa con los datos recibidos
                },
                error: function () {
                    reject('Error al obtener los datos del producto.'); // Rechaza la promesa con un mensaje de error
                }
            });
        });
    });
}

//---------------------------------------------------------------------------------------------------
//   id_producto: N,nombre: TEXT, pose_x: N, pose_y: N, pose_w: N, stock: N, precio: N, tipo: TEXT ----> actualizar_producto() 
//---------------------------------------------------------------------------------------------------
async function actualizar_producto(id_producto, stock) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/actualizarproducto.php',
            type: 'POST',
            data: { id_producto: id_producto, stock: stock},
            dataType: 'json',
            success: async function (data) {
                //alert("El producto se actualizo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//---------------------------------------------------------------------------------------------------
//   id_producto: N,nombre: TEXT, pose_x: N, pose_y: N, pose_w: N, stock: N, precio: N, tipo: TEXT ----> actualizar_producto2() 
//---------------------------------------------------------------------------------------------------

async function actualizar_producto2(id_producto, nombre, pose_x, pose_y, pose_w, stock, precio, tipo, descripcion) {
    return new Promise((resolve, reject) => {
        $(document).ready(async function () {
            $.ajax({
                url: '../api/actualizarproducto2.php',
                type: 'POST',
                data: { 
                    id_producto: id_producto, 
                    nombre: nombre,
                    pose_x: pose_x,
                    pose_y: pose_y,
                    pose_w: pose_w,
                    stock: stock,
                    precio: precio,
                    tipo: tipo,
                    descripcion: descripcion
                },
                dataType: 'json',
                success: function (data) {
                    resolve(data); // Resuelve la promesa con los datos recibidos
                },
                error: function () {
                    reject('Error al actualizar el producto.'); // Rechaza la promesa con un mensaje de error
                }
            });
        });
    });
}




//-----------------------------------------------------------------------------------
//                                    MESA
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
//   nombre: TEXT, pose_x: N, pose_y: N ----> guardar_mesa() 
//-------------------------------------------------------------------------------------------------
async function guardar_mesa() {
    $(document).ready(async function () {

        userId = await obtenerUserId();
        var formData = new FormData(); // Crear un objeto FormData

        // Agregar los datos del formulario al objeto FormData
        formData.append('pose_x', document.getElementById("pose_x").value);
        formData.append('pose_y', document.getElementById("pose_y").value);
        formData.append('pose_w', document.getElementById("pose_w").value);
        formData.append('email', userId);
        $.ajax({
            url: '../api/guardarmesa.php',
            type: 'POST',
            data: formData, // Enviar el objeto FormData en lugar de un objeto plano
            contentType: false, // Importante: desactivar el contentType
            processData: false, // Importante: desactivar el processData
            dataType: 'json',
            success: async function (data) {
                alert("La mesa se creo correctamente")
                window.location.href = "listamesas.html";
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
async function recuperar_mesa(nombre) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/recuperarmesa.php',
            type: 'GET',
            data: { id_mesa: id_mesa },
            dataType: 'json',
            success: async function (data) {
                console.log(data)
                var id_mesa = data.id_mesa
                var nombre = data.nombre
                var pose_x = data.pos_x
                var pose_y = data.pose_y
                var email = data.email
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//---------------------------------------------------------------------------------------------------
//   id_mesa: N, nombre: TEXT, pose_x: N, pose_y: N ----> actualizar_mesa() 
//---------------------------------------------------------------------------------------------------
async function actualizar_mesa(id_mesa, pose_x, pose_y, pose_w, email) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/actualizarmesa.php',
            type: 'POST',
            data: { id_mesa: id_mesa, pose_x: pose_x, pose_y: pose_y, pose_w: pose_w, email: email },
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
async function guardar_robot() {
    $(document).ready(async function () {
        userId = await obtenerUserId();
        var formData = new FormData(); // Crear un objeto FormData

        // Agregar los datos del formulario al objeto FormData
        formData.append('pose_x', document.getElementById("pose_x").value);
        formData.append('pose_y', document.getElementById("pose_y").value);
        formData.append('pose_w', document.getElementById("pose_w").value);
        formData.append('email', userId);
        formData.append('estado', 'Inactivo');
        $.ajax({
            url: '../api/guardarrobot.php',
            type: 'POST',
            data: formData, // Enviar el objeto FormData en lugar de un objeto plano
            contentType: false, // Importante: desactivar el contentType
            processData: false, // Importante: desactivar el processData
            dataType: 'json',
            success: async function (data) {
                alert("El robot se creo correctamente")
                window.location.href = "listarobots.html";
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
async function recuperar_robot(id_robot) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/recuperarrobot.php',
            type: 'GET',
            data: { id_robot: id_robot },
            dataType: 'json',
            success: async function (data) {
                console.log(data)
                var id_robot = data.id_mesa
                var pose_x = data.pos_x
                var pose_y = data.pose_y
                var pose_w = data.pose_y
                var estado = data.estado
                var email = data.email
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//---------------------------------------------------------------------------------------------------
//  id_robot: N, nombre: TEXT, pose_x: N, pose_y: N ----> actualizar_robot() 
//---------------------------------------------------------------------------------------------------
async function actualizar_robot(id_robot, pose_x, pose_y, pose_w, email, estado) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/actualizarrobot.php',
            type: 'POST',
            data: { id_robot: id_robot, pose_x: pose_x, pose_y: pose_y, pose_w: pose_w, email: email, estado: estado },
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
async function guardar_pedido(id_mesa, id_robot, total, fecha) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../api/guardarpedido.php',
            type: 'POST',
            data: { id_robot: id_robot, id_mesa: id_mesa, total: total, fecha: fecha },
            dataType: 'json',
            success: function (data) {
                resolve(data.id_pedido); // Resuelve la promesa con la ID del pedido recibida
            },
            error: function (error) {
                reject(error); // Rechaza la promesa con el error recibido
            }
        });
    });
}


//-------------------------------------------------------------------------------------------------------------------------------------
//  id_pedido: N --> recuperar_pedido() ---> id_pedido: N, id_robot: N, id_mesa: N, total: N
//-------------------------------------------------------------------------------------------------------------------------------------
async function recuperar_pedido(id_pedido) {
    return new Promise((resolve, reject) => {
        $(document).ready(async function () {
            $.ajax({
                url: '../api/recuperarpedido.php',
                type: 'GET',
                data: { id_pedido: id_pedido },
                dataType: 'json',
                success: async function (data) {
                    resolve(data);
                },
                error: function () {
                    reject('Error al obtener los datos.');
                    console.log(arguments)

                }
            })
        })
    });
}

//-------------------------------------------------------------------------------------------------------------------------------------
//  recuperar_ultimo_pedido() ---> id_pedido: N, id_robot: N, id_mesa: N, total: N
//-------------------------------------------------------------------------------------------------------------------------------------

async function recuperar_ultimo_pedido() {
    return new Promise((resolve, reject) => {
        $(document).ready(function () {
            $.ajax({
                url: '../api/recuperarultimopedido.php',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Resuelve la promesa con los datos obtenidos
                    resolve(data);
                },
                error: function () {
                    // Rechaza la promesa con un mensaje de error
                    reject('Error al obtener los datos.');
                }
            });
        });
    });
}

//---------------------------------------------------------------------------------------------------
//   id_pedido: N,id_robot: N, id_mesa: N, total: N ----> actualizar_pedido() 
//---------------------------------------------------------------------------------------------------
async function actualizar_pedido(id_pedido, id_robot, id_mesa, total, fecha) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/actualizarpedido.php',
            type: 'POST',
            data: { id_pedido: id_pedido, id_robot: id_robot, id_mesa: id_mesa, total: total, fecha: fecha },
            dataType: 'json',
            success: async function (data) {
                //alert("El pedido se actualizo correctamente")
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
async function guardar_pedido_producto(id_pedido, id_producto, cantidad) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/guardarpedidoproducto.php',
            type: 'POST',
            data: { id_pedido: id_pedido, id_producto: id_producto, cantidad: cantidad },
            dataType: 'json',
            success: async function (data) {
                //console.log("El pedidoproducto se creo correctamente")
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
async function recuperar_pedido_producto(id_pedido) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/recuperarpedidoproducto.php',
            type: 'GET',
            data: { id_pedido: id_pedido },
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

//-------------------------------------------------------------------------------------------------------------------------------------
//  id_pedido: N --> recuperar_pedido_producto() ---> id_pedido: N, id_producto: N
//-------------------------------------------------------------------------------------------------------------------------------------
async function recuperar_productos_pedido(id_pedido) {
    return new Promise((resolve, reject) => {
        $(document).ready(async function () {
            $.ajax({
                url: '../api/recuperarproductospedido.php',
                type: 'GET',
                data: { id_pedido: id_pedido },
                dataType: 'json',
                success: async function (data) {
                    resolve(data);
                },
                error: function () {
                    reject('Error al obtener el valor.');
                    
                }
            })
        })
    })
}

//-------------------------------------------------------------------------------------------------
//   id_pedido: N, id_producto: N ----> actualizar_pedido_producto() 
//-------------------------------------------------------------------------------------------------
async function actualizar_pedido_producto(id_pedido, id_producto) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/actualizarpedidoproducto.php',
            type: 'POST',
            data: { id_pedido: id_pedido, id_producto: id_producto },
            dataType: 'json',
            success: async function (data) {
                alert("El pedidoproducto se actualizo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}



//-----------------------------------------------------------------------------------
//                                    RUTA
//-----------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
//   id_robot: N, nombre: TEXT ----> guardar_ruta() 
//-------------------------------------------------------------------------------------------------
async function guardar_ruta(id_robot, nombre) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/guardarruta.php',
            type: 'POST',
            data: { id_robot: id_robot, nombre: nombre },
            dataType: 'json',
            success: async function (data) {
                alert("La ruta se creo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//-------------------------------------------------------------------------------------------------------------------------------------
//  id_ruta: N --> recuperar_ruta() ---> id_ruta: N, id_robot: N, nombre: TEXT
//-------------------------------------------------------------------------------------------------------------------------------------
async function recuperar_ruta(id_ruta) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/recuperaruta.php',
            type: 'GET',
            data: { id_ruta: id_ruta },
            dataType: 'json',
            success: async function (data) {
                console.log(data)
                var id_ruta = data.id_ruta
                var id_robot = data.id_robot
                var nombre = data.nombre
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//-------------------------------------------------------------------------------------------------
//   id_ruta: N, id_robot: N, nombre: TEXT ----> actualizar_ruta() 
//-------------------------------------------------------------------------------------------------
async function actualizar_ruta(id_ruta, id_robot, nombre) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/actualizarruta.php',
            type: 'POST',
            data: { id_ruta: id_ruta, id_robot: id_robot, nombre: nombre },
            dataType: 'json',
            success: async function (data) {
                alert("La ruta se actualizo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//-----------------------------------------------------------------------------------
//                                    POSE
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
//   pose_x: N, pose_y: N, pose_w: N, id_ruta: id_ruta ----> guardar_pose() 
//-------------------------------------------------------------------------------------------------
async function guardar_pose(pose_x, pose_y, pose_w, id_ruta) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/guardarpose.php',
            type: 'POST',
            data: { pose_x: pose_x, pose_y: pose_y, pose_w: pose_w, id_ruta: id_ruta },
            dataType: 'json',
            success: async function (data) {
                alert("La pose se creo correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//-------------------------------------------------------------------------------------------------
//   id_pose: N ----> recuperar_pose() ----> id_pose: N, pose_x: N, pose_y: N, pose_w: N, id_ruta: id_ruta
//-------------------------------------------------------------------------------------------------
async function recuperar_pose(id_pose) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/recuperarpose.php',
            type: 'POST',
            data: { id_pose: id_pose },
            dataType: 'json',
            success: async function (data) {
                console.log(data)
                var id_pose = data.id_pose
                var pose_x = data.pose_x
                var pose_y = data.pose_y
                var pose_w = data.pose_w
                var id_ruta = data.id_ruta

            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}


//-------------------------------------------------------------------------------------------------
//   id_pose: N, pose_x: N, pose_y: N, pose_w: N, id_ruta: id_ruta ----> actualizar_pose() 
//-------------------------------------------------------------------------------------------------
async function actualizar_pose(id_pose, pose_x, pose_y, pose_w, id_ruta) {
    $(document).ready(async function () {
        $.ajax({
            url: '../api/actualizarpose.php',
            type: 'POST',
            data: { id_pose: id_pose, pose_x: pose_x, pose_y: pose_y, pose_w: pose_w, id_ruta: id_ruta },
            dataType: 'json',
            success: async function (data) {
                alert("La pose se actualizar correctamente")
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        })
    })
}

//-------------------------------------------------------------------------------------------------------
//        login()
//-------------------------------------------------------------------------------------------------------
function login() {
    $(document).ready(function () {

        var email = document.getElementById("username").value;
        var contrasenya = document.getElementById("password").value;

        $.ajax({
            url: '../api/login.php', // Ruta al script PHP que maneja el inicio de sesión
            type: 'POST',
            data: {
                email: email,
                contrasenya: contrasenya
            },
            success: async function (data) {
                if (!data.error) {
                    //alert(data.message); // Display the success message
                    window.location.href = "option.html";
                } else {
                    alert('Error: ' + data.message); // Display the error message
                }
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments);
            }
        });
    });
}

//-------------------------------------------------------------------------------------------------------
//         obtenerUserId()
//-------------------------------------------------------------------------------------------------------
async function obtenerUserId() {
    const response = await fetch('../api/userid.php'); // Ruta al script PHP que obtiene $_SESSION['user_id']

    if (response.ok) {
        const userId = await response.text();

        if (userId !== 'null') {
            // El valor de $_SESSION['user_id'] se ha recuperado con éxito
            return userId;
        } else {
            // No se encontró $_SESSION['user_id']
            return null;
        }
    } else {
        // Error en la solicitud AJAX
        console.error('Error al obtener $_SESSION[\'user_id\'].');
        return null;
    }
}


//-------------------------------------------------------------------------------------------------------
//        comprobarsesion()
//-------------------------------------------------------------------------------------------------------
async function comprobarsesion() {
    $(document).ready(async function () {

        // Hacer la solicitud al servidor
        const userId = await obtenerUserId();
        if (userId !== null) {
            window.location.href = "option.html";
        }
        else {
            return;
        }
    });
}


//-------------------------------------------------------------------------------------------------------
//        comprobarsesion2()
//-------------------------------------------------------------------------------------------------------
async function comprobarsesion2() {
    $(document).ready(async function () {

        // Hacer la solicitud al servidor
        const userId = await obtenerUserId();
        if (userId !== null) {
            return;
        }
        else {
            window.location.href = "inicio.html";
        }
    });
}

