"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FormRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (res.status === 400) {
        toast.error(data.error || "Email sudah terdaftar.");
      } else if (res.status === 500) {
        toast.error("Terjadi kesalahan pada server.");
      } else {
        toast.success("Registrasi berhasil, silakan login.");
        router.push("/auth/signin");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Logo</h1>
        <p className="text-sm text-gray-500">Registrasi Pengguna Baru</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors duration-200 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default FormRegister;
