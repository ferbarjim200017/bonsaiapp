/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  // Optimización de imports
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
