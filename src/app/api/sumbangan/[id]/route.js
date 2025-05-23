import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const response = await prisma.sumbangan.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Berhasil menghapus", data: response });
  } catch (error) {
    console.error("Error deleting sumbangan:", error);
    return NextResponse.json(
      { error: "Gagal menghapus sumbangan" },
      { status: 500 }
    );
  }
}
