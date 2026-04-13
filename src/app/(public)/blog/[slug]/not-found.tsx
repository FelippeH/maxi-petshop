import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <main className="w-full bg-(--primary-bg)">
      <section className="mx-auto w-full max-w-5xl px-6 pb-24 pt-36 md:px-20">
        <div className="rounded-3xl border border-(--vertical-line) bg-white p-10 text-center">
          <h1 className="text-3xl font-bold text-(--primary-color)">
            Artigo não encontrado
          </h1>
          <p className="mt-4 text-[1.05rem] text-(--secondary-color-font)">
            O conteúdo solicitado não existe ou foi removido.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-(--primary-color) px-6 font-medium text-white transition-colors duration-200 hover:bg-(--primary-color-hover)"
          >
            Voltar para o blog
          </Link>
        </div>
      </section>
    </main>
  );
}
