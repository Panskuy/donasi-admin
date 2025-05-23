import DonatedTabel from "@/component/dashboard/donated/DonatedTabel";
import TabelSumbangan from "@/component/dashboard/sumbangan/TabelSumbangan";
import TambahDonasiButton from "@/component/dashboard/sumbangan/TambahDonasiButton";

export default async function Home() {
  return (
    <div className="py-3 w-[1300px] mx-auto ">
      <DonatedTabel />
    </div>
  );
}
