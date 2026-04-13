"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/editor/Editor";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { ConfirmButton } from "@/components/ui/admin/ConfirmButton";
import BackButton from "@/components/ui/admin/BackButton";
import { toast } from "react-hot-toast";
import { apiUrl } from "@/lib/api";

interface Post {
  id: number;
  title: string;
  content: string;
  cover: string;
}

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [postId, setPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Resolver params e buscar o post
  useEffect(() => {
    async function loadPost() {
      try {
        const resolvedParams = await params;
        setPostId(resolvedParams.id);

        const res = await fetch(apiUrl(`/blog/${resolvedParams.id}`));
        if (!res.ok) {
          throw new Error("Post não encontrado");
        }

        const post: Post = await res.json();
        setTitle(post.title);
        setContent(post.content);
        setCover(post.cover);
      } catch (fetchError) {
        setError(getErrorMessage(fetchError));
      } finally {
        setFetching(false);
      }
    }
    loadPost();
  }, [params]);

  const handleCoverFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        const detail = await res.text();
        console.error("Erro ao enviar imagem de capa:", detail);
        toast.error("Erro ao atualizar a imagem de capa.");
        return;
      }
      toast.success("Imagem de capa atualizada com sucesso!");
      const data = await res.json();
      setCover(data.url);
    } catch (uploadError) {
      setCoverUploadError(getErrorMessage(uploadError));
    } finally {
      setCoverUploading(false);
      e.target.value = "";
    }
  };

  const triggerCoverUpload = () => fileInputRef.current?.click();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!cover.trim()) {
      setError("Selecione ou envie uma imagem de capa antes de salvar.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(apiUrl(`/blog/${postId}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, cover: cover.trim() }),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.log("Detalhes do erro:", detail);
        toast.error("Erro ao atualizar o post.");
        return;
      }
      toast.success("Post atualizado com sucesso!");
    } catch (submitError) {
      setError(getErrorMessage(submitError));
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500">Carregando post...</p>
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <div className="md:px-12 px-1 flex flex-col items-center justify-center w-full">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 md:max-w-[64vw] w-full text-[1.1rem]"
        >
          <div>
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

            {coverUploadError && (
              <p className="text-sm text-red-500">{coverUploadError}</p>
            )}
          </div>

          {/* EDITOR DE TEXTO */}
          <RichTextEditor onChange={setContent} content={content} />

          {/* Botões de ação */}
          <div className="justify-end flex py-2 gap-2">
            {/* Botão de cancelar com confirmação */}
            <ConfirmButton
              onConfirm={() => router.push("/admin/blog/manage")}
            />
            <button
              type="submit"
              disabled={loading || coverUploading}
              className="bg-blue-500 hover:bg-blue-600 font-semibold text-[1rem] text-white dark:bg-blue-200 dark:text-blue-950 dark:hover:bg-blue-300 px-4 py-2 rounded cursor-pointer disabled:opacity-50"
            >
              Atualizar Post
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </>
  );
}
