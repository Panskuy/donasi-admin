import React from "react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

const Page = async ({ params }) => {
  const { id } = params;

  const viewDonated = await prisma.donasi.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });

  if (!viewDonated) {
    return (
      <div className="p-6 text-center text-gray-500">
        Data donasi tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 ">
      <h1 className="text-3xl font-bold text-gray-800">Detail Donasi</h1>

      {/* Donatur */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:bg-black/95 hover:border-black group transition-all">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 group-hover:text-gray-100">
          Informasi Donatur
        </h2>
        <div className="group-hover:text-gray-300 space-y-2">
          <p>
            <span className="font-medium">Nama:</span> {viewDonated.user.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {viewDonated.user.email}
          </p>
        </div>
      </div>

      {/* Item Donasi */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:bg-black/95 hover:border-black group transition-all">
        <h2 className="text-lg font-semibold group-hover:text-gray-100 mb-4">
          Item Donasi
        </h2>
        {viewDonated.item && viewDonated.item.length > 0 ? (
          <ul className="list-disc list-inside group-hover:text-gray-300 space-y-1">
            {viewDonated.item.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Tidak ada item yang disumbangkan.</p>
        )}
      </div>

      {/* Info Tambahan */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:bg-black/95 hover:border-black group transition-all">
        <h2 className="text-lg font-semibold group-hover:text-gray-100 mb-4">
          Informasi Tambahan
        </h2>
        <div className="group-hover:text-gray-300 space-y-2 ">
          <p>
            <span className="font-medium">ID Donasi:</span> {viewDonated.id}
          </p>
          <p>
            <span className="font-medium">ID Sumbangan:</span>{" "}
            {viewDonated.sumbanganId}
          </p>
          <p>
            <span className="font-medium">Tanggal Dibuat:</span>{" "}
            {format(new Date(viewDonated.createdAt), "dd MMM yyyy, HH:mm")}
          </p>
          <p>
            <span className="font-medium">Terakhir Diperbarui:</span>{" "}
            {format(new Date(viewDonated.updatedAt), "dd MMM yyyy, HH:mm")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
