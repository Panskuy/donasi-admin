import { getServerSession } from "next-auth";
import React from "react";
import LogoutButton from "./LogoutButton";

const AdminDetail = async () => {
  const user = await getServerSession();
  if (!user) {
    return null;
  }

  return (
    <div className="p-2 border flex justify-between items-center border-green-800/60 bg-green-100 rounded-lg mt-2">
      <div className="flex flex-col text-sm">
        <h1 className="font-bold">{user.user?.name}</h1>
        <h1>{user.user?.email}</h1>
      </div>

      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default AdminDetail;
