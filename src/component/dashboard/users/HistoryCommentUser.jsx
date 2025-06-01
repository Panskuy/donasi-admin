import React from "react";
import { ButtonDeleteComment } from "../sumbangan/Buttons";

export const HistoryCommentUser = ({ comment }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {comment.map((item) => {
        return (
          <div
            key={item.id}
            className="p-4 border border-black rounded-lg flex justify-between items-center"
          >
            <h1>{item.content}</h1>
            <ButtonDeleteComment id={item.id} />
          </div>
        );
      })}
    </div>
  );
};
