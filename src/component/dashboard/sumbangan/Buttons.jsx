"use client";

import { useState, useTransition } from "react";
import { deleteSumbangan } from "@/lib/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, Trash, X } from "lucide-react";

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

const STATUS_OPTIONS = [
  "menunggu konfirmasi",
  "dalam persiapan",
  "sedang dikirim",
  "sampai tujuan",
  "selesai",
  "dibatalkan",
];

export const SumbanganStatusChangeButton = ({ id, newStatus }) => {
  const router = useRouter();
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/sumbangan/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_pengiriman: newStatus }),
      });

      if (!res.ok) throw new toast.error("Gagal mengubah status");
      toast.success("Status berhasil diubah");
      router.refresh();
    } catch (error) {
      console.error("Gagal update status:", error);
      toast.error("Terjadi kesalahan saat memperbarui status.");
    }
  };

  return (
    <select
      value={newStatus || ""}
      onChange={(e) => handleStatusChange(id, e.target.value)}
      className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
    >
      <option value="" disabled>
        Pilih Status
      </option>
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export const SumbanganIsShowChangeButton = ({ id, NewIsShow }) => {
  const router = useRouter();

  const handleiSShowChange = async (id, newIsShowValue) => {
    const isShowBool = newIsShowValue === "true";

    try {
      const res = await fetch(`/api/sumbangan/${id}/isshow`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isShow: isShowBool }),
      });

      if (!res.ok) throw new Error("Gagal mengubah status");
      toast.success("Status Tampil berhasil diubah");
      router.refresh();
    } catch (error) {
      console.error("Gagal update status:", error);
      toast.error("Terjadi kesalahan saat memperbarui status.");
    }
  };

  return (
    <select
      value={NewIsShow !== undefined ? String(NewIsShow) : ""}
      onChange={(e) => handleiSShowChange(id, e.target.value)}
      className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
    >
      <option value="" disabled>
        Pilih Status
      </option>
      <option value="true">Tampilkan</option>
      <option value="false">Jangan Tampilkan</option>
    </select>
  );
};

export const ButtonLihatDetailComent = ({ comment }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-fit mt-1">
      <button
        onClick={() => setShow(true)}
        className="w-fit p-1 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
      >
        <Eye />
      </button>

      {show && (
        <div
          onClick={() => setShow(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <div className="w-full max-w-xl mx-4 bg-white p-4 rounded-lg shadow-lg relative">
            <div className="flex justify-end">
              <button onClick={() => setShow(false)}>
                <X />
              </button>
            </div>
            <h1 className="text-justify text-base text-gray-800">{comment}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export const ButtonDeleteComment = ({ id }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/comment/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus komentar");
      }

      toast.success("Berhasil menghapus komentar");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus komentar");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="hover:bg-red-600 px-2 py-2 rounded-lg transition-all hover:text-white"
    >
      <Trash width={20} height={20} />
    </button>
  );
};

export const BlogDeleteButton = ({ id }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal Menghapus Blog");
      }
      router.refresh();
      toast.success("Berhasil menghapus Blog");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus Blog");
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="text-red-600 p-2 hover:bg-red-600 hover:text-white transition-all rounded-lg"
    >
      <Trash width={20} height={20} />
    </button>
  );
};
