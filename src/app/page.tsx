"use client";

import { useState, FormEvent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

function Page() {
  const [prompt, setPrompt] = useState("");
  const [imagen, setImagen] = useState("");
  const [loading, setLoading] = useState(false);
  const [conCodigo, setConCodigo] = useState(false);
  const [code, setCode] = useState("");

  const onSubmit = async (evt: FormEvent<EventTarget>) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("data: ", data);

      setImagen(data.url);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const executeCode = async (evt: FormEvent<EventTarget>) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate-with-code", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setImagen(data.url);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row gap-2 justify-center items-center">
      <div className="bg-neutral-900 p-4 flex flex-col gap-2 rounded-lg">
        <form
          className="bg-gray-700 flex gap-x-2 p-2 rounded-lg justify-center"
          onSubmit={onSubmit}
        >
          <input
            className="bg-neutral-600 text-white flex-grow-0 px-2 py-1 rounded-lg my-2 outline-none border-none"
            onChange={(evt) => setPrompt(evt.target.value)}
            type="text"
            placeholder="gatito"
            value={prompt}
          />
          <button
            className="bg-sky-700 text-white px-3 py-2 my-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Generar"}
          </button>
          <button
            className="bg-sky-700 text-white px-3 py-2 my-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            disabled={loading}
            onClick={() => setConCodigo(!conCodigo)}
          >
            Código
          </button>
        </form>

        <div className="w-full flex justify-center">
          {imagen && (
            <img className="w-96" src={imagen} alt="Imagen generada" />
          )}
        </div>
      </div>

      {conCodigo && (
        <div className="Code">
          {code && (
            <SyntaxHighlighter language="javascript" style={dracula}>
              {code}
            </SyntaxHighlighter>
          )}
          <textarea
            className="text-neutral-200 bg-neutral-700 resize-none outline-none border-none p-2 rounded-lg"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Escribe aquí tu código"
          />
          <button
            className="bg-sky-700 text-white px-3 py-2 my-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            onClick={executeCode}
          >
            {loading ? "Cargando..." : "Generar"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Page;
