import TableUsers from "@/component/dashboard/users/TabelUsers";
import prisma from "@/lib/prisma";
import React from "react";

const page = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: "user",
    },
  });
  return (
    <div>
      <TableUsers users={users} />
    </div>
  );
};

export default page;
