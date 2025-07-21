const mostrador = document.getElementById("mostrador");
// elementos del detalle
const mostradorPromos = document.getElementById("mostrador-promos");
const mostradorAcces = document.getElementById("mostrador-accesorios");
const seleccion = document.getElementById("seleccion");
const seleccionPromos = document.getElementById("seleccion-promos");
//const seleccionAcces = document.getElementById("seleccion-accesorios");
const imgSel = document.getElementById("img");
const modeloSel = document.getElementById("modelo");
const decripSel = document.getElementById("descripcion");
const precioSel = document.getElementById("precio");
const tonosSel = document.getElementById("tonos");
const carritoDiv = document.getElementById("carrito-items");
const carritoContenedor= document.getElementById("carrito");
const totalDiv = document.getElementById("carrito-total");
const btnCarrito = document.getElementById("carrito-responsive");

let productosApi = [];
let productoActual = null;


async function cargarProductos(brand = "maybelline") {
  try {
    const res = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`);
    productosApi = await res.json();
    mostrarProductos();
  } catch (err) {
    console.error("Error cargando productos:", err);
  }
}


function mostrarProductos() {
  mostrador.innerHTML = ""; 
  productosApi.forEach((p, i) => {
    if (!p.image_link || !p.price) return; 
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <img src="${p.image_link}" alt="${p.name}">
      <p class="descripcion">${p.name}</p>
      <span class="precio">$${parseFloat(p.price).toLocaleString()}</span>
    `;
    item.onclick = () => abrirDetalleProducto(i);
    mostrador.appendChild(item);
  });
}
const TIPO_CAMBIO = 1273;

function abrirDetalleProducto(i) {
  const p = productosApi[i];
  const precioConvertido = Math.round(parseFloat(p.price) * TIPO_CAMBIO);

  productoActual = {
    ...p,
    precio: precioConvertido 
  };

  imgSel.src = p.image_link;
  modeloSel.innerText = p.name;
  decripSel.innerText = p.description || "Sin descripción";
  precioSel.innerText = `$${precioConvertido.toLocaleString()}`;


  tonosSel.innerHTML = "";
  if (p.product_colors?.length) {
    p.product_colors.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.hex_value;
      opt.textContent = c.colour_name || c.hex_value;
      tonosSel.appendChild(opt);
    });
  } else {
    tonosSel.innerHTML = `<option value="default">Único tono</option>`;
  }
    seleccion.classList.add("visible");
    mostrador.style.width = "60%";
    seleccion.scrollIntoView({ behavior: "smooth", block: "start" });
}



function cerrar() {
  seleccion.classList.remove("visible");
  mostrador.style.width = "100%";
 
}


cargarProductos(); 


//Array PROMOCIONES
const promociones = [
          { 
        nombre:"LIP COMBO", 
        imagen:"IMG/promo1.jpeg", 
        precio:5000, 
        descripcion:"Combinalos como quieras", 
        tonos:["1","2","3"] 
    },
      { 
        nombre:"COMBO PESTAÑAS", 
        imagen:"IMG/promo2.jpeg", 
        precio:6900, 
        descripcion:"Incluye arqueador con repuestos y máscara transparente", 
        tonos:["Único"] 
    },
      { 
        nombre:"COMBO EXPRESS", 
        imagen:"IMG/promo3.jpeg", 
        precio:10000, 
        descripcion:"Incluye arqueador, delinador de ojos y de labios, lip gloss, rubor en barra y esponja", 
        tonos:["Único"] 
    },
      { 
        nombre:"COMBO PARA REGALAR", 
        imagen:"IMG/promo4.jpeg", 
        precio:17900, 
        descripcion:"Incluy caja o ramo", 
        tonos:["1","2","3","4"]
    }
    ];

    let carrito = [];
    


promociones.forEach((prod, i) => {
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `<img src="${prod.imagen}" alt="${prod.nombre}">
                        <p class="descripcion">${prod.nombre}</p>
                        <span class="precio">$${prod.precio.toLocaleString()}</span>`;
    item.onclick = () => abrirDetallePromo(i);
    mostradorPromos.appendChild(item);
});

function abrirDetallePromo(i){
    productoActual = promociones[i];
    imgSel.src = productoActual.imagen;
    modeloSel.innerText = productoActual.nombre;
    decripSel.innerText = productoActual.descripcion;
    precioSel.innerText = `$${productoActual.precio.toLocaleString()}`;
    tonosSel.innerHTML = "";
    productoActual.tonos.forEach(t => {
        const opt = document.createElement("option");
        opt.textContent = t;
        tonosSel.appendChild(opt);
    });

    seleccion.classList.add("visible");
    mostrador.style.width = "60%";
    seleccion.scrollIntoView({ behavior: "smooth", block: "start" });

}

function cerrar(){
    seleccion.classList.remove("visible");
    mostrador.style.width = "100%";
}
//ARRAY ACCESORIOS

const accesorios = [
          { 
        nombre:"PERFILADORES x 3", 
        imagen:"IMG/acces1.jpeg", 
        precio:1500, 
        descripcion:"Marca THKIE", 
        tonos:["Único"] 
    },
      { 
        nombre:"GOMILLITAS", 
        imagen:"IMG/acces2.jpeg", 
        precio:500, 
        descripcion:"", 
        tonos:["Negras"] 
    },
      { 
        nombre:"PIEDRA GUASHA", 
        imagen:"IMG/acces3.jpeg", 
        precio:2000, 
        descripcion:"", 
        tonos:["Beige","Verde claro","Verde oscuro"] 
    },
      { 
        nombre:"PERFUMEROS RECARGABLES", 
        imagen:"IMG/acces4.jpeg", 
        precio:2000, 
        descripcion:"Colores metalisados", 
        tonos:["Rojo","Lila","Dorado"   ]  
    },
      { 
        nombre:"REPUESTO ARQUEADOR DE PESTAÑAS", 
        imagen:"IMG/acces5.jpeg", 
        precio:1300, 
        descripcion:"POR 6 UNIDADES", 
        tonos:["Único"] 
    },
      { 
        nombre:"MASCARILLAS", 
        imagen:"IMG/acces6.jpeg", 
        precio:1600, 
        descripcion:"Ideal para regalar", 
        tonos:["Stich","Hello Kity"] 
    },
    { 
        nombre:"ESPEJITO + PEINE", 
        imagen:"IMG/acces7.jpeg", 
        precio:2500, 
        descripcion:"DIVERSOS DISEÑOS", 
        tonos:["Único"] 
    },
      { 
        nombre:"NECESER", 
        imagen:"IMG/acces8.jpeg", 
        precio:6500, 
        descripcion:"Marca Washbag - Tamaño chico", 
        tonos:["Blanco","Negro", "Rosa"] 
    },
     { 
        nombre:"STRASS/BRILLOS", 
        imagen:"IMG/acces9.jpeg", 
        precio:1500, 
        descripcion:"", 
        tonos:["Multicolor","Dorados","Plateados"] 
    },
    { 
        nombre:"ARQUEADOR DE PESTAÑAS", 
        imagen:"IMG/acces10.jpeg", 
        precio:3000, 
        descripcion:"", 
        tonos:["Rosa","Lila"] 
    },
      { 
        nombre:"VINCHA SKINCARE", 
        imagen:"IMG/acces11.jpeg", 
        precio:3000, 
        descripcion:"", 
        tonos:["Blanco","Salmon", "Rosa"] 
    },
    { 
        nombre:"LIMPIADORES FACIALES", 
        imagen:"IMG/acces12.jpeg", 
        precio:2000, 
        descripcion:"Silicona", 
        tonos:["Coral","Rosa"] 
    }
    ];


    


accesorios.forEach((prod, i) => {
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `<img src="${prod.imagen}" alt="${prod.nombre}">
                        <p class="descripcion">${prod.nombre}</p>
                        <span class="precio">$${prod.precio.toLocaleString()}</span>`;
    item.onclick = () => abrirDetalleAccesorios(i);
    mostradorAcces.appendChild(item);
});

function abrirDetalleAccesorios(i){
    productoActual = accesorios[i];
    imgSel.src = productoActual.imagen;
    modeloSel.innerText = productoActual.nombre;
    decripSel.innerText = productoActual.descripcion;
    precioSel.innerText = `$${productoActual.precio.toLocaleString()}`;
    tonosSel.innerHTML = "";
    productoActual.tonos.forEach(t => {
        const opt = document.createElement("option");
        opt.textContent = t;
        tonosSel.appendChild(opt);
    });

    seleccion.classList.add("visible");
    mostrador.style.width = "60%";
    seleccion.scrollIntoView({ behavior: "smooth", block: "start" });

}

function cerrar(){
    seleccion.classList.remove("visible");
    mostrador.style.width = "100%";
}

function agregarAlCarrito(){
  const tono = tonosSel.value;
  const nombre = productoActual.name || productoActual.nombre;
  const precio = productoActual.precio

  const existente = carrito.find(item => item.nombre === nombre && item.tono === tono);
  if(existente){
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, tono, cantidad: 1 });
  }
  actualizarCarrito();
}

function actualizarCarrito(){
    carritoDiv.innerHTML = "";
    let total = 0;
    carrito.forEach(item => {
    total += item.precio * item.cantidad;
    const div = document.createElement("div");
     div.className = "carrito-item";
     div.innerHTML = `
        <span>${item.nombre} (${item.tono})</span>
        <span>${item.cantidad} × $${item.precio.toLocaleString()}</span>`;
        carritoDiv.appendChild(div);
    });
      totalDiv.innerText = `Total: $${total.toLocaleString()}`;
}
//cuando hago clik, la pantalla hace scroll hacia carrito y muestra los productos

btnCarrito.addEventListener("click", () => {
  const estilo = window.getComputedStyle(carritoContenedor);

  if (estilo.display === "none") {
    carritoContenedor.style.display = "block"; // mostrar
    carritoContenedor.scrollIntoView({ behavior: "smooth", block: "start" }); // hacer scroll
  } else {
    carritoContenedor.style.display = "none"; // ocultar
  }
}); 


    
function comprarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
        return;
    }
    let resumen = "Resumen de compra:\n";
    carrito.forEach(item => {
        resumen += `${item.nombre} (${item.tono}): ${item.cantidad} × $${item.precio.toLocaleString()}\n`;
    });

    const total= carrito.reduce ((sum, item) => sum + item.precio * item.cantidad, 0);
    resumen += `\nTotal: $${total.toLocaleString()}\n\nGracias por tu compra!`;
    alert(resumen); 

    vaciarCarrito();
}


function vaciarCarrito(){
    carrito = [];
    actualizarCarrito();
}

