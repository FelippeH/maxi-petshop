"use client";

import { useRef } from "react";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface ConfirmButtonProps {
  label?: string;
  message?: string;
  header?: string;
  icon?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  onConfirm: () => void;
  severity?: "secondary" | "success" | "danger";
  className?: string;
}

export function ConfirmButton({
  label = "Cancelar",
  message = "Tem certeza que deseja cancelar? Todas as alterações não salvas serão perdidas.",
  header = "Confirmar cancelamento",
  acceptLabel = "Sim, cancelar",
  rejectLabel = "Continuar editando",
  onConfirm,
  severity = "danger",
  className = "",
}: ConfirmButtonProps) {
  const toast = useRef<Toast>(null);
  const buttonClassName =
    `dark:!bg-red-300 dark:hover:!bg-red-400 dark:!text-red-950 ${className}`.trim();

  const handleClick = () => {
    confirmDialog({
      message,
      header,
      acceptLabel,
      rejectLabel,
      accept: () => {
        onConfirm();
      },
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-text",
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <Button
        type="button"
        label={label}
        severity={severity}
        onClick={handleClick}
        className={buttonClassName}
      />
    </>
  );
}
