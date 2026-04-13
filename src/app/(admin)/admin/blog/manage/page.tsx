// src/app/admin/blog/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Trash2, Pencil } from "lucide-react";
import { apiUrl } from "@/lib/api";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

// Componente para gerenciar posts no dashboard admin
export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManagePosts = async () => {
      try {
        const res = await fetch(apiUrl("/blog"));
        if (!res.ok)
          throw new Error(`Erro ao buscar posts. status: ${res.status}`);

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        setError(getErrorMessage(error));
      }
    };
    fetchManagePosts();
  }, []);

  if (error)
    return (
      <p className="flex justify-center items-center p-10 text-[1.5rem] text-red-500">
        {error}
      </p>
    );

  // Função para deletar um post
  const handleDelete = async (id: number) => {
    await fetch(apiUrl(`/blog/${id}`), { method: "DELETE" });
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <>
      <div className="px-4 md:px-20 py-4">
        {/* Lista de posts */}
        <div className="">
          <ul className="flex flex-col gap-3 overflow-y-auto max-h-[74vh]">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex justify-between p-2 border rounded font-semibold"
              >
                <span>{post.title}</span>
                <span className="text-gray-500 text-[0.75rem] font-[300] flex-grow flex items-center justify-end pr-3">
                  {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <div className="inline-flex items-center">
                  <Link
                    href={`/admin/blog/edit/${post.id}`}
                    className="text-yellow-600 px-1 hover:text-yellow-800 cursor-pointer"
                  >
                    <Pencil size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 px-2 cursor-pointer hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center pt-6 justify-end">
          <Link
            href="new-post"
            className="bg-blue-500 hover:bg-blue-400 font-semibold text-[1rem] text-white dark:bg-blue-200 dark:text-blue-950 dark:hover:bg-blue-300 px-4 py-2 m-5 rounded cursor-pointer disabled:opacity-50"
          >
            Novo Post
          </Link>
        </div>
      </div>
    </>
  );
}
