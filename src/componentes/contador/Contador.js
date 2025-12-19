
function Contador({ numClics }) {
  return (
    <div className='min-w-50 h-50 flex items-center justify-center text-8xl font-bold text-gray-800 dark:text-white border-4 border-gray-800 dark:border-white mb-8 p-4 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-xl'>
      {numClics}
    </div>
  );
}

export default Contador;
