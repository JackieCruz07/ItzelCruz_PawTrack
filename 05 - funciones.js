//Factory Funtion
const persona={
    nombre: "José",
    edad:22
}
const persona2={
    nombre: "Jackie",
    edad: 18
}

function datosPersona(nombre, edad) {
    return{
        nombre:nombre,
        edad:eddad,
        active:true
    }
    
}
let personas1=datosPersona("José",18)
let personas3=datosPersona("Luis",36)
//console.log(personas1, personas3)
//camelCase
const datosUsuario={
    nombre:"Chepe",
    edad: 13,
    passoword:"12345",
    direccion:{
        colonia: "El villano",
        calle: "Carretera Emiliano Zapata",
        numext: 123
    },
    sueldo: 2800.00,
    guardarUsuario:function(){
console.log("Guardar Usuario...")
    }
}
datosUsuario.guardarUsuario()

//add registros y parametros a los objetos definidos
const user={id:1}
user.nombre="Jackie"
user.guardarUser=function(){
console.log("Guardando user...")
}
console.log(user)
user.guardarUser
/* let funcionGuardar=user.guardarUser()
console.log(funcionGuardar) */

//objetos definidos
//const person=Object.freeze({id:1,nombre="Jackie"})
const person=Object.seal({id:1,nombre="Jackie"})
person.id=2
person.nombre="Luis"
person.edad=35

//console.log(person)
//Pasar funciones como párametros
function corgi() {
    this._nombre=nombre

}
function Animal(Fn,argumento){
    return new Fn(argumento)
}
let animal1=animal(corgi,"Doggie")
console.log(animal1)