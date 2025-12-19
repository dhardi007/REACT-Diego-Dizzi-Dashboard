
const BotonClear = (props) => (
  <div
    className='w-full h-14 bg-linear-to-r from-red-500 to-pink-600 text-white font-bold text-xl flex items-center justify-center mt-3 cursor-pointer hover:from-red-600 hover:to-pink-700 active:scale-95 rounded-2xl transition-all shadow-lg uppercase tracking-wider'
    onClick={props.manejarClear}
  >
    {props.children}
  </div>
);

export default BotonClear;
