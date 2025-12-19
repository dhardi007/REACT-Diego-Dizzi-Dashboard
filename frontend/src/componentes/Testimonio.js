import React from 'react';

function Testimonio(props) {
  return (
    <div className='flex flex-col md:flex-row items-center w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md my-6 hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:text-gray-200 overflow-hidden border border-gray-200 dark:border-gray-700'>
      <div className="w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
        <img
          className='w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500'
          src={props.imagen}
          alt={`Foto de ${props.nombre}`}
        />
      </div>
      <div className='w-full md:w-2/3 p-6 flex flex-col justify-center text-center md:text-left'>
        <p className='text-xl font-bold mb-1 text-gray-800 dark:text-gray-100'>
          {props.nombre} <span className="text-base font-normal text-gray-500 dark:text-gray-400">en {props.pais}</span>
        </p>
        <p className='text-sm text-purple-600 font-semibold mb-4 dark:text-purple-400'>
          {props.cargo} en <strong className="font-bold">{props.empresa}</strong>
        </p>
        <p className='text-gray-600 dark:text-gray-300 italic leading-relaxed'>
          "{props.testimonio}"
        </p>
      </div>
    </div>
  );
}

export default Testimonio;
