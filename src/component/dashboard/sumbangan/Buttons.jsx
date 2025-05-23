"use client";

import { useTransition } from "react";
import { deleteSumbangan } from "@/lib/action";
import toast from "react-hot-toast";

export const SumbanganDeleteButton = ({ id, title }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    toast.custom((t) => (
      <div className="bg-white border border-gray-200 rounded-md shadow-md p-4 w-full max-w-sm text-sm">
        <p className="mb-4 text-gray-800">
          Yakin ingin menghapus <span className="font-semibold">"{title}"</span>
          ?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition text-sm"
          >
            Batal
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              startTransition(async () => {
                try {
                  await deleteSumbangan(id);
                  toast.success(`Berhasil menghapus "${title}"`);
                } catch (err) {
                  toast.error("Gagal menghapus");
                  console.error(err);
                }
              });
            }}
            className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition text-sm"
          >
            Hapus
          </button>
        </div>
      </div>
    ));
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition"
    >
      {isPending ? "Menghapus..." : "Delete"}
    </button>
  );
};
