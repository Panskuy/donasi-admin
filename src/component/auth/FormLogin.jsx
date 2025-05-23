"use client";

import { EyeClosed, LucideEye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error("Login gagal! Periksa email dan password Anda.");
    } else {
      toast.success("Berhasil login!");
      router.push("/");
    }

    setIsLoading(false);
  };

  return (
    <div className=" w-full bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Logo</h1>
        <p className="text-sm text-gray-500">Login Menggunakan Akun Admin</p>
      </div>

      <div className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="button"
            onClick={handleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            {showPassword ? <EyeClosed size={18} /> : <LucideEye size={18} />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors duration-200 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default FormLogin;
