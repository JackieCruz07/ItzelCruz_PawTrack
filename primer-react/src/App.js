import './App.css';
/* import Otro from "./Otro";
import Formulariocss from "./Formulariocss";
import Formularioboot from "./components/Formularioboot"; */
import { BrowserRouter as Router } from "react-router-dom";
import Menu from "./components/inicio/Menu";
import Rutas from "./routes/Rutas"

function App() {
  return (
<Router>
      <div className="container-fluid">
        <Menu />
        <Rutas/>
      </div>
</Router>
  );
}

export default App;
