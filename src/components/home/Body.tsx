import { Button } from "../ui/Button";
import { CalendarCheck } from "lucide-react";
import Image from "next/image";
import PetCareDesktop from "@/public/pet_care_desktop.png";

export default function Body() {
  return (
    <div className="w-full flex px-80 justify-center items-center">
      <div className="flex items-center justify-center bg-white rounded-3xl">
        <div className="w-120">
          <p className="text-(--primary-color) font-bold text-lg mb-2">
            Banho & Tosa
          </p>
          <h2 className="text-3xl md:text-[2.4rem] font-bold mb-6">
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
      <div className="min-w-190 ml-20 hidden md:block">
        <Image
          src={PetCareDesktop}
          alt="Imagem de um pet feliz"
          priority
          className="rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
