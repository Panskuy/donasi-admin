import { ButtonDeleteComment } from "@/component/dashboard/sumbangan/Buttons";
import { HistoryCommentUser } from "@/component/dashboard/users/HistoryCommentUser";
import HistoryDonatedUser from "@/component/dashboard/users/HistoryDonatedUser";
import prisma from "@/lib/prisma";
import Image from "next/image";
import React from "react";

const Page = async ({ params }) => {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      donasi: true,
      comment: true,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="">
      <div className="w-full max-w-7xl mx-auto flex gap-2 ">
        <Image
          src={user.image}
          width={100}
          height={100}
          alt={`user image ${user.name}`}
          className="object-cover rounded-lg"
        />
        <div className="">
          <h1>
            nama : <span>{user.name}</span>
          </h1>
          <h1>
            email : <span>{user.email}</span>
          </h1>
          <h1>no telpon :{user.phone || "belum diisi"}</h1>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-xl ">History Comment</h1>
        {user.comment.length > 0 ? (
          <HistoryCommentUser comment={user.comment} />
        ) : (
          "user belum comment apapun"
        )}
      </div>

      <div>
        <HistoryDonatedUser data={user.donasi} />
      </div>
    </div>
  );
};

export default Page;
