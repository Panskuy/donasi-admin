import { getServerSession } from "next-auth";

export const getUserSession = async () => {
  const session = await getServerSession();
  return session?.user;
};
