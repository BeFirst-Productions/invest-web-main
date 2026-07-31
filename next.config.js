/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [75, 85, 90, 100],
  },
};

module.exports = nextConfig;