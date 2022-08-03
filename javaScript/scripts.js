//Array de gastos del usuario
//let gastos = []
//Presupuesto y divisa
//let presupuesto = {}

//Variables capturadas del DOM
const formPresupuesto = document.getElementById(`formPresupuesto`)
const divContenedorPresupuesto = document.getElementById(`divContenedorPresupuesto`)
const divAgregarGastos = document.getElementById(`divAgregarGastos`)
const divNoCargoMonto = document.getElementById(`divNoCargoMonto`)
const divMostrarPresupuesto = document.getElementById(`divMostrarPresupuesto`)
const btnMostrarPresupuesto = document.getElementById(`btnMostrarPresupuesto`)
const divPresupuestoAgotado = document.getElementById(`divPresupuestoAgotado`)
const divValidacionPresupuesto = document.getElementById(`divValidacionPresupuesto`)

//Aplicación de operador Lógico Or
let gastos = JSON.parse(localStorage.getItem(`gastos`)) || []
let presupuesto = JSON.parse(localStorage.getItem(`presupuesto`)) || {}

//Preguntamos en el Local storage si hay guardados datos de Gastos, Presupuesto y Divisa
if (localStorage.getItem(`gastos`,`presupuesto`)) { //consulto y capturo datos del storage

    divContenedorPresupuesto.classList.toggle(`removeContenedor`)
    divAgregarGastos.classList.remove(`display`)
    mostrarPresupuesto(presupuesto)
    
} else { //Si la respuesta es que NO hay datos guardados agregamos al local storage las variables iniciadas vacías

    localStorage.setItem('gastos', JSON.stringify(gastos)) //agrego datos al storage si es que previamente no había
    localStorage.setItem(`presupuesto`, JSON.stringify(presupuesto))
}


//Cargar Presupuesto + Agregar al localStorage
formPresupuesto.addEventListener(`submit`, (e)=>{
    
    e.preventDefault() //Prevenimos función respuesta parámetro por defecto
    
    const inputPresupuesto = document.getElementById(`presupuesto`).value
    const divisa = document.getElementById(`divisa`).value

    presupuesto = new Presupuesto(inputPresupuesto, divisa)
    console.log(presupuesto) //prueba
    
    localStorage.setItem(`presupuesto`, JSON.stringify(presupuesto))
    
    divContenedorPresupuesto.classList.toggle(`removeContenedor`, presupuesto != 0)
    divAgregarGastos.classList.remove(`display`)
    
    mostrarPresupuesto(presupuesto)
})

//Cargar gastos + Agregar al local storage el array gastos[] + restar valor gasto.monto en valor presupuesto.presupuesto
const formGastos = document.getElementById(`formGastos`)

formGastos.addEventListener(`submit`, (e) => {

    e.preventDefault()
    //console.log(e.target)

    let datForm = new FormData(e.target) /*Usamos el objeto formData; para poder capturar los datos del DOM con formData debemos agregar atribuo name a los elementos que estén dentro del formulario*/
    
    let gasto = new Gasto(datForm.get(`titulo`), datForm.get(`categoria`), Number(datForm.get(`monto`)))
    
    let presupuestoEnStorage = JSON.parse(localStorage.getItem(`presupuesto`))

    if(presupuestoEnStorage.presupuesto > parseFloat(gasto.monto)){

        divPresupuestoAgotado.innerHTML = ``
        
        gastos.push(gasto) //Agregamos al Array Gastos[] el nuevo gasto
        
        presupuestoEnStorage.presupuesto -= gasto.monto
    
        //Agregamos a LocalStorage el nuevo valor de Presupuesto y Gastos[]
        localStorage.setItem(`presupuesto`, JSON.stringify(presupuestoEnStorage))
        localStorage.setItem(`gastos`, JSON.stringify(gastos))
    
        formGastos.reset() //Reseteamos el formulario, es decír que en la interfaz de usuario quedará vacío
    
        mostrarPresupuesto(presupuesto)
        
    } else{
        
        divPresupuestoAgotado.innerHTML = ``
        divPresupuestoAgotado.innerHTML += `
        <p class="mensajeAlerta">No se puede cargar gasto. El valor del presupuesto es menor al gasto que quiere ingresar</p>`
        mostrarPresupuesto(presupuesto)
    }

})

const btnGastos = document.getElementById(`btnGastos`)

btnGastos.addEventListener(`click`, () => {
    mostrarGastos()
})

//Filtrados
const formFiltros = document.getElementById(`formFiltros`)
const divGastosFiltrados = document.getElementById(`divGastosFiltrados`)

formFiltros.addEventListener(`submit`, (e) => {
    e.preventDefault()

    const filtros = document.getElementById(`filtros`).value
    let datosEnStorage = JSON.parse(localStorage.getItem(`gastos`))

    if(filtros == `Categoría`){


        divGastosFiltrados.innerHTML = ``
        divGastosFiltrados.innerHTML += `
            <select id="categoriaFiltrar" name="categoriaFiltrar" class="form-select form-select-sm mt-3" aria-label=".form-select-sm example">
                <option selected>Elija Categoría de Gastos que desea ver</option>
                <option value="Alimentación">Alimentación</option>
                <option value="Cuidado Personal">Cuidado Personal</option>
                <option value="Entretenimiento y Salidas">Entretenimiento y Salidas</option>
                <option value="Indumentaria">Indumentaria</option>
                <option value="Salud">Salud</option>
                <option value="Vivienda">Vivienda</option>
                <option value="Limpieza">Limpieza</option>
                <option value="Mascota">Mascota</option>
                <option value="Impuestos">Impuestos</option>
                <option value="Servicios">Servicios</option>
                <option value="Viáticos">Viáticos</option>
                <option value="Viaje">Viaje</option>
                <option value="Extras">Extras</option>
            </select>
            <button id="btnCategoria" class="btn btn-primary mt-1 mb-3">Elejir</button>
        `

        document.getElementById(`btnCategoria`).addEventListener(`click`, ()=>{

            let existe = datosEnStorage.some(gasto => gasto.categoria == document.getElementById(`categoriaFiltrar`).value)
            console.log(existe)
            if(existe){
                
                let gastosCategoria = datosEnStorage.filter(gasto => gasto.categoria == document.getElementById(`categoriaFiltrar`).value)

                gastosCategoria.forEach((gasto) => {

                    divGastosFiltrados.innerHTML += `
                    <div class="mt-3 contenedorMostrarGasto" style="max-width: 20rem; margin:4px;">
                        <div><h4>${gasto.titulo}</h4></div>
                        <div>
                            <p>Categoría: ${gasto.categoria}</p>
                            <p>Monto: ${gasto.monto} ${presupuesto.divisa}</p>
                            <p>Fecha: ${gasto.fecha}</p>
                        </div>
                    </div>
                `
                })
            } else{

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No existe gasto con esa categoría!',
                })
            }
        })

    } else if(filtros == `MenorAMayor`){
        divGastosFiltrados.innerHTML = ``
        let datosEnStorage = JSON.parse(localStorage.getItem(`gastos`))

        datosEnStorage.sort(function (a, b) {
            if (a.monto > b.monto) {
                return 1;
            }
            if (a.monto < b.monto) {
                return -1;
            }
            // a must be equal to b
            return 0;
        })

        datosEnStorage.forEach((gasto) => {

            divGastosFiltrados.innerHTML += `
            <div class="mt-3 contenedorMostrarGasto" style="max-width: 20rem; margin:4px;">
                <div><h4>${gasto.titulo}</h4></div>
                <div>
                    <p>Categoría: ${gasto.categoria}</p>
                    <p>Monto: ${gasto.monto} ${presupuesto.divisa}</p>
                    <p>Fecha: ${gasto.fecha}</p>
                </div>
            </div>
        `
        })

    }else if(filtros == `MayorAMenor`){
        divGastosFiltrados.innerHTML = ``
        let datosEnStorage = JSON.parse(localStorage.getItem(`gastos`))

        datosEnStorage.sort(function (a, b) {
            if (a.monto < b.monto) {
                return 1;
            }
            if (a.monto > b.monto) {
                return -1;
            }
            // a must be equal to b
            return 0;
        })

        datosEnStorage.forEach((gasto) => {

            divGastosFiltrados.innerHTML += `
            <div class="mt-3 contenedorMostrarGasto" style="max-width: 20rem; margin:4px;">
                <div><h4>${gasto.titulo}</h4></div>
                <div>
                    <p>Categoría: ${gasto.categoria}</p>
                    <p>Monto: ${gasto.monto} ${presupuesto.divisa}</p>
                    <p>Fecha: ${gasto.fecha}</p>
                </div>
            </div>
        `
        })

    }
})


