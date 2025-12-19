
function Boton(props) {
  const esOperador = valor => {
    return isNaN(valor) && (valor != '.') && (valor != '=');
  };

  return (
    <div
      className={`flex-1 h-20 flex items-center justify-center font-bold text-2xl text-white select-none cursor-pointer border-2 border-gray-800 hover:brightness-110 active:scale-95 transition-all ${
        esOperador(props.children) ? 'bg-green-600' : 'bg-gray-700'
      }`.trimEnd()}
      onClick={() => props.manejarClic(props.children)}>
      {props.children}
    </div>
  );
}

export default Boton;
