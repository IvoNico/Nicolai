//--------------------------------------CARRITO DE COMPRAS--------------------------------------------------------------------
let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const precioTotal = document.getElementById('precioTotal')
const contadorCarrito = document.getElementById('contadorCarrito')

mostrarProductos(stockProductos)

function mostrarProductos(array){
    array.forEach(productos =>{
        let divProductos = document.createElement('div')
        divProductos.classList.add('productos')
        divProductos.innerHTML += `
            <div class="productos__card">
                <div>
                    <img class="productos__card--img" src= ${productos.img}>
                    <span class="productos__card--title">${productos.nombre}</span>
                    <p>${productos.descrip}</p>
                </div>
                <div class="productos__content">
                    <p class="precioproducto" >Precio: $${productos.precio}</p>
                    <a id="boton${productos.id}" class="btn-floating halfway-fab waves-light black"><i class="fas fa-cart-plus"></i></a>
                </div>
            </div>
        `
        contenedorProductos.appendChild(divProductos)

        let botonAgregar = document.getElementById(`boton${productos.id}`) //INDICAR QUE AL HACER CLICK EN EL BOTON SE AGREGE AL CARRITO
        botonAgregar.addEventListener('click',() =>{
            agregarAlCarrito(productos.id)
            
        })
    })
}

//--------------------------------------Funcion para el carrito-------------------------------------------------------------

function agregarAlCarrito(id){
    let verificar = carritoDeCompras.find(elemento => elemento.id == id)
    if(verificar){
        verificar.cantidad = verificar.cantidad + 1
        document.getElementById(`cantidad${verificar.id}`).innerHTML =`<p id="cantidad${verificar.id}">Cantidad:${verificar.id}</p>`
        actualizarCarrito()
    }else{
        let productoAgregar = stockProductos.find(productos => productos.id == id) //agrega el elemento del array que coincida con el ID

        carritoDeCompras.push(productoAgregar) //carga al carrito el producto agregado
        actualizarCarrito()//siempre hay que actualizar el carrito

        let divModal = document.createElement('div')
        divModal.classList.add('productoEnCarrito')
        divModal.innerHTML += `
            <p>${productoAgregar.nombre}</p>
            <p>Precio: $${productoAgregar.precio}</p>
            <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
            <button class="boton-eliminar" id='eliminar${productoAgregar.id}'><i class="btneliminar fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(divModal)//agregamos el div a la seccion del carrito
        
        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
        botonEliminar.addEventListener('click', ()=>{
            if(productoAgregar.cantidad == 1){
                botonEliminar.parentElement.remove()//elimina el elemento del HTML
                carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != productoAgregar.id) //trae un array nuevo con los ID diferentes al del boton eliminar que se hizo click
                actualizarCarrito()
            }else{
                productoAgregar.cantidad = productoAgregar.cantidad - 1
                document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>`
                actualizarCarrito()
            }
        })
    }
}


//----------------------------------------FORMULARIO----------------------------------------------------------------------------
class Cliente{
    constructor(nombre, apellido, email){
        this.nombre = nombre
        this.apellido = apellido
        this. email = email
    }
}

let clientes = []

let formClientes = document.getElementById('formContact')
let botonClientes = document.getElementById('botonClientes')
let divClientes = document.getElementById('divClientes')

formClientes.addEventListener('submit', (e) =>{
    e.preventDefault()

    let nombreCliente = document.getElementById('nombre').value
    let apellidoCliente = document.getElementById('apellido').value
    let emailCliente = document.getElementById('email').value

    let cliente = new Cliente (nombreCliente, apellidoCliente, emailCliente)
    clientes.push(cliente)

    localStorage.setItem('clientesKey', JSON.stringify(clientes))
    formClientes.reset()
})

document.getElementById('botonClientes').addEventListener('click', ()=>{
    let clientesStorage = JSON.parse(localStorage.getItem('clientesKey'))

    if(divClientes.children.length == 0){
        clientesStorage.forEach((clienteArray, indice) => {
        divClientes.innerHTML += `
            <div class="card" id="cliente${indice} style="width: 18rem;">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">${clienteArray.nombre} ${clienteArray.apellido}</h6>
                    <p class="card-text">${clienteArray.email} </p>
                </div>
            </div>
        `
        })
    }
})
