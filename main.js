  // Almacenamiento local para el carrito de compras
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para agregar un producto al carrito
  function agregarAlCarrito(nombre, precio) {
      carrito.push({ nombre, precio });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCarrito();
  }

  // Función para vaciar el carrito
  function vaciarElCarrito() {
      carrito = [];
      localStorage.removeItem("carrito");
      actualizarCarrito();
  }

  // Función para actualizar la visualización del carrito
  function actualizarCarrito() {
      const carritoLista = document.getElementById("carrito");
      carritoLista.innerHTML = "";
      let total = 0;

      carrito.forEach((producto) => {
          const { nombre, precio } = producto;
          const item = document.createElement("li");
          item.textContent = `${nombre} - Precio: $${precio}`;
          carritoLista.appendChild(item);
          total += precio;
      });

      const totalElement = document.createElement("li");
      totalElement.textContent = `Total: $${total}`;
      carritoLista.appendChild(totalElement);
  }

  // Agregar eventos de clic a los botones "Agregar al Carrito"
  const botones = document.querySelectorAll(".producto button");
  botones.forEach((boton) => {
      boton.addEventListener("click", (event) => {
          const { nombre, precio } = event.target.dataset;
          agregarAlCarrito(nombre, parseInt(precio));
      });
  });

  // Agregar evento de clic al botón "Vaciar Carrito"
  document.getElementById("vaciarCarrito").addEventListener("click", vaciarElCarrito);

  // Mostrar el carrito de compras al cargar la página
  actualizarCarrito();