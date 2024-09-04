//Definir clases con atributos destro del costructor
class persona{
    constructor(nombre,edad,sexo,direccion){
        this._nombre=nombre
        this._edad=edad
        this._sexo=sexo
        this._direccion=direccion
    }
    saludar(){
    console.log(`Hola ${this.nombre}`)
    }
    //encapsulamiento getter y setter
    get nombre(){
        return this._nombre
    }
    set nombre(values){
        this._nombre=values
    }

}

let persona1=new persona("Jackie", 18, "F","Balancán")
persona.nombre="Ciel"
console.log(persona1)
persona1.saludar()