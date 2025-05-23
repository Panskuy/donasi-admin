import prisma from "@/lib/prisma";
import { Users, HandHeart } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Home() {
  const penerimaDonasi = await prisma.sumbangan.findMany();
  const user = await prisma.user.findMany();

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {/* Kartu Penerima Donasi */}
      <Link
        href="/dashboard/beneficiary"
        className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex justify-between items-center"
      >
        <div>
          <h2 className="text-gray-600 text-sm font-medium group-hover:text-green-600">
            Jumlah Penerima Donasi
          </h2>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {penerimaDonasi.length}
          </p>
        </div>
        <HandHeart
          size={48}
          className="text-green-600 group-hover:scale-105 transition-transform duration-200"
        />
      </Link>

      {/* Kartu Donatur */}
      <Link
        href="/users"
        className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex justify-between items-center"
      >
        <div>
          <h2 className="text-gray-600 text-sm font-medium group-hover:text-blue-600">
            Jumlah Donatur
          </h2>
          <p className="text-3xl font-bold text-gray-900 mt-1">{user.length}</p>
        </div>
        <Users
          size={48}
          className="text-blue-600 group-hover:scale-105 transition-transform duration-200"
        />
      </Link>
    </div>
  );
}
