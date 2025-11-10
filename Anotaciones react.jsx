// #INICIO DE REACT
/*
REGLAS DE JSX
1. JSX DEBE TENER UN SOLO ELEMENTO PADRE
2. LOS ATRIBUTOS EN JSX SE ESCRIBEN EN CAMELCASE, EJ: className, onClick
3. <STYLES></STYLES> EN JSX SE ESCRIBEN COMO OBJETOS DE JAVASCRIPT {}, EJ: style={{estilosDiv}}

4. ATRIBUTOS DE DOM ADMITIDOS EN JSX
https://es.legacy.reactjs.org/docs/dom-elements.html
5. ROOT ES EL PRIMER HIJO DE JSX
*/
import React from "react";
import "../hojas-de-estilo.css/Contador.css";
// ASI SE CREA UNA CONSTANTE EN JSX [ REACT ]
const elemnto = <h1>hola mundo</h1>;

// ASI SE ALMACENA UN ESTILO EN JSX [ REACT ]
const estilo = {
  color: "blue",
  backgroundColor: "yellow",
  fontSize: "20px",
};

// ASI SE CREA UNA FUNCION EN JSX [ REACT ]
function saludo(nombre) {
  return <h1>Hola {nombre}, bienvenido a React</h1>;
}

// ASI SE CREA UNA CLASE EN JSX [ REACT ]
class Saludo extends React.Component {
  render() {
    return <h1>Hola {this.props.nombre}, bienvenido a React</h1>;
  }
}

export { elemnto, saludo, Saludo };

// ASI SERIA UNA FUNCION COMPONENTE EN REACT
function Contador({ numClicks }) {
  return <div className="contador">{numClicks}</div>;
}

export default Contador;

// ARRAYS EN JSX
const numeros = [1, 2, 3, 4, 5];
const listaNumeros = (
  <ul>
    {numeros.map((numero) => (
      <li key={numero.toString()}>{numero}</li>
    ))}
  </ul>
);

export { listaNumeros };
// boton CLEAR en JXS
export function BotonClear({ manejarClear }) {
  return (
    <button className="boton-clear" onClick={manejarClear}>
      CLEAR
    </button>
  );
}
// #FIN DE REACT
