document.addEventListener("DOMContentLoaded", () => {
  const recuperarProductos = JSON.parse(localStorage.getItem("productos"));

  let recuperarProductosCarrito = localStorage.getItem("listaProductosCarrito");
  if (recuperarProductosCarrito === null) {
    recuperarProductosCarrito = [];
  } else {
    recuperarProductosCarrito = JSON.parse(recuperarProductosCarrito);
  }

  const objetosTabla = document.getElementById("objetosTabla");

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

    articulo.textContent = productosEncontrado.tipo;
    marca.textContent = productosEncontrado.marca;
    modelo.textContent = productosEncontrado.modelo;
    cantidad.textContent = productoCarrito.cantidad;
    precio.textContent = productosEncontrado.precio;

    fila.appendChild(articulo);
    fila.appendChild(marca);
    fila.appendChild(modelo);
    fila.appendChild(cantidad);
    fila.appendChild(precio);

    objetosTabla.appendChild(fila);
  });

  const filaTotal = document.createElement("tr");
  const articulo = document.createElement("td");
  const modelo = document.createElement("td");
  const cantidad = document.createElement("td");
  const precio = document.createElement("td");
  const total = document.createElement("th");
  
  total.textContent = sumaTotal;
  cantidad.textContent = "total";

  filaTotal.appendChild(articulo);
  filaTotal.appendChild(modelo);
  filaTotal.appendChild(precio);
  filaTotal.appendChild(cantidad);
  filaTotal.appendChild(total);

  objetosTabla.appendChild(filaTotal);
});

//producto recuperado
