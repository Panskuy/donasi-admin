import React from "react";

const layout = ({ children }) => {
  return (
    <div className="h-screen flex items-center justify-center w-full bg-black">
      <div className="w-full max-w-3xl ">{children}</div>
    </div>
  );
};

export default layout;
