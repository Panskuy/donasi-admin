"use client";

import React, { useState } from "react";
import { X } from "lucide-react"; // pastikan sudah install lucide-react
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ButtonsBuatBlog = ({ sumbanganId }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, imageUrl, sumbanganId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal membuat blog.");
      } else {
        toast.success("berhasil membuat blog");
        setTitle("");
        setContent("");
        setImageUrl("");
        setShowForm(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Buat Blog
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4">Buat Blog Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Judul</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Konten</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Image URL (opsional)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {loading ? "Menyimpan..." : "Simpan Blog"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonsBuatBlog;
