//Variables con precios para calculos
const costoResma = 5000;
const costoTapasColor = 5500;
const costoTapastransp = 5500;
const costoTintaNegra = 6;
const costoTintaColor = 10;
let costoAnillos = 9999999;
let costoHoja = costoResma / 500;

//obtengo todos los productos de la "botonera" y los alojo en la variable productos
const productos = document.querySelectorAll(".tiposImpresiones button");

//obtengo el div donde va a mostrarse la cotizacion de acuerdo al producto cliqueado -- Muestro por consola a modo de prueba
const cotizar = document.querySelector("#cotizar");

// Funcion para asignar/remover class "selected" a boton presionado
function isSelected(id) {
  const productos = document.querySelectorAll(".tiposImpresiones button");
  for (const producto of productos) {
    if (producto.id !== id) {
      producto.classList.remove("btn-dark", "selected");
      producto.classList.add("btn-light");
    } else {
      producto.classList.remove("btn-light");
      producto.classList.add("btn-dark", "selected");
    }
  }

}
// Funcion para calcular el precio del anillo de acuerdo a la cantidad de paginas
function costoAnillo(paginas) {
  //12mm -- 70 hojas
  //14mm -- 85 hojas
  //17mm -- 100 hojas
  //20mm -- 120 hojas
  if (paginas/2 <= 70) {
    return 2700;
  }
  else if (paginas/2 <= 85) {
    return 3500;
  }
  else if (paginas/2 <= 100) {
    return 4800;
  }
  else if (paginas/2 <= 120) {
    return 5400;
  }
  else {
    return 99999999999;
  }
}


// Funcion calcular precio Libro
function calcularLibro() {
  //Obtener datos de entrada
  let paginas = document.querySelector("#cantidadPaginas").value;
  let tamaño = document.querySelector(".form-select").value;
  let color = document.querySelector("#colorImpresion").checked;
  let costoLibro = 1;

  costoAnillos = costoAnillo(paginas);
  
  let costoAnillado = (costoAnillos + costoTapasColor + costoTapastransp) / 50;


  //Calcular costo del libro
  if (color) {
    costoLibro = (paginas / 2) * (costoHoja + costoTintaColor) + costoAnillado;
  } else {
    costoLibro = (paginas / 2) * (costoHoja + costoTintaNegra) + costoAnillado;
  }

  //calcular precio del libro
  precioLibro = costoLibro * 2;

  //Ajustar precio del libro segun su tamaño (formato A5 o A4)
  if (tamaño === "true") {
    precioLibro = precioLibro / 1.85;
  }

  //Obtener div donde mostrar resultado
  let resultado =document.getElementById("collapseResultado");
  resultado.innerHTML = "<p>Costo Libro: $"+costoLibro+"</p>"+"<br>"+"<p>Costo hoja: $"+costoHoja+"</p>"+"<br>"+"<p>Costo Anillado: $"+costoAnillado+"</p>"+"<br>"+"<p>Precio final libro $"+Math.floor(precioLibro)+" </p>"
  return Math.round(precioLibro);
}

document.addEventListener("DOMContentLoaded", function () {
  //obtengo el div donde va a mostrarse la cotizacion de acuerdo al producto cliqueado
  const cotizar = document.querySelector("#cotizar");
  //obtengo todos los productos de la "botonera" y los alojo en la variable productos
  const productos = document.querySelectorAll(".tiposImpresiones button");

  //Funcion para cargar el contenido a mostrar desde archivo externo
  function cargarContenidoDesdeArchivo(archivo) {
    fetch(archivo)
      .then((response) => response.text())
      .then((contenido) => {
        cotizar.innerHTML = contenido;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido", error);
      });
  }

  //Manejar clics en los botones
  productos.forEach(function (boton) {
    boton.addEventListener("click", function () {
      //Obtengo el id del boton presionado
      let seleccionado = boton.getAttribute("id");

      //Construir ruta de archivo a mostrar
      let productoSeleccionado = seleccionado + ".html";

      //muestro contenido del boton presionado
      cargarContenidoDesdeArchivo(productoSeleccionado);
    });
  });
});
