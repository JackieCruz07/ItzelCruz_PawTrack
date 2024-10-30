import './App.css';
/* import Otro from "./Otro";
import Formulariocss from "./Formulariocss";
import Formularioboot from "./components/Formularioboot"; 
import Menu from "./components/inicio/Menu";
*/
import { BrowserRouter as Router } from "react-router-dom";
import Rutas from "./routes/Rutas"

function App() {
  return (
<Router>
      <div className="container-fluid">
        <Rutas/>
      </div>
</Router>
  );
}

export default App;
