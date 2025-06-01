import React from "react";
import Link from "next/link";

const TabelSumbangan = async ({ users }) => {
  return (
    <div className="overflow-x-auto w-full">
      <div className="shadow-lg rounded-lg border border-gray-200 w-full">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                No
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Nama
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Phone
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span>{item.phone || "belum di set"}</span>
                  </td>

                  <td className="px-6 py-4 flex justify-center">
                    <Link href={`/dashboard/users/${item.id}`}>
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
