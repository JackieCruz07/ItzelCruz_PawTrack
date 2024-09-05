//Definir clases con atributos destro del costructor
class persona{
        //Variable estatica: Solo le pertenece a la clase
        #clave;
        #iniciales
    
        //Metodo constructor
    constructor(nombre,edad,sexo,direccion){
        this._nombre=nombre
        this._edad=edad
        this._sexo=sexo
        this._direccion=direccion
        this.#clave=12076
        this.#iniciales="ISC-"
    }
    //Metodo Saludar
    saludar(){
    console.log(`Hola soy ${this.nombre} y mi carrera es ${this.carrera} mi matricula es ${this.generadorClave()}`)
    }
    //Metodo para generar una clave de alumno

    generarClave(){
        return this.#iniciales+Math.floor(Math.random()*10*this.#clave)
    }

    //Encapsulamiento setter y getter
     getNombre(){
        return this._nombre
    }

     setNombre(values){
        this._nombre=values;
    }

    getCarrera(){
        return this._carrera;
    }

    setCarrera(valor){
        this._carrera=valor;
    }

}
/*     //encapsulamiento getter y setter
    get nombre(){
        return this._nombre
    }
    set nombre(values){
        this._nombre=values
    } */



let persona1=new persona("Jackie", 18, "F","Balancán")
persona1.setNombre=("Ciel")
persona1.setCarrera=("Admin")
console.log(persona1)
persona1.saludar()