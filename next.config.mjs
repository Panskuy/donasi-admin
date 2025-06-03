/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "placehold.co",
      },
      {
        hostname: "kapilerindonesia.com",
      },
      {
        hostname: "i.pinimg.com",
      },
      {
        hostname: "id.pinterest.com",
      },
    ],
  },
};

export default nextConfig;
