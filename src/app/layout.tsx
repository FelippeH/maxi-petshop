import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";

export const metadata: Metadata = {
  title: "Pet Boutique",
  description: "Estilo e Elegância para Cães e Gatos",
  icons: {
    icon: "/img/icon/patas.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="pt-[5.5rem] md:pt-[7rem]">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
