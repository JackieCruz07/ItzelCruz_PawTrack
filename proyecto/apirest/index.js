const express=require("express")
const bodyparser=require("body.parser")
const cors=require("cost")

const app=express()
const port=3001

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())

app.get("/mensaje", (req,res)=>{
    res.send("Servidosor corriendo")
})

app.post("/Guardar", (req,res)=>{
    try {
       //const {nombre}=req.body 
    console.log(nombre)
    }catch(error){
        console.log(error.message)
    }
    
})
   

app.listen(port,()=>{
    console.log("Servidor ejecutado en el puerto 3001")
})