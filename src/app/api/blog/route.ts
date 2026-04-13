import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function GET() {
  if (!prisma) {
    return NextResponse.json([]);
  }

  try {
    const posts = await prisma.blog.findMany({
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Erro ao listar posts:", error);
    return NextResponse.json(
      { message: "Erro ao listar posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json(
      { message: "DATABASE_URL não configurada" },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as {
      title?: string;
      content?: string;
      cover?: string;
    };

    const title = body.title?.trim();
    const content = body.content?.trim();
    const cover = body.cover?.trim();

    if (!title || !content || !cover) {
      return NextResponse.json(
        { message: "title, content e cover são obrigatórios" },
        { status: 400 },
      );
    }

    const createdPost = await prisma.blog.create({
      data: {
        title,
        content,
        cover,
        slug: slugify(title),
        createdAt: new Date(),
      },
    });

    return NextResponse.json(createdPost, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json(
      { message: "Erro ao criar post" },
      { status: 500 },
    );
  }
}
