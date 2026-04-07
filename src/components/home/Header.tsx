"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import bannerHeader from "@/public/banner_header2.png";
import bannerMobile from "@/public/banner_mobile.png";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full overflow-hidden">
      {/* Mobile */}
      <div
        className="md:hidden relative h-150 overflow-hidden"
        style={{ marginTop: "88px" }}
      >
        <Image
          src={bannerMobile}
          alt="Banner do site no mobile"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 0vw"
        />
        <div className="absolute inset-0 flex left-2 top-62 flex-col items-start">
          <p className="relative text-black font-bold text-[2rem] leading-8">
            Tudo para <br /> o seu{" "}
            <span className="text-(--primary-color)">
              melhor <br /> amigo<span className="text-[#daa56f]">.</span>
            </span>
          </p>
          <p className="relative top-3 text-black text-[0.925rem]">
            Produtos, cuidados e muito <br /> carinho para o seu pet.
          </p>
        </div>
        <div className="absolute flex flex-row gap-2 left-2 bottom-32 items-center">
          <Link href="/agendamento" className="">
            <Button variant="primaryMobile">
              Agende Agora{" "}
              <ChevronRight className="relative left-1 top-0.5" size={20} />
            </Button>
          </Link>
          <Link href="/servicos" className="">
            <Button variant="secondaryMobile">Nossos Serviços</Button>
          </Link>
        </div>
      </div>

      {/* Desktop */}
      <div
        className="hidden md:block relative w-full h-[90vh] overflow-hidden"
        style={{ marginTop: "112px" }}
      >
        <Image
          src={bannerHeader}
          alt="Banner Animais"
          className="object-cover"
          fill
          priority
          sizes="(min-width: 768px) 100vw, 0vw"
        />
        <div className="absolute inset-0 flex left-32 top-26 flex-col items-start">
          <p className="relative text-black font-bold text-[4rem] leading-20">
            Tudo para o seu <br />
            <span className="text-(--primary-color)">
              melhor amigo<span className="text-[#daa56f]">.</span>
            </span>
          </p>
          <p className="relative top-5 text-(--secondary-color-font) text-[1.6rem]">
            Produtos, cuidados e muito carinho
            <br /> para o seu pet.
          </p>
        </div>
        <div className="absolute flex flex-row gap-5 md:left-32 md:top-100 text-[1.125rem]">
          <Link href="/agendamento" className="flex items-center gap-2">
            <Button variant="primaryDesktop">
              Agende agora{" "}
              <ChevronRight
                className="relative left-1 top-0.5"
                size={24}
                color="#fff"
              />
            </Button>
          </Link>
          <Link
            href="/servicos"
            className="flex items-center gap-2 text-[1.125rem]"
          >
            <Button variant="secondaryDesktop">Nossos serviços</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
