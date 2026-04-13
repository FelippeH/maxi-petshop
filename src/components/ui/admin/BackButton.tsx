"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

interface BackButtonProps {
  message?: string;
  header?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  fallbackHref?: string;
  className?: string;
}

export default function BackButton({
  message = "Tem certeza que deseja cancelar? Todas as alterações não salvas serão perdidas.",
  header = "Confirmar cancelamento",
  acceptLabel = "Sim, cancelar",
  rejectLabel = "Continuar editando",
  fallbackHref = "/admin",
  className = "",
}: BackButtonProps) {
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const navigateBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  const handleClick = () => {
    confirmDialog({
      message,
      header,
      acceptLabel,
      rejectLabel,
      accept: navigateBack,
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-text",
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <button
        type="button"
        onClick={handleClick}
        className={`bg-[#cacaca] hover:bg-[#747474] dark:bg-[#d8d8d8] dark:hover:bg-[#b5b5b5] opacity-50 relative px-1 py-1 md:px-2 md:py-2 top-7 md:top-8 text-gray-700 dark:text-gray-900 rounded-full transition inline-flex items-center justify-center cursor-pointer ${className}`}
        aria-label="Voltar"
      >
        <ChevronLeft size={20} />
      </button>
    </>
  );
}
