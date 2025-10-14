import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;

// https://lh3.googleusercontent.com/a/ACg8ocKaAUvBOObWRUShPre0KdZHT6lIw8m-7tbsUwd1K78Vn1WtW2VTcQ=s96-c
