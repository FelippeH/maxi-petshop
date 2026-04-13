import { prisma } from "@/lib/prisma";

type RawBlogPost = {
  id: number;
  title: string | null;
  content: string | null;
  slug: string | null;
  createdAt: Date | null;
  cover: string | null;
};

export type BlogPost = {
  id: number;
  title: string;
  content: string;
  slug: string;
  createdAt: Date | null;
  cover: string;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeSlug(value: string) {
  const cleanedValue = value.replace(/^\/+|\/+$/g, "").replace(/^blog\//i, "");
  return slugify(cleanedValue);
}

function formatBlogPost(post: RawBlogPost): BlogPost | null {
  const title = post.title?.trim();
  const content = post.content?.trim();
  const cover = post.cover?.trim();
  const slugCandidate = post.slug?.trim() || title || "";
  const slug = normalizeSlug(slugCandidate);

  if (!title || !content || !cover || !slug) {
    return null;
  }

  return {
    id: post.id,
    title,
    content,
    slug,
    createdAt: post.createdAt,
    cover,
  };
}

async function getRawPosts() {
  if (!prisma) {
    return [] as RawBlogPost[];
  }

  try {
    return await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        createdAt: true,
        cover: true,
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });
  } catch {
    return [] as RawBlogPost[];
  }
}

export async function getBlogPosts() {
  const rawPosts = await getRawPosts();
  return rawPosts
    .map(formatBlogPost)
    .filter((post): post is BlogPost => post !== null);
}

export async function getBlogPostBySlug(slugParam: string) {
  const normalizedParam = normalizeSlug(slugParam);
  const posts = await getBlogPosts();

  return posts.find((post) => post.slug === normalizedParam) ?? null;
}

export async function getBlogPostById(id: number) {
  if (!Number.isFinite(id) || id <= 0) {
    return null;
  }

  const posts = await getBlogPosts();
  return posts.find((post) => post.id === id) ?? null;
}
