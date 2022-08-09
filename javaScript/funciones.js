function mostrarAlerta(){
    divMostrarPresupuesto.classList.toggle(`presupuestoEnRojo`)
    divMostrarPresupuesto.classList.toggle(`vibrate-1`)
    divMostrarPresupuesto.classList.remove(`presupuestoNormal`)
}

function quitarAlerta(){
    divMostrarPresupuesto.classList.remove(`presupuestoEnRojo`)
    divMostrarPresupuesto.classList.remove(`vibrate-1`)
}


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
        <p class="p">Presupuesto: ${presupuestoEnStorage.presupuesto} ${presupuestoEnStorage.divisa}</p>
    `

    //Aplicación de operador Ternario.
    presupuestoEnStorage.presupuesto < 10 ? mostrarAlerta() : quitarAlerta()
}


//Eliminar Gasto

/* function eliminarGasto(){

    let datosEnStorage = JSON.parse(localStorage.getItem(`gastos`))

    datosEnStorage.forEach((gasto) => {

        const btnEliminarGasto = ((document.getElementById(`gasto${gasto.id}`))
        .lastElementChild).lastElementChild

        btnEliminarGasto.addEventListener(`click`, () => {

            document.getElementById(`gasto${gasto.id}`).remove()

            let presupuestoEnStorage = JSON.parse(localStorage.getItem(`presupuesto`))
            presupuestoEnStorage.presupuesto += gasto.monto

            datosEnStorage.splice(datosEnStorage.indexOf(gasto), 1)
            
            localStorage.setItem(`presupuesto`, JSON.stringify(presupuestoEnStorage))
            localStorage.setItem(`gastos`, JSON.stringify(datosEnStorage))

            mostrarPresupuesto(presupuestoEnStorage)
            eliminarGasto()
        })
    })
} */

//función para mostrar gastos en DOM
function mostrarGastos(){

    let datosEnStorage = JSON.parse(localStorage.getItem(`gastos`))

    divGastos.innerHTML = ""

    datosEnStorage.forEach((gasto, indice) => {

        divGastos.innerHTML += `
        <div class="contenedorMostrarGasto" id="gasto${gasto.id}" style="max-width: 20rem; margin:4px;">
            <div><h4>${gasto.titulo}</h4></div>
            <div>
                <p>Categoría: ${gasto.categoria}</p>
                <p>Monto: ${gasto.monto} ${datosPresupuesto.divisa}</p>
                <p>Fecha: ${gasto.fecha}</p>
                <button class="btnEliminarGasto" id="botonGastoAEliminar">Eliminar Gasto</button>
            </div>
        </div>
        `

        const btnEliminarGasto = ((document.getElementById(`gasto${gasto.id}`))
        .lastElementChild).lastElementChild

        btnEliminarGasto.addEventListener(`click`, () => {

            document.getElementById(`gasto${gasto.id}`).remove()

            let presupuestoEnStorage = JSON.parse(localStorage.getItem(`presupuesto`))
            presupuestoEnStorage.presupuesto += gasto.monto

            datosEnStorage.splice(datosEnStorage.indexOf(gasto), 1)
            
            localStorage.setItem(`presupuesto`, JSON.stringify(presupuestoEnStorage))
            localStorage.setItem(`gastos`, JSON.stringify(datosEnStorage))

            mostrarPresupuesto(presupuestoEnStorage)
            //eliminarGasto()
        })

        //eliminarGasto()
    })
    //eliminarGasto()
}

function error(mensaje){

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Dato ingresado no válido',
      footer: mensaje
    })
  }