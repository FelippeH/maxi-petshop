"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // para redirecionar após criar
import RichTextEditor from "@/components/editor/Editor";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { ConfirmButton } from "@/components/ui/admin/ConfirmButton";
import BackButton from "@/components/ui/admin/BackButton";
import { apiUrl } from "@/lib/api";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCoverFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // Verifica se um arquivo foi selecionado
    const file = e.target.files?.[0];
    if (!file) return;

    // Reseta erros anteriores e inicia o upload
    setCoverUploadError(null);
    setCoverUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(apiUrl("/upload"), {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Falha ao enviar imagem de capa");
      }

      const data = await res.json();
      setCover(data.url);
    } catch (uploadError) {
      setCoverUploadError(getErrorMessage(uploadError));
    } finally {
      setCoverUploading(false);
      e.target.value = "";
    }
  };

  // Função para disparar o input file
  const triggerCoverUpload = () => fileInputRef.current?.click();

  // Manipulador de submit do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Valida se a imagem de capa foi fornecida
    if (!cover.trim()) {
      setError("Selecione ou envie uma imagem de capa antes de salvar.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(apiUrl("/blog"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, cover: cover.trim() }),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar o post");
      }
      // Redireciona para a lista de posts após criar com sucesso
      router.push("/admin/blog/list-posts");
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton />
      <div className="md:px-12 px-1 flex flex-col items-center justify-center w-full">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 md:max-w-[64vw] w-full text-[1.1rem]"
        >
          <div className="">
            {/* CAPA DO POST */}
            <div className="flex flex-col md:flex-row gap-2 pb-3 items-center">
              <label className="text-[1.2rem] font-semibold">
                Capa do Post:
              </label>
              <div className="flex gap-2 flex-row md:items-center">
                <div
                  className="md:text-[0.8rem] text-[0.7rem] w-[48vw] max-w-[48vw] text-gray-600 items-center flex bg-white border border-dashed border-gray-300 rounded px-2 py-1 h-[24px] md:h-[34px] truncate md:w-[16vw] md:max-w-[16vw]"
                  title={cover || "Nenhuma imagem selecionada"}
                >
                  {cover || "Nenhuma imagem selecionada"}
                </div>
                {/* Botões de upload e limpar */}
                <div className="flex flex-row gap-2 text-[0.9rem] md:text-[1.1rem] font-semibold">
                  <button
                    type="button"
                    onClick={triggerCoverUpload}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 md:px-4 md:py-1 px-2 rounded cursor-pointer"
                    disabled={coverUploading}
                  >
                    {coverUploading ? "Enviando..." : "Upload"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCover("")}
                    className="bg-red-500 hover:bg-red-600 text-white dark:bg-red-300 dark:text-red-950 dark:hover:bg-red-400 md:px-4 md:py-1 px-2 rounded cursor-pointer"
                  >
                    Limpar
                  </button>
                </div>
              </div>
              {/* Input file oculto */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverFileChange}
              />
            </div>
            {/* TÍTULO */}
            <div className="flex flex-col pb-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border-gray-500 border-1 p-3 rounded-[8px] w-full focus:border-black outline-none"
                placeholder="Digite o título do post"
              />
            </div>
            {/* CAPA */}
            {/* Mostrar erro de upload, se houver */}
            {coverUploadError && (
              <p className="text-sm text-red-500">{coverUploadError}</p>
            )}
          </div>

          {/* EDITOR DE TEXTO */}
          <RichTextEditor onChange={setContent} content={content} />

          {/* Botões de ação */}
          <div className="justify-end flex py-2 gap-2">
            <ConfirmButton onConfirm={() => router.push("/admin")} />
            <button
              type="submit"
              disabled={loading || coverUploading}
              className="bg-blue-500 hover:bg-blue-600 font-semibold text-[1rem] text-white dark:bg-blue-200 dark:text-blue-950 dark:hover:bg-blue-300 px-4 py-2 rounded cursor-pointer disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Criar Post"}
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </>
  );
}
