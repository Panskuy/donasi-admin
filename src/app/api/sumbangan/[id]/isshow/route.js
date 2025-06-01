import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  const { id } = await params;
  const { isShow } = await req.json();

  try {
    await prisma.sumbangan.update({
      where: { id },
      data: { isShow },
    });

    return NextResponse.json({ message: "Status updated successfully." });
  } catch (error) {
    console.error("Update status error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui status" },
      { status: 500 }
    );
  }
}
