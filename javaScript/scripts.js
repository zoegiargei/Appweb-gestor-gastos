//Clase Gasto
class Presupuesto{
    constructor(presupuesto, divisa){
        this.presupuesto = presupuesto
        this.divisa = divisa
    }

    restarGasto(montoGasto){
        this.presupuesto = this.presupuesto - montoGasto
        //return this.presupuesto
    }
}

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

if(localStorage.getItem('gastos',`presupuesto`)) { //consulto y capturo datos del storage
    gastos = JSON.parse(localStorage.getItem(`gastos`))
    presupuesto = JSON.parse(localStorage.getItem(`presupuesto`))
} else {
    localStorage.setItem('gastos', JSON.stringify(gastos)) //agrego datos al storage si es que previamente no había
    localStorage.setItem(`presupuesto`, JSON.stringify(presupuesto))
}

//Variables de DOM
const formPresupuesto = document.getElementById(`formPresupuesto`)
const divContenedorPresupuesto = document.getElementById(`divContenedorPresupuesto`)
const divAgregarGastos = document.getElementById(`divAgregarGastos`)
const divNoCargoMonto = document.getElementById(`divNoCargoMonto`)

//Cargar Presupuesto + Agregar al localStorage
formPresupuesto.addEventListener(`submit`, (e)=>{

    e.preventDefault()

    /*    
    let datForm = new FormData(e.target)

    let presupuesto = new Presupuesto(datForm.get(`presupuesto`), datForm.get(`divisa`))*/
    presupuesto = new Presupuesto(document.getElementById(`presupuesto`), document.getElementById(`divisa`))

    console.log(presupuesto) //prueba

    localStorage.setItem(`gastos`, JSON.stringify(presupuesto))

    divContenedorPresupuesto.classList.toggle(`removeContenedor`, presupuesto != null)
    divAgregarGastos.classList.remove(`display`)
})

//Cargar gastos + Agregar al local storage
const formGastos = document.getElementById(`formGastos`)

formGastos.addEventListener(`submit`, (e) => {

    e.preventDefault()
    console.log(e.target)

    let datForm = new FormData(e.target)

    let gasto = new Gasto(datForm.get(`titulo`), datForm.get(`categoria`), datForm.get(`monto`))
    gastos.push(gasto)

    localStorage.setItem(`gastos`, JSON.stringify(gastos))

    formGastos.reset()
})

const btnGastos = document.getElementById(`btnGastos`)
const divGastos = document.getElementById(`divGastos`)

btnGastos.addEventListener(`click`, () => {

    let datosEnStorage = JSON.parse(localStorage.getItem(`gastos`))

    divGastos.innerHTML=""
    datosEnStorage.forEach((gasto, indice) => {

        divGastos.innerHTML += `
        <div class="card border-dark mb-3" id="gasto${indice}" style="max-width: 20rem; margin:4px;">
            <div><h2>${gasto.titulo}</h2></div>
            <div class="card-body">
                <p class="card-title">${gasto.categoria}</p>
                <p class="card-title">${gasto.monto}</p>
                <p class="card-title">${gasto.fecha}</p>
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