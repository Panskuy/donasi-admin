"use client";

import React from "react";
import Link from "next/link";
import {
  SumbanganDeleteButton,
  SumbanganIsShowChangeButton,
  SumbanganStatusChangeButton,
} from "./Buttons";

import { useRouter } from "next/navigation";

const TabelSumbangan = ({ sumbangan }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto w-full">
      <div className="w-full border border-gray-200 rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3 text-left">No</th>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Kategori</th>
              <th className="px-6 py-3 text-left">Lokasi</th>
              <th className="px-6 py-3 text-left">Tampilkan ke User</th>
              <th className="px-6 py-3 text-left">Status Pengiriman</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sumbangan.length > 0 ? (
              sumbangan.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.kategori}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    <SumbanganIsShowChangeButton
                      id={item.id}
                      NewIsShow={item.isShow}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    <SumbanganStatusChangeButton
                      id={item.id}
                      newStatus={item.status_pengiriman}
                    />
                  </td>
                  <td className="px-6 py-4 flex justify-center items-center gap-2">
                    <SumbanganDeleteButton title={item.title} id={item.id} />
                    <Link href={`/dashboard/beneficiary/view/${item.id}`}>
                      <span className="inline-block bg-gray-700 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-md cursor-pointer transition duration-200">
                        Lihat Detail
                      </span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Belum ada data sumbangan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelSumbangan;
