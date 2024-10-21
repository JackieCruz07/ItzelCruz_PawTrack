import "./App.css";
import Otro from "./otro";
import FormularioCss from "./formulariocss";
import Formularioboot from "./components/formularioboot";

function App() {
  return (
    <>
    <div className="row">
    <div className="col-4">
      <h1>Columnas a la izquierda</h1>
    </div>
    <div className="col-4">
      <h1>Centro</h1>
    </div>
    <div className="col-4">
      <h1>Derecha</h1>
    </div>
    </div>
    <div className="App" >
      <h1>Hi</h1>
      <Otro />
      <FormularioCss/>
      <div className="container-fluid p-3">
       <Formularioboot/> 
      </div>
    </div>
    </>
  );
}

export default App;
