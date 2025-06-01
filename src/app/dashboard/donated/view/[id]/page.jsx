import React from "react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { DonatedDeleteButton } from "@/component/dashboard/donated/DonatedDeleteButton";
import { redirect } from "next/navigation";

const statusColorMap = {
  "menunggu konfirmasi": "bg-yellow-100 text-yellow-800",
  "dalam persiapan": "bg-blue-100 text-blue-800",
  "sedang dikirim": "bg-purple-100 text-purple-800",
  "sampai tujuan": "bg-green-100 text-green-800",
  selesai: "bg-gray-100 text-gray-800",
  dibatalkan: "bg-red-100 text-red-800",
};

const Page = async ({ params }) => {
  const { id } = await params;

  const viewDonated = await prisma.donasi.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      sumbangan: true,
    },
  });

  if (!viewDonated) {
    return redirect("/dashboard/donated");
  }

  const status = viewDonated?.sumbangan?.status_pengiriman || "Tidak tersedia";
  const badgeClass =
    statusColorMap[status.toLowerCase()] || "bg-gray-100 text-gray-600";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Detail Donasi</h1>
        <DonatedDeleteButton id={viewDonated.id} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 group hover:bg-black/95 hover:border-black transition-all">
        <h2 className="text-lg font-semibold text-gray-700 group-hover:text-gray-100 mb-4">
          Informasi Donatur
        </h2>
        <div className="space-y-2 group-hover:text-gray-300">
          <p>
            <span className="font-medium">Nama:</span>{" "}
            {viewDonated.user?.name || "-"}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {viewDonated.user?.email || "-"}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 group hover:bg-black/95 hover:border-black transition-all">
        <h2 className="text-lg font-semibold group-hover:text-gray-100 mb-4">
          Item Donasi
        </h2>
        {viewDonated.item && viewDonated.item.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 group-hover:text-gray-300">
            {viewDonated.item.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Tidak ada item yang disumbangkan.</p>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 group hover:bg-black/95 hover:border-black transition-all">
        <h2 className="text-lg font-semibold group-hover:text-gray-100 mb-4">
          Informasi Tambahan
        </h2>
        <div className="space-y-2 group-hover:text-gray-300">
          <p>
            <span className="font-medium">ID Donasi:</span> {viewDonated.id}
          </p>
          <p>
            <span className="font-medium">ID Sumbangan:</span>{" "}
            {viewDonated.sumbanganId || "-"}
          </p>
          <p>
            <span className="font-medium">Tanggal Dibuat:</span>{" "}
            {format(new Date(viewDonated.createdAt), "dd MMM yyyy, HH:mm")}
          </p>
          <p>
            <span className="font-medium">Terakhir Diperbarui:</span>{" "}
            {format(new Date(viewDonated.updatedAt), "dd MMM yyyy, HH:mm")}
          </p>
          <p>
            <span className="font-medium">Status Pengiriman:</span>{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
            >
              {status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
