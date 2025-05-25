import Link from "next/link";
import React from "react";
import AdminDetail from "../AdminDetail";
import { ArrowRightToLine, House, LayoutDashboard } from "lucide-react";

const SideBar = () => {
  const SideBarLink = [
    {
      path: "/dashboard",
      title: "home",
      icon: <House />,
    },
    {
      path: "/dashboard/donated",
      title: "donated",
    },
    {
      path: "/dashboard/beneficiary",
      title: "beneficiary",
    },
    {
      path: "/dashboard/users",
      title: "Users",
    },
  ];

  return (
    <div className="w-1/6 border-r border-black/20  px-1 lg:px-4 py-4 ">
      <Link href={"/dashboard"}>
        <h1 className="font-bold text-3xl hidden lg:flex justify-center lg:justify-start">
          Dashboard
        </h1>
        <h1 className="font-bold text-3xl flex lg:hidden justify-center">
          <LayoutDashboard size={35} />
        </h1>
      </Link>
      <Link href={"/dashboard/settings"}>
        <AdminDetail />
      </Link>
      <ul className="mt-3 w-full space-y-4 ">
        {SideBarLink.map((link, index) => {
          return (
            <Link
              href={link.path}
              key={index}
              className="w-full bg-black/5 hover:text-white hover:bg-black flex p-3 text-black rounded-lg justify-center lg:justify-between group transition-all"
            >
              <div>
                <span className=" first-letter:uppercase hidden lg:block">
                  {link.title}
                </span>
                <span className=" first-letter:uppercase block lg:hidden">
                  {link.icon}
                </span>
              </div>
              <div className="hidden lg:block">
                <ArrowRightToLine className="hidden group-hover:block transition-all" />
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
