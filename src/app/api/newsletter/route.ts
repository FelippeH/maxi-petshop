import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json(
      { message: "DATABASE_URL não configurada" },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ message: "E-mail inválido" }, { status: 400 });
    }

    if (email.length > 150) {
      return NextResponse.json(
        { message: "E-mail muito longo (máximo de 150 caracteres)" },
        { status: 400 },
      );
    }

    const exists = await prisma.newsletter.findFirst({
      where: { email },
      select: { id: true },
    });

    if (exists) {
      return NextResponse.json(
        { message: "Este e-mail já está cadastrado na newsletter" },
        { status: 409 },
      );
    }

    await prisma.newsletter.create({
      data: {
        email,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar newsletter:", error);
    return NextResponse.json(
      { message: "Erro ao cadastrar e-mail na newsletter" },
      { status: 500 },
    );
  }
}
