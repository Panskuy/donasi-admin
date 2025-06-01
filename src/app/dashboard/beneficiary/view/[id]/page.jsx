import prisma from "@/lib/prisma";
import React from "react";
import ComentarPerSumbangan from "@/component/dashboard/sumbangan/ComentarPerSumbangan";
import SectionBlog from "@/component/dashboard/sumbangan/SectionBlog";
import TabelDataDonasi from "@/component/dashboard/sumbangan/TabelDataDonasi";
import Image from "next/image";

const Page = async ({ params }) => {
  const { id } = await params;

  const beneficiary = await prisma.sumbangan.findUnique({
    where: {
      id: id,
    },
    include: {
      comment: {
        include: {
          user: true,
        },
      },
      donasi: {
        include: {
          user: true,
        },
      },

      blog: true,
    },
  });

  if (!beneficiary) {
    return <div className="p-6">Sumbangan tidak ditemukan.</div>;
  }

  return (
    <div className="px-4 ">
      <div className="flex flex-col lg:flex-row gap-2">
        <Image
          src={beneficiary.imageUrl || "https://placehold.co/600x400/png"}
          width={400}
          height={400}
          alt={`image dari ${beneficiary.title}`}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4 first-letter:uppercase">
            {beneficiary.title}
          </h1>
          <div className="text-md">
            <p className="text-gray-700 mb-2">{beneficiary.description}</p>
            <p className=" text-gray-600 mb-1">
              <strong>Kategori:</strong> {beneficiary.kategori}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Lokasi:</strong> {beneficiary.location}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Jumlah Donatur:</strong> {beneficiary.donasi?.length}
            </p>
          </div>
        </div>
      </div>

      <TabelDataDonasi beneficiary={beneficiary} />

      <SectionBlog data={beneficiary} />
      <ComentarPerSumbangan comment={beneficiary.comment} />
    </div>
  );
};

export default Page;
