const formDatos = document.getElementById("datos");
let datosArr = [];

formDatos.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;
  const sexo = document.getElementById("sexo").value;
  const rfc = document.getElementById("rfc").value;

  let info = { nombre: nombre, edad: edad, sexo: sexo, rfc: rfc };
  let infoJSON = JSON.stringify(info);

  fetch("http://localhost:3001/Guardar", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: infoJSON,
  });

  // datosArr.push(info);
  console.log(infoJSON);
});
