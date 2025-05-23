import prisma from "@/lib/prisma";
import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { DonatedDeleteButton } from "./DonatedDeleteButton";

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
    <div className="overflow-x-auto">
      <div className="shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
            <tr>
              <th className="text-left px-6 py-3">No</th>
              <th className="text-left px-6 py-3">Nama Donatur</th>
              <th className="text-left px-6 py-3">Sumbangan</th>
              <th className="text-left px-6 py-3">Kategori</th>
              <th className="text-left px-6 py-3">Lokasi</th>
              <th className="text-left px-6 py-3">Tanggal</th>
              <th className="text-center px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {donated.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.user?.name || "-"}</td>
                <td className="px-6 py-4">{item.sumbangan?.title || "-"}</td>
                <td className="px-6 py-4">{item.sumbangan?.kategori || "-"}</td>
                <td className="px-6 py-4">{item.sumbangan?.location || "-"}</td>
                <td className="px-6 py-4">
                  {format(new Date(item.createdAt), "dd MMM yyyy")}
                </td>
                <td className="text-center space-x-2">
                  <DonatedDeleteButton id={item.id} />
                  <Link href={`/dashboard/donated/view/${item.id}`}>
                    <span className="bg-gray-700 hover:bg-gray-900 text-white  font-medium px-4 py-2  rounded-md cursor-pointer transition duration-200">
                      Lihat Detail
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
            {donated.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
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
