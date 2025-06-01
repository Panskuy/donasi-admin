import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HistoryDonatedUser = ({ data }) => {
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-2">Riwayat Donasi</h1>
      <div className="flex flex-col space-y-4">
        {data.map((item, index) => {
          return (
            <div key={item.id}>
              <div className="flex p-2 items-center justify-between border border-black rounded-lg">
                <h1>{index + 1}</h1>
                <div className="flex gap-2">
                  <h1>id: {item.id}</h1>
                </div>

                <Link
                  href={`/dashboard/donated/view/${item.id}`}
                  className="flex gap-2 items-center"
                >
                  Lihat Detail <ArrowRight />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryDonatedUser;
