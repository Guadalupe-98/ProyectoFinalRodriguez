document.addEventListener("DOMContentLoaded", () => {
  fetch("data/productos.json")
    .then((response) => response.json())
    .then((productos) => {
      const container = document.getElementById("productos-container");
      const fila = document.createElement("div");
      fila.className = "row justify-content-center";

      //almacena lista de producto en localstorage
      let productoAlmacenado = JSON.stringify(productos);
      localStorage.setItem("productos", productoAlmacenado);

      productos.forEach((producto) => {
        // Creamos el div.col
        const columna = document.createElement("div");
        columna.className = "col-md-3 mb-3";

        // Creamos la tarjeta
        const tarjeta = document.createElement("div");
        tarjeta.className = "card h-100";
        tarjeta.style.width = "15rem";
        tarjeta.id = producto.id;

        // Imagen
        const img = document.createElement("img");
        img.src = `recursos/imagen/${producto.img}`;
        img.className = "card-img-top img";
        img.alt = producto.modelo;

        // Tarjeta Cuerpo
        const tarjetaCuerpo = document.createElement("div");
        tarjetaCuerpo.className = "card-body";

        const tituloTarjeta = document.createElement("h5");
        tituloTarjeta.className = "card-title";
        tituloTarjeta.textContent = producto.modelo;

        const subtituloTarjeta = document.createElement("h6");
        subtituloTarjeta.className = "card-subtitle mb-2";
        subtituloTarjeta.textContent = producto.marca;

        const descripcionTarjeta = document.createElement("p");
        descripcionTarjeta.className = "card-text text-body-secondary";
        descripcionTarjeta.textContent = producto.descripcion;

        tarjetaCuerpo.appendChild(tituloTarjeta);
        tarjetaCuerpo.appendChild(subtituloTarjeta);
        tarjetaCuerpo.appendChild(descripcionTarjeta);

        // pie de Tarjeta
        const pieTarjeta = document.createElement("div");
        pieTarjeta.className =
          "card-footer d-flex justify-content-center align-items-center gap-2";

        const input = document.createElement("input");
        input.name = "contador";
        input.type = "text";
        input.className = "form-control text-center";
        input.style.width = "40px";
        input.disabled = "true";
        input.value = 1;

        //btnMenos
        const btnMenos = document.createElement("button");
        btnMenos.addEventListener("click", (e) => {
          e.preventDefault();
          let valor = parseInt(input.value, 10);
          if (valor > 1) {
            input.value = valor - 1;
          }
        });
        btnMenos.className = "btn btn-primary botones";
        btnMenos.textContent = "-";

        //btnMas
        const btnMas = document.createElement("button");
        btnMas.addEventListener("click", (e) => {
          e.preventDefault();
          let valor = parseInt(input.value, 10);
          input.value = valor + 1;
        });
        btnMas.className = "btn btn-primary botones";
        btnMas.textContent = "+";

        //btnAgregar
        const btnAgregar = document.createElement("button");
        btnAgregar.addEventListener("click", (e) => {
          e.preventDefault();
          let agregarProducto = {
            id: producto.id,
            cantidad: input.value,
          };
          //producto recuperado
          let recuperarProductos = localStorage.getItem(
            "listaProductosCarrito"
          );
          if (recuperarProductos === null) {
            recuperarProductos = [];
          } else {
            recuperarProductos = JSON.parse(recuperarProductos);
          }
          recuperarProductos.push(agregarProducto);
          let listaProductosAlmacenados = JSON.stringify(recuperarProductos);
          localStorage.setItem(
            "listaProductosCarrito",
            listaProductosAlmacenados
          );
        });
        btnAgregar.className = "btn btn-success";
        btnAgregar.textContent = "Agregar";

        pieTarjeta.appendChild(btnMenos);
        pieTarjeta.appendChild(input);
        pieTarjeta.appendChild(btnMas);
        pieTarjeta.appendChild(btnAgregar);

        // Armamos la card
        tarjeta.appendChild(img);
        tarjeta.appendChild(tarjetaCuerpo);
        tarjeta.appendChild(pieTarjeta);

        // Agregamos la card a la columna y la columna al contenedor
        columna.appendChild(tarjeta);
        fila.appendChild(columna);
      });
      container.appendChild(fila);
    });
});
