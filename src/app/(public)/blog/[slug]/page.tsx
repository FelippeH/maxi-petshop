import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getBlogPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  await connection();
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full bg-(--primary-bg)">
      <section className="mx-auto w-full max-w-5xl px-6 pb-6 md:px-20">
        <Link
          href="/blog"
          className="inline-flex items-center text-[1rem] font-medium text-(--primary-color) transition-colors duration-200 hover:text-(--primary-color-hover)"
        >
          ← Voltar para o blog
        </Link>

        <article className="mt-5 overflow-hidden rounded-3xl border border-(--vertical-line) bg-white">
          <div className="h-72 w-full overflow-hidden bg-(--secondary-bg) md:h-80 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover}
              alt={`Capa do artigo ${post.title}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-7 md:py-6 md:px-10">
            <p className="text-sm font-medium text-(--secondary-color-font)">
              {formatDate(post.createdAt)}
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-black md:text-5xl">
              {post.title}
            </h1>

            <div
              className="mt-5 text-[1.1rem] leading-8 text-(--secondary-color-font) [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-(--primary-color) [&_a]:underline [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-(--vertical-line) [&_blockquote]:pl-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </section>
    </main>
  );
}
