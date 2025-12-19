import Boton from "../componentes/contador/Boton";
import Contador from "../componentes/contador/Contador";
import freeCodeCampLogo from "../imagenes/freecodecamp-logo.png";
import { useState } from "react";

function PageContador() {
  const [numClics, setNumClics] = useState(0);

  const manejarClic = () => {
    setNumClics(numClics + 1);
  };

  const reiniciarContador = () => {
    setNumClics(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full p-4 animate-fade-in-down">
      <div className="mb-12 transform hover:scale-105 transition-transform duration-300">
        <img
          className="h-20 w-auto object-contain brightness-0 dark:brightness-200 drop-shadow-md"
          src={freeCodeCampLogo}
          alt="Logo de freeCodeCamp"
        />
      </div>

      <div className="flex flex-col items-center bg-gray-800/80 p-10 rounded-[3rem] shadow-2xl border border-gray-600/50 w-full max-w-md relative overflow-hidden group hover:shadow-purple-500/20 transition-all duration-500 backdrop-blur-xl ring-1 ring-white/10">

        {/* Backlight effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/5 group-hover:to-purple-500/10 transition-colors duration-500"></div>

        <div className="z-10 w-full flex justify-center mb-8">
            <Contador numClics={numClics} />
        </div>

        <div className="flex w-full gap-4 z-10">
          <div className="flex-1">
             <Boton texto="Clic" esBotonDeClic={true} manejarClic={manejarClic} />
          </div>
          <div className="flex-1">
             <Boton
                texto="Reiniciar"
                esBotonDeClic={false}
                manejarClic={reiniciarContador}
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageContador;
