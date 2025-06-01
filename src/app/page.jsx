import { getUserSession } from "@/lib/auth-libs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUserSession();

  if (user) {
    redirect("/dashboard");
  }

  return <div className="h-screen flex items-center justify-center">page</div>;
};

export default page;
