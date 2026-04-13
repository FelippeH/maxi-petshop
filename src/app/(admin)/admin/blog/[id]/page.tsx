import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogPostById } from "@/lib/blog";

export default async function ViewPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(Number(id));

  if (!post) {
    notFound();
  }

  // Formata as datas de criação e atualização
  const createdAt = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Sem data";

  return (
    <>
      <div className="md:px-32 py-6 px-2 md:w-[76vw] w-full flex justify-center max-h-[90vh] overflow-y-auto">
        <div className="w-full max-w-3xl flex flex-col items-center gap-4">
          {post.cover && (
            <Image
              src={post.cover}
              width={500}
              height={500}
              alt={`Capa do post ${post.title}`}
              className="w-full max-h-[160px] object-cover rounded-lg border border-gray-200 cursor-pointer"
            />
          )}
          <div className="w-full flex flex-col gap-1">
            <h3 className="text-[1.6rem] font-semibold text-gray-900 text-center">
              {post.title}
            </h3>
            <p className="text-[0.8rem] text-gray-400 text-center border-b pb-2 border-gray-200">
              Publicado em {createdAt}
            </p>
          </div>
          <article
            className="text-[1.1rem] w-full"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </>
  );
}
