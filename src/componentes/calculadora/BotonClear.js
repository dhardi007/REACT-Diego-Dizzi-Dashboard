
const BotonClear = (props) => (
  <div 
    className='w-full h-16 bg-red-600 text-white font-bold text-xl flex items-center justify-center mt-2 cursor-pointer hover:bg-red-700 active:scale-95 rounded transition-colors shadow-lg' 
    onClick={props.manejarClear}
  >
    {props.children}
  </div>
);

export default BotonClear;
