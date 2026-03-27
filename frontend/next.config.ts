import type { NextConfig } from "next";

/**
 * Public URL prefix (e.g. https://host/patientrecords/). Required so Link/redirect use one segment, not /patientrecords/patientrecords.
 * Production Docker build sets BASE_PATH=/patientrecords. Set BASE_PATH= only if the ingress strips /patientrecords before the container.
 * With a non-empty basePath, the reverse proxy must forward the full path (including /patientrecords) to Next.
 */
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
        : (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://backend:8000').replace(/\/$/, '');
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
