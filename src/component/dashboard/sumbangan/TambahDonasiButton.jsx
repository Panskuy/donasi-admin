"use client";

import { useState } from "react";
import { createSumbangan } from "@/lib/action";
import toast from "react-hot-toast";

const TambahDonasiButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createSumbangan(formData);
      toast.success("Donasi berhasil ditambahkan!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan donasi");
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-5 py-2 rounded-md transition duration-200"
      >
        + Tambah Donasi
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg mx-4 rounded-xl shadow-lg p-6 relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tambah Donasi
            </h2>
            <form
              action={(formData) => {
                handleSubmit(formData);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Judul
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="Contoh: Bantuan Sembako"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Kategori
                </label>
                <select
                  name="kategori"
                  type="text"
                  placeholder="Makanan, Pakaian, Uang, dll"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                >
                  <option value="panti asuhan">Panti Asuhan</option>
                  <option value="bencana banjir">Bencana Banjir</option>
                  <option value="fakir miskin">Fakir Miskin</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  placeholder="Deskripsi singkat tentang donasi"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Lokasi
                </label>
                <input
                  name="location"
                  type="text"
                  placeholder="Contoh: Jakarta Selatan"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Image Url
                </label>
                <input
                  name="imageUrl"
                  type="text"
                  placeholder="https:imageurl"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
              </div>

              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-5 py-2 text-sm rounded-md text-white ${
                    loading
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-900"
                  } transition`}
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TambahDonasiButton;
