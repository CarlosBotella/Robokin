// Objeto para almacenar la información de los productos
var productos = {

    Mahou: {
      unidades: 0,
      precio: 2
    },

    EstrellaDamm: {
        unidades: 0,
        precio: 2
    },
    
    Heineken: {
        unidades: 0,
        precio: 2.2
    }

  };
  
  
// Función para añadir un producto a la cesta
function anyadirCesta(producto, divUnidades) {
  // Incrementar el número de unidades del producto
  productos[producto].unidades++;
  
  // Obtener la información del producto
  var unidades = productos[producto].unidades;
  
  // Mostrar la información del producto en el HTML
  document.getElementById(divUnidades).innerHTML = unidades;
  actualizarInfoCesta();
}

// Función para quitar un producto de la cesta
function quitarCesta(producto, divUnidades) {
  // Verificar si hay unidades del producto en la cesta
  if (productos[producto].unidades > 0) {
      // Decrementar el número de unidades del producto
      productos[producto].unidades--;
      
      // Obtener la información actualizada del producto
      var unidades = productos[producto].unidades;
      
      // Actualizar la información del producto en el HTML
      document.getElementById(divUnidades).innerHTML = unidades;
      actualizarInfoCesta();
  }
}

// Función para actualizar la información de la cesta
function actualizarInfoCesta() {
  var total = 0; // Inicializamos el total en 0

  // Recorremos cada producto en el objeto productos
  for (var producto in productos) {
      // Construimos el ID del elemento en el DOM correspondiente al producto
      var elementoId = producto;
      console.log(elementoId)
      // Buscamos el elemento en el DOM
      var elemento = document.getElementById(elementoId);
      console.log(elemento)
      // Verificamos si el elemento existe antes de intentar actualizarlo
      if (elemento) {
          // Calculamos el subtotal del producto (precio * unidades)
          var subtotal = productos[producto].precio * productos[producto].unidades;
          
          // Mostramos el subtotal y las unidades del producto en el elemento del DOM
          elemento.innerHTML =
              "Unidades: " + productos[producto].unidades + "<br>" 
          // Sumamos el subtotal al total
          total += subtotal;
      } else {
          // Si el elemento no existe, mostramos un mensaje de error en la consola
          console.error("El elemento con el ID '" + elementoId + "' no existe en el DOM.");
      }
  }

  // Mostramos el precio total en la cesta
  var precioTotalElemento = document.getElementById("precioTotal");
  if (precioTotalElemento) {
      precioTotalElemento.innerHTML = "Precio total en la cesta: $" + total.toFixed(2);
  } else {
      // Si el elemento no existe, mostramos un mensaje de error en la consola
      console.error("El elemento con el ID 'precioTotal' no existe en el DOM.");
  }
}

// Función para mostrar el resumen del pedido en un popup
function mostrarResumenPedido() {
  // Construimos el resumen del pedido
  var resumen = "Resumen del Pedido:\n\n";
  for (var producto in productos) {
      resumen += "Producto: " + producto + "\n";
      resumen += "Unidades: " + productos[producto].unidades + "\n";
      resumen += "Subtotal: $" + (productos[producto].precio * productos[producto].unidades).toFixed(2) + "\n\n";
  }
  resumen += "Precio Total: $" + calcularPrecioTotal().toFixed(2);

  // Mostramos el resumen del pedido en el popup
  var popupResumen = document.getElementById("popupResumenPedido");
  popupResumen.style.display = "block";
  document.getElementById("resumenPedido").innerText = resumen;

  // Mostramos los botones de confirmar y cancelar
  document.getElementById("confirmarBtn").style.visibility = "visible";
  document.getElementById("cancelarBtn").style.visibility = "visible";
}

// Función para ocultar el popup
function cancelarPedido() {
  var popupResumen = document.getElementById("popupResumenPedido");
  popupResumen.style.display = "none";
}

// Función para confirmar el pedido
function confirmarPedido() {
  // Aquí puedes agregar la lógica para procesar el pedido, como enviar la información al servidor, etc.
  // Por ahora, simplemente ocultamos el popup
  cancelarPedido();
}

// Función para calcular el precio total del pedido
function calcularPrecioTotal() {
  var total = 0;
  for (var producto in productos) {
      total += productos[producto].precio * productos[producto].unidades;
  }
  return total;
}



  