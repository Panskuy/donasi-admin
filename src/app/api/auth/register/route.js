import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({ error: "Email, password, dan nama harus diisi." }),
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Format email tidak valid." }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = { email, password: hashedPassword, name };

    const user = await prisma.user.create({
      data,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error saat membuat user:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan pada server." }),
      { status: 500 }
    );
  }
}
