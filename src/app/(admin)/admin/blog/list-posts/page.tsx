"use client";

import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { apiUrl } from "@/lib/api";

interface Post {
  id: number;
  title: string;
  content: string;
  cover?: string | null;
  createdAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca os posts da API ao carregar o componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(apiUrl("/blog"));
        if (!res.ok)
          throw new Error(`Erro ao buscar posts. Status: ${res.status}`);

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Renderização condicional com base no estado de carregamento e erro
  if (loading) return <p className="p-10">Carregando posts...</p>;
  if (error)
    return (
      <p className="flex justify-center items-center p-10 text-[1.5rem] text-red-500">
        {error}
      </p>
    );

  return (
    <div className="px-4 md:px-20 py-4">
      {posts.length === 0 && <p>Nenhum post encontrado.</p>}

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[74vh]">
        {posts.map((post) => (
          <Link
            href={`${post.id}`}
            key={post.id}
            className="block mb-4 p-4 border rounded hover:bg-gray-100"
          >
            <h2 className="text-[1.3rem] font-semibold pb-2">{post.title}</h2>
            <div
              className="max-h-[30px] overflow-hidden text-gray-700 mb-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="inline-flex w-full justify-between">
              <p className="relative text-center text-gray-600 text-[0.9rem] top-4 left-1/2 -translate-x-1/2">
                Expandir{" "}
                <ChevronDown
                  size={18}
                  className="items-center justify-center inline-block"
                />
              </p>
              <p className="text-gray-500 text-[0.8rem] relative top-5 text-right">
                {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center pt-6 justify-end">
        <Link
          href="new-post"
          className="bg-blue-500 hover:bg-blue-400 text-white dark:bg-blue-200 dark:text-blue-950 dark:hover:bg-blue-300 px-4 py-2 m-5 rounded cursor-pointer disabled:opacity-50"
        >
          Novo Post
        </Link>
      </div>
    </div>
  );
}
