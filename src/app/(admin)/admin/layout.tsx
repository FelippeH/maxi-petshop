import { ReactNode } from "react";
// import { auth } from "@clerk/nextjs/server";

// PrimeReact CSS

import "./globals.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // const userId = auth();

  // if (!userId) {
  //   return (
  //     <html lang="pt-BR">
  //       <body>
  //         <main className="flex items-center justify-center min-h-screen">
  //           <p>Você precisa estar logado para acessar o painel.</p>
  //         </main>
  //       </body>
  //     </html>
  //   );
  // }

  return (
    <div className="flex min-h-screen justify-center">
      <main className="flex min-w-0 px-4 md:px-6 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
