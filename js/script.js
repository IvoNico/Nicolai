//--------------------------------------CARRITO DE COMPRAS--------------------------------------------------------------------
let carritoDeCompras = []
let stockProductos = [] //al usar el stock del archivo json tenemos que crear el array vacio para llamar a los productos

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const precioTotal = document.getElementById('precioTotal')
const contadorCarrito = document.getElementById('contadorCarrito')

const botonTerminar = document.getElementById('terminar') 

// FUNCION PARA MOSTRAR LOS PRODUCTOS---------------------------------------------------------------------

$.getJSON('stock.json', function (data){ //SE UTILIZA PARA LLAMAR AL ARCHIVO JSON 
    data.forEach(elemento => stockProductos.push(elemento))

    mostrarProductos(stockProductos)
})

function mostrarProductos(array){
    array.forEach(productos =>{
        let divProductos = document.createElement('div')
        divProductos.classList.add('productos')
        divProductos.innerHTML += `
            <div class=" productos__card ">
                <div wow animate__animated animate__bounceInDown>
                    <img class="productos__card--img" src= ${productos.img}>
                    <span class="productos__card--title">${productos.nombre}</span>
                    <div class="productos__card--info">
                        <p>${productos.descrip}</p>
                        <p>Talle: ${productos.talle}</p>
                    </div>
                </div>
                <div class="productos__content">
                    <p class="precioproducto" >Precio: $${productos.precio}</p>
                    <button id="boton${productos.id}" class="btnAgregar"><i class="fas fa-cart-plus"></i></button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(divProductos)

        let botonAgregar = document.getElementById(`boton${productos.id}`) //INDICAR QUE AL HACER CLICK EN EL BOTON SE AGREGE AL CARRITO
        botonAgregar.addEventListener('click',() =>{
            agregarAlCarrito(productos.id)
            Toastify({
                text: "¡Producto agregado!",
                duration: 3000
                }).showToast();
        })
    })
}

//--------------------------------------Funcion para el carrito-------------------------------------------------------------

function agregarAlCarrito(id){
    let verificar = carritoDeCompras.find(elemento => elemento.id == id)
    if(verificar){
        verificar.cantidad = verificar.cantidad + 1
        document.getElementById(`cantidad${verificar.id}`).innerHTML = `<p id="cantidad${verificar.id}">Cantidad:${verificar.cantidad}</p>`
        Toastify({
            text: "¡Producto agregado!",
            duration: 3000
            }).showToast();

        actualizarCarrito()
    }else{
        let productoAgregar = stockProductos.find(productos => productos.id == id) //agrega el elemento del array que coincida con el ID

        carritoDeCompras.push(productoAgregar) //carga al carrito el producto agregado
        Toastify({
            text: "¡Producto agregado!",
            duration: 3000
            }).showToast();
        actualizarCarrito()//siempre hay que actualizar el carrito

        let divModal = document.createElement('div')
        divModal.classList.add('productoEnCarrito')
        divModal.innerHTML += `
            <p>${productoAgregar.nombre}</p>
            <p>Precio: $${productoAgregar.precio}</p>
            <p id="cantidad${productoAgregar.id}" class="producto__cantidad">Cantidad: ${productoAgregar.cantidad}</p>
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

function actualizarCarrito(){
    contadorCarrito.innerText = carritoDeCompras.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acumulador, elemento) => acumulador + (elemento.precio * elemento.cantidad), 0)
}

// FUNCION PARA TERMINAR COMPRA------------------------------------------------------------------------------------------------
botonTerminar.innerHTML= '<a id="finalizar" class="waves-effect waves-light btn modal-trigger" href="#modal1">Checkout</a>'


    $('#finalizar').on('click',()=>{
        $.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(carritoDeCompras), function(data, estado){
        console.log(data, estado)
        if(estado){
            $('#carrito-contenedor').empty()//vacia el elemento
            $('#carrito-contenedor').append('<h5>Su pedido fue procesado exitosamente</h5>')
            carritoDeCompras = []
            localStorage.clear()//vaciar el localStorage
            ActualizarCarrito()
        }
    })
})

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
