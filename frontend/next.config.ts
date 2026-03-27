import type { NextConfig } from "next";

function getBasePath(): string {
  if (process.env.BASE_PATH !== undefined) {
    return process.env.BASE_PATH.trim();
  }
  return process.env.NODE_ENV === "production" ? "/template" : "";
}

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: getBasePath(),
  async rewrites() {
    const host = process.env.BACKEND_HOST?.trim();
    const port = process.env.BACKEND_PORT?.trim();
    const backendUrl =
      host && port
        ? `http://${host}:${port}`
        : (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://backend:3000').replace(/\/$/, '');
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
