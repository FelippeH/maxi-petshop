import Link from "next/link";
import { connection } from "next/server";
import { getBlogPosts } from "@/lib/blog";

function getExcerpt(content: string, maxLength = 150) {
  const contentWithoutHtml = content.replace(/<[^>]*>/g, " ");
  const normalizedContent = contentWithoutHtml.replace(/\s+/g, " ").trim();

  if (normalizedContent.length <= maxLength) {
    return normalizedContent;
  }

  return `${normalizedContent.slice(0, maxLength).trimEnd()}...`;
}

function formatDate(date: Date | null) {
  if (!date) {
    return "Sem data";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function LastArticles() {
  await connection();
  const posts = await getBlogPosts();

  return (
    <main className="w-full bg-(--primary-bg) mx-60 flex">
      <section className="w-full pb-10 justify-center items-center">
        <div className="w-full flex items-center">
          <h1 className="text-(--primary-color) font-bold text-xl">
            Últimos Artigos
          </h1>
        </div>

        {posts.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-(--vertical-line) bg-white text-center">
            <h2 className="text-2xl font-bold text-black">
              Nenhum artigo publicado ainda
            </h2>
            <p className="text-[1.125rem] text-(--secondary-color-font)">
              O banco está vazio no momento. Assim que novos conteúdos forem
              cadastrados, eles aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4">
            {posts.slice(0, 4).map((post) => (
              <article
                key={post.id}
                className="flex h-full md:w-82 flex-col overflow-hidden rounded-3xl border border-(--vertical-line) bg-white"
              >
                <div className="h-44 w-full overflow-hidden bg-(--secondary-bg) flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.cover}
                    alt={`Capa do artigo ${post.title}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col px-3 py-2">
                  <p className="text-[0.875rem] text-(--secondary-color-font)">
                    {formatDate(post.createdAt)}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold leading-tight text-black">
                    {post.title}
                  </h2>

                  <p className="text-[1rem] leading-7 text-(--secondary-color-font)">
                    {getExcerpt(post.content)}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex h-12 w-fit items-center justify-center rounded-xl bg-(--primary-color) px-6 font-medium text-white transition-colors duration-200 hover:bg-(--primary-color-hover)"
                  >
                    Leia mais
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
