import TabelSumbangan from "@/component/dashboard/sumbangan/TabelSumbangan";
import TambahDonasiButton from "@/component/dashboard/sumbangan/TambahDonasiButton";
import prisma from "@/lib/prisma";

export default async function Home() {
  const sumbangan = await prisma.sumbangan.findMany({
    include: {
      donasi: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="py-3  mx-auto ">
      <div className="flex justify-end">
        <TambahDonasiButton />
      </div>
      <TabelSumbangan sumbangan={sumbangan} />
    </div>
  );
}
