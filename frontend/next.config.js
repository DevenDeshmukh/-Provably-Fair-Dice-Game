/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Fixes next export issue
    images: {
      unoptimized: true, // Required if using images in export mode
    },
    reactStrictMode: true,
  };
  
  module.exports = nextConfig;
  