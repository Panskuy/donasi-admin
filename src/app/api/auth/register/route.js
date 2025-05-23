import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse JSON body request
    const { email, password, name } = await req.json();

    // Validasi input
    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({ error: "Email, password, dan nama harus diisi." }),
        { status: 400 }
      );
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Format email tidak valid." }),
        { status: 400 }
      );
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Data yang akan dimasukkan ke dalam database
    const data = { email, password: hashedPassword, name };

    // Menyimpan data user ke dalam database
    const user = await prisma.user.create({
      data,
    });

    // Mengirimkan response yang berisi data user yang baru dibuat
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error saat membuat user:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan pada server." }),
      { status: 500 }
    );
  }
}
