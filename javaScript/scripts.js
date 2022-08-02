//Array de gastos del usuario
let gastos = []
//Presupuesto y divisa
let presupuesto = {}

//Variables capturadas del DOM
const formPresupuesto = document.getElementById(`formPresupuesto`)
const divContenedorPresupuesto = document.getElementById(`divContenedorPresupuesto`)
const divAgregarGastos = document.getElementById(`divAgregarGastos`)
const divNoCargoMonto = document.getElementById(`divNoCargoMonto`)
const divMostrarPresupuesto = document.getElementById(`divMostrarPresupuesto`)
const btnMostrarPresupuesto = document.getElementById(`btnMostrarPresupuesto`)
const divPresupuestoAgotado = document.getElementById(`divPresupuestoAgotado`)
const divValidacionPresupuesto = document.getElementById(`divValidacionPresupuesto`)


//Preguntamos en el Local storage si hay guardados datos de Gastos, Presupuesto y Divisa
if (localStorage.getItem(`gastos`,`presupuesto`,`divisa`)) { //consulto y capturo datos del storage
    
    gastos = JSON.parse(localStorage.getItem(`gastos`))
    presupuesto = JSON.parse(localStorage.getItem(`presupuesto`))
    
    divContenedorPresupuesto.classList.toggle(`removeContenedor`)
    divAgregarGastos.classList.remove(`display`)
    
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
    
    let gasto = new Gasto(datForm.get(`titulo`), datForm.get(`categoria`), datForm.get(`monto`))
    
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
const divGastos = document.getElementById(`divGastos`)

btnGastos.addEventListener(`click`, () => {
    mostrarGastos()
})

