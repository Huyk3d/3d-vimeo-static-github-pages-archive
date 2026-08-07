/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/3d-vimeo-static-github-pages-archive" : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
