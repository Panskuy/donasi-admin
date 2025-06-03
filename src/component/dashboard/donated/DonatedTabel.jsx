import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import prisma from "@/lib/prisma";
import { DonatedDeleteButton } from "./DonatedDeleteButton";

const statusColorMap = {
  "menunggu konfirmasi": "bg-black text-white",
  "dalam persiapan": "bg-black/80 text-white",
  "sedang dikirim": "bg-black/60 text-white",
  "sampai tujuan": "bg-green-100 text-green-800",
  selesai: "bg-green-100 text-green-800",
  dibatalkan: "bg-red-100 text-red-800",
};

const DonatedTabel = async () => {
  const donated = await prisma.donasi.findMany({
    include: {
      user: true,
      sumbangan: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="overflow-x-auto w-full">
      <div className="w-full border border-gray-200 rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                No
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Nama Donatur
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Sumbangan
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Kategori
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Lokasi
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Tanggal
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Status Pengiriman
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Alamat Penjemputan
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {donated.length > 0 ? (
              donated.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.user?.name || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.sumbangan?.title || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.sumbangan?.kategori || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.sumbangan?.location || "belum diisi"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(item.createdAt), "dd MMM yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColorMap[item.sumbangan?.status_pengiriman] ||
                        "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.sumbangan?.status_pengiriman || "Tidak ada"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.user?.address || "-"}
                  </td>
                  <td className="px-6 py-4 flex justify-center items-center gap-2">
                    <DonatedDeleteButton id={item.id} />
                    <Link href={`/dashboard/donated/view/${item.id}`}>
                      <span className="inline-block bg-gray-700 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-md cursor-pointer transition duration-200">
                        Lihat Detail
                      </span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  Belum ada data donasi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonatedTabel;
