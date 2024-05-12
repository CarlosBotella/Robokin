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
  }
}

  