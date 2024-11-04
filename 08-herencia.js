class Persona{
    constructor(nombre, apellido, edad, sexo, direccion, telefono, email, horario){
        this._nombre = nombre
        this._apellido = apellido
        this._edad = edad
        this._sexo = sexo
        this._direccion = direccion
        this._telefono = telefono
        this._email = email
        this._horario = horario
    }
}

class Alumno extends Persona{
    constructor(nombre, apellido, horario, matricula, carrera, semestre){
        super(nombre, apellido, horario)
        this.matricula = matricula
        this.carrera = carrera
        this.semestre = this.semestre

    }

    mensaje(){
        console.log(`soy el alunmo ${this._nombre} y estudii la carrera de ${this._carrera}`)
    }
}

let Alunmo1 = new Alumno("José", "Cabrera", "07-05", "2E20106", "Sistemas", 3)
Alumno1.mensaje()