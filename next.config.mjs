/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // keeps fast loading from local public directory without external sharp issues
  },
};

export default nextConfig;
