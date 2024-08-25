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