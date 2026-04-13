"use client";

import { Image as ImageIcon } from "lucide-react";
import { apiUrl } from "@/lib/api";

export default function ImageUploadButton({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    // Envia o arquivo para a API de upload
    const res = await fetch(apiUrl("/upload"), {
      method: "POST",
      body: formData,
    });

    // Obtém a URL da imagem enviada
    const data = await res.json();
    onUpload(data.url);
  };

  return (
    <button
      type="button"
      onClick={() => document.getElementById("image-input")?.click()}
      className="px-3 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
    >
      <ImageIcon size={16} />
      <input
        id="image-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </button>
  );
}
