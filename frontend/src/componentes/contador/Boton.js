
function Boton({ texto, esBotonDeClic, manejarClic }) {
  return (
    <button
      className={`px-8 py-4 m-2 font-bold text-xl text-white rounded-full transition-all transform active:scale-95 hover:shadow-2xl ${
        esBotonDeClic
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/40 ring-2 ring-purple-400/20'
          : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 shadow-green-500/40 ring-2 ring-green-400/20'
      }`}
      onClick={manejarClic}>
      {texto}
    </button>
  );
}

export default Boton;
