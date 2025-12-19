
function Contador({ numClics }) {
  return (
    <div className='min-w-50 h-50 text-[10rem] font-bold font-mono text-purple-500 flex items-center justify-center bg-gray-900 rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] border-4 border-gray-700 relative z-20 backdrop-blur-md'>
      {numClics}
    </div>
  );
}

export default Contador;
