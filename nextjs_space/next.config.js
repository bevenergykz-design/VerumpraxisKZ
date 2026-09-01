/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  transpilePackages: ['framer-motion', 'lucide-react'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;