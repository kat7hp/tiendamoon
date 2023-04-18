
// Variables
const carrito = document.querySelector('.carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCompras= document.querySelector('#lista-compras');
let articulosCarrito= [];

let btnCompra= document.getElementById('btnCompra');
let miCompra= document.getElementById('miCompra');
btnCompra.addEventListener('click', toogleTabla);
function toogleTabla(){
    miCompra.classList.toggle('mostrar-carrito');
    
}


cargarEventListeners();
function cargarEventListeners(){
    listaCompras.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    })
}


function agregarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('product__icon')){
        const productoSeleccionado = e.target.parentElement;
        datosProducto(productoSeleccionado);
    }
      
}
function eliminarProducto(e){
    if(e.target.classList.contains("borrar-articulo")){
        const productoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(productoSeleccionado => productoSeleccionado.id !== productoId);
        carritoHTML();
    }
}

function datosProducto(productoSeleccionado){
    const infoProducto = {
        imagen: productoSeleccionado.querySelector('img').src,
        titulo: productoSeleccionado.querySelector('h3').textContent,
        precio: productoSeleccionado.querySelector('span').textContent,
        id: productoSeleccionado.querySelector('i').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = articulosCarrito.some(productoSeleccionado => productoSeleccionado.id === infoProducto.id);
    if(existe){
    const productos = articulosCarrito.map(productoSeleccionado =>{
        if(productoSeleccionado.id === infoProducto.id){
            productoSeleccionado.cantidad++;
            return productoSeleccionado;
        } else{
            return productoSeleccionado;
        }
    });
    articulosCarrito = [...productos];
    } else {
    articulosCarrito= [...articulosCarrito, infoProducto];
    }
    carritoHTML();
}



function carritoHTML(){
    limpiarHTML();
    articulosCarrito.forEach(productoSeleccionado=>{
        const {imagen, titulo, precio, cantidad, id} = productoSeleccionado;
        const row = document.createElement('tr');
        row.innerHTML= `
            <td>
                <img src="${imagen}" width="100px">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> 
                <a href="#" class="borrar-articulo" data-id="${id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);

    }
    
}

