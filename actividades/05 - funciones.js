//Factory Funtion
//Se definen dos objetos, persona y persona2, que contienen propiedades nombre y edad.
const persona={
    nombre: "José",
    edad:22
}
const persona2={
    nombre: "Jackie",
    edad: 18
}
/* Esta función de fábrica crea y devuelve un objeto 
con las propiedades nombre, edad y active. */
function datosPersona(nombre, edad) {
    return{
        nombre:nombre,
        edad:edad,
        active:true
    }
    
}
/* Se crean dos objetos usando la función de fábrica 
datosPersona. Los objetos se almacenan en personas1 y personas3. */
let personas1=datosPersona("José",18)
let personas3=datosPersona("Luis",36)
//console.log(personas1, personas3)
//camelCase
/* Se define un objeto datosUsuario que contiene varias 
propiedades, incluida una función guardarUsuario. 
 La función guardarUsuario se llama inmediatamente 
 después de la definición. */
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
/* Se crea un objeto user y se agregan propiedades y métodos dinámicamente. 
La función guardarUser se define y se llama. */
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
/* Se utiliza Object.seal para sellar el objeto person, 
lo que impide que se agreguen nuevas propiedades, pero
 permite modificar las existentes. La línea que intenta
  usar Object.freeze tiene un error de sintaxis.  */
//const person=Object.freeze({id:1,nombre:"Jackie"})
const person=Object.seal({id:1,nombre="Jackie"})
person.id=2
person.nombre="Luis"
person.edad=35

//console.log(person)
//Pasar funciones como párametros
/* Se define una función corgi que intenta asignar 
un valor a _nombre, pero nombre no está definido en su 
contexto, lo que causará un error. La función Animal se 
utiliza para crear una nueva instancia de corgi. */
function corgi() {
    this._nombre=nombre

}
function Animal(Fn,argumento){
    return new Fn(argumento)
}
let animal1=animal(corgi,"Doggie")
console.log(animal1)