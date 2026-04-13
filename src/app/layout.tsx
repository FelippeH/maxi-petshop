import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MaxiPet: Estilo e Cuidado para Cães e Gatos",
  description: "Estilo e Cuidado para Cães e Gatos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
