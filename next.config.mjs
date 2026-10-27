/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project — a stray lockfile in the home
  // directory otherwise makes Next.js infer the wrong root.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
