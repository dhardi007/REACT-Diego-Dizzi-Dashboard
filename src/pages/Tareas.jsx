import "./Tareas.css";
import freeCodeCampLogo from "../imagenes/freecodecamp-logo.png";
import ListaDeTareas from "../componentes/todolist/ListaDeTareas";

function Tareas() {
  return (
    <div className="aplicacion-tareas">
      <div className="freecodecamp-logo-contenedor">
        <img
          alt="Logo de freeCodeCamp"
          src={freeCodeCampLogo}
          className="freecodecamp-logo"
        />
      </div>
      <div className="tareas-lista-principal">
        <h1>Mis Tareas</h1>
        <ListaDeTareas />
      </div>
    </div>
  );
}

export default Tareas;
