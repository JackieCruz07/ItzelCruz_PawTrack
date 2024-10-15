const formDatos=document.getElementById("datos")
let datosArr=[]

formDatos.addEventListener("Submit", (ev)=>{
    ev.preventDefaul();
    const nombre=document.getElementById("nombre").evalue;
    const edad=document.getElementById("edad").evalue;
    const sexo=document.getElementById("sexo").evalue;
    const rfc=document.getElementById("rfc").evalue;

    let info={nombre:nombre, edad:edad, sexo:sexo, rfc:rfc}
    let infoJSON=JSON.stringify(info)

    fetch("http://localhost:3001/Guardar",{
        method:"POST",
        header: {"Content.Type":"application/json"},
        body:infoJSON
    })
    //datosArr.push(info)
    console.log(infoJSON)
})