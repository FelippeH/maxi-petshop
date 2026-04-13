"use client";

import { FormEvent, useState } from "react";
import { ChevronRight } from "lucide-react";
import { apiUrl } from "@/lib/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setIsError(true);
      setStatusMessage("Digite um e-mail para se inscrever.");
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);
    setIsError(false);

    try {
      const response = await fetch(apiUrl("/newsletter"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setIsError(true);
        setStatusMessage(
          payload.message ?? "Não foi possível cadastrar seu e-mail.",
        );
        return;
      }

      setEmail("");
      setIsError(false);
      setStatusMessage("E-mail cadastrado com sucesso!");
    } catch {
      setIsError(true);
      setStatusMessage("Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-full mx-60 justify-center flex">
      <div className="grid grid-cols-2 gap-16 h-54 w-360">
        <div className="flex flex-col px-4 text-center bg-(--secondary-color-hover) rounded-2xl"></div>
        <div className="flex-col flex items-center justify-center px-4 bg-(--secondary-color-hover) rounded-2xl">
          <h2 className="text-2xl font-bold text-(--primary-color) mb-4">
            Fique por dentro das novidades!
          </h2>
          <p className="text-(--secondary-color-font) mb-6">
            Inscreva-se em nossa newsletter e fique por dentro das promoções
          </p>
          <form onSubmit={handleSubmit} className="flex justify-center">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Seu e-mail"
              required
              disabled={isLoading}
              className="flex-1 w-100 px-4 py-2 rounded-l-lg outline-none focus:ring-1 focus:ring-gray-200 bg-white"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center items-center w-16 h-12 font-medium text-white bg-(--primary-color) rounded-r-lg cursor-pointer hover:bg-(--primary-color-hover) disabled:opacity-70"
            >
              <ChevronRight />
            </button>
          </form>
          {statusMessage && (
            <p
              className={`mt-3 text-sm ${isError ? "text-red-600" : "text-(--primary-color)"}`}
            >
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
