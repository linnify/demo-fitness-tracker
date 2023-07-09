/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  swcMinify: true,
  output: 'standalone'
};

module.exports = nextConfig;
