// Destructaring

/* const persona = {
    nombre : "Jackie",
    edad : 18,
    sexo : "F"
} */
/* 
let{ nombre,edad,sexo}=persona

console.log(nombre,sexo);
 */
/* 
let nombre,edad,sexo

({ nombre,edad,sexo}=persona)

console.log(nombre,sexo);
 */
/* 
const persona = {
    nombre : "Chepe",
    edad : 22,
    sexo : "M"
}

let{ ...datos}=persona //crea una copia del objeto natural

datos.nombre="Juan"

console.log(datos.nombre);
 */

const persona = {
    nombre : "Luis",
    edad : 22,
    sexo : "M"
}

let{ nombre:name}=persona 


console.log(persona);