// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Agrega aquí los dominios de imágenes externas que uses
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Agrega más dominios según necesites
    ],
  },
  // Optimizaciones para producción
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
