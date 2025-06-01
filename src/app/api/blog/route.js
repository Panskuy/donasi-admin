import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, content, imageUrl, sumbanganId } = body;

    // Validasi input
    if (!title || !content || !sumbanganId) {
      return NextResponse.json(
        { error: "title, content, dan sumbanganId wajib diisi." },
        { status: 400 }
      );
    }

    const sumbangan = await prisma.sumbangan.findUnique({
      where: { id: sumbanganId },
    });

    if (!sumbangan) {
      return NextResponse.json(
        { error: "Sumbangan tidak ditemukan." },
        { status: 404 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        imageUrl,
        sumbangan: {
          connect: { id: sumbanganId },
        },
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("[BLOG_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat blog." },
      { status: 500 }
    );
  }
}
