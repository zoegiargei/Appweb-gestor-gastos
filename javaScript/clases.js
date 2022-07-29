//Clases
class Gasto{
    constructor(titulo, categoria, monto){
        this.titulo = titulo
        this.categoria = categoria
        this.monto = monto
        this.fecha = (new Date()).toLocaleDateString()
    }
}
