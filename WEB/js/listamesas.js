// 
//      mostrarMesas()
//

function mostrarMesas() {

    fetch('../api/listamesas.php')
    .then(response => response.json())
    .then(data => {
        const listadomesas = document.getElementById('listado-Mesas');


        listadomesas.innerHTML = '';


        data.forEach(mesa => {
                const fila = document.createElement('tr');

                const numero = document.createElement('td');
                numero.textContent = mesa.id_mesa;
                fila.appendChild(numero);


                const pose_x = document.createElement('td');
                pose_x.textContent = mesa.pose_x;
                fila.appendChild(pose_x);

                const pose_y = document.createElement('td');
                pose_y.textContent = mesa.pose_y;
                fila.appendChild(pose_y);

                
                const pose_w = document.createElement('td');
                pose_w.textContent = mesa.pose_w;
                fila.appendChild(pose_w);


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

                listadomesas.appendChild(fila);

        });
    })
    .catch(error => console.error('Hubo un error:', error));
}

function filtrarMesas() {
    const valorBusqueda = document.getElementById('buscador').value.toLowerCase();
    const filasmesas = document.querySelectorAll('#listado-Mesas tr');

    filasmesas.forEach(fila => {
        const nombre = fila.querySelector('td:nth-child(1)').textContent.toLowerCase();

        if (nombre.includes(valorBusqueda)) {
            fila.style.display = 'table-row';
        } else {
            fila.style.display = 'none';
        }
    });
}





mostrarMesas()