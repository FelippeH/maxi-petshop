import { Button } from "@/components/ui/Button";
import { CalendarCheck } from "lucide-react";
import Image from "next/image";
import PetCareDesktop from "@/public/pet_care_desktop.png";

export default function Body() {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row px-6 md:px-60 justify-center items-center gap-8 md:gap-12">
        <div className="flex items-center justify-center bg-white rounded-3xl flex-1">
          <div className="w-full md:w-120">
            <p className="text-(--primary-color) font-bold text-xl mb-2">
              Banho & Tosa
            </p>
            <h2 className="text-2xl md:text-[2.4rem] font-bold mb-6 leading-tight">
              Cuide do seu pet com amor e qualidade
            </h2>
            <p className="text-(--secondary-color-font) text-[1.125rem] mb-6">
              Encontre tudo o que seu pet precisa em um só lugar. Rações,
              brinquedos, acessórios e muito mais para garantir a felicidade do
              seu melhor amigo.
            </p>
            <div className="flex text-[1.125rem]">
              <Button variant="primaryDesktop">
                <CalendarCheck className="relative right-2" size={22} />
                Agendar horário
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full flex md:block">
          <Image
            src={PetCareDesktop}
            alt="Imagem de um pet feliz"
            priority
            className="rounded-xl w-full h-auto object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </>
  );
}
