import React from "react";
import ButtonsBuatBlog from "./ButtonsBuatBlog";
import { BlogDeleteButton } from "./Buttons";

const SectionBlog = ({ data }) => {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl mb-3">Blog</h1>
        <ButtonsBuatBlog sumbanganId={data.id} />
      </div>
      <div className=" w-full gap-2  overflow-auto border border-black/20 rounded-lg shadow-lg p-4">
        {data.blog.length > 0 ? (
          <div className="grid grid-cols-3 h-full max-h-96">
            {data.blog.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-white border-b border-black/20 px-4 py-2 hover:bg-gray-100 transition-all rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="font-bold text-lg first-letter:uppercase">
                      {item.title}
                    </h1>
                    <BlogDeleteButton id={item.id} />
                  </div>
                  <h1 className="line-clamp-2">{item.content}</h1>
                </div>
              );
            })}
          </div>
        ) : (
          "tidak ada data"
        )}
      </div>
    </div>
  );
};

export default SectionBlog;
