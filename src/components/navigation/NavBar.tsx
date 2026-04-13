"use client";

import logoDesktop from "@/public/logo_desktop.png";
import logoMobile from "@/public/logo_mobile.png";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-22 md:h-28 bg-(--primary-bg)/95 px-4 box-border">
      {/* Mobile */}
      <div className="flex h-full md:hidden items-center justify-center w-full">
        <Link href="/" aria-label="Ir para a home">
          <Image
            src={logoMobile}
            alt="Logo do PetShop"
            className="w-auto h-26"
            loading="eager"
            decoding="async"
          />
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex relative h-full items-center px-12">
        <Link
          href="/"
          aria-label="Ir para a home"
          className="relative z-10 shrink-0"
        >
          <Image
            src={logoDesktop}
            alt="Logo do PetShop"
            className="w-auto md:h-18"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* Links de navegação (apenas desktop) */}
        <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <div className="pointer-events-auto flex items-center gap-12 text-[1.25rem]">
            <Link href="/" className="relative inline-block no-underline group">
              Início
              <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/produtos"
              className="relative inline-block no-underline group"
            >
              Produtos
              <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/servicos"
              className="relative inline-block no-underline group"
            >
              Serviços
              <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/sobre"
              className="relative inline-block no-underline group"
            >
              Sobre
              <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contato"
              className="relative inline-block no-underline group"
            >
              Contato
              <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/blog"
              className="relative inline-block no-underline group"
            >
              Blog
              <span className="absolute left-0 bottom-0 w-0 h-0.75 bg-(--primary-color) transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
