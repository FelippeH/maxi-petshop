"use client";

import logoDesktop from "@/public/logo_desktop.png";
import logoMobile from "@/public/logo_mobile.png";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full h-22 md:h-28 items-center bg-(--primary-bg)/95 px-4">
      {/* Mobile */}
      <div className="flex md:hidden items-center justify-center w-full">
        <Image
          src={logoMobile}
          alt="Logo do PetShop"
          width={100}
          height={100}
        />
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-start">
        <Image
          src={logoDesktop}
          alt="Logo do PetShop"
          width={280}
          height={280}
        />
      </div>
      {/* Links de navegação (apenas desktop) */}
      <div className="hidden absolute md:flex justify-center w-full gap-18 text-[1.4rem] ">
        <a href="./" className="relative inline-block no-underline group">
          Início
          <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
        </a>
        <a
          href="/produtos"
          className="relative inline-block no-underline group"
        >
          Produtos
          <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
        </a>
        <a
          href="/servicos"
          className="relative inline-block no-underline group"
        >
          Serviços
          <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
        </a>
        <a href="/sobre" className="relative inline-block no-underline group">
          Sobre
          <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
        </a>
        <a href="/contato" className="relative inline-block no-underline group">
          Contato
          <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
        </a>
      </div>
    </nav>
  );
}
