function isSelected(id) {
  let productos = document.querySelectorAll(".tiposImpresiones a");
  for (const producto of productos) {
    if (producto.id !== id) {
      producto.classList.remove("btn-outline-primary");
      producto.classList.add("btn-outline-secondary");
    } else {
      producto.classList.remove("btn-outline-secondary");
      producto.classList.add("btn-outline-primary");
    }
  }
}

function mostrar() {
  let producto = document.querySelector(".btn-outline-primary");
  let container = document.querySelector(".cotizacion");
  let h2 = document.createElement("h2");
  h2.textContent = producto.id.toString();
  if (container.length === 0) {
    container.appendChild(h2);
  } else {
    container.removeChild(container.firstChild);
    h2 = document.createElement("h2");
    h2.textContent = producto.id.toString();
    container.appendChild(h2);
  }
}
