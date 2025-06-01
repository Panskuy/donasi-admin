import Image from "next/image";
import React from "react";
import { ButtonDeleteComment, ButtonLihatDetailComent } from "./Buttons";

const ComentarPerSumbangan = ({ comment }) => {
  return (
    <div className="w-full gap-4 mt-10 ">
      <h1 className="text-2xl font-bold mb-3">Komentar</h1>
      <div className="overflow-auto max-h-96 shadow-lg rounded-xl border border-black/20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {comment.map((item, index) => {
            return (
              <div
                key={index}
                className="p-4 border-b border-gray-200 flex flex-gap-2 items-center hover:bg-gray-100 group"
              >
                <Image
                  src={item.user.image}
                  alt="User Image"
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h1 className="group-hover:text-blue-900">
                      {item.user.name}.
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                      <ButtonLihatDetailComent comment={item.content} />
                      <ButtonDeleteComment id={item.id} />
                    </div>
                  </div>
                  <h1 className="line-clamp-2">{item.content}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComentarPerSumbangan;
