import prisma from "@/lib/prisma";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";

const Page = async ({ params }) => {
  const { id } = await params;

  const beneficiary = await prisma.sumbangan.findUnique({
    where: {
      id: id,
    },
    include: {
      donasi: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!beneficiary) {
    return <div className="p-6">Sumbangan tidak ditemukan.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{beneficiary.title}</h1>
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

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Daftar Donasi</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">#</th>

                <th className="border px-4 py-2 text-left">User ID</th>
                <th className="border px-4 py-2 text-left">Jumlah Item</th>
                <th className="border px-4 py-2 text-left">Tanggal Donasi</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {beneficiary.donasi.map((donation, idx) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{idx + 1}</td>

                  <td className="border px-4 py-2">{donation.user.name}</td>
                  <td className="border px-4 py-2">
                    {donation.item?.length || 0}
                  </td>
                  <td className="border px-4 py-2">
                    {format(new Date(donation.createdAt), "dd MMM yyyy")}
                  </td>
                  <td className="border px-4 py-2">
                    <Link href={`/donated/view/${donation.id}`}>
                      Lihat Detail
                    </Link>
                  </td>
                </tr>
              ))}
              {beneficiary.donasi.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-500 py-4 border"
                  >
                    Belum ada donasi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
