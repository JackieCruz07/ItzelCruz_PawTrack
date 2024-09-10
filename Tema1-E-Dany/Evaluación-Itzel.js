const prompt=require('prompt-sync')()

class Empleado {
    constructor(nombre, apellido, RFC, dirección, telefono, sueldo){
        this._nombre=nombre
        this._apellido=apellido
        this._rfc=rfc
        this._dirección=dirección
        this._telefono=telefono
        this._sueldo=sueldo
    }

    get nombre(){
        return this._nombre
    }
    set nombre(value){
        this._nombre=value
    }

    get apellido(){
        return this._apellido
    }
    set apellido(value){
        this._apellido=value
    }

    get rfc(){
        return this._rfc
    }
    set rfc(value){
        this._rfc=value
    }

    get dirección(){
        return this._dirección
    }
    set dirección(value){
        this._dirección=value
    }

    get telefono(){
        return this._telefono
    }
    set telefono(value){
        this._telefono=value
    }

    get sueldo(){
        return this._sueldo
    }
    set sueldo(value){
        this._sueldo=value
    }

    //Calcular el sueldo extra
    CalcularSueldo(horasExtra=0){
        horasBase=8
        let sueldoFinal = this._sueldo

        if(horasExtra > horasBase){
            const extraHoras = horasExtra - horasBase
            const extra = this._sueldo * 0.15
            sueldoFinal += extra * extraHoras
        }
        
        return sueldoFinal
    }
    
}

class Sociedad {
    constructor(){
        this._empleados=[]
    }

    añadirEmpleado(){
        const nombre=prompt('Ingrese Nombre del empleado: ')
        const apellido=prompt('Ingrese Apellido del empleado: ')
        const RFC=prompt('Ingrese RFC del empleado: ')
        const dirección=prompt('Ingrese Dirección del empleado: ')
        const telefono=prompt('Ingrese Telefono del empleado: ')
        const sueldo=parseFloat(prompt('Ingrese Sueldo del empleado: '))

        const nuevo=new Empleado(nombre, apellido, RFC, dirección, telefono, sueldo)
        this._empleados.push(nuevo)
        console.log('Empleado añadido correctamente')
    }

    eliminarUltimo(){
        if(this._empleados.length===0){
            console.log('No hay empleados registrados')
            return
        }
        const eliminarEmpleado=this._empleados.pop()
        console.log('Empleado eliminado correctamente')
    }

    verEmpleados(){
        if(this._empleados.length===0){
            console.log('No hay empleados registrados')
            return
        }
        console.log('Empleados registrados')
        this._empleados.forEach((empleado, index)=>{
            console.log(`${index+1}. ${empleado.nombre} ${empleado.apellido}`)
        })
    }

}
const empresa = new Sociedad();
empresa.añadirEmpleado();
empresa.verEmpleados();
empresa.eliminarUltimo();