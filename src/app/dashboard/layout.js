import SideBar from "@/component/dashboard/SideBar";
import { Sidebar } from "lucide-react";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex w-full  max-w-[2000px] mx-auto gap-2 h-screen">
      <SideBar />
      <div className="w-full h-screen overflow-auto">
        <div className="mt-6 pr-2">{children}</div>
      </div>
    </div>
  );
};

export default layout;
