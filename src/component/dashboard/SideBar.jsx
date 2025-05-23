import Link from "next/link";
import React from "react";
import AdminDetail from "../AdminDetail";
import { ArrowRightToLine } from "lucide-react";

const SideBar = () => {
  const SideBarLink = [
    {
      path: "/dashboard",
      title: "home",
    },
    {
      path: "/dashboard/donated",
      title: "donated",
    },
    {
      path: "/dashboard/beneficiary",
      title: "beneficiary",
    },
  ];

  return (
    <div className="w-1/6 border-r border-black/20 p-4 ">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <Link href={"/dashboard/settings"}>
        <AdminDetail />
      </Link>
      <ul className="mt-3 w-full space-y-4 ">
        {SideBarLink.map((link, index) => {
          return (
            <Link
              href={link.path}
              key={index}
              className="w-full bg-black/5 hover:text-white hover:bg-black flex p-3 text-black rounded-lg justify-between group transition-all"
            >
              <span className=" first-letter:uppercase ">{link.title}</span>
              <ArrowRightToLine className="hidden group-hover:block transition-all" />
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
