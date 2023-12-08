import React from "react";

function Buttons() {
  return (
    <>
      <button className="bg-gradient-to-r from-blue-500 to-purple-500 border-black border text-white font-semibold py-2 px-4 rounded">
        Button
      </button>

      <button className="bg_custom_gradient text-white font-semibold rounded p-1">
        <span className="flex w-full bg-gray-900 text-white rounded p-2">
          Boton
        </span>
      </button>

      <button className="m-4 p-1 rounded-full from-rose-400 via-fuchsia-500 to-indigo-500 hover:from-orange-400 hover:via-sky-400 hover:to-green-400 bg-gradient-to-r transition duration-500">
        <span className="block px-4 py-2 font-semibold rounded-full bg-black text-white">
          Inicio
        </span>
      </button>

      <button className="m-4 p-1  rounded-lg from-rose-400 via-fuchsia-500 to-indigo-500 bg-gradient-to-r">
        <span className="block text-white px-4 py-2 font-semibold rounded-lg bg-black hover:bg-transparent transition">
          Introduccion
        </span>
      </button>

      <div className="relative my-5">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur"></div>
        <button className="relative rounded-lg bg-black px-7 py-4 text-white">
          Acerca de
        </button>
      </div>

      <div className="group relative">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 group-hover:from-green-400 group-hover:via-sky-400 group-hover:to-orange-400 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
        <button className="relative rounded-lg bg-black px-7 py-4 text-white">
          Inicio
        </button>
      </div>
    </>
  );
}

export default Buttons;
