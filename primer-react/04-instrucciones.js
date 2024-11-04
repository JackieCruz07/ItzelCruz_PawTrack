const prompt=requiere('prompt-sync')()

/* let numero1
let numero2

numero1=prompt("Ingrese el numero 1:")
numero2=prompt("Ingrese el numero 2:")

console.log(numero1*numero2) */

/* Realizar un programa que contenga un arreglo indefinido, en el que solicite
a traves del teclado el tamaño y se ingrese por lo menos 4 valores con un ciclo de cualquier tipo,
imprimir los valores en pantalla

let valores=[]/* 

let tamaño=prompt("Ingrese el tamaño del arreglo:")
tamaño = parseInt(tamaño)

let valores=[]

for (let i = 0; i < tamaño; i++) {
    let valor = prompt(`Ingrese el valor ${i + 1}:`);
    arreglo.push(valor)
    
}

console.log("Los datos ingresados son:")
for (let i = 0; i < arreglo.length; i++) {
    console.log(`Valor ${i + 1}: ${array[i]}`);
}
     */

/* let arreglo=[]

function infoArreglo(){
    const dimension=parseInt(prompt("Ingrese el tamaño del arreglo"))
    for (let i = 0; i<dimension; i++) {
        let datos = prompt("Ingrese los valores:");
        arreglo[i]=datos  
        /*arreglo.push(datos)*/      
/*     }

    arreglo.map((data)=>{
        console.log(arreglo);
    })
}
infoArreglo() */ 

//solicite y muestre objetos

let informacion

const datos=()=>{
    const tamaño=parseInt(prompt("Ingrese el tamaño de la lista"))
    for (let i = 0; i<tamaño; i++) {
        let nombre = prompt(`El nombre es:`)
        let edad = prompt(`La edad es:`)

        informacion = {
            nombre,
            edad,
        } 
        arreglo.push(informacion)   
    }
    arreglo.map((Jackie)=>{
        console.log(`El nombre es: ${Jackie.nombre} y tiene ${Jackie.edad}`)
    })
    console.log(arreglo)
}
datos()