import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Use --webpack flag when running to force webpack instead of Turbopack for better pg support
  },
};

export default nextConfig;
