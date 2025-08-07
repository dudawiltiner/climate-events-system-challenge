/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Configuração para evitar problemas de hidratação
  reactStrictMode: false,
  // Configuração para usar a pasta src
  distDir: ".next",
  // Configuração para evitar warnings de hidratação
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Configuração para resolver problemas do date-fns
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Ignorar avisos específicos
    config.ignoreWarnings = [
      /Using `export \* from '\.\.\.'` in a page is disallowed/,
      /Critical dependency/,
    ];

    return config;
  },
};

export default nextConfig;
