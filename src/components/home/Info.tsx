import { Headset, CreditCard, Dog } from "lucide-react";

const infoItems: ReadonlyArray<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = [
  {
    icon: <Headset size="34" />,
    title: "Atendimento Online",
    description: "Agende consultas com nossos veterinários",
  },
  {
    icon: <CreditCard size="34" />,
    title: "Parcelamento",
    description: "Em até 6x sem juros para facilitar suas compras",
  },
  {
    icon: <Dog size="34" />,
    title: "Cuidados Personalizados",
    description: "Dicas e orientações para o bem-estar do seu pet",
  },
];

export default function Info() {
  return (
    <section className="flex justify-center">
      <div className="bg-(--secondary-bg) md:w-300 h-36 rounded-3xl ">
        <div className="grid grid-cols-3 h-full w-full ">
          {infoItems.map((item) => (
            <div
              key={item.title}
              className="flex justify-center border-r-2 border-(--vertical-line) last:border-0"
            >
              <div className="w-full max-w-80 flex items-center gap-6 ">
                <div className="shrink-0 text-(--primary-color)">
                  {item.icon}
                </div>

                <div className="flex flex-col justify-center text-left leading-tight">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-(--secondary-color-font) text-md">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
