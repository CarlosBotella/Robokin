// 
//      mostrarRobots()
//

function mostrarRobots() {

    const thEstado = document.getElementById('Estado');

    thEstado.addEventListener('click', () => {
        ordenarUsuariosPorEstado();
    });


    fetch('../api/listarobots.php')
    .then(response => response.json())
    .then(data => {
        const listarobots = document.getElementById('listado-Robots');


        listarobots.innerHTML = '';


        data.forEach(robot => {
                const fila = document.createElement('tr');

                const numero = document.createElement('td');
                numero.textContent = robot.id_robot;
                fila.appendChild(numero);


                const pose_x = document.createElement('td');
                pose_x.textContent = robot.pose_x;
                fila.appendChild(pose_x);

                const pose_y = document.createElement('td');
                pose_y.textContent = robot.pose_y;
                fila.appendChild(pose_y);

                
                const pose_w = document.createElement('td');
                pose_w.textContent = robot.pose_w;
                fila.appendChild(pose_w);

                const estado = document.createElement('td');
                estado.textContent = robot.estado;
                if(robot.estado == 'Inactivo')
                    estado.style.color = "red"
                else
                    estado.style.color = "green"
                fila.appendChild(estado);


                const acciones = document.createElement('td');
                const editar = document.createElement('a');
                editar.href = '#';
                editar.textContent = 'Editar';

                const eliminar = document.createElement('a');
                eliminar.href = '#';
                eliminar.textContent = 'Eliminar';
                //eliminar.addEventListener('click', () => eliminarUsuario(usuario.email));
                acciones.appendChild(editar)
         
                acciones.appendChild(eliminar);

                fila.appendChild(acciones);

                listarobots.appendChild(fila);

        });
    })
    .catch(error => console.error('Hubo un error:', error));
}

function filtrarRobots() {
    const valorBusqueda = document.getElementById('buscador').value.toLowerCase();
    const filasrobots = document.querySelectorAll('#listado-Robots tr');
    console.log(valorBusqueda)

    filasrobots.forEach(fila => {
        const nombre = fila.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const estado = fila.querySelector('td:nth-child(5)').textContent.toLowerCase();

        if (nombre.includes(valorBusqueda) || estado.includes(valorBusqueda)) {
            fila.style.display = 'table-row';
        } else {
            fila.style.display = 'none';
        }
    });
}


let estadoOrdenActual = 'ascendente';
function ordenarUsuariosPorEstado() {
    const filasUsuarios = Array.from(document.querySelectorAll('#listado-Robots tr'));

    filasUsuarios.sort((filaA, filaB) => {
        const estadoA = filaA.querySelector('td:nth-child(5)').textContent.toLowerCase();
        const estadoB = filaB.querySelector('td:nth-child(5)').textContent.toLowerCase();

        if (estadoA === estadoB) {
            return 0;
        } else if (estadoOrdenActual === 'ascendente') {
            if (estadoA === 'activo') {
                return -1;
            } else {
                return 1;
            }
        } else {
            if (estadoA === 'activo') {
                return 1;
            } else {
                return -1;
            }
        }
    });

    const listadoUsuarios = document.getElementById('listado-Robots');
    filasUsuarios.forEach(fila => {
        listadoUsuarios.appendChild(fila);
    });

    // Cambiar el estado de orden actual
    estadoOrdenActual = estadoOrdenActual === 'ascendente' ? 'descendente' : 'ascendente';
}




mostrarRobots()