import type { NextConfig } from "next";

const tunnelHost = process.env.CLOUDFLARE_TUNNEL_HOST?.trim();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      new URL(
        "https://i0.wp.com/srmrmp.edu.in/wp-content/uploads/2025/02/New-Logo-SRM-02-1-1024x446.png",
      ),
    ],
  },
  allowedDevOrigins: [
    "localhost:3000",
    ...(tunnelHost ? [tunnelHost] : []),
  ],
};

export default nextConfig;
