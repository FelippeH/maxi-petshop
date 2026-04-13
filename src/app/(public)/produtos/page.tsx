"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

type ProductItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
};

const products: ProductItem[] = [
  {
    id: 1,
    slug: "produto-1",
    title: "Produto 1",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 2,
    slug: "produto-2",
    title: "Produto 2",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 3,
    slug: "produto-3",
    title: "Produto 3",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 4,
    slug: "produto-4",
    title: "Produto 4",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 5,
    slug: "produto-5",
    title: "Produto 5",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 6,
    slug: "produto-6",
    title: "Produto 6",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 7,
    slug: "produto-7",
    title: "Produto 7",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 8,
    slug: "produto-8",
    title: "Produto 8",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 9,
    slug: "produto-9",
    title: "Produto 9",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 10,
    slug: "produto-10",
    title: "Produto 10",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 11,
    slug: "produto-11",
    title: "Produto 11",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 12,
    slug: "produto-12",
    title: "Produto 12",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 13,
    slug: "produto-13",
    title: "Produto 13",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 14,
    slug: "produto-14",
    title: "Produto 14",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 15,
    slug: "produto-15",
    title: "Produto 15",
    description: "Descrição breve do produto para personalização posterior.",
  },
  {
    id: 16,
    slug: "produto-16",
    title: "Produto 16",
    description: "Descrição breve do produto para personalização posterior.",
  },
];

function ProductCard({ product }: { product: ProductItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-(--vertical-line) bg-white">
      <div className="h-40 w-full bg-gradient-to-br from-(--secondary-bg) to-(--secondary-color) md:h-48" />
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-xl font-bold text-(--primary-color)">{product.title}</h3>
        <p className="mt-3 text-[0.98rem] leading-6 text-(--secondary-color-font)">
          {product.description}
        </p>
        <Link
          href={`/produtos/${product.slug}`}
          className="mt-5 inline-flex h-11 w-fit items-center justify-center rounded-xl bg-(--primary-color) px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-(--primary-color-hover)"
        >
          Ver produto
        </Link>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const desktopPageSize = 8;
  const [desktopPage, setDesktopPage] = useState(0);
  const desktopPages = Math.ceil(products.length / desktopPageSize);
  const desktopProducts = useMemo(
    () =>
      products.slice(
        desktopPage * desktopPageSize,
        desktopPage * desktopPageSize + desktopPageSize,
      ),
    [desktopPage],
  );

  const firstMobileCarousel = products.slice(0, Math.ceil(products.length / 2));
  const secondMobileCarousel = products.slice(Math.ceil(products.length / 2));
  const mobilePageSize = 2;

  const [mobileTopPage, setMobileTopPage] = useState(0);
  const [mobileBottomPage, setMobileBottomPage] = useState(0);

  const mobileTopPages = Math.ceil(firstMobileCarousel.length / mobilePageSize);
  const mobileBottomPages = Math.ceil(secondMobileCarousel.length / mobilePageSize);

  const topMobileProducts = firstMobileCarousel.slice(
    mobileTopPage * mobilePageSize,
    mobileTopPage * mobilePageSize + mobilePageSize,
  );
  const bottomMobileProducts = secondMobileCarousel.slice(
    mobileBottomPage * mobilePageSize,
    mobileBottomPage * mobilePageSize + mobilePageSize,
  );

  return (
    <main className="min-h-screen w-full bg-(--primary-bg)">
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-12 md:px-20 md:pb-24 md:pt-16">
        <div className="max-w-3xl">
          <p className="mb-3 text-lg font-bold text-(--primary-color)">Produtos</p>
          <h1 className="text-4xl font-bold leading-tight text-black md:text-5xl">
            Catálogo completo para o seu pet
          </h1>
          <p className="mt-5 text-[1.05rem] text-(--secondary-color-font)">
            Estrutura pronta para você personalizar títulos, imagens e
            descrições dos produtos.
          </p>
        </div>

        <div className="mt-10 hidden md:block">
          <div className="mb-5 flex items-center justify-end gap-3">
            <button
              type="button"
              aria-label="Página anterior"
              onClick={() => setDesktopPage((page) => Math.max(page - 1, 0))}
              disabled={desktopPage === 0}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-(--primary-color) transition-colors hover:bg-(--secondary-color-hover) disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Próxima página"
              onClick={() =>
                setDesktopPage((page) => Math.min(page + 1, desktopPages - 1))
              }
              disabled={desktopPage >= desktopPages - 1}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--primary-color) text-white transition-colors hover:bg-(--primary-color-hover) disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">{desktopProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>

        <div className="mt-10 space-y-8 md:hidden">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-(--primary-color)">
                Carrossel 1
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Anterior carrossel 1"
                  onClick={() => setMobileTopPage((page) => Math.max(page - 1, 0))}
                  disabled={mobileTopPage === 0}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-(--primary-color) disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Próximo carrossel 1"
                  onClick={() =>
                    setMobileTopPage((page) => Math.min(page + 1, mobileTopPages - 1))
                  }
                  disabled={mobileTopPage >= mobileTopPages - 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--primary-color) text-white disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {topMobileProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-(--primary-color)">
                Carrossel 2
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Anterior carrossel 2"
                  onClick={() =>
                    setMobileBottomPage((page) => Math.max(page - 1, 0))
                  }
                  disabled={mobileBottomPage === 0}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-(--primary-color) disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Próximo carrossel 2"
                  onClick={() =>
                    setMobileBottomPage((page) =>
                      Math.min(page + 1, mobileBottomPages - 1),
                    )
                  }
                  disabled={mobileBottomPage >= mobileBottomPages - 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--primary-color) text-white disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {bottomMobileProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
