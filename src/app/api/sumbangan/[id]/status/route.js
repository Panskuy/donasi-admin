import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  const { id } = await params;
  const { status_pengiriman } = await req.json();

  try {
    // Update status di tabel Sumbangan
    await prisma.sumbangan.update({
      where: { id },
      data: { status_pengiriman },
    });

    // Sinkronkan juga ke Donasi
    await prisma.donasi.updateMany({
      where: { sumbanganId: id },
      data: { status_pengiriman },
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
