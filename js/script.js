
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
