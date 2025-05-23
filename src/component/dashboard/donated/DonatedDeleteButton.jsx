"use client";

import { useTransition } from "react";
import { deleteDonated } from "@/lib/action";
import toast from "react-hot-toast";

export const DonatedDeleteButton = ({ id }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    toast(
      (t) => (
        <div className="p-4">
          <p className="text-lg mb-2">Yakin ingin menghapus data ini?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                startTransition(async () => {
                  try {
                    await deleteDonated(id);
                    toast.success("Berhasil dihapus!");
                  } catch (err) {
                    console.error(err);
                    toast.error("Gagal menghapus");
                  }
                });
              }}
              className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000, // toast akan hilang dalam 10 detik jika tidak direspons
      }
    );
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-4 py-2 rounded-lg bg-red-600 text-white disabled:opacity-50"
    >
      {isPending ? "Menghapus..." : "Delete"}
    </button>
  );
};
