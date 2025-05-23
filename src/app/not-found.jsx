import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6 text-center">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        Kembali ke Beranda
      </Link>
    </main>
  );
}
