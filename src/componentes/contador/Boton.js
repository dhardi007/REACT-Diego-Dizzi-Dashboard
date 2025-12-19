
function Boton({ texto, esBotonDeClic, manejarClic }) {
  return (
    <button
      className={`px-6 py-3 m-2 font-bold text-white rounded-lg transition-transform transform active:scale-95 ${
        esBotonDeClic
          ? 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30'
          : 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/30'
      }`}
      onClick={manejarClic}>
      {texto}
    </button>
  );
}

export default Boton;
