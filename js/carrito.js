document.addEventListener("DOMContentLoaded", () => {
  cargarGrilla();
});

const cargarGrilla = () => {
  const recuperarProductos = JSON.parse(localStorage.getItem("productos"));

  let recuperarProductosCarrito = localStorage.getItem("listaProductosCarrito");
  if (recuperarProductosCarrito === null) {
    recuperarProductosCarrito = [];
  } else {
    recuperarProductosCarrito = JSON.parse(recuperarProductosCarrito);
  }

  const objetosTabla = document.getElementById("objetosTabla");
  objetosTabla.innerHTML="";

  let sumaTotal = 0;

  recuperarProductosCarrito.forEach((productoCarrito) => {
    const productosEncontrado = recuperarProductos.find(
      (producto) => producto.id === productoCarrito.id
    );

    let totalItem = productoCarrito.cantidad * productosEncontrado.precio;
    sumaTotal = sumaTotal + totalItem;

    const fila = document.createElement("tr");
    const articulo = document.createElement("td");
    const marca = document.createElement("td");
    const modelo = document.createElement("td");
    const cantidad = document.createElement("td");
    const precio = document.createElement("td");
    const eliminarProducto = document.createElement("td");
    const btnEliminar = document.createElement("button");
    const iconELiminar = document.createElement("i");

    articulo.textContent = productosEncontrado.tipo;
    marca.textContent = productosEncontrado.marca;
    modelo.textContent = productosEncontrado.modelo;
    cantidad.textContent = productoCarrito.cantidad;
    precio.textContent = productosEncontrado.precio;

    btnEliminar.className = "btn btn-primary botones";
    iconELiminar.className = "bi bi-trash";

    btnEliminar.addEventListener("click", () => {
      let listaProductosCarrito = localStorage.getItem("listaProductosCarrito");
      if (listaProductosCarrito === null) {
        listaProductosCarrito = [];
      } else {
        listaProductosCarrito = JSON.parse(listaProductosCarrito);
      }
      const index = listaProductosCarrito.findIndex(
        (producto) => producto.id === productoCarrito.id
      );
      if (index !== -1) {
        listaProductosCarrito.splice(index, 1);
      }
      let listaProductosAlmacenados = JSON.stringify(listaProductosCarrito);
      localStorage.setItem("listaProductosCarrito", listaProductosAlmacenados);
      cargarGrilla();
    });

    fila.appendChild(articulo);
    fila.appendChild(marca);
    fila.appendChild(modelo);
    fila.appendChild(cantidad);
    fila.appendChild(precio);
    fila.appendChild(eliminarProducto);
    eliminarProducto.appendChild(btnEliminar);
    btnEliminar.appendChild(iconELiminar);

    objetosTabla.appendChild(fila);
  });

  const filaTotal = document.createElement("tr");
  const articulo = document.createElement("td");
  const modelo = document.createElement("td");
  const cantidad = document.createElement("td");
  const precio = document.createElement("td");
  const espacio = document.createElement("td");
  const total = document.createElement("th");

  total.textContent = sumaTotal;
  cantidad.textContent = "total";

  filaTotal.appendChild(articulo);
  filaTotal.appendChild(modelo);
  filaTotal.appendChild(precio);
  filaTotal.appendChild(cantidad);
  filaTotal.appendChild(total);
  filaTotal.appendChild(espacio);

  objetosTabla.appendChild(filaTotal);
};
//producto recuperado
