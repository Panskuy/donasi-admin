import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    await prisma.comment.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
}
