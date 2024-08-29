const prompt=requiere('prompt-sync')()

/* let numero1
let numero2

numero1=prompt("Ingrese el numero 1:")
numero2=prompt("Ingrese el numero 2:")

console.log(numero1*numero2) */

/* Realizar un programa que contenga un arreglo indefinido, en el que solicite
a traves del teclado el tamaño y se ingrese por lo menos 4 valores con un ciclo de cualquier tipo,
imprimir los valores en pantalla */

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

let valores=[]

function infoArreglo(){
    const dimension=parseInt(prompt("Ingrese el tamaño del arreglo"))
    for (let i = 0; i < dimension; i++) {
        let valores = prompt("Ingrese los valores:");
        /*valores[i]=datos  */
        valores.push(datos)      
    }

    valores.map((data)=>{
        console.log(data)
    })
}