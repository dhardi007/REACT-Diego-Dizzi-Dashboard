
function Boton(props) {
  const esOperador = valor => {
    return isNaN(valor) && (valor != '.') && (valor != '=');
  };

  return (
    <div
      className={`flex-1 h-16 flex items-center justify-center font-bold text-xl text-white select-none cursor-pointer rounded-2xl m-1 shadow-md
        ${esOperador(props.children)
          ? 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
          : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'
        } transform transition-all active:scale-95 hover:shadow-lg`.trimEnd()}
      onClick={() => props.manejarClic(props.children)}>
      {props.children}
    </div>
  );
}

export default Boton;
