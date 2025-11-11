/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  transpilePackages: [
    "@reown/appkit",
    "@reown/appkit-adapter-wagmi",
    "@tanstack/react-query",
    "wagmi",
    "viem",
  ],
  generateBuildId: async () => {
    return "build-" + Date.now();
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    config.externals = config.externals || [];
    config.externals.push("pino-pretty", "lokijs", "encoding");

    return config;
  },

  images: {
    domains: [
      "hexydog.com",
      "firebasestorage.googleapis.com",
      "avatars.githubusercontent.com",
    ],
    formats: ["image/webp", "image/avif"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },

  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
