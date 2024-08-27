//crear una lista con diferentes tipos de datos
let datos=[{
    nombre:"Jackie", 
    apellido:"Cruz", 
    edad:18, 
    estudiante:true
}
,
{
    nombre:"Chepito", 
    apellido:"Cabrera", 
    edad:22, 
    estudiante:true
}
]

/* let arreglos=["Jackie", 18, true]

const info=()=>{ */
    /*
    for(let arr in arreglo){
        console.log(arr)
    }
    
    for(let lis in datos){
        console.log(`${lis}:${datos[lis]}`)
   }

        let valores = Object.values(datos)
        valores.map((data)=>{
            console.log(`${index}:${data}`)
        })

    let valores=Object.keys(datos)
    for(let informacion of valores )
         console.log(informacion)
        })*/

/*     let valores=Object.entries(datos)
    valores.map(dat=>{
        console.log(dat)
    }) */


/*         Object.entries(datos).forEach(([key,value])=>{
            console.log(`El ${Key}: ${value}`)
        }) */

    datos.map((data)=>{
            console.log(`Su nombre es: ${data.nombre}, su apellido es: ${data.apellido} y tiene ${data.edad} años`)
        })

info()

//.keys devuelve las claves y .values los valores

   