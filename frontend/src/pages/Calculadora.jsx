import freeCodeCampLogo from "../imagenes/freecodecamp-logo.png";
import Boton from "../componentes/calculadora/Boton";
import Pantalla from "../componentes/calculadora/Pantalla";
import BotonClear from "../componentes/calculadora/BotonClear";
import { useState } from "react";
import { evaluate } from "mathjs";

function Calculadora() {
  const [input, setInput] = useState("");

  const agregarInput = (val) => {
    setInput(input + val);
  };

  const calcularResultado = () => {
    if (input) {
      try {
        setInput(evaluate(input));
      } catch (error) {
        alert("Expresión inválida");
      }
    } else {
      alert("Por favor ingrese valores para realizar los cálculos.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4 animate-fade-in-down">
      <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
        <img
          src={freeCodeCampLogo}
          className="h-16 w-auto object-contain brightness-0 dark:brightness-200 drop-shadow-md"
          alt="Logo de freeCodeCamp"
        />
      </div>

      {/* Calculator Container with Glassmorphism/Premium feel */}
      <div className="w-full max-w-sm bg-gray-800/80 rounded-[3rem] p-6 shadow-2xl border border-gray-600/50 relative overflow-hidden ring-1 ring-white/10 backdrop-blur-xl">

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-purple-500 rounded-full blur-[80px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>

        <Pantalla input={input} />

        <div className="grid grid-cols-4 gap-3 mt-4 relative z-10">
          <Boton manejarClic={agregarInput}>1</Boton>
          <Boton manejarClic={agregarInput}>2</Boton>
          <Boton manejarClic={agregarInput}>3</Boton>
          <Boton manejarClic={agregarInput}>+</Boton>

          <Boton manejarClic={agregarInput}>4</Boton>
          <Boton manejarClic={agregarInput}>5</Boton>
          <Boton manejarClic={agregarInput}>6</Boton>
          <Boton manejarClic={agregarInput}>-</Boton>

          <Boton manejarClic={agregarInput}>7</Boton>
          <Boton manejarClic={agregarInput}>8</Boton>
          <Boton manejarClic={agregarInput}>9</Boton>
          <Boton manejarClic={agregarInput}>*</Boton>

          <Boton manejarClic={calcularResultado}>=</Boton>
          <Boton manejarClic={agregarInput}>0</Boton>
          <Boton manejarClic={agregarInput}>.</Boton>
          <Boton manejarClic={agregarInput}>/</Boton>
        </div>

        <div className="mt-4 relative z-10">
          <BotonClear manejarClear={() => setInput("")}>Clear</BotonClear>
        </div>
      </div>
    </div>
  );
}

export default Calculadora;
