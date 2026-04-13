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

function parseId(idParam: string) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!prisma) {
    return NextResponse.json(
      { message: "DATABASE_URL não configurada" },
      { status: 500 },
    );
  }

  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (!id) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  const post = await prisma.blog.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ message: "Post não encontrado" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!prisma) {
    return NextResponse.json(
      { message: "DATABASE_URL não configurada" },
      { status: 500 },
    );
  }

  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (!id) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

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

  try {
    const updatedPost = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        cover,
        slug: slugify(title),
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar post" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!prisma) {
    return NextResponse.json(
      { message: "DATABASE_URL não configurada" },
      { status: 500 },
    );
  }

  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (!id) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  try {
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir post:", error);
    return NextResponse.json(
      { message: "Erro ao excluir post" },
      { status: 500 },
    );
  }
}
