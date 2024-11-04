/*realizar un arreglo con dos dimensiones y guardar dos arreglos internos
 y dar lectura a los datos internos*/

let A = [[3, 4, 5, 6], [7, 8, 9]];

const datosArreglo = () => {
    A.map((datos,index) => {
        datos.map((valores, i) => {
            console.log(`${i} = ${valores}`);
        })
    })
};
datosArreglo();

// for of
let A = [[3, 4, 5, 6], [7, 8, 9]];

const datosArreglo = () => {
    for (let datos of A) {
        for (let i = 0; i < datos.length; i++) {
            console.log(`${i} = ${datos[i]}`);
        }
    }
};
datosArreglo();

//for in
let A = [[3, 4, 5, 6], [7, 8, 9]];

const datosArreglo = () => {
    for (let datos of A) {
        let datos = A[index]
        for (let i in datos) {
            console.log(`${i} = ${datos[i]}`);
        }
    }
};
datosArreglo();

//for each
let A = [[3, 4, 5, 6], [7, 8, 9]];

const datosArreglo = () => {
    A.forEach((datos) => {
        datos.forEach((valores, i) => {
            console.log(`${i} = ${valores}`);
        })
    })
};
datosArreglo();

//function flecha
let A = [[3, 4, 5, 6], [7, 8, 9]];

const datosArreglo = () => {
    A.map((datos) =>
        datos.map((valores, i) => {
            console.log(`${i} = ${valores}`);
        })
    )
};
datosArreglo();

//while
let A = [[3, 4, 5, 6], [7, 8, 9]];

const datosArreglo = () => {
    let i = 0
    while (i < A.length) {
        let j = 0
        while (j < A[i].length) {
            console.log(`${j} = ${A[i][j]}`)   
            j++         
        }
        i++
    }
}
datosArreglo()
