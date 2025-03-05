/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // Required for Netlify hosting
    },
  };
  
  module.exports = nextConfig;
  