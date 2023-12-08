"use client";

import { useState, FormEvent, ReactNode, type FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import CodeSVG from "./components/CodeSVG";
import CloseCodeSVG from "./components/CloseCodeSVG";
import GithubSVG from "./components/GithubSVG";
import WebSVG from "./components/WebSVG";

const navArray = [
  {
    onClickString: "about",
    label: "Acerca de",
  },
  {
    onClickString: "this_page",
    label: "Esta página",
  },
];

interface SectionProps {
  children: ReactNode;
}

const SectionOnPage: FC<SectionProps> = ({ children }) => {
  return (
    <section className="min-h-[400px] flex flex-row justify-center items-center">
      {children}
    </section>
  );
};

function Page() {
  const [prompt, setPrompt] = useState("");
  const [imagen, setImagen] = useState("");
  const [loading, setLoading] = useState(false);
  const [conCodigo, setConCodigo] = useState(false);
  const [code, setCode] = useState("");
  const [section, setSection] = useState("about");

  const onSubmit = async (evt: FormEvent<EventTarget>) => {
    evt.preventDefault();
    setLoading(true);

    try {
      // if (!prompt) return alert("No hay prompt para generar imagen");

      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("result: ", data);

      setImagen(data.url);
    } catch (error) {
      if (error instanceof Error) {
        console.log("error: ", error.message)
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
      // if(!code) return alert("No hay código para ejecutar");

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
    <div className="bg-neutral-900 w-full min-h-screen flex flex-col items-center">
      {/* Nav section */}
      <div
        id="navSection"
        className="flex flex-col min-h-screen w-5/6 justify-center items-center gap-2 p-7 rounded-lg"
      >
        <h1 className="text-5xl p-4 text-center font-bold from-pink-600 via-purple-600 to-blue-600 hover:from-orange-400 hover:via-sky-400 hover:to-green-400 bg-gradient-to-r bg-clip-text text-transparent">
          Taller IA - Ellas con nosotras
        </h1>

        <nav className="py-2">
          <ul className="flex justify-around items-center gap-x-6 p-3">
            {navArray.map((item, index) => (
              <li key={index}>
                <button
                  className="m-1 p-1 rounded-lg from-rose-400 via-fuchsia-500 to-indigo-500 hover:from-orange-400 hover:via-sky-400 hover:to-green-400 bg-gradient-to-r transition duration-500"
                  disabled={loading}
                  onClick={() => setSection(item.onClickString)}
                >
                  <span className="block px-4 py-2 font-semibold rounded-lg bg-black text-white">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {section === "about" ? (
          <SectionOnPage>
            <div className="w-1/4 flex justify-center">
              <img
                className="w-44 h-auto hover:scale-125 transition duration-300"
                src="/ellas-logo.png"
                alt="ellas logo"
              />
            </div>

            <div className="w-1/4">
              <blockquote className="text-2xl font-semibold italic text-neutral-200 my-2">
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-600 relative inline-block">
                  <span className="relative text-white">Taller IA</span>
                </span>
                - Ellas con nosotras
              </blockquote>
              <p className="text-neutral-300">
                El presente taller trata sobre las bases de la inteligencia
                artificial, su importancia, su historia y su impacto en la
                sociedad actual. Ya que la inteligencia artificial se ha vuelto
                tan importante en la sociedad, es necesario que los más jóvenes
                aprendan sobre estas tecnologías y las uses como es debido.
              </p>
            </div>
          </SectionOnPage>
        ) : (
          <SectionOnPage>
            <div className="w-1/4 px-3">
              <blockquote className="text-2xl font-semibold italic text-neutral-200 my-2 text-end">
                Sobre esta
                <span className="before:block before:absolute before:inset-1 before:-skew-y-3 before:bg-pink-600 relative inline-block ml-1">
                  <span className="relative text-white">página</span>
                </span>
              </blockquote>
              <p className="text-neutral-300 text-end">
                La presente página pretende dar a conocer las capacidades de la
                inteligencia artificial a través de un ejemplo de la generación
                de imágenes usando los modelos dall-3. A través de una sección
                de prompting, las niñas presentes en el taller pueden crear
                imágenes a su gusto. Además, se añade una sección donde las
                niñas pueden ingresar código real y generar imágenes a través de
                los modelos Dall-e usando el módulo de openai para Node.js.
              </p>
            </div>
            <div className="w-1/4 px-3">
              <section>
                <blockquote className="text-2xl font-semibold italic text-neutral-200 my-2">
                  Sobre el
                  <span className="before:block before:absolute before:inset-1 before:-skew-y-3 before:bg-gradient-to-r before:from-pink-600 before:via-purple-600 before:to-blue-600 relative inline-block ml-1">
                    <span className="relative text-white">desarrollo</span>
                  </span>
                </blockquote>
              </section>
              <section>
                <blockquote className="font-semibold italic text-neutral-200 my-2">
                  <span className="before:block before:absolute before:inset-1 before:-skew-y-3 before:bg-pink-600 relative inline-block mr-1">
                    <span className="relative text-white">
                      Código del proyecto:
                    </span>
                  </span>
                </blockquote>
                <GithubSVG />
              </section>
              <section>
                <blockquote className="font-semibold italic text-neutral-200 my-2">
                  <span className="before:block before:absolute before:inset-1 before:-skew-y-3 before:bg-blue-600 relative inline-block mr-1">
                    <span className="relative text-white">Desarrollador: </span>
                  </span>
                  <p>Luis Antonio Vásquez Tiu</p>
                </blockquote>
              </section>
              <section>
                <blockquote className="font-semibold italic text-neutral-200 my-2">
                  <span className="before:block before:absolute before:inset-1 before:-skew-y-3 before:bg-purple-600 relative inline-block mr-1">
                    <span className="relative text-white">Página web: </span>
                  </span>
                </blockquote>
                <WebSVG />
              </section>
            </div>
          </SectionOnPage>
        )}
      </div>

      {/* Image generation section */}
      <div className="flex flex-col min-h-screen w-5/6 justify-center items-center mt-2 p-7 rounded-lg">
        <h2 className="font-bold text-center text-3xl">
          Generación de imágenes
        </h2>

        <div className="w-full flex flex-row justify-center items-center gap-2 mt-7">
          <div className="bg-neutral-900 p-4 flex flex-col gap-2 rounded-lg">
            <form
              className="bg-neutral-800 flex gap-x-2 p-2 rounded-lg justify-center"
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
                className="m-1 p-1 rounded-lg from-rose-400 via-fuchsia-500 to-indigo-500 hover:from-orange-400 hover:via-sky-400 hover:to-green-400 bg-gradient-to-r transition duration-500"
                disabled={loading}
              >
                <span className="block px-4 py-2 font-semibold rounded-lg bg-black text-white">
                  {loading ? "Cargando..." : "Generar"}
                </span>
              </button>
              <button
                className="m-1 p-1 rounded-lg from-rose-400 via-fuchsia-500 to-indigo-500 hover:from-orange-400 hover:via-sky-400 hover:to-green-400 bg-gradient-to-r transition duration-500"
                type="button"
                disabled={loading}
                onClick={() => setConCodigo(!conCodigo)}
              >
                <span className="block px-4 py-2 font-semibold rounded-lg bg-black text-white">
                  {conCodigo ? <CloseCodeSVG /> : <CodeSVG />}
                </span>
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
                className="text-neutral-200 bg-neutral-600 resize-none outline-none border-none p-2 rounded-lg"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Escribe aquí tu código"
              />
              <button
                className="m-1 p-1 rounded-lg from-rose-400 via-fuchsia-500 to-indigo-500 hover:from-orange-400 hover:via-sky-400 hover:to-green-400 bg-gradient-to-r transition duration-500"
                disabled={loading}
                onClick={executeCode}
              >
                <span className="block px-4 py-2 font-semibold rounded-lg bg-black text-white">
                  {loading ? "Cargando..." : "Generar"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
