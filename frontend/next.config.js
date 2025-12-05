/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@tanstack/react-query']
  },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar'
  }
};

module.exports = nextConfig;
