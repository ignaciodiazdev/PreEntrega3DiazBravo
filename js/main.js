
let productos = [];
let carrito = [];

class Producto{
    constructor(id, nombre, precio, categoria, img) {
        this.id         = id;
        this.nombre     = nombre;
        this.precio     = precio;
        this.categoria  = categoria;
        this.img        = img;
        this.cantidad   = 1;
    }
}

const productosPush = () => {
    productos.push( new Producto( 1, 'Laptop HP 15T-DK200', 1870, 'Laptops', 'laptops/laptop01.jpg') )
    productos.push( new Producto( 2, 'Laptop HP Victus 16-D0523', 1450, 'Laptops', 'laptops/laptop02.jpg') )
    productos.push( new Producto( 3, 'Laptop HP Victus 16-20524', 2870, 'Laptops', 'laptops/laptop03.jpg') )
    productos.push( new Producto( 4, 'Laptop Lenovo Ideapad 3', 3560, 'Laptops', 'laptops/laptop04.jpg') )
    productos.push( new Producto( 5, 'Laptop MSI Katana GF76', 4200, 'Laptops', 'laptops/laptop05.jpg') )
    productos.push( new Producto( 6, 'Laptop Asus Strix G17', 2650, 'Laptops', 'laptops/laptop06.jpg') )
    productos.push( new Producto( 7, 'Laptop Asus Tuf Dash F15', 3270, 'Laptops', 'laptops/laptop07.jpg') )
    productos.push( new Producto( 8, 'Laptop HP 16-D0542 G9', 3450, 'Laptops', 'laptops/laptop08.jpg') )
    productos.push( new Producto( 9, 'Monitor Samsung 24" Smart', 2380, 'Monitores', 'monitores/monitor01.jpg') )
    productos.push( new Producto( 10, 'Monitor Samsung 27" Smart', 3250, 'Monitores', 'monitores/monitor02.jpg') )
    productos.push( new Producto( 11, 'Monitor LG 27" 27UL500', 1990, 'Monitores', 'monitores/monitor03.jpg') )
    productos.push( new Producto( 12, 'Monitor LG 27” 27MP400', 5640, 'Monitores', 'monitores/monitor04.jpg') )
    productos.push( new Producto( 13, 'Auricular Gamer Halion S2', 186, 'Auriculares', 'auriculares/auricular01.jpg') )
    productos.push( new Producto( 14, 'Auricular Xtech XTH541', 219, 'Auriculares', 'auriculares/auricular02.jpg') )
    productos.push( new Producto( 15, 'Auricular Micronics Lúdico', 145, 'Auriculares', 'auriculares/auricular03.jpg') )
    productos.push( new Producto( 16, 'Auricular Antryx CS Thunder', 106, 'Auriculares', 'auriculares/auricular04.jpg') )
    productos.push( new Producto( 17, 'Auricular Logitech G335', 134, 'Auriculares', 'auriculares/auricular05.jpg') )
    productos.push( new Producto( 18, 'Auricular Jabra Evolve2', 175, 'Auriculares', 'auriculares/auricular06.jpg') )
}

const catalogoProd  = document.querySelector('#catalogoProductos');
const allProducts   = document.querySelector('#allProducts');
const menuItems     = document.querySelectorAll('.menuItem');
const precioTotal   = document.querySelector('#precioTotal');
const carritoNumero = document.querySelector('#carritoNumero');
const btnVaciarCarrito = document.querySelector('#btnVaciarCarrito');
const btnPedido     = document.querySelector('#btnPedido');

const options = { style: 'currency', currency: 'USD' };

// Agregando Evento para mostrar todos los Productos
allProducts.addEventListener('click', () => {
    renderizarProductos(productos);
});

// Agregando Evento a todos los Botones de Categorías
menuItems.forEach( item =>  {
    item.addEventListener('click', (e) => {
        let categoria = productos.filter(prod => (prod.categoria) === e.target.innerText);
        renderizarProductos(categoria);
    })
})

// Mostrando los Productos en la Página
const renderizarProductos = (productos) => {
    catalogoProd.innerHTML = ``;

    productos.forEach(({id, nombre, precio, categoria, img}) => {
        catalogoProd.innerHTML += `
        <article class="card-producto">
            <img src="img/${img}" alt="${nombre}">
            <div class="content-descripcion">
                <span>${categoria}</span>
                <h3>${nombre}</h3>
                <div class="content-precio">                        
                    <span>${precio.toLocaleString('en-US', options)}</span>
                </div>
                <button class="boton btn-addProducto" id="${id}">Agregar al carrito</button>
            </div>
        </article>
        `;  
    });
    agregarClickBoton('.btn-addProducto');
}

// Agregando Evento Click a Botones "Add y Delete"
const agregarClickBoton = (selector) => {
    let botones = document.querySelectorAll(`${selector}`);
    botones.forEach( boton => {
        boton.addEventListener('click', () => {
            let id = parseInt(boton.id);
            if(selector === '.btn-addProducto'){
                agregarAlCarrito(id);
            }
            else if(selector === '.btn-deleteProducto'){
                eliminarProducto(id);
            }
        });
    });
}

// Agregando un producto al Carrito
const agregarAlCarrito = (id) => {
    let existeProducto = carrito.some(prod => prod.id === id);
    
    if(!existeProducto){   
        let producto = productos.find( prod => prod.id === id);
        carrito.push(producto);
        actualizarNumeroCarrito();
    }else{
        carrito.forEach(prod => {
            if(prod.id === id){
                prod.cantidad++;
            }
        })
    }
    localStorage.setItem('carritoProductos', JSON.stringify(carrito));
    listarCarrito();
}

// Eliminando un producto del Carrito
const eliminarProducto = (id) => {
    let indice = carrito.findIndex( prod => prod.id === id);
    carrito.splice(indice, 1);
    listarCarrito();
    actualizarNumeroCarrito();
    localStorage.setItem('carritoProductos', JSON.stringify(carrito));
}

// Vaciando el Carrito
btnVaciarCarrito.addEventListener('click', () => {
    carrito.splice(0, carrito.length);
    listarCarrito();
    actualizarNumeroCarrito();
    localStorage.clear();
})

// Listando en el Modal los productos que están en el Carrito
const listarCarrito = () => {
    let modalCarrito = document.querySelector('#modalCarrito');
    modalCarrito.innerHTML = ``;

    if(carrito.length !== 0){
        carrito.forEach( ({id, nombre, precio, img, cantidad}) => {

            modalCarrito.innerHTML += `
                <section class="carrito-producto">
                    <img class="carrito-producto__img" src="img/${img}"/>
                    <div class="carrito-producto__detalle">
                        <h3 class="nombre">${nombre}</h3>
                        <div class="carrito__precios">
                            <span class="precio">Precio: ${precio.toLocaleString('en-US', options)}</span>
                            <span class="precio">SubTotal: ${(cantidad * precio).toLocaleString('en-US', options)}</span>
                        </div>
                        <div class="carrito-producto__botones">
                            <div class="carrito-cantidad">
                                <span>Cantidad: ${cantidad}</span>
                            </div>
                            <button class="boton btn-deleteProducto" id="${id}"><i class='bx bxs-trash'></i></button>
                        </div>
                    </div>
                </section>
            `
        });
        agregarClickBoton('.btn-deleteProducto');
    }else{
        modalCarrito.innerHTML = '<p>Tú Carrito está Vacío</p>';
    } 
    calcularPrecioTotal();
}

// Actualizando el Número que está en el Ícono de Carrito
const actualizarNumeroCarrito = () => {
    let carritoValor = carrito.length;
    carritoNumero.innerText = `${carritoValor}`;
}

// Calculando el Precio Total del Carrito
const calcularPrecioTotal = () => {
    if(carrito.length !== 0){
        let total = carrito.reduce( (acumulador, producto) => {
            return acumulador += producto.precio * producto.cantidad;
        },0);

        precioTotal.innerHTML = `
            <span>Precio Total:</span>
            <span>${total.toLocaleString('en-US', options)}</span>
        `
    }else{
        precioTotal.innerHTML = '';
    }
}

// Añadiendo evento de carga de página
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(productos);
    carrito = JSON.parse(localStorage.getItem("carritoProductos")) || [];
    listarCarrito();
    actualizarNumeroCarrito();
});

// Realizando Pedido
btnPedido.addEventListener('click', () => {
    if(carrito.length !== 0){
        localStorage.clear();
        location.href = 'pages/pedido.html';
    }
})

// Instanciando Productos y agregando al Array Productos
productosPush();