
const Pantalla = ({ input }) => (
  <div className='w-full h-24 mb-4 flex justify-end items-end text-5xl font-mono font-bold bg-black/40 text-green-400 px-6 py-4 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] backdrop-blur-md border border-gray-700 overflow-hidden tracking-widest'>
    {input || '0'}
  </div>
);

export default Pantalla;
