/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Menerima semua domain
      },
      {
        protocol: 'http',
        hostname: '**', // Menerima semua domain HTTP
      },
    ],
  },
};

export default nextConfig;
