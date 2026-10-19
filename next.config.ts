import type { NextConfig } from "next";

// "/nom-du-repo" sur GitHub Pages (fourni par la CI), vide partout ailleurs.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Export 100 % statique dans ./out : le même artefact est servi par Nginx (Docker) et GitHub Pages.
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
