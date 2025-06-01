import React from "react";

import { format } from "date-fns";
import Link from "next/link";

const TabelDataDonasi = ({ beneficiary }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Daftar Donasi</h2>
      <div className="overflow-x-auto max-h-80">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">#</th>

              <th className="border px-4 py-2 text-left">User ID</th>
              <th className="border px-4 py-2 text-left">Jumlah Item</th>
              <th className="border px-4 py-2 text-left">Status Pengiriman</th>
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
                  {donation.item?.length || 0}
                </td>
                <td className="border px-4 py-2">
                  {format(new Date(donation.createdAt), "dd MMM yyyy")}
                </td>
                <td className="border px-4 py-2">
                  <Link href={`/dashboard/donated/view/${donation.id}`}>
                    Lihat Detail
                  </Link>
                </td>
              </tr>
            ))}
            {beneficiary.donasi.length === 0 && (
              <tr>
                <td
                  colSpan={6}
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
  );
};

export default TabelDataDonasi;
