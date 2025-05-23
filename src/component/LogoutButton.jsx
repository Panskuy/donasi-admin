"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className=" hover:px-2 transition-all hover:text-green-700"
    >
      <LogOut size={20} />
    </button>
  );
};

export default LogoutButton;
