import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    await prisma.blog.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "Delete deleted" }, { status: 200 });
}
