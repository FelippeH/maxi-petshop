import Image, { type StaticImageData } from "next/image";

import racoesPetiscos from "@/public/body/racoes-petiscos.png";
import brinquedos from "@/public/body/brinquedos.png";
import camasAcessorios from "@/public/body/camas-acessorios.png";
import higieneCuidados from "@/public/body/higiene-cuidados.png";

const shortcuts: ReadonlyArray<{
  image: StaticImageData;
  title: string;
}> = [
  { image: racoesPetiscos, title: "Rações & Petiscos" },
  { image: brinquedos, title: "Brinquedos" },
  { image: camasAcessorios, title: "Camas & Acessórios" },
  { image: higieneCuidados, title: "Higiene & Cuidados" },
];

export default function Shortcuts() {
  return (
    <>
      {/* Mobile: Carrossel horizontal */}
      <div className="md:hidden w-full px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-4">
          {shortcuts.map((shortcut) => (
            <article
              key={shortcut.title}
              className="w-72 shrink-0 snap-center flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-white px-5 py-6 text-center h-68"
            >
              <Image
                src={shortcut.image}
                alt={shortcut.title}
                className="h-22 w-22 object-cover"
                width={64}
                height={64}
              />
              <span className="mt-4 font-bold text-xl text-(--primary-color)">
                {shortcut.title}
              </span>
              <a
                href="#produtos"
                className="mt-2 text-lg text-(--primary-color)"
              >
                Ver produtos
              </a>
            </article>
          ))}
        </div>
      </div>

      {/* Desktop: Grid horizontal */}
      <div className="hidden md:flex items-center justify-center">
        <div className="bg-(--primary-bg) w-330 h-80 rounded-3xl shadow-lg shadow-gray-100">
          <div className="grid grid-cols-4 h-full gap-6">
            {shortcuts.map((shortcut, index) => (
              <div
                key={shortcut.title}
                className="h-full flex items-center justify-center"
              >
                <div
                  className={`h-[60%] w-full flex flex-col items-center justify-center gap-5 ${
                    index < shortcuts.length - 1
                      ? "border-r-2 border-(--vertical-line)"
                      : ""
                  }`}
                >
                  <Image
                    src={shortcut.image}
                    alt={shortcut.title}
                    className="h-22 w-22 object-cover"
                    width={200}
                    height={200}
                  />

                  <span className="font-bold text-xl text-(--primary-color)">
                    {shortcut.title}
                  </span>

                  <a
                    href="#produtos"
                    className="text-(--primary-color) text-lg"
                  >
                    Ver produtos
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
