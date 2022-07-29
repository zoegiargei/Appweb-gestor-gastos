//Clases

class Gasto{
    constructor(titulo, categoria, monto){
        this.titulo = titulo
        this.categoria = categoria
        this.monto = monto
        this.fecha = (new Date()).toLocaleDateString()
    }
}

//Array de gastos del usuario
let gastos = []
let presupuesto = 0
let divisa

//Variables
const formPresupuesto = document.getElementById(`formPresupuesto`)
const divContenedorPresupuesto = document.getElementById(`divContenedorPresupuesto`)
const divAgregarGastos = document.getElementById(`divAgregarGastos`)
const divNoCargoMonto = document.getElementById(`divNoCargoMonto`)



if (localStorage.getItem(`gastos`,`presupuesto`)) { //consulto y capturo datos del storage

    gastos = JSON.parse(localStorage.getItem(`gastos`))
    presupuesto = localStorage.getItem(`presupuesto`)
    divisa = localStorage.getItem(`divisa`)

    divContenedorPresupuesto.classList.toggle(`removeContenedor`)
    divAgregarGastos.classList.remove(`display`)

} else {
    localStorage.setItem('gastos', JSON.stringify(gastos)) //agrego datos al storage si es que previamente no había
    localStorage.setItem(`presupuesto`, JSON.stringify(presupuesto))
    localStorage.setItem(`divisa`, JSON.stringify(divisa))
}

//Cargar Presupuesto + Agregar al localStorage
formPresupuesto.addEventListener(`submit`, (e)=>{

    e.preventDefault()

    presupuesto = document.getElementById(`presupuesto`).value
    divisa = document.getElementById(`divisa`).value

    console.log(presupuesto) //prueba

    localStorage.setItem(`presupuesto`, JSON.stringify(presupuesto))
    localStorage.setItem(`divisa`, JSON.stringify(divisa))

    divContenedorPresupuesto.classList.toggle(`removeContenedor`, presupuesto != null)
    divAgregarGastos.classList.remove(`display`)
})

//Cargar gastos + Agregar al local storage
const formGastos = document.getElementById(`formGastos`)

formGastos.addEventListener(`submit`, (e) => {

    e.preventDefault()
    console.log(e.target)

    let datForm = new FormData(e.target)

    let montoGasto = document.getElementById(`inputMonto`).value
    let gasto = new Gasto(datForm.get(`titulo`), datForm.get(`categoria`), datForm.get(`monto`))
    gastos.push(gasto)

    presupuesto -= montoGasto
    localStorage.setItem(`presupuesto`, JSON.stringify(presupuesto))
    localStorage.setItem(`gastos`, JSON.stringify(gastos))

    formGastos.reset()
    divMostrarPresupuesto.innerHTML = ""
})

const btnGastos = document.getElementById(`btnGastos`)
const divGastos = document.getElementById(`divGastos`)

btnGastos.addEventListener(`click`, () => {

    let datosEnStorage = JSON.parse(localStorage.getItem(`gastos`))

    divGastos.innerHTML = ""

    datosEnStorage.forEach((gasto, indice) => {

        divGastos.innerHTML += `
        <div class="card border-dark mb-3" id="gasto${indice}" style="max-width: 20rem; margin:4px;">
            <div><h4>${gasto.titulo}</h4></div>
            <div class="card-body">
                <p class="card-title">Categoría: ${gasto.categoria}</p>
                <p class="card-title">Monto: ${gasto.monto}${divisa}</p>
                <p class="card-title">Fecha: ${gasto.fecha}</p>
                <button class="btn btn-danger">Eliminar Gasto</button>
            </div>
        </div>
        
        `
    })
    
    datosEnStorage.forEach((gasto, indice) => {
    
        let btnEliminarGasto = document.getElementById(`gasto${indice}`).lastElementChild.lastElementChild

        btnEliminarGasto.addEventListener(`click`, () => {
            document.getElementById(`gasto${indice}`).remove()
            gastos.splice(indice, 1)
            localStorage.setItem(`gastos`, JSON.stringify(gastos))
            console.log(`${gasto.titulo} Eliminado`)
        })
    })
})

const divMostrarPresupuesto = document.getElementById(`divMostrarPresupuesto`)
const btnMostrarPresupuesto = document.getElementById(`btnMostrarPresupuesto`)

btnMostrarPresupuesto.addEventListener(`click`, () => {

    divMostrarPresupuesto.innerHTML = ""
    divMostrarPresupuesto.innerHTML += `
    <div class="card m-1">
        <p>Presupuesto:  ${presupuesto} <span>${divisa}</span></p>
    </div>
    `
})