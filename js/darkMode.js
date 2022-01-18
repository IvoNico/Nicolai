
let darkMode

if(localStorage.getItem('darkMode')) {  
    darkMode = localStorage.getItem('darkMode')
} else{
    darkMode = "light"
}

localStorage.setItem('darkMode', darkMode)

$(() =>{
    if(localStorage.getItem('darkMode') == 'dark'){
        $('body').addClass('darkMode')
        $('#botonDarktMode').hide() /*SE UTILIZA PARA OCULTAR UN ELEMENTO*/
        $('#botonLightMode').show() /*SE UTILIZA PARA MOSTRAR UN ELEMENTO*/
    }else{
        $('#botonLightMode').hide()
    }
    $('#botonDarktMode').click(() =>{
        $('#botonDarktMode').hide() //fadeOut("slow o fast") hace una animacion al ocultar el elemento
        $('#botonLightMode').show() //fadeInt ||               ||  ||   ||      ||   ||    ||   || 

        $('body').addClass('darkMode')
        localStorage.setItem('darkMode', "dark")
    })

    $('#botonLightMode').click(()=>{
        $('#botonLightMode').hide()
        $('#botonDarktMode').show()

        $('body').removeClass('darkMode')
        localStorage.setItem('darkMode', "light")
    })
})