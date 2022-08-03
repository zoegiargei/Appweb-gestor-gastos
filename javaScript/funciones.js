function mostrarAlerta(){
    divMostrarPresupuesto.classList.toggle(`presupuestoEnRojo`)
    divMostrarPresupuesto.classList.toggle(`vibrate-1`)
    divMostrarPresupuesto.classList.remove(`presupuestoNormal`)
}

function quitarAlerta(){
    divMostrarPresupuesto.classList.remove(`presupuestoEnRojo`)
    divMostrarPresupuesto.classList.remove(`vibrate-1`)
}

/*
function eliminarGasto(){

    let datosEnStorage = JSON.parse(localStorage.getItem(`gastos`))
    let presupuestoEnStorage = JSON.parse(localStorage.getItem(`presupuesto`))

    datosEnStorage.forEach((gasto, indice) => {

        const botonGastoAEliminar = document.getElementById(`gasto${indice}`).lastElementChild.lastElementChild
        botonGastoAEliminar.addEventListener("click", () =>{
            document.getElementById(`gasto${indice}`).remove()
            datosEnStorage.splice(datosEnStorage.indexOf(gasto), 1)
            localStorage.setItem("gastos", JSON.stringify(datosEnStorage))

            presupuestoEnStorage.presupuesto += gasto.monto
            localStorage.setItem(`presupuesto`, JSON.stringify(presupuestoEnStorage))
            mostrarPresupuesto(presupuesto)
        })
    })

}
*/

//Función para mostrar prespuesto en DOM
function mostrarPresupuesto(presupuesto){

    let presupuestoEnStorage = JSON.parse(localStorage.getItem(`presupuesto`)) //Pedimos VALUE del storage con GET + KEY(CLAVE)


    if(presupuestoEnStorage.presupuesto > 10 && divMostrarPresupuesto.classList.contains(`presupuestoEnRojo`)){
        quitarAlerta()

        if((divMostrarPresupuesto.classList.contains(`presupuestoNormal`) != true)){
            divMostrarPresupuesto.classList.toggle(`presupuestoNormal`)
        }
    }
    
    divMostrarPresupuesto.innerHTML = ``

    divMostrarPresupuesto.innerHTML += `
        <p>Presupuesto: ${presupuestoEnStorage.presupuesto} ${presupuestoEnStorage.divisa}</p>
    `

    //Aplicación de operador Ternario.
    presupuestoEnStorage.presupuesto < 10 ? mostrarAlerta() : quitarAlerta()
}

//función para mostrar gastos en DOM
function mostrarGastos(){

    let datosEnStorage = JSON.parse(localStorage.getItem(`gastos`))

    divGastos.innerHTML = ""

    datosEnStorage.forEach((gasto, indice) => {

        divGastos.innerHTML += `
        <div class="contenedorMostrarGasto" id="gasto${indice}" style="max-width: 20rem; margin:4px;">
            <div><h4>${gasto.titulo}</h4></div>
            <div>
                <p>Categoría: ${gasto.categoria}</p>
                <p>Monto: ${gasto.monto} ${presupuesto.divisa}</p>
                <p>Fecha: ${gasto.fecha}</p>
                <button class="btnEliminarGasto">Eliminar Gasto</button>
            </div>
        </div>
        `

        let btnEliminarGasto = document.getElementById(`gasto${indice}`).lastElementChild.lastElementChild
        let presupuestoEnStorage = JSON.parse(localStorage.getItem(`presupuesto`))

        btnEliminarGasto.addEventListener(`click`, () => {

            divGastosFiltrados.innerHTML = ``
            
            document.getElementById(`gasto${indice}`).remove()
            gastos.splice(indice, 1)

            if(gastos.length == 1){
                let gastoAEliminar = document.getElementById(`gasto${0}`) 
                gastoAEliminar.remove()
                gastos.shift()
            } else{
                let gastoAEliminar = document.getElementById(`gasto${indice}`)
                gastoAEliminar.remove()
                gastos.splice(indice, 1)
            }
            
            //Aplicación de Destructuring
            let {monto} = gasto

            console.log(`Presupuesto antes de sumar gasto eliminado: ${presupuestoEnStorage.presupuesto}`) //Prueba en consola

            presupuestoEnStorage.presupuesto += parseFloat(monto)

            //Pruebas en consola
            console.log(`Monto de gasto a eliminar: ${monto}`)
            console.log(`presupuesto + gasto eliminado: ${presupuestoEnStorage.presupuesto}`)
            //
            
            localStorage.setItem(`presupuesto`, JSON.stringify(presupuestoEnStorage))
            localStorage.setItem(`gastos`, JSON.stringify(gastos))
            console.log(`${gasto.titulo} Eliminado`)
            
            mostrarPresupuesto(presupuesto)
        })
    })
}