import logo_desktop from "@/public/logo_desktop.png";
import Link from "next/link";
import Image from "next/image";

const icons: ReadonlyArray<{
  icon: React.ReactNode;
  href: string;
  label: string;
}> = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
          fill="#558451"
          stroke="none"
        />
      </svg>
    ),
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          fill="#558451"
          stroke="none"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
          fill="#558451"
          stroke="none"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
          fill="#558451"
          stroke="none"
        ></path>
      </svg>
    ),
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
          fill="#558451"
          stroke="none"
        />

        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
          fill="#558451"
          stroke="none"
        />
      </svg>
    ),
    href: "https://wa.me/5511999999999",
    label: "WhatsApp",
  },
];

export default function Footer() {
  return (
    <footer className="w-full mt-14">
      {/* LOGO e REDES SOCIAIS */}
      <div className="flex flex-col items-center justify-center">
        <Link href="/" aria-label="Ir para a home">
          <Image
            src={logo_desktop}
            alt="Logo do Petshop"
            className="w-50 h-auto"
            priority
          />
        </Link>
        <div className="flex gap-10 mt-4">
          {icons.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white flex items-center justify-center p-2"
            >
              <div className="w-7 h-7">{Icon}</div>
            </Link>
          ))}
        </div>
        <span className="w-full max-w-7xl h-0.5 my-12 bg-(--vertical-line)"></span>
      </div>

      {/* INSTITUCIONAL, NAVEGAÇÃO e CONTATO */}
      <div className="w-full px-6 md:px-20 mb-8">
        <div className="grid md:grid-cols-3 gap-20 max-w-7xl mx-auto">
          {/* Institucional */}
          <div className="flex flex-col md:items-start space-y-4">
            <h3 className="text-xl font-bold text-primary-color mb-4">
              MaxiPet
            </h3>
            <p className="text-left w-70 text-md text-(--secondary-color-font)">
              Somos um petshop dedicado a oferecer o melhor para o seu amigo de
              quatro patas. Com uma ampla variedade de produtos e serviços,
              estamos aqui para cuidar do seu pet com carinho e
              profissionalismo.
            </p>
          </div>

          {/* NAVEGAÇÃO */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-bold text-primary-color">Navegação</h3>
            <nav className="flex flex-col space-y-1 text-md text-(--secondary-color-font)">
              <Link
                href="/"
                className="hover:text-primary-color transition-colors duration-200 text-center md:text-left"
              >
                Início
              </Link>
              <Link
                href="/servicos"
                className="hover:text-primary-color transition-colors duration-200 text-center md:text-left"
              >
                Serviços
              </Link>
              <Link
                href="/produtos"
                className="hover:text-primary-color transition-colors duration-200 text-center md:text-left"
              >
                Produtos
              </Link>
              <Link
                href="/sobre"
                className="hover:text-primary-color transition-colors duration-200 text-center md:text-left"
              >
                Sobre Nós
              </Link>
              <Link
                href="/contato"
                className="hover:text-primary-color transition-colors duration-200 text-center md:text-left"
              >
                Contato
              </Link>
            </nav>
          </div>

          {/* CONTATO */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-bold text-primary-color">Contato</h3>
            <div className="flex flex-col space-y-3 text-center md:text-left text-md text-(--secondary-color-font)">
              <Link
                href="tel:+5511999999999"
                className="hover:text-primary-color transition-colors duration-200 flex items-center justify-center md:justify-start gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="#558451"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (11) 99999-9999
              </Link>
              <Link
                href="mailto:contato@petshop.com"
                className="hover:text-primary-color transition-colors duration-200 flex items-center justify-center md:justify-start gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="#558451"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                contato@petshop.com
              </Link>
              <p className="flex items-start justify-center md:justify-start gap-2 text-md">
                <svg
                  className="w-5 h-5 mt-0.5 shrink-0"
                  fill="none"
                  stroke="#558451"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  Rua dos Animais, 123
                  <br />
                  Cidade dos Pets
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className=" bg-(--secondary-color-hover) py-3">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-md text-(--secondary-color-font)">
            © {new Date().getFullYear()} MaxiPet - Todos os direitos reservados
            - Desenvolvido por NodFlow
          </p>
        </div>
      </div>
    </footer>
  );
}
