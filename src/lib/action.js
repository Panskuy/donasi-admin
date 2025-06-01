"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSumbangan(formData) {
  const data = Object.fromEntries(formData.entries());

  await prisma.sumbangan.create({
    data: {
      title: data.title,
      kategori: data.kategori,
      description: data.description,
      location: data.location,
      imageUrl: data.imageUrl,
    },
  });
  revalidatePath("/");
}

export async function deleteSumbangan(id) {
  if (!id) throw new Error("ID tidak boleh kosong");

  await prisma.sumbangan.delete({
    where: { id },
  });

  revalidatePath("/"); // refresh halaman
}

export async function deleteDonated(id) {
  if (!id) throw new Error("ID tidak boleh kosong");

  await prisma.donasi.delete({
    where: { id },
  });

  revalidatePath("/"); // refresh halaman
}
