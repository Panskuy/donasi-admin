import React from "react";
import Link from "next/link";

const TableUsers = async ({ users }) => {
  console.log(users);

  return (
    <div className="overflow-x-auto w-full">
      <div className="shadow-lg rounded-lg border border-gray-200 w-full">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
            <tr>
              <th className="text-left px-6 py-3">No</th>
              <th className="text-left px-6 py-3">Nama</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Role</th>
              <th className="text-center px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.role}</td>
                <td className="text-center space-x-2  flex items-center justify-center">
                  <Link href={`/dashboard/user/view/${item.id}`}>
                    <span className="bg-gray-700 hover:bg-gray-900 text-white  font-medium px-4 py-2  rounded-md cursor-pointer transition duration-200">
                      Lihat Detail
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
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

export default TableUsers;
