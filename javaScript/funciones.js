//Función para mostrar prespuesto en DOM
function mostrarPresupuesto(presupuesto){

    //Aplicar acá método Destructuring

    let presupuestoEnStorage = JSON.parse(localStorage.getItem(`presupuesto`)) //Pedimos VALUE del storage con GET + KEY(CLAVE)

    divMostrarPresupuesto.innerHTML = ``

    divMostrarPresupuesto.innerHTML += `
        <p>Presupuesto: ${presupuestoEnStorage.presupuesto} ${presupuestoEnStorage.divisa}</p>
    `

    if (presupuestoEnStorage < 10){
        divMostrarPresupuesto.classList.toggle(`presupuestoEnRojo`)
        divMostrarPresupuesto.classList.toggle(`vibrate-1`)
        divMostrarPresupuesto.classList.remove(`presupuestoNormal`)
    }
}

//función para mostrar gastos
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

        datosEnStorage.forEach(() => {
    
            let btnEliminarGasto = document.getElementById(`gasto${indice}`).lastElementChild.lastElementChild
            let presupuestoEnStorage = JSON.parse(localStorage.getItem(`presupuesto`))
    
            btnEliminarGasto.addEventListener(`click`, () => {
                
                document.getElementById(`gasto${indice}`).remove()
                gastos.splice(indice, 1)
                
                presupuestoEnStorage.presupuesto += parseFloat(gasto.monto)
                //Pruebas en consola
                console.log(`Monto de gasto a eliminar: ${gasto.monto}`)
                console.log(`presupuesto + gasto eliminado: ${presupuestoEnStorage.presupuesto}`)
                //
                
                if(presupuesto>10 && divMostrarPresupuesto.classList.contains(`presupuestoEnRojo`)){
                    
                    divMostrarPresupuesto.classList.remove(`presupuestoEnRojo`)
                    divMostrarPresupuesto.classList.remove(`vibrate-1`)
                    divMostrarPresupuesto.classList.toggle(`presupuestoNormal`)
                }
                
                localStorage.setItem(`presupuesto`, JSON.stringify(presupuestoEnStorage))
                localStorage.setItem(`gastos`, JSON.stringify(gastos))
                console.log(`${gasto.titulo} Eliminado`)
                
                mostrarPresupuesto(presupuesto)
            })
        })
    })
}