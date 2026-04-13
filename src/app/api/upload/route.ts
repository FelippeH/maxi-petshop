import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { message: "Arquivo inválido. Campo esperado: image" },
        { status: 400 },
      );
    }

    const bytes = Buffer.from(await image.arrayBuffer());
    const extension =
      path.extname(image.name).toLowerCase() ||
      `.${(image.type.split("/")[1] || "bin").toLowerCase()}`;
    const fileName = `${Date.now()}-${randomUUID()}${extension}`;
    const uploadDirectory = path.join(process.cwd(), "public", "uploads");
    const destination = path.join(uploadDirectory, fileName);

    await mkdir(uploadDirectory, { recursive: true });
    await writeFile(destination, bytes);

    return NextResponse.json({ url: `/uploads/${fileName}` }, { status: 201 });
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    return NextResponse.json(
      { message: "Erro ao fazer upload da imagem" },
      { status: 500 },
    );
  }
}
