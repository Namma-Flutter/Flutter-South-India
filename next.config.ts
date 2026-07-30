import type { NextConfig } from "next";

/* GitHub Pages serves this as a project site at /Flutter-South-India/,
   so every asset/link needs that prefix baked in at build time. */
const repoBasePath = "/Flutter-South-India";
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isGithubPagesBuild
    ? { basePath: repoBasePath, assetPrefix: repoBasePath }
    : {}),
};

export default nextConfig;
