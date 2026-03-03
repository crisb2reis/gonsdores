import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Necessário para GitHub Pages
  basePath: '/gonsdores', // Nome do seu repositório
  assetPrefix: '/gonsdores/',
  images: {
    unoptimized: true, // GitHub Pages não suporta otimização de imagem nativa do Next.js
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      }
    ],
  },
};

export default nextConfig;
